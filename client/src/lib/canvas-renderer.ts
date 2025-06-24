import { IconMakerSettings } from "@/types/icon-maker";

export function getShortText(text: string): string {
  if (!text) return "IM";
  const words = text.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words.map(word => word[0]).join("").substring(0, 2).toUpperCase();
}

export function renderIconToCanvas(
  canvas: HTMLCanvasElement,
  settings: IconMakerSettings,
  dimensions: { width: number; height: number }
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = dimensions;
  const dpr = window.devicePixelRatio || 1;
  
  // Set canvas size for high DPI displays
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw background
  if (settings.backgroundType === "solid" && settings.backgroundColor) {
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  } else if (settings.backgroundType === "gradient") {
    // Simple gradient fallback
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, settings.backgroundColor);
    gradient.addColorStop(1, adjustBrightness(settings.backgroundColor, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  // Calculate font size based on canvas dimensions
  const baseFontSize = Math.min(width, height) * 0.4;
  const fontSize = Math.max(baseFontSize, 16);

  // Set font properties
  ctx.font = `${settings.fontWeight} ${fontSize}px '${settings.fontFamily}', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Get text to display
  const displayText = width > 300 ? settings.text : getShortText(settings.text);

  // Apply text stroke if enabled
  if (settings.textStroke.enabled) {
    ctx.strokeStyle = settings.textStroke.color;
    ctx.lineWidth = settings.textStroke.width;
    ctx.strokeText(displayText, width / 2, height / 2);
  }

  // Apply drop shadow if enabled
  if (settings.dropShadow.enabled) {
    ctx.shadowColor = `rgba(0, 0, 0, ${settings.dropShadow.opacity})`;
    ctx.shadowOffsetX = settings.dropShadow.offsetX;
    ctx.shadowOffsetY = settings.dropShadow.offsetY;
    ctx.shadowBlur = settings.dropShadow.blur;
  }

  // Draw text
  ctx.fillStyle = settings.textColor;
  ctx.fillText(displayText, width / 2, height / 2);

  // Reset shadow
  ctx.shadowColor = "transparent";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

function adjustBrightness(hexColor: string, percent: number): string {
  const num = parseInt(hexColor.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string = "image/png", quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to convert canvas to blob"));
      }
    }, type, quality);
  });
}
