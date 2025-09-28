import { Router } from "express";
import { getStockData } from "./services/dataService.js";
import { symbolSearch } from "./services/symbolSearch.js";

const router = Router();

// Stock data fetch
router.get("/stocks", async (req, res) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "Query parameter 'symbol' is required" });
    }

    const stock = await getStockData(symbol);
    res.json(stock);
  } catch (err) {
    console.error("Error fetching stocks:", err.message);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// Symbol search
router.get("/symbol_search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter 'query' is required" });
    }

    const data = await symbolSearch(query);
    res.json(data);
  } catch (err) {
    console.error("Error in /symbol_search:", err.message);
    res.status(500).json({ error: err.message || "Failed to fetch symbol search" });
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
