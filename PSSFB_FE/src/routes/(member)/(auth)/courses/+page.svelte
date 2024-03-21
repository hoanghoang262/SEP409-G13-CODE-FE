<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import Input from '../../../../atoms/Input.svelte';
	import CourseContainer from '../../../../components/CourseContainer.svelte';
	import SkillsSet from '../../../../components/SkillsSet.svelte';
	import Pagination from '../../../../components/Pagination.svelte';
	import { getAllCourses } from '$lib/services/CourseServices';
	import { pageStatus } from '../../../../stores/store';

	export let data: any;
	let result = data.result;
	$: courses = data.result.items;
	let searchStr = '';
	const pagiClick = async (page: number) => {
		result = await getAllCourses(searchStr, page);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load')
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try{
                result = await getAllCourses(searchStr);
            }catch(err){
                console.log(err);
            }
		}
		pageStatus.set('done')
	};
</script>

<div>
	<div class="bg-blue-950 text-white px-20 py-10 font-medium pt-40">
		<div class="text-3xl mb-10">Learning code online. Let's start with your first course!</div>
		<Input onKeyDown={searchFunc} bind:value={searchStr} classes="w-1/4 mr-3" placehoder="search" />
		<select class="w-1/12 inline-block text-black rounded-lg py-3">
			<option>All</option>
			<option>Enrolled</option>
			<option>All</option>
		</select>
	</div>
	<div class="my-10 px-20 flex">
		{#each courses as c}
			<div class="w-1/4 p-5 mb-10">
				<CourseContainer course={c} />
			</div>
		{/each}
		
	</div>
    <Pagination pagi={result} {pagiClick} />
	<div class="px-20"><SkillsSet /></div>
</div>
