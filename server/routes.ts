import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Google Fonts API proxy endpoint
  app.get("/api/fonts", async (_req, res) => {
    try {
      const popularFonts = [
        "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Inter",
        "Silkscreen", "Orbitron", "Quantico", "D.O.T.O", "Playfair Display",
        "Merriweather", "Ubuntu", "Nunito", "Source Sans Pro", "Raleway",
        "Work Sans", "Fira Sans", "PT Sans"
      ];
      
      res.json({ fonts: popularFonts });
    } catch (error) {
      console.error("Error fetching fonts:", error);
      res.status(500).json({ error: "Failed to fetch fonts" });
    }
  });

  // Google Fonts search endpoint
  app.get("/api/fonts/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }

      // Fetch from Google Fonts API
      const googleFontsUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY || 'demo'}`;
      
      let allFonts: string[] = [];
      
      try {
        const response = await fetch(googleFontsUrl);
        if (response.ok) {
          const data = await response.json();
          allFonts = data.items?.map((font: any) => font.family) || [];
        }
      } catch (apiError) {
        console.warn('Google Fonts API unavailable, using fallback list');
        // Fallback to extensive local list
        allFonts = [
          "Abel", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro", "Aguafina Script",
          "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya Sans", "Alex Brush", "Alfa Slab One",
          "Alice", "Alike", "Allan", "Allerta", "Allura", "Almendra", "Amarante", "Amaranth", "Amatic SC",
          "Amethysta", "Amiko", "Amiri", "Amita", "Anaheim", "Andada Pro", "Andika", "Angkor", "Anonymous Pro",
          "Antic", "Anton", "Arapey", "Arbutus", "Architects Daughter", "Archivo", "Archivo Black", "Arimo",
          "Arizonia", "Armata", "Arsenal", "Artifika", "Arvo", "Asap", "Assistant", "Astloch", "Asul",
          "Audiowide", "Autour One", "Average", "Averia Libre", "Bad Script", "Bahiana", "Baloo", "Balsamiq Sans",
          "Bangers", "Barlow", "Basic", "Battambang", "Baumans", "Be Vietnam Pro", "Bebas Neue", "Belgrano",
          "Bellefair", "Belleza", "BenchNine", "Bentham", "Berkshire Swash", "Bevan", "Big Shoulders Display",
          "Bigelow Rules", "Bigshot One", "Bilbo", "BioRhyme", "Bitter", "Black Ops One", "Blinker", "Bodoni Moda",
          "Boogaloo", "Bowlby One", "Brawler", "Bree Serif", "Bubblegum Sans", "Buda", "Buenard", "Bungee",
          "Butcherman", "Cabin", "Caesar Dressing", "Cagliostro", "Cairo", "Calligraffitti", "Cambay", "Cambo",
          "Candal", "Cantarell", "Capriola", "Cardo", "Carme", "Carter One", "Catamaran", "Caudex", "Caveat",
          "Cedarville Cursive", "Changa", "Chango", "Charm", "Chathura", "Chewy", "Chicle", "Chilanka", "Chivo",
          "Cinzel", "Clicker Script", "Coda", "Coiny", "Comfortaa", "Comic Neue", "Coming Soon", "Concert One",
          "Contrail One", "Convergence", "Cookie", "Copse", "Corben", "Cormorant", "Courgette", "Courier Prime",
          "Cousine", "Covered By Your Grace", "Creepster", "Crete Round", "Crimson Pro", "Crushed", "Cuprum",
          "Cutive", "D.O.T.O", "DM Mono", "DM Sans", "DM Serif Display", "Damion", "Dancing Script", "Dangrek",
          "Darker Grotesque", "Dawning of a New Day", "Days One", "Delius", "Della Respira", "Denk One",
          "Devonshire", "Didact Gothic", "Diplomata", "Do Hyeon", "Dokdo", "Domine", "Donegal One", "Doppio One",
          "Dorsa", "Dosis", "Dr Sugiyama", "Duru Sans", "Dynalight", "EB Garamond", "Eagle Lake", "Eater",
          "Economica", "Eczar", "El Messiri", "Electrolize", "Elsie", "Emblema One", "Emilys Candy", "Encode Sans",
          "Engagement", "Englebert", "Enriqueta", "Epilogue", "Erica One", "Esteban", "Euphoria Script", "Ewert",
          "Exo", "Expletus Sans", "Fahkwang", "Fanwood Text", "Farro", "Fascinate", "Faster One", "Fasthand",
          "Fauna One", "Faustina", "Federant", "Federo", "Felipa", "Fenix", "Finger Paint", "Fira Code",
          "Fira Mono", "Fira Sans", "Fjalla One", "Fjord One", "Flamenco", "Fondamento", "Fontdiner Swanky",
          "Forum", "Francois One", "Frank Ruhl Libre", "Fraunces", "Freckle Face", "Fredericka the Great",
          "Fredoka One", "Freehand", "Fresca", "Frijole", "Fruktur", "Fugaz One", "GFS Didot", "GFS Neohellenic",
          "Gabriela", "Gaegu", "Gafata", "Galada", "Galdeano", "Galindo", "Gamja Flower", "Gayathri", "Gelasio",
          "Gentium Basic", "Geo", "Geostar", "Germania One", "Gidugu", "Gilda Display", "Girassol", "Give You Glory",
          "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Goblin One", "Gochi Hand", "Gorditas", "Gothic A1",
          "Goudy Bookletter 1911", "Graduate", "Grand Hotel", "Grandstander", "Gravitas One", "Great Vibes",
          "Grechen Fuemen", "Griffy", "Gruppo", "Gudea", "Gugi", "Gupter", "Gurajada", "Habibi", "Hachi Maru Pop",
          "Halant", "Hammersmith One", "Hanalei", "Handlee", "Hanuman", "Happy Monkey", "Harmattan", "Headland One",
          "Heebo", "Henny Penny", "Hepta Slab", "Herr Von Muellerhoff", "Hi Melody", "Hind", "Holtwood One SC",
          "Homemade Apple", "Homenaje", "IBM Plex Mono", "IBM Plex Sans", "IBM Plex Serif", "IM Fell DW Pica",
          "Ibarra Real Nova", "Iceberg", "Iceland", "Imprima", "Inconsolata", "Inder", "Indie Flower", "Inika",
          "Inknut Antiqua", "Inria Sans", "Inria Serif", "Inter", "Irish Grover", "Istok Web", "Italiana",
          "Italianno", "Itim", "Jacques Francois", "Jaldi", "JetBrains Mono", "Jim Nightshade", "Jockey One",
          "Jolly Lodger", "Jomhuria", "Jomolhari", "Josefin Sans", "Josefin Slab", "Jost", "Joti One", "Jua",
          "Judson", "Julee", "Julius Sans One", "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here",
          "K2D", "Kadwa", "Kalam", "Kameron", "Kanit", "Kantumruy", "Karla", "Karma", "Katibeh", "Kaushan Script",
          "Kavivanar", "Kavoon", "Kdam Thmor", "Keania One", "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula",
          "Kirang Haerang", "Kite One", "Knewave", "KoHo", "Kodchasan", "Kosugi", "Kotta One", "Koulen", "Kranky",
          "Kreon", "Kristi", "Krona One", "Krub", "Kufam", "Kulim Park", "Kumar One", "Kumbh Sans", "Kurale",
          "La Belle Aurore", "Lacquer", "Laila", "Lakki Reddy", "Lalezar", "Lancelot", "Lateef", "Lato",
          "League Script", "Leckerli One", "Ledger", "Lekton", "Lemon", "Lemonada", "Lexend", "Libre Baskerville",
          "Libre Caslon Display", "Libre Franklin", "Life Savers", "Lilita One", "Lily Script One", "Limelight",
          "Linden Hill", "Literata", "Livvic", "Lobster", "Lobster Two", "Londrina Outline", "Londrina Shadow",
          "Londrina Sketch", "Londrina Solid", "Long Cang", "Lora", "Love Ya Like A Sister", "Loved by the King",
          "Lovers Quarrel", "Luckiest Guy", "Lusitana", "Lustria", "M PLUS 1p", "M PLUS Rounded 1c", "Ma Shan Zheng",
          "Macondo", "Mada", "Magra", "Maiden Orange", "Maitree", "Major Mono Display", "Mako", "Mali", "Mallanna",
          "Mandali", "Manjari", "Manrope", "Mansalva", "Manuale", "Marcellus", "Marck Script", "Margarine",
          "Markazi Text", "Marko One", "Marmelad", "Martel", "Marvel", "Mate", "Material Icons", "Maven Pro",
          "McLaren", "Meddon", "MedievalSharp", "Medula One", "Megrim", "Meie Script", "Merienda", "Merriweather",
          "Metal", "Metal Mania", "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Mina",
          "Miniver", "Miriam Libre", "Mirza", "Miss Fajardose", "Mitr", "Modak", "Modern Antiqua", "Mogra",
          "Molengo", "Molle", "Monda", "Monofett", "Monoton", "Monsieur La Doulaise", "Montaga", "Montez",
          "Montserrat", "Montserrat Alternates", "Moul", "Mountains of Christmas", "Mouse Memoirs", "Mr Bedfort",
          "Mr Dafoe", "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Mukti", "Mulish", "MuseoModerno",
          "Mystery Quest", "NTR", "Nanum Brush Script", "Nanum Gothic", "Nanum Myeongjo", "Nanum Pen Script",
          "Neucha", "Neuton", "New Rocker", "News Cycle", "Niconne", "Niramit", "Nixie One", "Nobile", "Nokora",
          "Norican", "Nosifer", "Notable", "Nothing You Could Do", "Noticia Text", "Noto Sans", "Noto Serif",
          "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval", "Nova Round", "Nova Script", "Nova Slim", "Nova Square",
          "Numans", "Nunito", "Nunito Sans", "Odibee Sans", "Offside", "Old Standard TT", "Oldenburg", "Oleo Script",
          "Open Sans", "Open Sans Condensed", "Oranienbaum", "Orbitron", "Oregano", "Orienta", "Original Surfer",
          "Oswald", "Over the Rainbow", "Overlock", "Overpass", "Overpass Mono", "Ovo", "Oxanium", "Oxygen",
          "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "Pacifico", "Padauk",
          "Palanquin", "Pangolin", "Paprika", "Parisienne", "Passero One", "Passion One", "Pathway Gothic One",
          "Patrick Hand", "Pattaya", "Patua One", "Pavanam", "Paytone One", "Peddana", "Peralta", "Permanent Marker",
          "Petit Formal Script", "Petrona", "Philosopher", "Piazzolla", "Piedra", "Pinyon Script", "Pirata One",
          "Plaster", "Play", "Playball", "Playfair Display", "Podkova", "Poiret One", "Poller One", "Poly",
          "Pompiere", "Pontano Sans", "Poor Story", "Poppins", "Port Lligat Sans", "Port Lligat Slab",
          "Pragati Narrow", "Prata", "Preahvihear", "Press Start 2P", "Pridi", "Princess Sofia", "Prociono",
          "Prompt", "Prosto One", "Proza Libre", "Public Sans", "Puritan", "Purple Purse", "Quando", "Quantico",
          "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand", "Quintessential", "Qwigley",
          "Racing Sans One", "Radley", "Rajdhani", "Rakkas", "Raleway", "Raleway Dots", "Ramabhadra", "Ramaraja",
          "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rasa", "Rationale", "Ravi Prakash",
          "Red Hat Display", "Red Hat Text", "Red Rose", "Redressed", "Reem Kufi", "Reenie Beanie", "Revalia",
          "Rhodium Libre", "Ribeye", "Righteous", "Risque", "Roboto", "Roboto Condensed", "Roboto Mono",
          "Roboto Slab", "Rochester", "Rock Salt", "RocknRoll One", "Rokkitt", "Romanesco", "Ropa Sans", "Rosario",
          "Rosarivo", "Rouge Script", "Rowdies", "Rozha One", "Rubik", "Rubik Mono One", "Ruda", "Rufina",
          "Ruge Boogie", "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento",
          "Sahitya", "Sail", "Saira", "Saira Condensed", "Saira Extra Condensed", "Saira Semi Condensed",
          "Saira Stencil One", "Salsa", "Sanchez", "Sancreek", "Sansita", "Sansita Swashed", "Sarabun", "Sarala",
          "Sarina", "Sarpanch", "Satisfy", "Sawarabi Gothic", "Sawarabi Mincho", "Scada", "Scheherazade",
          "Schoolbell", "Scope One", "Seaweed Script", "Secular One", "Sedgwick Ave", "Sen", "Sevillana",
          "Seymour One", "Shadows Into Light", "Shanti", "Share", "Share Tech", "Share Tech Mono",
          "Shippori Mincho", "Shojumaru", "Short Stack", "Shrikhand", "Siemreap", "Sigmar One", "Signika",
          "Signika Negative", "Silkscreen", "Simonetta", "Single Day", "Sintony", "Sirin Stencil", "Six Caps",
          "Skranji", "Slabo 13px", "Slabo 27px", "Slackey", "Smokum", "Smythe", "Sniglet", "Snippet",
          "Snowburst One", "Sofadi One", "Sofia", "Solway", "Song Myung", "Sonsie One", "Sorts Mill Goudy",
          "Source Code Pro", "Source Sans Pro", "Source Serif Pro", "Space Grotesk", "Space Mono", "Spartan",
          "Special Elite", "Spectral", "Spicy Rice", "Spinnaker", "Spirax", "Squada One", "Sree Krushnadevaraya",
          "Sriracha", "Srisakdi", "Staatliches", "Stalemate", "Stalinist One", "Stardos Stencil", "Stick",
          "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Stylish", "Sue Ellen Francisco",
          "Suez One", "Sulphur Point", "Sumana", "Sunflower", "Sunshiney", "Supermercado One", "Sura", "Suranna",
          "Suravaram", "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Syne", "Syne Mono", "Syne Tactile",
          "Tajawal", "Tangerine", "Taprom", "Tauri", "Taviraj", "Teko", "Telex", "Tenali Ramakrishna", "Tenor Sans",
          "Text Me One", "Thasadith", "The Girl Next Door", "Tienne", "Tillana", "Timmana", "Tinos", "Titan One",
          "Titillium Web", "Tomorrow", "Trade Winds", "Trajan Pro", "Trirong", "Trispace", "Trocchi", "Trochut",
          "Truculenta", "Trykker", "Tulpen One", "Turret Road", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono",
          "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt",
          "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Vast Shadow", "Vesper Libre",
          "Viaoda Libre", "Vibes", "Vibur", "Vidaloka", "Viga", "Voces", "Volkhov", "Vollkorn", "Voltaire",
          "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes", "Wellfleet", "Wendy One", "Wire One",
          "Work Sans", "Yanone Kaffeesatz", "Yantramanav", "Yatra One", "Yellowtail", "Yeon Sung", "Yeseva One",
          "Yesteryear", "Yrsa", "ZCOOL KuaiLe", "ZCOOL QingKe HuangYou", "ZCOOL XiaoWei", "Zeyada", "Zhi Mang Xing",
          "Zilla Slab", "Zilla Slab Highlight"
        ];
      }

      // Filter fonts based on query
      const searchTerm = query.toLowerCase();
      const filteredFonts = allFonts.filter(font => 
        font.toLowerCase().includes(searchTerm)
      ).slice(0, 20);

      // If no matches found and query is short, try partial matching
      let finalFonts = filteredFonts;
      if (filteredFonts.length === 0 && query.length >= 2) {
        finalFonts = allFonts.filter(font => 
          font.toLowerCase().startsWith(searchTerm.substring(0, 2))
        ).slice(0, 10);
      }

      res.json({ 
        fonts: finalFonts.length > 0 ? finalFonts : allFonts.slice(0, 20),
        source: allFonts.length > 1000 ? 'google_api' : 'fallback'
      });
    } catch (error) {
      console.error("Error searching fonts:", error);
      res.status(500).json({ error: "Failed to search fonts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
