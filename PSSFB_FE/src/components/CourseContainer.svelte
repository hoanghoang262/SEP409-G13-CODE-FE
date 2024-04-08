<script lang="ts">
	import Icon from '@iconify/svelte';
	import { secondsToHMS, showToast } from '../helpers/helpers';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser } from '../stores/store';
	import Status from '../atoms/Status.svelte';
	import { t } from '../translations/i18n';
	import { formatDateTime } from '../helpers/datetime';
	import { addWishList } from '$lib/services/CourseServices';
	import { page } from '$app/stores';
	export let course: any;
	export let type = 'public';
	export let ApproveCourse: any = () => {};
	export let RejectCourse: any = () => {};
	export let DeleteCourse: any = () => {};

	export const WishListHandle: any = (event:  any) => {
		addWishList($currentUser?.UserID, course.id);
		showToast('Add to wish list', 'Add to wish list successfully', 'success');
		event?.target?.classList?.remove('text-slate-400');
		event?.target?.classList?.add('text-red-600');
	};
	export let RemoveFromWishList: any = () => {};
</script>

<div class="relative h-[450px]">
	<div
		class="absolute top-0 left-0 w-[90%] border rounded shadow-xl hover:-translate-y-5 transition group"
	>
		{#if type == 'public'}
			<div class="overflow-hidden w-full h-[200px] shadow-md flex justify-center items-center">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					alt="Course Image"
					src={course.picture}
					class="w-full h-full text-center object-cover"
				/>
			</div>
			<!--Course Information-->
			<div class="p-4 transition delay-50 duration-300 ease-in-out">
				{#if $currentUser?.Role == 'AdminBussiness'}
					<button class="font-medium text-xl mb-2 group-hover:underline">{course.name}</button>
				{:else}
					<button
						on:click={() => goto(`/learning/${course.id}`)}
						class="font-medium text-xl mb-2 group-hover:underline">{course.name}</button
					>
				{#if $currentUser?.Role == 'Student'}
					<div class="flex justify-between items-center">
						<button
							on:click={() => goto(`/learning/${course.id}`)}
							class="font-medium text-xl mb-2 group-hover:underline truncate mr-4"
							>{course.name}</button
						>

						<button
							on:click={WishListHandle}
							class="mb-2 rounded-full p-1 hover:border-2 border-blue-500"
						>
							{#if course?.isInWishList == false}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 26 26"
									{...$$props}
								>
									<path
										fill="currentColor"
										d="M17.869 3.889c-2.096 0-3.887 1.494-4.871 2.524c-.984-1.03-2.771-2.524-4.866-2.524C4.521 3.889 2 6.406 2 10.009c0 3.97 3.131 6.536 6.16 9.018c1.43 1.173 2.91 2.385 4.045 3.729c.191.225.471.355.765.355h.058c.295 0 .574-.131.764-.355c1.137-1.344 2.616-2.557 4.047-3.729C20.867 16.546 24 13.98 24 10.009c0-3.603-2.521-6.12-6.131-6.12"
									/>
								</svg>
							{:else if course?.isInWishList == true}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 48 48"
									{...$$props}
								>
									<path
										fill="#f44336"
										d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12"
									/>
								</svg>
							{/if}
						</button>
					</div>

					<p class="text-sm"><span class="font-semibold">Create By:</span> {course.userName}</p>
				{/if}
				<p class="text-sm flex items-center justify-between">
					<span><span class="font-semibold">{$t('Language')}</span>: {course.tag}</span>
				</p>
				<p class="text-sm line-clamp-1 group-hover:line-clamp-3">
					<span class="font-semibold">Description</span>: {course.description}
				</p>
			</div>
			<hr />
			<div class="px-2 py-5 flex justify-between items-center">
				<div class="flex items-center text-sm"></div>

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
			{#if $page.url.pathname.includes('wishlist') && $currentUser?.Role == 'Student'}
				<div class="flex justify-end">
					<button
						on:click={() => RemoveFromWishList(course.id)}
						class="text-red-500 text-xs py-3 px-3">Remove from wishlist</button
					>
				</div>
			{/if}
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
				<div class="flex items-center text-sm">{formatDateTime(course.createdAt)}</div>

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
