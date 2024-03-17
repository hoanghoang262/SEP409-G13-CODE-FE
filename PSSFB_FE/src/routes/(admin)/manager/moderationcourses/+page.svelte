<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import Button2 from '../../../../atoms/Button2.svelte';
	import CourseContainer from '../../../../components/CourseContainer.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import { goto } from '$app/navigation';

	export let data;
	const courses: any = data.courses;
</script>

<!-- <Table>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Course</TableHeadCell>
		<TableHeadCell>Create At</TableHeadCell>
		<TableHeadCell>Create By</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each courses as c, index}
			<TableBodyRow>
				<TableBodyCell>{c.courseId}</TableBodyCell>
				<TableBodyCell>{c.courseName}</TableBodyCell>
				<TableBodyCell>{c.createdAt}</TableBodyCell>
				<TableBodyCell>{c.userName}</TableBodyCell>
				<TableBodyCell>{c.status}</TableBodyCell>
				<TableBodyCell
					><Button2 classes="border mr-3" content="edit" />
          {#if c.status == 'Pending'}
						<Button2 classes="border mr-3" content="approve" />
					{:else}
						<Button2 classes="border mr-3" content="close" />
					{/if}</TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table> -->
<!-- <div class="pl-5"><Button onclick={() => goto("/manager/coursesmanager/addcourse")} content="Add Course"/></div> -->
<div class="flex flex-wrap w-full items-center py-10">
	
	{#each courses as c}
	<div class="w-1/3 p-5">
		<CourseContainer type="admin" course={c} />
	</div>
	{/each}
</div>
