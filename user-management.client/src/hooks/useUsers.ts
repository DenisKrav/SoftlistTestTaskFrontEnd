import { useQuery } from "@tanstack/react-query"
import { User } from "../api/Models/UserModel"
import { getUsers } from "../api/Services/UsersSerice"

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getUsers
    })
}