<script lang="ts">
    export let name:string = ''
    export let placehoder:string = ''
   // export let type:string = ''
   export let id = 'input'
    export let readonly:boolean = false
    export let value:any = ''
    export let required:boolean = false
    export let classes:string = ''
    export let onChange:any=()=>{}
    export let onKeyDown:any=()=>{}
</script>

<input id={id} on:keydown={onKeyDown} on:change={onChange} class="{classes} py-3 px-5 font-light text-black rounded-md" required={required} name="{name}" placeholder="{placehoder}" readonly={readonly} bind:value={value}/>