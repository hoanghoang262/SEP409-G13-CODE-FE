<script lang="ts">
	import { Textarea, Select, Label } from 'flowbite-svelte';

	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';

	
	import { showToast } from '../../../../../../helpers/helpers';
	import Input from '../../../../../../atoms/Input.svelte';
	import Button from '../../../../../../atoms/Button.svelte';
	import { language } from '../../../../../../data/data';
	import AdminCourseSb from '../../../../../../components/AdminCourseSB.svelte';
	import AdminSystemSb from '../../../../../../components/AdminSystemSB.svelte';

	export let data;
	let course: any = data?.course;

	
</script>

<div class="flex">
	<div class="w-4/5">
			<Label defaultClass=" mb-3 block">Detail Course</Label>
			<hr class="my-3" />
			<Label defaultClass=" mb-3 block">Course Name: {course?.name}</Label>

			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				{@html course?.description}
			</div>
			<Label defaultClass=" mb-3 block">Picture</Label>
			<div class="w-1/3 mb-5"><img alt="course img" src={course?.picture}/></div>
			<Label>
				Language: {course?.tag}
			</Label>
			<div class="flex justify-end mt-5"><Button content="Approve" /></div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminSystemSb bind:course />
	</div>
</div>
