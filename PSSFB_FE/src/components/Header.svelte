<script lang="ts">
	import { headerData } from '../data/data';
	import logoWhite from '../assets/Đen 2.png';
	import { onMount } from 'svelte';

	let current_url = '';

	onMount(() => {
		current_url = window.location.href;
	});

	console.log(current_url);
</script>

<div class="flex p-5 bg-white text-black items-center font-medium border-b-2 fixed z-10">
	<a href="/home" on:click={() => current_url = "home"} class="w-1/12"><img alt="logo" class="full" src={logoWhite} /></a>
	{#each headerData as header}
		<a href="/{header.link}" on:click={() => current_url = header.link} class="mx-5 {current_url.includes(header.link)?'text-neutral-500':''}">{header.display}</a>
	{/each}
</div>
