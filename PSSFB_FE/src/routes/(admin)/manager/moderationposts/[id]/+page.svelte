<script lang="ts">
	import { approvedPost, getAllModPosts } from '$lib/services/ModerationServices';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import Button from '../../../../../atoms/Button.svelte';
	import { getTimeDifference } from '../../../../../helpers/datetime';
	import { showToast } from '../../../../../helpers/helpers';
	import { pageStatus, currentUser } from '../../../../../stores/store';

	export let data;
	const post: any = data.post;

	const ApprovePost = async () => {
		try {
			pageStatus.set('load');
			const response = await approvedPost(post.id);
			console.log(response);
			pageStatus.set('done');
			showToast('Approved post', 'Approved post success', 'success');
		} catch (error) {
			console.error(error);
			showToast('Approved post', 'Something went wrong', 'error');
		}
	};
</script>

<div class="pt-10 w-[90%] m-auto">
	<div>
		<p class="text-3xl">{post?.title}</p>
		<div class="text-gray-700 text-xs mb-10">
			<p class="ml-3">Create At: {getTimeDifference(post?.lastUpdate)}</p>
		</div>
	</div>
	<div class="py-5 flex border-2 border-gray-200">
		<div class="flex flex-col items-center px-10">
			<p class=" text-lg text-center pb-1">{post?.userName}</p>
			<div class="">
				<Avatar classes="rounded-full w-24 h-24" src={post?.userPicture} />
			</div>
		</div>
		<div class="bg-gray-100 w-full pl-10 mr-10 py-5">
			<div class="text-2xl">{post?.title}</div>

			<div>
				<div class="text-xl my-5">{post?.description}</div>
				<div class="mb-5">
					{@html post?.postContent}
				</div>
			</div>
		</div>
	</div>
	<button on:click={ApprovePost} class="p-2 bg-blue-500 text-white rounded-md float-end mt-5"
		>Approve</button
	>
</div>
