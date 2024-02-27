<script lang="ts">
	import axios from "axios";
	import { logout } from "../firebase";
	import { currentUser } from "../stores/store";
	import { goto } from "$app/navigation";

	const onLogout = async () => {
		currentUser.set(undefined)
		await logout()
		await axios.post("/?/logout",JSON.stringify({}))
		goto("/")
	}
</script>
<button on:click={onLogout} class="bg-black rounded-lg p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-black hover:bg-white transition ease-in-out"
	>Logout</button
>