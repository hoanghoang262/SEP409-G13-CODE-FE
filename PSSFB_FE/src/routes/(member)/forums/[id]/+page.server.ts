import { Posts } from "../../../../data/data";

export async function load({params}:any){
    const id = params.id;
    return {
        post: Posts[id]
    }
}