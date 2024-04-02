<script>
	import CreatedCoursesPage from "../../../../pages/CreatedCoursesPage.svelte";
	import LoadingPage from "../../../../pages/LoadingPage.svelte";
	export let data;
	const promise = data.promise
</script>

{#await promise}
	<LoadingPage />
{:then courses} 
	<CreatedCoursesPage {courses}/>
{:catch error}
<div>{error}</div>
{/await}
