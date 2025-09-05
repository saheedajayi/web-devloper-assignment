export interface Post {
    id: string
    title: string
    body: string
    userId: string
    createdAt?: string
}

export interface CreatePostRequest {
    title: string
    body: string
    userId: string
}

export interface CreatePostResponse {
    id: string
    message: string
}