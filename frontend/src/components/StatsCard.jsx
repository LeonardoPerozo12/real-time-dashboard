export default function StatsCard({ title, value, change, changeColor = "text-blue-500" }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`${changeColor} text-sm`}>{change}</p>
    </div>
  );
}
