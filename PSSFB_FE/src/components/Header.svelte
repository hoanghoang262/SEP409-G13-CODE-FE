<script lang="ts">
	import { headerAdminData, headerData } from '../data/data';
	import logoWhite from '../assets/Đen 2.png';
	import LoginBtn from '../atoms/LoginBtn.svelte';
	import RegisterBtn from '../atoms/RegisterBtn.svelte';
	import { page } from '$app/stores';
	import { locale, t } from '../translations/i18n';
	import { currentUser } from '../stores/store';
	import LogoutBtn from '../atoms/LogoutBtn.svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { goto } from '$app/navigation';

	const changelang = (e: any) => locale.update(() => e.target.value);
</script>

<div
	class="flex p-5 bg-white text-black items-center font-medium border-b-2 fixed z-10 justify-between"
>
	<div class="flex items-center w-3/5">
		<a href="/" class="w-1/12"><img alt="logo" class="full" src={logoWhite} /></a>
		{#if $currentUser?.Role.includes('Admin')}
			{#each headerAdminData as header}
				<a
					href={header.link}
					class="mx-5 {$page.url.pathname === header.link ? 'text-neutral-500' : ''}"
					>{$t(header.display)}</a
				>
			{/each}
		{:else}
			{#each headerData as header}
				<a
					href={header.link}
					class="mx-5 {$page.url.pathname === header.link ? 'text-neutral-500' : ''}"
					>{$t(header.display)}</a
				>
			{/each}
		{/if}
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
</div>
