<script lang="ts">
	import { headerAdminData, headerData } from '../data/data';
	import logoWhite from '../assets/Xanh final.png';
	import LoginBtn from '../atoms/LoginBtn.svelte';
	import RegisterBtn from '../atoms/RegisterBtn.svelte';
	import { page } from '$app/stores';
	import { locale, t } from '../translations/i18n';
	import { currentUser } from '../stores/store';
	import LogoutBtn from '../atoms/LogoutBtn.svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { goto } from '$app/navigation';
	import DropBar from './DropBar.svelte';

	let topbarStatus = false;

	const changelang = (e: any) => locale.update(() => e.target.value);
</script>

<main>
	<div
		class=" fixed flex w-full bg-white text-black items-center font-medium border-b-2 z-10 justify-between lg:h-24 h-16"
	>
		<div class="flex items-center justify-center lg:w-64">
			<a href="/" class="lg:w-28 w-24"
				><img alt="logo" class="overflow-hidden" width="" src={logoWhite} /></a
			>
		</div>
		<div class="font-medium text-xl hidden md:block">
			{#if $currentUser?.Role?.includes('Admin')}
				{#each headerAdminData as header}
					<a
						href={header.link}
						class="text-sm lg:text-xl mx-4 lg:lg-7 hover:text-green-500 {$page.url.pathname.includes(
							header.link
						)
							? 'text-blue-500'
							: ''}">{$t(header.display)}</a
					>
				{/each}
			{:else}
				{#each headerData as header}
					<a
						href={header.link}
						class=" text-sm lg:text-md xl:text-xl mx-3 lg:mx-4 xl:mx-5 hover:text-green-500 {$page.url.pathname.includes(
							header.link
						)
							? 'text-blue-500'
							: ''}">{$t(header.display)}</a
					>
				{/each}
			{/if}
		</div>
		<!--Top bar button-->
		<button
			on:click={() => (topbarStatus = !topbarStatus)}
			class="md:hidden hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
			</svg>
		</button>
		<div class=" flex items-center justify-end mr-5 lg:mr-20">
			<select on:change={changelang} class="border-2 mr-5 hidden lg:flex">
				<option>en</option>
				<option>vn</option>
			</select>
			<div class="flex">
				{#if !$currentUser}
					<LoginBtn onClick={() => goto('/')} />
					<RegisterBtn onClick={() => goto('/register')} />
				{:else}
					<a
						href="/profile"
						class="flex justify-center items-center mr-2 lg:mr-4 hover:bg-green-200 lg:px-2 rounded-full"
					>
						<Avatar classes="w-8 lg:w-10 rounded-full lg:mr-3" src={$currentUser.photoURL} />
						<p class="lg:mr-3 hidden lg:block">{$currentUser.displayName}</p>
					</a>
					<LogoutBtn />
				{/if}
			</div>
		</div>
	</div>
	<div class="flex w-2/5 items-center justify-end">
		<select on:change={changelang} class="border-2 mr-5">
			<option>en</option>
			<option>vn</option>
		</select>
		{#if !$currentUser}
			<LoginBtn onClick={() => goto('/')} />
			<RegisterBtn onClick={() => goto('/register')} />
		{:else}
			<Avatar classes="w-1/12 rounded-full mr-3" src={$currentUser.photoURL} />
			<a href="/profile" class="mr-3">{$currentUser.displayName}</a>
			<LogoutBtn />
		{/if}
	</div>
</main>
