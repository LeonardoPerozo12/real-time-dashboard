import fetch from "node-fetch";

export async function symbolSearch(query) {
  const API_KEY = process.env.TWELVEDATA_API_KEY?.trim();

  if (!API_KEY) {
    throw new Error("API key is missing or invalid");
  }

  if (!query || typeof query !== "string" || query.trim().length < 1) {
    throw new Error("Query parameter is required and must be a non-empty string");
  }

  const url = `https://api.twelvedata.com/symbol_search?symbol=${encodeURIComponent(
    query
  )}&apikey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TwelveData API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data || !data.data) {
    throw new Error("Invalid response from TwelveData API");
  }

  return data;
}
