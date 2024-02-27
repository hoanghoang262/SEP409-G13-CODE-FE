<script lang="ts">
    export let content = '';
    export let classes = '';
    export let onclick:any = () => {}
</script>


<button on:click={onclick} class="{classes} bg-black rounded-md p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-black hover:bg-white transition ease-in-out"
	>{content}</button
>
