// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { SubjectService } from '@/services/subject.service';

const subjectservice = new SubjectService();

const createUnit = (payload: any) => {
  return subjectservice.createUnit(payload);
};

export const useCreateUnit = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createUnit, {
    onSuccess: () => {
      queryClient.invalidateQueries('subject-one');
    },
  });
  return {
    createUnit: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
