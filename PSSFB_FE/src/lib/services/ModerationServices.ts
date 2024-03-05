import axios from "axios";

export const addCourse = async (course:any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/Moderation/AddCourse`,course
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getAllModCourse = async () => {
	const result = await axios.get(`https://moderationservice.azurewebsites.net/api/Moderation/GetModerations?page=1&pageSize=20`)
	return result.data.items
}