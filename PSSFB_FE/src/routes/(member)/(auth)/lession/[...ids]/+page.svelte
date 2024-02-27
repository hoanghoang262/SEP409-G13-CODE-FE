<script>
	import Avatar from '../../../../../atoms/Avatar.svelte';
import CodeEditor from '../../../../../components/CodeEditor.svelte';
	export let data;
	const course = data?.course;
	const chapter = data?.chapter;
	const lession = data?.lession;
</script>

<div class="pt-32 bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium">{course.title} > {chapter.name} > {lession.name}</div>
	<div class="flex bg-white text-black">
		<div class="w-1/2 p-3 overflow-y-scroll max-h-screen">
			<div class="flex items-center"><Avatar classes="w-10 mr-3"/> Steven Siren</div>
			<hr class="my-5"/>
			<p>
				This is the first lesson in the course C for beginners. The goal of this lesson is to help you get familiar with CodeLearn and setting up the C programming environment.

If you already had a C programming environment on your computer and knew how to start learning on CodeLearn, you can skip this tutorial by clicking the RUN CODE button and then clicking the SUBMIT button on the lower right corner of the screen.

Watch the video below to know how to set up the environment and submit lessons on CodeLearn (recommended to view in full-screen mode).
			</p>
		</div>
		<div class="w-1/2"><CodeEditor /></div>
	</div>
</div>
