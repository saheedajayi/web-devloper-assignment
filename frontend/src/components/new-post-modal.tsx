"use client"

import type React from "react"
import { useState } from "react"
import { useCreatePost } from "../hooks/use-posts"

interface NewPostModalProps {
    userId: string
    onClose: () => void
}

export default function NewPostModal({ userId, onClose }: NewPostModalProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const createPostMutation = useCreatePost()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim() && content.trim()) {
            try {
                await createPostMutation.mutateAsync({
                    title: title.trim(),
                    body: content.trim(),
                    userId,
                })
                setTitle("")
                setContent("")
                onClose()
            } catch (error) {
                console.error("Failed to create post:", error)
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">new post modal</div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">New Post</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Post title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your post a title"
                                disabled={createPostMutation.isPending}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Post content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write something mind-blowing"
                                rows={8}
                                disabled={createPostMutation.isPending}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {createPostMutation.error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600 text-sm">{createPostMutation.error.message || "Failed to create post"}</p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={createPostMutation.isPending}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createPostMutation.isPending || !title.trim() || !content.trim()}
                                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                {createPostMutation.isPending ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Publishing...
                                    </>
                                ) : (
                                    "Publish"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
