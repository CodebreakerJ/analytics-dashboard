import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../api/dashboardApi";
import SummaryCards from "../components/widgets/SummaryCards";
import DashboardFilters from "../components/filters/DashboardFilters";
import InsightsChart from "../components/charts/InsightsChart";
import DataTable from "../components/table/DataTable";
import useDebounce from "../hooks/useDebounce";
import { calculateMetrics, prepareChartData } from "../utils/calculateMetrics";
import { initialAnnotations } from "../data/mockData";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortConfig, setSortConfig] = useState([
  { key: "id", order: "asc" },
]);

  const [filters, setFilters] = useState({
    category: "",
    status: "",
    device: "",
    rankRange: "",
  });

  const [annotations, setAnnotations] = useState(() => {
    const saved = localStorage.getItem("annotations");
    return saved ? JSON.parse(saved) : initialAnnotations;
  });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify(annotations));
  }, [annotations]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "dashboard-data",
      page,
      limit,
      debouncedSearch,
      sortBy,
      sortOrder,
      sortConfig,
      filters,
    ],
    queryFn: () =>
      fetchDashboardData({
        page,
        limit,
        search: debouncedSearch,
        sortBy,
        sortOrder,
        sortConfig,
        filters,
      }),
    keepPreviousData: true,
  });

const records = data?.records || [];
const total = data?.total || 0;

const metrics = data?.metrics || calculateMetrics(records);
const chartData = data?.chartData || prepareChartData(records);

return (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />

    <main className="flex-1">
      <Header />

      <div className="space-y-6 p-4 md:p-6">
        <SummaryCards metrics={metrics} isLoading={isLoading} />

        <DashboardFilters
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
        />

        {isFetching && (
          <p className="text-sm text-blue-600">
            Updating data from cache/API...
          </p>
        )}

        <InsightsChart
          chartData={chartData}
          annotations={annotations}
          setAnnotations={setAnnotations}
        />

        <DataTable
          records={records}
          total={total}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          isLoading={isLoading}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
      </div>
    </main>
  </div>
);
}