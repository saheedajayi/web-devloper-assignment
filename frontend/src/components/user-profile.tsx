"use client"

import { memo } from "react"
import { usePosts, useDeletePost } from "@/hooks/use-posts"
import {User} from "@/types/user";

interface UserProfileProps {
    user: User
    onBack: () => void
    onNewPost: () => void
}

function UserProfile({ user, onBack, onNewPost }: UserProfileProps) {
    const { data: posts = [], isLoading, error } = usePosts(user.id.toString())
    const deletePostMutation = useDeletePost()

    const handleDeletePost = async (postId: string) => {
        try {
            await deletePostMutation.mutateAsync(postId)
        } catch (error) {
            console.error("Failed to delete post:", error)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6">
                <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Users
                </button>

                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                    {user.email} • {isLoading ? "Loading..." : `${posts.length} Posts`}
                </p>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading posts...</span>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-red-600 text-center">
                            <p className="font-medium">Error loading posts</p>
                            <p className="text-sm text-gray-600 mt-1">Please try again later</p>
                        </div>
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* New Post Button */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center hover:border-gray-400 cursor-pointer transition-colors"
                            onClick={onNewPost}
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-gray-600 font-medium">New Post</span>
                        </div>

                        {/* Posts */}
                        {posts.map((post) => (
                            <div key={post.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 relative">
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    disabled={deletePostMutation.isPending}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                                >
                                    {deletePostMutation.isPending ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-8">{post.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{post.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(UserProfile)
