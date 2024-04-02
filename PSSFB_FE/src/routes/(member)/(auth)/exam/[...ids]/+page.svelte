<script>
	import ExamPage from "../../../../../pages/ExamPage.svelte";
	import LoadingPage from "../../../../../pages/LoadingPage.svelte";
    export let data;
    const promise = data.promise
</script>
{#await promise}
	<LoadingPage />
{:then data} 
	<ExamPage {data}/>
{:catch error}
<div>{error}</div>
{/await}

