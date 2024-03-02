import axios from 'axios';

export const loginByGoogle = async (email: string, photoURL: string) => {
	try {
		const result = await axios.post(
			`https://courseservices.azurewebsites.net/api/Authenticate/LoginGoogle`
		);
		return result.data.value.token;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const checkEmail = async (email: string) => {
    const result = await axios.post(`https://authenticateservice.azurewebsites.net/api/Authenticate/CheckEmailExist?email=todentsukanai%40gmail.com`)
    return result.data
}
