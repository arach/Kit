interface GoogleFont {
  family: string;
  variants: string[];
}

const POPULAR_FONTS = [
  "Roboto",
  "Open Sans", 
  "Lato",
  "Montserrat",
  "Poppins",
  "Inter",
  "Playfair Display",
  "Merriweather",
  "Ubuntu",
  "Nunito",
  "Source Sans Pro",
  "Raleway",
  "Work Sans",
  "Fira Sans",
  "PT Sans"
];

export async function getAvailableFonts(): Promise<string[]> {
  // For now, return popular fonts. In a full implementation,
  // you would fetch from Google Fonts API
  return POPULAR_FONTS;
}

export async function loadGoogleFont(
  fontFamily: string, 
  weights: number[] = [400]
): Promise<void> {
  // Check if font is already loaded
  const fontFaceSet = (document as any).fonts;
  if (fontFaceSet) {
    const fontFace = `${weights[0]} 16px "${fontFamily}"`;
    const isLoaded = fontFaceSet.check(fontFace);
    if (isLoaded) return;
  }

  // Create font link
  const weightsStr = weights.join(';');
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@${weightsStr}&display=swap`;
  
  // Check if link already exists
  const existingLink = document.querySelector(`link[href*="${fontFamily.replace(' ', '+')}"]`);
  if (existingLink) return;

  // Create and append link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl;
  document.head.appendChild(link);

  // Wait for font to load
  return new Promise((resolve) => {
    link.onload = () => {
      // Give browser time to parse the font
      setTimeout(resolve, 100);
    };
    link.onerror = () => {
      console.warn(`Failed to load font: ${fontFamily}`);
      resolve();
    };
  });
}

export async function getFontWeights(fontFamily: string): Promise<number[]> {
  // Return common weights for now
  // In full implementation, would query Google Fonts API
  return [300, 400, 500, 600, 700, 800];
}
