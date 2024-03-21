<script lang="ts">
	import Icon from '@iconify/svelte';
	import { secondsToHMS } from '../helpers/helpers';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser } from '../stores/store';
	export let course: any;
	export let type = 'public';
</script>

<div class="border rounded shadow-xl hover:-translate-y-5 transition">
	{#if type == 'public'}
		<img alt="courseimg" src={course.picture} class="w-full" />
		<div class="p-4">
			<h3 class="font-medium text-xl mb-2">{course.name}</h3>
			{#if $currentUser?.Role == 'Student'}
				<p class="text-sm">{course.userName}</p>
			{/if}
			<p class="text-sm">Language: {course.tag}</p>
			<p class="truncate text-sm">{course.description}</p>
		</div>
		<hr />
		<div class="px-2 py-5 flex justify-between items-center">
			<div class="flex items-center text-sm">{course.tag}</div>

			{#if $currentUser?.Role == 'Admin System'}
			<div>
				<Button onclick={() => goto(`/learning/${course.id}`)} content="Approve" />
				<Button onclick={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)} content="Detail" />
			</div>
			{:else if $currentUser?.Role == 'Admin Bussiness'}
				<div>
					<Button
					onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
					content="Edit"
				/>
				<Button
				type='danger'
					onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
					content="Delete"
				/>
				</div>
			{:else}
				<Button onclick={() => goto(`/learning/${course.id}`)} content="join now" />
			{/if}
		</div>
	{:else if type == 'admin'}
		<img alt="courseimg" src={course.coursePicture} class="w-full" />
		<div class="p-4">
			<h3 class="font-medium text-xl mb-2">{course.courseName}</h3>
			<p class="text-sm text-neutral-500 mb-3">{course.userName}</p>
			<p class="truncate text-sm">{course.courseDescription}</p>
		</div>
		<hr />
		<div class="px-2 py-5 flex justify-between items-center">
			<div class="flex items-center text-sm">{course.createdAt}</div>

			{#if $currentUser?.Role == 'Admin System'}
				<div>
					<Button onclick={() => goto(`/learning/${course.id}`)} content="Approve" />
					<Button onclick={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)} content="Detail" />
				</div>
			{:else if $currentUser?.Role == 'Admin Bussiness'}
				<div>
					<Button
					onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
					content="Edit"
				/>
				<Button
				type='danger'
					onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
					content="Delete"
				/>
				</div>
			{:else}
				<Button onclick={() => goto(`/learning/${course.id}`)} content="join now" />
			{/if}
		</div>
	{/if}
</div>
