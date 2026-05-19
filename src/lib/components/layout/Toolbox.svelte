<script lang="ts">
  let opened = false;
</script>

<div class="fixed right-6 bottom-6 z-[9998] flex flex-col items-end gap-3">
  {#if opened}
    <div class="toolbox-option flex flex-col gap-2">
      <button
        class="
          no-select
          rounded-xl
          bg-[var(--panel)]
          px-4
          py-3
          shadow-lg
        "
      >
        Option A
      </button>

      <button
        class="
          no-select
          rounded-xl
          bg-[var(--panel)]
          px-4
          py-3
          shadow-lg
        "
      >
        Option B
      </button>
    </div>
  {/if}

  <button
    onclick={() => (opened = !opened)}
    class="
      toolbox-spin
      no-select
      rounded-2xl
      bg-[var(--panel)]
      p-4
      text-xl
      shadow-lg
      {opened ? 'active' : ''}
    "
  >
    ⚙
  </button>
</div>
