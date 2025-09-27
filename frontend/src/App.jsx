import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import ChartCard from "./components/ChartCard";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <StatsGrid />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <ChartCard title="Unique Visitors" className="md:col-span-2 h-96">
          <Dashboard />
        </ChartCard>
        <ChartCard title="Income Overview" value="$7,650" className="h-96" />
      </div>
    </div>
  );
}

export default App;
