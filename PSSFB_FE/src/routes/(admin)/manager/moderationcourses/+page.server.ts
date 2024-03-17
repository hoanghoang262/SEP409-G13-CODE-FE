import { getAllCourses } from "$lib/services/CourseServices";
import { getAllModCourse } from "$lib/services/ModerationServices";

export async function load(){
    const courses = await getAllModCourse()
    return {
        courses
    }
}