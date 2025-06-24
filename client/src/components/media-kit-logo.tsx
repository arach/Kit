interface MediaKitLogoProps {
  className?: string;
}

export function MediaKitLogo({ className = "w-8 h-8" }: MediaKitLogoProps) {
  return (
    <div className={`${className} bg-primary rounded-lg flex items-center justify-center shadow-sm`}>
      {/* Main folder/briefcase shape */}
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-5 h-5 text-white"
        stroke="currentColor" 
        strokeWidth="1.5"
      >
        {/* Briefcase/Media Kit shape */}
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <rect x="3" y="7" width="18" height="12" rx="2" ry="2" />
        <path d="M9 15h6" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
      </svg>
    </div>
  );
}