import { useState, useEffect } from "react";
import { Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ControlsSidebar } from "@/components/controls-sidebar";
import { PreviewArea } from "@/components/preview-area";
import { ExportPanel } from "@/components/export-panel";
import { MediaKitLogo } from "@/components/media-kit-logo";
import { ThemePicker } from "@/components/theme-picker";
import { IconMakerSettings } from "@/types/icon-maker";
import { getSettingsFromUrl, updateUrlWithSettings } from "@/lib/url-encoding";
import { loadGoogleFont } from "@/lib/google-fonts";

// Smart font size based on text length
function getSmartFontSize(text: string): number {
  const length = text.length;
  if (length === 1) return 60;      // Single letter - large
  if (length === 2) return 50;      // Two letters - medium-large
  if (length <= 4) return 40;       // Short words - medium
  if (length <= 8) return 32;       // Medium words - smaller
  return 24;                        // Long words - smallest
}

const defaultSettings: IconMakerSettings = {
  text: "Scout",
  fontFamily: "Montserrat",
  fontSize: getSmartFontSize("Scout"), // Smart default: 32px for 5 letters
  fontWeight: 600,
  backgroundColor: "#ffffff",
  backgroundType: "solid",
  textColor: "#0f172a",
  dropShadow: {
    enabled: true,
    offsetX: 2,
    offsetY: 2,
    blur: 4,
    opacity: 0.3,
    color: "#000000"
  },
  textStroke: {
    enabled: false,
    width: 1,
    color: "#000000"
  },
  textBreakpoints: {
    enabled: true,
    smallText: "S",
    mediumText: "SC",
    largeText: "Scout",
    smallMax: 48,    // Tailwind sm: 640px -> scaled to icon context
    mediumMax: 128   // Between Tailwind md-lg -> scaled to icon context
  },
  exportFormats: {
    ios: true,
    android: true,
    macos: true,
    web: true
  }
};

export default function IconMaker() {
  const [settings, setSettings] = useState<IconMakerSettings>(defaultSettings);

  // Load settings from URL or localStorage on mount
  useEffect(() => {
    const urlSettings = getSettingsFromUrl();
    if (urlSettings) {
      setSettings(urlSettings);
      return;
    }
    
    // Fallback to localStorage if no URL settings
    try {
      const savedSettings = localStorage.getItem('kit-settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('kit-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error);
    }
  }, [settings]);

  // Don't automatically update URL - only when sharing
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("");

  // Load Google Font when font family changes
  useEffect(() => {
    if (settings.fontFamily && settings.fontFamily !== 'Helvetica' && settings.fontFamily !== 'Arial') {
      const fontWeight = typeof settings.fontWeight === 'string' ? parseInt(settings.fontWeight) : settings.fontWeight;
      loadGoogleFont(settings.fontFamily, [fontWeight]);
    }
  }, [settings.fontFamily, settings.fontWeight]);

  const updateSettings = (updates: Partial<IconMakerSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const handleThemeChange = (themeUpdates: Partial<IconMakerSettings>, themeName?: string) => {
    // Complete reset of all properties to prevent carryover effects
    const completeTheme: IconMakerSettings = {
      ...defaultSettings, // Start with clean defaults
      ...themeUpdates,    // Apply theme updates
    };
    setSettings(completeTheme);
    if (themeName) {
      setCurrentTheme(themeName);
    }
  };

  const handleExportAll = () => {
    setShowExportPanel(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MediaKitLogo />
            <h1 className="text-xl font-semibold text-slate-900">Kit</h1>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Media Assets</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemePicker 
              onApplyTheme={handleThemeChange}
              currentTheme={currentTheme}
            />
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button onClick={handleExportAll} className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        <ControlsSidebar 
          settings={settings} 
          onSettingsChange={updateSettings} 
        />
        <PreviewArea settings={settings} />
      </div>

      {showExportPanel && (
        <ExportPanel 
          settings={settings}
          onClose={() => setShowExportPanel(false)}
        />
      )}
    </div>
  );
}
