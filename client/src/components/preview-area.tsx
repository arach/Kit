import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { loadGoogleFont } from "@/lib/google-fonts";

interface PreviewAreaProps {
  settings: IconMakerSettings;
}

function getShortText(text: string): string {
  if (!text) return "SC";
  const words = text.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words.map(word => word[0]).join("").substring(0, 2).toUpperCase();
}

interface IconPreviewProps {
  title: string;
  size: string;
  settings: IconMakerSettings;
  dimensions: { width: number; height: number };
  borderRadius?: string;
  showMultipleSizes?: boolean;
}

function IconPreview({ title, size, settings, dimensions, borderRadius = "rounded-lg", showMultipleSizes = false }: IconPreviewProps) {
  const getIconStyle = (iconSize: number) => {
    // Calculate font size based on both the icon size and user's font size setting
    const baseFontSize = Math.min(iconSize * 0.4, settings.fontSize);
    const scaledFontSize = Math.max(baseFontSize, iconSize * 0.2); // Ensure minimum readability
    
    return {
      fontFamily: `'${settings.fontFamily}', sans-serif`,
      fontSize: `${scaledFontSize}px`,
      fontWeight: settings.fontWeight,
      color: settings.textColor,
      textShadow: settings.dropShadow.enabled 
        ? `${settings.dropShadow.offsetX}px ${settings.dropShadow.offsetY}px ${settings.dropShadow.blur}px rgba(0,0,0,${settings.dropShadow.opacity})` 
        : 'none',
      WebkitTextStroke: settings.textStroke.enabled 
        ? `${settings.textStroke.width}px ${settings.textStroke.color}` 
        : 'none',
    };
  };

  const getBackgroundStyle = () => {
    if (settings.backgroundType === "solid") {
      return { backgroundColor: settings.backgroundColor };
    } else if (settings.backgroundType === "gradient") {
      return { 
        background: `linear-gradient(135deg, ${settings.backgroundColor}, ${adjustBrightness(settings.backgroundColor, -20)})` 
      };
    }
    return { backgroundColor: 'transparent' };
  };

  const adjustBrightness = (hexColor: string, percent: number): string => {
    const num = parseInt(hexColor.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  if (showMultipleSizes) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{size}</span>
        </div>
        <div className="flex justify-center items-center space-x-4">
          {[32, 64, 128].map((iconSize) => (
            <div
              key={iconSize}
              className={`border border-slate-200 ${borderRadius} flex items-center justify-center`}
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                ...getBackgroundStyle()
              }}
            >
              <span style={getIconStyle(iconSize)}>
                {dimensions.width > 300 ? settings.text : getShortText(settings.text)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{size}</span>
      </div>
      <div className="flex justify-center">
        <div
          className={`border border-slate-200 ${borderRadius} ${title.includes('iOS') ? 'shadow-lg' : ''} flex items-center justify-center`}
          style={{
            width: '128px',
            height: '128px',
            ...getBackgroundStyle()
          }}
        >
          <span style={getIconStyle(128)}>
            {dimensions.width > 300 ? settings.text : getShortText(settings.text)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PreviewArea({ settings }: PreviewAreaProps) {
  useEffect(() => {
    // Ensure font is loaded for preview
    loadGoogleFont(settings.fontFamily, [300, 400, 500, 600, 700, 800]);
  }, [settings.fontFamily]);

  const getWordmarkStyle = () => ({
    fontFamily: `'${settings.fontFamily}', sans-serif`,
    fontSize: `${Math.max(settings.fontSize * 1.5, 48)}px`, // Scale with user setting, minimum 48px
    fontWeight: settings.fontWeight,
    color: settings.textColor,
    textShadow: settings.dropShadow.enabled 
      ? `${settings.dropShadow.offsetX}px ${settings.dropShadow.offsetY}px ${settings.dropShadow.blur}px rgba(0,0,0,${settings.dropShadow.opacity})` 
      : 'none',
    WebkitTextStroke: settings.textStroke.enabled 
      ? `${settings.textStroke.width}px ${settings.textStroke.color}` 
      : 'none',
  });

  const getSocialStyle = () => ({
    fontFamily: `'${settings.fontFamily}', sans-serif`,
    fontSize: `${Math.max(settings.fontSize * 0.67, 24)}px`, // Scale with user setting, minimum 24px
    fontWeight: settings.fontWeight,
    color: settings.textColor,
    textShadow: settings.dropShadow.enabled 
      ? `${settings.dropShadow.offsetX}px ${settings.dropShadow.offsetY}px ${settings.dropShadow.blur}px rgba(0,0,0,${settings.dropShadow.opacity})` 
      : 'none',
    WebkitTextStroke: settings.textStroke.enabled 
      ? `${settings.textStroke.width}px ${settings.textStroke.color}` 
      : 'none',
  });

  const getBackgroundStyle = () => {
    if (settings.backgroundType === "solid") {
      return { backgroundColor: settings.backgroundColor };
    } else if (settings.backgroundType === "gradient") {
      const adjustBrightness = (hexColor: string, percent: number): string => {
        const num = parseInt(hexColor.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
          (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
          (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
      };
      return { 
        background: `linear-gradient(135deg, ${settings.backgroundColor}, ${adjustBrightness(settings.backgroundColor, -20)})` 
      };
    }
    return { backgroundColor: 'transparent' };
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-100">
      {/* Preview Toolbar */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-slate-900">Live Preview</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Smartphone className="h-4 w-4 mr-1" />
                Mobile
              </Button>
              <Button size="sm" className="bg-primary text-white">
                <Monitor className="h-4 w-4 mr-1" />
                Desktop
              </Button>
              <Button variant="outline" size="sm">
                <Tablet className="h-4 w-4 mr-1" />
                Tablet
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600">Zoom:</span>
            <Select defaultValue="100">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
                <SelectItem value="125">125%</SelectItem>
                <SelectItem value="150">150%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Icon Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <IconPreview
              title="iOS App Icon"
              size="1024×1024"
              settings={settings}
              dimensions={{ width: 1024, height: 1024 }}
              borderRadius="rounded-2xl"
            />
            
            <IconPreview
              title="Android Icon"
              size="512×512"
              settings={settings}
              dimensions={{ width: 512, height: 512 }}
              borderRadius="rounded-xl"
            />
            
            <IconPreview
              title="macOS Icon"
              size="1024×1024"
              settings={settings}
              dimensions={{ width: 1024, height: 1024 }}
              borderRadius="rounded-lg"
            />
            
            <IconPreview
              title="Web Favicon"
              size="256×256"
              settings={settings}
              dimensions={{ width: 256, height: 256 }}
              showMultipleSizes={true}
            />

            {/* Logo Wordmark Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Logo Wordmark</h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Vector</span>
              </div>
              <div className="flex justify-center py-8">
                <div className="text-center">
                  <div 
                    className="border border-slate-200 rounded-lg flex items-center justify-center"
                    style={{
                      width: '600px',
                      height: '200px',
                      maxWidth: '100%',
                      ...getBackgroundStyle()
                    }}
                  >
                    <span style={getWordmarkStyle()}>
                      {settings.text}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Brand Asset Generator</p>
                </div>
              </div>
            </div>

            {/* Social Media Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Social Media</h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">1200×630</span>
              </div>
              <div className="flex justify-center">
                <div 
                  className="border border-slate-200 rounded-lg shadow-sm flex items-center justify-center"
                  style={{
                    width: '320px',
                    height: '160px',
                    ...getBackgroundStyle()
                  }}
                >
                  <span style={getSocialStyle()}>
                    {settings.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
