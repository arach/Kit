import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, X, Check } from "lucide-react";
import { FaApple, FaAndroid, FaGlobe } from "react-icons/fa";
import { IconMakerSettings } from "@/types/icon-maker";
import { exportIconBundle, exportSingleFormat } from "@/lib/export-utils";

interface ExportPanelProps {
  settings: IconMakerSettings;
  onClose: () => void;
}

export function ExportPanel({ settings, onClose }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async (format: string) => {
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      if (format === "all") {
        await exportIconBundle(settings, (progress) => setExportProgress(progress));
      } else {
        await exportSingleFormat(settings, format);
      }
      
      setExportComplete(true);
      setTimeout(() => {
        setIsExporting(false);
        setExportComplete(false);
        setExportProgress(0);
      }, 2000);
    } catch (error) {
      console.error("Export failed:", error);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Export Your Icons</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {isExporting ? (
          <div className="py-8">
            {exportComplete ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Export Complete!</h3>
                <p className="text-slate-600">Your icons have been downloaded successfully.</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Exporting Icons...</h3>
                <p className="text-slate-600 mb-4">Generating your icon bundle</p>
                <Progress value={exportProgress} className="w-full max-w-sm mx-auto" />
                <p className="text-sm text-slate-500 mt-2">{exportProgress}% complete</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-sm text-slate-600">Ready to export</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="p-6 h-auto flex flex-col items-center space-y-3 hover:border-primary hover:bg-primary/5"
                onClick={() => handleExport("ios")}
                disabled={!settings.exportFormats.ios}
              >
                <FaApple className="text-2xl text-slate-400" />
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-900">iOS Bundle</div>
                  <div className="text-xs text-slate-500">PNG, Multiple Sizes</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="p-6 h-auto flex flex-col items-center space-y-3 hover:border-primary hover:bg-primary/5"
                onClick={() => handleExport("android")}
                disabled={!settings.exportFormats.android}
              >
                <FaAndroid className="text-2xl text-slate-400" />
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-900">Android Bundle</div>
                  <div className="text-xs text-slate-500">PNG, Multiple Densities</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="p-6 h-auto flex flex-col items-center space-y-3 hover:border-primary hover:bg-primary/5"
                onClick={() => handleExport("web")}
                disabled={!settings.exportFormats.web}
              >
                <FaGlobe className="text-2xl text-slate-400" />
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-900">Web Bundle</div>
                  <div className="text-xs text-slate-500">PNG, SVG, ICO</div>
                </div>
              </Button>

              <Button
                className="p-6 h-auto flex flex-col items-center space-y-3 bg-primary hover:bg-primary/90"
                onClick={() => handleExport("all")}
              >
                <Download className="text-2xl text-white" />
                <div className="text-center">
                  <div className="text-sm font-medium text-white">All Formats</div>
                  <div className="text-xs text-primary-foreground/80">Complete Package</div>
                </div>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="text-sm font-medium text-slate-900 mb-2">Export Details</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• High-resolution PNG files for all platforms</li>
                <li>• SVG vector format for web use</li>
                <li>• ICO format for favicons</li>
                <li>• Organized folder structure</li>
                <li>• Retina-ready assets</li>
              </ul>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
