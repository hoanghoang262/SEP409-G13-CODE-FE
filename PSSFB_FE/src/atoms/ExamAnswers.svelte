<script lang="ts">
	export let questionExam;
    $: answerExams = questionExam.answerExams
	$: trueAnswer = answerExams.filter((ae: any) => ae.correctAnswer == true);
</script>

{#if trueAnswer.length > 1}
	{#each answerExams as ae}
		<div class="mb-3 flex items-center">
			<input class="mr-2" type="checkbox" name="answerQ{questionExam.id}" />{ae.optionsText}
		</div>
	{/each}
    <div class="text-sm text-neutral-700 mt-3">Choose {trueAnswer.length} correct answer</div>
{:else}

	{#each answerExams as ae}
		<div class="mb-3 flex items-center">
			<input class="mr-2" type="radio" name="answerQ{questionExam.id}" />{ae.optionsText}
		</div>
	{/each}
    <div class="text-sm text-neutral-700 mt-3">Choose one correct answer</div>
{/if}
