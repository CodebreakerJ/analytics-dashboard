export default function DashboardFilters({
  search,
  setSearch,
  filters,
  setFilters,
}) {
  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Search keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border p-2"
        />

        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">All Categories</option>
          <option value="SEO">SEO</option>
          <option value="Ads">Ads</option>
          <option value="Social">Social</option>
          <option value="Email">Email</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.device}
          onChange={(e) => updateFilter("device", e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">All Devices</option>
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
          <option value="Tablet">Tablet</option>
        </select>

        <select
          value={filters.rankRange}
          onChange={(e) => updateFilter("rankRange", e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">All Ranks</option>
          <option value="1-10">1 - 10</option>
          <option value="11-50">11 - 50</option>
          <option value="51-100">51 - 100</option>
        </select>
      </div>
    </div>
  );
}