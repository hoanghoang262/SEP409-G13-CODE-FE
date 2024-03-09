<script lang="ts">

	import { Button, Modal } from "flowbite-svelte";
    export let showModal = false;
	export let onClose = () => {};
    export let question:any
    const correctAnswer = question.answerOptions.filter((answer:any) => answer.correctAnswer == true)
</script>
<Modal title="Question" bind:open={showModal} on:close={onClose} autoclose>
	<div>Choose {correctAnswer?.length??0} option(s)</div>
	<div>{question.contentQuestion}</div>
    <div>
        {#each question.answerOptions as answer}
            <input type="checkbox"/> {answer.optionsText}
        {/each}
    </div>
    <svelte:fragment slot="footer">
		<Button color="alternative">Answer</Button>
	</svelte:fragment>
</Modal>