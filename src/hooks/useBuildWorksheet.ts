// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { WorksheetsService } from '@/services/worksheet.service';

const worksheetservice = new WorksheetsService();

const buildWorksheet = (payload: any) => {
  return worksheetservice.createWorksheet(payload);
};

export const useBuildWorksheet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(buildWorksheet, {
    onSuccess: () => {
      queryClient.invalidateQueries('worksheet');
    },
  });
  return {
    buildWorksheet: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
