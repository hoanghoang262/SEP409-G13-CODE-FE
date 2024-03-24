<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from '../atoms/Input.svelte';
	import { loginWithEmailAndPsr, loginWithFacebook, loginWithGoogle } from '../firebase';
	import { currentUser, pageStatus } from '../stores/store';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import PasswordInput from '../atoms/PasswordInput.svelte';
	import ResetPasswordModal from './modals/ResetPasswordModal.svelte';
	import { loginByGoogle } from '$lib/services/AuthenticationServices';
	import { checkExist, decodeJWT, showToast, trimUserData } from '../helpers/helpers';

	let Email = '';
	let Password = '';
	let showModal = false;

	const LWF = async () => {
		const user: any = await loginWithFacebook();
		pageStatus.set('load')
		const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
		const decodeData: any = await decodeJWT(JWTFS);
		console.log('decodeData', decodeData);
		user.UserID = decodeData.UserID;
		user.Role = decodeData.Role;
		user.jwt = JWTFS;
		user.displayName = decodeData.UserName;
		currentUser.set(user);
		await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));
		pageStatus.set('done')
		if (user.Role.includes('Admin')) {
			goto('/manager');
		} else {
			goto('/learning');
		}
	};

	const LWG = async () => {
		const user: any = await loginWithGoogle();
		pageStatus.set('load')
		const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
		const decodeData: any = await decodeJWT(JWTFS);
		user.UserID = decodeData.UserID;
		user.Role = decodeData.Role;
		user.jwt = JWTFS;
		user.displayName = decodeData.UserName;
		currentUser.set(user);
		await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));
		pageStatus.set('done')
		if (user.Role.includes('Admin')) {
			goto('/manager');
		} else {
			goto('/learning');
		}
	};

	const login = async () => {
		pageStatus.set('load')
		const user: any = await loginWithEmailAndPsr(Email, Password);
		if (checkExist(user)) {
			const JWTFS = await loginByGoogle(user?.email, user?.photoURL ?? '', user?.displayName);
			const decodeData: any = decodeJWT(JWTFS);
			user.UserID = decodeData.UserID;
			user.Role = decodeData.Role;
			user.jwt = JWTFS;
			user.displayName = decodeData.UserName;
			console.log("decoded data", decodeData)
			currentUser.set(user);
			await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));
			pageStatus.set('done')
			if (user.Role.includes('Admin')) {
				goto('/manager');
			} else {
				goto('/learning');
			}
		} else {
			showToast('Login', 'Wrong email or password', 'error');
		}
	};
</script>

<div class="rounded-xl px-7 py-10 bg-white text-black">
	<h3 class="font-bold text-5xl mb-8 text-center">Start Now</h3>
	<!-- <div class="mb-3"><Input placehoder="Username" /></div> -->

	<div class="mb-3">
		<Input classes="w-full border border-black" bind:value={Email} name="Email" placehoder="Email" />
	</div>
	<div class="mb-3">
		<PasswordInput bind:value={Password} name="Password" placehoder="Password" />
	</div>
	<div
		
		class="text-right "
	>
		<button on:click={() => (showModal = true)}>forgot password?</button>
	</div>
	<div class="my-10"></div>
	<button
		on:click={login}
		class="bg-black rounded-md justify-center p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-black hover:bg-white transition ease-in-out w-full mb-2"
		>Start Coding Now</button
	>

	<div class="text-center mb-4">or use another account</div>
	<div class="flex justify-center text-5xl">
		<div role="button" on:click={LWF} on:keydown={LWF} tabindex="0">
			<Icon icon="logos:facebook" class="mr-3" />
		</div>
		<div role="button" on:click={LWG} on:keydown={LWG} tabindex="0">
			<Icon icon="akar-icons:google-contained-fill" />
		</div>
	</div>
</div>
<ResetPasswordModal {showModal} onClose={() => (showModal = false)} />
