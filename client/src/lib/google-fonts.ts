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
  "Silkscreen",
  "Orbitron",
  "Quantico",
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

// Extended Google Fonts list for search
const GOOGLE_FONTS_LIST = [
  "ABeeZee", "Abel", "Abhaya Libre", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro",
  "Aguafina Script", "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya Sans", "Alegreya Sans SC",
  "Alegreya SC", "Aleo", "Alex Brush", "Alfa Slab One", "Alice", "Alike", "Alike Angular", "Allan",
  "Allerta", "Allerta Stencil", "Allura", "Almarai", "Almendra", "Almendra Display", "Almendra SC",
  "Amarante", "Amaranth", "Amatic SC", "Amethysta", "Amiko", "Amiri", "Amita", "Anaheim", "Andada Pro",
  "Andika", "Angkor", "Annie Use Your Telescope", "Anonymous Pro", "Antic", "Antic Didone", "Antic Slab",
  "Anton", "Arapey", "Arbutus", "Arbutus Slab", "Architects Daughter", "Archivo", "Archivo Black",
  "Archivo Narrow", "Aref Ruqaa", "Arima Madurai", "Arimo", "Arizonia", "Armata", "Arsenal", "Artifika",
  "Arvo", "Arya", "Asap", "Asap Condensed", "Asar", "Asset", "Assistant", "Astloch", "Asul", "Athiti",
  "Atma", "Atomic Age", "Aubrey", "Audiowide", "Autour One", "Average", "Average Sans", "Averia Gruesa Libre",
  "Averia Libre", "Averia Sans Libre", "Averia Serif Libre", "B612", "B612 Mono", "Bad Script", "Bahiana",
  "Bahianita", "Bai Jamjuree", "Ballet", "Baloo", "Baloo Bhai", "Baloo Bhaijaan", "Baloo Bhaina", "Baloo Chettan",
  "Baloo Da", "Baloo Paaji", "Baloo Tamma", "Baloo Tammudu", "Baloo Thambi", "Balsamiq Sans", "Balthazar",
  "Bangers", "Barlow", "Barlow Condensed", "Barlow Semi Condensed", "Barriecito", "Barrio", "Basic",
  "Baskervville", "Battambang", "Baumans", "Bayon", "Be Vietnam Pro", "Bebas Neue", "Belgrano", "Bellefair",
  "Belleza", "Bellota", "Bellota Text", "BenchNine", "Bentham", "Berkshire Swash", "Bevan", "Big Shoulders Display",
  "Big Shoulders Inline Display", "Big Shoulders Inline Text", "Big Shoulders Stencil Display", "Big Shoulders Stencil Text",
  "Big Shoulders Text", "Bigelow Rules", "Bigshot One", "Bilbo", "Bilbo Swash Caps", "BioRhyme", "BioRhyme Expanded",
  "Biryani", "Bitter", "Black And White Picture", "Black Han Sans", "Black Ops One", "Blinker", "Bodoni Moda",
  "Bokor", "Bonbon", "Boogaloo", "Bowlby One", "Bowlby One SC", "Brawler", "Bree Serif", "Bubblegum Sans",
  "Bubbler One", "Buda", "Buenard", "Bungee", "Bungee Hairline", "Bungee Inline", "Bungee Outline", "Bungee Shade",
  "Butcherman", "Butterfly Kids", "Cabin", "Cabin Condensed", "Cabin Sketch", "Caesar Dressing", "Cagliostro",
  "Cairo", "Caladea", "Calistoga", "Calligraffitti", "Cambay", "Cambo", "Candal", "Cantarell", "Cantata One",
  "Cantora One", "Capriola", "Cardo", "Carme", "Carrois Gothic", "Carrois Gothic SC", "Carter One", "Castoro",
  "Catamaran", "Caudex", "Caveat", "Caveat Brush", "Cedarville Cursive", "Ceviche One", "Chakra Petch",
  "Changa", "Changa One", "Chango", "Charm", "Charmonman", "Chathura", "Chau Philomene One", "Chela One",
  "Chelsea Market", "Chenla", "Cherry Cream Soda", "Cherry Swash", "Chewy", "Chicle", "Chilanka", "Chivo",
  "Chonburi", "Cinzel", "Cinzel Decorative", "Clicker Script", "Coda", "Coda Caption", "Codystar", "Coiny",
  "Combo", "Comfortaa", "Comic Neue", "Coming Soon", "Concert One", "Condiment", "Content", "Contrail One",
  "Convergence", "Cookie", "Copse", "Corben", "Cormorant", "Cormorant Garamond", "Cormorant Infant", "Cormorant SC",
  "Cormorant Unicase", "Cormorant Upright", "Courgette", "Courier Prime", "Cousine", "Coustard", "Covered By Your Grace",
  "Crafty Girls", "Creepster", "Crete Round", "Crimson Pro", "Crimson Text", "Croissant One", "Crushed",
  "Cuprum", "Cute Font", "Cutive", "Cutive Mono", "D.O.T.O", "DM Mono", "DM Sans", "DM Serif Display",
  "DM Serif Text", "Damion", "Dancing Script", "Dangrek", "Darker Grotesque", "David Libre", "Dawning of a New Day",
  "Days One", "Dekko", "Delius", "Delius Swash Caps", "Delius Unicase", "Della Respira", "Denk One",
  "Devonshire", "Dhurjati", "Didact Gothic", "Diplomata", "Diplomata SC", "Do Hyeon", "Dokdo", "Domine",
  "Donegal One", "Doppio One", "Dorsa", "Dosis", "Dr Sugiyama", "Duru Sans", "Dynalight", "EB Garamond",
  "Eagle Lake", "East Sea Dokdo", "Eater", "Economica", "Eczar", "El Messiri", "Electrolize", "Elsie",
  "Elsie Swash Caps", "Emblema One", "Emilys Candy", "Encode Sans", "Encode Sans Condensed", "Encode Sans Expanded",
  "Encode Sans SC", "Engagement", "Englebert", "Enriqueta", "Epilogue", "Erica One", "Esteban", "Euphoria Script",
  "Ewert", "Exo", "Exo 2", "Expletus Sans", "Explora", "Fahkwang", "Fanwood Text", "Farro", "Farsan",
  "Fascinate", "Fascinate Inline", "Faster One", "Fasthand", "Fauna One", "Faustina", "Federant", "Federo",
  "Felipa", "Fenix", "Finger Paint", "Fira Code", "Fira Mono", "Fira Sans", "Fira Sans Condensed",
  "Fira Sans Extra Condensed", "Fjalla One", "Fjord One", "Flamenco", "Flavors", "Fondamento", "Fontdiner Swanky",
  "Forum", "Francois One", "Frank Ruhl Libre", "Fraunces", "Freckle Face", "Fredericka the Great", "Fredoka One",
  "Freehand", "Fresca", "Frijole", "Fruktur", "Fugaz One", "GFS Didot", "GFS Neohellenic", "Gabriela",
  "Gaegu", "Gafata", "Galada", "Galdeano", "Galindo", "Gamja Flower", "Gayathri", "Gelasio", "Gentium Basic",
  "Gentium Book Basic", "Geo", "Geostar", "Geostar Fill", "Germania One", "Gidugu", "Gilda Display", "Girassol",
  "Give You Glory", "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Goblin One", "Gochi Hand", "Gorditas",
  "Gothic A1", "Gotu", "Goudy Bookletter 1911", "Graduate", "Grand Hotel", "Grandstander", "Gravitas One",
  "Great Vibes", "Grechen Fuemen", "Griffy", "Gruppo", "Gudea", "Gugi", "Gupter", "Gurajada", "Habibi",
  "Hachi Maru Pop", "Halant", "Hammersmith One", "Hanalei", "Hanalei Fill", "Handlee", "Hanuman", "Happy Monkey",
  "Harmattan", "Headland One", "Heebo", "Henny Penny", "Hepta Slab", "Herr Von Muellerhoff", "Hi Melody",
  "Hind", "Hind Guntur", "Hind Madurai", "Hind Siliguri", "Hind Vadodara", "Holtwood One SC", "Homemade Apple",
  "Homenaje", "IBM Plex Mono", "IBM Plex Sans", "IBM Plex Sans Arabic", "IBM Plex Sans Condensed", "IBM Plex Sans Devanagari",
  "IBM Plex Sans Hebrew", "IBM Plex Sans KR", "IBM Plex Sans Thai", "IBM Plex Sans Thai Looped", "IBM Plex Serif",
  "IM Fell DW Pica", "IM Fell DW Pica SC", "IM Fell Double Pica", "IM Fell Double Pica SC", "IM Fell English",
  "IM Fell English SC", "IM Fell French Canon", "IM Fell French Canon SC", "IM Fell Great Primer", "IM Fell Great Primer SC",
  "Ibarra Real Nova", "Iceberg", "Iceland", "Imprima", "Inconsolata", "Inder", "Indie Flower", "Inika",
  "Inknut Antiqua", "Inria Sans", "Inria Serif", "Inter", "Irish Grover", "Istok Web", "Italiana", "Italianno",
  "Itim", "Jacques Francois", "Jacques Francois Shadow", "Jaldi", "JetBrains Mono", "Jim Nightshade", "Jockey One",
  "Jolly Lodger", "Jomhuria", "Jomolhari", "Josefin Sans", "Josefin Slab", "Jost", "Joti One", "Jua",
  "Judson", "Julee", "Julius Sans One", "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here",
  "K2D", "Kadwa", "Kalam", "Kameron", "Kanit", "Kantumruy", "Karla", "Karma", "Katibeh", "Kaushan Script",
  "Kavivanar", "Kavoon", "Kdam Thmor", "Keania One", "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula",
  "Kirang Haerang", "Kite One", "Knewave", "KoHo", "Kodchasan", "Kosugi", "Kosugi Maru", "Kotta One",
  "Koulen", "Kranky", "Kreon", "Kristi", "Krona One", "Krub", "Kufam", "Kulim Park", "Kumar One",
  "Kumar One Outline", "Kumbh Sans", "Kurale", "La Belle Aurore", "Lacquer", "Laila", "Lakki Reddy",
  "Lalezar", "Lancelot", "Lateef", "Lato", "League Script", "Leckerli One", "Ledger", "Lekton", "Lemon",
  "Lemonada", "Lexend", "Lexend Deca", "Lexend Exa", "Lexend Giga", "Lexend Mega", "Lexend Peta", "Lexend Tera",
  "Lexend Zetta", "Libre Barcode 128", "Libre Barcode 128 Text", "Libre Barcode 39", "Libre Barcode 39 Extended",
  "Libre Barcode 39 Extended Text", "Libre Barcode 39 Text", "Libre Barcode EAN13 Text", "Libre Baskerville",
  "Libre Caslon Display", "Libre Caslon Text", "Libre Franklin", "Life Savers", "Lilita One", "Lily Script One",
  "Limelight", "Linden Hill", "Literata", "Liu Jian Mao Cao", "Livvic", "Lobster", "Lobster Two", "Londrina Outline",
  "Londrina Shadow", "Londrina Sketch", "Londrina Solid", "Long Cang", "Lora", "Love Ya Like A Sister",
  "Loved by the King", "Lovers Quarrel", "Luckiest Guy", "Lusitana", "Lustria", "M PLUS 1p", "M PLUS Rounded 1c",
  "Ma Shan Zheng", "Macondo", "Macondo Swash Caps", "Mada", "Magra", "Maiden Orange", "Maitree", "Major Mono Display",
  "Mako", "Mali", "Mallanna", "Mandali", "Manjari", "Manrope", "Mansalva", "Manuale", "Marcellus", "Marcellus SC",
  "Marck Script", "Margarine", "Markazi Text", "Marko One", "Marmelad", "Martel", "Martel Sans", "Marvel",
  "Mate", "Mate SC", "Material Icons", "Maven Pro", "McLaren", "Meddon", "MedievalSharp", "Medula One",
  "Meera Inimai", "Megrim", "Meie Script", "Merienda", "Merienda One", "Merriweather", "Merriweather Sans",
  "Metal", "Metal Mania", "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Miltonian Tattoo",
  "Mina", "Miniver", "Miriam Libre", "Mirza", "Miss Fajardose", "Mitr", "Modak", "Modern Antiqua", "Mogra",
  "Molengo", "Molle", "Monda", "Monofett", "Monoton", "Monsieur La Doulaise", "Montaga", "Montez", "Montserrat",
  "Montserrat Alternates", "Montserrat Subrayada", "Moul", "Moulpali", "Mountains of Christmas", "Mouse Memoirs",
  "Mr Bedfort", "Mr Dafoe", "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Mukti", "Mulish",
  "MuseoModerno", "Mystery Quest", "NTR", "Nanum Brush Script", "Nanum Gothic", "Nanum Gothic Coding", "Nanum Myeongjo",
  "Nanum Pen Script", "Neucha", "Neuton", "New Rocker", "News Cycle", "Niconne", "Niramit", "nixie One",
  "Nobile", "Nokora", "Norican", "Nosifer", "Notable", "Nothing You Could Do", "Noticia Text", "Noto Color Emoji",
  "Noto Emoji", "Noto Music", "Noto Sans", "Noto Sans Arabic", "Noto Sans Armenian", "Noto Sans Bengali",
  "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Display", "Noto Sans Ethiopic", "Noto Sans Georgian",
  "Noto Sans Gujarati", "Noto Sans Gurmukhi", "Noto Sans Hebrew", "Noto Sans JP", "Noto Sans KR", "Noto Sans Kannada",
  "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Malayalam", "Noto Sans Mono", "Noto Sans Myanmar", "Noto Sans Oriya",
  "Noto Sans SC", "Noto Sans Sinhala", "Noto Sans TC", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai",
  "Noto Sans Thai Looped", "Noto Serif", "Noto Serif Armenian", "Noto Serif Bengali", "Noto Serif Devanagari",
  "Noto Serif Display", "Noto Serif Ethiopic", "Noto Serif Georgian", "Noto Serif Gujarati", "Noto Serif Gurmukhi",
  "Noto Serif Hebrew", "Noto Serif JP", "Noto Serif KR", "Noto Serif Kannada", "Noto Serif Khmer", "Noto Serif Lao",
  "Noto Serif Malayalam", "Noto Serif Myanmar", "Noto Serif SC", "Noto Serif Sinhala", "Noto Serif TC", 
  "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Thai", "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval",
  "Nova Round", "Nova Script", "Nova Slim", "Nova Square", "Numans", "Nunito", "Nunito Sans", "Odibee Sans",
  "Odor Mean Chey", "Offside", "Old Standard TT", "Oldenburg", "Oleo Script", "Oleo Script Swash Caps",
  "Open Sans", "Open Sans Condensed", "Oranienbaum", "Orbitron", "Oregano", "Orienta", "Original Surfer",
  "Oswald", "Over the Rainbow", "Overlock", "Overlock SC", "Overpass", "Overpass Mono", "Ovo", "Oxanium",
  "Oxygen", "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption",
  "Pacifico", "Padauk", "Palanquin", "Palanquin Dark", "Pangolin", "Paprika", "Parisienne", "Passero One",
  "Passion One", "Pathway Gothic One", "Patrick Hand", "Patrick Hand SC", "Pattaya", "Patua One", "Pavanam",
  "Paytone One", "Peddana", "Peralta", "Permanent Marker", "Petit Formal Script", "Petrona", "Philosopher",
  "Piazzolla", "Piedra", "Pinyon Script", "Pirata One", "Plaster", "Play", "Playball", "Playfair Display",
  "Playfair Display SC", "Podkova", "Poiret One", "Poller One", "Poly", "Pompiere", "Pontano Sans", "Poor Story",
  "Poppins", "Port Lligat Sans", "Port Lligat Slab", "Pragati Narrow", "Prata", "Preahvihear", "Press Start 2P",
  "Pridi", "Princess Sofia", "Prociono", "Prompt", "Prosto One", "Proza Libre", "Public Sans", "Puritan",
  "Purple Purse", "Quando", "Quantico", "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand", "Quintessential",
  "Qwigley", "Racing Sans One", "Radley", "Rajdhani", "Rakkas", "Raleway", "Raleway Dots", "Ramabhadra",
  "Ramaraja", "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rasa", "Rationale", "Ravi Prakash",
  "Red Hat Display", "Red Hat Text", "Red Rose", "Redressed", "Reem Kufi", "Reenie Beanie", "Revalia",
  "Rhodium Libre", "Ribeye", "Ribeye Marrow", "Righteous", "Risque", "Roboto", "Roboto Condensed", "Roboto Mono",
  "Roboto Slab", "Rochester", "Rock Salt", "RocknRoll One", "Rokkitt", "Romanesco", "Ropa Sans", "Rosario",
  "Rosarivo", "Rouge Script", "Rowdies", "Rozha One", "Rubik", "Rubik Mono One", "Ruda", "Rufina", "Ruge Boogie",
  "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento", "Sahitya", "Sail",
  "Saira", "Saira Condensed", "Saira Extra Condensed", "Saira Semi Condensed", "Saira Stencil One", "Salsa",
  "Sanchez", "Sancreek", "Sansita", "Sansita Swashed", "Sarabun", "Sarala", "Sarina", "Sarpanch", "satisfy",
  "Sawarabi Gothic", "Sawarabi Mincho", "Scada", "Scheherazade", "Schoolbell", "Scope One", "Seaweed Script",
  "Secular One", "Sedgwick Ave", "Sedgwick Ave Display", "Sen", "Sevillana", "Seymour One", "Shadows Into Light",
  "Shadows Into Light Two", "Shanti", "Share", "Share Tech", "Share Tech Mono", "Shippori Mincho", "Shippori Mincho B1",
  "Shojumaru", "Short Stack", "Shrikhand", "Siemreap", "Sigmar One", "Signika", "Signika Negative", "Simonetta",
  "Single Day", "Sintony", "Sirin Stencil", "Six Caps", "Skranji", "Slabo 13px", "Slabo 27px", "Slackey",
  "Smokum", "Smythe", "Sniglet", "Snippet", "Snowburst One", "Sofadi One", "Sofia", "Solway", "Song Myung",
  "Sonsie One", "Sorts Mill Goudy", "Source Code Pro", "Source Sans Pro", "Source Serif Pro", "Space Grotesk",
  "Space Mono", "Spartan", "Special Elite", "Spectral", "Spectral SC", "Spicy Rice", "Spinnaker", "Spirax",
  "Squada One", "Sree Krushnadevaraya", "Sriracha", "Srisakdi", "Staatliches", "Stalemate", "Stalinist One",
  "Stardos Stencil", "Stick", "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Stylish",
  "Sue Ellen Francisco", "Suez One", "Sulphur Point", "Sumana", "Sunflower", "Sunshiney", "Supermercado One",
  "Sura", "Suranna", "Suravaram", "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Syne", "Syne Mono",
  "Syne Tactile", "Tajawal", "Tangerine", "Taprom", "Tauri", "Taviraj", "Teko", "Telex", "Tenali Ramakrishna",
  "Tenor Sans", "Text Me One", "Thasadith", "The Girl Next Door", "Tienne", "Tillana", "Timmana", "Tinos",
  "Titan One", "Titillium Web", "Tomorrow", "Trade Winds", "Trajan Pro", "Trirong", "Trispace", "Trocchi",
  "Trochut", "Truculenta", "Trykker", "Tulpen One", "Turret Road", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono",
  "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt",
  "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Vast Shadow", "Vesper Libre", "Viaoda Libre",
  "Vibes", "Vibur", "Vidaloka", "Viga", "Voces", "Volkhov", "Vollkorn", "Vollkorn SC", "Voltaire", "Waiting for the Sunrise",
  "Wallpoet", "Walter Turncoat", "Warnes", "Wellfleet", "Wendy One", "Wire One", "Work Sans", "Yanone Kaffeesatz",
  "Yantramanav", "Yatra One", "Yellowtail", "Yeon Sung", "Yeseva One", "Yesteryear", "Yrsa", "ZCOOL KuaiLe",
  "ZCOOL QingKe HuangYou", "ZCOOL XiaoWei", "Zeyada", "Zhi Mang Xing", "Zilla Slab", "Zilla Slab Highlight"
];

