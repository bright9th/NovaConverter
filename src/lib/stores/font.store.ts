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
    family: "NovaModern, system-ui",
  },

  {
    id: "cursivenova",
    label: "CursiveNova",
    family: "CursiveNova-Regular, system-ui",
  },

  {
    id: "monolithrunes",
    label: "MonolithRunes",
    family: "MonolithRunes, system-ui",
  },

  {
    id: "system",
    label: "System UI",
    family: "system-ui",
  },
];

export const selectedFont = writable<OutputFont>(AVAILABLE_FONTS[0]);
