<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import Input from '../../../../../../../atoms/Input.svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { showToast } from '../../../../../../../helpers/helpers';
	import AdminCourseSb from '../../../../../../../components/AdminCourseSB.svelte';
	import { afterUpdate } from 'svelte';

	export let form: any;
	export let data: any;
	let course = data.course;
	console.log('data', data);
	let chapter: any = form?.response;

	if (form?.type == 'success') {
		showToast('Add Chapter', form.message, form.type);
	} else if (form?.type == 'error') {
		showToast('Add Chapter', form.message, form.type);
	}

	afterUpdate(() => {
		if (form?.response && form?.type == 'success') {
			goto(`/manager/coursesmanager/addcourse/addlession/${course.id}/${chapter.id}`);
		}
	});
</script>

<div class="flex">
	<div class="w-4/5">
		<form method="POST" action="?/addchapter">
			<Label defaultClass=" mb-3 block">Add Chapter</Label>
			<hr class="my-3"/>
			<Label defaultClass=" mb-3 block">Add Chapter Name</Label>
			<Input classes="ml-4 border w-2/3" name="name" placehoder="chapter name" />
			<Label defaultClass=" mb-3 block">Part</Label>
			<input
				type="number"
				name="part"
				class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
				required
			/>
			<div class="flex justify-end">
				<Button
					content="Save"
				/>
			</div>
		</form>
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminCourseSb bind:course={course} />
	</div>
</div>
