<script lang="ts">
	import favicon from '$lib/assets/myface.jpg';

	// Theme variables (--spe-*) and base element rules. These are aliased to the
	// package's real files in vite.config.ts; see the comment there for why a
	// bare `simplyengineered/main.css` cannot resolve.
	import 'simplyengineered/colors.css';
	import 'simplyengineered/main.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="theme-color" content="#121212" />
</svelte:head>

{@render children()}
