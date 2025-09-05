import axios from "axios"
import {UserFromAPI, UsersCountResponse, UsersResponse} from "@/types/user";


export class UserService {
    private static baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`

    static async getUsers(pageNumber = 0, pageSize = 4): Promise<UsersResponse> {
        try {
            const response = await axios.get<UserFromAPI[]>(this.baseURL, {
                params: { pageNumber, pageSize },
            })

            const countResponse = await axios.get<UsersCountResponse>(`${this.baseURL}/count`)

            return {
                users: response.data,
                totalCount: countResponse.data.count,
            }
        } catch (error) {
            throw new Error("Failed to fetch users")
        }
    }

    static async getUsersCount(): Promise<number> {
        try {
            const response = await axios.get<UsersCountResponse>(`${this.baseURL}/count`)
            return response.data.count
        } catch (error) {
            throw new Error("Failed to fetch users count")
        }
    }
}
