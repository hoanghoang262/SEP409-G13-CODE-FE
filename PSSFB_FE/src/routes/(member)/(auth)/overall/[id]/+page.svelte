<script>
	import LoadingPage from "../../../../../pages/LoadingPage.svelte";
	import OverallPage from "../../../../../pages/OverallPage.svelte";
export let data
const promise = data.promise
</script>
{#await promise}
	<LoadingPage />
{:then course} 
<OverallPage course={course} />
{:catch error}
<div>{error}</div>
{/await}
