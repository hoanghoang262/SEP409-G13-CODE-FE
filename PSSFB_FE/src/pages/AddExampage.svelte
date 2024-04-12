<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { initAnswer, initExam, initQuestionExam } from '$lib/type';
	import { addExam, getModCourseById } from '$lib/services/ModerationServices';
	import { pageStatus } from '../stores/store';
	import { showToast } from '../helpers/helpers';
	import { page } from '$app/stores';

    export let data;
	let course = data.course
    const ids = $page.params.ids.split('/');
    const chapterId:any = ids[1];
	let Exam = initExam(chapterId)
	let SelectedQIndex = 0
	let defaultModal = false
	$: selectedQ = Exam.questionExams[SelectedQIndex]

	const addQues = () => {
		Exam.questionExams = [...Exam.questionExams, initQuestionExam()];
	};

	const DeleteQ = (index: number) => {
		const copy = [...Exam.questionExams];
		Exam.questionExams = [...copy.slice(0, index), ...copy.slice(index + 1, copy.length + 1)];
	};

	const DeleteA = (index: number) => {
		const copy = [...Exam.questionExams[SelectedQIndex].answerExams];
		Exam.questionExams[SelectedQIndex].answerExams = [
			...copy.slice(0, index),
			...copy.slice(index + 1, copy.length + 1)
		];
	};

	const AddExam = async() => {
		pageStatus.set("load")
		try{
			console.log(JSON.stringify({chapterId, lastExam: Exam}))
			const response = await addExam({chapterId, lastExam: Exam})
			console.log(response)
			course = await getModCourseById(course.id)
			showToast("Add Exam","Add Exam success","success")
		}catch(e) {
			console.log(e)
			showToast("Add Exam","something went wrong","error")
		}
		pageStatus.set("done")
	}
</script>

<div class="flex">
	<div class="w-4/5">
			<Label defaultClass=" mb-3 block">Add Exam</Label>
			<hr class="my-3"/>
			<Label defaultClass=" mb-3 block">Add Exam Name</Label>
			<Input bind:value={Exam.name} classes="ml-4 border w-2/3" name="name" placehoder="Exam name" />
			<Label defaultClass=" mb-3 block">Time (Second)</Label>
			<input
				type="number"
				name="time"
				bind:value={Exam.time}
				class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
				required
			/>
			<Label defaultClass=" mb-3 block">Percentage Complted (%)</Label>
			<input
				type="number"
				name="time"
				bind:value={Exam.percentageCompleted}
				class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
				required
			/>
			<Label defaultClass=" mb-3 block">Question</Label>

			{#each Exam.questionExams as q, index}
				<div class="flex justify-between">
					<div class="w-4/5">
						<button
							class="mb-5"
							on:click={() => {
								SelectedQIndex = index;
								defaultModal = true;
							}}>question #{index + 1}</button
						>
						<Label defaultClass=" mb-3 block">Question Content</Label>
						<Textarea bind:value={q.contentQuestion} />
						
					</div>
					<div class="w-1/5 flex items-end">
						<Button type="danger"
							onclick={() => {
								DeleteQ(index);
							}}
							content="Delete"
						/>
					</div>
				</div>
			{/each}
			<Button onclick={addQues} content="Add Question" />
			<div class="flex justify-end">
				<Button
					onclick={AddExam}
					content="Save"
				/>
			</div>
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminCourseSb bind:course={course} />
	</div>
</div>

<Modal title="Answers" bind:open={defaultModal}>
	{#each selectedQ.answerExams as answer, index}
		<div class="flex justify-between">
			<div>
				<Label>Answer</Label>
				<Input classes="border w-2/3" bind:value={answer.optionsText} />
				<input type="checkbox" bind:checked={answer.correctAnswer} />
			</div>
			<div><Button type="danger" onclick={() => DeleteA(index)} content="Delete Answer" /></div>
		</div>
	{/each}
	<Button
		onclick={() =>
			(Exam.questionExams[SelectedQIndex].answerExams = [
				...Exam.questionExams[SelectedQIndex].answerExams,
				initAnswer(false)
			])}
		content="Add Answer"
	/>
	<svelte:fragment slot="footer">
		<Button
			onclick={() => {
				defaultModal = false;
			}}
			content="Save"
		/>
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>