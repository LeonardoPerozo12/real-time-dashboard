import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const StockChart = ({ data }) => {
  console.log("StockChart data:", data);
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()), // <-- usar "date"
    datasets: [
      {
        label: "Stock Price",
        data: data.map((d) => d.price),
        borderColor: "#8884d8",
        backgroundColor: "rgba(136, 132, 216, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price ($)" } },
    },
  };

  return (
    <div style={{ width: "100%", height: "35vh" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
