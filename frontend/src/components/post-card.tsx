"use client"

import { memo, useCallback, useState } from "react"
import type { Post } from "@/types/post"
import DeleteIcon from "@/components/icons/delete-icon"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface PostCardProps {
    post: Post
    onDelete: (postId: string) => void
    isDeleting?: boolean
}

function PostCard({ post, onDelete, isDeleting = false }: PostCardProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleDelete = useCallback(() => {
        onDelete(post.id)
        setShowDeleteDialog(false)
    }, [post.id, onDelete])

    return (
        <div className="w-[270px] h-[293px] border border-gray-200 rounded-lg p-4 sm:p-6 relative hover:shadow-md flex flex-col">
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                    <button
                        disabled={isDeleting}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                        aria-label={`Delete post: ${post.title}`}
                    >
                        <DeleteIcon />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-8 line-clamp-2 text-balance">{post.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-8 text-pretty">{post.body}</p>
        </div>
    )
}

export default memo(PostCard)
