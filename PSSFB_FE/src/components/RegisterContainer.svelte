<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from '../atoms/Input.svelte';
	import { loginWithFacebook, loginWithGoogle, registerWithEmailAndPsr } from '../firebase';
	import { currentUser } from '../stores/store';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import PasswordInput from '../atoms/PasswordInput.svelte';

	let Email = '';
	let RePassword = '';
	let Password = '';
	let Username = '';

	const LWF = async () => {
		const user = await loginWithFacebook();
		currentUser.set(user);
		await axios.post('/?/setuser', JSON.stringify(user));
		goto('/learning');
	};

	const LWG = async () => {
		const user = await loginWithGoogle();
		currentUser.set(user);
		await axios.post('/?/setuser', JSON.stringify(user));
		goto('/learning');
	};
</script>

<div class="rounded-xl px-7 py-10 bg-neutral-900">
	<h3 class="font-bold text-5xl mb-8 text-center">Start Now</h3>
	<!-- <div class="mb-3"><Input placehoder="Username" /></div> -->
	<form method="POST" action="/?/register">
		<div class="mb-3"><Input classes="w-full" name="Username" required={true} value={Username} placehoder="Username" /></div>
		<div class="mb-3"><Input classes="w-full" name="Email" required={true} value={Email} placehoder="Email" /></div>
		<div class="mb-3"><PasswordInput name="Password" required={true} value={Password} placehoder="Password" /></div>
		<div class="mb-3"><PasswordInput name="RePassword" required={true} value={RePassword} placehoder="Re-Enter Password" /></div>
		<div class="my-10">
			<input required type="checkbox" /> <span>I agree to PSSFBE <a href="/">Terms of use</a></span>
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
