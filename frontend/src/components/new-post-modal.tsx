"use client"

import type React from "react"

import { type FormEvent, useState, useCallback } from "react"
import { useCreatePost } from "@/hooks/use-posts"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Loader from "@/components/loader"

interface NewPostModalProps {
    userId: string
    open: boolean
    onClose: () => void
}

const TITLE_MAX_LENGTH = 100
const BODY_MAX_LENGTH = 500

export default function NewPostModal({ userId, open, onClose }: NewPostModalProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const createPostMutation = useCreatePost()

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault()
            if (title.trim() && content.trim() && title.length <= TITLE_MAX_LENGTH && content.length <= BODY_MAX_LENGTH) {
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
        },
        [title, content, userId, createPostMutation, onClose],
    )

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Allow typing but truncate if over limit
        setTitle(value.slice(0, TITLE_MAX_LENGTH))
    }, [])

    const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        // Allow typing but truncate if over limit
        setContent(value.slice(0, BODY_MAX_LENGTH))
    }, [])

    const handleCancel = useCallback(() => {
        onClose()
    }, [onClose])

    // Check character limit status
    const titleAtLimit = title.length >= TITLE_MAX_LENGTH
    const contentAtLimit = content.length >= BODY_MAX_LENGTH
    const titleNearLimit = title.length >= TITLE_MAX_LENGTH * 0.9
    const contentNearLimit = content.length >= BODY_MAX_LENGTH * 0.9

    // Helper function to get counter color
    const getCounterColor = (length: number, maxLength: number) => {
        if (length >= maxLength) return 'text-red-500 font-medium'
        if (length >= maxLength * 0.9) return 'text-amber-500 font-medium'
        return 'text-gray-500'
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md h-[600px] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">New Post</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Post title</label>
                            {title.length > 0 && (
                                <span className={`text-xs ${getCounterColor(title.length, TITLE_MAX_LENGTH)}`}>
                                    {title.length}/{TITLE_MAX_LENGTH}
                                </span>
                            )}
                        </div>
                        <Input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Give your post a title"
                            disabled={createPostMutation.isPending}
                            className={`rounded-[4px] ${titleAtLimit ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : titleNearLimit ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500' : ''}`}
                        />
                        {titleAtLimit && (
                            <p className="text-xs text-red-500 mt-1">Character limit reached</p>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Post content</label>
                            {content.length > 0 && (
                                <span className={`text-xs ${getCounterColor(content.length, BODY_MAX_LENGTH)}`}>
                                    {content.length}/{BODY_MAX_LENGTH}
                                </span>
                            )}
                        </div>
                        <Textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder="Write something mind-blowing"
                            disabled={createPostMutation.isPending}
                            className={`max-h-[300px] rounded-[4px] resize-none flex-1 overflow-auto ${contentAtLimit ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : contentNearLimit ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500' : ''}`}
                        />
                        {contentAtLimit && (
                            <p className="text-xs text-red-500 mt-1">Character limit reached</p>
                        )}
                    </div>

                    {createPostMutation.error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600 text-sm">{createPostMutation.error.message || "Failed to create post"}</p>
                        </div>
                    )}

                    <DialogFooter className="flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={handleCancel} disabled={createPostMutation.isPending}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                createPostMutation.isPending ||
                                !title.trim() ||
                                !content.trim() ||
                                title.length > TITLE_MAX_LENGTH ||
                                content.length > BODY_MAX_LENGTH
                            }
                            className="rounded-[4px]"
                        >
                            {createPostMutation.isPending ? (
                                <div className="flex gap-3 items-center mx-4">
                                    Publish <Loader size={40} />
                                </div>
                            ) : (
                                "Publish"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
