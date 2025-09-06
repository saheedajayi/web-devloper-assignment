"use client"

import { memo, useState, useCallback, useMemo } from "react"
import { usePosts, useDeletePost } from "@/hooks/use-posts"
import type { Post } from "@/types/post"
import Loader from "@/components/loader"
import NewPostModal from "@/components/new-post-modal"
import PostCard from "@/components/post-card"
import AddPostCard from "@/components/add-post-card"

interface UserPostsProps {
    userId: string
    postsCount: number
}

function UserPosts({ userId, postsCount }: UserPostsProps) {
    const { data: posts = [], isLoading, error } = usePosts(userId)
    const deletePostMutation = useDeletePost()
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)

    const handleDeletePost = useCallback(
        async (postId: string) => {
            try {
                await deletePostMutation.mutateAsync(postId)
            } catch (error) {
                console.error("Failed to delete post:", error)
            }
        },
        [deletePostMutation],
    )

    const handleOpenNewPost = useCallback(() => {
        setIsNewPostOpen(true)
    }, [])

    const handleCloseNewPost = useCallback(() => {
        setIsNewPostOpen(false)
    }, [])

    const postsGrid = useMemo(() => {
        if (error) {
            return (
                <div className="flex justify-center items-center py-12 col-span-full">
                    <div className="text-red-600 text-center">
                        <p className="font-medium">Error loading posts</p>
                        <p className="text-sm text-gray-600 mt-1">Please try again later</p>
                    </div>
                </div>
            )
        }

        return (
            <>
                <AddPostCard onAddPost={handleOpenNewPost} />
                {posts.map((post: Post) => (
                    <PostCard key={post.id} post={post} onDelete={handleDeletePost} isDeleting={deletePostMutation.isPending} />
                ))}
            </>
        )
    }, [posts, error, handleOpenNewPost, handleDeletePost, deletePostMutation.isPending])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full py-12">
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">{postsGrid}</div>

            <NewPostModal userId={userId} open={isNewPostOpen} onClose={handleCloseNewPost} />
        </div>
    )
}

export default memo(UserPosts)
