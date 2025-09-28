import { useState, useEffect } from "react";
import localSymbols from "../data/symbols.json";

export default function SearchBar({ onSelect, reset }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (reset) {
      setQuery("");
      setResults([]);
    }
  }, [reset]);

  const handleSearch = async (q) => {
    setQuery(q);

    if (!q) {
      setResults([]);
      return;
    }

    // Local Filtering
    const localMatches = localSymbols.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q.toLowerCase()) ||
        s.name.toLowerCase().includes(q.toLowerCase())
    );

    setResults(localMatches);

    // If there are few matches, just fetch from the API
    if (localMatches.length < 3) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_HTTP}/api/symbol_search?query=${q}`
        );
        const apiResults = await res.json();

        // Combine local + API results
        const combined = [
          ...localMatches,
          ...apiResults.data.map((r) => ({
            symbol: r.symbol,
            name: r.name,
            exchange: r.exchange,
          })),
        ];

        setResults(combined);
      } catch (err) {
        console.error("Error fetching from API:", err);
      }
    }
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        className="w-full border rounded-xl p-2"
        placeholder="Search stock symbol..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded mt-1 max-h-60 overflow-y-auto shadow">
          {results.map((r, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(r.symbol);
                setQuery(r.symbol);
                setResults([]);
              }}
            >
              <span className="font-bold">{r.symbol}</span> - {r.name} ({r.exchange})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
