<script lang="ts">
	import { goto } from "$app/navigation";
	import Icon from "@iconify/svelte";

	export let course: any;

    const courseId = course?.id
	const chapters = course?.chapters;

    const plus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z' /> </svg>";

	const minus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998H5v-2h14z' /> </svg>";
        const hidden2 = (index: number) => {
		const div = document.getElementById(`si${index}`);
		const schedule = document.getElementById(`schedule${index}`);
		if (schedule) {
			if (schedule.classList.contains('hidden')) {
				schedule.classList.remove('hidden');
				div!.innerHTML = minus;
			} else {
				schedule.classList.add('hidden');
				div!.innerHTML = plus;
			}
		}
	};

	const lessionClick = (l: any, index: number, lindex:number) => {
		if (l.type == 'code') goto(`/lession/${courseId}/${index}/${lindex}`);
		else if (l.type == 'quiz') goto(`/quiz/${index}`);
	};
</script>

<div class="w-1/4 shadow-xl rounded-2xl mr-10 border bg-white">
	<div class="text-2xl font-medium px-3 py-5">Schedule</div>

	<hr class="my-5" />

	{#each chapters as s, index}
		<div class="text-lg font-medium px-3 py-5 flex items-center text-neutral-500">
			<div
				class="mr-5"
				tabindex="0"
				role="button"
				on:keydown={() => {
					() => hidden2(index);
				}}
				on:click={() => hidden2(index)}
				id="si{index}"
			>
				{@html minus}
			</div>
			{s?.name}
		</div>
		<div id="schedule{index}">
			{#each s.lessons as l, lindex}
				<div
					tabindex="0"
					role="button"
					on:keydown={() => {
						lessionClick(l, index, lindex);
					}}
					on:click={() => lessionClick(l, index, lindex)}
					class="pl-10 mb-5 flex items-center flex-wrap"
				>

					<Icon class="mr-3" icon="ion:book-sharp" style="color: gray" />

					{l.title}
					<div class="truncate w-full pl-7 pr-10 text-sm text-neutral-500">{l.description}</div>
				</div>
			{/each}

			{#each s.codeQuestions as l, lindex}
				<div
					tabindex="0"
					role="button"
					on:keydown={() => {
						lessionClick(l, index, lindex);
					}}
					on:click={() => lessionClick(l, index, lindex)}
					class="pl-10 mb-5 flex items-center"
				>
					<Icon class="mr-3 text-2xl" icon="material-symbols:code" style="color: gray" />

					<p class="truncate pr-10">{l.description}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>
