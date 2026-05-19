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
      items-center
      justify-between
      border-b
      border-black/10
      px-4
      py-3
    "
  >
    <h2 class="font-c text-xs font-bold tracking-[0.2em]">NOVAMODERN</h2>

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
      font-a
      min-h-[300px]
      overflow-auto
      whitespace-pre-wrap
      break-words
      p-5
      text-left
      text-lg
      leading-relaxed
    "
  >
    {$inputText}
  </div>
</Panel>

<CustomizeModal bind:this={modalRef} />
