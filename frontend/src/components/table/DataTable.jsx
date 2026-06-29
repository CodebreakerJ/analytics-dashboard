import { useEffect, useMemo, useRef, useState } from "react";
import { Settings2 } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";

const allColumns = [
  { key: "id", label: "ID", width: "80px" },
  { key: "keyword", label: "Keyword", width: "220px" },
  { key: "category", label: "Category", width: "130px" },
  { key: "status", label: "Status", width: "130px" },
  { key: "device", label: "Device", width: "130px" },
  { key: "source", label: "Source", width: "130px" },
  { key: "clicks", label: "Clicks", width: "120px" },
  { key: "impressions", label: "Impressions", width: "150px" },
  { key: "ctr", label: "CTR", width: "100px" },
  { key: "rank", label: "Rank", width: "100px" },
  { key: "date", label: "Date", width: "140px" },
];

export default function DataTable({
  records,
  total,
  page,
  setPage,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  isLoading,
  sortConfig,
  setSortConfig,
}) {
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem("visibleColumns");
    return saved ? JSON.parse(saved) : allColumns.map((col) => col.key);
  });

  const parentRef = useRef(null);

  const selectedColumns = useMemo(() => {
    return allColumns.filter((col) => visibleColumns.includes(col.key));
  }, [visibleColumns]);

  const rowVirtualizer = useVirtualizer({
    count: records.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const totalPages = Math.ceil(total / limit);

function handleSort(columnKey, event) {
  if (event.shiftKey) {
    setSortConfig((prev) => {
      const existing = prev.find((item) => item.key === columnKey);

      if (existing) {
        return prev.map((item) =>
          item.key === columnKey
            ? { ...item, order: item.order === "asc" ? "desc" : "asc" }
            : item
        );
      }

      return [...prev, { key: columnKey, order: "asc" }];
    });
  } else {
    setSortConfig((prev) => {
      const existing = prev.find((item) => item.key === columnKey);

      if (existing && prev.length === 1) {
        return [
          {
            key: columnKey,
            order: existing.order === "asc" ? "desc" : "asc",
          },
        ];
      }

      return [{ key: columnKey, order: "asc" }];
    });
  }

  setSortBy(columnKey);
  setPage(1);
}

  function toggleColumn(columnKey) {
    setVisibleColumns((prev) => {
      if (prev.includes(columnKey)) {
        return prev.filter((col) => col !== columnKey);
      }

      return [...prev, columnKey];
    });
  }

  function resetColumns() {
    setVisibleColumns(allColumns.map((col) => col.key));
  }

  function getCellValue(row, key) {
    const value = row[key];

    if (key === "clicks" || key === "impressions") {
      return Number(value).toLocaleString();
    }

    if (key === "ctr") {
      return `${value}%`;
    }

    return value;
  }

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b p-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Keyword Data Table</h2>
          <p className="text-sm text-gray-500">
            Server-side pagination, sorting, dynamic columns and virtual rows
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            {/* <option value={10}>10 rows</option> */}
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
            <option value={250}>250 rows</option>
            <option value={500}>500 rows</option>
          </select>

          <div className="relative">
            <button
              onClick={() => setIsColumnMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            >
              <Settings2 size={16} />
              Columns
            </button>

            {isColumnMenuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border bg-white p-4 shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Manage Columns</h3>
                  <button
                    onClick={resetColumns}
                    className="text-xs text-blue-600"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-2">
                  {allColumns.map((col) => (
                    <label
                      key={col.key}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(col.key)}
                        onChange={() => toggleColumn(col.key)}
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="mb-3 h-10 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="mb-3 text-4xl">📭</div>
          <h3 className="text-lg font-semibold text-gray-900">
            No records found
          </h3>
          <p className="text-sm text-gray-500">
            Try changing search or filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            style={{
              minWidth: selectedColumns.length * 130,
            }}
          >
            <div className="sticky top-0 z-10 grid border-b bg-gray-50">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: selectedColumns
                    .map((col) => col.width)
                    .join(" "),
                }}
              >
                {selectedColumns.map((col) => (
                  <button
                    key={col.key}
                    onClick={(event) => handleSort(col.key, event)}
                    className="border-r px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 hover:bg-gray-100"
                  >
                    {col.label}
                    {sortConfig.find((item) => item.key === col.key) && (
                      <span className="ml-1">
                        {sortConfig.find((item) => item.key === col.key).order === "asc"
                          ? "▲"
                          : "▼"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={parentRef}
              className="h-[520px] overflow-auto"
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const row = records[virtualRow.index];

                  return (
                    <div
                      key={row.id}
                      className="grid border-b text-sm hover:bg-blue-50"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                        gridTemplateColumns: selectedColumns
                          .map((col) => col.width)
                          .join(" "),
                      }}
                    >
                      {selectedColumns.map((col) => (
                        <div
                          key={col.key}
                          className="truncate border-r px-4 py-3 text-gray-700"
                          title={String(getCellValue(row, col.key))}
                        >
                          {getCellValue(row, col.key)}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-3 border-t p-5 md:flex-row">
        <p className="text-sm text-gray-600">
          Showing page <b>{page}</b> of <b>{totalPages || 1}</b> — Total{" "}
          <b>{total.toLocaleString()}</b> records
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          >
            First
          </button>

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
            {page}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(totalPages)}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}