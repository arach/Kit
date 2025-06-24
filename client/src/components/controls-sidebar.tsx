import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Search, Download } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { loadGoogleFont, getAvailableFonts, searchGoogleFonts } from "@/lib/google-fonts";
import { ColorPresets } from "@/components/color-presets";

interface ControlsSidebarProps {
  settings: IconMakerSettings;
  onSettingsChange: (updates: Partial<IconMakerSettings>) => void;
}

const backgroundColors = [
  "#ffffff", "#0f172a", "#6366f1", "#10b981", "#f59e0b"
];

const fontWeights = [
  { value: "300", label: "Light (300)" },
  { value: "400", label: "Regular (400)" },
  { value: "500", label: "Medium (500)" },
  { value: "600", label: "Semi Bold (600)" },
  { value: "700", label: "Bold (700)" },
  { value: "800", label: "Extra Bold (800)" }
];

export function ControlsSidebar({ settings, onSettingsChange }: ControlsSidebarProps) {
  const [availableFonts, setAvailableFonts] = useState<string[]>([]);
  const [fontSearchQuery, setFontSearchQuery] = useState("");
  const [showFontSearch, setShowFontSearch] = useState(false);

  useEffect(() => {
    getAvailableFonts().then(setAvailableFonts);
  }, []);

  useEffect(() => {
    if (fontSearchQuery.trim()) {
      searchGoogleFonts(fontSearchQuery).then(setAvailableFonts);
    } else {
      getAvailableFonts().then(setAvailableFonts);
    }
  }, [fontSearchQuery]);

  useEffect(() => {
    // Load current font with multiple weights
    loadGoogleFont(settings.fontFamily, [300, 400, 500, 600, 700, 800]);
  }, [settings.fontFamily]);

  const handleFontChange = async (fontFamily: string) => {
    onSettingsChange({ fontFamily });
    // Load the font immediately when selected
    try {
      await loadGoogleFont(fontFamily, [300, 400, 500, 600, 700, 800]);
    } catch (error) {
      console.warn(`Failed to load font ${fontFamily}:`, error);
    }
  };

  const handleBackgroundTypeChange = (type: "solid" | "gradient" | "none") => {
    onSettingsChange({ backgroundType: type });
  };

  const handleColorChange = (color: string, type: "background" | "text") => {
    if (type === "background") {
      onSettingsChange({ backgroundColor: color });
    } else {
      onSettingsChange({ textColor: color });
    }
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Text Content Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Text Content
          </h3>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">Logo Text</Label>
            <Input
              type="text"
              placeholder="Enter your text..."
              value={settings.text}
              onChange={(e) => onSettingsChange({ text: e.target.value || "Scout" })}
              className="w-full"
            />
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Typography
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Font Family</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFontSearch(!showFontSearch)}
                  className="h-6 px-2"
                >
                  <Search className="h-3 w-3" />
                </Button>
              </div>
              
              {showFontSearch && (
                <div className="mb-3">
                  <Input
                    type="text"
                    placeholder="Search Google Fonts..."
                    value={fontSearchQuery}
                    onChange={(e) => setFontSearchQuery(e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
              
              <Select value={settings.fontFamily} onValueChange={handleFontChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Font Weight</Label>
              <Select 
                value={settings.fontWeight.toString()} 
                onValueChange={(value) => onSettingsChange({ fontWeight: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontWeights.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      {weight.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Font Size</Label>
              <div className="flex items-center space-x-3">
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => onSettingsChange({ fontSize: value })}
                  min={16}
                  max={128}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-slate-600 w-12">
                  {settings.fontSize}px
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Background
          </h3>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Background Type</Label>
              <div className="flex space-x-2">
                <Button
                  variant={settings.backgroundType === "solid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBackgroundTypeChange("solid")}
                  className="flex-1"
                >
                  Solid
                </Button>
                <Button
                  variant={settings.backgroundType === "gradient" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBackgroundTypeChange("gradient")}
                  className="flex-1"
                >
                  Gradient
                </Button>
                <Button
                  variant={settings.backgroundType === "none" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBackgroundTypeChange("none")}
                  className="flex-1"
                >
                  None
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-lg cursor-pointer border-2 ${
                    settings.backgroundColor === color 
                      ? "border-primary" 
                      : "border-slate-200"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color, "background")}
                />
              ))}
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Custom Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value, "background")}
                  className="w-10 h-10 border border-slate-300 rounded-lg cursor-pointer"
                />
                <Input
                  type="text"
                  value={settings.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value, "background")}
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Effects Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Text Effects
          </h3>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">Text Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => handleColorChange(e.target.value, "text")}
                  className="w-10 h-10 border border-slate-300 rounded-lg cursor-pointer"
                />
                <Input
                  type="text"
                  value={settings.textColor}
                  onChange={(e) => handleColorChange(e.target.value, "text")}
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Drop Shadow</Label>
                <Checkbox
                  checked={settings.dropShadow.enabled}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      dropShadow: { ...settings.dropShadow, enabled: !!checked } 
                    })
                  }
                />
              </div>
              {settings.dropShadow.enabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="block text-xs text-slate-600 mb-1">X Offset</Label>
                    <Input
                      type="number"
                      value={settings.dropShadow.offsetX}
                      onChange={(e) => 
                        onSettingsChange({ 
                          dropShadow: { 
                            ...settings.dropShadow, 
                            offsetX: parseInt(e.target.value) || 0 
                          } 
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-slate-600 mb-1">Y Offset</Label>
                    <Input
                      type="number"
                      value={settings.dropShadow.offsetY}
                      onChange={(e) => 
                        onSettingsChange({ 
                          dropShadow: { 
                            ...settings.dropShadow, 
                            offsetY: parseInt(e.target.value) || 0 
                          } 
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-slate-600 mb-1">Blur</Label>
                    <Input
                      type="number"
                      value={settings.dropShadow.blur}
                      onChange={(e) => 
                        onSettingsChange({ 
                          dropShadow: { 
                            ...settings.dropShadow, 
                            blur: parseInt(e.target.value) || 0 
                          } 
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-slate-600 mb-1">Opacity</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={settings.dropShadow.opacity}
                      onChange={(e) => 
                        onSettingsChange({ 
                          dropShadow: { 
                            ...settings.dropShadow, 
                            opacity: parseFloat(e.target.value) || 0 
                          } 
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Text Stroke</Label>
                <Checkbox
                  checked={settings.textStroke.enabled}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      textStroke: { ...settings.textStroke, enabled: !!checked } 
                    })
                  }
                />
              </div>
              {settings.textStroke.enabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="block text-xs text-slate-600 mb-1">Width</Label>
                    <Input
                      type="number"
                      value={settings.textStroke.width}
                      onChange={(e) => 
                        onSettingsChange({ 
                          textStroke: { 
                            ...settings.textStroke, 
                            width: parseInt(e.target.value) || 0 
                          } 
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-slate-600 mb-1">Color</Label>
                    <input
                      type="color"
                      value={settings.textStroke.color}
                      onChange={(e) => 
                        onSettingsChange({ 
                          textStroke: { 
                            ...settings.textStroke, 
                            color: e.target.value 
                          } 
                        })
                      }
                      className="w-full h-8 border border-slate-300 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text Breakpoints Section */}
        <div className="space-y-4 pb-6">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Smart Text Cutoffs
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="breakpoints-enabled"
                checked={settings.textBreakpoints?.enabled || false}
                onCheckedChange={(checked) => 
                  onSettingsChange({
                    textBreakpoints: {
                      ...(settings.textBreakpoints || { smallText: "S", mediumText: "SC", largeText: settings.text }),
                      enabled: checked as boolean
                    }
                  })
                }
              />
              <label htmlFor="breakpoints-enabled" className="text-sm text-slate-700">
                Use different text for small sizes
              </label>
            </div>

            {settings.textBreakpoints?.enabled && (
              <div className="space-y-4 pl-6 border-l-2 border-slate-200">
                {/* Breakpoint Configuration */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wide">Breakpoints</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Small ≤</label>
                      <div className="flex items-center space-x-1">
                        <Input
                          type="number"
                          value={settings.textBreakpoints?.smallMax || 48}
                          onChange={(e) => 
                            onSettingsChange({
                              textBreakpoints: {
                                ...(settings.textBreakpoints || { enabled: true, smallText: "S", mediumText: "SC", largeText: settings.text, mediumMax: 128 }),
                                smallMax: parseInt(e.target.value) || 48
                              }
                            })
                          }
                          className="text-xs w-16"
                          min="8"
                          max="256"
                        />
                        <span className="text-xs text-slate-500">px</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Medium ≤</label>
                      <div className="flex items-center space-x-1">
                        <Input
                          type="number"
                          value={settings.textBreakpoints?.mediumMax || 128}
                          onChange={(e) => 
                            onSettingsChange({
                              textBreakpoints: {
                                ...(settings.textBreakpoints || { enabled: true, smallText: "S", mediumText: "SC", largeText: settings.text, smallMax: 48 }),
                                mediumMax: parseInt(e.target.value) || 128
                              }
                            })
                          }
                          className="text-xs w-16"
                          min="16"
                          max="512"
                        />
                        <span className="text-xs text-slate-500">px</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Configuration */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wide">Text Variations</h4>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Small (≤ {settings.textBreakpoints?.smallMax || 48}px)
                    </label>
                    <Input
                      value={settings.textBreakpoints?.smallText || "S"}
                      onChange={(e) => 
                        onSettingsChange({
                          textBreakpoints: {
                            ...(settings.textBreakpoints || { enabled: true, mediumText: "SC", largeText: settings.text, smallMax: 48, mediumMax: 128 }),
                            smallText: e.target.value
                          }
                        })
                      }
                      placeholder="S"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Medium (≤ {settings.textBreakpoints?.mediumMax || 128}px)
                    </label>
                    <Input
                      value={settings.textBreakpoints?.mediumText || "SC"}
                      onChange={(e) => 
                        onSettingsChange({
                          textBreakpoints: {
                            ...(settings.textBreakpoints || { enabled: true, smallText: "S", largeText: settings.text, smallMax: 48, mediumMax: 128 }),
                            mediumText: e.target.value
                          }
                        })
                      }
                      placeholder="SC"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Large (&gt; {settings.textBreakpoints?.mediumMax || 128}px)
                    </label>
                    <Input
                      value={settings.textBreakpoints?.largeText || settings.text}
                      onChange={(e) => 
                        onSettingsChange({
                          textBreakpoints: {
                            ...(settings.textBreakpoints || { enabled: true, smallText: "S", mediumText: "SC", smallMax: 48, mediumMax: 128 }),
                            largeText: e.target.value
                          }
                        })
                      }
                      placeholder="Scout"
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wide">Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSettingsChange({
                        textBreakpoints: {
                          ...(settings.textBreakpoints || {}),
                          smallMax: 48,
                          mediumMax: 128,
                          enabled: true
                        }
                      })}
                      className="text-xs"
                    >
                      Default
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSettingsChange({
                        textBreakpoints: {
                          ...(settings.textBreakpoints || {}),
                          smallMax: 32,
                          mediumMax: 96,
                          enabled: true
                        }
                      })}
                      className="text-xs"
                    >
                      Compact
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Color Presets Section */}
        <ColorPresets onApplyPreset={onSettingsChange} />

        {/* Export & Save Settings Section */}
        <div className="space-y-4 pb-6">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Export & Save
          </h3>
          
          {/* Save/Load Controls */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const settingsJson = JSON.stringify(settings, null, 2);
                const blob = new Blob([settingsJson], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `kit-settings-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Save
            </Button>
            
            <div className="relative">
              <Input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const loadedSettings = JSON.parse(event.target?.result as string);
                        onSettingsChange(loadedSettings);
                      } catch (error) {
                        console.error('Error loading settings:', error);
                        alert('Invalid settings file');
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="w-full text-xs pointer-events-none">
                Load
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <Card className="bg-slate-50 p-4">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Platform Formats</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <Checkbox
                    checked={settings.exportFormats.ios}
                    onCheckedChange={(checked) => 
                      onSettingsChange({ 
                        exportFormats: { 
                          ...settings.exportFormats, 
                          ios: !!checked 
                        } 
                      })
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-700">iOS App Icon</span>
                    <span className="text-xs text-slate-500 block">
                      1024x1024, 512x512, 256x256
                    </span>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <Checkbox
                    checked={settings.exportFormats.android}
                    onCheckedChange={(checked) => 
                      onSettingsChange({ 
                        exportFormats: { 
                          ...settings.exportFormats, 
                          android: !!checked 
                        } 
                      })
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-700">Android Icon</span>
                    <span className="text-xs text-slate-500 block">
                      512x512, 192x192, 144x144
                    </span>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <Checkbox
                    checked={settings.exportFormats.macos}
                    onCheckedChange={(checked) => 
                      onSettingsChange({ 
                        exportFormats: { 
                          ...settings.exportFormats, 
                          macos: !!checked 
                        } 
                      })
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-700">macOS Icon</span>
                    <span className="text-xs text-slate-500 block">
                      1024x1024, 512x512
                    </span>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <Checkbox
                    checked={settings.exportFormats.web}
                    onCheckedChange={(checked) => 
                      onSettingsChange({ 
                        exportFormats: { 
                          ...settings.exportFormats, 
                          web: !!checked 
                        } 
                      })
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-700">Web/Favicon</span>
                    <span className="text-xs text-slate-500 block">
                      256x256, 192x192, 32x32, 16x16
                    </span>
                  </div>
                </label>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
