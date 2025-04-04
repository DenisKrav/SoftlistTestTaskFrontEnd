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

export const createUser = async (user: Omit<User, 'id'>) => {
  const response = await api.post('/users', user)
  return response.data
}

export const updateUser = async (user: User) => {
  const response = await api.put(`/users/${user.id}`, user)
  return response.data
}

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
}
