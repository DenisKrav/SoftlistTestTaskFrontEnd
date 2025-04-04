import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../api/Services/UsersSerice'
import { User } from '../api/Models/UserModel'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: Omit<User, 'id'>) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
