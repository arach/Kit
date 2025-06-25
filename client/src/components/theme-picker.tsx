import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Palette, Check, Grid3X3 } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { loadGoogleFont } from "@/lib/google-fonts";

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

const THEMES: Theme[] = [
  // Cyberpunk Neon - Bold tech aesthetic
  {
    name: "Cyberpunk Neon",
    fontFamily: "Orbitron",
    fontSize: 48,
    fontWeight: 700,
    backgroundColor: "#0a0a0a",
    textColor: "#00ff88",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#00ff88" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 15, opacity: 0.8, color: "#00ff88" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },
  
  // Terminal Green - Classic hacker aesthetic
  {
    name: "Terminal Green",
    fontFamily: "Fira Code",
    fontSize: 42,
    fontWeight: 500,
    backgroundColor: "#0d1117",
    textColor: "#00ff41",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 8, opacity: 0.6, color: "#00ff41" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },
  
  // Retro Gaming - Pixel perfect
  {
    name: "Retro Gaming",
    fontFamily: "Silkscreen",
    fontSize: 36,
    fontWeight: 400,
    backgroundColor: "#1a1a2e",
    textColor: "#ff6b6b",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#ffffff" },
    dropShadow: { enabled: true, offsetX: 3, offsetY: 3, blur: 0, opacity: 1, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Code Editor - JetBrains style
  {
    name: "Code Editor",
    fontFamily: "JetBrains Mono",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#2b2b2b",
    textColor: "#a9b7c6",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Space Terminal - Sci-fi monospace
  {
    name: "Space Terminal",
    fontFamily: "Space Mono",
    fontSize: 44,
    fontWeight: 700,
    backgroundColor: "#0f0f23",
    textColor: "#ffff66",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 6, opacity: 0.8, color: "#ffff66" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Console Pro - Source Code style
  {
    name: "Console Pro",
    fontFamily: "Source Code Pro",
    fontSize: 42,
    fontWeight: 700,
    backgroundColor: "#1e1e1e",
    textColor: "#d4d4d4",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Matrix Code - Digital rain aesthetic
  {
    name: "Matrix Code",
    fontFamily: "Courier Prime",
    fontSize: 40,
    fontWeight: 700,
    backgroundColor: "#000000",
    textColor: "#00ff00",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 10, opacity: 0.7, color: "#00ff00" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Tech Display - Futuristic UI
  {
    name: "Tech Display",
    fontFamily: "Audiowide",
    fontSize: 46,
    fontWeight: 400,
    backgroundColor: "#0a0a0a",
    textColor: "#00d4ff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#00d4ff" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 12, opacity: 0.8, color: "#00d4ff" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Minimal Code - Clean monospace
  {
    name: "Minimal Code",
    fontFamily: "DM Mono",
    fontSize: 44,
    fontWeight: 500,
    backgroundColor: "#ffffff",
    textColor: "#2d3748",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 1, blur: 3, opacity: 0.1, color: "#000000" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Electric Mono - Roboto Mono style
  {
    name: "Electric Mono",
    fontFamily: "Roboto Mono",
    fontSize: 42,
    fontWeight: 600,
    backgroundColor: "#1a1a1a",
    textColor: "#ff0080",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 8, opacity: 0.7, color: "#ff0080" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Giant Display - Major Mono style
  {
    name: "Giant Display",
    fontFamily: "Major Mono Display",
    fontSize: 38,
    fontWeight: 400,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#ff4500" },
    dropShadow: { enabled: true, offsetX: 4, offsetY: 4, blur: 0, opacity: 1, color: "#ff4500" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Block Display - Bungee style
  {
    name: "Block Display",
    fontFamily: "Bungee",
    fontSize: 40,
    fontWeight: 400,
    backgroundColor: "#ff6b35",
    textColor: "#000000",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#ffffff" },
    dropShadow: { enabled: true, offsetX: 3, offsetY: 3, blur: 0, opacity: 1, color: "#cc5529" },
    textBreakpoints: { enabled: true, ...createSmartBreakpoints("Scout"), smallMax: 48, mediumMax: 128 }
  },

  // Electric Grid - Electrolize style
  {
    name: "Electric Grid",
    fontFamily: "Electrolize",
    fontSize: 44,
    fontWeight: 400,
    backgroundColor: "#1a1a1a",
    textColor: "#00d4ff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 12, opacity: 0.8, color: "#00d4ff" },
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

// Theme preview component that renders a 64px app icon preview
interface ThemePreviewProps {
  theme: Theme;
  size?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

function ThemePreview({ theme, size = 64, onClick, isSelected }: ThemePreviewProps) {
  const text = theme.textBreakpoints?.smallText || "S";
  
  // Preload font for this theme preview
  useEffect(() => {
    if (theme.fontFamily && theme.fontFamily !== 'Helvetica' && theme.fontFamily !== 'Arial' && theme.fontFamily !== 'SF Pro Display') {
      loadGoogleFont(theme.fontFamily, [theme.fontWeight]);
    }
  }, [theme.fontFamily, theme.fontWeight]);
  
  return (
    <div 
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 group ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'
      }`}
      style={{ width: size, height: size }}
      onClick={onClick}
      title={theme.name}
    >
      {/* Background */}
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: theme.backgroundColor,
          background: theme.backgroundType === 'gradient' 
            ? `linear-gradient(135deg, ${theme.backgroundColor}, ${theme.backgroundColor}dd)` 
            : theme.backgroundColor
        }}
      >
        {/* Text */}
        <span
          style={{
            fontFamily: theme.fontFamily,
            fontSize: size * 0.4, // 40% of container size
            fontWeight: theme.fontWeight,
            color: theme.textColor,
            textShadow: theme.dropShadow.enabled 
              ? `${theme.dropShadow.offsetX}px ${theme.dropShadow.offsetY}px ${theme.dropShadow.blur}px rgba(0,0,0,${theme.dropShadow.opacity})` 
              : 'none',
            WebkitTextStroke: theme.textStroke.enabled 
              ? `${theme.textStroke.width}px ${theme.textStroke.color}` 
              : 'initial'
          }}
        >
          {text}
        </span>
      </div>
      
      {/* Theme name label */}
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
        {theme.name}
      </div>
    </div>
  );
}

interface ThemePickerProps {
  onApplyTheme: (theme: Partial<IconMakerSettings>, themeName?: string) => void;
  currentTheme?: string;
}

export function ThemePicker({ onApplyTheme, currentTheme }: ThemePickerProps) {
  const [showAllThemes, setShowAllThemes] = useState(false);
  
  const handleThemeClick = (theme: Theme) => {
    // Load the font before applying the theme
    if (theme.fontFamily && theme.fontFamily !== 'Helvetica' && theme.fontFamily !== 'Arial') {
      loadGoogleFont(theme.fontFamily, [theme.fontWeight]);
    }

    // Apply complete theme settings, ensuring all properties are reset
    onApplyTheme({
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      backgroundType: theme.backgroundType,
      textStroke: {
        enabled: theme.textStroke.enabled,
        width: theme.textStroke.width,
        color: theme.textStroke.color
      },
      dropShadow: {
        enabled: theme.dropShadow.enabled,
        offsetX: theme.dropShadow.offsetX,
        offsetY: theme.dropShadow.offsetY,
        blur: theme.dropShadow.blur,
        opacity: theme.dropShadow.opacity,
        color: theme.dropShadow.color
      },
      textBreakpoints: theme.textBreakpoints
    }, theme.name);
  };

  // Show first 9 themes in dropdown, rest in modal
  const previewThemes = THEMES.slice(0, 9);
  const remainingCount = THEMES.length - 9;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">
              {currentTheme ? currentTheme : 'Themes'}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-4">
          {/* 3x3 Grid of theme previews */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {previewThemes.map((theme) => (
              <ThemePreview
                key={theme.name}
                theme={theme}
                size={64}
                onClick={() => handleThemeClick(theme)}
                isSelected={currentTheme === theme.name}
              />
            ))}
          </div>
          
          {/* Show more button */}
          {remainingCount > 0 && (
            <div className="border-t pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllThemes(true)}
                className="w-full gap-2"
              >
                <Grid3X3 className="w-4 h-4" />
                View All {THEMES.length} Themes
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal for all themes */}
      <Dialog open={showAllThemes} onOpenChange={setShowAllThemes}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" aria-describedby="theme-modal-description">
          <DialogHeader>
            <DialogTitle>Choose a Theme</DialogTitle>
          </DialogHeader>
          <p id="theme-modal-description" className="text-sm text-gray-600 mb-4">
            Select from our curated collection of themes, each with unique font, color, and effect combinations.
          </p>
          
          <div className="grid grid-cols-6 gap-4 p-4">
            {THEMES.map((theme) => (
              <div key={theme.name} className="group flex flex-col items-center">
                <ThemePreview
                  theme={theme}
                  size={80}
                  onClick={() => {
                    handleThemeClick(theme);
                    setShowAllThemes(false);
                  }}
                  isSelected={currentTheme === theme.name}
                />
                <p className="text-xs text-center mt-2 text-gray-600 group-hover:text-gray-900 leading-tight">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}