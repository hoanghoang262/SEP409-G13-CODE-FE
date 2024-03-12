import { redirect } from '@sveltejs/kit';
import { checkExist } from '../../../../helpers/helpers';
import { getUserInfo, updateUserInfo } from '$lib/services/AuthenticationServices';
import { changeUserInfo } from '../../../../firebase';
import { currentUser } from '../../../../stores/store';
import { get } from 'svelte/store';

export async function load({ cookies }: any) {
	const userStr = cookies.get('user');
	if (!checkExist(userStr)) {
		redirect(301, '/');
	}
	const user = JSON.parse(userStr);
	const userInfo = await getUserInfo(user.UserID);
	return {
		userInfo
	};
}

export const actions = {
	editinfo: async ({ cookies, request }: any) => {
		const userStr = cookies.get('user');
        const fbcuStr = cookies.get('fbcu');
		if (!checkExist(userStr)) {
			redirect(301, '/');
		}
		const user = JSON.parse(userStr);
		const data = await request.formData();
		console.log(data);
		const displayName = data.get('displayName');
		const phoneNumber = data.get('phoneNumber');
		const photoURL = data.get('photoURL');
		const fullname = data.get('fullname');
        console.log(user.uid)
		try {
			await changeUserInfo(user.uid, { displayName, phoneNumber, photoURL });

			// await updateUserInfo(user.UserID, {
            //     userId: user.UserID,
			// 	fullname,
			// 	email: user.email,
			// 	profilePict: photoURL,
			// 	username: displayName
			// });
			cookies.set('user', JSON.stringify({ ...user, phoneNumber, photoURL, displayName }), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 5
			});

			// return JSON.stringify({
			// 	message: 'Edit successfully',
			// 	type: 'success'
			// })
		} catch (err) {
            console.log(err)
			// return JSON.stringify({
			// 	error: err,
			// 	message: 'Something went wrong',
			// 	type: 'error'
			// })
		}
	}
};
