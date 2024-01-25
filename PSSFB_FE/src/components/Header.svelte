<script lang="ts">
	import { headerData } from '../data/data';
	import logoWhite from '../assets/Đen 2.png';
	import LoginBtn from '../atoms/LoginBtn.svelte';
	import RegisterBtn from '../atoms/RegisterBtn.svelte';
	import { page } from '$app/stores';
	import { locale, t } from '../translations/i18n';

	const changelang = (e:any) => locale.update(() => e.target.value)
</script>

<div class="flex p-5 bg-white text-black items-center font-medium border-b-2 fixed z-10 justify-between">
	<div class="flex items-center">
		<a href="/" class="w-1/12"><img alt="logo" class="full" src={logoWhite} /></a>
		{#each headerData as header}
			<a href="{header.link}" class="mx-5 {$page.url.pathname === header.link ?'text-neutral-500':''}">{$t(header.display)}</a>
		{/each}
	</div>
	<div class="flex">
		<select on:change={changelang} class="border-2 mr-5">
			<option>en</option>
			<option>vn</option>
		</select>
		<LoginBtn />
		<RegisterBtn />
	</div>
</div>
