import axios from "axios";
import { StudentManager } from "../../Enum/Paginators";

export const GetAllStudent = async (page: number = 1, pageSize: number = StudentManager.PageSize) => {
    const result = await axios.get(
        `https://authenticateservice.azurewebsites.net/api/Authenticate/GetAllStudent?Page=${page}&PageSize=${pageSize}`
    );
    return result.data;
};

// export const GetAllStudent = async (param: GetAllStudentType) => {
//     const result = await axios.get(
//         `https://authenticateservice.azurewebsites.net/api/Authenticate/GetAllStudent?
//         Page=${(param.pageNumber ? param.pageNumber : "1")}&
//         PageSize=${(param.pageSize ? param.pageSize : StudentManager.PageSize)}`
//     );
//     return result.data;
// };