import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Monitor, Tablet, Watch } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { loadGoogleFont } from "@/lib/google-fonts";
import { ContextualPreviews } from "@/components/contextual-previews";

interface PreviewAreaProps {
  settings: IconMakerSettings;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile' | 'watch';

interface DevicePreview {
  type: DeviceType;
  name: string;
  icon: any;
  width: number;
  height: number;
  iconSizes: number[];
}

function getShortText(text: string): string {
  if (!text) return "SC";
  const words = text.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words.map(word => word[0]).join("").substring(0, 2).toUpperCase();
}

function getTextForSize(size: number, settings: IconMakerSettings): string {
  if (!settings.textBreakpoints?.enabled) {
    return settings.text;
  }

  const smallMax = settings.textBreakpoints.smallMax || 48;
  const mediumMax = settings.textBreakpoints.mediumMax || 128;

  if (size <= smallMax) {
    return settings.textBreakpoints.smallText || getShortText(settings.text);
  } else if (size <= mediumMax) {
    return settings.textBreakpoints.mediumText || getShortText(settings.text);
  } else {
    return settings.textBreakpoints.largeText || settings.text;
  }
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
  const displayText = getTextForSize(Math.max(dimensions.width, dimensions.height), settings);
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

const devicePreviews: DevicePreview[] = [
  {
    type: 'desktop',
    name: 'Desktop',
    icon: Monitor,
    width: 1200,
    height: 800,
    iconSizes: [128, 64, 32, 16]
  },
  {
    type: 'tablet',
    name: 'Tablet',
    icon: Tablet,
    width: 768,
    height: 1024,
    iconSizes: [128, 64, 32]
  },
  {
    type: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    width: 375,
    height: 667,
    iconSizes: [128, 64, 32]
  },
  {
    type: 'watch',
    name: 'Watch',
    icon: Watch,
    width: 200,
    height: 200,
    iconSizes: [64, 48, 32]
  }
];

export function PreviewArea({ settings }: PreviewAreaProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    // Ensure font is loaded for preview
    loadGoogleFont(settings.fontFamily, [300, 400, 500, 600, 700, 800]);
  }, [settings.fontFamily]);

  const currentDevice = devicePreviews.find(d => d.type === selectedDevice) || devicePreviews[0];

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
      : 'initial',
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
      : 'initial',
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
              {devicePreviews.map((device) => {
                const IconComponent = device.icon;
                return (
                  <Button
                    key={device.type}
                    variant={selectedDevice === device.type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDevice(device.type)}
                    className={selectedDevice === device.type ? "bg-primary text-white" : ""}
                  >
                    <IconComponent className="h-4 w-4 mr-1" />
                    {device.name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600">Zoom:</span>
            <Select value={zoomLevel.toString()} onValueChange={(value) => setZoomLevel(parseInt(value))}>
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
          {/* Device Context Header */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {currentDevice.name} Preview ({currentDevice.width}×{currentDevice.height})
            </h3>
            <p className="text-sm text-slate-600">
              See how your icons appear on {currentDevice.name.toLowerCase()} devices
            </p>
          </div>

          {/* Device-Specific Preview */}
          <div 
            className="mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
            style={{
              width: `${(currentDevice.width * zoomLevel) / 100}px`,
              maxWidth: '100%',
              transform: zoomLevel < 100 ? `scale(${zoomLevel / 100})` : 'none',
              transformOrigin: 'top center'
            }}
          >
            {/* Device Status Bar (for mobile/tablet) */}
            {(selectedDevice === 'mobile' || selectedDevice === 'tablet') && (
              <div className="bg-slate-900 text-white px-4 py-2 text-xs flex justify-between items-center">
                <span>9:41</span>
                <div className="flex space-x-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
            )}

            {/* Device Content Area */}
            <div 
              className="bg-slate-50 p-6 flex flex-col items-center space-y-6"
              style={{
                height: selectedDevice === 'watch' ? '160px' : '400px',
                minHeight: selectedDevice === 'watch' ? '160px' : '400px'
              }}
            >
              {/* App Icons Grid */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-slate-700 mb-4">App Icons</h4>
                <div className="flex items-center justify-center space-x-4">
                  {currentDevice.iconSizes.map((size, index) => (
                    <div key={size} className="text-center">
                      <div
                        className={`border border-slate-200 ${
                          selectedDevice === 'mobile' ? 'rounded-2xl' : 
                          selectedDevice === 'tablet' ? 'rounded-xl' : 
                          selectedDevice === 'watch' ? 'rounded-full' : 'rounded-lg'
                        } flex items-center justify-center shadow-sm`}
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          ...getBackgroundStyle()
                        }}
                      >
                        <span style={getIconStyle(size)}>
                          {getTextForSize(size, settings)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{size}px</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wordmark in context (except watch) */}
              {selectedDevice !== 'watch' && (
                <div className="text-center w-full flex flex-col items-center">
                  <h4 className="text-sm font-medium text-slate-700 mb-4">Brand Context</h4>
                  <div 
                    className="border border-slate-200 rounded-lg flex items-center justify-center p-4"
                    style={{
                      width: selectedDevice === 'mobile' ? '280px' : '400px',
                      height: selectedDevice === 'mobile' ? '100px' : '120px',
                      ...getBackgroundStyle()
                    }}
                  >
                    <span style={{
                      ...getWordmarkStyle(),
                      fontSize: selectedDevice === 'mobile' ? 
                        `${Math.max(settings.fontSize * 0.8, 24)}px` : 
                        `${Math.max(settings.fontSize * 1.2, 36)}px`
                    }}>
                      {settings.text}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contextual Previews */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
              Brand in Context
            </h3>
            <ContextualPreviews settings={settings} />
          </div>

          {/* Traditional Icon Grid (below device preview) */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
              Export Formats
            </h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
