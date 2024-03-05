<script lang="ts">
    
	import { goto } from '$app/navigation';
    
    let section = "Courses Lists"
    const sections = ['Courses Lists', 'Add Course', 'Posts List', 'Add Post']
    </script>
    
    <div class="bg-neutral-100 px-40 py-40 flex text-purple-400">
        <div class="w-1/3 mr-10 rounded-xl shadow-xl border border-purple-300 p-5 bg-white">
            <div class="font-medium text-2xl mb-5">Manager</div>
            <div class="pl-5">
                <div class="font-medium text-xl mb-2">Courses Manager</div>
                <div class="mb-5">
                    <a class="pl-3 hover:bg-neutral-100 block" href="/manager/courseslist">Courses List</a>
                    <!-- <div role="button" tabindex="0" on:keydown={() => goto("/manager/courseslist")} on:click={() => {console.log('goto')}} class="pl-3 hover:bg-neutral-100">Courses List</div> -->
                    <a href="/manager/addcourse" class="pl-3 hover:bg-neutral-100 block">Add Course</a>
                </div>
                <div class="font-medium text-xl mb-2">Posts Manager</div>
                <div>
                    <a href="/manager/postslist" class="pl-3 hover:bg-neutral-100 block">Posts List</a>
                    <a href="/manager/addpost" class="pl-3 hover:bg-neutral-100">Add Post</a>
                </div>
            </div>
        </div>
        <div class="w-2/3 rounded-xl shadow-xl border border-purple-300 bg-white p-5">
            <slot />
        </div>
    </div>
    