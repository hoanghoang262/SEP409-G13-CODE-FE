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
			if($currentUser?.Role.includes('Admin')){
				goto('/manager');
			}else if($currentUser?.Role.includes('Student')){
				goto('/learning');
			}
		}
	});
	
</script>

	<div class="bg-blue-950 text-white">
		<div class="flex items-center px-20 py-40">
			<img alt="blb" class="m-auto w-3/6" src={bigLogBlack} />
			<div class="w-2/6"><LoginContainer /></div>
		</div>
	</div>
