<script lang="ts">
import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
import { courses } from "../../../data/data";
	import { secondsToHMS } from '../../../helpers/helpers';
	import Button2 from '../../../atoms/Button2.svelte';

let section = "Courses Lists"
const sections = ['Courses Lists', 'Add Course', 'Posts List', 'Add Post']
</script>

<div class="bg-neutral-100 px-40 py-40 flex text-purple-400">
	<div class="w-1/3 mr-10 rounded-xl shadow-xl border border-purple-300 p-5 bg-white">
		<div class="font-medium text-2xl mb-5">Manager</div>
		<div class="pl-5">
			<div class="font-medium text-xl mb-2">Courses Manager</div>
			<div class="mb-5">
				<div class="pl-3 hover:bg-neutral-100">Courses Lists</div>
				<div class="pl-3 hover:bg-neutral-100">Add Course</div>
			</div>
			<div class="font-medium text-xl mb-2">Posts Manager</div>
			<div>
				<div class="pl-3 hover:bg-neutral-100">Posts List</div>
				<div class="pl-3 hover:bg-neutral-100">Add Post</div>
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
        {/if}
    </div>
</div>
