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

	export let data;
	let course = data.course;
	let lession = data.lession;
	$: questions = lession.questions??[];
	const ids = $page.params.ids.split("/");
	const lessionId = ids[1]
	const courseId:any = ids[0]
	let defaultModal = false;
	let SelectedQIndex = 0;
	const addQues = () => {
		lession.questions = [...questions, initQuestion()];
	};

	const DeleteQ = (index:number) => {
		const copy = [...lession.questions ]
		lession.questions = [...copy.slice(0, index), ...copy.slice(index+1, copy.length+1)]
	}

	const DeleteA = (index:number) => {
		const copy = [...lession.questions[SelectedQIndex].answerOptions]
		lession.questions[SelectedQIndex].answerOptions = [...copy.slice(0, index), ...copy.slice(index+1, copy.length+1)]
	}

	const EditLession = async () => {
		try{
			const response = await updateLession({lessonId: lessionId, lesson:lession})
			console.log(response)
			showToast("Edit Lession","Edit lession success","success")
			console.log(JSON.stringify({lessonId: lessionId, lesson:lession}))
			course = await getModCourseById(courseId)
			console.log("course",course)
		}catch(e) {
			console.error(e)
			showToast("Edit Lession","Something went wrong","error")
		}
	}
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<Label defaultClass=" mb-3 block">Edit Lession</Label>
			<hr class="my-3"/>
			<Label defaultClass=" mb-3 block">Lession Title</Label>
			<Input
				bind:value={lession.title}
				required={true}
				name="title"
				classes="block w-1/3 ml-4 border mb-5"
				placehoder="Lession Title"
			/>

			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				<Textarea bind:value={lession.description} name="description" placeholder="Description" />
			</div>
			<Label defaultClass=" mb-3 block">Duration</Label>
			<input
				type="number"
				class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
				required
				name="duration"
				placeholder="duration"
				bind:value={lession.duration}
			/>
			<Label defaultClass=" mb-3 block">Video URL</Label>
			<Input
				required={true}
				name="videoUrl"
				classes="block w-1/3 ml-4 border mb-5"
				placehoder="Video URL"
				bind:value={lession.videoUrl}
			/>
			<Label defaultClass=" mb-3 block">Lession Content</Label>
			<Editor
				bind:value={lession.contentLesson}
				apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
			/>

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
						<Textarea bind:value={q.contentQuestion} />
						<Label defaultClass=" mb-3 block">Popup Second</Label>
						<input
							type="number"
							class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
							required
							name="duration"
							placeholder="duration"
							bind:value={q.time}
						/>
					</div>
					<div class="w-1/5 flex items-end"><Button onclick={() => {DeleteQ(index)}} content="Delete" /></div>
				</div>
			{/each}

			<Button onclick={addQues} content="Add Question" />
			<div class="flex justify-end">
				<Button onclick={EditLession} content="Save" />
			</div>
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminCourseSb bind:course />
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
			<div><Button onclick={() => DeleteA(index)} content="Delete Answer" /></div>
		</div>
	{/each}
	<Button onclick={() => lession.questions[SelectedQIndex].answerOptions = [...lession.questions[SelectedQIndex].answerOptions, initAnswer(false)]} content="Add Answer" />
	<svelte:fragment slot="footer">
		<Button
			onclick={() => {
				console.log(lession);
				defaultModal = false
			}}
			content="Save"
		/>
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>