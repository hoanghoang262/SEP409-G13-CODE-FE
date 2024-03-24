<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import Button from '../atoms/Button.svelte';
	import { Modal } from 'flowbite-svelte';
	import {
		deleteChapter,
		deleteCodeQuestion,
		deleteLession,
		getModCourseById
	} from '$lib/services/ModerationServices';
	import { showToast } from '../helpers/helpers';

	export let course: any;

	let firstWM = false;
	let secondWM = false;

	const courseId = course?.id;
	$: chapters = course?.chapters ?? [];

	const plus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z' /> </svg>";

	const minus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998H5v-2h14z' /> </svg>";
	const hidden2 = (index: number) => {
		const div = document.getElementById(`si${index}`);
		const schedule = document.getElementById(`schedule${index}`);
		if (schedule) {
			if (schedule.classList.contains('hidden')) {
				schedule.classList.remove('hidden');
				div!.innerHTML = minus;
			} else {
				schedule.classList.add('hidden');
				div!.innerHTML = plus;
			}
		}
	};


	const chapterClick = (id: number) => {
		goto(`/manager/moderationcourses/detail/chapter/${courseId}/${id}`);
	};

	const lessionClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/moderationcourses/detail/lession/${courseId}/${lindex}`);
	};

	const codelessionClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/moderationcourses/detail/codelession/${courseId}/${lindex}`);
	};

	
</script>

<div class="w-full h-full shadow-xl rounded-2xl mr-10 border bg-white pr-3">
	<button on:click={() => goto(`/manager/moderationcourses/detail/${courseId}`)} class="text-2xl font-medium px-3 py-5">{course.name}</button>

	<hr class="my-5" />

	{#each chapters as s, index}
		<div class="text-lg font-medium px-3 py-5 flex items-center text-neutral-500">
			<div
				class="mr-5"
				tabindex="0"
				role="button"
				on:keydown={() => {
					() => hidden2(index);
				}}
				on:click={() => hidden2(index)}
				id="si{index}"
			>
				{@html minus}
			</div>
			<button on:click={() => chapterClick(s.id)} class="font-normal">{s?.name}</button>
			
		</div>
		<div id="schedule{index}">
			{#each s.lessons as l}
				<div class="pl-10 mb-5 flex items-center flex-wrap">
					<Icon class="mr-3" icon="ion:book-sharp" style="color: gray" />

					<button on:click={() => lessionClick(l, s.id, l.id)}>{l.title}</button>
					

					<div class="truncate w-full pl-7 pr-10 text-sm text-neutral-500">{l.description}</div>
				</div>
			{/each}
			

			{#each s.codeQuestions as l}
				<div class="pl-10 mb-5 flex items-center">
					<Icon class="mr-3 text-2xl" icon="material-symbols:code" style="color: gray" />

					<button on:click={() => codelessionClick(l, s.id, l.id)} class="truncate pr-10"
						>{l.description}</button
					>
					
				</div>
			{/each}

			
		</div>
	{/each}
	
</div>


