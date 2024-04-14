<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { initAnswer, initAnswerExam, initExam, initQuestionExam, initQuestionExam2 } from '$lib/type';
	import { getModCourseById, updateExam } from '$lib/services/ModerationServices';
	import { convertSecondsToMmSs } from '../../../../../../../helpers/helpers';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';
	import Button from '../../../../../../../atoms/Button.svelte';

    export let data:any;
	$: course = data.course
	let Exam = data.exam
	let SelectedQIndex = 0
	let defaultModal = false
	$: selectedQ = Exam.questionExams[SelectedQIndex]

	

	
</script>

<div class="flex">
	<div class="w-4/5">
			<Label defaultClass=" mb-3 block">Detail Exam</Label>
			<hr class="my-3"/>
			<Label defaultClass=" mb-3 block">{Exam.name}</Label>
			<Label defaultClass=" mb-3 block">Time: {convertSecondsToMmSs(Exam.time)}</Label>
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
						<Label defaultClass=" mb-3 block">{q.contentQuestion}</Label>
						
					</div>
					
				</div>
			{/each}
			
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminSystemSb bind:course={course} />
	</div>
</div>

<Modal title="Answers" bind:open={defaultModal}>
	{#each selectedQ.answerExams as answer, index}
		<div class="flex justify-between">
			<div>
				<Label>{answer.optionsText} - {answer.correctAnswer}</Label>
			</div>
		</div>
	{/each}
	
	<svelte:fragment slot="footer">
		
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>