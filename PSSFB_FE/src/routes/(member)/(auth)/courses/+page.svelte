<script lang="ts">
	import { Select } from "flowbite-svelte";
import Input from "../../../../atoms/Input.svelte";
	import CourseContainer from "../../../../components/CourseContainer.svelte";
	import SkillsSet from "../../../../components/SkillsSet.svelte";

    export let data:any;
    const courses = data.courses
    let searchStr = ""
    $: searchCourses = courses.filter((course:any) => course.name.includes(searchStr))
</script>
<div>
    <div class="bg-blue-950 text-white px-20 py-10 font-medium pt-40">
        <div class="text-3xl mb-10">Learning code online. Let's start with your first course!</div>
        <Input bind:value={searchStr} classes="w-1/4 mr-3" placehoder="search"/>
        <select class="w-1/12 inline-block text-black rounded-lg py-3">
            <option>All</option>
            <option>Enrolled</option>
            <option>All</option>
        </select>
    </div>
    <div class="my-10 px-20 flex">
        {#each searchCourses as c}
            <div class="w-1/4 p-5 mb-10">
                <CourseContainer course={c}/>
            </div>
        {/each}
        
    </div>
    <div class="px-20"><SkillsSet /></div>
</div>