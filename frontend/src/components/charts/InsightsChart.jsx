import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function InsightsChart({
  chartData,
  annotations,
  setAnnotations,
}) {
  const [visibleMetrics, setVisibleMetrics] = useState({
    clicks: true,
    impressions: true,
    ctr: true,
    rank: true,
  });

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    title: "",
    description: "",
  });

  function toggleMetric(metric) {
    setVisibleMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.date || !form.title) {
      alert("Please enter date and title");
      return;
    }

    if (editingId) {
      setAnnotations((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                date: form.date,
                title: form.title,
                description: form.description,
              }
            : item
        )
      );

      setEditingId(null);
    } else {
      const newAnnotation = {
        id: Date.now(),
        date: form.date,
        title: form.title,
        description: form.description,
      };

      setAnnotations((prev) => [...prev, newAnnotation]);
    }

    setForm({
      date: "",
      title: "",
      description: "",
    });
  }

  function handleEdit(annotation) {
    setEditingId(annotation.id);

    setForm({
      date: annotation.date,
      title: annotation.title,
      description: annotation.description,
    });

    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);

    setForm({
      date: "",
      title: "",
      description: "",
    });
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Traffic Insights</h2>
          <p className="text-sm text-gray-500">
            Multi-metric trend chart with timeline annotations
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          {Object.keys(visibleMetrics).map((metric) => (
            <label key={metric} className="flex items-center gap-1 capitalize">
              <input
                type="checkbox"
                checked={visibleMetrics[metric]}
                onChange={() => toggleMetric(metric)}
              />
              {metric}
            </label>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            {visibleMetrics.clicks && (
              <Line type="monotone" dataKey="clicks" stroke="#2563eb" />
            )}

            {visibleMetrics.impressions && (
              <Line type="monotone" dataKey="impressions" stroke="#16a34a" />
            )}

            {visibleMetrics.ctr && (
              <Line type="monotone" dataKey="ctr" stroke="#ea580c" />
            )}

            {visibleMetrics.rank && (
              <Line type="monotone" dataKey="rank" stroke="#9333ea" />
            )}

            {annotations.map((item) => (
              <ReferenceLine
                key={item.id}
                x={item.date}
                stroke="red"
                label="A"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4"
      >
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="rounded-lg border p-2"
        />

        <input
          type="text"
          placeholder="Annotation title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border p-2"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="rounded-lg border p-2"
        />

        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {editingId ? "Update Annotation" : "Add Annotation"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 rounded-xl border bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Annotations</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {annotations.length} Total
          </span>
        </div>

        {annotations.length === 0 ? (
          <div className="py-6 text-center text-sm text-gray-500">
            No annotations added yet.
          </div>
        ) : (
          <div className="space-y-3">
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className="flex flex-col justify-between gap-3 rounded-lg border bg-white p-3 md:flex-row md:items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {annotation.title}
                  </p>
                  <p className="text-sm text-gray-500">{annotation.date}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {annotation.description}
                  </p>
                </div>

                <button
                  onClick={() => handleEdit(annotation)}
                  className="flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <Pencil size={15} />
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}