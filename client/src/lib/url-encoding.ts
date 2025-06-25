import { IconMakerSettings } from "@/types/icon-maker";

// Base64 URL-safe encoding/decoding utilities
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str: string): string {
  // Add padding if needed
  str += '='.repeat((4 - str.length % 4) % 4);
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

// Simple compression using JSON minification and common value substitution
function compressSettings(settings: IconMakerSettings): string {
  // Create a compressed representation with shorter keys
  const compressed = {
    t: settings.text,
    ff: settings.fontFamily,
    fs: settings.fontSize,
    fw: settings.fontWeight,
    bg: settings.backgroundColor,
    bt: settings.backgroundType,
    tc: settings.textColor,
    ds: settings.dropShadow.enabled ? {
      x: settings.dropShadow.offsetX,
      y: settings.dropShadow.offsetY,
      b: settings.dropShadow.blur,
      o: settings.dropShadow.opacity,
      c: settings.dropShadow.color
    } : null,
    ts: settings.textStroke.enabled ? {
      w: settings.textStroke.width,
      c: settings.textStroke.color
    } : null,
    tb: settings.textBreakpoints.enabled ? {
      s: settings.textBreakpoints.smallText,
      m: settings.textBreakpoints.mediumText,
      l: settings.textBreakpoints.largeText,
      sm: settings.textBreakpoints.smallMax,
      mm: settings.textBreakpoints.mediumMax
    } : null,
    ef: {
      i: settings.exportFormats.ios,
      a: settings.exportFormats.android,
      m: settings.exportFormats.macos,
      w: settings.exportFormats.web
    }
  };

  return JSON.stringify(compressed);
}

function decompressSettings(compressed: string): IconMakerSettings {
  try {
    const c = JSON.parse(compressed);
    
    return {
      text: c.t || "Scout",
      fontFamily: c.ff || "Inter",
      fontSize: c.fs || 48,
      fontWeight: c.fw || 600,
      backgroundColor: c.bg || "#ffffff",
      backgroundType: c.bt || "solid",
      textColor: c.tc || "#000000",
      dropShadow: c.ds ? {
        enabled: true,
        offsetX: c.ds.x || 0,
        offsetY: c.ds.y || 0,
        blur: c.ds.b || 0,
        opacity: c.ds.o || 0,
        color: c.ds.c || "#000000"
      } : {
        enabled: false,
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        opacity: 0,
        color: "#000000"
      },
      textStroke: c.ts ? {
        enabled: true,
        width: c.ts.w || 0,
        color: c.ts.c || "#000000"
      } : {
        enabled: false,
        width: 0,
        color: "#000000"
      },
      textBreakpoints: c.tb ? {
        enabled: true,
        smallText: c.tb.s || "",
        mediumText: c.tb.m || "",
        largeText: c.tb.l || "",
        smallMax: c.tb.sm || 48,
        mediumMax: c.tb.mm || 128
      } : {
        enabled: false,
        smallText: "",
        mediumText: "",
        largeText: "",
        smallMax: 48,
        mediumMax: 128
      },
      exportFormats: {
        ios: c.ef?.i || false,
        android: c.ef?.a || false,
        macos: c.ef?.m || false,
        web: c.ef?.w || true
      }
    };
  } catch (error) {
    console.error('Failed to decompress settings:', error);
    // Return default settings if decompression fails
    return {
      text: "Scout",
      fontFamily: "Inter",
      fontSize: 48,
      fontWeight: 600,
      backgroundColor: "#ffffff",
      backgroundType: "solid",
      textColor: "#000000",
      dropShadow: {
        enabled: false,
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        opacity: 0,
        color: "#000000"
      },
      textStroke: {
        enabled: false,
        width: 0,
        color: "#000000"
      },
      textBreakpoints: {
        enabled: true,
        smallText: "S",
        mediumText: "Sc",
        largeText: "Scout",
        smallMax: 48,
        mediumMax: 128
      },
      exportFormats: {
        ios: false,
        android: false,
        macos: false,
        web: true
      }
    };
  }
}

export function encodeSettingsToUrl(settings: IconMakerSettings): string {
  const compressed = compressSettings(settings);
  const encoded = base64UrlEncode(compressed);
  return encoded;
}

export function decodeSettingsFromUrl(encoded: string): IconMakerSettings {
  try {
    const compressed = base64UrlDecode(encoded);
    return decompressSettings(compressed);
  } catch (error) {
    console.error('Failed to decode settings from URL:', error);
    return decompressSettings('{}'); // Returns default settings
  }
}

export function updateUrlWithSettings(settings: IconMakerSettings): void {
  const encoded = encodeSettingsToUrl(settings);
  const url = new URL(window.location.href);
  url.searchParams.set('config', encoded);
  window.history.replaceState({}, '', url.toString());
}

export function getSettingsFromUrl(): IconMakerSettings | null {
  const url = new URL(window.location.href);
  const encoded = url.searchParams.get('config');
  
  if (!encoded) {
    return null;
  }
  
  return decodeSettingsFromUrl(encoded);
}

export function generateShareableUrl(settings: IconMakerSettings): string {
  const encoded = encodeSettingsToUrl(settings);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('config', encoded);
  return url.toString();
}