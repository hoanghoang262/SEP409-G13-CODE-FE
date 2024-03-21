<script lang="ts">
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	import Button from '../atoms/Button.svelte';

	import Input from '../atoms/Input.svelte';
	import PasswordInput from '../atoms/PasswordInput.svelte';
	import { checkExist, showToast } from '../helpers/helpers';
	import { changePasswordWithEmail, loginWithEmailAndPsr, logout } from '../firebase';
	import { get } from 'svelte/store';
	import { currentUser, pageStatus } from '../stores/store';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { redirect } from '@sveltejs/kit';

	let old = '';
	let newP = '';

	const oldChange = (event: any) => (old = event.target.value);
	const newChange = (event: any) => (newP = event.target.value);

	const changePass = async () => {
		pageStatus.set('load')
        if(checkExist(old)&&checkExist(newP)){
            const user:any = await get(currentUser)

            if(!checkExist(user)) goto("/")

            const testUser:any = await loginWithEmailAndPsr(user.email, old)
            console.log(testUser)
            if(checkExist(testUser)){
				if(testUser?.email==user.email){
					await axios.post("/?/changePassword", JSON.stringify({newPassword: newP}))
                showToast('Change Password','Change password successfully', 'success')
				currentUser.set(undefined)
                logout()
				pageStatus.set('done')
                goto("/")
				}
                

            }else{
                showToast('Change Password','Password is incorrect', 'error')
            }
        }else{
            showToast('Change Password','Please enter old password and new password', 'warning')
        }
		pageStatus.set('done')
    };
</script>

<div>
	<PasswordInput
		value={old}
		onChange={oldChange}
		classes="w-2/3 border mb-5"
		placehoder="old password"
	/>
	<PasswordInput
		value={newP}
		onChange={newChange}
		classes="w-2/3 border mb-5"
		placehoder="new password"
	/>
	<div class="flex justify-end"><Button onclick={changePass} content="change password" /></div>
</div>

<ToastContainer placement="top-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>
