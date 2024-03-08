<script>
	import Avatar from '../../../../../atoms/Avatar.svelte';
    import CodeEditor from '../../../../../components/CodeEditor.svelte';
	export let data;
	const course = data?.course;
	const chapter = data?.chapter;
	const lession = data?.practiceQuestion;
</script>

<div class="pt-32 bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium truncate">{course.name} > {chapter.name} > {lession.description}</div>
	<div class="flex bg-white text-black">
		<div class="w-1/2 p-3 overflow-y-scroll max-h-screen">
			<div class="flex items-center"><Avatar classes="w-10 mr-3"/> created_Name</div>
			<hr class="my-5"/>
			<p>
				{@html lession.description}
			</p>
		</div>
		<div class="w-1/2"><CodeEditor lang={course.tag.toLowerCase()} /></div>
	</div>
</div>
