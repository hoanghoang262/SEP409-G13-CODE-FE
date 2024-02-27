import { courses, schedules, sysllabuses } from "../../../../../data/data";

export async function load({ parent, params }:any) {
	return {
		course:courses[params.id],
		sysllabus:sysllabuses[params.id],
		schedule:schedules[params.id],
		id:params.id
	};
}