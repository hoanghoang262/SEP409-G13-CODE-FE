<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { checkExist, showToast } from '../helpers/helpers';
	import { currentUser, pageStatus } from '../stores/store';
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	import { page } from '$app/stores';
	import LoadingPage from '../pages/LoadingPage.svelte';

	export let data;

	export let form:any;

	if(form?.type=='error'){
		showToast(`${form?.error??"error"}`,`${form?.message??"something went wrong"}`,"error")
	}

	
	if (checkExist(data?.user)) {
		currentUser.set(data.user);
	}

</script>

<Header />
<slot />
{#if !$page.url.pathname.includes('/manager')}
	<Footer />
{/if}
<ToastContainer placement="top-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>
{#if $pageStatus == 'load'}
	<LoadingPage />
{/if}
