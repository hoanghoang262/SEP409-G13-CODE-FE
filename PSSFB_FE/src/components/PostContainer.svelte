<script lang="ts">
	import { t } from "../translations/i18n";

	export let post: any;
</script>

<div class="border hover:shadow-2xl hover:-translate-y-5 transition-all">
	<img src={post.image} alt="postimg" class="w-full" />
	<div class="px-3">
		<div class="py-5">
			<h3 class="text-2xl font-medium truncate mb-2">{post.title}</h3>
			<p class=" truncate">{post.content}</p>
		</div>
		<div class="pb-5 flex justify-between items-center">
            <div>
                <div class="font-light text-lg">{@html $t('Commentinfo', {n: post.comment})}</div>
                <div>Created time: {post.createdDate}</div>
            </div>
            <a href="/home">see the post</a>
        </div>
	</div>
</div>
