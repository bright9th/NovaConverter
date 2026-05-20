<script lang="ts">
  import { themeMode } from "../../stores/theme.store";
  import Modal from "../shared/Modal.svelte";

  import { Settings, MoonStar, Info, Package } from "@lucide/svelte/icons";

  let opened = $state(false);

  let aboutOpen = $state(false);
  let resourceOpen = $state(false);

  const TOOLBOX_ITEMS = [
    {
      id: "theme",
      icon: MoonStar,
      label: "Theme",
    },

    {
      id: "about",
      icon: Info,
      label: "About",
    },

    {
      id: "resource",
      icon: Package,
      label: "Resources",
    },
  ];
</script>

<div
  class="
    fixed bottom-6 right-6 z-[999]
    flex flex-col items-end gap-3
  "
>
  {#each TOOLBOX_ITEMS as item, index}
    <button
      class="
        group absolute
        flex h-14 w-14 items-center justify-center
        overflow-hidden
        rounded-full
        hover:inset-ring-4
        bg-[var(--panel)]
        shadow-xl

        transition-[transform,opacity,width]
        duration-300 ease-out

        hover:w-36
      "
      style={opened
        ? `
          opacity: 1;
          pointer-events: auto;
          transform:
            translateY(-${(index + 1) * 68}px)
            scale(1);
        `
        : `
          opacity: 0;
          pointer-events: none;
          transform:
            translateY(0)
            scale(0.85);
        `}
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
        <!-- perfectly centered icon -->
        <div
          class="
            flex min-w-6 items-center justify-center
          "
        >
          <item.icon size={20} strokeWidth={2.25} />
        </div>

        <span
          class="
            whitespace-nowrap
            opacity-0
            transition-opacity duration-200
            group-hover:opacity-100
            font-semibold
          "
        >
          {item.label}
        </span>
      </div>
    </button>
  {/each}

  <!-- Main button -->
  <button
    class="
      relative z-10
      flex h-16 w-16 items-center justify-center
      rounded-full
      hover:inset-ring-4
      bg-[var(--panel)]
      transition-transform duration-300
    "
    class:rotate-180={opened}
    onclick={() => (opened = !opened)}
  >
    <Settings size={28} strokeWidth={2.25} />
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
