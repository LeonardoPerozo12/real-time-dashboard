// backend/src/dataService.js
import fetch from "node-fetch";

const SYMBOL = "AAPL";

export async function getStockData() {
  const API_KEY = process.env.TWELVEDATA_API_KEY?.trim();

  if (!API_KEY) {
    console.error("TwelveData API key is not defined!");
    return {
      symbol: SYMBOL,
      price: "N/A",
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const res = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=1min&outputsize=1&apikey=${API_KEY}`
    );

    if (!res.ok) {
      console.error("HTTP error from TwelveData:", res.status);
      return {
        symbol: SYMBOL,
        price: "N/A",
        timestamp: new Date().toISOString(),
      };
    }

    const data = await res.json();

    // 🔹 Print the full JSON response from TwelveData!!!
    console.log("TwelveData API response:", JSON.stringify(data, null, 2));

    if (data.status === "error") {
      console.error("TwelveData API error:", data);
      return {
        symbol: SYMBOL,
        price: "N/A",
        timestamp: new Date().toISOString(),
      };
    }

    const latest = data.values[0];

    return {
      symbol: SYMBOL,
      price: parseFloat(latest.close),
      timestamp: latest.datetime,
    };
  } catch (err) {
    console.error("Error fetching stock data:", err);
    return {
      symbol: SYMBOL,
      price: "N/A",
      timestamp: new Date().toISOString(),
    };
  }
}