export async function getAvailableFonts(): Promise<string[]> {
  // Return popular fonts for quick access
  return POPULAR_FONTS;
}

export async function searchGoogleFonts(query: string): Promise<string[]> {
  if (!query.trim()) return POPULAR_FONTS;
  
  try {
    // First try to fetch from Google Fonts API via our backend proxy
    const response = await fetch(`/api/fonts/search?q=${encodeURIComponent(query)}`);
    if (response.ok) {
      const data = await response.json();
      return data.fonts || [];
    }
  } catch (error) {
    console.warn('Failed to fetch from Google Fonts API, falling back to local search');
  }
  
  // Fallback to local search
  const searchTerm = query.toLowerCase();
  const filteredFonts = GOOGLE_FONTS_LIST.filter(font => 
    font.toLowerCase().includes(searchTerm)
  );
  
  return filteredFonts.length > 0 ? filteredFonts.slice(0, 20) : POPULAR_FONTS;
}

// Developer fonts that should be preloaded for instant access
const DEVELOPER_FONTS = [
  'Fira Code',
  'JetBrains Mono', 
  'Source Code Pro',
  'Space Mono',
  'Courier Prime',
  'DM Mono',
  'Roboto Mono',
  'Audiowide',
  'Electrolize',
  'Major Mono Display',
  'Bungee',
  'Silkscreen',
  'Orbitron'
];

