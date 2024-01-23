// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { PlanService } from '@/services/plan.service';

const planservice = new PlanService();

const createPlan = (payload: any) => {
  // Update this logic as per your API endpoint
  return planservice.createPlan(payload);
};

export const useLessonPlanner = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries('plans');
    },
  });
  return {
    createPlan: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
