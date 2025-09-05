import axios from "axios"
import type { UserFromAPI, UsersCountResponse, UsersResponse } from "@/types/user"

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`

function handleError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
        throw new Error(`${defaultMessage}: ${error.message}`)
    }
    throw new Error(`${defaultMessage}: Unknown error`)
}

async function getUsers(pageNumber = 0, pageSize = 4): Promise<UsersResponse> {
    try {
        const response = await axios.get<UserFromAPI[]>(baseURL, {
            params: { pageNumber, pageSize },
        })

        const countResponse = await axios.get<UsersCountResponse>(`${baseURL}/count`)

        return {
            users: response.data,
            totalCount: countResponse.data.count,
        }
    } catch (error: unknown) {
        handleError(error, "Failed to fetch users")
    }
}

async function getUsersCount(): Promise<number> {
    try {
        const response = await axios.get<UsersCountResponse>(`${baseURL}/count`)
        return response.data.count
    } catch (error: unknown) {
        handleError(error, "Failed to fetch users count")
    }
}

export const UserService = {
    getUsers,
    getUsersCount,
}
