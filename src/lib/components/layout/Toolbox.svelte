<script lang="ts">
  import { themeMode } from "../../stores/theme.store";
  import Modal from "../shared/Modal.svelte";
  import { PACKAGE_VERSION } from "../../utils/packageVersion";
  import GitHubLogo from "/github.svg";

  import {
    Settings,
    MoonStar,
    Info,
    Package,
    ExternalLink,
  } from "@lucide/svelte/icons";
  import { onMount } from "svelte";
  import { fetchRepoInfo } from "../../utils/github";

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

  let creator = $state("The [ MAOU ]");
  let repoUrl = $state("#");

  onMount(async () => {
    const repo = await fetchRepoInfo();

    creator = `@${repo.owner}`;
    repoUrl = repo.url;
  });
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
  <div class="space-y-6 px-2">
    <div class="space-y-2">
      <h3 class="font-semibold text-sm">Nova Converter</h3>
      <p class="text-sm">
        A lightweight utility for transforming text into stylized Nova and
        Monolith alphabets from hit game
        <a
          href="https://stellasora.global/"
          target="_blank"
          rel="noopener noreferrer"
          class="no-select inline-flex items-center gap-1
          underline transition-opacity hover:opacity-70"
          >Stella Sora <ExternalLink size={16} /></a
        >
      </p>
      <p class="text-sm text-[var(--muted)] inline-flex gap-2">
        Made by
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="
            no-select flex items-center gap-1
            transition-opacity hover:opacity-70
          "
        >
          <img src={GitHubLogo} alt="GitHub" class="h-4 [.dark_&]:invert" />

          <span class="underline">
            {creator}
          </span>

          <ExternalLink size={16} /></a
        >
      </p>
    </div>

    <div class="grid gap-4 text-sm">
      <div class="space-y-2">
        <p class="font-semibold">Features</p>
        <ul class="ml-4 list-disc space-y-1">
          <li>Convert English into Nova / Monolith glyphs</li>
          <li>Export converted glyphs into sharable images</li>
          <li>Browse alphabet tables and fonts</li>
        </ul>
      </div>

      <div class="space-y-2">
        <p class="font-semibold">Resources</p>
        <p>
          Yostar Games owns the original assets to the game, and all credits go
          to its rightful owner.
        </p>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
      <span>Built with Svelte + Tailwind CSS + Vite</span>
      <span>•</span>
      <span>Version {PACKAGE_VERSION}</span>
    </div>
  </div>
</Modal>

<Modal
  open={resourceOpen}
  title="Resources"
  onClose={() => (resourceOpen = false)}
>
  <div class="space-y-6 px-2 max-h-96 overflow-y-auto modal-scrollbar">
    <!-- Alphabet Tables Section -->
    <div>
      <h3 class="font-semibold text-sm mb-3">Alphabet Tables</h3>
      <div class="flex gap-3 overflow-x-auto pb-2 modal-scrollbar">
        <a
          href="/nova-alphabet-table.jpg"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg overflow-hidden border border-[var(--border)] flex-shrink-0 w-48 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src="/nova-alphabet-table.jpg"
            alt="Nova Alphabet Table"
            class="w-full h-auto"
          />
        </a>
        <a
          href="/nova-alphabet-written-table.png"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg overflow-hidden border border-[var(--border)] flex-shrink-0 w-48 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src="/nova-alphabet-written-table.png"
            alt="Nova Alphabet Written Table"
            class="w-full h-auto"
          />
        </a>
        <a
          href="/monolith-alphabet-table.png"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg overflow-hidden border border-[var(--border)] flex-shrink-0 w-48 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src="/monolith-alphabet-table.png"
            alt="Monolith Alphabet Table"
            class="w-full h-auto"
          />
        </a>
        <a
          href="/monolith-runic-table.png"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg overflow-hidden border border-[var(--border)] flex-shrink-0 w-48 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src="/monolith-runic-table.png"
            alt="Monolith Runic Table"
            class="w-full h-auto"
          />
        </a>
      </div>
    </div>

    <!-- Available Fonts Section -->
    <div>
      <h3 class="font-semibold text-sm mb-3">Available Fonts</h3>
      <div class="space-y-2">
        <a
          href="/fonts/NovaModern.woff2"
          download="NovaModern.woff2"
          class="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--panel-hover)] transition-colors"
        >
          <span class="text-sm font-medium">Nova Modern</span>
          <span class="text-xs opacity-60">WOFF2</span>
        </a>
        <a
          href="/fonts/CursiveNova-Regular.ttf"
          download="CursiveNova-Regular.ttf"
          class="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--panel-hover)] transition-colors"
        >
          <span class="text-sm font-medium">Cursive Nova Regular</span>
          <span class="text-xs opacity-60">TTF</span>
        </a>
        <a
          href="/fonts/MonolithRunes.ttf"
          download="MonolithRunes.ttf"
          class="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--panel-hover)] transition-colors"
        >
          <span class="text-sm font-medium">Monolith Runes</span>
          <span class="text-xs opacity-60">TTF</span>
        </a>
      </div>
    </div>

    <!-- Incomplete Font Section -->
    <div>
      <h3 class="font-semibold text-sm mb-3">Incomplete Font</h3>
      <div class="space-y-2">
        <a
          href="/fonts/MonolithAlphabet.ttf"
          download="MonolithAlphabet.ttf"
          class="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--panel-hover)] transition-colors opacity-75"
        >
          <span class="text-sm font-medium">Monolith Alphabet</span>
          <span class="text-xs opacity-60">TTF</span>
        </a>
      </div>
    </div>
  </div>
</Modal>
