export function cropCanvas(
  canvas: HTMLCanvasElement, // Primarily used for pixel scanning, can also be output
  canvasBg: HTMLCanvasElement | null, // Output will be with bg instead if settings says so
  padding = 24,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height).data;

  let top = null;
  let left = null;
  let right = null;
  let bottom = null;

  // scan pixels, alpha-based
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = imageData[i + 3];

      if (alpha > 0) {
        if (top === null) top = y;
        if (left === null || x < left) left = x;
        if (right === null || x > right) right = x;
        bottom = y;
      }
    }
  }

  // fallback (fully empty)
  if (top === null) return canvas;

  const croppedWidth = right! - left! + 1 + padding * 2;
  const croppedHeight = bottom! - top + 1 + padding * 2;

  const newCanvas = document.createElement("canvas");
  newCanvas.width = croppedWidth;
  newCanvas.height = croppedHeight;

  const newCtx = newCanvas.getContext("2d");
  if (!newCtx) return canvas;

  newCtx.drawImage(
    canvasBg ?? canvas,
    left! - padding,
    top - padding,
    croppedWidth,
    croppedHeight,
    0,
    0,
    croppedWidth,
    croppedHeight,
  );

  return newCanvas;
}
