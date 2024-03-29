<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import axios from 'axios';
	import Avatar from '../../../../../../atoms/Avatar.svelte';

	// @ts-ignore
	let paginators = $page.state.paginators;
	// @ts-ignore
	export let data;
	let status = data?.status;
	let banModalStatus = false;

	const banHandle = async () => {
		banModalStatus = false;
		const result = await axios.put(
			`https://authenticateservice.azurewebsites.net/api/Authenticate/ChangeStatus?userId=${$page.params.slug}`
		);
		status = !status;
	};
</script>

<main>
	<div class="flex justify-between">
		<button
			on:click={() => goto('/manager/usermanager', { state: { paginators: paginators } })}
			class="font-bold text-2xl flex items-center text-blue-600 hover:text-black cursor-pointer"
		>
			<svg
				class="mr-2"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z" />
			</svg>
			<div>Back</div>
		</button>
		<button
			on:click={() => (banModalStatus = true)}
			class="px-5 py-3 bg-red-600 rounded-lg text-white border-black border-2 hover:bg-red-500"
		>
			{#if status == true}
				<p>Ban Account</p>
			{:else}
				<p>Unban Account</p>
			{/if}
		</button>
	</div>
	<div class="">
		<div class=" mr-10 flex justify-center items-center mb-10 mt-5">
			<Avatar src={data?.profilePict} />
		</div>
		<div class="flex justify-center items-center font-nunito">
			<div class="pr-8 font-semibold">
				<div class="h-7">FullName:</div>
				<div class="h-7">Username:</div>
				<div class="h-7">Email:</div>
				<div class="h-7">Phone Number:</div>
				<div class="h-7">Address:</div>
				<div class="h-7">Facebook:</div>
			</div>
			<div class="pr-8">
				<div class="h-7 text-gray-600">{data?.fullName ?? 'None'}</div>
				<div class="h-7 text-gray-600">{data?.userName ?? 'None'}</div>
				<div class="h-7 text-gray-600">{data?.email ?? 'None'}</div>
				<div class="h-7 text-gray-600">{data?.phone ?? 'None'}</div>
				<div class="h-7 text-gray-600">{data?.address ?? 'None'}</div>
				<div class="h-7 text-gray-600">{data?.facebookLink ?? 'None'}</div>
			</div>
			<div class="h-full flex-col justify-between">
				<div class="h-7">?</div>
				<div class="h-7">?</div>
				<div class="h-7">?</div>
				<div class="h-7">?</div>
				<div class="h-7">?</div>
				<div class="h-7">?</div>
			</div>
		</div>
	</div>

	<div
		class="{banModalStatus
			? ''
			: 'hidden'} flex justify-center items-center w-screen h-screen fixed top-0 left-0"
	>
		<div class=" fixed top-0 left-0 w-screen h-screen bg-black opacity-30"></div>
		<div class="absolute p-4 w-full max-w-md max-h-full">
			<div class="relative bg-white rounded-lg shadow">
				<!-- Modal header -->
				<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
					<h3 class="text-2xl font-semibold text-red-600">Warning</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
						data-modal-hide="default-modal"
					>
						<svg
							class="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-4 md:p-5 space-y-4">
					<p>Do you really want to ban this account</p>
				</div>
				<!-- Modal footer -->
				<div class="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
					<button
						on:click={banHandle}
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>I accept</button
					>
					<button
						on:click={() => {
							banModalStatus = false;
						}}
						class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
						>Decline</button
					>
				</div>
			</div>
		</div>
	</div>
</main>
