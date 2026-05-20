<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import AppHeader from "./lib/components/layout/AppHeader.svelte";
  import AppFooter from "./lib/components/layout/AppFooter.svelte";
  import Toolbox from "./lib/components/layout/Toolbox.svelte";

  import InputPanel from "./lib/components/panel/InputPanel.svelte";
  import OutputPanel from "./lib/components/panel/OutputPanel.svelte";

  let bgMask = "";
  const imageUrl = "/study-novian.jpg";
  let imageRatio = 16 / 9;

  function updateMask() {
    const viewportRatio = window.innerWidth / window.innerHeight;
    const isHorizontalFade = viewportRatio > imageRatio;

    bgMask = isHorizontalFade
      ? "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0))"
      : "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0))";
  }

  onMount(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRatio = image.naturalWidth / image.naturalHeight;
      updateMask();
    };
    updateMask();
    window.addEventListener("resize", updateMask);
  });

  onDestroy(() => {
    window.removeEventListener("resize", updateMask);
  });
</script>

<div class="page-background">
  <img
    class="page-background__image"
    src={imageUrl}
    alt=""
    style="--bg-mask: {bgMask}"
  />
</div>

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
