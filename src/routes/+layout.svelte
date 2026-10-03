<script lang="ts">
	// Rounded tab icon, derived from myface.jpg.
	import favicon from '$lib/assets/favicon.png';

	// Theme variables (--spe-*) and base element rules. These are aliased to the
	// package's real files in vite.config.ts; see the comment there for why a
	// bare `simplyengineered/main.css` cannot resolve.
	import 'simplyengineered/colors.css';
	import 'simplyengineered/main.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="256x256" href={favicon} />
	<meta name="theme-color" content="#121212" />
</svelte:head>

{@render children()}