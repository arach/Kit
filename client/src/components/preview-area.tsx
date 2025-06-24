import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import { IconMakerSettings } from "@/types/icon-maker";
import { renderIconToCanvas, getShortText } from "@/lib/canvas-renderer";

interface PreviewAreaProps {
  settings: IconMakerSettings;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      renderIconToCanvas(canvasRef.current, settings, dimensions);
    }
  }, [settings, dimensions]);

  if (showMultipleSizes) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{size}</span>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
            <span className="text-xs font-semibold text-slate-900" style={{ fontFamily: `'${settings.fontFamily}', sans-serif` }}>
              {getShortText(settings.text)}
            </span>
          </div>
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
            <span className="text-sm font-semibold text-slate-900" style={{ 
              fontFamily: `'${settings.fontFamily}', sans-serif`,
              textShadow: settings.dropShadow.enabled ? `${settings.dropShadow.offsetX}px ${settings.dropShadow.offsetY}px ${settings.dropShadow.blur}px rgba(0,0,0,${settings.dropShadow.opacity})` : 'none'
            }}>
              {getShortText(settings.text)}
            </span>
          </div>
          <canvas 
            ref={canvasRef} 
            width={128} 
            height={128} 
            className="border border-slate-200 rounded-lg shadow-lg"
            style={{ width: '128px', height: '128px' }}
          />
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
        <canvas 
          ref={canvasRef} 
          width={dimensions.width} 
          height={dimensions.height} 
          className={`border border-slate-200 ${borderRadius} ${title.includes('iOS') ? 'shadow-lg' : ''}`}
          style={{ width: '128px', height: '128px' }}
        />
      </div>
    </div>
  );
}

export function PreviewArea({ settings }: PreviewAreaProps) {
  const wordmarkCanvasRef = useRef<HTMLCanvasElement>(null);
  const socialCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (wordmarkCanvasRef.current) {
      renderIconToCanvas(wordmarkCanvasRef.current, {
        ...settings,
        text: settings.text,
        fontSize: 72
      }, { width: 600, height: 200 });
    }
  }, [settings]);

  useEffect(() => {
    if (socialCanvasRef.current) {
      renderIconToCanvas(socialCanvasRef.current, {
        ...settings,
        text: settings.text,
        fontSize: 32
      }, { width: 320, height: 160 });
    }
  }, [settings]);

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
                  <canvas 
                    ref={wordmarkCanvasRef} 
                    width={600} 
                    height={200} 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <p className="text-sm text-slate-500 mt-2">Professional Icon Generator</p>
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
                <canvas 
                  ref={socialCanvasRef} 
                  width={320} 
                  height={160} 
                  className="border border-slate-200 rounded-lg shadow-sm"
                  style={{ width: '160px', height: '80px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
