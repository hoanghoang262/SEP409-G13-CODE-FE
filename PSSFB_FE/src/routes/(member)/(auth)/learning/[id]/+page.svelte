<script lang="ts">
	import LoadingPage from '../../../../../pages/LoadingPage.svelte';

	import LearningDetailPage from '../../../../../pages/LearningDetailPage.svelte';
	export let data:any;
	const promise = data.promise
</script>

{#await promise}
	<LoadingPage />
{:then promisedata} 
	<LearningDetailPage data={promisedata} /> 
{:catch error}
<div>{error}</div>
{/await}
