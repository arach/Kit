import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Edit3, Palette, Type, Zap, Eye, Paintbrush, Layers } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { useState } from "react";

// Helper function to convert hex to RGB
function hexToRgb(hex: string): number[] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// Helper function to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

// Helper function to convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}



// Generate smart complementary colors based on current colors
function generateSmartPalette(backgroundColor: string, textColor: string): { 
  name: string; 
  colors: string[]; 
  description: string; 
}[] {
  const bgRgb = hexToRgb(backgroundColor);
  const textRgb = hexToRgb(textColor);
  
  if (!bgRgb || !textRgb) return [];
  
  const [bgH, bgS, bgL] = rgbToHsl(bgRgb[0], bgRgb[1], bgRgb[2]);
  const [textH, textS, textL] = rgbToHsl(textRgb[0], textRgb[1], textRgb[2]);
  
  return [
    {
      name: "Complementary",
      description: "Colors opposite on the color wheel",
      colors: [
        hslToHex((bgH + 180) % 360, bgS, bgL),
        hslToHex((textH + 180) % 360, textS, textL),
        hslToHex((bgH + 150) % 360, bgS, bgL),
        hslToHex((bgH + 210) % 360, bgS, bgL),
        hslToHex((textH + 150) % 360, textS, textL),
        hslToHex((textH + 210) % 360, textS, textL)
      ]
    },
    {
      name: "Analogous",
      description: "Similar colors for harmony",
      colors: [
        hslToHex((bgH + 30) % 360, bgS, bgL),
        hslToHex((bgH - 30 + 360) % 360, bgS, bgL),
        hslToHex((textH + 30) % 360, textS, textL),
        hslToHex((textH - 30 + 360) % 360, textS, textL),
        hslToHex((bgH + 60) % 360, bgS, bgL),
        hslToHex((bgH - 60 + 360) % 360, bgS, bgL)
      ]
    },
    {
      name: "Triadic",
      description: "Evenly spaced for vibrant contrast",
      colors: [
        hslToHex((bgH + 120) % 360, bgS, bgL),
        hslToHex((bgH + 240) % 360, bgS, bgL),
        hslToHex((textH + 120) % 360, textS, textL),
        hslToHex((textH + 240) % 360, textS, textL),
        hslToHex((bgH + 120) % 360, Math.max(20, bgS - 20), bgL),
        hslToHex((bgH + 240) % 360, Math.max(20, bgS - 20), bgL)
      ]
    },
    {
      name: "Monochromatic",
      description: "Same hue, different lightness",
      colors: [
        hslToHex(bgH, bgS, Math.max(10, bgL - 30)),
        hslToHex(bgH, bgS, Math.max(10, bgL - 15)),
        hslToHex(bgH, bgS, Math.min(90, bgL + 15)),
        hslToHex(bgH, bgS, Math.min(90, bgL + 30)),
        hslToHex(textH, textS, Math.max(10, textL - 20)),
        hslToHex(textH, textS, Math.min(90, textL + 20))
      ]
    },
    {
      name: "Tonal Variations",
      description: "Saturation and lightness shifts",
      colors: [
        hslToHex(bgH, Math.max(10, bgS - 30), bgL),
        hslToHex(bgH, Math.min(90, bgS + 30), bgL),
        hslToHex(bgH, bgS, Math.max(20, bgL - 20)),
        hslToHex(bgH, bgS, Math.min(80, bgL + 20)),
        hslToHex(textH, Math.max(10, textS - 20), textL),
        hslToHex(textH, Math.min(90, textS + 20), textL)
      ]
    }
  ];
}

interface ThemeSummaryCardProps {
  settings: IconMakerSettings;
  onSettingsChange: (updates: Partial<IconMakerSettings>) => void;
  currentTheme?: string;
}

const fontWeights = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" }
];



