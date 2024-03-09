<script lang="ts">
	import { checkExist } from "../helpers/helpers";
	import VideoQuestionModal from "./modals/VideoQuestionModal.svelte";

	export let lession: any;
	const questions = lession.questions;
    let question = questions[0]
    let showModal = false;
    let firstTimePlay = true;

	const openQuestion = () => {
        const video:any = document.getElementById("video")
        const currentTime = video.currentTime
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
	
</script>

<div>{lession.description}</div>

<video on:play={FirstPlay} id="video" width="640" height="360" controls>
	<source src={lession.videoUrl} type="video/mp4" />
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
	Your browser does not support the video tag.
</video>

<div>{@html lession.contentLesson}</div>

<VideoQuestionModal bind:question={question} bind:showModal={showModal}/>
