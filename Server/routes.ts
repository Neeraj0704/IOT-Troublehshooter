import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTroubleshootingQuerySchema } from "@shared/schema";
import { analyzeIoTTroubleshooting } from "./openai";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Troubleshooting routes
  app.post("/api/troubleshooting", isAuthenticated, upload.array("images", 5), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const files = req.files as Express.Multer.File[];
      
      // Validate request body
      const validatedData = insertTroubleshootingQuerySchema.parse({
        title: req.body.title || `${req.body.microcontroller} Troubleshooting`,
        microcontroller: req.body.microcontroller,
        projectType: req.body.projectType,
        components: Array.isArray(req.body.components) ? req.body.components : [req.body.components].filter(Boolean),
        problemDescription: req.body.problemDescription,
        imageUrls: [], // Will be populated after analysis
        status: "pending"
      });

      // Create initial query record
      const query = await storage.createTroubleshootingQuery({
        ...validatedData,
        userId
      });

      // Convert uploaded images to base64 for AI analysis
      const imageBase64s = files ? files.map(file => file.buffer.toString('base64')) : [];

      try {
        // Analyze with OpenAI
        const analysis = await analyzeIoTTroubleshooting(
          validatedData.microcontroller || "",
          validatedData.projectType || "",
          validatedData.components || [],
          validatedData.problemDescription,
          imageBase64s
        );

        // Update query with analysis results
        const updatedQuery = await storage.updateTroubleshootingQuery(query.id, {
          status: "resolved",
          diagnosis: analysis.diagnosis,
          solutions: analysis.solutions
        });

        res.json(updatedQuery);
      } catch (analysisError) {
        console.error("Analysis error:", analysisError);
        
        // Update query with error status
        await storage.updateTroubleshootingQuery(query.id, {
          status: "failed",
          diagnosis: "Failed to analyze the setup. Please try again or contact support."
        });

        res.status(500).json({ message: "Failed to analyze IoT setup" });
      }
    } catch (error) {
      console.error("Error creating troubleshooting query:", error);
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.get("/api/troubleshooting", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const queries = await storage.getUserTroubleshootingQueries(userId);
      res.json(queries);
    } catch (error) {
      console.error("Error fetching troubleshooting queries:", error);
      res.status(500).json({ message: "Failed to fetch queries" });
    }
  });

  app.get("/api/troubleshooting/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const queryId = parseInt(req.params.id);
      
      const query = await storage.getTroubleshootingQuery(queryId);
      
      if (!query) {
        return res.status(404).json({ message: "Query not found" });
      }
      
      // Ensure user can only access their own queries
      if (query.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(query);
    } catch (error) {
      console.error("Error fetching troubleshooting query:", error);
      res.status(500).json({ message: "Failed to fetch query" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
