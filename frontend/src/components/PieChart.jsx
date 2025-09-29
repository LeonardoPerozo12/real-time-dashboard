import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ title, data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
