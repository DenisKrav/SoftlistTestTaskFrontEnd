import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../api/Services/UsersSerice'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
