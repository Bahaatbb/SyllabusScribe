// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { ContextService } from '@/services/context.service';

const contextservice = new ContextService();

const buildContext = (payload: any) => {
  // Update this logic as per your API endpoint
  return contextservice.createContext(payload);
};

export const useBuildContext = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(buildContext, {
    onSuccess: () => {
      queryClient.invalidateQueries('context');
    },
  });
  return {
    buildContext: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