export function ThemeSummaryCard({ settings, onSettingsChange, currentTheme }: ThemeSummaryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'colors' | 'effects'>('overview');

  const handleColorChange = (color: string, type: "background" | "text" | "stroke") => {
    if (type === "background") {
      onSettingsChange({ backgroundColor: color });
    } else if (type === "text") {
      onSettingsChange({ textColor: color });
    } else if (type === "stroke") {
      onSettingsChange({ 
        textStroke: { ...settings.textStroke, color } 
      });
    }
  };

  // Enhanced preview of current settings
  const previewStyle = {
    fontFamily: settings.fontFamily,
    fontSize: '32px',
    fontWeight: settings.fontWeight,
    color: settings.textColor,
    backgroundColor: settings.backgroundColor,
    textShadow: settings.dropShadow.enabled 
      ? `${settings.dropShadow.offsetX}px ${settings.dropShadow.offsetY}px ${settings.dropShadow.blur}px rgba(0,0,0,${settings.dropShadow.opacity})`
      : 'none',
    WebkitTextStroke: settings.textStroke.enabled 
      ? `${settings.textStroke.width}px ${settings.textStroke.color}`
      : 'none'
  };

  return (
    <Card className="w-80 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Theme View
          </CardTitle>
          <Button
            variant={isEditing ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        {currentTheme && (
          <Badge variant="secondary" className="w-fit">
            {currentTheme}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Enhanced Preview */}
        <div className="border rounded-lg p-6 text-center">
          <div 
            style={previewStyle}
            className="px-4 py-2 rounded inline-block"
          >
            S
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Live Preview
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={activeSection === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('overview')}
            className="flex-1 text-xs"
          >
            <Type className="w-3 h-3 mr-1" />
            Overview
          </Button>
          <Button
            variant={activeSection === 'colors' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('colors')}
            className="flex-1 text-xs"
          >
            <Paintbrush className="w-3 h-3 mr-1" />
            Colors
          </Button>
          <Button
            variant={activeSection === 'effects' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('effects')}
            className="flex-1 text-xs"
          >
            <Layers className="w-3 h-3 mr-1" />
            Effects
          </Button>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Font Family:</span>
                <span className="font-medium text-right max-w-[140px] truncate">{settings.fontFamily}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Font Size:</span>
                <span className="font-medium">{settings.fontSize}px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Font Weight:</span>
                <span className="font-medium">{settings.fontWeight}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Background Type:</span>
                <span className="font-medium capitalize">{settings.backgroundType}</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Quick Controls */}
            {isEditing && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Font Size</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => onSettingsChange({ fontSize: value })}
                      min={10}
                      max={70}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm w-12 text-right">
                      {settings.fontSize}px
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Font Weight</Label>
                  <Select 
                    value={settings.fontWeight.toString()} 
                    onValueChange={(value) => onSettingsChange({ fontWeight: parseInt(value) })}
                  >
                    <SelectTrigger className="mt-1">
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
              </div>
            )}
          </div>
        )}

        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div className="space-y-4">
            {/* Current Colors with Details */}
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Background Color</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: settings.backgroundColor }}
                      onClick={() => navigator.clipboard.writeText(settings.backgroundColor)}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-mono">{settings.backgroundColor}</div>
                      <div className="text-xs text-muted-foreground">
                        {hexToRgb(settings.backgroundColor) && `RGB(${hexToRgb(settings.backgroundColor)!.join(', ')})`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Text Color</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: settings.textColor }}
                      onClick={() => navigator.clipboard.writeText(settings.textColor)}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-mono">{settings.textColor}</div>
                      <div className="text-xs text-muted-foreground">
                        {hexToRgb(settings.textColor) && `RGB(${hexToRgb(settings.textColor)!.join(', ')})`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {settings.textStroke.enabled && (
                <div>
                  <Label className="text-sm font-medium">Stroke Color</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: settings.textStroke.color }}
                        onClick={() => navigator.clipboard.writeText(settings.textStroke.color)}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-mono">{settings.textStroke.color}</div>
                        <div className="text-xs text-muted-foreground">
                          {hexToRgb(settings.textStroke.color) && `RGB(${hexToRgb(settings.textStroke.color)!.join(', ')})`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Color Recommendations */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Color Suggestions</Label>
              
              {/* Smart Recommendations */}
              <div className="space-y-2">
                {['Triadic', 'Monochromatic', 'Tonal Variations'].map((paletteName, index) => {
                  const palette = generateSmartPalette(settings.backgroundColor, settings.textColor)
                    .find(p => p.name === paletteName);
                  
                  if (!palette) return null;
                  
                  return (
                    <div key={index} className="p-2 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-medium">{palette.name}</div>
                        <div className="text-xs text-blue-600">
                          Use Color Palette ←
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {palette.description}
                      </div>
                      <div className="flex gap-1">
                        {palette.colors.slice(0, 4).map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-4 h-4 rounded border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Tip */}
              <div className="p-2 bg-blue-50 rounded-lg border-l-2 border-blue-200">
                <div className="text-xs font-medium text-blue-800 mb-1">Tip</div>
                <div className="text-xs text-blue-700">
                  Use the Color Palette on the left to try these suggested colors
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Effects Section */}
        {activeSection === 'effects' && (
          <div className="space-y-4">
            {/* Effects Overview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Drop Shadow</Label>
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
                <div className="ml-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Offset:</span>
                    <span>{settings.dropShadow.offsetX}px, {settings.dropShadow.offsetY}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blur:</span>
                    <span>{settings.dropShadow.blur}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Opacity:</span>
                    <span>{Math.round(settings.dropShadow.opacity * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: settings.dropShadow.color }}
                      />
                      <span className="font-mono text-xs">{settings.dropShadow.color}</span>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Text Stroke</Label>
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
                <div className="ml-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Width:</span>
                    <span>{settings.textStroke.width}px</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: settings.textStroke.color }}
                      />
                      <span className="font-mono text-xs">{settings.textStroke.color}</span>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Smart Text Breakpoints</Label>
                <Checkbox
                  checked={settings.textBreakpoints.enabled}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      textBreakpoints: { ...settings.textBreakpoints, enabled: !!checked } 
                    })
                  }
                />
              </div>

              {settings.textBreakpoints.enabled && (
                <div className="ml-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Small (≤{settings.textBreakpoints.smallMax}px):</span>
                    <span className="font-medium">{settings.textBreakpoints.smallText}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medium (≤{settings.textBreakpoints.mediumMax}px):</span>
                    <span className="font-medium">{settings.textBreakpoints.mediumText}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Large (&gt;{settings.textBreakpoints.mediumMax}px):</span>
                    <span className="font-medium">{settings.textBreakpoints.largeText}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Effects Status */}
        <div className="flex flex-wrap gap-1">
          {settings.dropShadow.enabled && (
            <Badge variant="outline" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Shadow
            </Badge>
          )}
          {settings.textStroke.enabled && (
            <Badge variant="outline" className="text-xs">
              <Type className="w-3 h-3 mr-1" />
              Stroke
            </Badge>
          )}
          {settings.textBreakpoints.enabled && (
            <Badge variant="outline" className="text-xs">
              Smart Text
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}