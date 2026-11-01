<!-- SimplyEngineered — Card.svelte -->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type CardVariant = 'simple' | 'accent' | 'no-border' | 'no-bg-tint' | 'dashed-border';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /** one variant, or several separated by spaces: variant="accent dashed-border" */
        variant?: CardVariant | (string & {});
        children?: Snippet;
    }

    let { variant = '', class: className = '', children, ...rest }: Props = $props();

    let classes = $derived(
        [
            'spe-card',
            ...variant
                .split(/\s+/)
                .filter(Boolean)
                .map((v) => `spe-card-${v}`),
            className
        ]
            .filter(Boolean)
            .join(' ')
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>

<style>
    /*
   * Static surface: no transform, no shadow, no transition, in any variant.
   * Elevation is opt-in via the caller's own class, so this pin is zero
   * specificity (:where) and always loses to consumer CSS. The :global() keeps
   * Svelte's scope class out of the selector, which would undo that.
   *
   * Opting in from your own <style> block needs :global() too, since Svelte
   * drops a scoped rule that only matches a class passed to a component.
   * Focus outlines are left alone on purpose.
   */
    :global(
        :where(
            .spe-card,
            .spe-card:hover,
            .spe-card:active,
            .spe-card:focus,
            .spe-card:focus-visible,
            .spe-card:focus-within,
            .spe-card:target
        )
    ) {
        transform: none;
        box-shadow: none;
    }

    .spe-card {
        display: block;
        padding: var(--spe-card-padding, 20px);
        color: var(--spe-font-color);
        background: var(--spe-bg-tint);
        border: 1px solid color-mix(in srgb, var(--spe-font-color) 10%, transparent);
        border-radius: var(--spe-radius-med);
    }

    /* borderless card — tinted on hover rather than at rest */
    .spe-card-simple {
        background: transparent;
        border: none;
    }

    .spe-card-simple:hover,
    .spe-card-simple:focus-within {
        background: var(--spe-bg-tint);
    }

    /* accent border only — no stripe, no fill change */
    .spe-card-accent {
        border-color: var(--spe-accent);
    }

    .spe-card-no-border {
        border: none;
    }

    .spe-card-no-bg-tint {
        background: transparent;
    }

    .spe-card-dashed-border {
        border-style: dashed;
    }
</style>
