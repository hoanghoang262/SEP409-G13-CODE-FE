<script>
	import { Label, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { currentUser } from '../stores/store';
	import Button from '../atoms/Button.svelte'
	import { checkExist, showToast } from '../helpers/helpers';
	import { createAdminPost } from '$lib/services/ForumsServices';

	let post = {
		title:'',
		desciption:'',
		postContent:'',
		createdBy: $currentUser.UserID,
		lastUpdate: new Date().toDateString(),
	}

	const savePost = async () => {
		if(!checkExist(post.title)||!checkExist(post.desciption)||!checkExist(post.postContent)){
			showToast("Save Post","Enter all required fields","warning")
		}else{
			try {
				post.lastUpdate = new Date().toDateString()
				await createAdminPost(post)
				showToast("Save Post","create post success","success")
			} catch (error) {
				console.log(error)
			}
		}
	}
</script>

<div class="px-20 py-10">
    <div class="flex items-center mb-10">
        <div class="w-1/12 mr-5"><Avatar /></div>
        {$currentUser?.displayName}
    </div>
	<div class="mb-10">
		<Label>Title</Label>
		<Input required={true} bind:value={post.title} classes="border w-full" placehoder="Title" />
	</div>

	<div class="mb-10">
		<Label>Description</Label>
		<Textarea required bind:value={post.desciption} placehoder="Description" />
	</div>

	<div class="mb-10">
		<Label>Content</Label>
		<Editor bind:value={post.postContent} apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83" />
	</div>
	<div class="flex justify-end"><Button onclick={savePost} content="Save" /></div>
</div>
