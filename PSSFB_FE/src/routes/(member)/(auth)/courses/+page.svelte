<script>
	import AllCoursesPage from "../../../../pages/AllCoursesPage.svelte";
	import LoadingPage from "../../../../pages/LoadingPage.svelte"
	export let data 
	const promise = data.promise
</script>

{#await promise}
	<LoadingPage />
{:then result} 
	<AllCoursesPage {result}/>
{:catch error}
<div>{error}</div>
{/await}