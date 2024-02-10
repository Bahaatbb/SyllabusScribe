import {
  Group,
  Box,
  Text,
  Code,
  Button,
  Center,
  NativeSelect,
  NumberInput,
  Divider,
  Flex,
  FileInput,
  rem,
  Loader,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconFileTypeCsv, IconTrash } from '@tabler/icons-react';
import { z } from 'zod';
import { SPMService } from '@/services/spm.service';
import { parse } from 'papaparse'; 
import { useState } from 'react';

const listSchema = z.object({
  students: z
    .array(
      z.object({
        hours_studied: z
          .number()
          .min(0, 'Number should be greater than 0')
          .max(9, 'Number should be less than or equal to 9'),
        previous_score: z
          .number()
          .min(0, 'Number should be greater than 0')
          .max(100, 'Number should be less than or equal to 100'),
        extracurricular_activities: z
          .string()
          .transform((val) => (val === 'Yes' || val === 'yes' ? 1 : 0))
          .refine((val) => val === 1 || val === 0, {
            message: 'Please select an option',
          }),
        sleep_hours: z
          .number()
          .min(0, 'Number should be greater than 0')
          .max(9, 'Number should be less than or equal to 9'),
        sample_question_papers_practiced: z
          .number()
          .min(0, 'Number should be greater than 0')
          .max(9, 'Number should be less than or equal to 9'),
      })
    )
    .min(1, 'Please add at least one student'),
});
const spmservice = new SPMService();
function StudentPerformanceForm() {
  const [fileError, setFileError] = useState<boolean>(false);
  const form = useForm<{
    students: {
      hours_studied: number;
      previous_score: number;
      extracurricular_activities: string;
      sleep_hours: number;
      sample_question_papers_practiced: number;
      status: 'idle' | 'pending' | 'resolved' | 'rejected';
      error: {};
      result: '';
    }[];
  }>({
    initialValues: {
      students: [],
    },
    validate: zodResolver(listSchema),
    validateInputOnBlur: true,
  });
  const fields = form.values.students.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Flex gap={'lg'} p="lg" ref={provided.innerRef} {...provided.draggableProps} wrap={'wrap'}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical style={{ marginTop: '25px' }} />
          </Center>

          <NumberInput
            style={{
              height: rem(60),
            }}
            mt={'md'}
            placeholder="Hours Studied"
            label="Hours Studied"
            {...form.getInputProps(`students.${index}.hours_studied`)}
          />

          <NumberInput
            style={{
              height: rem(60),
            }}
            mt={'md'}
            label="Previous Score"
            placeholder="Previous Score"
            {...form.getInputProps(`students.${index}.previous_score`)}
          />
          <NativeSelect
            style={{
              height: rem(60),
            }}
            mt={'md'}
            leftSectionPointerEvents="none"
            label="Extracurricular Activities"
            data={['Yes', 'No']}
            {...form.getInputProps(`students.${index}.extracurricular_activities`)}
          />
          <NumberInput
            style={{
              height: rem(60),
            }}
            mt={'md'}
            placeholder="Sleep Hours"
            label="Sleep Hours"
            {...form.getInputProps(`students.${index}.sleep_hours`)}
          />
          <NumberInput
            style={{
              height: rem(60),
            }}
            mt={'md'}
            placeholder="Sample Question Papers Practiced"
            label="Sample Question Papers Practiced"
            {...form.getInputProps(`students.${index}.sample_question_papers_practiced`)}
          />

          {form.values.students[index]?.status == 'idle' && (
            <Button
              leftSection={
                <IconTrash
                  style={{
                    width: rem(18),
                    height: rem(18),
                  }}
                />
              }
              style={{
                alignSelf: 'flex-end',
                marginTop: rem('lg'),
                cursor: 'pointer',
              }}
              bg="#c51717"
              onClick={() => {
                form.removeListItem('students', index);
              }}
            >
              Delete
            </Button>
          )}
          {form.values.students[index].status == 'pending' && (
            <Loader
              style={{
                width: rem(35),
                height: rem(35),
                alignSelf: 'flex-end',
                marginTop: rem('lg'),
                cursor: 'pointer',
              }}
              color="#2956dc"
            />
          )}
          {form.values.students[index].status === 'resolved' && (
            <Flex
              style={{
                alignSelf: 'flex-end',
                marginTop: rem('lg'),
              }}
              direction={'column'}
            >
              <Box fw={500}>Performance index</Box>
              <Text mt={'sm'} c={'green'} fw={500}>
                {Number.parseFloat(form.values.students[index].result).toFixed(4)}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Draggable>
  ));

  const handleChange = async (file: File | null) => {
    if (!file) {
      setFileError(true);
      return;
    }
    if (file.name.split('.').pop() !== 'csv') {
      setFileError(true);
      return;
    } else {
      setFileError(false);
    }
  
    // Use papaparse to handle CSV parsing
    parse(file, {
      complete: (results) => {
        const contents = results.data.map((row: any) => {
          const {
            hours_studied,
            previous_score,
            extracurricular_activities,
            sleep_hours,
            sample_question_papers_practiced,
           } = row;
          return {
            hours_studied: parseInt(hours_studied),
            previous_score: parseInt(previous_score),
            extracurricular_activities: extracurricular_activities.trim().toLowerCase() === 'yes' ? 'Yes' : 'No',
            sleep_hours: parseInt(sleep_hours),
            sample_question_papers_practiced: parseInt(sample_question_papers_practiced),
            status: 'idle',
            error: {},
            result: '',
          } as typeof form.values.students[number];
        });
        form.setFieldValue('students', [...form.values.students, ...contents]);
      },
      header: true,
    });
  };

  const handleSubmit = async (values: typeof form.values) => {
    let payload: {
      hours_studied: number;
      previous_score: number;
      extracurricular_activities: number;
      sleep_hours: number;
      sample_question_papers_practiced: number;
      index: number;
    }[] = [];
    const requests: Promise<any>[] = [];

    values.students.forEach((student, index) => {
      payload.push({
        hours_studied: student.hours_studied,
        previous_score: student.previous_score,
        sleep_hours: student.sleep_hours,
        extracurricular_activities:
          student.extracurricular_activities === 'Yes' ||
          student.extracurricular_activities === 'yes'
            ? 1
            : 0,
        sample_question_papers_practiced: student.sample_question_papers_practiced,
        index: index,
      });
    });

    payload.forEach((student, index) =>
      requests.push(
        spmservice.getSPM({
          hours_studied: student.hours_studied,
          previous_score: student.previous_score,
          sleep_hours: student.sleep_hours,
          extracurricular_activities: student.extracurricular_activities,
          sample_question_papers_practiced: student.sample_question_papers_practiced,
        })
      )
    );
    for (let index = 0; index < requests.length; index++) {
      form.setFieldValue(`students.${payload[index].index}.status`, 'pending');
      try {
        const res: { status: any; model_output: { performance_index: number } } =
          await requests[index];
        if (res) {
          form.setFieldValue(`students.${payload[index].index}.status`, 'resolved');
          form.setFieldValue(
            `students.${payload[index].index}.result`,
            res.model_output.performance_index
          );
        } else {
          form.setFieldValue(`students.${payload[index].index}.status`, 'rejected');
          form.setFieldValue(`students.${payload[index].index}.error`, 'Something went wrong');
        }
      } catch (error) {
        // @ts-ignore
        const errorMessage =  error.response?.data?.message || error?.message || 'An error occurred';
        form.setFieldValue(`students.${payload[index].index}.error`, errorMessage);
      }
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))} mx="auto">
      <Flex my="md" justify="space-between" align={'end'}>
        <Text fw={600}>Check how your students are doing</Text>
        <FileInput
          w={rem(200)}
          rightSection={
            <IconFileTypeCsv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          }
          label="Attach your Csv"
          placeholder="Your Csv"
          rightSectionPointerEvents="none"
          onChange={handleChange}
          error={fileError && 'Extension should be csv'}
        />
      </Flex>
      <Divider />
      <Group
        pr="lg"
        justify="flex-end"
        style={{
          marginTop: '30px',
        }}
      >
        <Button
          onClick={() =>
            form.insertListItem('students', {
              status: 'idle',
              extracurricular_activities: 'yes',
              error: {},
              result: '',
            })
          }
          bg="#2951dc"
        >
          Add student
        </Button>
        <Button type="submit" bg="#2951dc">
          Submit
        </Button>
      </Group>

      <DragDropContext
        onDragEnd={({ destination, source }) =>
          destination?.index !== undefined &&
          form.reorderListItem('students', { from: source.index, to: destination.index })
        }
      >
        {form.errors.students && (
          <Text c="red" mt="sm">
            {form.errors.students}
          </Text>
        )}
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <Box w={'100%'} {...provided.droppableProps} ref={provided.innerRef}>
              {fields}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export { StudentPerformanceForm };
