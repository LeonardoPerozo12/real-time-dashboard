import { getStockData } from "./dataService.js";

const stockCache = {}; // { [symbol]: { data, timestamp } }
const CACHE_TIME = 15000; // 15 seconds

export async function fetchStockWithCache(symbol) {
  if (!symbol || typeof symbol !== "string") {
    throw new Error("Symbol is required and must be a string");
  }

  const now = Date.now();
  const cacheEntry = stockCache[symbol.toUpperCase()];

  if (cacheEntry && now - cacheEntry.timestamp < CACHE_TIME) {
    return cacheEntry.data;
  }

  const data = await getStockData(symbol.toUpperCase());
  stockCache[symbol.toUpperCase()] = { data, timestamp: now };
  return data;
}
