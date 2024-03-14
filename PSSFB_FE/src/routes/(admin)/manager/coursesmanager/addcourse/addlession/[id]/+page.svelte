<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../../../../../../../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import { initQuestion, type answerOption, type Question } from '$lib/type';
	import { goto } from '$app/navigation';

	let questions: Question[] = [];
	let defaultModal = false;
	let answerOptions: answerOption[] = [];
	let SelectedQIndex = 0;
	const addQues = () => {
		questions = [...questions, initQuestion()];
	};
</script>

<div class="w-4/5">
	<div>
		<Label defaultClass=" mb-3 block">Lession Title</Label>
		<Input
			required={true}
			name="title"
			classes="block w-1/3 ml-4 border mb-5"
			placehoder="Lession Title"
		/>

		<Label defaultClass=" mb-3 block">Description</Label>
		<div class="mb-5 ml-4"><Textarea name="description" placeholder="Description" /></div>
		<Label defaultClass=" mb-3 block">Duration</Label>
		<input
			type="number"
			class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
			required
			name="duration"
			placeholder="duration"
		/>
		<Label defaultClass=" mb-3 block">Video URL</Label>
		<Input
			required={true}
			name="videoUrl"
			classes="block w-1/3 ml-4 border mb-5"
			placehoder="Video URL"
		/>
		<Label defaultClass=" mb-3 block">Lession Content</Label>
		<Editor apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83" />

		<hr class="my-5" />

		<Label defaultClass=" mb-3 block">Question</Label>

		{#each questions as q, index}
			<div class="flex justify-between">
				<button on:click={() => {answerOptions = q.answerOptions; SelectedQIndex=index; defaultModal=true}}>question {index+1}</button>
				<Button content="Delete" />
			</div>
		{/each}

		<Modal title="Terms of Service" bind:open={defaultModal}>
			{#each answerOptions as answer}
				<div class="flex justify-between">
					<div>
						<Label>Answer</Label>
						<Input classes="border w-2/3" bind:value={answer.optionsText}/>
						<input type="checkbox" bind:checked={answer.correctAnswer}/>
					</div>
				</div>
			{/each}
			<svelte:fragment slot="footer">
				<Button onclick={() => {questions[SelectedQIndex].answerOptions = answerOptions; defaultModal = false}} content="Save" />
				<Button onclick={() => (defaultModal = false)} content="Cancel" />
			</svelte:fragment>
		</Modal>

		<Button onclick={addQues} content="Add Question" />
		<div class="flex justify-end"><Button onclick={() => goto("/manager/coursesmanager/addcourse/addcodelession/0")} content="Save" /></div>
	</div>
</div>
