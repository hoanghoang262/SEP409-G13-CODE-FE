import { getChapterById, getCourseById, getPraticeQuestionById } from "$lib/services/CourseServices";
import { courses, schedules } from "../../../../../data/data";



export async function load({params}:any) {
    const ids = params.ids.split('/');
    const courseId = ids[0];
    const chapterId = ids[1];
    const practiceQuestionId = ids[2];
    const course = await getCourseById(courseId);
    const chapter = await getChapterById(chapterId);
    const practiceQuestion = await getPraticeQuestionById(practiceQuestionId)
    return {
        course,
        chapter,
        practiceQuestion
    }
}