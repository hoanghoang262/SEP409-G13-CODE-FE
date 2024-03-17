import axios from "axios"

export const getAllPost = async () => {
    const result = await axios.get(`https://forumservices.azurewebsites.net/api/Forum/GetAllPost`)
    return result.data
}

export const getPostById = async (id:number) => {
    const result = await axios.get(`https://forumservices.azurewebsites.net/api/Forum/GetPostById?postId=${id}`)
    return result.data
}

export const createAdminPost = async (post:any) => {
	try {
		const result = await axios.post('https://forumservices.azurewebsites.net/api/Forum/CreateAdminPost',post)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}