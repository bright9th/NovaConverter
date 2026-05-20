<script lang="ts">
  import { PACKAGE_VERSION } from "../../utils/packageVersion";
  import { onMount } from "svelte";
  import { fetchRepoInfo } from "../../utils/github";
  import GitHubLogo from "/github.svg";
  import ExternalLink from "@lucide/svelte/icons/external-link";

  let creator = $state("The [ MAOU ]");
  let repoUrl = $state("#");

  onMount(async () => {
    const repo = await fetchRepoInfo();

    creator = `@${repo.owner}`;
    repoUrl = repo.url;
  });
</script>

<footer
  class="
    flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap
    py-6 sm:py-8 text-xs sm:text-sm text-[var(--muted)]
  "
>
  <span> Made by </span>

  <a
    href={repoUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="
      no-select flex items-center gap-2
      transition-opacity hover:opacity-70
    "
  >
    <img src={GitHubLogo} alt="GitHub" class="h-5 sm:h-6 [.dark_&]:invert" />

    <span class="underline">
      {creator}
    </span>

    <ExternalLink size={16} class="sm:w-[18px] sm:h-[18px]" />
  </a>

  <span class="flex flex-row gap-1 sm:gap-2">
    <span class="no-select scale-x-0 sm:scale-x-100">—</span>
    <span>v{PACKAGE_VERSION}</span><span class="no-select">—</span>
    <span>© 2024 Yostar. All rights reserved.</span>
  </span>
</footer>
