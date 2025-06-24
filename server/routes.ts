import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Google Fonts proxy endpoint (if needed for CORS)
  app.get("/api/fonts", async (_req, res) => {
    try {
      // This could be extended to proxy Google Fonts API requests
      // For now, return popular fonts list
      const popularFonts = [
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
      
      res.json({ fonts: popularFonts });
    } catch (error) {
      console.error("Error fetching fonts:", error);
      res.status(500).json({ error: "Failed to fetch fonts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
