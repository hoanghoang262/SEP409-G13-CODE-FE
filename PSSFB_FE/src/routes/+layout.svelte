<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { beforeUpdate, onMount } from 'svelte';
	import { checkExist } from '../helpers/helpers';
	import { currentUser, pageStatus } from '../stores/store';
	import { goto } from '$app/navigation';
	import { FlatToast, ToastContainer } from 'svelte-toasts';

	export let data;

	if (checkExist(data?.user)) {
		currentUser.set(data.user);
	}

	
</script>

<Header />
<slot />
<Footer />
<ToastContainer placement="top-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>

{#if $pageStatus=="load"}
<div class="z-10 absolute top-0 opacity-30 bg-black h-full w-full m-auto text-center pt-60">
	<p class="text-white text-4xl font-medium italic">Loading...</p>
</div>
{/if}
