import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ symbol, initialStock }) {
  const [stock, setStock] = useState(initialStock);

  // When symbol changes, fetch fresh stock data
  useEffect(() => {
    if (!symbol) {
      setStock(null);
      return;
    }

    const fetchStock = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_HTTP}/api/stocks?symbol=${symbol}`
        );
        const data = await res.json();
        setStock(data);
      } catch (err) {
        console.error("Error fetching stock for BarChart:", err);
        setStock(null);
      }
    };

    fetchStock();
  }, [symbol]);

  // Update when initialStock changes
  useEffect(() => {
    if (initialStock) {
      setStock(initialStock);
    }
  }, [initialStock]);

  if (!stock) return <p className="text-gray-500">No stock data available</p>;

  const chartData = {
    labels: ["Open", "High", "Low", "Close"],
    datasets: [
      {
        label: `${stock.symbol} Prices`,
        data: [
          parseFloat(stock.open),
          parseFloat(stock.high),
          parseFloat(stock.low),
          parseFloat(stock.close)
        ],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { title: { display: true, text: `Price (${stock.currency})` } },
      x: { title: { display: true, text: "Type" } },
    },
  };

  return <Bar data={chartData} options={options} />;
}
