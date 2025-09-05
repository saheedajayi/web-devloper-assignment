import { Factory } from "fishery"
import { Post } from "@/types/post"

export const PostFactory = Factory.define<Post>(({ sequence }) => ({
    id: `post-${sequence}`,
    title: `Test Post ${sequence}`,
    body: `This is the body content for test post ${sequence}. It contains meaningful text for testing purposes.`,
    userId: `user-${sequence}`,
    createdAt: new Date().toISOString(),
}))