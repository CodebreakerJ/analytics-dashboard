const categories = ["SEO", "Ads", "Social", "Email"];
const statuses = ["Active", "Paused", "Completed"];
const devices = ["Desktop", "Mobile", "Tablet"];
const sources = ["Google", "Bing", "Facebook", "Direct"];

export const mockRecords = Array.from({ length: 80000 }, (_, index) => {
  const clicks = Math.floor(Math.random() * 1000);
  const impressions = clicks + Math.floor(Math.random() * 5000);
  const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;

  return {
    id: index + 1,
    keyword: `Keyword ${index + 1}`,
    category: categories[index % categories.length],
    status: statuses[index % statuses.length],
    device: devices[index % devices.length],
    source: sources[index % sources.length],
    clicks,
    impressions,
    ctr: Number(ctr),
    rank: Math.floor(Math.random() * 100) + 1,
    date: `2026-06-${String((index % 20) + 1).padStart(2, "0")}`,
  };
});

export const initialAnnotations = [
  {
    id: 1,
    date: "2026-06-05",
    title: "SEO Campaign Launch",
    description: "New SEO campaign started.",
  },
  {
    id: 2,
    date: "2026-06-12",
    title: "Google Algorithm Update",
    description: "Ranking changes observed.",
  },
];