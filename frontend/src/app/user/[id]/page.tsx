import UserProfile from "@/components/user-profile"

interface UserPageProps {
    params: {
        id: string
    }
}

export default function UserPage({params}: UserPageProps) {
    return (
        <div className="min-h-screen w-full">
            <div className="mx-auto max-w-5xl p-4 sm:p-8">
                <UserProfile userId={params.id}/>
            </div>
        </div>
    )
}
