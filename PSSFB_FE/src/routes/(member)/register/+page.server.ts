import { loginByGoogle } from "$lib/services/AuthenticationServices";
import { registerWithEmailAndPsr } from "../../../firebase";
import { checkExist, decodeJWT } from "../../../helpers/helpers";

export const actions = {
    
    register:async({cookies, request}:any) => {
        const data = await request.formData();
        console.log(data)
        console.log("server register working")
        const user:any = await registerWithEmailAndPsr(data.get("Email"), data.get("Password"),data.get("Username"));
        console.log("user",user)
        if(checkExist(user)){
            const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName)
            console.log("JWTFS",JWTFS)
            const decodeData:any = await decodeJWT(JWTFS)
            console.log("decodeData", decodeData)
            user.UserID = decodeData.UserID;
			user.Role = decodeData.Role;
			user.jwt = JWTFS;
			user.displayName = decodeData.UserName;
            cookies.set('user', JSON.stringify(user), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5
            });
        }
        return {};
    },
    
}