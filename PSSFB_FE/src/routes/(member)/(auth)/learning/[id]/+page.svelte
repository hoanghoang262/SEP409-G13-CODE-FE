<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import Button2 from '../../../../../atoms/Button2.svelte';
	import Logo from '../../../../../assets/Trắng 2.png';
	import SkillsSet from '../../../../../components/SkillsSet.svelte';
	import { goto } from '$app/navigation';
	import { comment } from '../../../../../data/data';
	import { Textarea } from 'flowbite-svelte';
	import Button from '../../../../../atoms/Button.svelte';
	import CommentContainer from '../../../../../components/CommentContainer.svelte';

	export let data;
	const course:any = data.course;
	//const sysllabus = data.sysllabus;
	const quiz = course.chapters.flatMap((chapter:any) => chapter.lessons);
	const code = course.chapters.flatMap((chapter:any) => chapter.codeQuestions);
	let section = 'Introduction';
	const sections = ['Introduction', 'Sysllabus', 'Comments'];
</script>

<div>
	<div class="flex pt-40 px-40 bg-black text-white">
		<div class="w-2/3">
			<div class="text-6xl my-5">{course.name}</div>
			<div class="flex text-4xl my-5">
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
			</div>
			<div class="flex items-center">
				<Avatar src={course?.avatar} classes="w-10 rounded-full mr-3" />
				<div class="text-xl">{course.created_Name}</div>
			</div>
			<Button2
				onclick={() => goto(`/overall/${data.id}`)}
				classes="py-3 px-16 bg-white text-black my-10"
				content="Entrol for free"
			/>
			<div>There are 65,273 already enrolled</div>
		</div>
		<div class="w-1/3 text-center">
			<div class="text-2xl">Offered by</div>
			<img alt="logo" src={Logo} />
		</div>
	</div>

	<div class="mt-10 px-40">
		<div class="flex text-2xl mb-10">
			{#each sections as s}
				<div
				tabindex=0
				role="button"
				on:keydown={() => (section = s)}
					on:click={() => (section = s)}
					class="mr-10 {s == section ? 'underline underline-offset-8' : ''}"
				>
					{s}
				</div>
			{/each}
		</div>

		<div class="my-20">
			{#if section == 'Introduction'}
				<div>
					When it comes to object-oriented programming, you might immediately think of the four
					characteristics of encapsulation, inheritance, polymorphism, and abstraction. In reality,
					these four characteristics are just like ingredients for building a program using the
					object-oriented approach. The most important thing is still how you use these ingredients
					to build the program. So what is object-oriented programming? Object-oriented programming
					is simply a method for solving programming problems that, when applied, makes code easier
					to develop and maintain. This method breaks down the program into objects and
					relationships, with each object having attributes (data) and behaviors (methods). To be
					able to program and design a program using this method, you definitely need to have a
					clear understanding of the four characteristics of encapsulation, inheritance,
					polymorphism, and abstraction. WHAT YOU WILL LEARN Object-Oriented Programming (OOP) is a
					programming method that is based on objects to identify the essence of a problem. The C++
					OOP course helps programmers learn programming techniques where all logic and practical
					requirements are built around objects. Understanding how C++ OOP works simplifies
					maintenance and makes it easier to expand software design.
				</div>
			{:else if section == 'Sysllabus'}
				<div class="bg-neutral-100 border px-40 pb-20">
					<div class="text-center text-3xl my-10">
						Syllabus - What you will learn from this learn
					</div>
					<div class="text-2xl mb-5">{course.title}</div>
					<div class="flex items-center text-xl">
						<Icon class="mr-3" icon="ph:book-open-fill" style="color: #008ee6" />
						{quiz.length} quizzes, {code.length} codes
					</div>
					<hr class="my-5" />
					<div class="flex items-center font-medium">
						<Icon class="mr-3" icon="majesticons:list-box" style="color: #008ee6" /> quizzes
					</div>

					<div>
						<ul>
							{#each quiz as q}
								<li class="pl-5 my-3 flex items-center">
									<Icon class="mr-1 text-3xl" icon="mdi:dot" style="color: black" />
									{q.title}
								</li>
							{/each}
						</ul>
					</div>

					<hr class="my-5" />
					<div class="flex items-center font-medium">
						<Icon class="mr-3" icon="material-symbols:code" style="color: #008ee6" /> codes
					</div>

					<div>
						<ul>
							{#each code as q}
								<li class="pl-5 my-3 flex items-center">
									<Icon class="mr-1 text-3xl" icon="mdi:dot" style="color: black" />
									{q.description}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{:else if section == 'Comments'}
				<CommentContainer />
			{/if}
		</div>

		<SkillsSet />
	</div>
</div>
