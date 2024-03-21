import axios from 'axios';
import { checkExist } from '../../helpers/helpers';

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
}

export const addChapter = async (chapter: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/ChapterModeration/AddChapter`,
			chapter
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const addLession = async (lession: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/LessonModeration/CreateLesson`,
			lession
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const addCodeQuestion = async (codeques: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/PracticeQuestion/CreatePracticeQuestion`,
			codeques
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updateCourse = async (course: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/CourseModeration/UpdateCourse`,
			course
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
}

export const updateChapter = async (chapter: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/ChapterModeration/UpdateChapter?id=${chapter.id}`,
			chapter
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updateLession = async (lession: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/LessonModeration/UpdateLesson?id=${lession.lessonId}`,
			lession
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updateCodeQuestion = async (codeques: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/PracticeQuestion/UpdatePracticeQuestion?id=${codeques.practiceQuestionId}`,
			codeques
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteCourse = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/CourseModeration/DeleteCourse?courseId=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
}

export const deleteChapter = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/ChapterModeration/DeleteChapter?id=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteLession = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/LessonModeration/DeleteLesson?id=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteCodeQuestion = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/PracticeQuestion/DeletePracticeQuestion?id=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getCreatingCourseByUser = async (id:number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/CourseModeration/GetCourseByUserId?userId=${id}`
	);
	return result.data;
};

export const getAllModCourse = async (courseName:string="",page:number=1,pageSize:number=6) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationsCourse?${checkExist(courseName)?`courseName=${courseName}`:``}&page=${page}&pageSize=${pageSize}`
	);
	return result.data;
};

export const getModCourseById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationCourseById?courseId=${id}`
	);
	return result.data;
};

export const getAllModPosts = async (postTitle:string="",page:number=1,pageSize:number=10) => {
	const result = await axios.get(`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationsPost?${checkExist(postTitle)?`postTitle=${postTitle}`:``}&page=${page}&pageSize=${pageSize}`)
	return result.data
}

export const getModPostById = async (id: number) => {
	const result = await axios.get(`https://moderationservice.azurewebsites.net/api/Post/GetPostById?postId=${id}`)
	return result.data.value
}

export const approvedPost = async (id: number) => {
	const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/ModerationPost?postId=${id}`)
	return result.data.value
}

export const getModChapterById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/ChapterModeration/GetChapterById?id=${id}`
	);

	return result.data
}

export const getModLessionById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/LessonModeration/GetLessonById?id=${id}`,
	);

	return result.data.value
}

export const getModPraticeQuestionById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/PracticeQuestion/GetPracticeQuestionById?id=${id}`
	);
	return result.data.value
}

export const approveCourse = async (courseId: number) => {
	try {
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/ModerationCourse?courseId=${courseId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const sendCourseToApprove = async (courseId: number) => {
	try {
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/SendToModeration?CourseId=${courseId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const createPost = async (post:any) => {
	try {
		const result = await axios.post('https://moderationservice.azurewebsites.net/api/Moderation/CreatePost',post)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}

// export const deleteModPost = async (postId:number) => {
// 	try {
// 		const result = await axios.post('https://moderationservice.azurewebsites.net/api/Moderation/CreatePost',post)
// 		return result.data
// 	} catch (error) {
// 		console.log(error);
// 		return error
// 	}
// }
