import { courses, schedules } from "../../../../../data/data";



export async function load({params}:any) {
    const ids = params.ids.split('/');
    const courseIndex = ids[0];
    const chapterIndex = ids[1];
    const lessionIndex = ids[2];
    return {
        course: courses[courseIndex],
        chapter: schedules[courseIndex][chapterIndex],
        lession: schedules[courseIndex][chapterIndex].lessions[lessionIndex]
    }
}