import { getCourseById } from "$lib/services/CourseServices";
import { courses, schedules, sysllabuses } from "../../../../../data/data";

export async function load ({params}:any){
    const id = params.id;
    const promise = getCourseById(id);
    return {
        promise,
    }
}