<script lang="ts">
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
    🗙
  {:else}
    ⤢
  {/if}
</UtilityButton>
