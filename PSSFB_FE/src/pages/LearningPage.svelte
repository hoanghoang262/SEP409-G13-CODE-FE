<script lang="ts">
	import avatar from '../assets/Thanh.jpg';
	import { Progressbar } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { posts } from '../data/data';
	import CourseContainer from '../components/CourseContainer.svelte';
	import PostContainer from '../components/PostContainer.svelte';
	import SkillsSet from '../components/SkillsSet.svelte';
	import { t } from '../translations/i18n';
	import { currentUser } from '../stores/store';
	import Avatar from '../atoms/Avatar.svelte';
	import { goto } from '$app/navigation';

	export let courses:any
</script>

<div class="p-5 px-20 flex flex-wrap items-center pt-52 bg-blue-950">
	<div class="w-full font-light text-white text-2xl mb-5">
		Hello {$currentUser?.email}. Welcome you to PSSFB. Let's <span
			class="px-3 py-1 font-medium rounded-xl bg-white text-black">Start</span
		> to explore more!
	</div>
	<div class="w-1/3">
		<div class="rounded-md flex flex-wrap items-center bg-white p-5 pb-10">
			<Avatar src={$currentUser?.photoURL} classes="rounded-full border-neutral-400 border-2 w-1/4 mr-5"/>
			<div class="overflow-hidden text-3xl font-medium">{$currentUser?.displayName}</div>
		</div>
	</div>
	<div class="w-2/3 p-5 text-white">
		<div class="flex w-full">
			<div class="w-1/3 text-white p-5 bg-blue-900 mr-3 rounded-lg">
				<div class="text-xl">{$t('Courses')}</div>
				<div class="text-3xl mb-5 font-medium">0</div>
				<Progressbar color="indigo" progress="0" />
			</div>
			<div class="w-1/3 text-white p-5 bg-blue-900 mr-3 rounded-lg">
				<div class="text-xl">{$t('Posts')}</div>
				<div class="text-3xl mb-5 font-medium">0</div>
				<Progressbar color="indigo" progress="0" />
			</div>
			<div class="w-1/3 text-white p-5 bg-blue-900 mr-3 rounded-lg">
				<div class="text-xl">{$t('Score')}</div>
				<div class="text-3xl mb-5 font-medium">0</div>
				<Progressbar color="indigo" progress="0" />
			</div>
		</div>

		<div class="w-full text-lg">
			<span class="bg-white rounded-md p-3 font-medium mt-10 text-black items-center inline-flex"
				>{$t('Your badges')} <Icon icon="ooui:next-ltr" /></span
			>
		</div>
		<div></div>
	</div>
</div>
<div class="pt-10 px-32">
	<div class="flex justify-between items-center">
		<span class="text-3xl font-medium">{$t('Courses')}</span>
		<a href="/courses" class="text-xl">{$t('see all')}</a>
	</div>

	<div class="text-xl font-medium flex my-5">
		<div class="mr-10 border-b-2 border-black">{$t('Suggested Courses')}</div>
		<div class="mr-10">{$t('In-progress')} (0)</div>
		<div class="mr-10">{$t('Completed')} (0)</div>
	</div>
	<div class="flex flex-wrap my-10">
		{#each courses as c, index}
			<div class="w-1/4 pr-5">
				<CourseContainer course={c} />
			</div>
		{/each}
	</div>

	<div class="flex justify-between items-center my-10">
		<span class="text-3xl font-medium">{$t('Forums')}</span>
		<a href="/home" class="text-xl">{$t('see all')}</a>
	</div>
	<div class="flex flex-wrap my-10">
		{#each posts as p}
			<div class="w-1/2 pr-5">
				<PostContainer post={p} />
			</div>
		{/each}
	</div>

	<div class="flex justify-between items-center my-10">
		<span class="text-3xl font-medium">{$t('Daily Streak')}</span>
		<a href="/home" class="text-xl">{$t('see all')}</a>
	</div>

	<div class="border p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
		<div class="flex">
			<div class="w-1/3 pr-5 ">
				<div class="p-3 border">
					<h3 class="font-semibold text-3xl text-lime-400">0/7</h3>
					<p>{$t('Easy')}</p>
				</div>
			</div>
			<div class="w-1/3 pr-5 ">
				<div class="p-3 border">
					<h3 class="font-semibold text-3xl text-yellow-300">0/30</h3>
					<p>{$t('Medium')}</p>
				</div>
			</div>
			<div class="w-1/3 pr-5 ">
				<div class="p-3 border">
					<h3 class="font-semibold text-3xl text-red-500">0/90</h3>
					<p>{$t('Hard')}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="flex justify-between items-center my-10">
		<span class="text-3xl font-medium">{$t('Your skills')}</span>
		<a href="/home" class="text-xl">{$t('see all')}</a>
	</div>

	<SkillsSet />
</div>
