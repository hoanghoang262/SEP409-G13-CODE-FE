<script>
	import AddCodeLessionPage from '../../../../../../../pages/AddCodeLessionPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then course}
	<AddCodeLessionPage {course} />
{:catch error}
	<div>{error.message}</div>
{/await}
