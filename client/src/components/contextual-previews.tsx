import { IconMakerSettings } from "@/types/icon-maker";

interface ContextualPreviewsProps {
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

export function ContextualPreviews({ settings }: ContextualPreviewsProps) {
  const getLogoStyle = (size: 'small' | 'medium' | 'large') => {
    const sizes = {
      small: 18,
      medium: 24,
      large: 32
    };
    
    return {
      fontFamily: `'${settings.fontFamily}', sans-serif`,
      fontSize: `${sizes[size]}px`,
      fontWeight: settings.fontWeight,
      color: settings.textColor,
      textShadow: settings.dropShadow.enabled 
        ? `${settings.dropShadow.offsetX}px ${settings.dropShadow.offsetY}px ${settings.dropShadow.blur}px rgba(0,0,0,${settings.dropShadow.opacity})` 
        : 'none',
      WebkitTextStroke: settings.textStroke.enabled 
        ? `${settings.textStroke.width}px ${settings.textStroke.color}` 
        : 'initial',
    };
  };

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
    <div className="space-y-8">
      {/* SaaS Landing Page */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">SaaS Landing Page</h3>
        <div className="bg-slate-50 rounded-lg p-4 text-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center text-xs"
                style={getBackgroundStyle()}
              >
                <span style={getLogoStyle('small')}>
                  {getTextForSize(32, settings)}
                </span>
              </div>

            </div>
            <div className="text-xs text-slate-500 space-x-3">
              <span>Features</span>
              <span>Pricing</span>
              <span>Contact</span>
            </div>
          </div>
          
          {/* Hero Section */}
          <div className="text-center py-8">
            <h1 className="text-lg font-bold text-slate-900 mb-2">
              Build faster with {getTextForSize(64, settings)}
            </h1>
            <p className="text-xs text-slate-600 mb-4">
              Professional icon generation and brand asset creation for modern teams
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="px-4 py-2 bg-blue-600 rounded-lg text-white text-xs font-medium hover:bg-blue-700">
                Start Free Trial
              </div>
              <div className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium hover:bg-slate-50">
                View Demo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">App Navigation</h3>
        <div className="bg-slate-900 rounded-lg p-4 text-white text-xs">
          {/* Sidebar */}
          <div className="flex">
            <div className="w-16 border-r border-slate-700 pr-3">
              <div className="flex items-center space-x-2 mb-4">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                  style={getBackgroundStyle()}
                >
                  <span style={getLogoStyle('small')}>
                    {getShortText(settings.text)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-slate-400">
                <div className="w-4 h-1 bg-slate-600 rounded"></div>
                <div className="w-4 h-1 bg-slate-600 rounded"></div>
                <div className="w-4 h-1 bg-slate-600 rounded"></div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 pl-4">
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                  style={getBackgroundStyle()}
                >
                  <span style={getLogoStyle('small')}>
                    {getTextForSize(24, settings)}
                  </span>
                </div>
                <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-1 bg-slate-700 rounded"></div>
                <div className="w-3/4 h-1 bg-slate-700 rounded"></div>
                <div className="w-1/2 h-1 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Home Screen */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Mobile Home Screen</h3>
        <div className="bg-black rounded-lg p-4 text-white">
          {/* Status Bar */}
          <div className="flex justify-between items-center text-xs mb-4">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* App Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* User's App */}
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-xl mb-1 flex items-center justify-center mx-auto shadow-lg"
                style={getBackgroundStyle()}
              >
                <span style={getLogoStyle('medium')}>
                  {getTextForSize(48, settings)}
                </span>
              </div>
              <div className="text-xs truncate text-white">{getTextForSize(48, settings)}</div>
            </div>
            
            {/* Apple Safari */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl mb-1 mx-auto shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-xs text-white">Safari</div>
            </div>
            
            {/* Apple Messages */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl mb-1 mx-auto shadow-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
                </div>
              </div>
              <div className="text-xs text-white">Messages</div>
            </div>
            
            {/* Apple Mail */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl mb-1 mx-auto shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
                <div className="w-6 h-4 bg-white rounded-sm flex items-center justify-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-600"></div>
                </div>
              </div>
              <div className="text-xs text-white">Mail</div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Business Card</h3>
        <div className="bg-white border-2 border-slate-200 rounded-lg p-4 text-xs shadow-sm">
          <div className="text-center">
            <div className="mb-3">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center mx-auto mb-2"
                style={getBackgroundStyle()}
              >
                <span style={getLogoStyle('small')}>
                  {getTextForSize(32, settings)}
                </span>
              </div>
            </div>
            <div className="text-slate-600 space-y-1">
              <div>John Smith</div>
              <div>CEO & Founder</div>
              <div>john@{getTextForSize(64, settings).toLowerCase()}.com</div>
              <div>+1 (555) 123-4567</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}