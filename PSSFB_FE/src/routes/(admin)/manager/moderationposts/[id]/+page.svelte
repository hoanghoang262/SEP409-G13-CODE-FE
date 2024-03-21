<script lang="ts">
	import { approvedPost } from '$lib/services/ModerationServices';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import Button from '../../../../../atoms/Button.svelte';
	import { showToast } from '../../../../../helpers/helpers';


	export let data;
	const post:any = data.post;

	const appPost = async () => {
		try {
			const response = await approvedPost(post.id);
		console.log(response);
		showToast("Approved post","Approved post success","success")
		} catch (error) {
			console.error(error)
			showToast("Approved post","Something went wrong","error")
		}
	};
</script>

<div class="pt-20">
	<div class="flex px-32">
		<div class="w-1/12 mr-5"><Avatar classes="rounded-full" src="{post?.userPicture}"/></div>
		<div>
			<div class="text-2xl mb-3">{post?.title}</div>
			<div class="mb-5">
				<span class="mr-4">By: {post?.userName}</span> Last update: {post?.lastUpdate}
			</div>
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
	<div class="flex justify-end pr-40"><Button onclick={appPost} content="Approve"/></div>
</div>
