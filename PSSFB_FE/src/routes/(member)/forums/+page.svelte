<script>
	import { goto } from '$app/navigation';
	import Avatar from '../../../atoms/Avatar.svelte';
	import Input from '../../../atoms/Input.svelte';
	import { Posts } from '../../../data/data';
</script>

<div class="bg-neutral-100 py-40 px-20">
	<div class="mb-10">Home > Forums</div>
	<Input classes="mb-10 w-1/4" placehoder="search" />
	<div class="bg-white">
		{#each Posts as p, index}
			<div class="border flex justify-between p-5">
				<div class="w-14"><Avatar /></div>
				<div class="w-10/12">
					<div on:click={() => goto(`forums/${index}`)} class="text-lg">{p.title}</div>
					<hr class="my-2" />
					<div class="overflow-hidden whitespace-normal mb-2">
						<p class="line-clamp-2">{p.description}</p>
					</div>
					<div class="text-sm mb-3">
						<span class="mr-5">By: Steven Siren</span><span>Last Update: {p.lastUpdate}</span>
					</div>
					<div>
						{#each p.tag as t}
							<span class="px-3 py-1 mr-2 rounded-lg bg-neutral-200">{t}</span>
						{/each}
					</div>
				</div>
				<div class="w-1/12"></div>
			</div>
		{/each}
	</div>
</div>
