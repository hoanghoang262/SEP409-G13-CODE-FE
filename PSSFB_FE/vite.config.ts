import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define:{
		//Node Environment: development, test, production
		'process.env.NODE_ENV': JSON.stringify('production')
	}
});
