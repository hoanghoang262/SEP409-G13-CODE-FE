import { getCourseById, getLessionById } from "$lib/services/CourseServices";
import { courses, schedules } from "../../../../../data/data";



export async function load({params}:any) {
    const ids = params.ids.split('/');
    const courseId = ids[0];
    const lessionId = ids[1]
    const course = await getCourseById(courseId);
    const lession = await getLessionById(lessionId);
    return {
        lession: lession,
        course: course,
    }
}