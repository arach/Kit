import JSZip from "jszip";
import { IconMakerSettings } from "@/types/icon-maker";
import { renderIconToCanvas, canvasToBlob } from "./canvas-renderer";

interface ExportSize {
  name: string;
  width: number;
  height: number;
}

const EXPORT_SIZES = {
  ios: [
    { name: "icon-1024.png", width: 1024, height: 1024 },
    { name: "icon-512.png", width: 512, height: 512 },
    { name: "icon-256.png", width: 256, height: 256 },
    { name: "icon-180.png", width: 180, height: 180 },
    { name: "icon-120.png", width: 120, height: 120 },
    { name: "icon-87.png", width: 87, height: 87 },
    { name: "icon-80.png", width: 80, height: 80 },
    { name: "icon-60.png", width: 60, height: 60 },
    { name: "icon-58.png", width: 58, height: 58 },
    { name: "icon-40.png", width: 40, height: 40 },
    { name: "icon-29.png", width: 29, height: 29 }
  ],
  android: [
    { name: "ic_launcher_512.png", width: 512, height: 512 },
    { name: "ic_launcher_192.png", width: 192, height: 192 },
    { name: "ic_launcher_144.png", width: 144, height: 144 },
    { name: "ic_launcher_96.png", width: 96, height: 96 },
    { name: "ic_launcher_72.png", width: 72, height: 72 },
    { name: "ic_launcher_48.png", width: 48, height: 48 },
    { name: "ic_launcher_36.png", width: 36, height: 36 }
  ],
  macos: [
    { name: "icon-1024.png", width: 1024, height: 1024 },
    { name: "icon-512.png", width: 512, height: 512 },
    { name: "icon-256.png", width: 256, height: 256 },
    { name: "icon-128.png", width: 128, height: 128 },
    { name: "icon-64.png", width: 64, height: 64 },
    { name: "icon-32.png", width: 32, height: 32 },
    { name: "icon-16.png", width: 16, height: 16 }
  ],
  web: [
    // Standard favicons
    { name: "favicon-16.png", width: 16, height: 16 },
    { name: "favicon-32.png", width: 32, height: 32 },
    { name: "favicon-48.png", width: 48, height: 48 },
    { name: "favicon-64.png", width: 64, height: 64 },
    { name: "favicon-96.png", width: 96, height: 96 },
    { name: "favicon-128.png", width: 128, height: 128 },
    { name: "favicon-192.png", width: 192, height: 192 },
    { name: "favicon-256.png", width: 256, height: 256 },
    { name: "favicon-512.png", width: 512, height: 512 },
    
    // Apple touch icons
    { name: "apple-touch-icon-57.png", width: 57, height: 57 },
    { name: "apple-touch-icon-60.png", width: 60, height: 60 },
    { name: "apple-touch-icon-72.png", width: 72, height: 72 },
    { name: "apple-touch-icon-76.png", width: 76, height: 76 },
    { name: "apple-touch-icon-114.png", width: 114, height: 114 },
    { name: "apple-touch-icon-120.png", width: 120, height: 120 },
    { name: "apple-touch-icon-144.png", width: 144, height: 144 },
    { name: "apple-touch-icon-152.png", width: 152, height: 152 },
    { name: "apple-touch-icon-180.png", width: 180, height: 180 },
    
    // Android chrome icons
    { name: "android-chrome-36.png", width: 36, height: 36 },
    { name: "android-chrome-48.png", width: 48, height: 48 },
    { name: "android-chrome-72.png", width: 72, height: 72 },
    { name: "android-chrome-96.png", width: 96, height: 96 },
    { name: "android-chrome-144.png", width: 144, height: 144 },
    { name: "android-chrome-192.png", width: 192, height: 192 },
    { name: "android-chrome-256.png", width: 256, height: 256 },
    { name: "android-chrome-384.png", width: 384, height: 384 },
    { name: "android-chrome-512.png", width: 512, height: 512 },
    
    // Navigation logos (square)
    { name: "logo-nav-24.png", width: 24, height: 24 },
    { name: "logo-nav-28.png", width: 28, height: 28 },
    { name: "logo-nav-32.png", width: 32, height: 32 },
    { name: "logo-nav-40.png", width: 40, height: 40 },
    { name: "logo-nav-48.png", width: 48, height: 48 },
    { name: "logo-nav-56.png", width: 56, height: 56 },
    { name: "logo-nav-64.png", width: 64, height: 64 },
    { name: "logo-nav-80.png", width: 80, height: 80 },
    { name: "logo-nav-96.png", width: 96, height: 96 },
    { name: "logo-nav-128.png", width: 128, height: 128 },
    
    // Header logos (rectangular - wider)
    { name: "logo-header-150x40.png", width: 150, height: 40 },
    { name: "logo-header-200x50.png", width: 200, height: 50 },
    { name: "logo-header-250x60.png", width: 250, height: 60 },
    { name: "logo-header-300x75.png", width: 300, height: 75 },
    { name: "logo-header-400x100.png", width: 400, height: 100 },
    { name: "logo-header-500x125.png", width: 500, height: 125 },
    { name: "logo-header-600x150.png", width: 600, height: 150 },
    
    // Hero/banner logos (large rectangular)
    { name: "logo-hero-800x200.png", width: 800, height: 200 },
    { name: "logo-hero-1000x250.png", width: 1000, height: 250 },
    { name: "logo-hero-1200x300.png", width: 1200, height: 300 },
    
    // Social media formats
    { name: "social-square-400.png", width: 400, height: 400 },
    { name: "social-square-512.png", width: 512, height: 512 },
    { name: "social-square-1024.png", width: 1024, height: 1024 },
    { name: "social-cover-1200x630.png", width: 1200, height: 630 },
    { name: "social-cover-1920x1080.png", width: 1920, height: 1080 },
    
    // Print & business formats
    { name: "business-card-300.png", width: 300, height: 300 },
    { name: "letterhead-200.png", width: 200, height: 200 },
    { name: "letterhead-300.png", width: 300, height: 300 },
    
    // App store formats
    { name: "app-store-1024.png", width: 1024, height: 1024 },
    { name: "play-store-512.png", width: 512, height: 512 },
    
    // Email signature
    { name: "email-signature-120x40.png", width: 120, height: 40 },
    { name: "email-signature-150x50.png", width: 150, height: 50 },
    
    // Transparent background variants (for overlays)
    { name: "logo-transparent-64.png", width: 64, height: 64 },
    { name: "logo-transparent-128.png", width: 128, height: 128 },
    { name: "logo-transparent-256.png", width: 256, height: 256 },
    { name: "logo-transparent-512.png", width: 512, height: 512 }
  ]
};

