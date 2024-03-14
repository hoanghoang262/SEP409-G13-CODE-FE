<script lang="ts">

	import { Label, Modal, Select } from "flowbite-svelte";
	import Button from "../../../../../../../atoms/Button.svelte";
	import CodeEditor2 from "../../../../../../../components/CodeEditor2.svelte";
    import {intitCodeQuestion, type codeQuestion, initTestCase} from "$lib/type"
	import { inputTypes, language, resultTypes } from "../../../../../../../data/data";
	import Input from "../../../../../../../atoms/Input.svelte";

    let codeQuestion:codeQuestion = intitCodeQuestion();
    
    $: testcases = codeQuestion.testCases;
    let selectedTestCaseIndex = 0;
    $: selectedTestcase = codeQuestion.testCases[selectedTestCaseIndex];
    let defaultModal = false;
</script>
<div class="w-4/5">
	<div>
		<Label defaultClass=" mb-3 block">Pratice Question</Label>
		<hr class="my-5"/>
        <Label>CodeForm</Label>
        <CodeEditor2 />
        <Label>TestCases</Label>
		<hr class="my-5"/>
        {#each testcases as t, index}
			<div class="flex justify-between">
				<button on:click={() => {defaultModal=true; selectedTestCaseIndex=index}}>testcase #{index+1}</button>
				<Button content="Delete" />
			</div>
		{/each}
        <Button onclick={() => {codeQuestion.testCases = [...codeQuestion.testCases, initTestCase('int')]}} content="Add test case" />
		<div class="flex justify-end"><Button content="Save" /></div>

        <Modal title="Terms of Service" bind:open={defaultModal}>
            <Label>Input type</Label>
            <Select items={inputTypes}/>
			<div>
                <Label>inputTypeInt</Label>
                <input type="number" bind:value={selectedTestcase.inputTypeInt} class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md" required />
            </div>
            <div>
                <Label>inputTypeString</Label>
                <Input bind:value={selectedTestcase.inputTypeString} classes="border w-2/3" />
            </div>
            <div>
                <Label>inputTypeBoolean</Label>
                <input type="checkbox" bind:checked={selectedTestcase.inputTypeBoolean}/>
            </div>
            <div>
                <Label>inputTypeArrayInt</Label>
                <Input bind:value={selectedTestcase.inputTypeArrayInt} classes="border w-2/3" />
            </div>
            <div>
                <Label>inputTypeArrayString</Label>
                <Input bind:value={selectedTestcase.inputTypeArrayString} classes="border w-2/3" />
            </div>
            <Label>Result type</Label>
            <Select items={resultTypes}/>
            <div>
                <Label>expectedResultInt</Label>
                <input type="number" bind:value={selectedTestcase.expectedResultInt} class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md" required />
            </div>
            <div>
                <Label>expectedResultString</Label>
                <Input bind:value={selectedTestcase.expectedResultString} classes="border w-2/3" />
            </div>
            <div>
                <Label>expectedResultBoolean</Label>
                <input type="checkbox" bind:checked={selectedTestcase.expectedResultBoolean}/>
            </div>
			<svelte:fragment slot="footer">
				<Button onclick={() => {}} content="Save" />
				<Button onclick={() => (defaultModal = false)} content="Cancel" />
			</svelte:fragment>
		</Modal>
	</div>
</div>