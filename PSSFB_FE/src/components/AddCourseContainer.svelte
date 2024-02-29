<script lang="ts">
	import { Textarea, Select, Label, Toolbar, ToolbarGroup, ToolbarButton } from 'flowbite-svelte';
	import Editor from '@tinymce/tinymce-svelte';
	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';
	import Input from '../atoms/Input.svelte';
	import { initChapter, type Chapter, initLessions } from '$lib/type';
	import CodeEditor2 from './CodeEditor2.svelte';
	import { onMount } from 'svelte';
	import tinymce from '@tinymce/tinymce-svelte';
	import Icon from '@iconify/svelte';

	let Chapters: Chapter[] = [initChapter()];

	let lessionTypes = [
		{ value: 'quiz', name: 'quiz' },
		{ value: 'code', name: 'code' }
	];

	let language = [
		{ value: 'C', name: 'C' },
		{ value: 'C++', name: 'C++' },
		{ value: 'C#', name: 'C#' },
		{ value: 'Java', name: 'Java' },
		{ value: 'Javascript', name: 'Javascript' },
		{ value: 'Python', name: 'Python' }
	];

	let conf = {
		toolbar: 'undo redo',
		menubar: false
	};

	const hiddenChapter = (index: number) => {
		const element: any = document.getElementById(`chap${index + 1}div`);
		if (element.classList.contains('h-1')) {
			element.classList.remove('h-1');
			element.classList.add('h-full');
		} else if (element.classList.contains('h-full')) {
			element.classList.remove('h-full');
			element.classList.add('h-1');
		}
	};

	const hiddenLession = (indexc:number, index: number) => {
		const element: any = document.getElementById(`lession${index + 1}ofc${indexc+1}div`);
		if (element.classList.contains('h-1')) {
			element.classList.remove('h-1');
			element.classList.add('h-full');
		} else if (element.classList.contains('h-full')) {
			element.classList.remove('h-full');
			element.classList.add('h-1');
		}
	};

	const AddChapter = () => {
		Chapters = [
			...Chapters,
			initChapter()
		]
	}

	const AddLession = (index:number) => {
		 Chapters[index].Lessions = [
			...Chapters[index].Lessions,
			initLessions('code')
		 ]
	}
</script>

<div>
	<form>
		<Label defaultClass=" mb-3 block">Course Name</Label>
		<Input classes="block w-1/3 ml-4 border mb-5" placehoder="Course Name" />
		<Label defaultClass=" mb-3 block">Time Estimate</Label>
		<Input classes="block w-1/3 ml-4 border mb-5" placehoder="Time Estimate" />
		<Label defaultClass=" mb-3 block">Description</Label>
		<div class="mb-5 ml-4"><Textarea placeholder="Description" /></div>
		<Label>
			Language
			<Select class="mt-2 ml-4" items={language} />
		</Label>

		<hr class="my-5 block" />

		<div class="pl-5">
			<div class="text-3xl font-medium mb-5">Chapters</div>

			{#each Chapters as chapter, indexc}
				<div role="button" tabindex="0" on:keydown={() => hiddenChapter(indexc)} on:click={() => hiddenChapter(indexc)} class="flex items-center text-xl font-medium mb-5">
					Chapters #{indexc + 1} <Icon icon="eva:arrow-down-fill" class="ml-3" />
				</div>
				<div id="chap{indexc + 1}div" class="overflow-hidden h-full transition-all">
					<Label defaultClass=" mb-3 block">Chapter Name</Label>
					<input
						class="p-3 text-black border rounded-lg ml-3 w-1/3 mb-5"
						placeholder="Chapter Name"
						bind:value={chapter.Name}
					/>
					<Label defaultClass=" mb-3 block">Chapter Description</Label>
					<div class="mb-5 ml-3">
						<Textarea bind:value={chapter.Description} placeholder="Chapter Description" />
					</div>

					<hr class="my-5" />

					<div class="pl-5">
						<div class="text-2xl font-medium mb-5">Lessions of chapter {chapter.Name}</div>

						{#each chapter.Lessions as lession, indexl}
							<div role="button" tabindex="0" on:keydown={() => hiddenLession(indexc, indexl)} on:click={() => hiddenLession(indexc, indexl)} class="flex items-center text-xl font-medium mb-5 ">
								Lessions #{indexl + 1} <Icon icon="eva:arrow-down-fill" class="ml-3" />
							</div>
							<div id="lession{indexl+1}ofc{indexc+1}div" class="h-full overflow-hidden">
								<Label defaultClass=" mb-3 block">Lession Name</Label>
								<input
									class="p-3 text-black border rounded-lg ml-3 w-1/3 mb-5"
									placeholder="Lession Name"
									bind:value={lession.Name}
								/>
								<Label defaultClass=" mb-3 block">Lession Content</Label>
								<div class="mb-5 ml-3">
									<!-- <Textarea bind:value={lession.Content} placeholder="Lession Content"/> -->
									<Editor
										apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
										modelEvents="input change undo redo"
										bind:value={lession.Content}
										text="readonly-text-output"
									/>
								</div>
								<Label>
									Lession Type
									<Select class="mt-2 ml-4 mb-5" items={lessionTypes} bind:value={lession.Type} />
								</Label>

								{#if lession.Type == 'quiz'}
									<Label defaultClass=" mb-3 block">Questions of lession {lession.Name}</Label>

									{#each lession.Questions as question}
										<input
											class="p-3 ml-5 text-black w-1/3 mb-5 border rounded-lg block"
											placeholder="Question"
											bind:value={question.Question}
										/>
										{#each question.Answers as answer}
											<div class="ml-10 mb-5">
												<input placeholder="Answer" bind:value={answer.Content} />
												<input type="checkbox" bind:value={answer.Correct} /> Correct
											</div>
										{/each}
										<button class="py-2 px-5 border rounded-lg ml-5 mb-5 block">Add Answers</button>
									{/each}
									<button class="py-2 px-5 border rounded-lg mb-5">Add Question</button>
								{/if}

								{#if lession.Type == 'code'}
									<Label defaultClass=" mb-3 block">Start Code of lession {lession.Name}</Label>

									<div class="mb-5"><CodeEditor2 value={lession.Code} /></div>

									<Label defaultClass=" mb-3 block">Test cases of lession {lession.Name}</Label>

									{#each lession.TestCases as testcase}
										<Label defaultClass=" mb-3 block">Input</Label>
										{#each testcase.Inputs as input}
											<input
												class="p-3 ml-5 text-black w-1/3 mb-5 border rounded-lg"
												placeholder="Input"
												bind:value={input}
											/>
										{/each}
										<button class="py-2 px-5 border rounded-lg">Add Input</button>
										<div class="ml-5">
											<Textarea placeholder="Result" bind:value={testcase.Result} />
										</div>
									{/each}
									<button class="py-2 px-5 border rounded-lg my-5">Add Test Case</button>
								{/if}
							</div>
							
						{/each}
						<button on:click={() => AddLession(indexc)} class="py-2 px-5 border rounded-lg mb-5">Add Lession</button>
					</div>
				</div>
				
			{/each}
			<button on:click={AddChapter} class="py-2 px-5 border rounded-lg">Add Chapter</button>
		</div>
	</form>
</div>
