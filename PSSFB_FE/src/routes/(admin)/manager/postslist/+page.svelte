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
	import { currentUser } from '../../../../stores/store';
	import { approvedPost, getAllModPosts } from '$lib/services/ModerationServices';

	export let data;
	let Posts = data.posts;

	const appPost = async (id: number) => {
		const response = await approvedPost(id);
		console.log(response);
		Posts = await getAllModPosts();
	};
</script>

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
						onclick={() => goto(`postslist/${p.postId}`)}
						classes="border mr-3"
						content="detail"
					/>
					<Button2 onclick={() => appPost(p.postId)} classes="border mr-3" content="approve" />
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
