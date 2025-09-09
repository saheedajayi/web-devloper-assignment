"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ErrorFallbackProps {
    error: Error & { digest?: string }
    reset: () => void
    title?: string
    description?: string
    showErrorMessage?: boolean
    className?: string
}

export default function ErrorFallback({
                                          error,
                                          reset,
                                          title = "Something went wrong!",
                                          description,
                                          showErrorMessage = true,
                                          className = "min-h-screen w-full"
                                      }: ErrorFallbackProps) {
    useEffect(() => {
        console.error('Error caught by boundary:', error)
    }, [error])

    const getDefaultDescription = () => {
        if (error.message.includes('Network')) {
            return "Connection error. Please check your internet and try again."
        }
        if (error.message.includes('404')) {
            return "The requested resource could not be found."
        }
        return "An unexpected error occurred. Please try again."
    }

    const errorMessage = showErrorMessage ? (error.message || getDefaultDescription()) : null
    const displayDescription = description || (showErrorMessage ? errorMessage : getDefaultDescription())

    return (
        <div className={className}>
            <div className="mx-auto max-w-5xl p-4 sm:p-8">
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">{title}</h2>
                    <p className="text-gray-600 text-center max-w-md">
                        {displayDescription}
                    </p>
                    <Button onClick={reset} variant="outline">
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    )
}