// Preload all developer fonts to ensure instant theme switching
export async function preloadDeveloperFonts(): Promise<void> {
  const promises = DEVELOPER_FONTS.map(font => loadGoogleFont(font, [400, 500, 600, 700]));
  await Promise.allSettled(promises); // Use allSettled to continue even if some fonts fail
}

export async function loadGoogleFont(
  fontFamily: string, 
  weights: number[] = [400, 600, 700]
): Promise<void> {
  try {
    // Skip system fonts
    if (['Helvetica', 'Arial', 'Times New Roman', 'Georgia', 'Verdana'].includes(fontFamily)) {
      return;
    }

    // Check if font is already loaded
    const fontFaceSet = (document as any).fonts;
    if (fontFaceSet) {
      const fontFace = `${weights[0]} 16px "${fontFamily}"`;
      const isLoaded = fontFaceSet.check(fontFace);
      if (isLoaded) return;
    }

    // Create font link with proper weight formatting
    const weightsStr = weights.join(';');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@${weightsStr}&display=swap`;
    
    // Check if link already exists
    const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/ /g, '+')}"]`);
    if (existingLink) {
      // Wait for existing font to load
      await waitForFontLoad(fontFamily, weights[0]);
      return;
    }

    // Create font link element
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = fontUrl;
    fontLink.onload = () => console.log(`Font stylesheet loaded: ${fontFamily}`);
    fontLink.onerror = () => console.warn(`Failed to load font stylesheet: ${fontFamily}`);
    document.head.appendChild(fontLink);

    // Wait for font to actually load and be ready
    await waitForFontLoad(fontFamily, weights[0]);
    
  } catch (error) {
    console.warn(`Error loading font ${fontFamily}:`, error);
  }
}

// Helper function to wait for font to be ready
async function waitForFontLoad(fontFamily: string, weight: number): Promise<void> {
  return new Promise((resolve) => {
    const fontFaceSet = (document as any).fonts;
    if (!fontFaceSet) {
      // Fallback timeout for older browsers
      setTimeout(resolve, 1000);
      return;
    }

    const fontSpec = `${weight} 16px "${fontFamily}"`;
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const checkFont = () => {
      attempts++;
      if (fontFaceSet.check(fontSpec) || attempts >= maxAttempts) {
        if (attempts >= maxAttempts) {
          console.warn(`Font loading timeout: ${fontFamily}`);
        } else {
          console.log(`Font ready: ${fontFamily} after ${attempts * 100}ms`);
        }
        resolve();
      } else {
        setTimeout(checkFont, 100);
      }
    };
    
    checkFont();
  });
}

export async function getFontWeights(fontFamily: string): Promise<number[]> {
  // Return common weights for now
  // In full implementation, would query Google Fonts API
  return [300, 400, 500, 600, 700, 800];
}
