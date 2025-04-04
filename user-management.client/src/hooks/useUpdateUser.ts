import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../api/Models/UserModel'
import { updateUser } from '../api/Services/UsersSerice'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
