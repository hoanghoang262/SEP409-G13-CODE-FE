import { getAllPost } from "$lib/services/ForumsServices";

export async function load(){
    const result = await getAllPost()
    return {
        result
    }
}


