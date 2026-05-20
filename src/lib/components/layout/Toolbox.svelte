<script lang="ts">
  import { themeMode } from "../../stores/theme.store";
  import Modal from "../shared/Modal.svelte";

  let opened = $state(false);

  const TOOLBOX_ITEMS = [
    {
      id: "theme",
      icon: "🌓",
      label: "Theme",
    },

    {
      id: "about",
      icon: "ℹ",
      label: "About",
    },

    {
      id: "resource",
      icon: "📦",
      label: "Resources",
    },
  ];

  let aboutOpen = $state(false);
  let resourceOpen = $state(false);
</script>

<div
  class="
    fixed bottom-6 right-6 z-[999]
    flex flex-col items-end gap-3
  "
>
  {#if opened}
    {#each TOOLBOX_ITEMS as item}
      <button
        class="
          group
          flex h-14 w-14 items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-[var(--panel)]
          shadow-xl
          transition-all duration-300
          hover:w-44
        "
        onclick={() => {
          switch (item.id) {
            case "theme":
              themeMode.update((v) => (v === "dark" ? "light" : "dark"));
              break;

            case "about":
              aboutOpen = true;
              break;

            case "resource":
              resourceOpen = true;
              break;
          }
        }}
      >
        <div
          class="
            flex w-full items-center gap-3 px-4
          "
        >
          <span
            class="
              flex h-6 w-6
              items-center justify-center
              text-lg
            "
          >
            {item.icon}
          </span>

          <span
            class="
              whitespace-nowrap
              opacity-0
              transition-opacity duration-200
              group-hover:opacity-100
            "
          >
            {item.label}
          </span>
        </div>
      </button>
    {/each}
  {/if}

  <!-- Main button -->
  <button
    class="
      flex h-16 w-16 items-center justify-center
      rounded-full
      bg-[var(--panel)]
      text-2xl
      shadow-2xl
      transition-transform duration-300
    "
    class:rotate-180={opened}
    onclick={() => (opened = !opened)}
  >
    ⚙
  </button>
</div>

<Modal open={aboutOpen} title="About" onClose={() => (aboutOpen = false)}>
  <div></div>
</Modal>

<Modal
  open={resourceOpen}
  title="Resources"
  onClose={() => (resourceOpen = false)}
>
  <div></div>
</Modal>
