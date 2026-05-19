import html2canvas from "html2canvas";
import type { ScreenshotSettings } from "../stores/settings.store";
import { buildExportNode } from "./exportNode";
import { cropCanvas } from "./cropCanva";

export async function captureElement(
  _el: HTMLElement,
  settings: ScreenshotSettings,
  text: string,
) {
  const { node, nodeBg } = buildExportNode(text, settings);

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-99999px";
  wrapper.appendChild(node);

  document.body.appendChild(wrapper);

  const rawCanvas = await html2canvas(node, {
    backgroundColor: null,
    scale: settings.resolution,
  });

  wrapper.removeChild(node);
  if (nodeBg) wrapper.appendChild(nodeBg);

  // Created only if settings.transparent === false
  const rawCanvasBg = nodeBg
    ? await html2canvas(nodeBg, {
        backgroundColor: "#ffffff",
        scale: settings.resolution,
      })
    : null;

  wrapper.remove();

  return cropCanvas(rawCanvas, rawCanvasBg, 24);
}

export async function canvasToClipboard(canvas: HTMLCanvasElement) {
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res));
  if (!blob) return;

  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

export function canvasToDownload(
  canvas: HTMLCanvasElement,
  filename = "nova-export.png",
) {
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
