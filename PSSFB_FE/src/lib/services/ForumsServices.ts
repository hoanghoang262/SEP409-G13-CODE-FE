import axios from "axios"

export const getAllPost = async () => {
    const result = await axios.get(`https://forumservices.azurewebsites.net/api/Forum/GetAllPost`)
    return result.data
}

export const getPostById = async (id:number) => {
    const result = await axios.get(`https://forumservices.azurewebsites.net/api/Forum/GetPostById?postId=${id}`)
    return result.data
}