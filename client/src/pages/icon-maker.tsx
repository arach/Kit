import { useState, useEffect } from "react";
import { Palette, Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ControlsSidebar } from "@/components/controls-sidebar";
import { PreviewArea } from "@/components/preview-area";
import { ExportPanel } from "@/components/export-panel";
import { IconMakerSettings } from "@/types/icon-maker";

const defaultSettings: IconMakerSettings = {
  text: "IconMaker",
  fontFamily: "Montserrat",
  fontSize: 48,
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
  exportFormats: {
    ios: true,
    android: true,
    macos: true,
    web: true
  }
};

export default function IconMaker() {
  const [settings, setSettings] = useState<IconMakerSettings>(defaultSettings);
  const [showExportPanel, setShowExportPanel] = useState(false);

  const updateSettings = (updates: Partial<IconMakerSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
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
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="text-white text-sm" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">IconMaker Pro</h1>
          </div>
          <div className="flex items-center space-x-4">
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
