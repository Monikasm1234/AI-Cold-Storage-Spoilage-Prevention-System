import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const HOST = process.env.HOST || "127.0.0.1";
  const PORT = parseInt(process.env.PORT ?? "9000", 10);

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Example API for Reports (mock for now, will implement actual logic later)
  app.get("/api/reports/inventory-expiry", (req, res) => {
    res.json([
      { id: 1, name: "Milk", expiryDate: "2026-05-01", risk: "Low" },
      { id: 2, name: "Strawberries", expiryDate: "2026-04-28", risk: "High" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app
    .listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    })
    .on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EACCES") {
        console.error(
          `Permission denied binding to ${HOST}:${PORT}. Try a different port or run with sufficient privileges.`,
        );
      } else if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Set PORT or choose a different port.`,
        );
      } else {
        console.error("Failed to start server:", err);
      }
      process.exit(1);
    });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
