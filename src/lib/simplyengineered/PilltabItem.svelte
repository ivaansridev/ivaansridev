<!-- SimplyEngineered — PilltabItem.svelte -->
<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';

    type Props = {
        variant?: 'active' | undefined;
        href?: string;
        children?: Snippet;
    } & Omit<HTMLButtonAttributes, 'href'> &
        Omit<HTMLAnchorAttributes, 'href'>;

    let { variant, href, class: className = '', children, ...rest }: Props = $props();

    let classes = $derived(
        `spe-pilltab-item${variant === 'active' ? ' active' : ''}${className ? ` ${className}` : ''}`
    );
</script>

{#if href}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a {href} class={classes} {...rest as HTMLAnchorAttributes}>
        {@render children?.()}
    </a>
{:else}
    <button class={classes} {...rest}>
        {@render children?.()}
    </button>
{/if}

<style>
    .spe-pilltab-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 20px;
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        color: color-mix(in srgb, var(--spe-font-color) 55%, var(--spe-mode) 45%);
        background: transparent;
        border: none;
        border-radius: var(--spe-radius-med);
        cursor: pointer;
        text-decoration: none;
        transition:
            background-color 150ms ease,
            color 150ms ease;
    }

    .spe-pilltab-item:hover {
        color: var(--spe-font-color);
    }

    .spe-pilltab-item.active {
        background: var(--spe-accent);
        color: var(--spe-accent-font-color);
    }

    .spe-pilltab-item.active:hover {
        filter: brightness(1.1);
    }

    .spe-pilltab-item:focus-visible {
        outline: 2px solid var(--spe-accent);
        outline-offset: 2px;
    }
</style>
