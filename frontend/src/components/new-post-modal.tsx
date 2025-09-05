"use client"

import { useState } from "react"
import { useCreatePost } from "@/hooks/use-posts"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Loader from "@/components/loader";

interface NewPostModalProps {
    userId: string
    open: boolean
    onClose: () => void
}

export default function NewPostModal({ userId, open, onClose }: NewPostModalProps) {
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
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">New Post</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post title
                        </label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Give your post a title"
                            disabled={createPostMutation.isPending}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post content
                        </label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write something mind-blowing"
                            rows={8}
                            disabled={createPostMutation.isPending}
                            className="h-[179px]"
                        />
                    </div>

                    {createPostMutation.error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600 text-sm">
                                {createPostMutation.error.message || "Failed to create post"}
                            </p>
                        </div>
                    )}

                    <DialogFooter className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            disabled={createPostMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                createPostMutation.isPending ||
                                !title.trim() ||
                                !content.trim()
                            }
                        >
                            {createPostMutation.isPending ? (
                                <div className="flex gap-3">
                                    Publish <Loader/>
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

