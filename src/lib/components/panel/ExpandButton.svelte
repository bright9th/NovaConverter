<script lang="ts">
  import { Maximize2, X } from "@lucide/svelte";
  import UtilityButton from "../shared/UtilityButton.svelte";

  interface Props {
    expanded: boolean;
    onToggle: () => void;
  }

  let { expanded, onToggle }: Props = $props();

  $effect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
  });
</script>

<UtilityButton iconOnly onClick={onToggle}>
  {#if expanded}
    <X size={14} />
  {:else}
    <Maximize2 size={14} />
  {/if}
</UtilityButton>
