import dotenv from "dotenv";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import routes from "./routes.js";
import { fetchStockWithCache } from "./services/cacheService.js";
import { setWss } from "./services/broadcast.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// REST API routes
app.use("/api", routes);

const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server });

// Set the WebSocketServer instance for broadcasting
setWss(wss);

wss.on("connection", (ws) => {
  let clientSymbol = null;
  let intervalId = null;

  console.log("Client connected");

  ws.on("message", async (msg) => {
    try {
      const { type, payload } = JSON.parse(msg);

      if (type === "set_symbol" && payload?.symbol) {
        // Clear previous interval if exists
        if (intervalId) clearInterval(intervalId);

        clientSymbol = payload.symbol.toUpperCase();
        console.log("Symbol set to:", clientSymbol);

        // Send immediate stock update
        const stock = await fetchStockWithCache(clientSymbol);
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ type: "stock_update", payload: stock }));
        }

        // Start interval for periodic updates
        intervalId = setInterval(async () => {
          try {
            if (!clientSymbol) return;
            const stock = await fetchStockWithCache(clientSymbol);
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ type: "stock_update", payload: stock }));
            }
          } catch (err) {
            console.error("Error broadcasting stock update:", err);
          }
        }, 15000); // every 15s
      }
    } catch (err) {
      console.error("WebSocket message error:", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (intervalId) clearInterval(intervalId);
  });
});

// Simple base route
app.get("/", (req, res) => {
  res.send("<h1>Arduron Test</h1>");
});

// Health check route (optional)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
