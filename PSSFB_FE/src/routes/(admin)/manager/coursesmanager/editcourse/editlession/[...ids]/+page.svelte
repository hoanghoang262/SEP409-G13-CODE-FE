<script>
	import EditLessionPage from '../../../../../../../pages/EditLessionPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<EditLessionPage {data} />
{:catch error}
	<div>{error.message}</div>
{/await}