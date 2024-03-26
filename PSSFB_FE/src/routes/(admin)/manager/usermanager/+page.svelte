<script lang="ts">
	import { GetAllStudent } from '$lib/services/UserAuthenticationService.js';
	import { onMount } from 'svelte';
	import { StudentManager } from '../../../../Enum/Paginators.js';
	import Loading from '../../../../components/Loading.svelte';

	let data: any;
	let user: any = [];
	let totalPages: number;
	let pageNumber: number;
	let remainPage: number;

	let searchName = '';

	//Mount and set up data
	onMount(async () => {
		const result = await GetAllStudent(1);
		data = result;
	});

	$: if (data) {
		user = data?.items;
		totalPages = data?.totalPages;
		pageNumber = data?.pageNumber;
		remainPage = totalPages - pageNumber;
		if (remainPage < 6) remainPage = 5;
	}

	const tableHeader = [
		{ label: 'Full Name', map: 'fullName', weight: 1.0079 },
		{ label: 'Email', map: 'email', weight: 4.0026 },
		{ label: 'Birthdate', map: 'birthDate', weight: 1.0079 },
		{ label: 'Status', map: 'status', weight: 9.0122 }
	];

	//Paginators event
	const nextEvent = async () => {
		const result = await GetAllStudent(pageNumber + 1);
		data = result;
	};

	const previousEvent = async () => {
		const result = await GetAllStudent(pageNumber - 1);
		data = result;
	};

	const moveEvent = async (pageNumber: number) => {
		const result = await GetAllStudent(pageNumber);
		data = result;
	};
</script>

<main>
	<!-- Search input -->
	<div class="relative w-[90%] flex justify-end m-auto">
		<form class="w-[25%] min-w-[250px]">
			<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only"
				>Search</label
			>
			<div class="relative">
				<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="search"
					bind:value={searchName}
					id="default-search"
					class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search user buy name..."
					required
				/>
				<button
					type="submit"
					class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
					>Search</button
				>
			</div>
		</form>
	</div>
	<!--Table data-->
	<div
		class="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] mx-auto mt-5 border-gray-300 border-2"
	>
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-white uppercase bg-green-700">
				<tr>
					{#each tableHeader as item, i}
						<th class="px-6 py-5">
							<div class="flex items-center">{item.label}</div>
						</th>
					{/each}
				</tr>
			</thead>
			{#if data}
				<tbody>
					{#each user as row, rowIndex}
						<tr class="border-b {rowIndex % 2 == 1 ? 'bg-green-200' : 'bg-write'}">
							{#each tableHeader as head, colIndex}
								<td class="px-6 py-4">
									<div class="flex items-center">
										{row[head.map]}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			{:else}
				<tr>
					{#each tableHeader as _, i}
						<td class="py-4"><Loading /></td>
					{/each}
				</tr>
			{/if}
		</table>

		<!--Paginators-->
		<div class="flex justify-center items-center py-5 border-t-2 border-gray-300">
			<nav style="display: inline-block;" aria-label="Page navigation example">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button
							disabled={pageNumber === 1}
							on:click={previousEvent}
							class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
							>Previous</button
						>
					</li>
					<!-- loading Paginators -->
					{#if data == null}
						<div class="px-2">
							<Loading />
						</div>
						<!-- Check condition if total page <=6 it mean just liat all -->
					{:else if totalPages <= 6}
						{#each Array(totalPages) as _, i}
							<li>
								<button
									on:click={() => moveEvent(i + 1)}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700
								{i + 1 == pageNumber ? 'bg-green-600 text-white' : 'bg-blue-50 text-blue-600'}">{i + 1}</button
								>
							</li>
						{/each}
						<!-- else if total page >6 it mean me must consider to "..." label-->
					{:else if remainPage >= 6}
						{#each Array(3) as _, i}
							<li>
								<button
									on:click={() => moveEvent(pageNumber + i)}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700
			{i == 0 ? 'bg-green-600 text-white' : 'bg-blue-50 text-blue-600'}">{pageNumber + i}</button
								>
							</li>
						{/each}
						<li>
							<div class="flex items-center justify-center px-4 h-10 border border-gray-300">
								...
							</div>
						</li>
						{#each Array(3) as _, i}
							<li>
								<button
									on:click={() => moveEvent(totalPages - (3 - i) + 1)}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 bg-blue-50 text-blue-600'"
									>{totalPages - (3 - i) + 1}</button
								>
							</li>
						{/each}
					{:else}
						<li>
							<div class="flex items-center justify-center px-4 h-10 border border-gray-300">
								...
							</div>
						</li>
						{#each Array(6) as _, i}
							<li>
								<button
									on:click={() => moveEvent(totalPages - (remainPage - i))}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700
								{totalPages - (remainPage - i) == pageNumber
										? 'bg-green-600 text-white'
										: 'bg-blue-50 text-blue-600'}">{totalPages - (remainPage - i)}</button
								>
							</li>
						{/each}
					{/if}
					<li>
						<button
							disabled={pageNumber == totalPages}
							on:click={nextEvent}
							class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
							>Next</button
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</main>
