<script lang="ts">
	import avatar from '../assets/Thanh.jpg';
	import { Progressbar } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import CourseContainer from '../components/CourseContainer.svelte';
	import PostContainer from '../components/PostContainer.svelte';
	import SkillsSet from '../components/SkillsSet.svelte';
	import { t } from '../translations/i18n';
	import { currentUser, pageStatus } from '../stores/store';
	import Avatar from '../atoms/Avatar.svelte';
	import { goto } from '$app/navigation';
	import { afterUpdate, beforeUpdate } from 'svelte';
	import {
		getAllCourses,
		getStudyingCourseByUserId,
		getCompleteCourseByUserId,
		addWishList
	} from '$lib/services/CourseServices';
	import { showToast } from '../helpers/helpers';

	const courseTableTitle = ['Free Courses', 'Pro Courses', 'Studying', 'Complete'];
	let session = 'Free Courses';
	export let data: any;
	let courses = data.courses.items;
	let posts = data.posts.items;

	const freeCourseHandle = () => {};

	// beforeUpdate(async () => {
	// 	if (session == 'Free Courses') {
	// 		let result = await getAllCourses();
	// 		courses = result.item;
	// 	} else if (session == 'Pro Courses') {
	// 		let result = await getAllCourses();
	// 		courses = result.item;
	// 	} else if (session == 'Studying') {
	// 		let result = await getStudyingCourseByUserId(currentUser.id);
	// 		courses = result.item;
	// 	} else if (session == 'Complete') {
	// 		let result = await getCompleteCourseByUserId(currentUser.id);
	// 		courses = result.item;
	// 	}
	// 	console.log(courses);
	// });
</script>

<main>
	<!--1-->
	<div class="p-5 pt-5 bg-blue-950">
		<div class="md:h-auto h-[calc(100vh-85px)] flex flex-wrap items-center md:px-20 md:py-5">
			<div class="w-full font-light text-white text-md md:text-2xl md:mb-10">
				<span class="md:inline block">Hello {$currentUser?.email ?? 'Guest'}.</span>
				<span class="">Welcome you to PSSFB</span>
				<p>
					Let's <span class="px-3 py-1 font-medium rounded-xl bg-white text-black">Start</span> to explore
					more!
				</p>
			</div>
			{#if $currentUser}
				<div class="md:flex w-full justify-between items-start">
					<div class="w-full md:w-1/3">
						<div class="rounded-md flex items-center bg-white py-5 px-5">
							<Avatar
								src={$currentUser?.photoURL}
								classes="rounded-full border-neutral-400 border-2 w-1/4 mr-8"
							/>
							<div class="overflow-hidden text-3xl font-medium">{$currentUser?.displayName}</div>
						</div>
					</div>
					<div class="md:flex-1 md:px-5 text-white md:mt-0 mt-10">
						<div class="flex w-full">
							<div class="flex-1 text-white p-5 bg-blue-900 mr-3 rounded-lg">
								<div class="text-xl">{$t('Courses')}</div>
								<div class="text-3xl mb-5 font-medium">0</div>
								<Progressbar color="indigo" progress="0" />
							</div>
							<div class="flex-1 text-white p-5 bg-blue-900 mr-3 rounded-lg">
								<div class="text-xl">{$t('Posts')}</div>
								<div class="text-3xl mb-5 font-medium">0</div>
								<Progressbar color="indigo" progress="0" />
							</div>
							<div class="flex-1 text-white p-5 bg-blue-900 rounded-lg">
								<div class="text-xl">{$t('Score')}</div>
								<div class="text-3xl mb-5 font-medium">0</div>
								<Progressbar color="indigo" progress="0" />
							</div>
						</div>
					</div>
				</div>
				<div class="w-full text-lg mb-10 md:mb-0">
					<span
						class="bg-white rounded-md p-3 font-medium mt-10 text-black items-center inline-flex"
						>{$t('Your badges')} <Icon icon="ooui:next-ltr" /></span
					>
				</div>
			{/if}
		</div>
	</div>
	<!--2-->
	<div class="pt-10 px-32">
		<div class="flex justify-between items-center">
			<span class="text-3xl font-medium">{$t('Courses')}</span>
			<a href="/courses" class="text-xl">{$t('See all')}</a>
		</div>

		<div class="text-xl font-medium flex my-5">
			{#each courseTableTitle as item}
				<button
					on:click={() => (session = item)}
					class="mr-10 cursor-pointer {item === session ? 'underline' : ''}">{$t(item)}</button
				>
			{/each}
		</div>
		<div class="flex flex-wrap my-10">
			{#if courses?.length > 0}
				{#each courses.slice(0, 4) as c, index}
					<div class=" w-1/4 pr-5">
						<CourseContainer course={c} />
					</div>
				{/each}
			{:else}
				<div class="pr-5">There are no course avaiable</div>
			{/if}
		</div>

		<div class="flex justify-between items-center my-10">
			<span class="text-3xl font-medium">{$t('Forums')}</span>
			<a href="/forums" class="text-xl">{$t('See all')}</a>
		</div>
		<div class="flex flex-wrap my-10">
			{#if posts?.length > 0}
				{#each posts.slice(0, 2) as p}
					<div class="w-1/2 pr-5">
						<PostContainer post={p} />
					</div>
				{/each}
			{:else}
				<div class="pr-5">There are no post</div>
			{/if}
		</div>

		<div class="flex justify-between items-center my-10">
			<span class="text-3xl font-medium">{$t('Daily Streak')}</span>
			<!-- <a href="/" class="text-xl">{$t('See all')}</a> -->
		</div>

		<div class="border p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
			<div class="flex">
				<div class="w-1/3 pr-5">
					<div class="p-3 border">
						<h3 class="font-semibold text-3xl text-lime-400">0/7</h3>
						<p>{$t('Easy')}</p>
					</div>
				</div>
				<div class="w-1/3 pr-5">
					<div class="p-3 border">
						<h3 class="font-semibold text-3xl text-yellow-300">0/30</h3>
						<p>{$t('Medium')}</p>
					</div>
				</div>
				<div class="w-1/3 pr-5">
					<div class="p-3 border">
						<h3 class="font-semibold text-3xl text-red-500">0/90</h3>
						<p>{$t('Hard')}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-between items-center my-10">
			<span class="text-3xl font-medium">{$t('Your skills')}</span>
			<!-- <a href="/" class="text-xl">{$t('See all')}</a> -->
		</div>

		<SkillsSet />
	</div>
</main>
