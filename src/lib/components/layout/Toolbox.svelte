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
  import { isBreakpoint, viewportWidth } from "../../utils/breakpoints";

  const BASE_URL = import.meta.env.BASE_URL;

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

  const alphabetTables = [
    {
      href: `${BASE_URL}study-novian.jpg`,
      src: `${BASE_URL}study-novian.jpg`,
      alt: "Study Novian",
    },
    {
      href: `${BASE_URL}nova-alphabet-table.jpg`,
      src: `${BASE_URL}nova-alphabet-table.jpg`,
      alt: "Nova Alphabet Table",
    },
    {
      href: `${BASE_URL}nova-alphabet-written-table.png`,
      src: `${BASE_URL}nova-alphabet-written-table.png`,
      alt: "Nova Alphabet Written Table",
    },
    {
      href: `${BASE_URL}monolith-alphabet-table.png`,
      src: `${BASE_URL}monolith-alphabet-table.png`,
      alt: "Monolith Alphabet Table",
    },
    {
      href: `${BASE_URL}monolith-runic-table.png`,
      src: `${BASE_URL}monolith-runic-table.png`,
      alt: "Monolith Runic Table",
    },
  ];

  const availableFonts = [
    {
      href: `${BASE_URL}fonts/NovaModern.woff2`,
      download: "NovaModern.woff2",
      label: "Nova Modern",
      type: "WOFF2",
    },
    {
      href: `${BASE_URL}fonts/CursiveNova-Regular.ttf`,
      download: "CursiveNova-Regular.ttf",
      label: "Cursive Nova Regular",
      type: "TTF",
    },
    {
      href: `${BASE_URL}fonts/MonolithRunes.ttf`,
      download: "MonolithRunes.ttf",
      label: "Monolith Runes",
      type: "TTF",
    },
  ];

  const incompleteFonts = [
    {
      href: `${BASE_URL}fonts/MonolithAlphabet.ttf`,
      download: "MonolithAlphabet.ttf",
      label: "Monolith Alphabet",
      type: "TTF",
    },
  ];

  onMount(async () => {
    const repo = await fetchRepoInfo();

    creator = `@${repo.owner}`;
    repoUrl = repo.url;
  });

  let isSm = $derived(isBreakpoint($viewportWidth, "sm"));
</script>

<div
  class="
    no-select fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[999]
    flex flex-col items-end gap-3
  "
>
  {#each TOOLBOX_ITEMS as item, index}
    <button
      class="
        group absolute
        flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center
        overflow-hidden
        rounded-full
        hover:inset-ring-4
        bg-[var(--panel)]
        shadow-xl

        transition-[transform,opacity,width]
        duration-300 ease-out

        hover:w-32 sm:hover:w-36
      "
      style={opened
        ? `
          opacity: 1;
          pointer-events: auto;
          transform:
            translateY(-${(index + 1) * (isSm ? 68 : 58)}px)
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
            flex min-w-4 sm:min-w-6 items-center justify-center
          "
        >
          <item.icon
            size={18}
            class="sm:w-[20px] sm:h-[20px]"
            strokeWidth={2.25}
          />
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
      flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center
      rounded-full
      hover:inset-ring-4
      bg-[var(--panel)]
      transition-transform duration-300
    "
    class:rotate-180={opened}
    onclick={() => (opened = !opened)}
  >
    <Settings size={24} class="sm:w-[28px] sm:h-[28px]" strokeWidth={2.25} />
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
        {#each alphabetTables as table}
          <a
            href={table.href}
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg overflow-hidden border border-[var(--border)] flex-shrink-0 w-48 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src={table.src} alt={table.alt} class="w-full h-auto" />
          </a>
        {/each}
      </div>
    </div>

    <!-- Available Fonts Section -->
    <div>
      <h3 class="font-semibold text-sm mb-3">Available Fonts</h3>
      <div class="space-y-2">
        {#each availableFonts as font}
          <a
            href={font.href}
            download={font.download}
            class="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--panel-hover)] transition-colors"
          >
            <span class="text-sm font-medium">{font.label}</span>
            <span class="text-xs opacity-60">{font.type}</span>
          </a>
        {/each}
      </div>
    </div>

    <!-- Incomplete Font Section -->
    <div>
      <h3 class="font-semibold text-sm mb-3">Incomplete Font</h3>
      <div class="space-y-2">
        {#each incompleteFonts as font}
          <a
            href={font.href}
            download={font.download}
            class="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--panel-hover)] transition-colors opacity-75"
          >
            <span class="text-sm font-medium">{font.label}</span>
            <span class="text-xs opacity-60">{font.type}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</Modal>
