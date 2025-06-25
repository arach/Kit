import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Palette, Check } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";

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

interface Theme {
  name: string;
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

const themes: Theme[] = [
  // Pure Minimalism
  {
    name: "Pure Minimal",
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

interface ThemePickerProps {
  onApplyTheme: (theme: Partial<IconMakerSettings>) => void;
  currentTheme?: string;
}

export function ThemePicker({ onApplyTheme, currentTheme }: ThemePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeClick = (theme: Theme) => {
    onApplyTheme({
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
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Themes</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-96 overflow-y-auto">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeClick(theme)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              {/* Theme Color Preview */}
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
              <span className="text-sm font-medium">{theme.name}</span>
            </div>
            {currentTheme === theme.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}