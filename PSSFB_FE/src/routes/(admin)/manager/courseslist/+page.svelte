<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import Button2 from '../../../../atoms/Button2.svelte';

    export let data;
    const courses:any = data.courses
</script>

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
            <TableBodyCell>{c.id}</TableBodyCell>
            <TableBodyCell>{c.name}</TableBodyCell>
            <TableBodyCell>20:00:00</TableBodyCell>
            <TableBodyCell>{c.createdBy}</TableBodyCell>
            <TableBodyCell><Button2 classes="border mr-3" content="edit"/><Button2 classes="border mr-3" content="close"/></TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>