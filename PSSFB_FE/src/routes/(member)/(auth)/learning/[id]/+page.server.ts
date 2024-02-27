import { courses, schedules, sysllabuses } from "../../../../../data/data";


export function load ({params}:any){
    const id = params.id;
    return {
        course: courses[id],
        sysllabus: sysllabuses[id],
        id:id
    }
}