<script lang="ts">
  import { inputText } from "../../stores/app.store";

  import Panel from "./Panel.svelte";
  import ExpandButton from "./ExpandButton.svelte";
  import UtilityButton from "../shared/UtilityButton.svelte";
  import CustomizeModal from "./CustomizeModal.svelte";
  import { screenshotSettings } from "../../stores/settings.store";
  import {
    captureElement,
    canvasToClipboard,
    canvasToDownload,
  } from "../../utils/screenshot";
  import { selectedFont, AVAILABLE_FONTS } from "../../stores/font.store";

  let expanded = false;

  let copied = false;
  let exported = false;

  let outputRef: HTMLDivElement | null = null;
  let modalRef: {
    openModal: () => void;
  };

  async function triggerCopy() {
    if (!outputRef) return;
    const canvas = await captureElement(
      outputRef,
      $screenshotSettings,
      $inputText,
    );
    await canvasToClipboard(canvas);

    copied = true;
    setTimeout(() => (copied = false), 1200);
  }

  async function triggerExport() {
    if (!outputRef) return;
    const canvas = await captureElement(
      outputRef,
      $screenshotSettings,
      $inputText,
    );
    canvasToDownload(canvas);

    exported = true;
    setTimeout(() => (exported = false), 1200);
  }
</script>

<Panel variant="output" {expanded}>
  <div
    class="
      flex
      flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-3
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
    <select
      class="
        rounded-xl
        border
        border-black/10
        bg-[var(--button)]
        px-3
        py-2
        text-xs
        font-bold
        tracking-[0.2em]
        w-full
        sm:w-auto
      "
      onchange={(e) => {
        const value = (e.target as HTMLSelectElement).value;

        const found = AVAILABLE_FONTS.find((font) => font.id === value);

        if (found) {
          selectedFont.set(found);
          $screenshotSettings.fontFamily = found.family;
        }
      }}
    >
      {#each AVAILABLE_FONTS as font}
        {#if !font.disabled}
          <option value={font.id} selected={$selectedFont.id === font.id}>
            {font.label.toUpperCase()}
          </option>
        {/if}
      {/each}
    </select>

    <div class="flex items-center gap-2">
      <UtilityButton onClick={() => modalRef.openModal()}>
        Customize ↗
      </UtilityButton>

      <UtilityButton success={copied} onClick={triggerCopy}>
        {copied ? "✓ Copied" : "Copy"}
      </UtilityButton>

      <UtilityButton success={exported} onClick={triggerExport}>
        {exported ? "✓ Exported" : "Export"}
      </UtilityButton>

      <ExpandButton {expanded} onToggle={() => (expanded = !expanded)} />
    </div>
  </div>

  <div
    bind:this={outputRef}
    class="
      no-select
      min-h-[300px]
      overflow-auto
      whitespace-pre-wrap
      break-words
      p-3
      sm:p-5
      text-left
      text-base
      sm:text-lg
      leading-relaxed
    "
    style:font-family={$selectedFont.family}
  >
    {$inputText}
  </div>
</Panel>

<CustomizeModal bind:this={modalRef} />
