import { useState, useEffect, useRef } from "react";
import localSymbols from "../data/symbols";

export default function SearchBar({ onSelect, reset }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);

  // Reset the input and results when `reset` prop changes
  useEffect(() => {
    if (reset) {
      setQuery("");
      setResults([]);
    }
  }, [reset]);

  // Function to search stocks
  const searchStocks = async (q) => {
    if (!q) {
      setResults([]);
      return;
    }

    // Local filtering first
    const localMatches = localSymbols.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q.toLowerCase()) ||
        s.name.toLowerCase().includes(q.toLowerCase())
    );

    setResults(localMatches);

    // Only fetch from API if there are fewer than 3 local matches
    if (localMatches.length < 3) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_HTTP}/api/symbol_search?query=${q}`
        );
        const apiResults = await res.json();

        // Merge local matches and API results
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

  // Debounced input change handler
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Set a new debounce timer
    debounceRef.current = setTimeout(() => {
      searchStocks(value);
    }, 500); // 500ms debounce
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        className="w-full border rounded-xl p-2"
        placeholder="Search stock symbol..."
        value={query}
        onChange={handleChange}
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
