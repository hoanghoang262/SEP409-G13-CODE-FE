<script>
	import Avatar from '../../../../atoms/Avatar.svelte';
	import CommentContainer from '../../../../components/CommentContainer.svelte';

	export let data;
	const post = data.post;
</script>

<div class="pt-40 px-40">
	<div class="mb-10">Home > Forums > {post.title}</div>
	<div class="flex px-32">
		<div class="w-9/12 mr-5"><Avatar /></div>
		<div>
			<div class="text-2xl mb-3">{post.title}</div>
			<div class="mb-5">
				<span class="mr-4">By: Steven Siren</span> Last update: {post.lastUpdate}
			</div>
			<div>{post.description}</div>
			<div class="mb-5">
				This introductory course provides an overview of key concepts and principles in
				environmental science, emphasizing the interconnections between humans and the natural
				world. Through a combination of lectures, discussions, readings, and hands-on activities,
				students will explore various environmental issues, including climate change, biodiversity
				loss, pollution, resource depletion, and sustainability. The course begins by examining the
				fundamentals of ecology, including ecosystem structure and function, population dynamics,
				and biogeochemical cycles. Building upon this foundation, students will investigate the ways
				in which human activities impact ecosystems and natural processes, as well as strategies for
				mitigating and adapting to environmental challenges. Topics covered include: The scientific
				method and its application to environmental issues The role of energy in ecological systems
				and human societies The dynamics of climate change, including causes, impacts, and
				mitigation strategies The importance of biodiversity and the threats facing global
				biodiversity hotspots The sources, effects, and regulation of air, water, and soil pollution
				The depletion of natural resources, such as freshwater, forests, and fisheries The
				principles of sustainable development and approaches to achieving environmental
				sustainability Throughout the course, students will be encouraged to think critically about
				environmental issues, consider multiple perspectives, and evaluate potential solutions. By
				the end of the semester, students will have gained a deeper understanding of the complex
				interactions between humans and the environment, as well as the knowledge and skills needed
				to address environmental challenges in their personal and professional lives.
			</div>
            <div class="flex">
                {#each post.tag as t}
                    <div class="px-5 py-1 rounded-lg bg-neutral-100">{t}</div>
                {/each}
            </div>
		</div>
	</div>
    <div>
        <CommentContainer />
    </div>
</div>
