import { getAllPost } from "$lib/services/ForumsServices";

export async function load(){
    const posts = await getAllPost()
    return {
        posts
    }
}


