<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatDateTime } from '../helpers/datetime';
	import { t } from '../translations/i18n';

	export let post: any;
</script>

<button
	on:click={() => goto('/forums/{post.id}')}
	class="border hover:shadow-2xl hover:-translate-y-5 transition-all"
>
	<!-- <img src={post.image} alt="postimg" class="w-full" /> -->
	<div class="px-3">
		<div class="py-5">
			<h3 class="text-2xl font-medium truncate mb-2">{post.title}</h3>
			<p class=" truncate">{post.description}</p>
		</div>
		<div class="pb-5 flex justify-between items-center">
			<div>
				<div class="font-light text-lg">{@html $t('Commentinfo', { n: 10 })}</div>
				<div>{$t('Created time')}: {formatDateTime(post.lastUpdate)}</div>
			</div>
			<a href="/forums/{post.id}">{$t('see the post')}</a>
		</div>
	</div>
</button>
