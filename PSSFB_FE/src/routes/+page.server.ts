import { loginByGoogle } from "$lib/services/AuthenticationServices";
import { changePasswordWithEmail, loginWithEmailAndPsr, registerWithEmailAndPsr } from "../firebase";
import { checkExist, decodeJWT } from "../helpers/helpers";
import { currentUser } from "../stores/store";


export async function load ({cookies, parent }:any){
    
    // const user:any = get(currentUser)
    // console.log("load user", user?.email)
    // if(user){
    //     redirect(302,"/learning")
    // }
    return await parent()
}

export const actions = {
    setuser:async({cookies, request}:any) => {
        const user = await request.json()
        console.log("set user", user)
        cookies.set('user', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 10
        });
    },
    setfbcu:async({cookies, request}:any) => {
        const user = await request.json()
        cookies.set('fbcu', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 5
        });
    },
    logout:async({cookies, request}:any) => {
        console.log("deleting..")
        cookies.delete('user',{
            path: '/',
        });
        cookies.delete('fbcu',{
            path: '/',
        });
    },
    login:async({cookies, request}:any) => {
        const data = await request.formData();
        console.log(data)
        console.log("login server working")
        const user:any = await loginWithEmailAndPsr(data.get("Email"), data.get("Password"));
        
        if(checkExist(user)){
            const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName)
            const decodeData:any = decodeJWT(JWTFS)
            user.UserID = decodeData.userID;
            user.Role = decodeData.Role
            user.jwt = JWTFS;
            cookies.set('user', JSON.stringify(user), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5
            });
        }
        console.log("user",user)
        return {};
    },
    register:async({cookies, request}:any) => {
        const data = await request.formData();
        console.log(data)
        console.log("server working")
        const user:any = await registerWithEmailAndPsr(data.get("Email"), data.get("Password"),data.get("Username"));
        console.log("user",user)
        if(checkExist(user)){
            const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName)
            const decodeData:any = decodeJWT(JWTFS)
            user.UserID = decodeData.userID;
            user.Role = decodeData.Role
            user.jwt = JWTFS;
            cookies.set('user', JSON.stringify(user), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5
            });
        }
        return {};
    },
    changePassword:async({cookies, request}:any) => {
        const {newPassword} = await request.json()
        await changePasswordWithEmail(newPassword)
        cookies.delete('user',{
            path: '/',
        });
    },
    
}