<script>

	import { Label } from "flowbite-svelte";
	import Input from "../../../../../../../atoms/Input.svelte";
	import Button from "../../../../../../../atoms/Button.svelte";
	import { goto } from "$app/navigation";

</script>


<div class="w-4/5">
	<form method="POST" action="?/addcourse">
		<Label defaultClass=" mb-3 block">Chapter Name</Label>
		<input type="number" step=0.01 class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md" required name="name" placeholder="chapter name" />

		
		<div class="flex justify-end"><Button onclick={() => goto("/manager/coursesmanager/addcourse/addlession/0")} content="Save" /></div>
	</form>
</div>