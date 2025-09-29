export default function ChartCard({ title, children, className = "" }) {
  return (
    <div
      className={`p-4 bg-white rounded-lg shadow relative overflow-hidden ${className}`}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
