import { getAllModPosts } from "$lib/services/ModerationServices";

export async function load(){
    const posts = await getAllModPosts()
    return {
        posts
    }
}