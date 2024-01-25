<script>
	import Icon from '@iconify/svelte';
import Input from '../atoms/Input.svelte';
</script>

<div class="rounded-xl px-7 py-10 bg-neutral-900">
	<h3 class="font-bold text-5xl mb-8 text-center">Start Now</h3>
	<div class="mb-3"><Input placehoder="Username" /></div>
	<div class="mb-3"><Input placehoder="Email" /></div>
	<div class="mb-3"><Input placehoder="Password" /></div>
	<div class="my-10" ><input type="checkbox"/> <span>I agree to PSSFBE <a href="/">Terms of use</a></span></div>
	<button
		class="bg-black rounded-md justify-center p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-black hover:bg-white transition ease-in-out w-full mb-2"
		>Start Coding Now</button
	>
    <div class="text-center mb-4">or use another account</div>
    <div class="flex justify-center text-5xl"><Icon icon="logos:facebook" class="mr-3"/><Icon icon="akar-icons:google-contained-fill"/></div>
</div>
