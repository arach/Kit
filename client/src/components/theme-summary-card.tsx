import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit3, Palette, Type, Zap } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { useState } from "react";

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

  // Quick preview of current settings
  const previewStyle = {
    fontFamily: settings.fontFamily,
    fontSize: '24px',
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
    <Card className="w-80 h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Summary
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
        {/* Quick Preview */}
        <div className="border rounded-lg p-4 text-center">
          <div 
            style={previewStyle}
            className="px-2 py-1 rounded inline-block"
          >
            S
          </div>
        </div>

        {/* Current Settings Overview */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Font:</span>
            <span className="font-medium">{settings.fontFamily}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Size:</span>
            <span className="font-medium">{settings.fontSize}px</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Weight:</span>
            <span className="font-medium">{settings.fontWeight}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Background:</span>
            <div 
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: settings.backgroundColor }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Text Color:</span>
            <div 
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: settings.textColor }}
            />
          </div>
        </div>

        {/* Theme Editor */}
        {isEditing && (
          <div className="space-y-4 pt-2 border-t">
            <h4 className="font-medium flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Quick Edit
            </h4>
            
            {/* Font Size */}
            <div>
              <Label className="text-sm">Font Size</Label>
              <div className="flex items-center space-x-3 mt-1">
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

            {/* Font Weight */}
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

            {/* Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Background</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="color"
                    value={settings.backgroundColor}
                    onChange={(e) => handleColorChange(e.target.value, "background")}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm">Text</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="color"
                    value={settings.textColor}
                    onChange={(e) => handleColorChange(e.target.value, "text")}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Text Effects Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Drop Shadow</Label>
                <Checkbox
                  checked={settings.dropShadow.enabled}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      dropShadow: { ...settings.dropShadow, enabled: !!checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Text Stroke</Label>
                <Checkbox
                  checked={settings.textStroke.enabled}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      textStroke: { ...settings.textStroke, enabled: !!checked } 
                    })
                  }
                />
              </div>
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