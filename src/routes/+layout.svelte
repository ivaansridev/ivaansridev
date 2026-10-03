<script lang="ts">
	import favicon from '$lib/assets/myface.jpg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="theme-color" content="#121212" />
</svelte:head>

{@render children()}
