<script lang="ts">
	import { goto } from '$app/navigation';
	import { beforeUpdate } from 'svelte';
	import { currentUser, pageStatus } from '../../../stores/store';
	import { checkExist } from '../../../helpers/helpers';

	beforeUpdate(async () => {
		if (!$currentUser) {
			goto('/');
		}else if($currentUser?.Role.includes('Admin')){
			goto('/manager');
		}
	});
</script>


<slot />

