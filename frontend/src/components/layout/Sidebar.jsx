import { BarChart3, LayoutDashboard, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r bg-white p-5 lg:block">
      <h2 className="mb-8 text-xl font-bold text-blue-600">AnalyticsPro</h2>

      <nav className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
          <BarChart3 size={18} />
          Reports
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
          <Settings size={18} />
          Settings
        </button>
      </nav>
    </aside>
  );
}