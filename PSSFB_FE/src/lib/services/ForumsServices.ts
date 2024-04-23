import axios from "axios"
import { checkExist } from "../../helpers/helpers"

export const getAllPost = async (posttitle: string = '',
page: number = 1,
pageSize: number = 10) => {
    const result = await axios.get(`https://ocelotapigateway.azurewebsites.net/apigateway-forum/Forum/GetAllPost?page=${page}&pageSize=${pageSize}${checkExist(posttitle)?`&PostTitle=${posttitle}`:``}`)
    return result.data.value
}

export const getAllPostByUserId = async (userId:number|undefined = undefined, posttitle: string = '',
page: number = 1,
pageSize: number = 10) => {
    const result = await axios.get(`https://ocelotapigateway.azurewebsites.net/apigateway-forum/Forum/GetAllPostsByUserId?${userId?`userId=${userId}&`:``}${checkExist(posttitle)?`Title=${posttitle}&`:``}page=${page}&pageSize=${pageSize}`)
    
	return result.data
}

export const getPostById = async (id:number) => {
    const result = await axios.get(`https://ocelotapigateway.azurewebsites.net/apigateway-forum/Forum/GetPostById?postId=${id}`)
    return result.data.value
}

export const createAdminPost = async (post:any) => {
	try {
		const result = await axios.post('https://ocelotapigateway.azurewebsites.net/apigateway-forum/Forum/CreateAdminPost',post)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}

export const putPost = async (post:any) => {
	try {
		const result = await axios.put(`https://ocelotapigateway.azurewebsites.net/apigateway-forum/Forum/UpdatePost?postId=${post.postId}`, post)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}

export const deletePost = async (postid:any) => {
	try {
		const result = await axios.delete(`https://ocelotapigateway.azurewebsites.net/apigateway-forum/Forum/DeletePost?postId=${postid}`)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}