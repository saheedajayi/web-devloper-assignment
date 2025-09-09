import Loader from "@/components/loader"

export default function Loading() {
    return (
        <div className="min-h-screen w-full">
            <div className="mx-auto max-w-5xl p-4 sm:p-8">
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            </div>
        </div>
    )
}
