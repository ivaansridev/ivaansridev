<script lang="ts">
    // Rounded tab icon, derived from myface.jpg.
    import favicon from '$lib/assets/favicon.png';

    // Theme variables (--spe-*) and base element rules, vendored from the
    // simplyengineered package (now inlined under $lib/simplyengineered).
    import '$lib/simplyengineered/colors.css';
    import '$lib/simplyengineered/main.css';

    import 'velne-lib/tokens.css';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" type="image/png" sizes="256x256" href={favicon} />
    <meta name="theme-color" content="#121212" />
</svelte:head>

{@render children()}
