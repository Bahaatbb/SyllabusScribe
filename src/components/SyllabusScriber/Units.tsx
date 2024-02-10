import { SubjectService } from '@/services/subject.service';
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Modal,
  NativeSelect,
  NumberInput,
  Popover,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconAffiliate,
  IconArrowBadgeRightFilled,
  IconBooks,
  IconChecks,
  IconCode,
  IconFileTypePpt,
  IconPlus,
  IconPresentation,
  IconRefresh,
  IconX,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { LoadingForm } from '../LoadingForm';
import { StepTwoForm } from './StepTwoForm';
import { useLessonPlanner } from '@/hooks/useLessonPlanner';
import { useGeneratePresentation } from '@/hooks/useGeneratePresentation';
import { useBuildContext } from '@/hooks/useBuildContext';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { useBuildWorksheet } from '@/hooks/useBuildWorksheet';
import { notifications } from '@mantine/notifications';
import { ROUTES } from '@/constants/routes.enum';
import { PresentationService } from '@/services/presentation.service';
import { Container } from '../Container/Container';
import { useState } from 'react';

const subjectservice = new SubjectService();
const presentationservice = new PresentationService();
const getPresentation = (payload: any) => {
  return presentationservice.getOnePresentation(payload);
};

const getOneSubject = (id: string) => {
  return subjectservice.getOneSubject(id);
};

