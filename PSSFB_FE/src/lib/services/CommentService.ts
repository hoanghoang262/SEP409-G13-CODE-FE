import axios from "axios"

export const getCommentByPost = async (id: number) => {
    const result = await axios.get(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/GetAllCommentInPost?postId=${id}`)
    return result.data.value
}

export const getCommentByCourse = async(id:number) => {
    const result = await axios.get(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/GetAllCommentInCourse?courseId=${id}`)
    return result.data.value
}

export const getCommentByLesson = async(id:number) => {
    const result = await axios.get(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/GetAllCommentInLesson?lessonId=${id}`)
    return result.data.value
}

export const postComment = async(comment:any) => {
    try{
        await axios.post(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/CreateComment`, comment)
    }catch(err){
        console.log(err)
        return err;
    }
}

export const putComment = async(comment:any) => {
    try{
        await axios.put(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/UpdateComment?id=${comment.id}`, comment)
    }catch(err){
        console.log(err)
        return err;
    }
}

export const delComment = async(id:number) => {
    try{
        await axios.delete(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/DeleteComment?id=${id}`)
    }catch(err){
        console.log(err)
        return err;
    }
}

export const postReplyComment = async(comment:any) => {
    try{
        await axios.post(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/CreateReply`, comment)
    }catch(err){
        console.log(err)
        return err;
    }
}

export const putReplyComment = async(comment:any) => {
    try{
        await axios.put(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/UpdateReply?id=${comment.replyId}`, comment)
    }catch(err){
        console.log(err)
        return err;
    }
}

export const delReplyComment = async(id:number) => {
    try{
        await axios.delete(`https://ocelotapigateway.azurewebsites.net/apigateway-comment/Comment/DeleteReply?id=${id}`)
    }catch(err){
        console.log(err)
        return err;
    }
}