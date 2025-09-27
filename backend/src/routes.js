import { Router } from "express";
import { getStockData } from "./dataService.js";

const router = Router();

//initial stock data fetch
router.get("/stocks", async (req, res) => {
    const stock = await getStockData();
    res.json(stock);
});

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;