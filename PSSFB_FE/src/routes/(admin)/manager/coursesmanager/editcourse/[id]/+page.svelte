<script lang="ts">
	import { Textarea, Select, Label, Toolbar, ToolbarGroup, ToolbarButton } from 'flowbite-svelte';

	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';

	import { afterUpdate, beforeUpdate } from 'svelte';
	import { showToast } from '../../../../../../helpers/helpers';
	import { goto } from '$app/navigation';
	import Input from '../../../../../../atoms/Input.svelte';
	import Button from '../../../../../../atoms/Button.svelte';
	import { language } from '../../../../../../data/data';
	import AdminCourseSb from '../../../../../../components/AdminCourseSB.svelte';

	export let data;
	export let form: any;
	let course: any = data?.course;

	if (form?.type == 'success') {
		showToast('Edit Course', form.message, form.type);
	} else if (form?.type == 'error') {
		showToast('Edit Course', form.message, form.type);
	}
</script>

<div class="flex">
	<div class="w-4/5">
		<form method="POST" action="?/editcourse">
			<input hidden name="id" value={course.id} />
			<Label defaultClass=" mb-3 block">Edit Course</Label>
			<hr class="my-3" />
			<Label defaultClass=" mb-3 block">Course Name</Label>
			<Input
				required={true}
				value={course?.name}
				name="name"
				classes="block w-1/3 ml-4 border mb-5"
				placehoder="Course Name"
			/>

			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				<Textarea name="description" value={course?.description} placeholder="Description" />
			</div>
			<Label defaultClass=" mb-3 block">Picture</Label>
			<Input
				required={true}
				name="picture"
				value={course?.picture}
				classes="block w-1/3 ml-4 border mb-5"
				placehoder="url link"
			/>
			<Label>
				Language
				<Select name="tag" class="mt-2 ml-4" items={language} value={course?.tag ?? 'C#'} />
			</Label>
			<div class="flex justify-end mt-5"><Button content="Save" /></div>
		</form>
	</div>
	<div class="w-1/5 ml-10">
		<AdminCourseSb bind:course />
	</div>
</div>
