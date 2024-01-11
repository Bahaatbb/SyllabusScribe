// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { PresentationService } from '@/services/presentation.service';

const presentationservice = new PresentationService();

const generatePresentation = (payload: any) => {
  // Update this logic as per your API endpoint
  return presentationservice.createPresentation(payload);
};

export const useGeneratePresentation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(generatePresentation, {
    onSuccess: () => {
      queryClient.invalidateQueries('generate-presentation');
    },
  });
  return {
    generatePresentation: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};
