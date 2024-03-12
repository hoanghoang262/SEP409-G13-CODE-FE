<script lang="ts">
	import { goto } from "$app/navigation";
	import { checkExist } from "../../../../helpers/helpers";
	import LearningPage from "../../../../pages/LearningPage.svelte";
	import { currentUser } from "../../../../stores/store";

export let data:any
const courses = data.courses

</script>

<LearningPage courses={courses}/>