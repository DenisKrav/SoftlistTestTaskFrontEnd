import axios from 'axios'
import { User } from '../Models/UserModel'

const apiUrl = import.meta.env.VITE_API_URL 

const api = axios.create({
  baseURL: apiUrl,
})

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users')
  return response.data
}

export const createUser = (user: Omit<User, 'id'>) => api.post('/users', user)
export const updateUser = (user: User) => api.put(`/users/${user.id}`, user)
export const deleteUser = (id: number) => api.delete(`/users/${id}`)
