// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { QuizService } from '@/services/quiz.service';

const quizservice = new QuizService();

const createQuiz = (payload: any) => {
  return quizservice.createQuiz(payload);
};

export const useQuizBuilder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries('quiz');
    },
  });
  return {
    createQuiz: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
