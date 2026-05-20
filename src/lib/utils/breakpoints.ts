import { readable } from "svelte/store";

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

function getWidth() {
  return typeof window === "undefined" ? 0 : window.innerWidth;
}

export const viewportWidth = readable(getWidth(), (set) => {
  if (typeof window === "undefined") return;

  const update = () => set(window.innerWidth);

  window.addEventListener("resize", update);

  return () => {
    window.removeEventListener("resize", update);
  };
});

export function isBreakpoint(width: number, bp: Breakpoint): boolean {
  return width >= BREAKPOINTS[bp];
}
