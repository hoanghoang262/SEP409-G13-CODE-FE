<script lang="ts">
	import { Label, Select, Textarea } from 'flowbite-svelte';
	import CourseSideBar from '../../../../../../components/CourseSideBar.svelte';
	import Input from '../../../../../../atoms/Input.svelte';
	import Button from '../../../../../../atoms/Button.svelte';
	import { language } from '../../../../../../data/data';

	export let data
	let course:any = data.course
</script>

<div class="flex">
	<div class="w-4/5">
		<form method="POST" action="?/editcourse">
			<Label defaultClass=" mb-3 block">Course Name</Label>
			<Input
				required={true}
				bind:value={course.name}
				classes="block w-1/3 ml-4 border mb-5"
				placehoder="Course Name"
			/>
	
			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4"><Textarea bind:value={course.description} placeholder="Description" /></div>
			<Label defaultClass=" mb-3 block">Picture</Label>
			<Input
				required={true}
				bind:value={course.picture}
				classes="block w-1/3 ml-4 border mb-5"
				placehoder="url link"
			/>
			<Label>
				Language
				<Select class="mt-2 ml-4" items={language} bind:value={course.tag} />
			</Label>
			<div class="flex justify-end"><Button content="Save" /></div>
		</form>
	</div>
	<div class="w-1/5">
		<CourseSideBar bind:course={course} />
	</div>
</div>