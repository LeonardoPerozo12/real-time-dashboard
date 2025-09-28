import StatsCard from "./StatsCard";

export default function StatsGrid({ quote }) {
  const stats = quote
    ? [
        {
          title: "Price",
          value: `$${quote.price}`,
          change: `${quote.change}`,
          changeColor: quote.change >= 0 ? "text-blue-500" : "text-red-500",
        },
        {
          title: "Percent Change",
          value: `${quote.percent_change}%`,
          change: "",
          changeColor:
            quote.percent_change >= 0 ? "text-blue-500" : "text-red-500",
        },
        {
          title: "Currency",
          value: quote.currency || "-",
          change: "",
          changeColor: "",
        },
        {
          title: "Symbol",
          value: quote.symbol || "-",
          change: "",
          changeColor: "",
        },
      ]
    : [
        { title: "Price", value: "-", change: "", changeColor: "" },
        { title: "Percent Change", value: "-", change: "", changeColor: "" },
        { title: "Currency", value: "-", change: "", changeColor: "" },
        { title: "Symbol", value: "-", change: "", changeColor: "" },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 h-full">
      {stats.map((stat, idx) => (
        <div className="h-full" key={idx}>
          <StatsCard {...stat} />
        </div>
      ))}
    </div>
  );
}
