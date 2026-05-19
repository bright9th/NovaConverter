import { writable } from "svelte/store";

export type ScreenshotSettings = {
  transparent: boolean;
  resolution: number;
  maxChar: number;
};

const defaultSettings: ScreenshotSettings = {
  transparent: false,
  resolution: 1,
  maxChar: 40,
};

export const screenshotSettings = writable<ScreenshotSettings>(defaultSettings);
