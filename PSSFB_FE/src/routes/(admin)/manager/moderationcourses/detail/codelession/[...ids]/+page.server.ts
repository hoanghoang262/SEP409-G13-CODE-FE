import { getModCourseById, getModPraticeQuestionById } from "$lib/services/ModerationServices";

export async function load({params}:any){
    const ids = params.ids.split('/');
    const courseId = ids[0]
    const codeLessionId = ids[1]
    const codeLession = await getModPraticeQuestionById(codeLessionId)
    const course = await getModCourseById(courseId)
    return {
        course,
        codeLession
    }
}