import { writable } from "svelte/store";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "nova_theme";

const initial =
  typeof localStorage !== "undefined"
    ? ((localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? "light")
    : "light";

export const themeMode = writable<ThemeMode>(initial);

themeMode.subscribe((mode) => {
  document.body.classList.toggle("dark", mode === "dark");

  localStorage.setItem(STORAGE_KEY, mode);
});
