import axios from 'axios';

export const getAllCourses = async(courseName:string="",pageSize:number=5,page:number=1) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetAllCourses`)
    return result.data.items
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