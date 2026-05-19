<script lang="ts">
  import { screenshotSettings } from "../../stores/settings.store";

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

  function set<
    K extends keyof import("../../stores/settings.store").ScreenshotSettings,
  >(
    key: K,
    value: import("../../stores/settings.store").ScreenshotSettings[K],
  ) {
    screenshotSettings.update((s) => ({ ...s, [key]: value }));
  }

  const settings = $derived($screenshotSettings);
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-6"
    onclick={close}
  >
    <div
      class="modal-fade relative w-full max-w-lg rounded-3xl bg-[var(--panel)] p-6"
      onclick={stop}
    >
      <!-- Close button -->
      <button
        class="absolute right-4 top-4 rounded-md px-2 py-1 text-sm font-bold no-select hover:bg-black/10"
        onclick={close}
      >
        ✕
      </button>

      <h3 class="font-c mb-5 text-xl font-bold">Customize Export</h3>

      <!-- Transparent -->
      <div class="mb-4 flex items-center justify-between">
        <span>Transparent BG</span>

        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.transparent}
            onchange={(e) =>
              set("transparent", (e.target as HTMLInputElement).checked)}
          />
          <span class="text-xs">{String(settings.transparent)}</span>
        </div>
      </div>

      <!-- Resolution -->
      <div class="mb-4 flex items-center justify-between">
        <span>Resolution</span>

        <div class="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="5"
            value={settings.resolution}
            onchange={(e) =>
              set("resolution", Number((e.target as HTMLInputElement).value))}
          />
          <span class="text-xs">{settings.resolution}x</span>
        </div>
      </div>

      <!-- Max Char -->
      <div class="flex items-center justify-between">
        <span>Max Char</span>

        <div class="flex items-center gap-2">
          <input
            type="range"
            min="10"
            max="120"
            value={settings.maxChar}
            onchange={(e) =>
              set("maxChar", Number((e.target as HTMLInputElement).value))}
          />
          <span class="text-xs">{settings.maxChar}</span>
        </div>
      </div>
    </div>
  </div>
{/if}
