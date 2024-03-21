<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import Button2 from '../../../../atoms/Button2.svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import { approvedPost, getAllModPosts } from '$lib/services/ModerationServices';
	import { showToast } from '../../../../helpers/helpers';
	import Pagination from '../../../../components/Pagination.svelte';
	import Input from '../../../../atoms/Input.svelte';

	export let data;
	let result = data.result
	$: Posts = result.items;

	let searchStr = '';

	const pagiClick = async (page: number) => {
		result = await getAllModPosts(searchStr, page);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load')
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllModPosts(searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done')
	};
	const appPost = async (id: number) => {
		try {
			const response = await approvedPost(id);
		console.log(response);
		Posts = await getAllModPosts();
		showToast("Approved post","Approved post success","success")
		} catch (error) {
			console.error(error)
			showToast("Approved post","Something went wrong","error")
		}
	};
</script>
<Input onKeyDown={searchFunc} bind:value={searchStr} classes="w-1/4 mr-3" placehoder="search" />
<Table>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Post</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Create By</TableHeadCell>
		<TableHeadCell>Last Update</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each Posts as p, index}
			<TableBodyRow>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell>{p?.postTitle}</TableBodyCell>
				<TableBodyCell><div class="w-52 truncate">{p?.postDescription}</div></TableBodyCell>
				<TableBodyCell>{p?.userName}</TableBodyCell>
				<TableBodyCell>{p?.postCreateAt}</TableBodyCell>
				<TableBodyCell>
					{#if $currentUser.UserID == p.createdBy}
						<Button2 classes="border mr-3" content="edit" /><Button2
							onclick={() => goto(`postslist/${p.postId}`)}
							classes="border mr-3"
							content="detail"
						/>
					{/if}
					<Button2 classes="border mr-3" content="delete" />

					<Button2
						onclick={() => goto(`moderationposts/${p.postId}`)}
						classes="border mr-3"
						content="detail"
					/>
					<Button2 onclick={() => appPost(p.postId)} classes="border mr-3" content="approve" />
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<Pagination pagi={result} {pagiClick} />