export const Units = () => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');
  const queryClient = useQueryClient();
  const [submitErr, setSubmitErr] = useState<string | null>();
  const [slides, setNumberSlides] = useState<number | null>();
  const [openedSlider, setOpenedSlider] = useState<number | null>();

  const { data, isLoading, error, refetch } = useQuery<
    {
      subject: {
        id: string;
        name: string;
        units: {
          id: number;
          name: string;
          lesson_context: number;
          lesson_handout: number;
          lesson_plan: number;
          lesson_presentation: number;
          lesson_quiz: number;
        }[];
      };
    },
    {
      error: { error: string };
    }
  >({
    queryKey: 'subject-one',
    queryFn: () => getOneSubject(id || ''),
  });

  const { mutate } = useMutation(getPresentation, {
    onSuccess: (local_data) => {
      window.open(
        `${import.meta.env.VITE_API_URL}/${local_data.lesson_presentation.generated_file}`
      );
    },
  });

  const { loading: PlanLoader, createPlan } = useLessonPlanner();
  const { loading: PresentationLoader, generatePresentation } = useGeneratePresentation();
  const { loading: ContextLoader, buildContext } = useBuildContext();
  const { loading: QuizLoader, createQuiz } = useQuizBuilder();
  const { loading: WorksheetLoader, buildWorksheet } = useBuildWorksheet();

  const loader = [
    PlanLoader,
    PresentationLoader,
    ContextLoader,
    QuizLoader,
    WorksheetLoader,
    isLoading,
  ];
  const LoadedMaterial = loader.reduce((prev, curr) => prev || curr);

  const handleCreatePlan = (name: string, id: number) => {
    createPlan(
      {
        topic: name,
        grade_level: 'College',
        unit: id,
      },
      {
        onSuccess() {
          notifications.show({
            title: 'Success',
            message: 'Lesson Plan was generated successfully',
            color: 'green',
          });
          queryClient.invalidateQueries('subject-one');
        },
        onError(error) {
          console.log(error);
          notifications.show({
            title: 'Something went wrong',
            message:
              //@ts-ignore
              error?.error || error?.detail || 'Failed to generate your Lesson Plan',
            color: 'red',
          });
        },
      }
    );
  };

  const handleGeneratePresentation = (name: string, id: number) => {
    if (!slides || slides <= 0) {
      setSubmitErr('Number of slides is required and greater than 0');
      return;
    }
    setOpenedSlider(null);

    generatePresentation(
      {
        topic: name,
        grade_level: 'College',
        num_slides: slides,
        unit: id,
      },
      {
        onSuccess(data, variables, context) {
          notifications.show({
            title: 'Success',
            message: 'Presentation was generated successfully',
            color: 'green',
          });
          queryClient.invalidateQueries('subject-one');
        },
        onError(error, variables, context) {
          console.log(error);
          notifications.show({
            title: 'Something went wrong',
            message:
              //@ts-ignore
              error?.error || error?.detail || 'Failed to generate your Presentation',
            color: 'red',
          });
        },
      }
    );
  };

  const handleCreateContext = (name: string, id: number) => {
    buildContext(
      {
        topic: name,
        grade_level: 'College',
        num_slides: 1,
        unit: id,
      },
      {
        onSuccess() {
          notifications.show({
            title: 'Success',
            message: 'Context was generated successfully',
            color: 'green',
          });
          queryClient.invalidateQueries('subject-one');
        },
        onError(error, variables, context) {
          console.log(error);
          notifications.show({
            title: 'Something went wrong',
            message:
              //@ts-ignore
              error?.error || error?.detail || 'Failed to generate your Context',
            color: 'red',
          });
        },
      }
    );
  };

  const handleBuildQuiz = (name: string, id: number) => {
    createQuiz(
      {
        topic: name,
        grade_level: 'College',
        unit: id,
      },
      {
        onSuccess() {
          notifications.show({
            title: 'Success',
            message: 'Quiz was generated successfully',
            color: 'green',
          });
          queryClient.invalidateQueries('subject-one');
        },
        onError(error, variables, context) {
          console.log(error);
          notifications.show({
            title: 'Something went wrong',
            message:
              //@ts-ignore
              error?.error || error?.detail || 'Failed to generate your Quiz',
            color: 'red',
          });
        },
      }
    );
  };

  const handleBuildWorksheet = (name: string, id: number) => {
    buildWorksheet(
      {
        topic: name,
        grade_level: 'College',
        unit: id,
      },
      {
        onSuccess() {
          notifications.show({
            title: 'Success',
            message: 'Handout was generated successfully',
            color: 'green',
          });
          queryClient.invalidateQueries('subject-one');
        },
        onError(error, variables, context) {
          console.log(error);
          notifications.show({
            title: 'Something went wrong',
            message:
              //@ts-ignore
              error?.error || error?.detail || 'Failed to generate your Handout',
            color: 'red',
          });
        },
      }
    );
  };

  const handlePresentation = (id: number) => {
    mutate(id);
  };

  if (error) {
    return (
      <>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          {/* @ts-ignore */}
          <Text c={'red'}>{error?.error || error?.detail || 'Something Went wrong'}</Text>
          <Button
            w={rem(200)}
            mt={rem(25)}
            rightSection={<IconRefresh />}
            color="#7b7b7b"
            radius={'lg'}
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Flex>
      </>
    );
  }

  if (!id) {
    return (
      <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
        <Text c={'red'}>Please Provide an ID for this to work</Text>
      </Flex>
    );
  }

  return (
    <Box>
      <LoadingForm loading={LoadedMaterial}>
        <Modal
          opened={opened}
          onClose={close}
          centered
          fullScreen={isMobile}
          transitionProps={{ transition: 'fade', duration: 200 }}
        >
          <StepTwoForm subject={Number(data?.subject.id)} />
        </Modal>
        <Grid grow>
          {data &&
            data.subject.units.length > 0 &&
            data.subject.units.map((item) => (
              <Grid.Col key={item.name} span={4} maw={'454px'}>
                <Card maw={'454px'} h={'300px'} withBorder>
                  <Text fw={500} ta="center">
                    {item.name}
                  </Text>
                  <Divider mt={'md'} />
                  <Flex
                    mt="md"
                    direction={'column'}
                    align={'center'}
                    justify={'space-between'}
                    w={'100%'}
                    h="100%"
                  >
                    {item.lesson_plan === null ? (
                      <Button
                        leftSection={<IconBooks style={{ width: rem(20), height: rem(20) }} />}
                        w={'100%'}
                        color={'#2951DC'}
                        onClick={() => handleCreatePlan(item.name, item.id)}
                      >
                        Lesson planner
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to={`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.LESSON_PLANNER}/${item.lesson_plan}`}
                        replace={false}
                        color="#eeeeee"
                        c="black"
                        fullWidth
                      >
                        <Box>View your Lesson plan</Box>
                        <IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />
                      </Button>
                    )}
                    {item.lesson_presentation === null ? (
                      <>
                        <Popover
                          returnFocus={true}
                          opened={openedSlider === item.id}
                          width={300}
                          trapFocus
                          withArrow
                          shadow="md"
                          position="right"
                          offset={{ mainAxis: 0, crossAxis: 50 }}
                        >
                          <Popover.Target>
                            <Button
                              leftSection={
                                <IconPresentation style={{ width: rem(20), height: rem(20) }} />
                              }
                              w={'100%'}
                              color={'#3d5fd9'}
                              onClick={() => setOpenedSlider(item.id)}
                            >
                              Presentation Generator
                            </Button>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <NumberInput
                              error={submitErr}
                              value={slides || 0}
                              onChange={(value) => setNumberSlides(Number(value))}
                              label="Number of slides"
                              placeholder="slides"
                              size="xs"
                            />
                            <Flex justify={'space-between'} gap={'20'}>
                              <Button
                                mt={'lg'}
                                leftSection={<IconX style={{ width: rem(20), height: rem(20) }} />}
                                w={'100%'}
                                color={'#b5b5b5'}
                                onClick={() => {
                                  setNumberSlides(null)
                                  setSubmitErr(null)
                                  setOpenedSlider(null)
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                mt={'lg'}
                                leftSection={
                                  <IconChecks style={{ width: rem(20), height: rem(20) }} />
                                }
                                w={'100%'}
                                color={'#3d5fd9'}
                                onClick={() => handleGeneratePresentation(item.name, item.id)}
                              >
                                Submit
                              </Button>
                            </Flex>
                          </Popover.Dropdown>
                        </Popover>
                      </>
                    ) : (
                      <Button
                        color="#eeeeee"
                        c="black"
                        fullWidth
                        onClick={() => {
                          handlePresentation(item.lesson_presentation);
                        }}
                      >
                        <Box>View your Presentation</Box>
                        <IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />
                      </Button>
                    )}
                    {item.lesson_context === null ? (
                      <Button
                        leftSection={<IconAffiliate style={{ width: rem(20), height: rem(20) }} />}
                        w={'100%'}
                        color={'#4963c2'}
                        onClick={() => handleCreateContext(item.name, item.id)}
                      >
                        Context Builder
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to={`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.CONTEXT_BUILDER}/${item.lesson_context}`}
                        replace={false}
                        color="#eeeeee"
                        c="black"
                        fullWidth
                      >
                        <Box>View your Context</Box>
                        <IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />
                      </Button>
                    )}
                    {item.lesson_quiz === null ? (
                      <Button
                        leftSection={<IconAffiliate style={{ width: rem(20), height: rem(20) }} />}
                        w={'100%'}
                        color={'#7184c9'}
                        onClick={() => handleBuildQuiz(item.name, item.id)}
                      >
                        Quiz Builder
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to={`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.QUIZ_BUILDER}/${item.lesson_quiz}`}
                        replace={false}
                        color="#eeeeee"
                        c="black"
                        fullWidth
                      >
                        <Box>View your Quiz</Box>
                        <IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />
                      </Button>
                    )}
                    {item.lesson_handout === null ? (
                      <Button
                        leftSection={
                          <IconFileTypePpt style={{ width: rem(20), height: rem(20) }} />
                        }
                        w={'100%'}
                        color={'#8e9ccf'}
                        onClick={() => handleBuildWorksheet(item.name, item.id)}
                      >
                        Handout
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to={`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.WORKSHEETS}/${item.lesson_handout}`}
                        replace={false}
                        color="#eeeeee"
                        c="black"
                        fullWidth
                      >
                        <Box>View your Handout</Box>
                        <IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />
                      </Button>
                    )}
                  </Flex>
                </Card>
              </Grid.Col>
            ))}

          <Grid.Col span={4} maw={'454px'}>
            <Card
              component="button"
              maw={'454px'}
              w={'100%'}
              h={'300px'}
              className="card-hover-effect"
              radius={'sm'}
              onClick={() => open()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              disabled={LoadedMaterial}
            >
              <IconPlus color="#2951DC" />
              <Text ml={'sm'} fw={500}>
                Create unit
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </LoadingForm>
    </Box>
  );
};
