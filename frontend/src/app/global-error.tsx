"use client"
import ErrorFallback from "@/components/error-fallback"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <html>
        <body>
        <ErrorFallback
            error={error}
            reset={reset}
            title="Application Error"
            description="A critical error occurred. Please refresh the page or contact support if the problem persists."
        />
        </body>
        </html>
    )
}