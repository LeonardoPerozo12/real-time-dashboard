import fetch from "node-fetch";

export async function getStockData(symbol) {
  const API_KEY = process.env.TWELVEDATA_API_KEY?.trim();

  if (!symbol || typeof symbol !== "string") {
    throw new Error("Symbol parameter is required and must be a string");
  }

  if (!API_KEY) {
    console.error("TwelveData API key is not defined!");
    return {
      symbol,
      price: "N/A",
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(
        symbol
      )}&apikey=${API_KEY}`
    );

    if (!res.ok) {
      console.error("HTTP error from TwelveData:", res.status);
      return {
        symbol,
        price: "N/A",
        timestamp: new Date().toISOString(),
      };
    }

    const data = await res.json();
    console.log(`TwelveData API response for ${symbol}:`, data);

    if (data.status === "error") {
      console.error("TwelveData API error:", data);
      return {
        symbol,
        price: "N/A",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      symbol: data.symbol,
      name: data.name,
      currency: data.currency,
      date: data.datetime,
      open: parseFloat(data.open),
      high: parseFloat(data.high),
      low: parseFloat(data.low),
      close: parseFloat(data.close),
      price: parseFloat(data.close),
      change: parseFloat(data.change),
      percent_change: parseFloat(data.percent_change),
      volume: parseInt(data.volume, 10),
      previous_close: parseFloat(data.previous_close),
      average_volume: parseInt(data.average_volume, 10),
    };
  } catch (err) {
    console.error("Error fetching stock data:", err);
    return {
      symbol,
      price: "N/A",
      timestamp: new Date().toISOString(),
    };
  }
}
