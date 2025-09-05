import axios from "axios"
import { UserFactory } from "../factories/user.factory"
import { UserService } from "@/services/user.service"
import "@testing-library/jest-dom"

// Don't mock axios again - it's already mocked globally in jest.setup.js
const mockedAxios = axios as jest.Mocked<typeof axios>

// Set environment variable
process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3001"

describe("UserService", () => {
    const mockBaseURL = "http://localhost:3001/users"

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("getUsers", () => {
        it("fetches users successfully", async () => {
            const mockUsers = UserFactory.buildList(3)
            const mockCountResponse = { count: 10 }

            // Mock the axios.get calls
            mockedAxios.get
                .mockResolvedValueOnce({ data: mockUsers })
                .mockResolvedValueOnce({ data: mockCountResponse })

            const result = await UserService.getUsers(0, 4)

            // Debug: Log what was actually called
            console.log('Axios calls:', mockedAxios.get.mock.calls)

            expect(result).toEqual({
                users: mockUsers,
                totalCount: 10,
            })
        })

        it("throws error when API fails", async () => {
            mockedAxios.get.mockRejectedValue(new Error("Network Error"))

            await expect(UserService.getUsers()).rejects.toThrow("Failed to fetch users")
        })
    })

    describe("getUsersCount", () => {
        it("fetches users count successfully", async () => {
            const mockCountResponse = { count: 25 }
            mockedAxios.get.mockResolvedValue({ data: mockCountResponse })

            const result = await UserService.getUsersCount()

            expect(result).toBe(25)
        })

        it("throws error when count API fails", async () => {
            mockedAxios.get.mockRejectedValue(new Error("Network Error"))

            await expect(UserService.getUsersCount()).rejects.toThrow("Failed to fetch users count")
        })
    })

    // Debug test to verify axios mocking works
    it("debug axios mock", async () => {
        mockedAxios.get.mockResolvedValue({ data: { test: "works" } })

        const result = await axios.get("http://test.com")

        console.log("Axios mock result:", result)
        expect(result.data.test).toBe("works")
    })
})