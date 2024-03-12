import axios from "axios"

export const getCommentByPost = async(id:number) => {
    const result = await axios.get(`https://commentapi.azurewebsites.net/api/Comment/GetAllCommentInPost?postId=${id}`)
    return result.data
}

export const getCommentByCourse = async(id:number) => {
    const result = await axios.get(`https://commentapi.azurewebsites.net/api/Comment/GetAllCommentInCourse?courseId=${id}`)
    return result.data
}

export const getCommentByLession = async(id:number) => {
    const result = await axios.get(`https://commentapi.azurewebsites.net/api/Comment/GetAllCommentInLesson?lessonId=${id}`)
    return result.data
}

export const postComment = async(comment:any) => {
    try{
        console.log(JSON.stringify(comment))
        await axios.post(`https://commentapi.azurewebsites.net/api/Comment/CreateComment`, comment)
    }catch(err){
        console.log(err)
        return err;
    }
}

export const postReplyComment = async(comment:any) => {
    try{
        await axios.post(`https://commentapi.azurewebsites.net/api/Comment/CreateReply`, comment)
    }catch(err){
        console.log(err)
        return err;
    }
}