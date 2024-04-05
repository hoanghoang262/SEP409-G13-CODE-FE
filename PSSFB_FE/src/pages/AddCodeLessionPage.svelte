<script lang="ts">
	import { Label, Modal, Select, Textarea } from 'flowbite-svelte';
	import Button from '../atoms/Button.svelte';
	import CodeEditor2 from '../components/CodeEditor2.svelte';
	import { intitCodeQuestion, type codeQuestion, initTestCase } from '$lib/type';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { addCodeQuestion, getModCourseById } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { showToast } from '../helpers/helpers';
	import { onMount } from 'svelte';
	import { pageStatus } from '../stores/store';
	import { goto } from '$app/navigation';

	export let course:any;
	const ids = $page.params.ids.split('/');

	let codeQuestion: codeQuestion = intitCodeQuestion();
	const chapterId = ids[1];
    const courseId:any = ids[0];

	const saveCQ = async () => {
		pageStatus.set('load')
		console.log(JSON.stringify({ chapterId, practiceQuestion: codeQuestion }));
		try {
			const response = await addCodeQuestion({ chapterId, practiceQuestion: codeQuestion });
            console.log(response)
			showToast('Add Practice Question', 'Add practice Question Success', 'success');
            goto(`/manager/coursesmanager/addcourse/addexam/${courseId}/${chapterId}`);
		} catch (e) {
			console.log(e);
			showToast('Add Practice Question', 'Something went wrong', 'error');
		}
		pageStatus.set('done')
	};
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<Label defaultClass=" mb-3 block">Add Pratice Question</Label>
			<hr class="my-5" />
			<Label>Description</Label>
			<Textarea bind:value={codeQuestion.description}/>
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
			<hr class="my-5" />
			
			<div class="flex justify-end"><Button onclick={saveCQ} content="Save" /></div>

			
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminCourseSb bind:course={course} />
	</div>
</div>