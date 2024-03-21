<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import Button2 from '../../../../atoms/Button2.svelte';
	import CourseContainer from '../../../../components/CourseContainer.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import Pagination from '../../../../components/Pagination.svelte';
	import { getAllModCourse } from '$lib/services/ModerationServices';
	import Input from '../../../../atoms/Input.svelte';
	import { pageStatus } from '../../../../stores/store';

	export let data;
	let result = data.result;
	$: courses = result.items;
	let searchStr = '';

	const pagiClick = async (page: number) => {
		result = await getAllModCourse(searchStr, page);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load')
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllModCourse(searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done')
	};
</script>

<Input onKeyDown={searchFunc} bind:value={searchStr} classes="w-1/4 mr-3 border" placehoder="search" />

<div class="flex flex-wrap w-full items-center py-10">
	{#each courses as c}
		<div class="w-1/3 p-5">
			<CourseContainer type="admin" course={c} />
		</div>
	{/each}
</div>

<Pagination pagi={result} {pagiClick} />
