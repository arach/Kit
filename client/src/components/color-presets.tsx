import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconMakerSettings } from "@/types/icon-maker";

interface ColorPalette {
  name: string;
  colors: string[];
}

interface Theme {
  name: string;
  description: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  backgroundColor: string;
  textColor: string;
  backgroundType: "solid" | "gradient" | "none";
  textStroke: {
    enabled: boolean;
    width: number;
    color: string;
  };
  dropShadow: {
    enabled: boolean;
    offsetX: number;
    offsetY: number;
    blur: number;
    opacity: number;
    color: string;
  };
  textBreakpoints: {
    enabled: boolean;
    smallText: string;
    mediumText: string;
    largeText: string;
    smallMax: number;
    mediumMax: number;
  };
}

interface ColorCombination {
  name: string;
  backgroundColor: string;
  textColor: string;
  description: string;
}

const colorPalettes: ColorPalette[] = [
  {
    name: "Neutrals",
    colors: ["#ffffff", "#f8fafc", "#e2e8f0", "#64748b", "#334155", "#1e293b", "#000000"]
  },
  {
    name: "Blues",
    colors: ["#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8", "#1e3a8a", "#172554"]
  },
  {
    name: "Greens",
    colors: ["#dcfce7", "#86efac", "#22c55e", "#15803d", "#166534", "#14532d"]
  },
  {
    name: "Purples",
    colors: ["#f3e8ff", "#c4b5fd", "#8b5cf6", "#7c3aed", "#6d28d9", "#581c87"]
  },
  {
    name: "Reds",
    colors: ["#fef2f2", "#fca5a5", "#ef4444", "#dc2626", "#b91c1c", "#7f1d1d"]
  },
  {
    name: "Oranges",
    colors: ["#fff7ed", "#fed7aa", "#fb923c", "#ea580c", "#c2410c", "#9a3412"]
  }
];

const colorCombinations: ColorCombination[] = [
  // Light backgrounds with dark text
  { name: "Pure Light", backgroundColor: "#ffffff", textColor: "#000000", description: "Classic contrast" },
  { name: "Soft Light", backgroundColor: "#f8fafc", textColor: "#1e293b", description: "Gentle on eyes" },
  { name: "Warm Light", backgroundColor: "#fef7f0", textColor: "#7c2d12", description: "Warm neutrals" },
  
  // Dark backgrounds with light text
  { name: "Pure Dark", backgroundColor: "#000000", textColor: "#ffffff", description: "Maximum contrast" },
  { name: "Soft Dark", backgroundColor: "#1e293b", textColor: "#f1f5f9", description: "Modern dark" },
  { name: "Cool Dark", backgroundColor: "#0f172a", textColor: "#e2e8f0", description: "Professional" },
  
  // Brand colors
  { name: "Ocean Blue", backgroundColor: "#1e40af", textColor: "#ffffff", description: "Trust & stability" },
  { name: "Forest Green", backgroundColor: "#059669", textColor: "#ffffff", description: "Growth & nature" },
  { name: "Royal Purple", backgroundColor: "#7c3aed", textColor: "#ffffff", description: "Luxury & creativity" },
  { name: "Sunset Orange", backgroundColor: "#ea580c", textColor: "#ffffff", description: "Energy & warmth" },
  { name: "Ruby Red", backgroundColor: "#dc2626", textColor: "#ffffff", description: "Bold & passionate" },
  
  // Subtle combinations
  { name: "Sage", backgroundColor: "#f0f9f0", textColor: "#15803d", description: "Natural & calm" },
  { name: "Sky", backgroundColor: "#eff6ff", textColor: "#1e40af", description: "Open & fresh" },
  { name: "Lavender", backgroundColor: "#faf5ff", textColor: "#7c3aed", description: "Elegant & soft" },
  { name: "Peach", backgroundColor: "#fff7ed", textColor: "#c2410c", description: "Friendly & approachable" },
  
  // High contrast pairs
  { name: "Electric", backgroundColor: "#facc15", textColor: "#000000", description: "High visibility" },
  { name: "Mint", backgroundColor: "#10b981", textColor: "#ffffff", description: "Fresh & modern" },
  { name: "Coral", backgroundColor: "#f472b6", textColor: "#ffffff", description: "Vibrant & playful" },
  { name: "Indigo", backgroundColor: "#4f46e5", textColor: "#ffffff", description: "Deep & sophisticated" },
];

