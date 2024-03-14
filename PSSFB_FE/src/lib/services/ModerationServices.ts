import axios from 'axios';
import type { N } from 'vitest/dist/reporters-trlZlObr.js';

export const addCourse = async (course: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/CourseModeration/AddCourse`,
			course
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getAllModCourse = async () => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationsCourse`
	);
	return result.data.items;
};

export const getModCourseById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationCourseById?courseId=${id}`
	);
	return result.data;
};

export const getAllModPosts = async () => {
	const result = await axios.get(`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationsPost`)
	return result.data.items
}
