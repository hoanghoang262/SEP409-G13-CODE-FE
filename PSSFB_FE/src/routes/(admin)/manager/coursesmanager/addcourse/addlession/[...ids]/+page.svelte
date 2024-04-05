<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../../../../../../../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import { initQuestion, type Lession, initLessions, initAnswer } from '$lib/type';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../../../../../../../components/AdminCourseSB.svelte';
	import { checkExist, showToast } from '../../../../../../../helpers/helpers';
	import { addLession } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { pageStatus } from '../../../../../../../stores/store';
	import Dropzone from 'svelte-file-dropzone';
	import { getURL, getVideoURL, uploadVid } from '../../../../../../../firebase';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';
	import AddLessionpage from '../../../../../../../pages/AddLessionpage.svelte';

	export let data;
	let promise = data.promise;
	
</script>

{#await promise}
	<LoadingPage />
{:then course} 
	<AddLessionpage {course}/>
{:catch error}
<div>{error.message}</div>
{/await}

