<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import bigLogBlack from '../../../assets/Trắng 1.png';
	import LoginContainer from '../../../components/LoginContainer.svelte';
	import RegisterContainer from '../../../components/RegisterContainer.svelte';
	import { checkExist, showToast } from '../../../helpers/helpers';
	import { currentUser } from '../../../stores/store';
	import { goto } from '$app/navigation';

	export let form:any;

	if(form?.type=='error'){
		showToast(`${form?.error??"error"}`,`${form?.message??"something went wrong"}`,"error")
	}

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

<div class="bg-blue-950 text-white">
	<div class="flex items-center px-20 py-40">
		<img alt="blb" class="m-auto w-3/6" src={bigLogBlack} />
		<div class="w-2/6"><RegisterContainer /></div>
	</div>
</div>
