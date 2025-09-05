"use client"

import type React from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {useState} from "react"
import type {AxiosError} from "axios"


function isAxiosError(error: unknown): error is AxiosError {
    return typeof error === "object" && error !== null && "isAxiosError" in error && (error as AxiosError).isAxiosError
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        gcTime: 5 * 60 * 1000,
                        retry: (failureCount: number, error: unknown) => {
                            if (isAxiosError(error)) {
                                const status = error.response?.status
                                if (status && status >= 400 && status < 500) {
                                    return false
                                }
                            }
                            return failureCount < 3
                        },
                    },
                    mutations: {
                        retry: false,
                    },
                },
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
