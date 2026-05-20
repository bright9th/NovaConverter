<script lang="ts">
  import { onMount } from "svelte";

  import { inputText } from "../../stores/app.store";

  import Panel from "./Panel.svelte";
  import ExpandButton from "./ExpandButton.svelte";
  import UtilityButton from "../shared/UtilityButton.svelte";
  import AutoResizeTextarea from "./AutoResizeTextarea.svelte";

  let expanded = $state(false);

  function clearInput() {
    inputText.set("");
  }

  function updateText(value: string) {
    inputText.set(value);
  }

  onMount(() => {
    inputText.set("The Sora is very Stellar");
  });

  const characterCount = $derived($inputText.length);

  const lineCount = $derived(
    $inputText.length === 0 ? 0 : $inputText.split(/\r?\n/).length,
  );
</script>

<Panel variant="input" {expanded}>
  <div
    class="
      flex
      items-center
      justify-between
      bg-[var(--panel-light)]
      border-b
      border-[var(--border)]/10
      px-4
      py-3
    "
  >
    <h2 class="font-c text-xs font-bold tracking-[0.2em]">SYSTEM UI</h2>

    <div class="ml-5 text-sm text-[var(--muted)]">
      {characterCount} chars · {lineCount} lines
    </div>

    <div class="flex items-center gap-2">
      <UtilityButton onClick={clearInput}>Clear</UtilityButton>

      <ExpandButton {expanded} onToggle={() => (expanded = !expanded)} />
    </div>
  </div>

  <AutoResizeTextarea value={$inputText} {expanded} onInput={updateText} />
</Panel>
