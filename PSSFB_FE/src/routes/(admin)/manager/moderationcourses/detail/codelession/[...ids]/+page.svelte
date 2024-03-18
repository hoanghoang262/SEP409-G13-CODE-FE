<script lang="ts">

	import { Label, Modal, Select, Textarea } from "flowbite-svelte";
	import Button from "../../../../../../../atoms/Button.svelte";
	import CodeEditor2 from "../../../../../../../components/CodeEditor2.svelte";
	import AdminCourseSb from "../../../../../../../components/AdminCourseSB.svelte";
	import AdminSystemSb from "../../../../../../../components/AdminSystemSB.svelte";

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
    
   


    
</script>


<div class="flex">

    <div class="w-4/5">
        <div>
            <Label defaultClass=" mb-3 block">Detail Pratice Question</Label>
            <hr class="my-5"/>
            <Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				{@html codeQuestion.description}
			</div>
            <Label>CodeForm</Label>
            <CodeEditor2 readonly={true} bind:value={codeQuestion.codeForm}/>
            <Label>TestCases</Label>
            <hr class="my-5"/>
            {#each testcases as t, index}
                <div class="flex justify-between">
                    <button on:click={() => {defaultModal=true; selectedTestCaseIndex=index}}>testcase #{index+1}</button>
                </div>
            {/each}
            
    
            <Modal title="Terms of Service" bind:open={defaultModal}>
                <Label>Input type: {selectedInputType}</Label>
                <div>
                    <Label>input</Label>
                    {#if selectedInputType == 'String'}
                    <Label>input: {selectedTestcase.inputTypeString}</Label>
                    {:else if selectedInputType == 'String'}
                    <Label>input: {selectedTestcase.inputTypeInt}</Label>
                    
                    {:else if selectedInputType == 'boolean'}
                    <Label>input: {selectedTestcase.inputTypeBoolean}</Label>
                    {:else if selectedInputType == 'int[]'}
                    <Label>input: {selectedTestcase.inputTypeArrayInt}</Label>
                    {:else if selectedInputType == 'String[]'}
                    <Label>input: {selectedTestcase.inputTypeArrayString}</Label>
                    {/if}
                </div>
                
                <Label>Result type: {selectedResultType}</Label>
                <div>
                    <Label>Expected Result</Label>
                    {#if selectedResultType=='int'}
                    <Label>input: {selectedTestcase.expectedResultInt}</Label>
                    
                    {:else if selectedResultType == 'String'}
                    <Label>input: {selectedTestcase.expectedResultString}</Label>
                   
                    {:else if selectedResultType == 'boolean'}
                    <Label>input: {selectedTestcase.expectedResultBoolean}</Label>
                    
                    {/if}
                    
                </div>
               
                <svelte:fragment slot="footer">
                    <Button onclick={() => (defaultModal = false)} content="Back" />
                </svelte:fragment>
            </Modal>
        </div>
    </div>
    <div class="w-1/5 ml-10">
        <AdminSystemSb bind:course />
    </div>
</div>