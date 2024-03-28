<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAllBusinessAdmin } from '$lib/services/UserAuthenticationService.js';
	import { goto } from '$app/navigation';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import { page } from '$app/stores';

	let data: any;
	let user: any = [];
	let totalPages: number;
	let pageNumber: number;
	let remainPage: number;

	let searchName = '';
	let selectStatus: string = '';

	//Mount and set up data
	onMount(async () => {
		// @ts-ignore
		const paginators = $page.state.paginators;
		if (paginators) {
			pageNumber = paginators.pageNumber;
			searchName = paginators.searchStr;
			selectStatus = paginators.status;
		}
		const result = await GetAllBusinessAdmin(setParam(pageNumber));
		data = result;
	});

	//update data
	$: if (data) {
		user = data?.items;
		totalPages = data?.totalPages;
		pageNumber = data?.pageNumber;
		remainPage = totalPages - pageNumber;
		if (remainPage < 6) remainPage = 5;
	}

	const tableHeader = [
		{ label: 'Full Name', map: 'fullName' },
		{ label: 'Email', map: 'email' },
		{ label: 'Birthdate', map: 'birthDate' },
		{
			label: 'Status',
			map: 'status',
			formatData: (data: boolean | null) => {}
		}
	];

	//Paginators event

	const setParam = (pageNumber: number = 1) => {
		const result: any = {
			pageNumber: pageNumber,
			searchStr: searchName,
			status: selectStatus
		};
		return result;
	};
</script>

<h1>hello</h1>
