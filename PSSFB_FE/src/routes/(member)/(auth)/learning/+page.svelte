<script lang="ts">
	import { goto } from "$app/navigation";
	import { checkExist } from "../../../../helpers/helpers";
	import LearningPage from "../../../../pages/LearningPage.svelte";
	import LoadingPage from "../../../../pages/LoadingPage.svelte";
	import { currentUser } from "../../../../stores/store";

export let data:any
const promise = data.promise

</script>

{#await promise}
<LoadingPage />
{:then result} 
<LearningPage courses={result.items}/>
{:catch error}
<div>{error}</div>
{/await}

