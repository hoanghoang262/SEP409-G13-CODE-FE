import { changePasswordWithEmail, loginWithEmailAndPsr, registerWithEmailAndPsr } from "../firebase";
import { checkExist } from "../helpers/helpers";
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
        cookies.set('user', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 2
        });
    },
    logout:async({cookies, request}:any) => {
        console.log("deleting..")
        cookies.delete('user',{
            path: '/',
        });
    },
    login:async({cookies, request}:any) => {
        const data = await request.formData();
        console.log(data)
        console.log("login server working")
        const user = await loginWithEmailAndPsr(data.get("Email"), data.get("Password"));
        console.log("user",user)
        if(checkExist(user)){
            cookies.set('user', JSON.stringify(user), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 2
            });
        }
        
        return {};
    },
    register:async({cookies, request}:any) => {
        const data = await request.formData();
        console.log(data)
        console.log("server working")
        const user = await registerWithEmailAndPsr(data.get("Email"), data.get("Password"),data.get("Username"));
        console.log("user",user)
        if(checkExist(user)){
            cookies.set('user', JSON.stringify(user), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 2
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
    }
}