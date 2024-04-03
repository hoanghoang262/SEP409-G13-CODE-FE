<script lang="ts">
	import { Label, Modal } from 'flowbite-svelte';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import ChangePassContainer from '../../../../components/ChangePassContainer.svelte';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import { checkExist, isImage, showToast } from '../../../../helpers/helpers';
	import { getURL, loginWithEmailAndPsr, logout, uploadImage } from '../../../../firebase';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { getUserInfo, updateUserInfo } from '$lib/services/AuthenticationServices';
	import Dropzone from 'svelte-file-dropzone';

	export let form: any;
	if (form?.type == 'success') {
		showToast('Edit Profile', form.message, form.type);
	} else if (form?.type == 'error') {
		showToast('Edit Profile', form.message, form.type);
	}
	let section = 'Infomation & Contact';
	const sections = ['Infomation & Contact', 'Change Password'];
	//export let data: any;
	let userInfo: any;
	let defaultModal = false;
	let firstWM = false;
	let secondWM = false;
	let deactivePass = '';

	onMount(async () => {
		if (checkExist($currentUser)) {
			userInfo = await getUserInfo($currentUser.UserID);
			info = userInfoTrim()
		}
	});

	let image: any;
	let info = {
		userId: userInfo?.id,
		fullname:'',
		email: userInfo?.email ?? '',
		profilePict: '',
		username: '',
		phone:'',
		address: '',
		facebookLink: ''
	};

	const userInfoTrim = () => {
		return {
			userId: userInfo?.id,
			fullname: userInfo?.fullName ?? '',
			email: userInfo?.email ?? '',
			profilePict: userInfo?.profilePict ?? '',
			username: userInfo?.userName ?? '',
			phone: userInfo?.phone ?? '',
			address: userInfo?.address ?? '',
			facebookLink: userInfo?.facebookLink ?? ''
		};
	};

	// const editFrmSubmit = () => {
	// 	const editfrm: any = document.getElementById('editfrm');
	// 	editfrm.submit();
	// };

	async function frmSubmit() {
		pageStatus.set('load');
		if (checkExist(image)) {
			await uploadImage(image);
			const url = await getURL(image?.path);
			if (!checkExist(url)) {
				showToast('Edit Profile', 'something went wrong', 'error');
				return;
			}
			console.log("url",url);
			info.profilePict = url;
		}

		try {
			console.log(JSON.stringify(info))
			const response = await updateUserInfo(info.userId, info);
			console.log(response);
			userInfo = await getUserInfo($currentUser.UserID);
			info = userInfoTrim();
			currentUser.set({...$currentUser, displayName: userInfo.userName, photoURL: userInfo.profilePict})
		} catch (error) {
			console.error(error);
		}

		pageStatus.set('done');
	}

	const deleteFunc = async () => {
		if (!checkExist(deactivePass)) {
			showToast('De-active', 'Input your password', 'warning');
			return;
		}

		const user: any = await loginWithEmailAndPsr($currentUser?.email, deactivePass);
		if (checkExist(user) && user?.email == $currentUser?.email) {
			try {
				await user.delete();
				currentUser.set(undefined);
				await logout();
				await axios.post('/?/logout', JSON.stringify({}));
				goto('/');
				showToast('De-active', 'your account had been de-active', 'info');
			} catch (error) {
				showToast('De-active', 'something went wrong', 'error');
			}
		} else {
			showToast('De-active', 'incorrect password', 'warning');
		}
	};

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		if (isImage(acceptedFiles[0]?.path)) {
			image = acceptedFiles[0];
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				// Create an image element or use a dedicated image component
				const imageE: any = document.getElementById('img');
				imageE.classList.remove('hidden');
				imageE.src = reader.result;
				imageE.alt = image.name;
				// Append the image to a container element in your UI
			});
			reader.readAsDataURL(image);
			console.log(image);
		}
		console.log(image);
	}
</script>

<div class="px-40 py-40 flex bg-gray-100">
	<div class="w-1/4 p-5 mr-5 rounded-xl bg-white">
		<div>
			<button on:click={() => (section = 'Infomation & Contact')}>Infomation & Contact</button>
		</div>
		<div><button on:click={() => (section = 'Change Password')}>Change Password</button></div>
		<div>
			<button on:click={() => (firstWM = true)} class="text-red-500">De-active account</button>
		</div>
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

<Modal title="Edit profile" bind:open={defaultModal}>
	<form id="editfrm" on:submit={frmSubmit}>
		<div>
			<Label>FullName</Label>
			<Input classes="border w-2/3" required={true} name="fullname" bind:value={info.fullname} />
		</div>
		<div>
			<Label>Username</Label>
			<Input classes="border w-2/3" required={true} name="displayName" bind:value={info.username} />
		</div>
		<div>
			<Label>PhoneNumber</Label>
			<Input classes="border w-2/3" required={true} name="phoneNumber" bind:value={info.phone} />
		</div>
		<div>
			<Label>Address</Label>
			<Input classes="border w-2/3" required={true} name="address" bind:value={info.address} />
		</div>
		<div>
			<Label>Facebook</Label>
			<Input
				classes="border w-2/3"
				required={true}
				name="facebook"
				bind:value={info.facebookLink}
			/>
		</div>
		<div>
			<Label>Avatar</Label>
			<Dropzone containerClasses="w-2/3 ml-4 mb-5" on:drop={handleFilesSelect} />
			
				<img src={info.profilePict} class="w-1/3 ml-4 mb-5" id="img" alt="img" />
			

			<Input
				classes="border w-2/3 hidden"
				required={true}
				name="photoURL"
				value={info?.profilePict}
			/>
		</div>
	</form>
	<svelte:fragment slot="footer">
		<Button onclick={async() => frmSubmit()} content="Save" />
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
