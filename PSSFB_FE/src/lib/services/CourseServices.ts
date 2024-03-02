import axios from 'axios';

export const getAllCourses = async() => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetAllCourses`)
    return result.data.items
}

export const getCourseById = async(id:number) => {
    const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetCourseByCourseId?Id=${id}`)
    return result.data.value[0]
}