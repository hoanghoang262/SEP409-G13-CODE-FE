import axios from 'axios';
import { checkExist, showToast } from '../../helpers/helpers';

export const getAllCourses = async (
	courseName: string = '',
	page: number = 1,
	pageSize: number = 6
) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetAllCourses?Page=${page}&PageSize=${pageSize}${checkExist(courseName) ? `&CourseName=${courseName}` : ``}`
	);
	return result.data.value;
};

export const getCourseById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetCourseByCourseId?Id=${id}`
	);
	return result.data.value;
};

export const getLessionById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetLessonById?lessonId=${id}`
	);
	return result.data.value;
};

export const getPraticeQuestionById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetPracticeQuestionById?practiceQuestionId=${id}`
	);
	return result.data;
};

export const getChapterById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetChapterById?chapterId=${id}`
	);
	return result.data;
};

export const getNotes = async (userId: number, lessionId: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Note/GetAllNoteOfUser?userId=${userId}&lessonId=${lessionId}`
	);
	return result.data;
};

export const addNote = async (Note:any) => {
	try {
		const result = await axios.post(
			`https://coursesservices.azurewebsites.net/api/Note/CreateNote`,Note
		);
        return result.data;
	} catch (error) {
		console.log(error);
        return error
	}
	
};

export const putNote = async (id: number, Note:any) => {
	try {
        const result = await axios.put(
            `https://coursesservices.azurewebsites.net/api/Note/UpdateNote?id=${id}`,Note
        );
        return result.data;
    } catch (error) {
        console.log(error);
        return error
    }
};

export const delNotes = async (id: number) => {
	try {
        const result = await axios.delete(
            `https://coursesservices.azurewebsites.net/api/Note/DeleteNote?id=${id}`
        );
        return result.data;
    } catch (error) {
        console.log(error);
        return error
    }
};
