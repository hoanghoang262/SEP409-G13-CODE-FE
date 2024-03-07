<script lang="ts">
	import LearningPage from "../../../../pages/LearningPage.svelte";

export let data:any
const courses = data.courses
</script>

<LearningPage courses={courses}/>