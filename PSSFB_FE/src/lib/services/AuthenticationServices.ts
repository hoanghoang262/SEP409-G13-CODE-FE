import axios from 'axios';

export const loginByGoogle = async (email: string, photoURL: string, userName: string) => {
	try {
		const data = {email, photoURL, userName}
		console.log(data);
		const result = await axios.post(
			`https://authenticateservice.azurewebsites.net/api/Authenticate/LoginGoogle`,data
		);
		console.log(result);
		return result.data.value.token;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const checkEmail = async (email: string) => {
    const result = await axios.post(`https://authenticateservice.azurewebsites.net/api/Authenticate/CheckEmailExist?email=${email}`)
    return result.data
}
