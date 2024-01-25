<script lang="ts">
    export let name:string = ''
    export let placehoder:string = ''
    export let type:string = ''
    export let readonly:boolean = false
    export let value:string = ''
</script>

<input class="py-3 px-5 w-full font-light text-black rounded-md" name="{name}" placeholder="{placehoder}" type="{type}" readonly={readonly} value="{value}"/>