<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../../../../../../../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import { initQuestion, type lesson, initlessons, initAnswer } from '$lib/type';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../../../../../../../components/AdminCourseSB.svelte';
	import { showToast } from '../../../../../../../helpers/helpers';
	import { addlesson, getModCourseById, updatelesson } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { getCourseById } from '$lib/services/CourseServices';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';
	import LessionVideoContainer from '../../../../../../../components/LessionVideoContainer.svelte';

	export let data;
	console.log(data);
	let course = data.course;
	let lesson = data.lesson;
	$: questions = lesson.questions ?? [];
	const ids = $page.params.ids.split('/');
	const lessonId = ids[1];
	const courseId: any = ids[0];
	let defaultModal = false;
	let SelectedQIndex = 0;
</script>

<div class="flex">
	<div class="w-4/5">
		<div class=" p-3 overflow-y-scroll max-h-screen">
			
			
			<LessionVideoContainer {lesson} notes={{}} />
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
				<Label>Answer: {answer.optionsText}</Label>
			</div>
		</div>
	{/each}

	<svelte:fragment slot="footer">
		<Button onclick={() => (defaultModal = false)} content="Back" />
	</svelte:fragment>
</Modal>
