// App.jsx
import { useState, useRef } from "react";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import ChartCard from "./components/ChartCard";
import BarChart from "./components/BarChart";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />

      <h2 className="text-2xl mb-4">Dashboard</h2>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Line Chart */}
        <ChartCard title="Live Stock Price" className="md:col-span-2 h-96">
          <Dashboard ref={dashboardRef} symbol={selectedSymbol} />
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard title="Daily Stock Overview" className="h-96">
          <BarChart symbol={selectedSymbol} initialStock={quote} />
        </ChartCard>
      </div>
    </div>
  );
}

export default App;
