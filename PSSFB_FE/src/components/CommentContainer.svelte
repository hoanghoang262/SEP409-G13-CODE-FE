<script>
	import { Textarea } from "flowbite-svelte";


	import Avatar from "../atoms/Avatar.svelte";
	import { comment } from "../data/data";
	import Button from "../atoms/Button.svelte";
	import Icon from "@iconify/svelte";

</script>
<div>
    <div class="py-5 text-2xl">{comment.length} Comments</div>
    <div class="flex mb-3">
        <div class="w-10 mr-3">
            <Avatar />
        </div>
        <Textarea rows="5" />
    </div>
    <div class="flex justify-end"><Button content="Post" /></div>
    <hr class="my-5" />
    {#each comment as c}
        <div class="flex">
            <div class="w-10 mr-3">
                <Avatar />
            </div>
            <div>
                <div class="flex">
                    <div class="text-blue-500 mr-3">{c.username}</div>
                    <div class="text-neutral-400">{c.date}</div>
                </div>
                <div>{c.content}</div>
                <div class="flex items-center">
                    <Icon class="text-2xl" icon="iconamoon:like-thin" style="color: black" />{c.like}
                </div>
            </div>
        </div>

        <hr class="my-5" />
    {/each}
</div>