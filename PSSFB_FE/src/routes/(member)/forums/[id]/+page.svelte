<script lang="ts">
	import Avatar from '../../../../atoms/Avatar.svelte';
	import CommentContainer from '../../../../components/CommentContainer.svelte';

	export let data;
	const post:any = data.post;
	const comments:any = data.comments;
</script>

<div class="pt-40 px-40">
	<div class="mb-10">Home > Forums > {post?.title}</div>
	<div class="flex px-32">
		<div class="w-1/12 mr-5"><Avatar classes="rounded-full" src="{post?.picture}"/></div>
		<div>
			<div class="text-2xl mb-3">{post?.title}</div>
			<div class="mb-5">
				<span class="mr-4">By: {post?.userName}</span> Last update: {post?.lastUpdate}
			</div>
			<div class="text-xl mb-5">{post?.description}</div>
			<div class="mb-5">
				{post?.postContent}
			</div>
            <!-- <div class="flex">
                {#each post.tag as t}
                    <div class="px-5 py-1 rounded-lg bg-neutral-100">{t}</div>
                {/each}
            </div> -->
		</div>
	</div>
    <div>
        <CommentContainer comments={comments}/>
    </div>
</div>
