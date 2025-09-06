"use client"

import { memo, useCallback } from "react"
import PlusIcon from "@/components/icons/plus-icon"

interface AddPostCardProps {
    onAddPost: () => void
}

function AddPostCard({ onAddPost }: AddPostCardProps) {
    const handleClick = useCallback(() => {
        onAddPost()
    }, [onAddPost])

    return (
        <div
            className="w-[270px] h-[293px] border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center hover:border-gray-400 cursor-pointer transition-colors"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleClick()
                }
            }}
            aria-label="Add new post"
        >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <PlusIcon className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-gray-600 font-medium">New Post</span>
        </div>
    )
}

export default memo(AddPostCard)
