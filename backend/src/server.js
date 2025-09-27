import dotenv from "dotenv";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import routes from "./routes.js";
import { getStockData } from "./dataService.js";

dotenv.config();  

const app = express();
app.use(cors());
app.use(express.json());

// REST API
app.use("/api", routes);

const server = http.createServer(app);

// WebSocket
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected ");

  ws.on("close", () => console.log("Client disconnected "));
});

// Broadcast helper
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

setInterval(async () => {
  const stock = await getStockData();
  broadcast({ type: "stock_update", payload: stock });
}, 10000); // every 10 seconds (6 times per minute)

app.get("/", (req, res) => {
  res.send("<h1>Arduron Test<h1>");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});

