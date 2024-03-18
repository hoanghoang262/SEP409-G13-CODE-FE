<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../../../../../../../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import {
		initQuestion,
		type Lession,
		initLessions,

		initAnswer

	} from '$lib/type';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../../../../../../../components/AdminCourseSB.svelte';
	import { showToast } from '../../../../../../../helpers/helpers';
	import { addLession, getModCourseById, updateLession } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { getCourseById } from '$lib/services/CourseServices';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';

	export let data;
	let course = data.course;
	let lession = data.lession;
	$: questions = lession.questions??[];
	const ids = $page.params.ids.split("/");
	const lessionId = ids[1]
	const courseId:any = ids[0]
	let defaultModal = false;
	let SelectedQIndex = 0;
	
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<Label defaultClass=" mb-3 block">Detail Lession</Label>
			<hr class="my-3"/>
			<Label defaultClass=" mb-3 block">Lession Title</Label>
			<div>{lession.title}</div>

			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				{@html lession.description}
			</div>
			<Label defaultClass=" mb-3 block">Duration: {lession.duration}</Label>
			<Label defaultClass=" mb-3 block">Video</Label>
			<div class="w-3/4">
			<video src={lession.videoUrl}>
				<track kind="captions">
			</video>
			</div>
			<Label defaultClass=" mb-3 block">Lession Content</Label>
			{@html lession.contentLesson}

			<hr class="my-5" />

			<Label defaultClass=" mb-3 block">Question</Label>

			{#each questions as q, index}
				<div class="flex justify-between">
					<div class="w-4/5">
						<button class="mb-5"
							on:click={() => {
								SelectedQIndex = index;
								defaultModal = true;
							}}>question #{index + 1}</button
						>
						<Label defaultClass=" mb-3 block">Question Content</Label>
						<div>{q.contentQuestion}</div>
						<Label defaultClass=" mb-3 block">Popup Second: {q.time}</Label>
					</div>
				</div>
			{/each}

			
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminSystemSb bind:course />
	</div>
</div>


<Modal title="Answers" bind:open={defaultModal}>
	{#each questions[SelectedQIndex].answerOptions as answer, index}
		<div class="flex justify-between">
			<div>
				<Label>Answer</Label>
				<Input classes="border w-2/3" bind:value={answer.optionsText} />
				<input type="checkbox" bind:checked={answer.correctAnswer} />
			</div>
		</div>
	{/each}
	
	<svelte:fragment slot="footer">
		
		<Button onclick={() => (defaultModal = false)} content="Back" />
	</svelte:fragment>
</Modal>