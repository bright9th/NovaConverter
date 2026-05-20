<script lang="ts">
  import { onMount } from "svelte";

  import { inputText } from "../../stores/app.store";

  import Panel from "./Panel.svelte";
  import ExpandButton from "./ExpandButton.svelte";
  import UtilityButton from "../shared/UtilityButton.svelte";
  import AutoResizeTextarea from "./AutoResizeTextarea.svelte";
  // import { generateStressTest } from "../../utils/stressTest";

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
      flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-2
      sm:gap-2
      bg-[var(--panel-light)]
      border-b
      border-[var(--border)]/10
      px-3
      sm:px-4
      py-2
      sm:py-3
    "
  >
    <div
      class="flex items-center justify-between sm:justify-start gap-2 sm:gap-4"
    >
      <h2 class="font-c text-xs font-bold tracking-[0.2em] py-2">SYSTEM UI</h2>

      <div class="text-xs sm:text-sm text-[var(--muted)]">
        {characterCount} chars · {lineCount} lines
      </div>
    </div>

    <div class="flex items-center gap-2">
      <UtilityButton onClick={clearInput}>Clear</UtilityButton>

      <UtilityButton
        onClick={() => {
          inputText.set(
            "abcdefghijklmnopqrstuvwxyz\n" +
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n" +
              "0123456789\n" +
              `.:,;'"(!?)+-*/=`,
          );
        }}>Sample</UtilityButton
      >

      <ExpandButton {expanded} onToggle={() => (expanded = !expanded)} />
    </div>
  </div>

  <AutoResizeTextarea value={$inputText} {expanded} onInput={updateText} />
</Panel>
