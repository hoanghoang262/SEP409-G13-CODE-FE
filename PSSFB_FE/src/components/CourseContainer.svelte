<script lang="ts">
	import Icon from '@iconify/svelte';
	import { secondsToHMS } from '../helpers/helpers';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser } from '../stores/store';
	import Status from '../atoms/Status.svelte';
	import { t } from '../translations/i18n';
	export let course: any;
	export let type = 'public';
	export let ApproveCourse: any = () => {};
	export let RejectCourse: any = () => {};
	export let DeleteCourse: any = () => {};
</script>

<div class="relative h-[450px]">
	<div
		class="absolute top-0 left-0 w-[90%] border rounded shadow-xl hover:-translate-y-5 transition group"
	>
		{#if type == 'public'}
			<div class="overflow-hidden w-full h-[200px] shadow-md flex justify-center items-center">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img alt="Course Image" src={course.picture} class="w-full h-full text-center" />
			</div>
			<!--Course Information-->
			<div class="p-4 transition delay-50 duration-300 ease-in-out">
				<h3 class="font-medium text-xl mb-2 group-hover:underline">{course.name}</h3>
				{#if $currentUser?.Role == 'Student'}
					<p class="text-sm"><span class="font-semibold">Create By:</span> {course.userName}</p>
				{/if}
				<p class="text-sm"><span class="font-semibold">{$t('Language')}</span>: {course.tag}</p>
				<p class="text-sm line-clamp-1 group-hover:line-clamp-3">
					<span class="font-semibold">Description</span>: {course.description}
				</p>
			</div>
			<hr />
			<div class="px-2 py-5 flex justify-between items-center">
				<div class="flex items-center text-sm">{course.tag}</div>

				{#if $currentUser?.Role == 'AdminSystem'}
					<div>
						{#if course?.status != 'Accepted'}
							<Button
								classes="text-green-500"
								onclick={() => ApproveCourse(course?.courseId)}
								content={$t('Approve')}
							/>
						{/if}

						{#if course?.status != 'Rejected'}
							<Button
								classes="text-red-500"
								onclick={() => RejectCourse(course?.id)}
								content={$t('Reject')}
							/>
						{/if}
						<Button
							onclick={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)}
							content={$t('Detail')}
						/>
					</div>
				{:else if $currentUser?.Role == 'AdminBussiness'}
					<div>
						<Button
							onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
							content={$t('Edit')}
						/>
						<Button type="danger" onclick={() => DeleteCourse(course.id)} content={$t('Delete')} />
					</div>
				{:else}
					<Button onclick={() => goto(`/learning/${course.id}`)} content={$t('join now')} />
				{/if}
			</div>
		{:else if type == 'admin'}
			<button on:click={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)}
				><img alt="courseimg" src={course.coursePicture} class="w-full" /></button
			>

			<div class="p-4">
				<h3 class="font-medium text-xl mb-2">{course.courseName}</h3>

				<p class="text-sm text-neutral-500 mb-3">{course.userName}</p>
				<p class="truncate text-sm">{course.courseDescription}</p>
				<p>
					{#if course?.status}
						<Status status={course?.status} />
					{/if}
				</p>
			</div>
			<hr />
			<div class="px-2 py-5 flex justify-between items-center">
				<div class="flex items-center text-sm">{course.createdAt}</div>

				{#if $currentUser?.Role == 'AdminSystem'}
					<div>
						{#if course?.status != 'Accepted'}
							<Button
								type="Accepted"
								onclick={() => ApproveCourse(course?.courseId)}
								content={$t('Approve')}
							/>
						{/if}

						{#if course?.status != 'Rejected'}
							<Button
								type="Rejected"
								classes="text-red-500"
								onclick={() => RejectCourse(course?.id)}
								content={$t('Reject')}
							/>
						{/if}
						<!-- <Button
						onclick={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)}
						content="Detail"
					/> -->
					</div>
				{:else if $currentUser?.Role == 'AdminBussiness'}
					<div>
						<Button
							onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
							content={$t('Edit')}
						/>
						<Button type="danger" onclick={() => DeleteCourse(course.id)} content={$t('Delete')} />
					</div>
				{:else}
					<Button onclick={() => goto(`/learning/${course.id}`)} content={$t('join now')} />
				{/if}
			</div>
		{/if}
	</div>
</div>
