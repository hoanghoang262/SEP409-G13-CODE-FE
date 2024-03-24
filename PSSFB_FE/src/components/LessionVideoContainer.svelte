<script lang="ts">
	import Icon from "@iconify/svelte";
	import { checkExist, convertSecondsToMmSs } from "../helpers/helpers";
	import VideoQuestionModal from "./modals/VideoQuestionModal.svelte";
	import { Modal } from "flowbite-svelte";
	import Editor from "@tinymce/tinymce-svelte";
	import Button from "../atoms/Button.svelte";
	import { addNote, getNotes } from "$lib/services/CourseServices";
	import { currentUser, pageStatus } from "../stores/store";

	export let lession: any;
    export let notes:any
    export let currentTime = 0
	let questions = lession.theoryQuestions;
    let question = questions[0];
    let showModal = false;
    let firstTimePlay = true;
    let showNoteModal = false;
   
	const openQuestion = () => {
        const video:any = document.getElementById("video")
        const Q = questions.find((q:any) => q.time<currentTime)
        if(checkExist(Q)){
            question = Q
            showModal = true;
            video.pause()
        }
    };

    const FirstPlay = () => {
        if(firstTimePlay){
            setInterval(openQuestion, 1000);
        }
    }
	
    let note = ''
	const AddNote = async () => {
        console.log("Add note")
        const video:any = document.getElementById("video")
        video.pause()
        pageStatus.set("load")
		const response = await addNote(
			{
				lessonId: lession.id,
				userId: $currentUser.UserID,
				contentNote: note,
				videoLink: currentTime
			},
		);
        console.log("response",response)
        notes = await getNotes($currentUser.UserID, lession.id)
        pageStatus.set("done")
	};
</script>

<div class="text-xl font-medium mb-10">{lession.description}</div>

<video bind:currentTime={currentTime} class="ml-10" on:play={FirstPlay} id="video" width="800" height="450" controls>
	<source src={lession.videoUrl} type="video/mp4" />
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
	Your browser does not support the video tag.
</video>

<div class="flex justify-end pr-20 mt-3"><button class="py-2 px-5 font-light bg-neutral-200 rounded-xl flex items-center" on:click={() => showNoteModal=true}><Icon class="mr-2 text-xl" icon="ic:baseline-plus"  style="color: black" /> Add note at <span class="font-normal ml-2">{convertSecondsToMmSs(currentTime)}</span></button></div>

<div class="mt-20">{@html lession.contentLesson}</div>

<VideoQuestionModal bind:question={question} bind:showModal={showModal}/>
<Modal title="Add Note" bind:open={showNoteModal} on:close={() => (showNoteModal = false)} autoclose>
	<Editor bind:value={note} apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83" />
	<svelte:fragment slot="footer">
		<Button onclick={AddNote} content={"Add Note"}/>
		<Button content={"Close"}/>
	</svelte:fragment>
</Modal>
