import StatsCard from "./StatsCard";

export default function StatsGrid() {
  const stats = [
    { title: "Total Page Views", value: "442,236", change: "+59.3%", changeColor: "text-blue-500" },
    { title: "Total Users", value: "78,250", change: "+70.5%", changeColor: "text-blue-500" },
    { title: "Total Orders", value: "18,800", change: "+27.4%", changeColor: "text-yellow-500" },
    { title: "Total Sales", value: "$35,078", change: "+27.4%", changeColor: "text-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <StatsCard key={idx} {...stat} />
      ))}
    </div>
  );
}
