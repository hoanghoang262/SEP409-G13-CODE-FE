<script lang="ts">
	import { goto } from '$app/navigation';
	import { deletePost, getAllPost } from '$lib/services/ForumsServices';
	import { toasts } from 'svelte-toasts';
	import Avatar from '../../../atoms/Avatar.svelte';
	import Button from '../../../atoms/Button.svelte';
	import Input from '../../../atoms/Input.svelte';
	import Pagination from '../../../components/Pagination.svelte';
	import { currentUser, pageStatus } from '../../../stores/store';
	import { showToast } from '../../../helpers/helpers';
	import { t } from '../../../translations/i18n';

	export let data: any;
	let result = data.result;
	$: posts = result.items;
	let searchStr = '';
	const pagiClick = async (page: number) => {
		result = await getAllPost(searchStr, page);
	};
	const searchFunc = async (event: any) => {
		pageStatus.set('load');
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllPost(searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done');
	};
</script>

<div class="bg-neutral-100 py-40 px-20">
	<div class="mb-10">{$t('Home')} > {$t('Forums')}</div>
	<div class="flex justify-between items-center">
		<Input
			onKeyDown={searchFunc}
			bind:value={searchStr}
			classes="mb-10 w-1/4"
			placehoder={$t('search')}
		/>
		{#if $currentUser}
			<a class="py-2 px-5 bg-blue-500 rounded-lg font-medium shadow-lg text-white" href="/addpost"
				>{$t('Add Post')}</a
			>
		{/if}
	</div>
	<div>
		{#each posts as p}
			<div class="bg-white border flex justify-between p-5 mb-10 rounded-tr-3xl">
				<div class="w-14"><Avatar classes="rounded-full" src={p?.picture} /></div>
				<div class="w-10/12">
					<div
						role="button"
						tabindex="0"
						on:keydown={() => goto(`forums/${p.id}`)}
						on:click={() => goto(`forums/${p.id}`)}
						class="text-lg"
					>
						{p.title}
					</div>
					<hr class="my-2" />
					<div class="overflow-hidden whitespace-normal mb-2">
						<p class="line-clamp-2">{p.description}</p>
					</div>
					<div class="text-sm mb-3">
						<span class="mr-5">By: {p.userName}</span><span
							>{$t('Last Update')}: {p.lastUpdate}</span
						>
					</div>
					<div>
						{#if $currentUser?.UserID == p.createdBy}
							<span class="mr-5 text-blue-500"
								><button
									on:click={() => {
										if ($currentUser.Role.includes('Admin')) {
											goto(`/manager/postmanager/editpost/${p.id}`);
										} else {
											goto(`/editpost/${p.id}`);
										}
									}}>{$t('Edit')}</button
								></span
							>
							<span class="mr-5 text-red-500"
								><button
									on:click={async () => {
										pageStatus.set('load');
										await deletePost(p.id);
										result = await getAllPost();
										showToast('Delete Post', 'Delete post successfully', 'success');
										pageStatus.set('done');
									}}>{$t('Delete')}</button
								></span
							>
						{/if}
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
	<Pagination pagi={result} {pagiClick} />
</div>
