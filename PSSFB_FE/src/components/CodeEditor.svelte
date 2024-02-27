<script lang="ts">
	import Icon from '@iconify/svelte';
	import { codeLanguage } from '../data/data';
	//import 'codemirror/lib/codemirror.css';
	import Button2 from '../atoms/Button2.svelte';
	import CodeMirror from "svelte-codemirror-editor";
	import {javascript} from "@codemirror/lang-javascript"
	import { oneDark } from "@codemirror/theme-one-dark";

    let value = "";
	let text = '';

</script>

<div class="text-slate-300">
	<div class="flex justify-between items-center bg-slate-800 p-5">
		<div class="flex items-center">
			<Icon icon="" />
			<select class="bg-slate-800">
				{#each codeLanguage as c}
					<option>{c}</option>
				{/each}
			</select>
		</div>
		<div>
			<Button2 classes="bg-blue-800" content="run code" />
			<Button2 classes="bg-slate-500" content="submit" />
		</div>
	</div>
	<!-- <iframe id="editor" class="w-full h-[400px] overflow-visible" src="https://www.programiz.com/java-programming/online-compiler/?hideMenu=1&hideTabs=1"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; gyroscope; microphone; midi; network-state; picture-in-picture; speaker; sync-xhr; usb; vr; wake-lock;"
        allowfullscreen/> -->

	<!-- <textarea rows="14" class="bg-slate-950 text-base p-5 w-full"></textarea> -->
	
		<CodeMirror bind:value lang={javascript()} styles={{
			"&": {
				width: "100%",
				maxWidth: "100%",
				height: "500px",
			},
		}} theme={oneDark}/>
	
	<div class="bg-slate-800 text-white resize p-5 font-medium">
		<div class="border-b border-white inline-block mb-3">TEST CASE</div>
		<div class="flex">
			<div class="w-1/6 border-r mr-10">
				<div>test case 1</div>
			</div>
			<div class="w-5/6 flex">
				<div class="w-1/2">
					<div>Input</div>
					<div>Actual Output</div>
					<div>Expected output</div>
					<div>Execute time limit</div>
					<div>Execute time</div>
				</div>
				<div class="w-1/2">
					<div>0</div>
					<div></div>
					<div>Hello World</div>
					<div>500ms</div>
					<div></div>
				</div>
			</div>
		</div>
	</div>
</div>