const themes: Theme[] = [
  // Minimalist & Clean
  {
    name: "Pure Minimal",
    description: "Ultra-clean Helvetica on white",
    fontFamily: "Helvetica",
    fontSize: 48,
    fontWeight: 300,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, smallText: "P", mediumText: "PU", largeText: "Pure", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Swiss Precision",
    description: "Crisp Inter with perfect spacing",
    fontFamily: "Inter",
    fontSize: 44,
    fontWeight: 500,
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, smallText: "S", mediumText: "SW", largeText: "Swiss", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Nordic Light",
    description: "Scandinavian-inspired Montserrat",
    fontFamily: "Montserrat",
    fontSize: 42,
    fontWeight: 400,
    backgroundColor: "#f1f5f9",
    textColor: "#334155",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 2, opacity: 0.1, color: "#64748b" },
    textBreakpoints: { enabled: true, smallText: "N", mediumText: "NO", largeText: "Nordic", smallMax: 48, mediumMax: 128 }
  },

  // Corporate & Professional
  {
    name: "Corporate Elite",
    description: "Professional navy with strong presence",
    fontFamily: "Source Sans Pro",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#1e40af",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.3, color: "#1e3a8a" },
    textBreakpoints: { enabled: true, smallText: "C", mediumText: "CO", largeText: "Corp", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Executive Blue",
    description: "Trustworthy Roboto for business",
    fontFamily: "Roboto",
    fontSize: 38,
    fontWeight: 500,
    backgroundColor: "#0f172a",
    textColor: "#60a5fa",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 6, opacity: 0.4, color: "#1e40af" },
    textBreakpoints: { enabled: true, smallText: "E", mediumText: "EX", largeText: "Exec", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Financial Pro",
    description: "Serious Lato for finance sector",
    fontFamily: "Lato",
    fontSize: 36,
    fontWeight: 700,
    backgroundColor: "#374151",
    textColor: "#f9fafb",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 3, opacity: 0.25, color: "#111827" },
    textBreakpoints: { enabled: true, smallText: "F", mediumText: "FI", largeText: "Finance", smallMax: 48, mediumMax: 128 }
  },

  // Tech & Startups
  {
    name: "Silicon Valley",
    description: "Modern gradient with SF Pro styling",
    fontFamily: "SF Pro Display",
    fontSize: 40,
    fontWeight: 500,
    backgroundColor: "#6366f1",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 8, opacity: 0.25, color: "#4338ca" },
    textBreakpoints: { enabled: true, smallText: "S", mediumText: "SV", largeText: "Silicon", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Tech Unicorn",
    description: "Bold Poppins for disruptive brands",
    fontFamily: "Poppins",
    fontSize: 44,
    fontWeight: 600,
    backgroundColor: "#8b5cf6",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 6, blur: 12, opacity: 0.3, color: "#7c3aed" },
    textBreakpoints: { enabled: true, smallText: "T", mediumText: "TE", largeText: "Tech", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Developer Dark",
    description: "Programmer-friendly Fira Code style",
    fontFamily: "Fira Code",
    fontSize: 36,
    fontWeight: 400,
    backgroundColor: "#111827",
    textColor: "#10b981",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 8, opacity: 0.6, color: "#10b981" },
    textBreakpoints: { enabled: true, smallText: "D", mediumText: "DE", largeText: "Dev", smallMax: 48, mediumMax: 128 }
  },

  // Creative & Agency
  {
    name: "Creative Studio",
    description: "Artistic Playfair with sophistication",
    fontFamily: "Playfair Display",
    fontSize: 46,
    fontWeight: 400,
    backgroundColor: "#fef3c7",
    textColor: "#92400e",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 3, offsetY: 3, blur: 6, opacity: 0.2, color: "#d97706" },
    textBreakpoints: { enabled: true, smallText: "C", mediumText: "CR", largeText: "Creative", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Design Agency",
    description: "Modern Nunito Sans for agencies",
    fontFamily: "Nunito Sans",
    fontSize: 42,
    fontWeight: 700,
    backgroundColor: "#ec4899",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 4, blur: 8, opacity: 0.3, color: "#be185d" },
    textBreakpoints: { enabled: true, smallText: "D", mediumText: "DE", largeText: "Design", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Art Director",
    description: "Bold Oswald for creative leadership",
    fontFamily: "Oswald",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#000000",
    textColor: "#fbbf24",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.5, color: "#d97706" },
    textBreakpoints: { enabled: true, smallText: "A", mediumText: "AR", largeText: "Art", smallMax: 48, mediumMax: 128 }
  },

  // Luxury & Premium
  {
    name: "Luxury Gold",
    description: "Elegant Crimson with gold accents",
    fontFamily: "Crimson Text",
    fontSize: 44,
    fontWeight: 600,
    backgroundColor: "#1f2937",
    textColor: "#fbbf24",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 3, blur: 6, opacity: 0.4, color: "#92400e" },
    textBreakpoints: { enabled: true, smallText: "L", mediumText: "LU", largeText: "Luxury", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Royal Purple",
    description: "Regal Libre Baskerville styling",
    fontFamily: "Libre Baskerville",
    fontSize: 42,
    fontWeight: 400,
    backgroundColor: "#581c87",
    textColor: "#faf5ff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 6, opacity: 0.4, color: "#3b0764" },
    textBreakpoints: { enabled: true, smallText: "R", mediumText: "RO", largeText: "Royal", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Diamond Black",
    description: "Premium Cormorant for high-end brands",
    fontFamily: "Cormorant Garamond",
    fontSize: 48,
    fontWeight: 300,
    backgroundColor: "#000000",
    textColor: "#e5e7eb",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 8, opacity: 0.3, color: "#374151" },
    textBreakpoints: { enabled: true, smallText: "D", mediumText: "DI", largeText: "Diamond", smallMax: 48, mediumMax: 128 }
  },

  // Natural & Organic
  {
    name: "Forest Verde",
    description: "Earth-friendly Source Sans Pro",
    fontFamily: "Source Sans Pro",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#059669",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.25, color: "#047857" },
    textBreakpoints: { enabled: true, smallText: "F", mediumText: "FO", largeText: "Forest", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Organic Earth",
    description: "Natural Merriweather for sustainability",
    fontFamily: "Merriweather",
    fontSize: 38,
    fontWeight: 400,
    backgroundColor: "#a3a3a3",
    textColor: "#1c1917",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 3, opacity: 0.2, color: "#78716c" },
    textBreakpoints: { enabled: true, smallText: "O", mediumText: "OR", largeText: "Organic", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Garden Fresh",
    description: "Clean Quicksand for fresh brands",
    fontFamily: "Quicksand",
    fontSize: 36,
    fontWeight: 500,
    backgroundColor: "#dcfce7",
    textColor: "#15803d",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.15, color: "#16a34a" },
    textBreakpoints: { enabled: true, smallText: "G", mediumText: "GA", largeText: "Garden", smallMax: 48, mediumMax: 128 }
  },

  // Gaming & Entertainment
  {
    name: "Retro Gaming",
    description: "Pixelated Silkscreen with bold stroke",
    fontFamily: "Silkscreen",
    fontSize: 32,
    fontWeight: 400,
    backgroundColor: "#ff6b35",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, smallText: "R", mediumText: "RT", largeText: "Retro", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Cyberpunk Neon",
    description: "Futuristic Orbitron with glowing effects",
    fontFamily: "Orbitron",
    fontSize: 38,
    fontWeight: 700,
    backgroundColor: "#000000",
    textColor: "#00ff88",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#00ff88" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 0, blur: 10, opacity: 0.8, color: "#00ff88" },
    textBreakpoints: { enabled: true, smallText: "C", mediumText: "CY", largeText: "Cyber", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Esports Pro",
    description: "Gaming-focused Rajdhani typography",
    fontFamily: "Rajdhani",
    fontSize: 42,
    fontWeight: 600,
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: true, width: 1, color: "#3b0764" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 8, opacity: 0.4, color: "#5b21b6" },
    textBreakpoints: { enabled: true, smallText: "E", mediumText: "ES", largeText: "Esports", smallMax: 48, mediumMax: 128 }
  },

  // Health & Wellness
  {
    name: "Medical Pro",
    description: "Trustworthy Open Sans for healthcare",
    fontFamily: "Open Sans",
    fontSize: 36,
    fontWeight: 600,
    backgroundColor: "#2563eb",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.2, color: "#1d4ed8" },
    textBreakpoints: { enabled: true, smallText: "M", mediumText: "ME", largeText: "Medical", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Wellness Zen",
    description: "Calming PT Sans for mindfulness",
    fontFamily: "PT Sans",
    fontSize: 40,
    fontWeight: 400,
    backgroundColor: "#a7f3d0",
    textColor: "#047857",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 3, opacity: 0.15, color: "#059669" },
    textBreakpoints: { enabled: true, smallText: "W", mediumText: "WE", largeText: "Wellness", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Fitness Power",
    description: "Strong Bebas Neue for fitness brands",
    fontFamily: "Bebas Neue",
    fontSize: 44,
    fontWeight: 400,
    backgroundColor: "#dc2626",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 5, opacity: 0.4, color: "#991b1b" },
    textBreakpoints: { enabled: true, smallText: "F", mediumText: "FI", largeText: "Fitness", smallMax: 48, mediumMax: 128 }
  },

  // Food & Beverage
  {
    name: "Artisan Bakery",
    description: "Warm Dancing Script for bakeries",
    fontFamily: "Dancing Script",
    fontSize: 46,
    fontWeight: 600,
    backgroundColor: "#fef3c7",
    textColor: "#92400e",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.2, color: "#d97706" },
    textBreakpoints: { enabled: true, smallText: "A", mediumText: "AR", largeText: "Artisan", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Coffee House",
    description: "Cozy Alegreya for cafés",
    fontFamily: "Alegreya",
    fontSize: 40,
    fontWeight: 500,
    backgroundColor: "#78716c",
    textColor: "#fef7cd",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.25, color: "#57534e" },
    textBreakpoints: { enabled: true, smallText: "C", mediumText: "CO", largeText: "Coffee", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Fine Dining",
    description: "Elegant Cormorant for upscale restaurants",
    fontFamily: "Cormorant",
    fontSize: 44,
    fontWeight: 300,
    backgroundColor: "#1f2937",
    textColor: "#f3f4f6",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 6, opacity: 0.3, color: "#111827" },
    textBreakpoints: { enabled: true, smallText: "F", mediumText: "FI", largeText: "Fine", smallMax: 48, mediumMax: 128 }
  },

  // Fashion & Beauty
  {
    name: "Fashion Forward",
    description: "Chic Didot for luxury fashion",
    fontFamily: "Didot",
    fontSize: 48,
    fontWeight: 400,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: false, offsetX: 0, offsetY: 0, blur: 0, opacity: 0, color: "#000000" },
    textBreakpoints: { enabled: true, smallText: "F", mediumText: "FA", largeText: "Fashion", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Beauty Glow",
    description: "Soft Quattrocento for cosmetics",
    fontFamily: "Quattrocento",
    fontSize: 38,
    fontWeight: 400,
    backgroundColor: "#fdf2f8",
    textColor: "#be185d",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 6, opacity: 0.2, color: "#ec4899" },
    textBreakpoints: { enabled: true, smallText: "B", mediumText: "BE", largeText: "Beauty", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Boutique Chic",
    description: "Trendy Raleway for boutiques",
    fontFamily: "Raleway",
    fontSize: 36,
    fontWeight: 300,
    backgroundColor: "#f8fafc",
    textColor: "#334155",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 2, opacity: 0.1, color: "#64748b" },
    textBreakpoints: { enabled: true, smallText: "B", mediumText: "BO", largeText: "Boutique", smallMax: 48, mediumMax: 128 }
  },

  // Education & Learning
  {
    name: "Academic Pro",
    description: "Scholarly Libre Franklin for education",
    fontFamily: "Libre Franklin",
    fontSize: 38,
    fontWeight: 500,
    backgroundColor: "#1e3a8a",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.2, color: "#1e40af" },
    textBreakpoints: { enabled: true, smallText: "A", mediumText: "AC", largeText: "Academic", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Learning Lab",
    description: "Friendly Karla for online learning",
    fontFamily: "Karla",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#059669",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 3, blur: 6, opacity: 0.25, color: "#047857" },
    textBreakpoints: { enabled: true, smallText: "L", mediumText: "LE", largeText: "Learning", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Kids Education",
    description: "Playful Fredoka One for children",
    fontFamily: "Fredoka One",
    fontSize: 42,
    fontWeight: 400,
    backgroundColor: "#fbbf24",
    textColor: "#1f2937",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 4, opacity: 0.2, color: "#f59e0b" },
    textBreakpoints: { enabled: true, smallText: "K", mediumText: "KI", largeText: "Kids", smallMax: 48, mediumMax: 128 }
  },

  // Travel & Adventure
  {
    name: "Adventure Trail",
    description: "Bold Rubik for outdoor brands",
    fontFamily: "Rubik",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#dc2626",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 5, opacity: 0.3, color: "#991b1b" },
    textBreakpoints: { enabled: true, smallText: "A", mediumText: "AD", largeText: "Adventure", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Travel Escape",
    description: "Wanderlust-inspired Cabin for travel",
    fontFamily: "Cabin",
    fontSize: 38,
    fontWeight: 500,
    backgroundColor: "#0ea5e9",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 3, blur: 6, opacity: 0.25, color: "#0284c7" },
    textBreakpoints: { enabled: true, smallText: "T", mediumText: "TR", largeText: "Travel", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Ocean Blue",
    description: "Refreshing Nunito for beach brands",
    fontFamily: "Nunito",
    fontSize: 36,
    fontWeight: 400,
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 6, opacity: 0.2, color: "#1e40af" },
    textBreakpoints: { enabled: true, smallText: "O", mediumText: "OC", largeText: "Ocean", smallMax: 48, mediumMax: 128 }
  },

  // Real Estate & Architecture
  {
    name: "Real Estate Pro",
    description: "Trustworthy Work Sans for property",
    fontFamily: "Work Sans",
    fontSize: 36,
    fontWeight: 500,
    backgroundColor: "#374151",
    textColor: "#f9fafb",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.2, color: "#111827" },
    textBreakpoints: { enabled: true, smallText: "R", mediumText: "RE", largeText: "Real", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Architecture Studio",
    description: "Modern Barlow for architects",
    fontFamily: "Barlow",
    fontSize: 42,
    fontWeight: 400,
    backgroundColor: "#f3f4f6",
    textColor: "#1f2937",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 2, opacity: 0.1, color: "#374151" },
    textBreakpoints: { enabled: true, smallText: "A", mediumText: "AR", largeText: "Arch", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Luxury Homes",
    description: "Upscale Spectral for luxury real estate",
    fontFamily: "Spectral",
    fontSize: 44,
    fontWeight: 300,
    backgroundColor: "#1f2937",
    textColor: "#fbbf24",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 2, blur: 4, opacity: 0.3, color: "#92400e" },
    textBreakpoints: { enabled: true, smallText: "L", mediumText: "LU", largeText: "Luxury", smallMax: 48, mediumMax: 128 }
  },

  // Music & Entertainment
  {
    name: "Music Studio",
    description: "Rhythmic Exo for music production",
    fontFamily: "Exo",
    fontSize: 40,
    fontWeight: 600,
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    backgroundType: "gradient",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 4, blur: 8, opacity: 0.3, color: "#5b21b6" },
    textBreakpoints: { enabled: true, smallText: "M", mediumText: "MU", largeText: "Music", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Concert Vibes",
    description: "Energetic Righteous for live music",
    fontFamily: "Righteous",
    fontSize: 38,
    fontWeight: 400,
    backgroundColor: "#ec4899",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 1, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 2, offsetY: 3, blur: 5, opacity: 0.4, color: "#be185d" },
    textBreakpoints: { enabled: true, smallText: "C", mediumText: "CO", largeText: "Concert", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Jazz Club",
    description: "Smooth EB Garamond for jazz venues",
    fontFamily: "EB Garamond",
    fontSize: 42,
    fontWeight: 400,
    backgroundColor: "#1f2937",
    textColor: "#fbbf24",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 6, opacity: 0.3, color: "#92400e" },
    textBreakpoints: { enabled: true, smallText: "J", mediumText: "JA", largeText: "Jazz", smallMax: 48, mediumMax: 128 }
  },

  // Sports & Fitness
  {
    name: "Sports Team",
    description: "Athletic Anton for sports brands",
    fontFamily: "Anton",
    fontSize: 44,
    fontWeight: 400,
    backgroundColor: "#dc2626",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: true, width: 2, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 3, offsetY: 3, blur: 4, opacity: 0.5, color: "#991b1b" },
    textBreakpoints: { enabled: true, smallText: "S", mediumText: "SP", largeText: "Sports", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Athletic Performance",
    description: "Dynamic Roboto Condensed for athletics",
    fontFamily: "Roboto Condensed",
    fontSize: 40,
    fontWeight: 700,
    backgroundColor: "#1f2937",
    textColor: "#10b981",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 0, offsetY: 3, blur: 6, opacity: 0.4, color: "#059669" },
    textBreakpoints: { enabled: true, smallText: "A", mediumText: "AT", largeText: "Athletic", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Yoga Studio",
    description: "Peaceful Lora for mindful movement",
    fontFamily: "Lora",
    fontSize: 38,
    fontWeight: 400,
    backgroundColor: "#a7f3d0",
    textColor: "#047857",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 1, blur: 3, opacity: 0.15, color: "#059669" },
    textBreakpoints: { enabled: true, smallText: "Y", mediumText: "YO", largeText: "Yoga", smallMax: 48, mediumMax: 128 }
  },

  // Legal & Professional Services
  {
    name: "Law Firm",
    description: "Authoritative Trajan Pro for legal",
    fontFamily: "Trajan Pro",
    fontSize: 36,
    fontWeight: 400,
    backgroundColor: "#1e3a8a",
    textColor: "#ffffff",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.25, color: "#1e40af" },
    textBreakpoints: { enabled: true, smallText: "L", mediumText: "LA", largeText: "Law", smallMax: 48, mediumMax: 128 }
  },
  {
    name: "Consulting Pro",
    description: "Professional IBM Plex Sans for consultants",
    fontFamily: "IBM Plex Sans",
    fontSize: 38,
    fontWeight: 500,
    backgroundColor: "#374151",
    textColor: "#f9fafb",
    backgroundType: "solid",
    textStroke: { enabled: false, width: 0, color: "#000000" },
    dropShadow: { enabled: true, offsetX: 1, offsetY: 2, blur: 4, opacity: 0.2, color: "#111827" },
    textBreakpoints: { enabled: true, smallText: "C", mediumText: "CO", largeText: "Consult", smallMax: 48, mediumMax: 128 }
  }
];

