import { apiClient, handleApiError } from "@/lib/api"
import type { UserFromAPI, UsersCountResponse, UsersResponse } from "@/types/user"

async function getUsers(pageNumber = 0, pageSize = 4): Promise<UsersResponse> {
    try {
        const [usersResponse, countResponse] = await Promise.all([
            apiClient.get<UserFromAPI[]>("/users", {
                params: { pageNumber, pageSize },
            }),
            apiClient.get<UsersCountResponse>("/users/count")
        ])

        return {
            users: usersResponse.data,
            totalCount: countResponse.data.count,
        }
    } catch (error: unknown) {
        handleApiError(error, "Failed to fetch users")
    }
}

async function getUsersCount(): Promise<number> {
    try {
        const response = await apiClient.get<UsersCountResponse>("/users/count")
        return response.data.count
    } catch (error: unknown) {
        handleApiError(error, "Failed to fetch users count")
    }
}

export const UserService = {
    getUsers,
    getUsersCount,
}
