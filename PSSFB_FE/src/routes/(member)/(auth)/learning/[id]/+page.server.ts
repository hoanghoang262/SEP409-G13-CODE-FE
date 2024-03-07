import { getCourseById } from "$lib/services/CourseServices";
//import { courses, schedules, sysllabuses } from "../../../../../data/data";


export function load ({params}:any){
    const id = params.id;
    const course = getCourseById(id);
    return {
        course: course,
        id:id
    }
}