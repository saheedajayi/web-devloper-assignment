import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { PostService } from "@/services/post.service"
import {CreatePostRequest} from "@/types/post";

export const usePosts = (userId: string) => {
    return useQuery({
        queryKey: ["posts", userId],
        queryFn: () => PostService.getPosts(userId),
        enabled: !!userId,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreatePostRequest) => PostService.createPost(data),
        onSuccess: (_, variables) => {
            // Invalidate posts for the specific user
            queryClient.invalidateQueries({ queryKey: ["posts", variables.userId] })
        },
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (postId: string) => PostService.deletePost(postId),
        onSuccess: () => {
            // Invalidate all posts queries
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}
