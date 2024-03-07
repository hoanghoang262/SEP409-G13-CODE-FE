import axios from "axios"

export const getAllPost = async () => {
    const result = await axios.get(`https://forumservices.azurewebsites.net/api/Forum/GetAllPost`)
    return result.data
}