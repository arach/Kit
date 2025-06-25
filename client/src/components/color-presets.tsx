import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconMakerSettings } from "@/types/icon-maker";

interface ColorPalette {
  name: string;
  colors: string[];
}

interface Theme {
  name: string;
  description: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  backgroundColor: string;
  textColor: string;
  backgroundType: "solid" | "gradient" | "none";
  textStroke: {
    enabled: boolean;
    width: number;
    color: string;
  };
  dropShadow: {
    enabled: boolean;
    offsetX: number;
    offsetY: number;
    blur: number;
    opacity: number;
    color: string;
  };
  textBreakpoints: {
    enabled: boolean;
    smallText: string;
    mediumText: string;
    largeText: string;
    smallMax: number;
    mediumMax: number;
  };
}

interface ColorCombination {
  name: string;
  backgroundColor: string;
  textColor: string;
  description: string;
}

const colorPalettes: ColorPalette[] = [
  {
    name: "Neutrals",
    colors: ["#ffffff", "#f8fafc", "#e2e8f0", "#64748b", "#334155", "#1e293b", "#000000"]
  },
  {
    name: "Blues",
    colors: ["#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8", "#1e3a8a", "#172554"]
  },
  {
    name: "Greens",
    colors: ["#dcfce7", "#86efac", "#22c55e", "#15803d", "#166534", "#14532d"]
  },
  {
    name: "Purples",
    colors: ["#f3e8ff", "#c4b5fd", "#8b5cf6", "#7c3aed", "#6d28d9", "#581c87"]
  },
  {
    name: "Reds",
    colors: ["#fef2f2", "#fca5a5", "#ef4444", "#dc2626", "#b91c1c", "#7f1d1d"]
  },
  {
    name: "Oranges",
    colors: ["#fff7ed", "#fed7aa", "#fb923c", "#ea580c", "#c2410c", "#9a3412"]
  }
];

const colorCombinations: ColorCombination[] = [
  // Light backgrounds with dark text
  { name: "Pure Light", backgroundColor: "#ffffff", textColor: "#000000", description: "Classic contrast" },
  { name: "Soft Light", backgroundColor: "#f8fafc", textColor: "#1e293b", description: "Gentle on eyes" },
  { name: "Warm Light", backgroundColor: "#fef7f0", textColor: "#7c2d12", description: "Warm neutrals" },
  
  // Dark backgrounds with light text
  { name: "Pure Dark", backgroundColor: "#000000", textColor: "#ffffff", description: "Maximum contrast" },
  { name: "Soft Dark", backgroundColor: "#1e293b", textColor: "#f1f5f9", description: "Modern dark" },
  { name: "Cool Dark", backgroundColor: "#0f172a", textColor: "#e2e8f0", description: "Professional" },
  
  // Brand colors
  { name: "Ocean Blue", backgroundColor: "#1e40af", textColor: "#ffffff", description: "Trust & stability" },
  { name: "Forest Green", backgroundColor: "#059669", textColor: "#ffffff", description: "Growth & nature" },
  { name: "Royal Purple", backgroundColor: "#7c3aed", textColor: "#ffffff", description: "Luxury & creativity" },
  { name: "Sunset Orange", backgroundColor: "#ea580c", textColor: "#ffffff", description: "Energy & warmth" },
  { name: "Ruby Red", backgroundColor: "#dc2626", textColor: "#ffffff", description: "Bold & passionate" },
  
  // Subtle combinations
  { name: "Sage", backgroundColor: "#f0f9f0", textColor: "#15803d", description: "Natural & calm" },
  { name: "Sky", backgroundColor: "#eff6ff", textColor: "#1e40af", description: "Open & fresh" },
  { name: "Lavender", backgroundColor: "#faf5ff", textColor: "#7c3aed", description: "Elegant & soft" },
  { name: "Peach", backgroundColor: "#fff7ed", textColor: "#c2410c", description: "Friendly & approachable" },
  
  // High contrast pairs
  { name: "Electric", backgroundColor: "#facc15", textColor: "#000000", description: "High visibility" },
  { name: "Mint", backgroundColor: "#10b981", textColor: "#ffffff", description: "Fresh & modern" },
  { name: "Coral", backgroundColor: "#f472b6", textColor: "#ffffff", description: "Vibrant & playful" },
  { name: "Indigo", backgroundColor: "#4f46e5", textColor: "#ffffff", description: "Deep & sophisticated" },
];

