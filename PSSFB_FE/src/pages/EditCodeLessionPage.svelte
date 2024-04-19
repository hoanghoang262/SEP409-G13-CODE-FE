<script lang="ts">

	import { Label, Modal, Select, Textarea } from "flowbite-svelte";
	import Button from "../atoms/Button.svelte";
	import CodeEditor2 from "../components/CodeEditor2.svelte";
	import AdminCourseSb from "../components/AdminCourseSB.svelte";
	import { getModCourseById, updateCodeQuestion } from "$lib/services/ModerationServices";
	import { showToast } from "../helpers/helpers";
	import { pageStatus } from "../stores/store";

    export let data;

    let course = data.course;
    let codeQuestion = data.codeLession;
    

    const saveCQ = async () => {
        pageStatus.set('load')
        console.log(JSON.stringify({practiceQuestionId:codeQuestion.id,practiceQuestion: codeQuestion}))
        try{
            await updateCodeQuestion({practiceQuestionId:codeQuestion.id,practiceQuestion: codeQuestion})
            showToast("Edit Practice Question","Edit practice Question Success","success")
            course = await getModCourseById(course.id)
        }catch(e){
            console.log(e)
            showToast("Edit Practice Question","Something went wrong","error")
        }
        pageStatus.set('done')
    }
</script>


<div class="flex">

    <div class="w-4/5">
        <div>
            <Label defaultClass=" mb-3 block">Edit Pratice Question</Label>
            <a class="text-blue-500 text-sm hover:underline" href="/manager/tutorial/createCodeLession">tutorial how to create a pratice lession</a>
            <hr class="my-5"/>
            <Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				<Textarea bind:value={codeQuestion.description} name="description" placeholder="Description" />
			</div>
            <Label>CodeForm</Label>
            <CodeEditor2 bind:lang={course.tag} bind:value={codeQuestion.codeForm}/>
            <Label>TestCases</Label>
            {#if course?.tag == "Java"}
            <CodeEditor2 bind:lang={course.tag} bind:value={codeQuestion.testCaseJava}/>
            {:else if course?.tag == "C"}
            <CodeEditor2 bind:lang={course.tag} bind:value={codeQuestion.testCaseC}/>
            {:else if course?.tag == "C++"}
            <CodeEditor2 bind:lang={course.tag} bind:value={codeQuestion.testCaseCplus}/>
            {/if}
           <div class="flex justify-end"><Button onclick={saveCQ} content="Save" /></div>
    
           
        </div>
    </div>
    <div class="w-1/5 ml-10">
        <AdminCourseSb bind:course />
    </div>
</div>