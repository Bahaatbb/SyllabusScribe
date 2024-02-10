// useGeneratePresentationReactQuery.ts
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '@/services/user.service';

const userservice = new UserService();
const updateUser = (payload: any) => {
  return userservice.updateMe(payload);
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
  return {
    updateUser: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    loading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
