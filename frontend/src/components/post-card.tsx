"use client"

import { memo, useCallback } from "react"
import type { Post } from "@/types/post"
import DeleteIcon from "@/components/icons/delete-icon"

interface PostCardProps {
    post: Post
    onDelete: (postId: string) => void
    isDeleting?: boolean
}

function PostCard({ post, onDelete, isDeleting = false }: PostCardProps) {
    const handleDelete = useCallback(() => {
        onDelete(post.id)
    }, [post.id, onDelete])

    return (
        <div className="w-[270px] h-[293px] border border-gray-200 rounded-lg p-4 sm:p-6 relative hover:shadow-md flex flex-col">
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                aria-label={`Delete post: ${post.title}`}
            >
                <DeleteIcon />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-8 line-clamp-2">{post.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed overflow-hidden line-clamp-6 flex-grow">{post.body}</p>
        </div>
    )
}

export default memo(PostCard)
