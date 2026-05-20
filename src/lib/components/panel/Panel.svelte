<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    variant: "input" | "output";
    expanded?: boolean;
    children?: Snippet;
  }

  let { variant, expanded = false, children }: Props = $props();
</script>

<section
  class="
    flex
    h-full
    min-h-[320px]
    flex-col
    overflow-x-hidden
    rounded-[var(--radius-panel)]
    border-[3px]
    shadow-[var(--shadow-panel)]
    {variant === 'input'
    ? 'border-[var(--accent-yellow)]'
    : 'border-[var(--accent-aqua)]'}
    {expanded ? 'panel-expanded bg-[var(--panel)]' : 'bg-[var(--panel)]/70'}
  "
>
  {@render children?.()}
</section>
