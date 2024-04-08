<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, pageStatus } from '../stores/store';
	import { getNotificationByUserId } from '$lib/services/NotificationService';
	import Avatar from '../atoms/Avatar.svelte';
	import { formatDateTime, getTimeDifference } from '../helpers/datetime';

	let notificationShow = false;
	let data: any;

	onMount(async () => {
		let result = await getNotificationByUserId($currentUser.UserID);
		data = result;
	});

	const clickHandle = () => {
		notificationShow = !notificationShow;
	};
</script>

<main class="relative">
	<button on:click={() => clickHandle()} class="p-1 text-gray-600">
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" {...$$props}>
			<path
				fill="currentColor"
				d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
			/>
		</svg>
	</button>
	<div
		class=" absolute {notificationShow
			? 'flex'
			: 'hidden'} mt-2 py-2 right-0 w-[400px] bg-gray-100 shadow-xl rounded-lg flex flex-col max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-96px)]"
	>
		<div class="px-5 underline py-3"><p class="">Notification</p></div>
		{#if data?.length > 0}
			<div class="flex flex-col justify-start">
				{#each data as item}
					<div class="px-5 bg-gray-100 hover:bg-blue-100 py-2 my-1 flex justify-start items-center">
						<div class="mx-2">
							<Avatar
								classes="w-10 h-10 rounded-full border-2 border-blue-300"
								src="/src/assets/Xanh final.png"
							/>
						</div>
						<div>
							<p class="truncate">{item.notificationContent}</p>
							<p class="text-xs font-light">{getTimeDifference(item.sendDate)}</p>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="flex justify-center items-center py-2 bg-red-100"><p class="">No message</p></div>
		{/if}
	</div>
</main>
