<script lang="ts">
	import bigLogBlack from '../assets/Trắng final.png';
	import LoginContainer from '../components/LoginContainer.svelte';

	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { checkExist } from '../helpers/helpers';
	import { currentUser } from '../stores/store';
	import { goto } from '$app/navigation';
	import LearningPage from '../pages/LearningPage.svelte';
	import RegisterContainer from '../components/RegisterContainer.svelte';

	//export let data;

	// onMount(async () => {
	// 	if (checkExist(data?.user)) {
	// 		currentUser.set(data.user);
	// 		goto('/learning');
	// 	} else {
	// 		goto('/');
	// 	}
	// });
	beforeUpdate(async () => {
		if (checkExist($currentUser)) {
			if ($currentUser?.Role.includes('Admin')) {
				goto('/manager');
			} else if ($currentUser?.Role.includes('Student')) {
				goto('/learning');
			}
		}
	});
</script>

<div class="overflow-x-auto md:h-[calc(100vh-64px)] h-[calc(100vh-64px)] bg-blue-950 text-white">
	<div class="h-full flex items-center justify-center md:justify-between">
		<img alt="blb" class="md:block hidden w-3/6" src={bigLogBlack} />
		<div class="md:w-2/6 md:mr-24"><LoginContainer /></div>
	</div>
</div>
