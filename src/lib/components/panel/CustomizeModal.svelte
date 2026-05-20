<script lang="ts">
  import {
    DEFAULT_SETTINGS,
    screenshotSettings,
  } from "../../stores/settings.store";
  import Modal from "../shared/Modal.svelte";
  import ExportPreview from "./ExportPreview.svelte";

  let open = $state(false);

  export function openModal() {
    open = true;
  }

  function close() {
    open = false;
  }

  function stop(e: MouseEvent) {
    e.stopPropagation();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <Modal {open} title="Customize Export" onClose={() => (open = false)}>
    <div
      class="
        grid
        px-2
        gap-4
        min-[700px]:grid-cols-2
        max-h-[150px]
        overflow-y-auto
      "
    >
      <!-- Transparent -->
      <div class="flex items-center justify-between gap-4">
        <span>Transparent BG</span>

        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={$screenshotSettings.transparent}
            onchange={(e) =>
              screenshotSettings.update((s) => ({
                ...s,
                transparent: (e.target as HTMLInputElement).checked,
              }))}
          />

          <span class="text-xs">
            {String($screenshotSettings.transparent)}
          </span>
        </div>
      </div>

      <!-- Resolution -->
      <div class="flex items-center justify-between gap-4">
        <span>Resolution</span>

        <div class="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="5"
            value={$screenshotSettings.resolution}
            oninput={(e) =>
              screenshotSettings.update((s) => ({
                ...s,
                resolution: Number((e.target as HTMLInputElement).value),
              }))}
          />

          <span class="text-xs">
            {$screenshotSettings.resolution}x
          </span>
        </div>
      </div>

      <!-- Max Char -->
      <div class="flex items-center justify-between gap-4">
        <span>Max Character</span>

        <div class="flex items-center gap-2">
          <input
            type="range"
            min="10"
            max="120"
            value={$screenshotSettings.maxChar}
            oninput={(e) =>
              screenshotSettings.update((s) => ({
                ...s,
                maxChar: Number((e.target as HTMLInputElement).value),
              }))}
          />

          <span class="text-xs">
            {$screenshotSettings.maxChar}
          </span>
        </div>
      </div>

      <!-- BG -->
      <div class="flex items-center justify-between gap-4">
        <span>BG Color</span>

        <div class="flex items-center gap-2">
          <input
            type="color"
            value={$screenshotSettings.backgroundColor}
            oninput={(e) =>
              screenshotSettings.update((s) => ({
                ...s,
                backgroundColor: (e.target as HTMLInputElement).value,
              }))}
          />

          <span class="text-xs">
            {$screenshotSettings.backgroundColor}
          </span>
        </div>
      </div>

      <!-- Text -->
      <div class="flex items-center justify-between gap-4">
        <span>Text Color</span>

        <div class="flex items-center gap-2">
          <input
            type="color"
            value={$screenshotSettings.textColor}
            oninput={(e) =>
              screenshotSettings.update((s) => ({
                ...s,
                textColor: (e.target as HTMLInputElement).value,
              }))}
          />

          <span class="text-xs">
            {$screenshotSettings.textColor}
          </span>
        </div>
      </div>

      <!-- Padding -->
      <div class="flex items-center justify-between gap-4">
        <span>Padding</span>

        <div class="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={$screenshotSettings.padding}
            oninput={(e) =>
              screenshotSettings.update((s) => ({
                ...s,
                padding: Number((e.target as HTMLInputElement).value),
              }))}
          />

          <span class="text-xs">
            {$screenshotSettings.padding}px
          </span>
        </div>
      </div>
    </div>

    <div class="my-4"></div>

    <ExportPreview />

    <div class="mt-6 flex justify-end">
      <button
        class="
          no-select
          rounded-xl
          border
          border-black/10
          px-4
          py-2
          text-sm
          font-semibold
          hover:bg-black/10
        "
        onclick={() => screenshotSettings.set(DEFAULT_SETTINGS)}
      >
        Reset Settings
      </button>
    </div>
  </Modal>
{/if}
