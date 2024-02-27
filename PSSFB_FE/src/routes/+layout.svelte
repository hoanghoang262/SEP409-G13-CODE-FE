<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { onMount } from 'svelte';
	import { checkExist } from '../helpers/helpers';
	import { currentUser } from '../stores/store';
	import { goto } from '$app/navigation';

	export let data;

  if (checkExist(data?.user)) {
			currentUser.set(data.user);
	}
</script>

<Header />
<slot />
<Footer />
