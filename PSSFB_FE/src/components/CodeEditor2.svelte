<script lang="ts">
	import CodeMirror from "svelte-codemirror-editor";
	import { oneDark } from "@codemirror/theme-one-dark";

    export let value = "";

</script>

<div class="text-slate-300">
	
		<CodeMirror bind:value styles={{
			"&": {
				width: "100%",
				maxWidth: "100%",
				height: "250px",
			},
		}} theme={oneDark}/>
	
	<div class="bg-slate-800 text-white resize p-5 font-medium">
		
		
	</div>
</div>
