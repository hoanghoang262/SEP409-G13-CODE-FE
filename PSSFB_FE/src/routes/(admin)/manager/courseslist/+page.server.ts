import { getAllCourses } from "$lib/services/CourseServices";

export async function load(){
    const courses = await getAllCourses()
    return {
        courses
    }
}