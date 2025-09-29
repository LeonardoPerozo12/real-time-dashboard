import ChartCard from "./ChartCard";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

export default function AdditionalCharts({ quote, symbol }) {
  if (!symbol || !quote) return null;

  // Close vs Previous Close
  const closeData = {
    labels: ["Previous Close", "Current Close"],
    datasets: [
      {
        // Make sure the data is parsed as numbers to avoid Chart.js issues
        data: [parseFloat(quote.previous_close), parseFloat(quote.close)],
        backgroundColor: ["#8884d8", "#82ca9d"],
      },
    ],
  };

  // Volume vs Average Volume
  const volumeData = {
    labels: ["Average Volume", "Current Volume"],
    datasets: [
      {
        // Parse numbers
        data: [parseFloat(quote.average_volume), parseFloat(quote.volume)],
        backgroundColor: ["#ffc658", "#ff8042"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Bar Chart */}
      <ChartCard title="Daily Stock Overview" className="h-96">
        <BarChart symbol={symbol} initialStock={quote} />
      </ChartCard>

      {/* Pie Chart: Close vs Previous Close */}
      <ChartCard title="Close vs Previous Close" className="h-96">
        {/* Ensure PieChart fills the card by using full width & height */}
        <div className="w-full h-full">
          <PieChart data={closeData} />
        </div>
      </ChartCard>

      {/* Pie Chart: Volume Comparison */}
      <ChartCard title="Volume Comparison" className="h-96">
        <div className="w-full h-full">
          <PieChart data={volumeData} />
        </div>
      </ChartCard>
    </div>
  );
}