// Smart text breakpoints function to create meaningful abbreviations
function createSmartBreakpoints(text: string) {
  const words = text.split(' ');
  if (words.length === 1) {
    // Single word: first letter, first 2-3 letters, full word
    return {
      smallText: text.charAt(0).toUpperCase(),
      mediumText: text.substring(0, Math.min(3, text.length)).toUpperCase(),
      largeText: text
    };
  } else {
    // Multiple words: initials, abbreviated, full
    const initials = words.map(w => w.charAt(0)).join('').toUpperCase();
    const abbreviated = words.length > 2 
      ? words.slice(0, 2).map(w => w.substring(0, 2)).join('').toUpperCase()
      : words.map(w => w.substring(0, 2)).join(' ');
    return {
      smallText: initials,
      mediumText: abbreviated,
      largeText: text
    };
  }
}

const themes: Theme[] = [
  // Pure Minimalism
  {
    name: "Pure Minimal",
    description: "Ultra-clean Helvetica perfection",
    fontFamily: "Helvetica",
    fontSize: 52,
    fontWeight: 300,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },
  // Swiss Modern
  {
    name: "Swiss Modern",
    description: "Crisp Inter with perfect spacing",
    fontFamily: "Inter",
    fontSize: 48,
    fontWeight: 500,
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },
  
  // Elegant Serif
  {
    name: "Elegant Serif",
    description: "Sophisticated Playfair Display",
    fontFamily: "Playfair Display",
    fontSize: 54,
    fontWeight: 400,
    backgroundColor: "#fefbf3",
    textColor: "#44403c",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.15, color: "#78716c" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Tech Gradient
  {
    name: "Tech Gradient",
    description: "Silicon Valley SF Pro with gradient",
    fontFamily: "SF Pro Display",
    fontSize: 42,
    fontWeight: 600,
    backgroundColor: "#6366f1",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 12, opacity: 0.3, color: "#4338ca" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Cyberpunk Neon
  {
    name: "Cyberpunk Neon",
    description: "Futuristic Orbitron with glowing effects",
    fontFamily: "Orbitron",
    fontSize: 40,
    fontWeight: 700,
    backgroundColor: "#000000",
    textColor: "#00ff88",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#00ff88" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 12, opacity: 0.8, color: "#00ff88" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Retro Gaming
  {
    name: "Retro Gaming",
    description: "Pixelated Silkscreen with bold outline",
    fontFamily: "Silkscreen",
    fontSize: 36,
    fontWeight: 400,
    backgroundColor: "#ff6b35",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 3, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Luxury Gold
  {
    name: "Luxury Gold",
    description: "Elegant Crimson Text with gold on dark",
    fontFamily: "Crimson Text",
    fontSize: 48,
    fontWeight: 600,
    backgroundColor: "#1f2937",
    textColor: "#fbbf24",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 8, opacity: 0.4, color: "#92400e" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Ocean Gradient
  {
    name: "Ocean Gradient",
    description: "Refreshing Nunito with deep blue gradient",
    fontFamily: "Nunito",
    fontSize: 44,
    fontWeight: 600,
    backgroundColor: "#1e40af",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 8, opacity: 0.3, color: "#1e3a8a" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Forest Green
  {
    name: "Forest Green",
    description: "Natural Source Sans Pro on rich green",
    fontFamily: "Source Sans Pro",
    fontSize: 42,
    fontWeight: 600,
    backgroundColor: "#059669",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 6, opacity: 0.3, color: "#047857" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Sunset Gradient
  {
    name: "Sunset Gradient",
    description: "Warm Poppins with orange-to-red gradient",
    fontFamily: "Poppins",
    fontSize: 46,
    fontWeight: 500,
    backgroundColor: "#ea580c",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 4, blur: 8, opacity: 0.3, color: "#c2410c" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Corporate Navy
  {
    name: "Corporate Navy",
    description: "Professional Roboto on deep navy",
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: 500,
    backgroundColor: "#1e3a8a",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.25, color: "#1e40af" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Purple Power
  {
    name: "Purple Power",
    description: "Bold Oswald with vibrant purple gradient",
    fontFamily: "Oswald",
    fontSize: 44,
    fontWeight: 600,
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: true, width: 1, color: "#3b0764" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 10, opacity: 0.4, color: "#5b21b6" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Midnight Blue
  {
    name: "Midnight Blue",
    description: "Sleek Lato on midnight background",
    fontFamily: "Lato",
    fontSize: 38,
    fontWeight: 700,
    backgroundColor: "#0f172a",
    textColor: "#60a5fa",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 8, opacity: 0.6, color: "#3b82f6" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Creative Pink
  {
    name: "Creative Pink",
    description: "Artistic Nunito Sans with hot pink",
    fontFamily: "Nunito Sans",
    fontSize: 44,
    fontWeight: 700,
    backgroundColor: "#ec4899",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 4, blur: 8, opacity: 0.3, color: "#be185d" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Warm Earth
  {
    name: "Warm Earth",
    description: "Cozy Merriweather on warm earth tones",
    fontFamily: "Merriweather",
    fontSize: 40,
    fontWeight: 400,
    backgroundColor: "#92400e",
    textColor: "#fef3c7",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.25, color: "#78350f" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // High Contrast
  {
    name: "High Contrast",
    description: "Bold Montserrat maximum readability",
    fontFamily: "Montserrat",
    fontSize: 50,
    fontWeight: 800,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Soft Pastel
  {
    name: "Soft Pastel",
    description: "Gentle Quicksand on soft mint background",
    fontFamily: "Quicksand",
    fontSize: 42,
    fontWeight: 500,
    backgroundColor: "#d1fae5",
    textColor: "#065f46",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.15, color: "#10b981" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Art Deco
  {
    name: "Art Deco",
    description: "Sophisticated Libre Baskerville styling",
    fontFamily: "Libre Baskerville",
    fontSize: 46,
    fontWeight: 400,
    backgroundColor: "#1f2937",
    textColor: "#fbbf24",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#92400e" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 6, opacity: 0.4, color: "#78350f" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Modern Serif
  {
    name: "Modern Serif",
    description: "Contemporary Crimson Pro with subtle shadow",
    fontFamily: "Crimson Pro",
    fontSize: 48,
    fontWeight: 500,
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 3, opacity: 0.1, color: "#64748b" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Neon Strike
  {
    name: "Neon Strike",
    description: "Electric Rajdhani with neon effects",
    fontFamily: "Rajdhani",
    fontSize: 44,
    fontWeight: 600,
    backgroundColor: "#000000",
    textColor: "#06ffa5",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#06ffa5" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 15, opacity: 0.8, color: "#06ffa5" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Vintage Script
  {
    name: "Vintage Script",
    description: "Handcrafted Dancing Script elegance",
    fontFamily: "Dancing Script",
    fontSize: 52,
    fontWeight: 600,
    backgroundColor: "#fef3c7",
    textColor: "#92400e",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 3, offsetY: 3, blur: 6, opacity: 0.2, color: "#d97706" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Sports Bold
  {
    name: "Sports Bold",
    description: "Athletic Anton with strong presence",
    fontFamily: "Anton",
    fontSize: 48,
    fontWeight: 400,
    backgroundColor: "#dc2626",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 3, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 4, offsetY: 4, blur: 4, opacity: 0.5, color: "#991b1b" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Academic Blue
  {
    name: "Academic Blue",
    description: "Scholarly Libre Franklin precision",
    fontFamily: "Libre Franklin",
    fontSize: 40,
    fontWeight: 500,
    backgroundColor: "#1e40af",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.2, color: "#1d4ed8" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Cosmic Purple
  {
    name: "Cosmic Purple",
    description: "Futuristic Exo with cosmic gradient",
    fontFamily: "Exo",
    fontSize: 42,
    fontWeight: 600,
    backgroundColor: "#581c87",
    textColor: "#faf5ff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 12, opacity: 0.4, color: "#3b0764" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Industrial Gray
  {
    name: "Industrial Gray",
    description: "Strong Work Sans on industrial background",
    fontFamily: "Work Sans",
    fontSize: 38,
    fontWeight: 600,
    backgroundColor: "#374151",
    textColor: "#f9fafb",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.2, color: "#111827" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  }
];

interface ColorPresetsProps {
  onApplyPreset: (preset: Partial<IconMakerSettings>) => void;
}

export function ColorPresets({ onApplyPreset }: ColorPresetsProps) {
  const handleColorClick = (color: string, type: 'background' | 'text') => {
    if (type === 'background') {
      onApplyPreset({ backgroundColor: color });
    } else {
      onApplyPreset({ textColor: color });
    }
  };

  const handleCombinationClick = (combination: ColorCombination) => {
    onApplyPreset({
      backgroundColor: combination.backgroundColor,
      textColor: combination.textColor,
      backgroundType: "solid"
    });
  };

  const handleThemeClick = (theme: Theme) => {
    onApplyPreset({
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      backgroundType: theme.backgroundType,
      textStroke: theme.textStroke,
      dropShadow: theme.dropShadow,
      textBreakpoints: theme.textBreakpoints
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
        Colors & Themes
      </h3>
      
      <Tabs defaultValue="combinations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="combinations">Combos</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="palettes">Colors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="combinations" className="space-y-3 mt-4">
          <div className="grid grid-cols-1 gap-2">
            {colorCombinations.map((combination) => (
              <Button
                key={combination.name}
                variant="outline"
                onClick={() => handleCombinationClick(combination)}
                className="h-auto p-3 flex items-center space-x-3 hover:border-primary justify-start"
              >
                {/* Color Preview */}
                <div className="flex items-center space-x-1">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: combination.backgroundColor }}
                  />
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: combination.textColor }}
                  />
                </div>
                
                <div className="text-left flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900">
                    {combination.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {combination.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="themes" className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.name}
                variant="outline"
                onClick={() => handleThemeClick(theme)}
                className="h-auto p-2 flex flex-col items-center space-y-2 hover:border-primary"
              >
                {/* Theme Preview */}
                <div className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded border"
                    style={{
                      backgroundColor: theme.backgroundColor === "transparent" ? "#f8fafc" : theme.backgroundColor,
                      border: theme.backgroundColor === "transparent" ? "1px dashed #cbd5e1" : "1px solid #e2e8f0"
                    }}
                  />
                  <div
                    className="w-3 h-3 rounded border"
                    style={{
                      backgroundColor: theme.textColor,
                      border: theme.textStroke.enabled ? `1px solid ${theme.textStroke.color}` : '1px solid #e2e8f0'
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-slate-900">
                    {theme.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {theme.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="palettes" className="space-y-3 mt-4">
          {colorPalettes.map((palette) => (
            <div key={palette.name} className="space-y-2">
              <h4 className="text-xs font-medium text-slate-700">{palette.name}</h4>
              <div className="grid grid-cols-6 gap-1">
                {palette.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color, 'background')}
                    className="w-full h-8 rounded border border-slate-200 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    title={`Apply ${color}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}