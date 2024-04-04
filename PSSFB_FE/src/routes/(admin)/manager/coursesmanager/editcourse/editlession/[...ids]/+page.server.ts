import { getModCourseById, getModLessionById } from '$lib/services/ModerationServices';

export async function load({ params }: any) {
	const ids = params.ids.split('/');
	const courseId = ids[0];
	const lessionId = ids[1];
	const promise = async () => {
		const course = await getModCourseById(courseId);
		const lession = await getModLessionById(lessionId);
		return {
			course,
			lession
		};
	};
	return {
		promise: promise()
	};
}
