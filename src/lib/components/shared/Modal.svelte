<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    open: boolean;
    title?: string;
    onClose: () => void;
    children: Snippet;
  }

  let { open, title = "", onClose, children }: Props = $props();
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="
      fixed inset-0 z-[9999]
      flex items-center justify-center
      bg-black/50 p-4
      backdrop-blur-sm
    "
    onclick={onClose}
  >
    <div
      class="
        w-full max-w-3xl
        rounded-3xl
        border border-black/10
        bg-[var(--panel)]
        p-6
        shadow-2xl
      "
      onclick={(e) => e.stopPropagation()}
    >
      <div class="mb-6 flex items-center justify-between">
        <h2 class="font-c text-xl font-bold">
          {title}
        </h2>

        <button
          class="
            rounded-full
            hover:bg-black/10
            border border-black/10
            px-3 py-2
            text-sm font-bold
          "
          onclick={onClose}
        >
          ✕
        </button>
      </div>

      {@render children?.()}
    </div>
  </div>
{/if}
