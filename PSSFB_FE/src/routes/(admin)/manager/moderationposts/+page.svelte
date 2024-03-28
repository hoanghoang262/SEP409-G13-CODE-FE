<script lang="ts">
	import {
		Modal,
		Select,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from 'flowbite-svelte';

	import Button2 from '../../../../atoms/Button2.svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import {
		approvePost,
		approvedPost,
		deleteModPost,
		getAllModPosts,
		reject
	} from '$lib/services/ModerationServices';
	import { showToast } from '../../../../helpers/helpers';
	import Pagination from '../../../../components/Pagination.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Status from '../../../../atoms/Status.svelte';
	import { statuses } from '../../../../data/data';

	export let data;
	let result = data.result;
	$: Posts = result.items;

	let searchStr = '';
	let moderationId = 0;
	let reasonWhyReject = '';
	let rejectModal = false;

	const pagiClick = async (page: number) => {
		result = await getAllModPosts(searchStr, page);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load');
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllModPosts(searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done');
	};

	const statusChange = async () => {
		pageStatus.set('load')
		
			try {
				result = await getAllModPosts(status);
			} catch (err) {
				console.log(err);
			}
		
		pageStatus.set('done')
	};
	const ApprovePost = async (id: number) => {
		try {
			pageStatus.set('load');
			const response = await approvedPost(id);
			console.log(response);
			Posts = await getAllModPosts();
			pageStatus.set('done');
			showToast('Approved post', 'Approved post success', 'success');
		} catch (error) {
			console.error(error);
			showToast('Approved post', 'Something went wrong', 'error');
		}
	};

	const RejectPost = async (id: number) => {
		moderationId = id;
		rejectModal = true;
	};

	const DeletePost = async (id: number) => {
		try {
			pageStatus.set('load');
			const response = await deleteModPost(id);
			console.log(response);
			Posts = await getAllModPosts();
			pageStatus.set('done');
			showToast('Approved post', 'Approved post success', 'success');
		} catch (error) {
			console.error(error);
			showToast('Approved post', 'Something went wrong', 'error');
		}
	};
</script>

<div class="flex justify-between items-center">
	<Input
	onKeyDown={searchFunc}
	bind:value={searchStr}
	classes="w-1/4 mr-3 border mb-5"
	placehoder="search"
/>
</div>
<Table>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Post</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Create By</TableHeadCell>
		<TableHeadCell>Last Update</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
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
				<TableBodyCell><Status status={p?.status}/></TableBodyCell>
				<TableBodyCell>
					

					<Button2
						onclick={() => goto(`moderationposts/${p.postId}`)}
						classes="border mr-3 text-blue-500"
						content="Detail"
					/>
					{#if p?.status != 'Accepted'}
						<Button2
							onclick={() => ApprovePost(p.postId)}
							classes="border mr-3 text-green-500"
							content="Approve"
						/>
					{/if}

					{#if p?.status != 'Rejected'}
						<Button2
							onclick={() => RejectPost(p.id)}
							classes="border mr-3 text-red-500"
							content="Reject"
						/>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<Pagination pagi={result} {pagiClick} />
<Modal title="Rejection" bind:open={rejectModal} on:close={() => (rejectModal = false)} autoclose>
	<div>Reject reason:</div>
	<Textarea bind:value={reasonWhyReject} />
	<svelte:fragment slot="footer">
		<Button
			onclick={async () => {
				try {
					pageStatus.set('load');
					const response = await reject({ moderationId, reasonWhyReject });
					console.log(response);
					result = await getAllModPosts();
					pageStatus.set('done');
					showToast('Reject post', 'Reject course post', 'success');
				} catch (error) {
					console.error(error);
					showToast('Reject post', 'Something went wrong', 'error');
				}
			}}
			classes="text-red-500"
			content="Reject"
		/>
		<Button content="Cancel" />
	</svelte:fragment>
</Modal>
