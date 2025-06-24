import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconMakerSettings } from "@/types/icon-maker";

interface ColorPreset {
  name: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  backgroundType: "solid" | "gradient" | "none";
}

const colorPresets: ColorPreset[] = [
  {
    name: "Classic",
    description: "Professional black on white",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    backgroundType: "solid"
  },
  {
    name: "Midnight",
    description: "Bold white on black",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    backgroundType: "solid"
  },
  {
    name: "Ocean",
    description: "Deep blue with white text",
    backgroundColor: "#1e40af",
    textColor: "#ffffff",
    backgroundType: "solid"
  },
  {
    name: "Forest",
    description: "Natural green palette",
    backgroundColor: "#059669",
    textColor: "#ffffff",
    backgroundType: "solid"
  },
  {
    name: "Sunset",
    description: "Warm orange gradient",
    backgroundColor: "#ea580c",
    textColor: "#ffffff",
    backgroundType: "gradient"
  },
  {
    name: "Purple",
    description: "Modern purple brand",
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    backgroundType: "solid"
  },
  {
    name: "Rose",
    description: "Elegant pink tone",
    backgroundColor: "#e11d48",
    textColor: "#ffffff",
    backgroundType: "solid"
  },
  {
    name: "Minimal",
    description: "Transparent with dark text",
    backgroundColor: "transparent",
    textColor: "#1f2937",
    backgroundType: "none"
  }
];

interface ColorPresetsProps {
  onApplyPreset: (preset: Partial<IconMakerSettings>) => void;
}

export function ColorPresets({ onApplyPreset }: ColorPresetsProps) {
  const handlePresetClick = (preset: ColorPreset) => {
    onApplyPreset({
      backgroundColor: preset.backgroundColor,
      textColor: preset.textColor,
      backgroundType: preset.backgroundType
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Color Presets
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {colorPresets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            onClick={() => handlePresetClick(preset)}
            className="h-auto p-3 flex flex-col items-start space-y-2 hover:border-primary"
          >
            <div className="flex items-center space-x-2 w-full">
              <div
                className="w-6 h-6 rounded border border-slate-200 flex-shrink-0"
                style={{
                  backgroundColor: preset.backgroundColor === "transparent" ? "#f8fafc" : preset.backgroundColor,
                  border: preset.backgroundColor === "transparent" ? "2px dashed #cbd5e1" : undefined
                }}
              />
              <div className="text-left flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-900 truncate">
                  {preset.name}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {preset.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}