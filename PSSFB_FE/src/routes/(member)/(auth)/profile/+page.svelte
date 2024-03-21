<script lang="ts">
	import { Label, Modal } from 'flowbite-svelte';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import ChangePassContainer from '../../../../components/ChangePassContainer.svelte';
	import { currentUser } from '../../../../stores/store';
	import { checkExist, showToast } from '../../../../helpers/helpers';
	import { loginWithEmailAndPsr, logout } from '../../../../firebase';
	import { deleteUser } from 'firebase/auth';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	export let form: any;
	if (form?.type == 'success') {
		showToast('Edit Profile', form.message, form.type);
	} else if (form?.type == 'error') {
		showToast('Edit Profile', form.message, form.type);
	}
	let section = 'Infomation & Contact';
	const sections = ['Infomation & Contact', 'Change Password'];
	export let data: any;
	const userInfo = data.userInfo;
	let defaultModal = false;
	let firstWM = false;
	let secondWM = false;
	let deactivePass = '';

	const editFrmSubmit = () => {
		const editfrm: any = document.getElementById('editfrm');
		editfrm.submit();
	};

	const deleteFunc = async () => {
		if (!checkExist(deactivePass)) {
			showToast('De-active', 'Input your password', 'warning');
			return;
		}

		const user: any = await loginWithEmailAndPsr($currentUser?.email, deactivePass);
		if (checkExist(user) && user?.email == $currentUser?.email) {
			try {
				await deleteUser(user?.email);
				currentUser.set(undefined);
				await logout();
				await axios.post('/?/logout', JSON.stringify({}));
				await user.delete();
				goto('/');
				showToast('De-active', 'your account had been de-active', 'info');
			} catch (error) {
				showToast('De-active', 'something went wrong', 'error');
			}
		} else {
			showToast('De-active', 'incorrect password', 'warning');
		}
	};
</script>

<div class="px-40 py-40 flex bg-gray-100">
	<div class="w-1/4 p-5 mr-5 rounded-xl bg-white">
		<div>
			<button on:click={() => (section = 'Infomation & Contact')}>Infomation & Contact</button>
		</div>
		<div><button on:click={() => (section = 'Change Password')}>Change Password</button></div>
		<div><button on:click={() => firstWM = true} class="text-red-500">De-active account</button></div>
	</div>
	<div class="w-3/4 p-5 rounded-xl bg-white">
		{#if section == 'Infomation & Contact'}
			<div class="flex justify-between">
				<div>Infomation</div>

				<Button onclick={() => (defaultModal = true)} content="Edit Info" />
			</div>
			<div class="flex">
				<div class="w-1/3 mr-10">
					<Avatar src={userInfo?.profilePict} />
				</div>
				<div class="w-2/3 grid grid-cols-2">
					<div>FullName</div>
					<div>{userInfo?.fullName ?? ''}</div>
					<div>Username</div>
					<div>{userInfo?.userName ?? ''}</div>
					<div>Email</div>
					<div>{$currentUser?.email}</div>
					<div>Phone Number</div>
					<div>{userInfo?.phone ?? ''}</div>
					<div>Address</div>
					<div>{userInfo?.address ?? ''}</div>
					<div>Facebook</div>
					<div>{userInfo?.facebookLink ?? ''}</div>
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
			<Input classes="border w-2/3" required={true} name="displayName" value={userInfo?.userName} />
		</div>
		<div>
			<Label>PhoneNumber</Label>
			<Input
				classes="border w-2/3"
				required={true}
				name="phoneNumber"
				value={userInfo?.phone ?? ''}
			/>
		</div>
		<div>
			<Label>Address</Label>
			<Input
				classes="border w-2/3"
				required={true}
				name="address"
				value={userInfo?.address ?? ''}
			/>
		</div>
		<div>
			<Label>Facebook</Label>
			<Input
				classes="border w-2/3"
				required={true}
				name="facebook"
				value={userInfo?.facebookLink ?? ''}
			/>
		</div>
		<div>
			<Label>Avatar</Label>
			<Input classes="border w-2/3" required={true} name="photoURL" value={userInfo?.profilePict} />
		</div>
	</form>
	<svelte:fragment slot="footer">
		<Button onclick={editFrmSubmit} content="Save" />
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>

<Modal on:close={() => (firstWM = false)} title="Warning" bind:open={firstWM} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Do you sure you want to delete this.
	</p>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={() => (secondWM = true)}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>Yes</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>No</button
			>
		</div>
	</svelte:fragment>
</Modal>

<Modal on:close={() => (secondWM = false)} title="Warning" bind:open={secondWM} autoclose>
	<div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Confirm again to delete
	</div>
	<Label>Password</Label>
	<Input placehoder="password" bind:value={deactivePass} />
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={deleteFunc}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>Delete</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>Back</button
			>
		</div>
	</svelte:fragment>
</Modal>
