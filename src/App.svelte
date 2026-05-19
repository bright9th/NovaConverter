<script lang="ts">
  import AppHeader from "./lib/components/layout/AppHeader.svelte";
  import AppFooter from "./lib/components/layout/AppFooter.svelte";
  import Toolbox from "./lib/components/layout/Toolbox.svelte";

  import InputPanel from "./lib/components/panel/InputPanel.svelte";
  import OutputPanel from "./lib/components/panel/OutputPanel.svelte";
</script>

<main class="min-h-screen">
  <AppHeader />

  <section class="px-4 py-6 xl:px-12">
    <div
      class="
        flex
        max-[900px]:flex-col
        gap-4
        min-[900px]:grid-cols-2
      "
    >
      <div class="min-w-0 h-full min-h-0 flex-1">
        <InputPanel />
      </div>

      <div class="min-w-0 h-full min-h-0 flex-1">
        <OutputPanel />
      </div>
    </div>
  </section>

  <AppFooter />

  <Toolbox />
</main>
