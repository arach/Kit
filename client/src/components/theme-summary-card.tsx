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

// Comprehensive color palettes for the theme view
const colorPalettes = {
  grays: ["#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#000000"],
  blues: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"],
  greens: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"],
  reds: ["#fef2f2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"],
  yellows: ["#fefce8", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f"],
  purples: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7c3aed", "#6d28d9", "#5b21b6"],
  pinks: ["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843"],
  oranges: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#dc2626", "#c2410c", "#9a3412"]
};

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

            {/* Color Palettes */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Color Palettes</Label>
              
              {Object.entries(colorPalettes).map(([paletteName, colors]) => (
                <div key={paletteName}>
                  <div className="text-xs font-medium text-muted-foreground mb-2 capitalize">
                    {paletteName}
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded border border-gray-200 hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color, "background")}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleColorChange(color, "text");
                        }}
                        title={`${color} | Left: Background | Right: Text`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Color Inputs */}
            {isEditing && (
              <div className="space-y-3">
                <Separator />
                <Label className="text-sm font-medium">Custom Colors</Label>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Background</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={settings.backgroundColor}
                        onChange={(e) => handleColorChange(e.target.value, "background")}
                        className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={settings.backgroundColor}
                        onChange={(e) => handleColorChange(e.target.value, "background")}
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Text</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => handleColorChange(e.target.value, "text")}
                        className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={settings.textColor}
                        onChange={(e) => handleColorChange(e.target.value, "text")}
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
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