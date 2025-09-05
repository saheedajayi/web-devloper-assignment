import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user.service"

export const useUsers = (pageNumber = 0, pageSize = 4) => {
    return useQuery({
        queryKey: ["users", pageNumber, pageSize],
        queryFn: () => UserService.getUsers(pageNumber, pageSize),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    })
}

export const useUsersCount = () => {
    return useQuery({
        queryKey: ["users", "count"],
        queryFn: () => UserService.getUsersCount(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
}
