<script lang="ts">
	import { Label, Modal } from 'flowbite-svelte';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import ChangePassContainer from '../../../../components/ChangePassContainer.svelte';
	import { currentUser } from '../../../../stores/store';

	let section = 'Infomation & Contact';
	const sections = ['Infomation & Contact', 'Change Password'];
	export let data: any;
	const userInfo = data.userInfo;
	let defaultModal = false;

	const editFrmSubmit = () => {
		const editfrm: any = document.getElementById('editfrm');
		editfrm.submit();
	};
</script>

<div class="px-40 py-40 flex bg-gray-100">
	<div class="w-1/4 p-5 mr-5 rounded-xl bg-white">
		<div on:click={() => (section = 'Infomation & Contact')}>Infomation & Contact</div>
		<div on:click={() => (section = 'Change Password')}>Change Password</div>
	</div>
	<div class="w-3/4 p-5 rounded-xl bg-white">
		{#if section == 'Infomation & Contact'}
			<div class="flex justify-between">
				<div>Infomation</div>

				<Button onclick={() => (defaultModal = true)} content="Edit Info"/>
			</div>
			<div class="flex">
				<div class="w-1/3 mr-10">
					<Avatar src={$currentUser?.photoURL} />
				</div>
				<div class="w-2/3 grid grid-cols-2">
					<div>FullName</div>
					<div>{userInfo?.fullName??""}</div>
					<div>Username</div>
					<div>{$currentUser?.displayName}</div>
					<div>Email</div>
					<div>{$currentUser?.email}</div>
					<div>Phone Number</div>
					<div>{$currentUser?.phoneNumber ?? ''}</div>
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

<Modal title="Terms of Service" bind:open={defaultModal}>
	<form id="editfrm" method="POST" action="?/editinfo">
		<div>
			<Label>FullName</Label>
			<Input classes="border w-2/3" required={true} name="fullname" value={userInfo?.fullName} />
		</div>
		<div>
			<Label>Username</Label>
			<Input classes="border w-2/3" required={true} name="displayName" value={$currentUser?.displayName} />
		</div>
		<div>
			<Label>PhoneNumber</Label>
			<Input classes="border w-2/3" required={true} name="phoneNumber" value={$currentUser?.phoneNumber ?? ''} />
		</div>
		<div>
			<Label>Avatar</Label>
			<Input classes="border w-2/3" required={true} name="photoURL" value={$currentUser?.photoURL} />
		</div>
	</form>
	<svelte:fragment slot="footer">
		<Button onclick={editFrmSubmit} content="Save" />
		<Button onclick={() => (defaultModal = false)} content="Cancel"/>
	</svelte:fragment>
</Modal>
