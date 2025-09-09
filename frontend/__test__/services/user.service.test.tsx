import { UserFactory } from "../factories/user.factory"
import { UserService } from "@/services/user.service"
import { apiClient } from "@/lib/api"
import "@testing-library/jest-dom"

// Mock the entire api module
jest.mock("@/lib/api", () => ({
    apiClient: {
        get: jest.fn(),
    },
    handleApiError: jest.fn((error: unknown, defaultMessage: string) => {
        throw new Error(defaultMessage)
    })
}))

// Type the mocked apiClient
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>

// Set environment variable
process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3001"

describe("UserService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("getUsers", () => {
        it("fetches users successfully with default parameters", async () => {
            const mockUsers = UserFactory.buildList(3)
            const mockCountResponse = { count: 10 }

            // Mock the apiClient.get calls in the order they're called
            mockedApiClient.get
                .mockResolvedValueOnce({ data: mockUsers })
                .mockResolvedValueOnce({ data: mockCountResponse })

            const result = await UserService.getUsers()

            // Verify the calls were made correctly with default params
            expect(mockedApiClient.get).toHaveBeenCalledTimes(2)
            expect(mockedApiClient.get).toHaveBeenNthCalledWith(1, "/users", {
                params: { pageNumber: 0, pageSize: 4 },
            })
            expect(mockedApiClient.get).toHaveBeenNthCalledWith(2, "/users/count")

            expect(result).toEqual({
                users: mockUsers,
                totalCount: 10,
            })
        })

        it("fetches users successfully with custom parameters", async () => {
            const mockUsers = UserFactory.buildList(5)
            const mockCountResponse = { count: 25 }

            mockedApiClient.get
                .mockResolvedValueOnce({ data: mockUsers })
                .mockResolvedValueOnce({ data: mockCountResponse })

            const result = await UserService.getUsers(2, 10)

            expect(mockedApiClient.get).toHaveBeenCalledTimes(2)
            expect(mockedApiClient.get).toHaveBeenNthCalledWith(1, "/users", {
                params: { pageNumber: 2, pageSize: 10 },
            })
            expect(mockedApiClient.get).toHaveBeenNthCalledWith(2, "/users/count")

            expect(result).toEqual({
                users: mockUsers,
                totalCount: 25,
            })
        })

        it("throws error when users API fails", async () => {
            mockedApiClient.get.mockRejectedValue(new Error("Network Error"))

            await expect(UserService.getUsers()).rejects.toThrow("Failed to fetch users")

            // Promise.all starts both requests, so both calls are made even if one fails
            expect(mockedApiClient.get).toHaveBeenCalledTimes(2)
            expect(mockedApiClient.get).toHaveBeenNthCalledWith(1, "/users", {
                params: { pageNumber: 0, pageSize: 4 },
            })
            expect(mockedApiClient.get).toHaveBeenNthCalledWith(2, "/users/count")
        })

        it("throws error when count API fails", async () => {
            const mockUsers = UserFactory.buildList(3)

            // First call succeeds, second call fails
            mockedApiClient.get
                .mockResolvedValueOnce({ data: mockUsers })
                .mockRejectedValueOnce(new Error("Count API Error"))

            await expect(UserService.getUsers()).rejects.toThrow("Failed to fetch users")

            expect(mockedApiClient.get).toHaveBeenCalledTimes(2)
        })

        it("handles empty user list", async () => {
            const mockUsers: any[] = []
            const mockCountResponse = { count: 0 }

            mockedApiClient.get
                .mockResolvedValueOnce({ data: mockUsers })
                .mockResolvedValueOnce({ data: mockCountResponse })

            const result = await UserService.getUsers()

            expect(result).toEqual({
                users: [],
                totalCount: 0,
            })
        })
    })

    describe("getUsersCount", () => {
        it("fetches users count successfully", async () => {
            const mockCountResponse = { count: 25 }
            mockedApiClient.get.mockResolvedValue({ data: mockCountResponse })

            const result = await UserService.getUsersCount()

            expect(mockedApiClient.get).toHaveBeenCalledWith("/users/count")
            expect(mockedApiClient.get).toHaveBeenCalledTimes(1)
            expect(result).toBe(25)
        })

        it("fetches zero count successfully", async () => {
            const mockCountResponse = { count: 0 }
            mockedApiClient.get.mockResolvedValue({ data: mockCountResponse })

            const result = await UserService.getUsersCount()

            expect(mockedApiClient.get).toHaveBeenCalledWith("/users/count")
            expect(result).toBe(0)
        })

        it("throws error when count API fails", async () => {
            mockedApiClient.get.mockRejectedValue(new Error("Network Error"))

            await expect(UserService.getUsersCount()).rejects.toThrow("Failed to fetch users count")

            expect(mockedApiClient.get).toHaveBeenCalledWith("/users/count")
            expect(mockedApiClient.get).toHaveBeenCalledTimes(1)
        })
    })

    describe("Error handling", () => {
        it("handles Promise.all rejection in getUsers", async () => {
            // Test when the Promise.all itself fails
            mockedApiClient.get.mockRejectedValue(new Error("Promise.all failure"))

            await expect(UserService.getUsers()).rejects.toThrow("Failed to fetch users")
        })
    })
})