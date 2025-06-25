import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Save, Upload, Share2, Copy, Check, FileDown, Settings2 } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { loadGoogleFont, getAvailableFonts, searchGoogleFonts } from "@/lib/google-fonts";

import { generateShareableUrl } from "@/lib/url-encoding";
import { useToast } from "@/hooks/use-toast";

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
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();

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

  // Smart font size adjustment when text changes
  const handleTextChange = (newText: string) => {
    const currentText = settings.text;
    onSettingsChange({ 
      text: newText || "Scout",
      // Only auto-adjust font size if user hasn't manually changed it much from smart defaults
      fontSize: newText && newText !== currentText ? getSmartFontSize(newText) : settings.fontSize
    });
  };

  // Smart font size function (same as in icon-maker.tsx)
  const getSmartFontSize = (text: string): number => {
    const length = text.length;
    if (length === 1) return 60;      // Single letter - large
    if (length === 2) return 50;      // Two letters - medium-large
    if (length <= 4) return 40;       // Short words - medium
    if (length <= 8) return 32;       // Medium words - smaller
    return 24;                        // Long words - smallest
  };

  const saveSettingsToFile = () => {
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
    
    toast({
      title: "Settings saved",
      description: "Your settings have been downloaded as a JSON file."
    });
  };

  const loadSettingsFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedSettings = JSON.parse(e.target?.result as string);
        onSettingsChange(loadedSettings);
        toast({
          title: "Settings loaded",
          description: "Your settings have been loaded successfully."
        });
      } catch (error) {
        toast({
          title: "Error loading settings",
          description: "The file format is not valid.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  const copyShareableUrl = async () => {
    try {
      const shareableUrl = generateShareableUrl(settings);
      await navigator.clipboard.writeText(shareableUrl);
      setCopySuccess(true);
      toast({
        title: "Share URL copied!",
        description: "Anyone with this link can view your icon settings."
      });
      
      // Reset the success state after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy URL to clipboard.",
        variant: "destructive"
      });
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
              onChange={(e) => handleTextChange(e.target.value)}
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
                  min={10}
                  max={70}
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

        {/* Export, Save & Share Section */}
        <div className="space-y-4 pb-6">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Export, Save & Share
          </h3>
          
          <Tabs defaultValue="export" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="export" className="text-xs">
                <FileDown className="w-3 h-3 mr-1" />
                Export
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">
                <Settings2 className="w-3 h-3 mr-1" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="share" className="text-xs">
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="export" className="space-y-3 mt-4">
              <Card className="bg-slate-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Platform Formats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
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
                      <span className="text-sm font-medium text-slate-700">iOS App Icons</span>
                      <span className="text-xs text-slate-500 block">
                        Complete Apple app icon set
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
                      <span className="text-sm font-medium text-slate-700">Android Icons</span>
                      <span className="text-xs text-slate-500 block">
                        Play Store & device icons
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
                      <span className="text-sm font-medium text-slate-700">macOS Icons</span>
                      <span className="text-xs text-slate-500 block">
                        Desktop application icons
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
                      <span className="text-sm font-medium text-slate-700">Web Assets</span>
                      <span className="text-xs text-slate-500 block">
                        Favicons, headers, social media
                      </span>
                    </div>
                  </label>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-3 mt-4">
              <Card className="bg-slate-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Configuration Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={saveSettingsToFile}
                    variant="outline"
                    className="w-full text-sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings File
                  </Button>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={loadSettingsFromFile}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="w-full text-sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Load Settings File
                    </Button>
                  </div>
                  
                  <p className="text-xs text-slate-500 text-center">
                    Save and share complete icon configurations as JSON files
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="share" className="space-y-3 mt-4">
              <Card className="bg-slate-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Share Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={copyShareableUrl}
                    variant="outline"
                    className="w-full text-sm"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Share URL
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-slate-500 text-center">
                    Generate a link that recreates your exact icon settings
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
