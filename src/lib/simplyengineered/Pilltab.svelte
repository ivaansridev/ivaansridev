<!-- SimplyEngineered — Pilltab.svelte -->
<script lang="ts">
    import type { Snippet } from 'svelte';

    let { children }: { children?: Snippet } = $props();
</script>

<div class="spe-pilltab">
    {@render children?.()}
</div>

<style>
    .spe-pilltab {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 0px;
        background: color-mix(in srgb, var(--spe-mode) 85%, var(--spe-font-color) 15%);
        border-radius: var(--spe-radius-low);
    }
</style>
