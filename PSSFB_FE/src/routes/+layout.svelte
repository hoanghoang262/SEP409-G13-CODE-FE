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
<div class="z-10 absolute top-0 opacity-30 bg-black h-[10000px] w-full m-auto text-center pt-80">
	<p class="text-white text-4xl font-medium italic flex items-center justify-center"><svg class="animate-spin h-5 w-5 mr-3 inline bg-white" viewBox="0 0 24 24" />Loading . . .  </p>
</div>
{/if}

