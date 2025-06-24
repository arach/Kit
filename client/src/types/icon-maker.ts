export interface DropShadowSettings {
  enabled: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  opacity: number;
  color: string;
}

export interface TextStrokeSettings {
  enabled: boolean;
  width: number;
  color: string;
}

export interface ExportFormats {
  ios: boolean;
  android: boolean;
  macos: boolean;
  web: boolean;
}

export interface TextBreakpoints {
  enabled: boolean;
  smallText: string;    // For sizes <= smallMax
  mediumText: string;   // For sizes <= mediumMax
  largeText: string;    // For sizes > mediumMax
  smallMax: number;     // Default: 48px (Tailwind sm breakpoint)
  mediumMax: number;    // Default: 128px (between Tailwind md-lg)
}

export interface IconMakerSettings {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  backgroundColor: string;
  backgroundType: "solid" | "gradient" | "none";
  textColor: string;
  dropShadow: DropShadowSettings;
  textStroke: TextStrokeSettings;
  textBreakpoints: TextBreakpoints;
  exportFormats: ExportFormats;
}
