<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import Button2 from '../atoms/Button2.svelte';
	import { goto } from '$app/navigation';
	import Logo from '../assets/Trắng final.png';
	import CommentContainer from '../components/CommentContainer.svelte';
	import { getCommentByCourse } from '$lib/services/CommentService';
	import SkillsSet from '../components/SkillsSet.svelte';
	import { addWishList, enroll, getCourseById } from '$lib/services/CourseServices';
	import { currentUser } from '../stores/store';
	import { afterUpdate, beforeUpdate } from 'svelte';
	import { t } from '../translations/i18n';
	import { checkExist, showToast } from '../helpers/helpers';

	export let data: any;
	const course: any = data.course;
	let comments = data.comments;
	let enrolled = false;
	let rating = 0;
	const fullStar =
		'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z';
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	const emptyStar =
		'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z';

	const sysllabus = data.sysllabus;
	const quiz = course?.chapters.flatMap((chapter: any) => chapter.lessons);
	const code = course?.chapters.flatMap((chapter: any) => chapter.codeQuestions);
	const exam = course?.chapters.flatMap((chapter: any) => chapter.lastExam);
	let section = 'Introduction';
	const sections = ['Introduction', 'Sysllabus', 'Comments', 'Evaluation'];

	afterUpdate(async () => {
		getCourseById(course.id, $currentUser.UserID).then((result: any) => {
			if (result?.isEnrolled) {
				enrolled = true;
			}
		});
	});

	const evaludatioHandle = () => {
		if (rating == 0) {
			showToast('Evaluation Error', 'Missing evaluation', 'warning');
		} else {
		}
	};

	const AddToWishList = (event: any) => {
		addWishList($currentUser?.UserID, course.id);
		showToast('Add to wish list', 'Add to wish list successfully', 'success');
		event?.target?.classList?.remove('text-slate-400');
		event?.target?.classList?.add('text-red-500');
	};
</script>

<div>
	<div class="flex pt-10 px-40 bg-blue-950 text-white h-[500px]">
		<div class="w-2/3">
			<div class="text-6xl my-5">{course?.name}</div>
			<div class="flex text-4xl my-5">
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
				<Icon icon="material-symbols:star" style="color: #ffd500" />
			</div>
			<div class="flex items-center">
				<Avatar src={course?.avatar} classes="w-10 rounded-full mr-3" />
				<div class="text-xl">{course?.created_Name}</div>
			</div>
			<div class="flex items-center">
				{#if checkExist($currentUser)}
					<div class=" flex justify-between items-center mt-10">
						<button
							on:click={async () => {
								enroll($currentUser.UserID, course.id);
								goto(`/overall/${course.id}`);
							}}
							class=" px-16 text-black rounded-l-md bg-white py-2"
							>{enrolled ? 'Go to course' : 'Enroll for free'}</button
						>
						<button
							on:click={AddToWishList}
							class="py-2 px-2 rounded-r-md cursor-pointer border-l-2 border-black bg-black"
						>
							{#if course?.inWishList == true}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 48 48"
									{...$$props}
								>
									<path
										fill="#f44336"
										d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12"
									/>
								</svg>
							{:else if course?.inWishList == false}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 26 26"
									{...$$props}
								>
									<path
										fill="currentColor"
										d="M17.869 3.889c-2.096 0-3.887 1.494-4.871 2.524c-.984-1.03-2.771-2.524-4.866-2.524C4.521 3.889 2 6.406 2 10.009c0 3.97 3.131 6.536 6.16 9.018c1.43 1.173 2.91 2.385 4.045 3.729c.191.225.471.355.765.355h.058c.295 0 .574-.131.764-.355c1.137-1.344 2.616-2.557 4.047-3.729C20.867 16.546 24 13.98 24 10.009c0-3.603-2.521-6.12-6.131-6.12"
									/>
								</svg>
							{/if}
						</button>
					</div>
				{:else}
					<Button2
						classes="py-3 px-16 bg-white text-black my-10"
						content="Sign in to enroll"
						onclick={() => goto('/')}
					/>
				{/if}
			</div>

			<div>There are 65,273 already enrolled</div>
		</div>
		<div class="w-1/3 text-center overflow-hidden">
			<div class="text-2xl">Offered by</div>
			<img alt="logo" class="w-fit" src={Logo} />
		</div>
	</div>

	<div class="mt-10 px-40">
		<div class="flex text-2xl mb-10">
			{#each sections as s}
				<div
					tabindex="0"
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
					<div class="text-2xl mb-5">{course.name}</div>
					<div class="flex items-center text-xl">
						<Icon class="mr-3" icon="ph:book-open-fill" style="color: #008ee6" />
						{quiz.length} Quizzes, {code.length} Codes, {exam.length} Exams
					</div>
					<hr class="my-5" />
					<div class="flex items-center font-medium">
						<Icon class="mr-3" icon="majesticons:list-box" style="color: #008ee6" /> Quizzes
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
						<Icon class="mr-3" icon="material-symbols:code" style="color: #008ee6" /> Codes
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

					<hr class="my-5" />
					<div class="flex items-center font-medium">
						<Icon
							class="mr-3"
							icon="healthicons:i-exam-multiple-choice-outline"
							style="color: #008ee6"
						/> Exams
					</div>

					<div>
						<ul>
							{#each exam as q}
								<li class="pl-5 my-3 flex items-center">
									<Icon class="mr-1 text-3xl" icon="mdi:dot" style="color: black" />
									{q.name}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{:else if section == 'Comments'}
				<CommentContainer
					type="course"
					courseId={course.id}
					bind:comments
					getComment={() => getCommentByCourse(course.id)}
				/>
			{:else if section == 'Evaluation'}
				<div class="text-lg flex justify-center items-center">
					<p>{$t('Help us improve course quality by contribute you feetback')}</p>
				</div>
				<div>
					<div
						class="grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible"
					>
						<div class="inline-flex items-center">
							<button on:click={() => (rating = 1)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 1 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 1 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 1 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button on:click={() => (rating = 2)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 2 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 2 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 2 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button on:click={() => (rating = 3)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 3 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 3 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 3 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button on:click={() => (rating = 4)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 4 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 4 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 4 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button on:click={() => (rating = 5)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill={rating >= 5 ? 'currentColor' : 'none'}
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 5 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d={rating >= 5 ? fullStar : emptyStar}
									>
									</path>
								</svg></button
							>
						</div>
					</div>
				</div>
				<div class="flex justify-center items-center">
					<button
						on:click={evaludatioHandle}
						class="bg-green-500 rounded-md px-3 py-3 hover:bg-green-600 text-white">Supmit</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
