import { getModPostById } from "$lib/services/ModerationServices";

export async function load({params}:any){
    const postId:any = params.id
    const post = await getModPostById(postId)

    return {
        post
    }
}