<script lang="ts">
  import { screenshotSettings } from "../../stores/settings.store";
  import { inputText } from "../../stores/app.store";

  let previewRef: HTMLDivElement;

  const settings = $derived($screenshotSettings);

  let expanded = $state(false);

  /*
    Preview-only zoom.
    1 = 100%
  */
  const maxZoom = 1;
  let zoom = $state(maxZoom);
</script>

<div
  class:list={[
    "mt-8",
    expanded ? "fixed inset-0 z-[10001] bg-[var(--bg)] p-6 overflow-auto" : "",
  ]}
>
  <div class="mb-2 flex items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold">Preview</span>

      <span class="text-xs italic opacity-80">
        * Not 100% accurate to final export
      </span>
    </div>

    <div class="flex items-center gap-2">
      <!-- Zoom out -->
      <button
        class="
          no-select
          rounded-lg
          border
          border-black/10
          px-3
          py-1
          text-sm
          font-semibold
        "
        onclick={() => {
          zoom = Math.max(0.25, zoom - 0.25);
        }}
      >
        −
      </button>

      <!-- Zoom value -->
      <div class="min-w-[60px] text-center text-sm font-semibold">
        {Math.round(zoom * 100)}%
      </div>

      <!-- Zoom in -->
      <button
        class="
          no-select
          rounded-lg
          border
          border-black/10
          px-3
          py-1
          text-sm
          font-semibold
        "
        onclick={() => {
          zoom = Math.min(maxZoom, zoom + 0.25);
        }}
      >
        +
      </button>
    </div>
  </div>

  <div
    class="
      flex
      min-h-[240px]
      max-h-[40vh]
      overflow-auto
      rounded-2xl
      border
      border-black/20
      bg-black/5
      p-6
      items-start
    "
  >
    <div
      bind:this={previewRef}
      class="inline-block border border-black/70 border-dashed"
      style:background={settings.transparent
        ? "transparent"
        : settings.backgroundColor}
      style:padding={`${settings.padding}px`}
      style:transform={`scale(${zoom})`}
    >
      <div
        class="no-select whitespace-pre-wrap break-words text-[18px] leading-[1.4]"
        style:color={settings.textColor}
        style:max-width={`${settings.maxChar}ch`}
        style:font-family={settings.fontFamily}
      >
        {$inputText}
      </div>
    </div>
  </div>
</div>
