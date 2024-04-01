<script>
	import LoadingPage from '../../../../../pages/LoadingPage.svelte';

	import LearningDetailPage from '../../../../../pages/LearningDetailPage.svelte';
	export let data;
	const promise = data.promise
</script>

{#await promise}
	<LoadingPage />
{:then promisedata} 
	<LearningDetailPage data={promisedata} />
{/await}
