import axios from 'axios';
import { checkExist } from '../../helpers/helpers';

export const getAllCourses = async(courseName:string="",page:number=1,pageSize:number=6) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetAllCourses?Page=${page}&PageSize=${pageSize}${checkExist(courseName)?`&CourseName=${courseName}`:``}`)
    return result.data
}

export const getCourseById = async(id:number) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetCourseByCourseId?Id=${id}`)
    return result.data.value
}

export const getLessionById = async(id:number) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetLessonById?lessonId=${id}`)
    return result.data
}

export const getPraticeQuestionById = async(id:number) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetPracticeQuestionById?practiceQuestionId=${id}`)
    return result.data;
}

export const getChapterById = async(id:number) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetChapterById?chapterId=${id}`)
    return result.data;
}

