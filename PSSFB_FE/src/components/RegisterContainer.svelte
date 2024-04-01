<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from '../atoms/Input.svelte';
	import { loginWithFacebook, loginWithGoogle, registerWithEmailAndPsr } from '../firebase';
	import { currentUser, pageStatus } from '../stores/store';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import PasswordInput from '../atoms/PasswordInput.svelte';
	import { checkPasswords, decodeJWT, isValidEmail, showToast, trimUserData } from '../helpers/helpers';
	import { loginByGoogle } from '$lib/services/AuthenticationServices';

	let Email = '';
	let RePassword = '';
	let Password = '';
	let Username = '';

	const LWF = async () => {
		const user: any = await loginWithFacebook();
		pageStatus.set('load');
		const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
		const decodeData: any = await decodeJWT(JWTFS);
		console.log('decodeData', decodeData);
		user.UserID = decodeData.UserID;
		user.Role = decodeData.Role;
		user.jwt = JWTFS;
		user.displayName = decodeData.UserName;
		currentUser.set(user);
		await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));

		if (user.Role.includes('Admin')) {
			goto('/manager');
		} else {
			goto('/learning');
		}
		pageStatus.set('done');
	};

	const LWG = async () => {
		const user: any = await loginWithGoogle();
		pageStatus.set('load');
		const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
		const decodeData: any = await decodeJWT(JWTFS);
		user.UserID = decodeData.UserID;
		user.Role = decodeData.Role;
		user.jwt = JWTFS;
		user.displayName = decodeData.UserName;
		currentUser.set(user);
		await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));

		if (user.Role.includes('Admin')) {
			goto('/manager');
		} else {
			goto('/learning');
		}
		pageStatus.set('done');
	};
	const registerFrmSubmit = (event: any) => {
		if (!checkPasswords(Password)) {
			event.preventDefault();
			showToast('Password warning', 'password must be 8-32 character long contain 1 number and 1 special character', 'warning');
		}

		if(Username.includes(" ")){
			event.preventDefault();
			showToast('Username warning', 'username cant has empty space', 'warning');
		
		}

		if(RePassword!=Password){
			event.preventDefault();
			showToast('Password warning', 'repassword and password are not alike', 'warning');
		
		}

		if(!isValidEmail(Email)){
			event.preventDefault();
			showToast('Email warning', 'please input an email', 'warning');
		}
	};
</script>

<div class="rounded-xl px-7 py-4 md:py-10 bg-white text-black">
	<h3 class="font-bold text-4xl md:text-5xl mb-4 md:mb-8 text-center">Register</h3>
	<!-- <div class="mb-3"><Input placehoder="Username" /></div> -->
	<form on:submit={registerFrmSubmit} method="POST" action="?/register">
		<div class="mb-3">
			<Input
				classes="w-full border border-black"
				name="Username"
				required={true}
				bind:value={Username}
				placehoder="Username"
			/>
		</div>
		<div class="mb-3">
			<Input
				classes="w-full border border-black"
				name="Email"
				required={true}
				bind:value={Email}
				placehoder="Email"
			/>
		</div>
		<div class="mb-3">
			<PasswordInput name="Password" required={true} bind:value={Password} placehoder="Password" />
		</div>
		<div class="mb-3">
			<PasswordInput
				name="RePassword"
				required={true}
				bind:value={RePassword}
				placehoder="Re-Enter Password"
			/>
		</div>
		<div class="my-4 md:my-10">
			<input class="items-center" required type="checkbox" />
			<span class="items-center text-sm"
				>I agree to PSSFBE <a class="items-center text-blue-700" href="/">Terms of use</a></span
			>
		</div>
		<button
			class="bg-black rounded-md justify-center p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-black hover:bg-white transition ease-in-out w-full mb-2"
			>Start Coding Now</button
		>
	</form>

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
