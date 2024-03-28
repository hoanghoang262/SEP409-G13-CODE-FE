<script>
	import { Label } from 'flowbite-svelte';
	import Input from '../../../../../../../../atoms/Input.svelte';
	import Button from '../../../../../../../../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../../../../../../../../components/AdminCourseSB.svelte';

    export let data;
    $: chapter = data.chapter
	$: course = data.course
</script>

<div class="flex">
	<div class="w-4/5">
			<Label defaultClass=" mb-3 block">Add Exam</Label>
			<hr class="my-3"/>
			<Label defaultClass=" mb-3 block">Add Exam Name</Label>
			<Input classes="ml-4 border w-2/3" name="name" placehoder="Exam name" />
			<Label defaultClass=" mb-3 block">Time (Second)</Label>
			<input
				type="number"
				name="time"
				class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
				required
			/>
			<div class="flex justify-end">
				<Button
					onclick={() => goto('/manager/coursesmanager/addcourse/addlession/0')}
					content="Save"
				/>
			</div>
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminCourseSb bind:course={course} />
	</div>
</div>