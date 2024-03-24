<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import Button from '../atoms/Button.svelte';
	import { Modal } from 'flowbite-svelte';
	import {
		deleteChapter,
		deleteCodeQuestion,
		deleteLession,
		getModCourseById
	} from '$lib/services/ModerationServices';
	import { showToast } from '../helpers/helpers';
	import { pageStatus } from '../stores/store';

	export let course: any;

	let firstWM = false;
	let secondWM = false;
	let deleteObject: any = undefined;

	const courseId = course?.id;
	$: chapters = course?.chapters ?? [];

	const plus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z' /> </svg>";

	const minus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998H5v-2h14z' /> </svg>";
	const hidden2 = (index: number) => {
		const div = document.getElementById(`si${index}`);
		const schedule = document.getElementById(`schedule${index}`);
		if (schedule) {
			if (schedule.classList.contains('hidden')) {
				schedule.classList.remove('hidden');
				div!.innerHTML = minus;
			} else {
				schedule.classList.add('hidden');
				div!.innerHTML = plus;
			}
		}
	};

	const chapterClick = (id: number) => {
		goto(`/manager/coursesmanager/editcourse/editchapter/${courseId}/${id}`);
	};

	const lessionClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/coursesmanager/editcourse/editlession/${courseId}/${lindex}`);
	};

	const codelessionClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/coursesmanager/editcourse/editcodelession/${courseId}/${lindex}`);
	};

	const deleteFunc = async () => {
		pageStatus.set('load')
		if (deleteObject) {
			switch (deleteObject.type) {
				case 'chapter':
					try {
						await deleteChapter(deleteObject.id);
						showToast('Deleted chapter ', 'Delete chapter success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted chapter ', 'Something went wrong', 'error');
					}
					break;
				case 'lession':
					try {
						await deleteLession(deleteObject.id);
						showToast('Deleted lession ', 'Delete lession success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted lession ', 'Something went wrong', 'error');
					}
					break;
				case 'practice question':
					try {
						await deleteCodeQuestion(deleteObject.id);
						showToast('Deleted practice question ', 'Delete practice question success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted practice question ', 'Something went wrong', 'error');
					}
					break;
			}
			course = await getModCourseById(course.id);
			pageStatus.set('done')
		}
	};
</script>

<div class="w-full h-full shadow-xl rounded-2xl mr-10 border bg-white pr-3">
	<div class="text-2xl font-medium px-3 py-5"><button on:click={() => goto(`/manager/coursesmanager/editcourse/${courseId}`)}>{course.name}</button></div>

	<hr class="my-5" />

	{#each chapters as s, index}
		<div class="text-lg font-medium px-3 py-5 flex items-center text-neutral-500 justify-between">
			<div
				class="mr-5"
				tabindex="0"
				role="button"
				on:keydown={() => {
					() => hidden2(index);
				}}
				on:click={() => hidden2(index)}
				id="si{index}"
			>
				{@html minus}
			</div>
			<button on:click={() => chapterClick(s.id)} class="font-normal">{s?.name}</button>
			<button
				on:click={() => {
					deleteObject = { id: s.id, type: 'chapter' };
					firstWM = true;
				}}><Icon icon="material-symbols:delete" style="color: #ff4d4d" /></button
			>
		</div>
		<div id="schedule{index}">
			{#each s.lessons as l}
				<div class="pl-10 mb-5 flex items-center flex-wrap justify-between">
					<Icon class="mr-3" icon="ion:book-sharp" style="color: gray" />

					<button on:click={() => lessionClick(l, s.id, l.id)}>{l.title}</button>
					<button
						on:click={() => {
							deleteObject = { id: l.id, type: 'lession' };
							firstWM = true;
						}}
					>
						<Icon icon="material-symbols:delete" style="color: #ff4d4d" />
					</button>

					<div class="truncate w-full pl-7 pr-10 text-sm text-neutral-500">{l.description}</div>
				</div>
			{/each}
			<div class="flex justify-end my-5">
				<button class="text-blue-500"
					on:click={() => goto(`/manager/coursesmanager/addcourse/addlession/${courseId}/${s.id}`)}
				>Add Lession</button>
			</div>

			{#each s.codeQuestions as l}
				<div class="pl-10 mb-5 flex items-center justify-between">
					<Icon class="mr-3 text-2xl" icon="material-symbols:code" style="color: gray" />

					<button on:click={() => codelessionClick(l, s.id, l.id)} class="truncate pr-10"
						>{l.description}</button
					>
					<button
						on:click={() => {
							deleteObject = { id: l.id, type: 'practice question' };
							firstWM = true;
						}}><Icon icon="material-symbols:delete" style="color: #ff4d4d" /></button
					>
				</div>
			{/each}

			<div class="flex justify-end my-5">
				<button class="text-blue-500"
					on:click={() =>
						goto(`/manager/coursesmanager/addcourse/addcodelession/${courseId}/${s.id}`)}
				>Add Practice Question</button>
			</div>
		</div>
	{/each}
	<div class="flex justify-end my-5">
		<button class="text-blue-500"
			on:click={() => goto(`/manager/coursesmanager/addcourse/addchapter/${courseId}`)}
		>Add Chapter</button>
	</div>
</div>

<Modal on:close={() => (firstWM = false)} title="Warning" bind:open={firstWM} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Do you sure you want to delete this.
	</p>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={() => (secondWM = true)}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>Yes</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>No</button
			>
		</div>
	</svelte:fragment>
</Modal>

<Modal on:close={() => (secondWM = false)} title="Warning" bind:open={secondWM} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Confirm again to delete</p>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={deleteFunc}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>Yes</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>No</button
			>
		</div>
	</svelte:fragment>
</Modal>
