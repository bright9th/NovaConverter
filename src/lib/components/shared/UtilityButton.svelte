<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    onClick?: () => void;
    success?: boolean;
    disabled?: boolean;
    iconOnly?: boolean;
    type?: "button" | "submit";
    children?: Snippet;
  }

  let {
    onClick,
    success = false,
    disabled = false,
    iconOnly = false,
    type = "button",
    children,
  }: Props = $props();
</script>

<button
  {type}
  onclick={onClick}
  {disabled}
  class="
    no-select
    font-b
    cursor-pointer
    rounded-[var(--radius-button)]
    border
    border-black/10
    bg-[var(--button)]
    px-3
    py-2
    text-sm
    font-semibold
    hover:bg-[var(--button-hover)]
    hover:text-[var(--text-hover)]
    disabled:cursor-not-allowed
    disabled:opacity-50
    {iconOnly ? 'aspect-square px-2' : ''}
    {success ? '!bg-green-500 !text-white' : ''}
  "
>
  {@render children?.()}
</button>
