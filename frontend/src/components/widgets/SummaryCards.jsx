import { Activity, BarChart3, MousePointerClick, TrendingUp } from "lucide-react";

export default function SummaryCards({ metrics, isLoading }) {
  const cards = [
    {
      title: "Total Records",
      value: metrics.totalRecords.toLocaleString(),
      icon: BarChart3,
      trend: "+8.4%",
    },
    {
      title: "Total Clicks",
      value: metrics.totalClicks.toLocaleString(),
      icon: MousePointerClick,
      trend: "+12.8%",
    },
    {
      title: "Average CTR",
      value: `${metrics.averageCtr}%`,
      icon: TrendingUp,
      trend: "+4.2%",
    },
    {
      title: "Average Rank",
      value: metrics.averageRank,
      icon: Activity,
      trend: "-2.1%",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-32 animate-pulse rounded-xl bg-white shadow" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Icon size={22} />
              </div>

              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                {card.trend}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-500">{card.title}</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {card.value}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Compared to last period</p>
          </div>
        );
      })}
    </div>
  );
}