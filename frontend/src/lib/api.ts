import axios from "axios"

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 10000,
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message)
        }
        return Promise.reject(error)
    }
)

// Helper function for consistent error handling
export function handleApiError(error: unknown, defaultMessage: string, notFoundMessage?: string): never {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 404 && notFoundMessage) {
            throw new Error(notFoundMessage)
        }
        throw new Error(`${defaultMessage}: ${error.message}`)
    }
    throw new Error(`${defaultMessage}: Unknown error`)
}