<script lang="ts">
	import { approvedPost, getAllModPosts } from '$lib/services/ModerationServices';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import Button from '../../../../../atoms/Button.svelte';
	import { showToast } from '../../../../../helpers/helpers';
	import { pageStatus } from '../../../../../stores/store';

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

<div class="pt-20">
	<div class="flex px-32 flex-col">
		<div class="flex items-center">
			<div class=" mr-6">
				<Avatar classes="rounded-full w-24 h-24" src={post?.userPicture} />
			</div>
			<div>
				<div class="text-2xl mb-3">{post?.title}</div>
				<div class="text-gray-700 text-sm">
					<p class="">Create By : {post?.userName}</p>
					<p class="">Last update: {post?.lastUpdate}</p>
				</div>
			</div>
		</div>
		<div>
			<div class="text-xl mb-5">{post?.description}</div>
			<div class="mb-5">
				{@html post?.postContent}
			</div>
			<!-- <div class="flex">
				{#each post.tag as t}
					<div class="px-5 py-1 rounded-lg bg-neutral-100">{t}</div>
				{/each}
			</div> -->
		</div>
	</div>
	<!-- <div class="flex justify-end pr-40"><Button onclick={ApprovePost} content="Approve"/></div> -->
</div>
