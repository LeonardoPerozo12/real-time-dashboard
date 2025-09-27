export default function ChartCard({ title, children, value, className = "" }) {
  return (
    <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
      <h2 className="text-gray-700 font-bold mb-4">{title}</h2>
      {value && <p className="text-3xl font-bold mb-4">{value}</p>}
      <div className="h-full">{children}</div>
    </div>
  );
}