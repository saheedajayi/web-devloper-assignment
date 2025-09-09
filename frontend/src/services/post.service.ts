import { apiClient, handleApiError } from "@/lib/api"
import type { CreatePostRequest, CreatePostResponse, Post } from "@/types/post"

async function getPosts(userId: string): Promise<Post[]> {
    try {
        const response = await apiClient.get<Post[]>("/posts", {
            params: { userId },
        })
        return response.data
    } catch (error: unknown) {
        handleApiError(error, "Failed to fetch posts")
    }
}

async function createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
    try {
        const response = await apiClient.post<CreatePostResponse>("/posts", data)
        return response.data
    } catch (error: unknown) {
        handleApiError(error, "Failed to create post", "User not found")
    }
}

async function deletePost(postId: string): Promise<void> {
    try {
        await apiClient.delete(`/posts/${postId}`)
    } catch (error: unknown) {
        handleApiError(error, "Failed to delete post", "Post not found")
    }
}

export const PostService = {
    getPosts,
    createPost,
    deletePost,
}


