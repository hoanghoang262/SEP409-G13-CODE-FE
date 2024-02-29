<script lang="ts">
import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
import { Posts, courses, posts } from "../../../data/data";
	import { secondsToHMS } from '../../../helpers/helpers';
	import Button2 from '../../../atoms/Button2.svelte';
	import Input from '../../../atoms/Input.svelte';
	import AddCourseContainer from '../../../components/AddCourseContainer.svelte';

let section = "Courses Lists"
const sections = ['Courses Lists', 'Add Course', 'Posts List', 'Add Post']
</script>

<div class="bg-neutral-100 px-40 py-40 flex text-purple-400">
	<div class="w-1/3 mr-10 rounded-xl shadow-xl border border-purple-300 p-5 bg-white">
		<div class="font-medium text-2xl mb-5">Manager</div>
		<div class="pl-5">
			<div class="font-medium text-xl mb-2">Courses Manager</div>
			<div class="mb-5">
				<div role="button" tabindex="0" on:keydown={() => section="Courses Lists"} on:click={() => section="Courses Lists"} class="pl-3 hover:bg-neutral-100">Courses Lists</div>
				<div role="button" tabindex="0" on:keydown={() => section="Add Course"} on:click={() => section="Add Course"} class="pl-3 hover:bg-neutral-100">Add Course</div>
			</div>
			<div class="font-medium text-xl mb-2">Posts Manager</div>
			<div>
				<div role="button" tabindex="0" on:keydown={() => section="Posts List"} on:click={() => section="Posts List"} class="pl-3 hover:bg-neutral-100">Posts List</div>
				<div role="button" tabindex="0" on:keydown={() => section="Add Post"} on:click={() => section="Add Post"} class="pl-3 hover:bg-neutral-100">Add Post</div>
			</div>
		</div>
	</div>
	<div class="w-2/3 rounded-xl shadow-xl border border-purple-300 bg-white p-5">
        {#if section == 'Courses Lists'}
        <Table>
            <TableHead>
              <TableHeadCell>#</TableHeadCell>
              <TableHeadCell>Course</TableHeadCell>
              <TableHeadCell>Duration</TableHeadCell>
              <TableHeadCell>Create By</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
              {#each courses as c, index}
                <TableBodyRow>
                    <TableBodyCell>{index+1}</TableBodyCell>
                    <TableBodyCell>{c.title}</TableBodyCell>
                    <TableBodyCell>{secondsToHMS(c.estimateTime)}</TableBodyCell>
                    <TableBodyCell>{c.author}</TableBodyCell>
                    <TableBodyCell><Button2 classes="border mr-3" content="edit"/><Button2 classes="border mr-3" content="close"/></TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          </Table>

          {:else if section = 'Add Course'}
          <div>
            <AddCourseContainer />
          </div>
          {:else if section = 'Posts List'}
          <Table>
            <TableHead>
              <TableHeadCell>#</TableHeadCell>
              <TableHeadCell>Post</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Create By</TableHeadCell>
              <TableHeadCell>Last Update</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
              {#each Posts as p, index}
                <TableBodyRow>
                    <TableBodyCell>{index+1}</TableBodyCell>
                    <TableBodyCell>{p.title}</TableBodyCell>
                    <TableBodyCell>{p.description}</TableBodyCell>
                    <TableBodyCell>Stevent Siren</TableBodyCell>
                    <TableBodyCell>{p.lastUpdate}</TableBodyCell>
                    <TableBodyCell><Button2 classes="border mr-3" content="delete"/></TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          </Table>
          {:else if section = 'Add Post'}
          <div></div>
        {/if}
    </div>
</div>
