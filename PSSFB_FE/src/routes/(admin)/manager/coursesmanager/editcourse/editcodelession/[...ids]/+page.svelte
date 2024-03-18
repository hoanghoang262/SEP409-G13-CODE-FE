<script lang="ts">

	import { Label, Modal, Select, Textarea } from "flowbite-svelte";
	import Button from "../../../../../../../atoms/Button.svelte";
	import CodeEditor2 from "../../../../../../../components/CodeEditor2.svelte";
    import {intitCodeQuestion, type codeQuestion, initTestCase} from "$lib/type"
	import { inputTypes, language, resultTypes } from "../../../../../../../data/data";
	import Input from "../../../../../../../atoms/Input.svelte";
	import AdminCourseSb from "../../../../../../../components/AdminCourseSB.svelte";
	import { addCodeQuestion, getModCourseById, updateCodeQuestion } from "$lib/services/ModerationServices";
	import { page } from "$app/stores";
	import { showToast } from "../../../../../../../helpers/helpers";

    export let data;

    let course = data.course;
    let codeQuestion = data.codeLession;
    $: testcases = codeQuestion.testCases;
    let selectedTestCaseIndex = 0;
    $: selectedTestcase = codeQuestion.testCases[selectedTestCaseIndex]??[];
    let defaultModal = false;

    const getselectedInputType = () => {
		if (codeQuestion.testCases[selectedTestCaseIndex]?.inputTypeInt != undefined) {
			return 'int';
		} else if (codeQuestion.testCases[selectedTestCaseIndex]?.inputTypeString != undefined) {
			return 'String';
		} else if (codeQuestion.testCases[selectedTestCaseIndex]?.inputTypeBoolean != undefined) {
			return 'boolean';
		} else if (codeQuestion.testCases[selectedTestCaseIndex]?.inputTypeArrayInt != undefined) {
			return 'int[]';
		} else if (codeQuestion.testCases[selectedTestCaseIndex]?.inputTypeArrayString != undefined) {
			return 'String[]';
		}

		return 'int';
	};

	const getselectedResultType = () => {
		if (codeQuestion.testCases[selectedTestCaseIndex].expectedResultInt != undefined) {
			return 'int';
		} else if (codeQuestion.testCases[selectedTestCaseIndex].expectedResultString != undefined) {
			return 'String';
		} else if (codeQuestion.testCases[selectedTestCaseIndex].expectedResultBoolean != undefined) {
			return 'boolean';
		}

		return 'int';
	};

	let selectedInputType = getselectedInputType();
	let selectedResultType = getselectedResultType();
    
   

    const RTChange = () => {
        selectedTestcase.expectedResultBoolean = undefined;
        selectedTestcase.expectedResultInt = undefined;
        selectedTestcase.expectedResultString = undefined;
    }

    const ITChange = () => {
        selectedTestcase.inputTypeInt = undefined;
        selectedTestcase.inputTypeArrayString = undefined;
        selectedTestcase.inputTypeBoolean = undefined;
        selectedTestcase.inputTypeArrayInt = undefined;
        selectedTestcase.inputTypeArrayString = undefined;
    }

    const saveCQ = async () => {
        console.log(JSON.stringify(codeQuestion))
        try{
            await updateCodeQuestion({practiceQuestionId:codeQuestion.id,practiceQuestion: codeQuestion})
            showToast("Edit Practice Question","Edit practice Question Success","success")
            course = await getModCourseById(course.id)
        }catch(e){
            console.log(e)
            showToast("Edit Practice Question","Something went wrong","error")
        }
    }
</script>


<div class="flex">

    <div class="w-4/5">
        <div>
            <Label defaultClass=" mb-3 block">Edit Pratice Question</Label>
            <hr class="my-5"/>
            <Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				<Textarea bind:value={codeQuestion.description} name="description" placeholder="Description" />
			</div>
            <Label>CodeForm</Label>
            <CodeEditor2 bind:value={codeQuestion.codeForm}/>
            <Label>TestCases</Label>
            <hr class="my-5"/>
            {#each testcases as t, index}
                <div class="flex justify-between">
                    <button on:click={() => {defaultModal=true; selectedTestCaseIndex=index}}>testcase #{index+1}</button>
                    <Button content="Delete" />
                </div>
            {/each}
            <Button onclick={() => {codeQuestion.testCases = [...codeQuestion.testCases, initTestCase('int')]}} content="Add test case" />
            <div class="flex justify-end"><Button onclick={saveCQ} content="Save" /></div>
    
            <Modal title="Terms of Service" bind:open={defaultModal}>
                <Label>Input type</Label>
                <Select items={inputTypes} bind:value={selectedInputType} on:change={ITChange}/>
                <div>
                    <Label>input</Label>
                    {#if selectedInputType == 'String'}
                    <Input bind:value={selectedTestcase.inputTypeString} classes="border w-2/3" />
                    {:else if selectedInputType == 'int'}
                    <input type="number" bind:value={selectedTestcase.inputTypeInt} class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md" required />
                    {:else if selectedInputType == 'boolean'}
                    <input type="checkbox" bind:checked={selectedTestcase.inputTypeBoolean}/>
                    {:else if selectedInputType == 'int[]'}
                    <Input placehoder={"1,2,3,4"} bind:value={selectedTestcase.inputTypeArrayInt} classes="border w-2/3" />
                    {:else if selectedInputType == 'String[]'}
                    <Input placehoder={"a,b,c,d"} bind:value={selectedTestcase.inputTypeArrayString} classes="border w-2/3" />
                    {/if}
                </div>
                
                <Label>Result type</Label>
                <Select items={resultTypes} bind:value={selectedResultType} on:change={RTChange}/>
                <div>
                    <Label>Expected Result</Label>
                    {#if selectedResultType=='int'}
                    <input type="number" bind:value={selectedTestcase.expectedResultInt} class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md" required />
                    {:else if selectedResultType == 'String'}
                    <Input bind:value={selectedTestcase.expectedResultString} classes="border w-2/3" />
                    {:else if selectedResultType == 'boolean'}
                    <input type="checkbox" bind:checked={selectedTestcase.expectedResultBoolean}/>
                    {/if}
                    
                </div>
               
                <svelte:fragment slot="footer">
                    <Button onclick={() => {}} content="Save" />
                    <Button onclick={() => (defaultModal = false)} content="Cancel" />
                </svelte:fragment>
            </Modal>
        </div>
    </div>
    <div class="w-1/5 ml-10">
        <AdminCourseSb bind:course />
    </div>
</div>