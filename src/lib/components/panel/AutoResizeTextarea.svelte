<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    value: string;
    expanded?: boolean;
    onInput: (value: string) => void;
  }

  let { value, expanded = false, onInput }: Props = $props();

  let textarea: HTMLTextAreaElement;

  function resize() {
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleInput(event: Event) {
    const target = event.currentTarget as HTMLTextAreaElement;

    onInput(target.value);

    resize();
  }

  onMount(() => {
    resize();
  });

  $effect(() => {
    if (textarea && value !== undefined) {
      resize();
    }
  });
</script>

<textarea
  bind:this={textarea}
  {value}
  oninput={handleInput}
  placeholder="Type here..."
  class="
    min-h-[300px]
    w-full
    bg-transparent
    p-5
    text-lg
    leading-relaxed
    outline-none
    {expanded ? 'overflow-y-auto h-full' : 'overflow-hidden'}
  "
></textarea>
