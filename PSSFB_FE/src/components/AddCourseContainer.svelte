<script lang="ts">
	import { Textarea, Select, Label, Toolbar, ToolbarGroup, ToolbarButton  } from 'flowbite-svelte';
	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';
	import Input from '../atoms/Input.svelte';
	import { initChapter, type Chapter } from '$lib/type';
	import CodeEditor from './CodeEditor.svelte';
	import CodeEditor2 from './CodeEditor2.svelte';

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
			<div class="text-xl font-medium mb-5">Chapters</div>

			{#each Chapters as chapter}
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
					<div class="text-xl font-medium mb-5">Lessions of chapter {chapter.Name}</div>

					{#each chapter.Lessions as lession}
						<Label defaultClass=" mb-3 block">Lession Name</Label>
						<input
							class="p-3 text-black border rounded-lg ml-3 w-1/3 mb-5"
							placeholder="Lession Name"
							bind:value={lession.Name}
						/>
						<Label defaultClass=" mb-3 block">Lession Content</Label>
						<div class="mb-5 ml-3">
							<Textarea bind:value={lession.Content} placeholder="Lession Content">
								<!-- <Toolbar slot="header" embedded>
									<ToolbarGroup>
										<ToolbarButton name="Attach file"
											><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton
										>
										<ToolbarButton name="Embed map"
											><MapPinAltSolid class="w-5 h-5" /></ToolbarButton
										>
										<ToolbarButton name="Upload image"
											><ImageOutline class="w-5 h-5" /></ToolbarButton
										>
									</ToolbarGroup>
									<ToolbarGroup>
										<ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton
										>
										<ToolbarButton name="Add emoji"
											><FaceGrinOutline class="w-5 h-5" /></ToolbarButton
										>
									</ToolbarGroup>
									<ToolbarButton name="send" slot="end"
										><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton
									>
								</Toolbar> -->
							</Textarea>
						</div>
						<Label>
							Lession Type
							<Select class="mt-2 ml-4" items={lessionTypes} bind:value={lession.Type} />
						</Label>

						{#if lession.Type == 'quiz'}
							<Label>Questions of lession {lession.Name}</Label>

							{#each lession.Questions as question}
								<input placeholder="Question" bind:value={question.Question} />
								{#each question.Answers as answer}
									<input placeholder="Answer" bind:value={answer.Content} />
									<input type="checkbox" bind:value={answer.Correct} /> Correct
								{/each}
							{/each}
						{/if}

						{#if lession.Type == 'code'}
							<Label>Start Code of lession {lession.Name}</Label>

							<CodeEditor2 value={lession.Code} />

							<Label>Test cases of lession {lession.Name}</Label>

							{#each lession.TestCases as testcase}
								<Label>Input</Label>
								{#each testcase.Inputs as input}
									<input placeholder="Input" bind:value={input} />
								{/each}
								<Textarea placeholder="Result" bind:value={testcase.Result} />
							{/each}
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</form>
</div>
