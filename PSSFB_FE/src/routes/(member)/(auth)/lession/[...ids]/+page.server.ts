import { getChapterById, getCourseById, getLessionById } from "$lib/services/CourseServices";
import { courses, schedules } from "../../../../../data/data";



export async function load({params}:any) {
    const ids = params.ids.split('/');
    const courseId = ids[0];
    const chapterId = ids[1];
    const lessionId = ids[2]
    const course = await getCourseById(courseId);
    const chapter = await getChapterById(chapterId);
    const lession = await getLessionById(lessionId);
    return {
        course,
        chapter,
        lession
    }
}