import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	resolve: {
		alias: {
			// simplyengineered declares only `"."` in its exports map (with just
			// `types` + `svelte` conditions), so `simplyengineered/main.css` fails
			// to resolve with ERR_PACKAGE_PATH_NOT_EXPORTED — and `require.resolve`
			// can't recover the dist path either, for the same reason.
			//
			// Its CSS is also not self-delivering in a production build: `dist/index.js`
			// does `import './main.css'`, which dev serves happily but which the
			// production bundle tree-shakes away, leaving the app with component
			// styles but no theme variables or base element rules. Aliasing the two
			// files lets the app import them explicitly and reliably.
			'simplyengineered/colors.css': fileURLToPath(
				new URL('./node_modules/simplyengineered/dist/colors.css', import.meta.url)
			),
			'simplyengineered/main.css': fileURLToPath(
				new URL('./node_modules/simplyengineered/dist/main.css', import.meta.url)
			)
		}
	},
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
