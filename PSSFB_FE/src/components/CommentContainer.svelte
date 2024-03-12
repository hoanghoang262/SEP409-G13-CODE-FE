<script lang="ts">
	import { Textarea } from 'flowbite-svelte';

	import Avatar from '../atoms/Avatar.svelte';
	import Button from '../atoms/Button.svelte';
	import Icon from '@iconify/svelte';
	import { currentUser } from '../stores/store';
	import { checkExist } from '../helpers/helpers';
	export let comments: any[];
	//export let type = 'post';

	const replyClick = (id: number) => {
		const replyFrm = document.getElementById(`replyFrm#${id}`);
		if (replyFrm?.classList.contains('hidden')) {
			replyFrm.classList.remove('hidden');
		} else {
			replyFrm?.classList.add('hidden');
		}
	};

	function handleKeydown(e: any, id: number) {
		if (e.key == 'Enter') {
			const frm: any = document.getElementById(`rfrm${id}`);
			frm.submit();
		}
	}
</script>

<div>
	<div class="py-5 text-2xl">{comments?.length} Comments</div>
	{#if checkExist($currentUser)}
		<form method="POST" action="?/postcomment">
			<div class="flex mb-3">
				<div class="w-10 mr-3">
					<Avatar classes="rounded-full" src={$currentUser?.photoURL} />
				</div>

				<Textarea name="content" rows="5" />
			</div>
			<div class="flex justify-end"><Button content="Post" /></div>
		</form>
	{/if}
	<hr class="my-5" />
	{#each comments as c}
		<div class="flex">
			<div class="w-10 mr-3">
				<Avatar classes="rounded-full" src={c.picture} />
			</div>
			<div>
				<div class="flex">
					<div class="text-blue-500 mr-3">{c.userName}</div>
					<div class="text-neutral-400">{c.date}</div>
				</div>
				<div>{c.commentContent}</div>
				<div class="flex items-center">
					<Icon class="text-2xl mr-3" icon="iconamoon:like-thin" style="color: black" />
					{#if checkExist($currentUser)}
						<button on:click={() => replyClick(c.id)}>reply</button>
					{/if}
				</div>
				{#if checkExist($currentUser)}
					<div id="replyFrm#{c.id}" class="mt-5 hidden">
						<form id="rfrm{c.id}" method="POST" action="?/postreply">
							<div class="flex mb-3">
								<div class="w-10 mr-3">
									<Avatar classes="rounded-full" src={$currentUser?.photoURL} />
								</div>
								<input type="hidden" name="commentId" readonly value={c.id} />
								<Textarea on:keydown={() => handleKeydown(event, c.id)} name="content" rows="3" />
							</div>
						</form>
					</div>
				{/if}
				{#each c.replies as reply}
					<div class="flex my-3">
						<div class="w-10 mr-3">
							<Avatar classes="rounded-full" src={reply.userPicture} />
						</div>
						<div>
							<div class="flex">
								<div class="text-blue-500 mr-3">{reply.userName}</div>
								<div class="text-neutral-400">{reply?.date}</div>
							</div>
							<div>{reply.replyContent}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<hr class="my-5" />
	{/each}
</div>
