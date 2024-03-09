<script>
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import CourseSideBar from '../../../../../components/CourseSideBar.svelte';
	import LessionVideoContainer from '../../../../../components/LessionVideoContainer.svelte';
	export let data;
	const course = data?.course;
	const chapter = data?.chapter;
	const lession = data?.lession;

	
</script>

<div class="pt-32 bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium">{course.name} > {chapter.name} > {lession.title}</div>
	<div class="flex bg-white text-black">
		<div class="w-1/3"><CourseSideBar course={course}/></div>
		<div class="w-full p-3 overflow-y-scroll max-h-screen">
			<div class="flex items-center"><Avatar classes="w-10 mr-3"/> {course.created_Name}</div>
			<hr class="my-5"/>
			<LessionVideoContainer lession={lession}/>
		</div>
	</div>
</div>
