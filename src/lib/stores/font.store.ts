import { writable } from "svelte/store";

export type OutputFont = {
  id: string;
  label: string;
  family: string;
};

export const AVAILABLE_FONTS: OutputFont[] = [
  {
    id: "novamodern",
    label: "NovaModern",
    family: "NovaModern",
  },

  {
    id: "system",
    label: "System UI",
    family: "system-ui",
  },
];

export const selectedFont = writable<OutputFont>(AVAILABLE_FONTS[0]);
