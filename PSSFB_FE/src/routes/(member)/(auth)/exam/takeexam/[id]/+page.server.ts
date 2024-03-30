import { getExam } from "$lib/services/CourseServices";

export async function load({params}:any){
    const examId = params.id;
    const exam = await getExam(examId)
    console.log(exam)
    return {
        exam
    }
}