<script>
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import ChangePassContainer from '../../../../components/ChangePassContainer.svelte';
	import { currentUser } from '../../../../stores/store';

	let section = 'Infomation & Contact';
	const sections = ['Infomation & Contact', 'Change Password'];
</script>

<div class="px-40 py-40 flex bg-gray-100">
	<div class="w-1/4 p-5 mr-5 rounded-xl bg-white">
		<div on:click={() => (section = 'Infomation & Contact')}>Infomation & Contact</div>
		<div on:click={() => (section = 'Change Password')}>Change Password</div>
	</div>
	<div class="w-3/4 p-5 rounded-xl bg-white">
		{#if section == 'Infomation & Contact'}
			<div>Infomation</div>
			<div class="flex">
				<div class="w-1/3 mr-10">
					<Avatar src={$currentUser?.photoURL} />
				</div>
				<div class="w-2/3 grid grid-cols-2">
					<div>Username</div>
					<div>{$currentUser?.displayName}</div>
					<div>Email</div>
					<div>{$currentUser?.email}</div>
					<div>Phone Number</div>
					<div>{$currentUser?.providerData.phoneNumber ?? ''}</div>
					<div>Country</div>
					<div></div>
					<div>City</div>
					<div></div>
					<div>Address</div>
					<div></div>
					<div>Facebook</div>
					<div></div>
				</div>
			</div>
		{:else if section == 'Change Password'}
			<ChangePassContainer />
		{/if}
	</div>
</div>
