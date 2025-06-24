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
  backgroundColor: string;
  textColor: string;
  strokeColor: string;
  backgroundType: "solid" | "gradient" | "none";
  strokeEnabled: boolean;
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

const themes: Theme[] = [
  {
    name: "Classic",
    description: "Timeless black on white",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    strokeColor: "#64748b",
    backgroundType: "solid",
    strokeEnabled: false
  },
  {
    name: "Midnight",
    description: "Bold white on black",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    strokeColor: "#64748b",
    backgroundType: "solid",
    strokeEnabled: false
  },
  {
    name: "Ocean Pro",
    description: "Professional blue with subtle stroke",
    backgroundColor: "#1e40af",
    textColor: "#ffffff",
    strokeColor: "#93c5fd",
    backgroundType: "solid",
    strokeEnabled: true
  },
  {
    name: "Forest Edge",
    description: "Natural green with defined edges",
    backgroundColor: "#059669",
    textColor: "#ffffff",
    strokeColor: "#86efac",
    backgroundType: "solid",
    strokeEnabled: true
  },
  {
    name: "Sunset Glow",
    description: "Warm gradient with glow effect",
    backgroundColor: "#ea580c",
    textColor: "#ffffff",
    strokeColor: "#fed7aa",
    backgroundType: "gradient",
    strokeEnabled: false
  },
  {
    name: "Purple Luxe",
    description: "Premium purple with gold stroke",
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    strokeColor: "#fbbf24",
    backgroundType: "solid",
    strokeEnabled: true
  },
  {
    name: "Minimal Glass",
    description: "Clean transparent with subtle outline",
    backgroundColor: "transparent",
    textColor: "#1f2937",
    strokeColor: "#e2e8f0",
    backgroundType: "none",
    strokeEnabled: true
  },
  {
    name: "High Contrast",
    description: "Maximum readability design",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    strokeColor: "#000000",
    backgroundType: "solid",
    strokeEnabled: true
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
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      backgroundType: theme.backgroundType,
      textStroke: {
        enabled: theme.strokeEnabled,
        color: theme.strokeColor,
        width: 2
      }
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
                      border: theme.backgroundColor === "transparent" ? "1px dashed #cbd5e1" : `1px solid ${theme.strokeColor}`
                    }}
                  />
                  <div
                    className="w-3 h-3 rounded border"
                    style={{
                      backgroundColor: theme.textColor,
                      border: theme.strokeEnabled ? `1px solid ${theme.strokeColor}` : '1px solid #e2e8f0'
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-slate-900">
                    {theme.name}
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