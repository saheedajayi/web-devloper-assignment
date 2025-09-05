import axios from "axios"
import {CreatePostRequest, CreatePostResponse, Post} from "@/types/post";


export class PostService {
    private static baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`

    static async getPosts(userId: string): Promise<Post[]> {
        try {
            const response = await axios.get<Post[]>(this.baseURL, {
                params: { userId },
            })
            return response.data
        } catch (error) {
            throw new Error(`Failed to fetch posts ${error}`)
        }
    }

    static async createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
        try {
            const response = await axios.post<CreatePostResponse>(this.baseURL, data)
            return response.data
        } catch (error: unknown) {
            // @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (error.response?.status === 404) {
                throw new Error("User not found")
            }
            throw new Error("Failed to create post")
        }
    }

    static async deletePost(postId: string): Promise<void> {
        try {
            await axios.delete(`${this.baseURL}/${postId}`)
        } catch (error: unknown) {
            // @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (error.response?.status === 404) {
                throw new Error("Post not found")
            }
            throw new Error("Failed to delete post")
        }
    }
}
