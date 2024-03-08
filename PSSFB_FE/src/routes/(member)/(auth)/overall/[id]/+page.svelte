<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import CourseSideBar from '../../../../../components/CourseSideBar.svelte';

	export let data: any;

	const course = data?.course;
	const courseId = data?.id
	const chapters = course?.chapters
	const codeworks = course.chapters.flatMap((chapter:any) => chapter.codeQuestions);
	const quizs = course.chapters.flatMap((chapter:any) => chapter.lessons);
	const arrowR =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 1024 1024' > <path fill='#0091ff' d='M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0' /> </svg>";

	const arrowD =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' > <path fill='#0091ff' fill-rule='evenodd' d='m6 7l6 6l6-6l2 2l-8 8l-8-8z' /> </svg>";

	const plus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z' /> </svg>";

	const minus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998H5v-2h14z' /> </svg>";
	const hidden = (event: any, index: number) => {
		const lession = document.getElementById(`lession${index}`);
		const div = document.getElementById(`divarrow${index}`);
		if (lession) {
			if (lession.classList.contains('hidden')) {
				lession.classList.remove('hidden');
				div!.innerHTML = arrowD;
			} else {
				lession.classList.add('hidden');
				div!.innerHTML = arrowR;
			}
		}
	};

	const lessionClick = (l: any, index: number, lindex:number) => {
		if (l.type == 'code') goto(`/lession/${courseId}/${index}/${lindex}`);
		else if (l.type == 'quiz') goto(`/quiz/${index}`);
	};
</script>

<div class="bg-neutral-100 pt-40 px-20 flex mb-20">
	
	<CourseSideBar course={course} />

	<div class="w-3/4 shadow-xl rounded-2xl border bg-white">
		<div class="pl-5 pt-3 text-xl text-blue-500">{course?.name}</div>
		<div class="flex pl-10 mt-20">
			<div class="flex items-center mr-20">
				<Icon class="text-3xl" icon="material-symbols:code" style="color: 0054c2" />
				<div class="ml-5">{codeworks?.length ?? 0} code(s)</div>
			</div>
			<div class="flex items-center mr-20">
				<Icon class="text-3xl" icon="ion:book-sharp" style="color: 0054c2" />
				<div class="ml-5">{quizs?.length ?? 0} quiz(s)</div>
			</div>
		</div>

		<hr class="my-5" />

		<div class="px-10">
			{#each chapters as s, index}
				<div class="mb-10">
					<div class="text-blue-600 mb-5 text-xl flex items-center">
						<div
							id="divarrow{index}"
							class="mr-3 text-2xl"
							tabindex="0"
							role="button"
							on:keydown={(event) => hidden(event, index)}
							on:click={(event) => hidden(event, index)}
						>
							{@html arrowD}
						</div>
						{s?.name}
					</div>
					<div id="lession{index}" class="transition-all" transition:fade>
						{#each s.lessons as l, lindex}
							<div
								tabindex="0"
								role="button"
								on:keydown={() => {
									lessionClick(l, index, lindex);
								}}
								on:click={() => lessionClick(l, index, lindex)}
								class="pl-10 mb-5"
								transition:fade
							>
								<div>{l.title}</div>
								<div class="text-sm text-neutral-500">{l.description}</div>
							</div>
						{/each}

						{#each s.codeQuestions as l, lindex}
							<div
								tabindex="0"
								role="button"
								on:keydown={() => {
									lessionClick(l, index, lindex);
								}}
								on:click={() => lessionClick(l, index, lindex)}
								class="pl-10 mb-5"
								transition:fade
							>
								<div>{l.description}</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
