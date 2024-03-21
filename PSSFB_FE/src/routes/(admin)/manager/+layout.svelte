<script lang="ts">
    
	import { goto } from '$app/navigation';
	import { beforeUpdate } from 'svelte';
	import { currentUser } from '../../../stores/store';
    
    let section = "Courses Lists"
    const sections = ['Courses Lists', 'Add Course', 'Posts List', 'Add Post']
    
    beforeUpdate(async () => {
		if (!$currentUser) {
			goto('/');
		}else if($currentUser.Role.includes('Student')){
			goto('/learning');
		}
	});
    </script>
    
    <div class="bg-neutral-100 py-40 flex text-black">
        <div class="w-1/5 rounded-r-none rounded-xl shadow-xl border border-neutral-300 p-5 bg-white min-h-screen">
            <div class="font-medium text-2xl mb-5">Manager</div>
            <div class="pl-5">
                <div class="font-medium text-xl mb-2">Courses Manager</div>
                <div class="mb-5">
                    {#if $currentUser?.Role == 'Admin System'}
                    <a class="pl-3 hover:bg-neutral-100 block" href="/manager/moderationcourses">Moderation Courses</a>
                    {/if}
                   
                    {#if $currentUser?.Role == 'Admin Bussiness'}
                    <a href="/manager/creattingcourses" class="pl-3 hover:bg-neutral-100 block">Created Courses</a>
                    <!-- <div role="button" tabindex="0" on:keydown={() => goto("/manager/courseslist")} on:click={() => {console.log('goto')}} class="pl-3 hover:bg-neutral-100">Courses List</div> -->
                    <a href="/manager/coursesmanager/addcourse" class="pl-3 hover:bg-neutral-100 block">Add Course</a>
                    {/if}
                    
                </div>
                <div class="font-medium text-xl mb-2">Posts Manager</div>
                <div>
                    <a href="/manager/moderationposts" class="pl-3 hover:bg-neutral-100 block">Moderation Posts</a>
                    <a href="/manager/postmanager/addpost" class="pl-3 hover:bg-neutral-100">Add Post</a>
                </div>
            </div>
        </div>
        <div class="w-4/5 text-black rounded-xl rounded-l-none shadow-xl border border-neutral-300 bg-white p-5">
            <slot />
        </div>
    </div>
    