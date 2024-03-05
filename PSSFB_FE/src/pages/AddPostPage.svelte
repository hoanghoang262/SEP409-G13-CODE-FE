<script>
	import { Label, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { currentUser } from '../stores/store';
</script>

<div class="px-20 py-10">
    <div class="flex items-center mb-10">
        <div class="w-1/12 mr-5"><Avatar /></div>
        {$currentUser?.displayName}
    </div>
	<div class="mb-10">
		<Label>Title</Label>
		<Input classes="border w-full" placehoder="Title" />
	</div>

	<div class="mb-10">
		<Label>Description</Label>
		<Textarea placehoder="Description" />
	</div>

	<div class="mb-10">
		<Label>Content</Label>
		<Editor apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83" />
	</div>
</div>
