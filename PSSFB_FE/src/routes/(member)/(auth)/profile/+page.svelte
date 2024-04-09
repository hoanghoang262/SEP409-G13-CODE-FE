<script lang="ts">
	import { Label, Modal } from 'flowbite-svelte';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import ChangePassContainer from '../../../../components/ChangePassContainer.svelte';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import {
		checkExist,
		checkPasswords,
		checkUserName,
		isImage,
		showToast
	} from '../../../../helpers/helpers';
	import { getURL, loginWithEmailAndPsr, logout, uploadImage } from '../../../../firebase';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { getUserInfo, updateUserInfo } from '$lib/services/AuthenticationServices';
	import Dropzone from 'svelte-file-dropzone';
	import { formatDate } from '../../../../helpers/datetime';
	import ResetPasswordModal from '../../../../components/modals/ResetPasswordModal.svelte';
	import { trimUserData } from '../../../../helpers/helpers';
	import { DateInput } from 'date-picker-svelte';

	let showModal = false;
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
	let changeStatus = false;
	let editStatus = false;

	let date: any;

	function formatDateForInput(dateString: any) {
		const date = new Date(dateString);

		// Option 1: Adjust for specific time zone (if known)
		//   - Replace '+07:00' with the appropriate time zone offset for the original date
		date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // Adjust for +07:00 (Indochina Time)

		// Option 2: Use a library for time zone handling (recommended)
		//   - Consider moment.js or date-fns for more flexibility and accuracy

		const formattedDate = date.toISOString().slice(0, 10);
		return formattedDate;
	}

	onMount(async () => {
		if (!userInfo) {
			userInfo = await getUserInfo($currentUser.UserID);
			console.log(userInfo.birthDate);
			date = formatDateForInput(new Date(userInfo.birthDate).toJSON().slice(0, 10));
			info = userInfoTrim();
		}
	});

	let image: any;
	let info = {
		userId: userInfo?.id,
		fullname: userInfo?.fullName ?? '',
		email: userInfo?.email ?? '',
		profilePict: userInfo?.profilePict ?? '',
		username: userInfo?.userName ?? '',
		phone: userInfo?.phone ?? '',
		address: userInfo?.address ?? '',
		facebookLink: userInfo?.facebookLink ?? '',
		birthDate: date
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
			facebookLink: userInfo?.facebookLink ?? '',
			birthDate: date
		};
	};

	// const editFrmSubmit = () => {
	// 	const editfrm: any = document.getElementById('editfrm');
	// 	editfrm.submit();
	// };

	$: console.log(date);

	async function frmSubmit() {
		info.birthDate = date;
		pageStatus.set('load');
		if (!checkUserName(info.username)) {
			showToast('Edit Profile', 'username must be 8-32 characters long', 'warning');
			pageStatus.set('done');
			return;
		}
		if (checkExist(image)) {
			await uploadImage(image);
			const url = await getURL(image?.path);
			if (!checkExist(url)) {
				showToast('Edit Profile', 'something went wrong', 'error');
				pageStatus.set('done');
				return;
			}
			info.profilePict = url;
		}

		try {
			const response: any = await updateUserInfo(info.userId, info);
			console.log('re', response);
			if (response.data.statusCode == 400) {
				showToast('Profile', response.data.value.msgTextVN, 'error');
				pageStatus.set('done');
				return;
			} else {
				showToast('Profile', 'Edit profile success', 'success');
			}
			userInfo = await getUserInfo($currentUser.UserID);
			info = userInfoTrim();
			currentUser.set({
				...$currentUser,
				displayName: userInfo.userName,
				photoURL: userInfo.profilePict
			});
		} catch (error: any) {
			console.error(error);
		}

		pageStatus.set('done');
	}

	const editHandle = () => {
		editStatus = true;
	};

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
		}
	}
</script>

