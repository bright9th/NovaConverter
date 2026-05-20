import { writable } from "svelte/store";
import { selectedFont } from "./font.store";

export type ScreenshotSettings = {
  transparent: boolean;
  resolution: number;
  maxChar: number;

  backgroundColor: string;
  textColor: string;

  padding: number;

  fontFamily: string;
};

export const DEFAULT_SETTINGS: ScreenshotSettings = {
  transparent: false,
  resolution: 1,
  maxChar: 40,

  backgroundColor: "#ffffff",
  textColor: "#000000",

  padding: 24,

  fontFamily: "", // don't reset
};

function createPersistentStore() {
  const STORAGE_KEY = "nova_converter_settings";

  const initial =
    typeof localStorage !== "undefined"
      ? (() => {
          const saved = localStorage.getItem(STORAGE_KEY);

          if (!saved) {
            return { ...DEFAULT_SETTINGS, fontFamily: "NovaModern, system-ui" };
          }

          try {
            return {
              ...DEFAULT_SETTINGS,
              ...JSON.parse(saved),
            };
          } catch {
            return DEFAULT_SETTINGS;
          }
        })()
      : DEFAULT_SETTINGS;

  const store = writable<ScreenshotSettings>(initial);

  store.subscribe((value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  });

  return store;
}

export const screenshotSettings = createPersistentStore();