interface ColorPresetsProps {
  onApplyPreset: (preset: Partial<IconMakerSettings>) => void;
}

export function ColorPresets({ onApplyPreset }: ColorPresetsProps) {
  const handleColorClick = (color: string, type: 'background' | 'text') => {
    if (type === 'background') {
      onApplyPreset({ backgroundColor: color });
    } else {
      onApplyPreset({ textColor: color });
    }
  };

  const handleCombinationClick = (combination: ColorCombination) => {
    onApplyPreset({
      backgroundColor: combination.backgroundColor,
      textColor: combination.textColor,
      backgroundType: "solid"
    });
  };

  const handleThemeClick = (theme: Theme) => {
    onApplyPreset({
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      backgroundType: theme.backgroundType,
      textStroke: {
        enabled: theme.strokeEnabled,
        color: theme.strokeColor,
        width: 2
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
        Colors & Themes
      </h3>
      
      <Tabs defaultValue="combinations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="combinations">Combos</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="palettes">Colors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="combinations" className="space-y-3 mt-4">
          <div className="grid grid-cols-1 gap-2">
            {colorCombinations.map((combination) => (
              <Button
                key={combination.name}
                variant="outline"
                onClick={() => handleCombinationClick(combination)}
                className="h-auto p-3 flex items-center space-x-3 hover:border-primary justify-start"
              >
                {/* Color Preview */}
                <div className="flex items-center space-x-1">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: combination.backgroundColor }}
                  />
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: combination.textColor }}
                  />
                </div>
                
                <div className="text-left flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900">
                    {combination.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {combination.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="themes" className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.name}
                variant="outline"
                onClick={() => handleThemeClick(theme)}
                className="h-auto p-2 flex flex-col items-center space-y-2 hover:border-primary"
              >
                {/* Theme Preview */}
                <div className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded border"
                    style={{
                      backgroundColor: theme.backgroundColor === "transparent" ? "#f8fafc" : theme.backgroundColor,
                      border: theme.backgroundColor === "transparent" ? "1px dashed #cbd5e1" : `1px solid ${theme.strokeColor}`
                    }}
                  />
                  <div
                    className="w-3 h-3 rounded border"
                    style={{
                      backgroundColor: theme.textColor,
                      border: theme.strokeEnabled ? `1px solid ${theme.strokeColor}` : '1px solid #e2e8f0'
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-slate-900">
                    {theme.name}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="palettes" className="space-y-3 mt-4">
          {colorPalettes.map((palette) => (
            <div key={palette.name} className="space-y-2">
              <h4 className="text-xs font-medium text-slate-700">{palette.name}</h4>
              <div className="grid grid-cols-6 gap-1">
                {palette.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color, 'background')}
                    className="w-full h-8 rounded border border-slate-200 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    title={`Apply ${color}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}