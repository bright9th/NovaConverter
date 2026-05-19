import type { ScreenshotSettings } from "../stores/settings.store";

export function buildExportNode(text: string, settings: ScreenshotSettings) {
  function buildNode(background: string) {
    const el = document.createElement("div");

    el.style.display = "inline-block";
    el.style.padding = "24px";
    el.style.background = background;
    el.style.color = "#000";
    el.style.fontFamily = "NovaModern, system-ui, sans-serif";
    el.style.fontSize = "18px";
    // el.style.paddingTop = "8px";
    // el.style.paddingBottom = "24px";
    el.style.lineHeight = "1.6";
    el.style.whiteSpace = "pre-wrap";
    el.style.wordBreak = "break-word";

    // width control
    el.style.maxWidth = `${settings.maxChar}ch`;

    // inner text node
    const content = document.createElement("div");
    content.textContent = text;

    el.appendChild(content);

    return el;
  }

  return {
    node: buildNode("transparent"),
    nodeBg: !settings.transparent ? buildNode("#ffffff") : null,
  };
}
