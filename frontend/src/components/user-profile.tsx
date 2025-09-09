"use client"

import {memo, useCallback} from "react"
import {useRouter} from "next/navigation"
import {useUsers} from "@/hooks/use-users"
import {usePosts} from "@/hooks/use-posts"
import UserPosts from "@/components/user-posts"
import {ArrowLeft} from "lucide-react"
import Loader from "@/components/loader";

interface UserProfileProps {
    userId: string
}

function UserProfile({userId}: UserProfileProps) {
    const router = useRouter()
    const {data: usersData, isLoading: usersLoading} = useUsers(0, 100)
    const {data: posts = []} = usePosts(userId)

    const user = usersData?.users.find((u) => u.id.toString() === userId)

    const handleBack = useCallback(() => {
        router.push("/")
    }, [router])

    const BackButton = () => (
        <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
            aria-label="Back to users list"
        >
            <ArrowLeft size={20}/>
            Back to Users
        </button>
    )

    if (usersLoading) {
        return (
            <div className="bg-white">
                <div className="p-4 sm:p-6">
                    <BackButton/>
                    <div className="flex justify-center items-center h-[70vh] py-12">
                        <Loader/>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="bg-white">
                <div className="p-4 sm:p-6">
                    <BackButton/>
                    <div className="flex justify-center items-center h-[70vh] py-12">
                        <p className="text-gray-600 text-lg">User not found</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="p-4 sm:p-6">
                <BackButton/>

                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                    {user.email} • {posts.length} Posts
                </p>

                <UserPosts userId={userId} postsCount={posts.length}/>
            </div>
        </div>
    )
}

export default memo(UserProfile)