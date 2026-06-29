export function calculateMetrics(data) {
  const totalRecords = data.length;
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const totalCtr =
    data.reduce((sum, item) => sum + item.ctr, 0) / (totalRecords || 1);
  const avgRank =
    data.reduce((sum, item) => sum + item.rank, 0) / (totalRecords || 1);

  return {
    totalRecords,
    totalClicks,
    averageCtr: totalCtr.toFixed(2),
    averageRank: avgRank.toFixed(2),
  };
}

export function prepareChartData(data) {
  const grouped = {};

  data.forEach((item) => {
    if (!grouped[item.date]) {
      grouped[item.date] = {
        date: item.date,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        rank: 0,
        count: 0,
      };
    }

    grouped[item.date].clicks += item.clicks;
    grouped[item.date].impressions += item.impressions;
    grouped[item.date].ctr += item.ctr;
    grouped[item.date].rank += item.rank;
    grouped[item.date].count += 1;
  });

  return Object.values(grouped).map((item) => ({
    date: item.date,
    clicks: item.clicks,
    impressions: item.impressions,
    ctr: Number((item.ctr / item.count).toFixed(2)),
    rank: Number((item.rank / item.count).toFixed(2)),
  }));
}