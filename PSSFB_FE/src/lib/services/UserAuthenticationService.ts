import axios from "axios";
import { StudentManager } from "../../Enum/Paginators";
import type { GetAllStudentType } from "../../types/param/GetAllStudent";

export const GetAllStudent = async (param: GetAllStudentType) => {
    console.log("param", param)
    const result = await axios.get(
        `https://authenticateservice.azurewebsites.net/api/Authenticate/GetAllStudent?Search=${(param.searchStr ? param.searchStr : "")}&Page=${(param.pageNumber ? param.pageNumber : "1")}&PageSize=${(param.pageSize ? param.pageSize : StudentManager.PageSize)}`
    );
    console.log(result)
    return result.data;
};