import { Bell, CalendarDays, RefreshCcw } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col justify-between gap-4 border-b bg-white px-6 py-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Monitor performance, rankings and search insights
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <CalendarDays size={16} />
          Last 30 Days
        </button>

        <button className="rounded-lg border p-2">
          <RefreshCcw size={16} />
        </button>

        <button className="rounded-lg border p-2">
          <Bell size={16} />
        </button>

        <div className="h-9 w-9 rounded-full bg-blue-600 text-center text-sm font-bold leading-9 text-white">
          A
        </div>
      </div>
    </header>
  );
}