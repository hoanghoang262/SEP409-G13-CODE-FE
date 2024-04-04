<script>
	import EditCodeLessionPage from '../../../../../../../pages/EditCodeLessionPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<EditCodeLessionPage {data} />
{:catch error}
	<div>{error.message}</div>
{/await}