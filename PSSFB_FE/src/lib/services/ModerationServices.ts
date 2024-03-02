import axios from "axios";

export const addCourse = async (course:any) => {
	try {
		const result = await axios.post(
			`https://courseservices.azurewebsites.net/api/Moderation/AddCourse`,course
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};