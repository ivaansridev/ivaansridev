import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		// Vite base64-inlines any asset below this size, including when a module
		// imports it with `?url`. Those data URIs are unusable as CSS `url()`
		// values when the SVG contains raw parentheses or spaces (as the brand
		// icons do), because the declaration is then invalid and silently
		// dropped — the `mask-image` on the social icons collapsed to a solid
		// block. 0 forces real, cacheable file URLs instead.
		assetsInlineLimit: 0
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	]
});
