import { useState, useRef } from "react";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import ChartCard from "./components/ChartCard";
import AdditionalCharts from "./components/AdditionalCharts";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [quote, setQuote] = useState(null);
  const [searchReset, setSearchReset] = useState(false);
  const dashboardRef = useRef();

  const handleSelectSymbol = async (symbol) => {
    setSelectedSymbol(symbol);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HTTP}/api/stocks?symbol=${symbol}`
      );
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Error fetching stock:", err);
      setQuote(null);
    }
  };

  const handleClear = () => {
    dashboardRef.current?.clearData();
    setSearchReset((prev) => !prev);
    setQuote(null);
    setSelectedSymbol(null);
  };

  return (
    <div className="min-h-screen bg-gray-100  p-6">
      <Header />
      {/* Stats */}
      <StatsGrid quote={quote} />

      <div className="flex items-center mt-6 space-x-4">
        {/* Search Bar */}
        <SearchBar onSelect={handleSelectSymbol} reset={searchReset} />

        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {/* Line Chart */}
      <ChartCard title="Live Stock Price" className="md:col-span-2 h-96 mt-6">
        <Dashboard ref={dashboardRef} symbol={selectedSymbol} />
      </ChartCard>

      {/* Additional Charts: barra + dos pie charts */}
      <AdditionalCharts quote={quote} symbol={selectedSymbol} />
    </div>
  );
}

export default App;
