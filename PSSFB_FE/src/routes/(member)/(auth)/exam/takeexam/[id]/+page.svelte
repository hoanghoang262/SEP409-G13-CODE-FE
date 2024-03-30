<script>
	import { convertSecondsToMmSs, secondsToDateTime } from '../../../../../../helpers/helpers';
    import ExamAnswers from '../../../../../../atoms/ExamAnswers.svelte'

    export let data;
    const exam = data.exam;
    $: questionExams = exam.questionExams;
    let timeleft = exam.time
    let time = exam.time

    setInterval(() => {
        timeleft = timeleft-1
    },1000)
</script>

<div class="px-40 py-40">
    <div class="p-20 border rounded-xl">
        <div class="text-center font-bold text-4xl">{convertSecondsToMmSs(timeleft)}</div>
        <div class="text-4xl font-bold">{exam.name}</div>
        <hr class="my-5"/>
        <div class="mb-5">The due date for this exam is <span class="font-bold">{secondsToDateTime(Date.now()+time)}</span></div>
        {#each questionExams as qe, index}
            <div class="border mb-3 rounded py-10 px-5">
                <div class="text-xl font-extrabold mb-5">Question {index+1}</div>
                <div class="mb-3">{qe.contentQuestion}</div>
                <ExamAnswers questionExam = {qe} />
            </div>
        {/each}
    </div>
</div>