<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { beforeUpdate, onMount } from 'svelte';
	import { checkExist } from '../helpers/helpers';
	import { currentUser } from '../stores/store';
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
