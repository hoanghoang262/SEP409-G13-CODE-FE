import { getAllCourses } from "$lib/services/CourseServices";

export async function load(){
    const result = await getAllCourses()
    return {
        result
    }
}