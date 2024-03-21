import { getAllModPosts } from "$lib/services/ModerationServices";

export async function load(){
    const result = await getAllModPosts()
    return {
        result
    }
}