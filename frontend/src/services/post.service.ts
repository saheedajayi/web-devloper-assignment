import axios from "axios"
import type { CreatePostRequest, CreatePostResponse, Post } from "@/types/post"

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`

function handleError(error: unknown, defaultMessage: string, notFoundMessage?: string): never {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 404 && notFoundMessage) {
            throw new Error(notFoundMessage)
        }
        throw new Error(`${defaultMessage}: ${error.message}`)
    }
    throw new Error(`${defaultMessage}: Unknown error`)
}

async function getPosts(userId: string): Promise<Post[]> {
    try {
        const response = await axios.get<Post[]>(baseURL, {
            params: { userId },
        })
        return response.data
    } catch (error: unknown) {
        handleError(error, "Failed to fetch posts")
    }
}

async function createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
    try {
        const response = await axios.post<CreatePostResponse>(baseURL, data)
        return response.data
    } catch (error: unknown) {
        handleError(error, "Failed to create post", "User not found")
    }
}

async function deletePost(postId: string): Promise<void> {
    try {
        await axios.delete(`${baseURL}/${postId}`)
    } catch (error: unknown) {
        handleError(error, "Failed to delete post", "Post not found")
    }
}

export const PostService = {
    getPosts,
    createPost,
    deletePost,
}


