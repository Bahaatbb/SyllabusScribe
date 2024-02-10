// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { SubjectService } from '@/services/subject.service';

const subjectservice = new SubjectService();

const createSubject = (payload: any) => {
  return subjectservice.createSubject(payload);
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries('subject');
    },
  });
  return {
    createSubject: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
