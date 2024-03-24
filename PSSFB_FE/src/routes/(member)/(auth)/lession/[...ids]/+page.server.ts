import { getCommentByLession, postComment, postReplyComment } from "$lib/services/CommentService";
import { getChapterById, getCourseById, getLessionById, getNotes } from "$lib/services/CourseServices";
import { redirect } from "@sveltejs/kit";
import { courses, schedules } from "../../../../../data/data";
import { checkExist } from "../../../../../helpers/helpers";



export async function load({cookies, params}:any) {
    const userStr = cookies.get('user');
    if(!checkExist(userStr)){
        redirect(301, "/")
    }
    const user = JSON.parse(userStr);
    const ids = params.ids.split('/');
    const courseId = ids[0];
    const chapterId = ids[1];
    const lessionId = ids[2]
    const course = await getCourseById(courseId);
    const chapter = await getChapterById(chapterId);
    const lession = await getLessionById(lessionId);
    const comments = await getCommentByLession(lessionId)
    const notes = await getNotes(user.UserID, lessionId)
    return {
        course,
        chapter,
        lession,
        comments,
        notes
    }
}

export const actions = {
    postcomment:async({cookies, request, params}:any)=>{
        const userStr = cookies.get('user');
        if(!checkExist(userStr)){
            redirect(301, "/")
        }
        const user = JSON.parse(userStr);
       
        
        const data:any = await request.formData();
        const ids = params.ids.split('/');
        const lessionId = ids[2]
        const content = data.get('content');
        if(checkExist(lessionId)&&checkExist(content)){
            await postComment({lessonId:lessionId, commentContent: content, date: new Date().toISOString, userId: user.UserID})
        }
       
    },

    postreply:async({cookies, request}:any)=>{
        const userStr = cookies.get('user');
        if(!checkExist(userStr)){
            redirect(301, "/")
        }
        const user = JSON.parse(userStr);
       
        const data:any = await request.formData();
        const commentId = data.get('commentId');
        const content = data.get('content');
        if(checkExist(commentId)&&checkExist(content)){
            await postReplyComment({commentId: commentId, replyContent: content, date: new Date().toISOString, userId: user.UserID})
        }
       
    },
}