<div class="min-h-[calc(100vh-96px)] flex bg-gray-100 mb-2">
	<ResetPasswordModal bind:showModal />
	<div class="w-1/6 p-5 rounded-xl bg-white border-gray-200 border-2 pt-10">
		<div class="w-full">
			<button
				class="hover:bg-blue-200 w-full py-2 rounded-lg font-medium text-base border-gray-100 border {section ==
				'Infomation & Contact'
					? 'bg-green-100 '
					: ''}"
				on:click={() => (section = 'Infomation & Contact')}>Infomation & Contact</button
			>
		</div>
		<div class="w-full">
			<button
				class="hover:bg-blue-200 w-full py-2 rounded-lg font-medium text-base border-gray-100 border-2 {section ==
				'Change Password'
					? 'bg-green-100 '
					: ''}"
				on:click={() => (section = 'Change Password')}>Change Password</button
			>
		</div>
		<div class="w-full">
			<button
				class="hover:bg-gray-800 mt-10 w-full py-2 rounded-lg font-medium text-base border-gray-100 border-2 bg-black text-white"
				on:click={() => (showModal = true)}>Reset Password</button
			>
		</div>
		<div class="w-full">
			<button
				class=" hover:bg-red-600 w-full py-2 text-black rounded-lg font-medium text-base border-gray-100 border-2 bg-red-500"
				on:click={() => (firstWM = true)}>De-active account</button
			>
		</div>
	</div>
	<div class="m-auto h-full w-4/6 px-5 rounded-xl bg-white border-gray-200 border-2 pt-5">
		{#if section == 'Infomation & Contact'}
			<div class="flex justify-between">
				<div class="flex justify-between items-center x-5">
					<p
						class="md:flex hidden font-thinner text-2xl md:text-3xl mt-5 px-5 py-2 rounded-md bg-gray-200 w-fit"
					>
						Profile
					</p>
				</div>
			</div>
			<div class="">
				<div class="md:mx-5 md:mt-3 mt-2 flex flex-col justify-between items-start">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<div class="flex justify-between items-end w-full">
						<img
							class="w-16 h-16 md:h-20 md:w-20 my-4 object-cover rounded-full"
							src={info.profilePict}
							id="img"
							alt="Current profile photo"
						/>
						{#if editStatus}
							<div class="flex">
								<div class="w-fit mb-4">
									<button
										class=" px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-3"
										on:click={() => frmSubmit()}>Save</button
									>
								</div>

								<div class="w-fit mb-4">
									<button
										class=" px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
										on:click={() => (editStatus = false)}>Cancel</button
									>
								</div>
							</div>
						{:else}
							<div class="w-fit mb-4">
								<button
									class=" px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
									on:click={() => editHandle()}>Edit</button
								>
							</div>
						{/if}
					</div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class=" border-2 border-gray-200 w-full {editStatus ? 'block' : 'hidden'}">
						<span class="sr-only t-2">Choose profile photo</span>
						<div class="border-2 {editStatus ? 'border-blue-500' : 'border-black'}">
							<Dropzone containerClasses="" on:drop={handleFilesSelect} />
						</div>

						<input
							class="border w-2/3 hidden"
							required={true}
							name="photoURL"
							value={info?.profilePict}
						/>
					</label>
				</div>
				<div class="md:mx-5 md:my-5 my-3">
					<label
						class="relative block md:p-3 px-2 py-2 border-2 {editStatus
							? 'border-blue-500'
							: 'border-black'} rounded"
						for="username"
					>
						<span class="text-sm md:text-md font-semibold text-zinc-900">User Name </span>
						<input
							class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							autocomplete="off"
							id="username"
							type="text"
							placeholder="Your user name"
							bind:value={info.username}
							disabled={editStatus ? false : true}
						/>
					</label>
				</div>
			</div>
			<div class="md:mx-5 md:my-5 my-3">
				<label
					class="relative block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="fullname"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Full Name </span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="fullname"
						type="text"
						placeholder="Your fullname"
						bind:value={info.fullname}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>

			<div class="flex">
				<div class="w-1/2 md:mx-5 mr-2">
					<label
						class="relative block md:p-3 px-2 py-2 border-2 {editStatus
							? 'border-blue-500'
							: 'border-black'} rounded"
						for="phone"
					>
						<span class="text-sm md:text-md font-semibold text-zinc-900">Phone Number</span>
						<input
							class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							autocomplete="off"
							id="phone"
							type="text"
							placeholder="Your phone"
							bind:value={info.phone}
							disabled={editStatus ? false : true}
						/>
					</label>
				</div>
				<div class="w-1/2 md:mx-5 ml-2">
					<label
						class="relative block md:px-3 md:py-2 px-2 py-2 border-2 {editStatus
							? 'border-blue-500'
							: 'border-black'} rounded"
						for="birthDate"
					>
						<span class="text-sm md:text-md font-semibold text-zinc-900">BirthDate</span>
						<input
							class=" bg-transparent p-4 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							type="date"
							bind:value={date}
							disabled={editStatus ? false : true}
							placeholder="birth date"
						/>
						<!-- <input
							class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							autocomplete="off"
							id="birthDate"
							type="text"
							placeholder="dd-MM-yyyy"
							bind:value={info.birthDate}
							disabled={editStatus ? false : true}
						/> -->
					</label>
				</div>
			</div>
			<div class="  md:mx-5 md:my-5 my-3">
				<label
					class="relative block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="email"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Email</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="email"
						type="text"
						placeholder="Your email"
						bind:value={info.email}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>

			<div class=" md:mx-5 md:my-5 my-3">
				<label
					class="relative block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="address"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Address</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="address"
						type="text"
						placeholder="Your address"
						bind:value={info.address}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>
			<div class=" md:mx-5 md:my-5 my-3">
				<label
					class="relative block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="fblink"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Facebook Link</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="fblink"
						type="text"
						placeholder="Your facebook link"
						bind:value={info.facebookLink}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>
			<button
				class="float-right bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded my-8"
				on:click={() => (firstWM = true)}>Deactive</button
			>
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
		<Button onclick={async () => frmSubmit()} content="Save" />
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
	<Input
		placehoder="password"
		classes="border-2 border-gray-400 focus:border-none"
		bind:value={deactivePass}
	/>
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
