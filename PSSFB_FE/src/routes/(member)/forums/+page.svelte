<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from '../../../atoms/Avatar.svelte';
	import Button from '../../../atoms/Button.svelte';
	import Input from '../../../atoms/Input.svelte';
	import { currentUser } from '../../../stores/store';

	export let data:any;
	const posts = data.posts;
	let searchStr = ''
	$: searchPosts = posts.filter((post:any) => post.title.includes(searchStr))
</script>

<div class="bg-neutral-100 py-40 px-20">
	<div class="mb-10">Home > Forums</div>
	<div class="flex justify-between items-center">
		<Input bind:value={searchStr} classes="mb-10 w-1/4" placehoder="search" />
		{#if $currentUser}
			<a class="py-2 px-5 bg-blue-500 rounded-lg font-medium shadow-lg text-white" href="/addpost">Add Post</a>
		{/if}
	</div>
	<div>
		{#each searchPosts as p}
			<div class="bg-white border flex justify-between p-5 mb-10 rounded-tr-3xl">
				<div class="w-14"><Avatar classes="rounded-full" src={p?.picture}/></div>
				<div class="w-10/12">
					<div role="button" tabindex="0" on:keydown={() => goto(`forums/${p.id}`)} on:click={() => goto(`forums/${p.id}`)} class="text-lg">{p.title}</div>
					<hr class="my-2" />
					<div class="overflow-hidden whitespace-normal mb-2">
						<p class="line-clamp-2">{p.description}</p>
					</div>
					<div class="text-sm mb-3">
						<span class="mr-5">By: {p.userName}</span><span>Last Update: {p.lastUpdate}</span>
					</div>
					<!-- <div>
						{#each p.tag as t}
							<span class="px-3 py-1 mr-2 rounded-lg bg-neutral-200">{t}</span>
						{/each}
					</div> -->
				</div>
				<div class="w-1/12"></div>
			</div>
		{/each}
	</div>
</div>
