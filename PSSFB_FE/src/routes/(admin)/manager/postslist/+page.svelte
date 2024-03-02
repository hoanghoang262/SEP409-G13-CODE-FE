<script>

	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
	import { Posts } from "../../../../data/data";
	import Button2 from "../../../../atoms/Button2.svelte";

</script>

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
            <TableBodyCell><div class="w-52 truncate">{p.description}</div></TableBodyCell>
            <TableBodyCell>Stevent Siren</TableBodyCell>
            <TableBodyCell>{p.lastUpdate}</TableBodyCell>
            <TableBodyCell><Button2 classes="border mr-3" content="delete"/></TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>