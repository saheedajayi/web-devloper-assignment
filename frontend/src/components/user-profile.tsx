"use client"

import { memo, useCallback } from "react"
import type { User } from "@/types/user"
import { usePosts } from "@/hooks/use-posts"
import UserPosts from "@/components/user-posts"
import { ArrowLeft } from "lucide-react"

interface UserProfileProps {
    user: User
    onBack: () => void
}

function UserProfile({ user, onBack }: UserProfileProps) {
    const { data: posts = [] } = usePosts(user.id.toString())

    const handleBack = useCallback(() => {
        onBack()
    }, [onBack])

    return (
        <div className="bg-white">
            <div className="p-4 sm:p-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                    aria-label="Back to users list"
                >
                    <ArrowLeft size={20} />
                    Back to Users
                </button>

                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                    {user.email} • {posts.length} Posts
                </p>

                <UserPosts userId={user.id.toString()} postsCount={posts.length} />
            </div>
        </div>
    )
}

export default memo(UserProfile)
