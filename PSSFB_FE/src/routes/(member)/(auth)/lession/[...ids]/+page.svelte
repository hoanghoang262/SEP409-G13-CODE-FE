<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import CommentContainer from '../../../../../components/CommentContainer.svelte';
	import CourseSideBar from '../../../../../components/CourseSideBar.svelte';
	import LessionVideoContainer from '../../../../../components/LessionVideoContainer.svelte';
	import { convertSecondsToMmSs } from '../../../../../helpers/helpers';
	import { currentUser, pageStatus } from '../../../../../stores/store';
	import { delNotes, getNotes, putNote } from '$lib/services/CourseServices';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../atoms/Button.svelte';
	export let data;
	const course = data?.course;
	const chapter = data?.chapter;
	const lession = data?.lession;
	const comments = data?.comments;
	let notes = data?.notes;
	let currentTime = 0;
	let section = 'Comments';

	async function DelNote(id: number) {
		pageStatus.set('load');
		await delNotes(id);
		notes = await getNotes($currentUser.UserID, lession.id);
		pageStatus.set('done');
	}

	const EditClick = (id: number) => {
		console.log('edit click');
		const noteEditor = document.getElementById(`editornote${id}`);
		const noteContent = document.getElementById(`notecontent${id}`);
		if (noteEditor?.classList.contains('hidden') && !noteContent?.classList.contains('hidden')) {
			noteEditor.classList.remove('hidden');
			noteContent?.classList.add('hidden');
		} else if (
			!noteEditor?.classList.contains('hidden') &&
			noteContent?.classList.contains('hidden')
		) {
			noteEditor?.classList.add('hidden');
			noteContent.classList.remove('hidden');
		}
	};

	async function EditNote(note: any) {
		pageStatus.set('load');
		await putNote(note.id, note);
		notes = await getNotes($currentUser.UserID, lession.id);
		const noteEditor = document.getElementById(`editornote${note.id}`);
		const noteContent = document.getElementById(`notecontent${note.id}`);
		noteEditor?.classList.add('hidden');
		noteContent?.classList.remove('hidden');
		pageStatus.set('done');
	}
</script>

<div class="pt-32 bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium">{course.name} > {chapter.name} > {lession.title}</div>
	<div class="flex bg-white text-black">
		<div class="w-1/5"><CourseSideBar {course} /></div>
		<div class="w-3/5 p-3 overflow-y-scroll max-h-screen">
			<div class="flex items-center">
				<Avatar src={course.avatar} classes="w-10 mr-3 rounded-full" />
				{course.created_Name}
			</div>
			<hr class="my-5" />
			<LessionVideoContainer {lession} bind:notes bind:currentTime />
		</div>
		<div class="w-1/5">
			<div class="flex p-5">
				<button
					on:click={() => (section = 'Comments')}
					class="mr-3 {section == 'Comments' ? 'text-blue-500 underline underline-offset-8' : ''}"
					>Comments</button
				>
				<button
					on:click={() => (section = 'Notes')}
					class="mr-3 {section == 'Notes' ? 'text-blue-500 underline underline-offset-8' : ''}"
					>Notes</button
				>
			</div>
			<div class="pl-5">
				{#if section == 'Comments'}
					<CommentContainer {comments} />
				{:else if section == 'Notes'}
					<div class="w-full">
						{#each notes as note}
							<div class="flex items-center justify-between mb-3">
								<button
									on:click={() => {
										currentTime = note.videoLink;
									}}
									><span class="py-2 px-5 mr-3 bg-blue-500 rounded-full text-white"
										>{convertSecondsToMmSs(note.videoLink)}</span
									></button
								>
								<div class="flex items-center">
									<button on:click={() => EditClick(note.id)}>
										<Icon
											class="text-2xl mr-3"
											icon="material-symbols:edit"
											style="color: #aeadad"
										/>
									</button>

									<button on:click={() => DelNote(note.id)}
										><Icon
											class="text-2xl mr-3"
											icon="material-symbols:delete"
											style="color: #aeadad"
										/></button
									>
								</div>
							</div>
							<div class="bg-neutral-100 px-5 py-3 text-wrap mb-5">
								<div id="notecontent{note.id}">{@html note.contentNote}</div>
								<div id="editornote{note.id}" class="hidden">
									<Editor
										bind:value={note.contentNote}
										apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
									/>
									<div class="flex justify-end">
										<Button onclick={() => EditNote(note)} content="Edit Note" />
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
