<script lang="ts">
    import Icon from '@iconify/svelte';
	import { secondsToHMS } from '../helpers/helpers';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
export let course:any
</script>

<div class="border rounded shadow-xl hover:-translate-y-5 transition">
    <img alt="courseimg" src="{course.picture}" class="w-full"/>
    <div class="p-4">
        <h3 class="font-medium text-xl mb-2">{course.name}</h3>
        <p class="truncate text-sm">{course.description}</p>
    </div>
    <hr />
    <div class="px-2 py-5 flex justify-between items-center">
        <div class="flex items-center"><Icon icon="mdi:clock-outline"/>20:00:00</div>
        <Button onclick={() => goto(`/learning/${course.id}`)} content="join now"/>
    </div>
</div>