async function generateIconBlob(
  settings: IconMakerSettings,
  size: ExportSize
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  renderIconToCanvas(canvas, settings, { width: size.width, height: size.height });
  return canvasToBlob(canvas, "image/png");
}

async function generateSVG(settings: IconMakerSettings, width: number = 200, height: number = 200): Promise<string> {
  const displayText = settings.text;
  const shortText = displayText.length > 10 ? 
    displayText.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 
    displayText;

  let shadowFilter = "";
  if (settings.dropShadow.enabled) {
    shadowFilter = `
      <defs>
        <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="${settings.dropShadow.offsetX}" dy="${settings.dropShadow.offsetY}" 
                       stdDeviation="${settings.dropShadow.blur}" 
                       flood-color="${settings.dropShadow.color}" 
                       flood-opacity="${settings.dropShadow.opacity}"/>
        </filter>
      </defs>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  ${shadowFilter}
  ${settings.backgroundType === "solid" ? 
    `<rect width="256" height="256" fill="${settings.backgroundColor}"/>` : 
    ""
  }
  <text x="128" y="128" 
        font-family="${settings.fontFamily}" 
        font-size="100" 
        font-weight="${settings.fontWeight}"
        fill="${settings.textColor}" 
        text-anchor="middle" 
        dominant-baseline="central"
        ${settings.dropShadow.enabled ? 'filter="url(#drop-shadow)"' : ''}
        ${settings.textStroke.enabled ? 
          `stroke="${settings.textStroke.color}" stroke-width="${settings.textStroke.width}"` : 
          ""
        }>
    ${shortText}
  </text>
</svg>`;
}

export async function exportSingleFormat(
  settings: IconMakerSettings,
  format: string
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(format);
  
  if (!folder) return;

  const sizes = EXPORT_SIZES[format as keyof typeof EXPORT_SIZES];
  if (!sizes) return;

  // Generate PNG files
  for (const size of sizes) {
    const blob = await generateIconBlob(settings, size);
    folder.file(size.name, blob);
  }

  // Add SVG for web format
  if (format === "web") {
    const svgContent = await generateSVG(settings);
    folder.file("icon.svg", svgContent);
  }

  // Generate and download zip
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${settings.text.toLowerCase().replace(/\s+/g, '-')}-${format}-icons.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportIconBundle(
  settings: IconMakerSettings,
  onProgress?: (progress: number) => void
): Promise<void> {
  const zip = new JSZip();
  let totalItems = 0;
  let completedItems = 0;

  // Count total items
  Object.entries(EXPORT_SIZES).forEach(([format, sizes]) => {
    if (settings.exportFormats[format as keyof typeof settings.exportFormats]) {
      totalItems += sizes.length;
      if (format === "web") totalItems += 1; // SVG file
    }
  });

  const updateProgress = () => {
    if (onProgress) {
      onProgress(Math.round((completedItems / totalItems) * 100));
    }
  };

  // Generate all formats
  for (const [format, sizes] of Object.entries(EXPORT_SIZES)) {
    if (!settings.exportFormats[format as keyof typeof settings.exportFormats]) continue;

    const folder = zip.folder(format);
    if (!folder) continue;

    // Generate PNG files
    for (const size of sizes) {
      const blob = await generateIconBlob(settings, size);
      folder.file(size.name, blob);
      completedItems++;
      updateProgress();
    }

    // Add SVG for web format
    if (format === "web") {
      const svgContent = await generateSVG(settings);
      folder.file("icon.svg", svgContent);
      completedItems++;
      updateProgress();
    }
  }

  // Generate and download zip
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${settings.text.toLowerCase().replace(/\s+/g, '-')}-icon-bundle.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
