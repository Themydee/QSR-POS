import type { OutletData, AttentionItem, HourlySale } from '../types.ts';
import { CalendarIcon, ArrowUpRight } from './AdminIcons.tsx';

interface OwnerOverviewViewProps {
  outlets: OutletData[];
  attentionItems: AttentionItem[];
  hourlySales: HourlySale[];
  onSelectOutlet: (outlet: OutletData) => void;
  onNavigateToOutlets: () => void;
}

export function OwnerOverviewView({
  outlets,
  attentionItems,
  hourlySales,
  onSelectOutlet,
  onNavigateToOutlets,
}: OwnerOverviewViewProps) {
  const totalSales = outlets.reduce((sum, o) => sum + o.salesToday, 0);
  const totalOrders = outlets.reduce((sum, o) => sum + o.ordersToday, 0);
  const totalActive = outlets.reduce((sum, o) => sum + o.activeOrders, 0);
  const totalIncoming = outlets.reduce((sum, o) => sum + o.activeIncoming, 0);
  const totalPreparing = outlets.reduce((sum, o) => sum + o.activePreparing, 0);
  const totalReady = outlets.reduce((sum, o) => sum + o.activeReady, 0);

  // Maximum value for scaling the sales bar chart
  const maxSaleValue = 800000;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Good afternoon, Amaka.
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Here&apos;s how Buka &amp; Co. is serving Lagos today.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-bold text-stone-700 shadow-sm hover:bg-stone-50 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <CalendarIcon className="w-4 h-4 text-stone-400" />
          <span>Today, 24 Oct 2026</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales today */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Sales today</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            ₦{totalSales.toLocaleString()}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑ 12.4%</span>
            <span className="text-stone-400">vs yesterday, same time</span>
          </p>
        </div>

        {/* Orders today */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Orders today</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {totalOrders}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑ 18 orders</span>
            <span className="text-stone-400">vs yesterday</span>
          </p>
        </div>

        {/* Active orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Active orders</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {totalActive}
          </p>
          <p className="text-xs font-medium text-stone-500 mt-2">
            {totalIncoming} incoming · {totalPreparing} preparing · {totalReady} ready
          </p>
        </div>

        {/* Outlets open */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Outlets open</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {outlets.filter((o) => o.status === 'Open').length} / {outlets.length}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            All locations accepting orders
          </p>
        </div>
      </div>

      {/* Middle Row: Sales through the day chart & Needs a little attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sales through the day */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-stone-900">Sales through the day</h2>
              <div className="flex items-center gap-4 mt-1.5 text-xs">
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#b83827]" />
                  <span>Today</span>
                </span>
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#ece7df]" />
                  <span>Yesterday, same time</span>
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
              Live · 13:42
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="relative pt-6 pb-2">
            {/* Horizontal guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-stone-300 font-medium pb-8">
              <div className="border-b border-stone-100 flex items-center justify-between">
                <span>₦800k</span>
              </div>
              <div className="border-b border-stone-100 flex items-center justify-between">
                <span>₦400k</span>
              </div>
              <div className="border-b border-stone-100 flex items-center justify-between">
                <span>₦0</span>
              </div>
            </div>

            {/* Bars container */}
            <div className="h-56 flex items-end justify-around px-8 relative z-10">
              {hourlySales.map((item) => {
                const todayHeight = Math.min(100, (item.today / maxSaleValue) * 100);
                const yesterdayHeight = Math.min(100, (item.yesterday / maxSaleValue) * 100);
                return (
                  <div key={item.hour} className="flex flex-col items-center gap-2 group">
                    <div className="flex items-end gap-1.5 h-44">
                      {/* Yesterday Bar */}
                      <div
                        style={{ height: `${yesterdayHeight}%` }}
                        className="w-7 sm:w-10 bg-[#ece7df] rounded-t-sm transition-all group-hover:brightness-95"
                        title={`Yesterday ${item.hour}: ₦${item.yesterday.toLocaleString()}`}
                      />
                      {/* Today Bar */}
                      <div
                        style={{ height: `${todayHeight}%` }}
                        className="w-7 sm:w-10 bg-[#b83827] rounded-t-sm transition-all group-hover:bg-[#9f2d1e] shadow-xs"
                        title={`Today ${item.hour}: ₦${item.today.toLocaleString()}`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-stone-500">
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Needs a little attention */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-stone-900">Needs a little attention</h2>
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                {attentionItems.length}
              </span>
            </div>

            <div className="space-y-3">
              {attentionItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.severity === 'amber'
                      ? 'bg-amber-50/70 border-amber-200/80'
                      : 'bg-white border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-stone-900">{item.title}</p>
                    <span className="text-[11px] font-medium text-stone-500">
                      {item.outlet}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span>Automated real-time stock telemetry</span>
            <span className="text-[#b83827] font-semibold hover:underline cursor-pointer">
              Resolve all →
            </span>
          </div>
        </div>
      </div>

      {/* Five outlets, one view */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">Five outlets, one view</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Today&apos;s food sales include VAT and exclude delivery fees.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToOutlets}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Manage outlets</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                <th className="py-3 px-6">Outlet</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sales</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Active</th>
                <th className="py-3 px-4">Avg. Prep</th>
                <th className="py-3 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {outlets.map((outlet) => (
                <tr
                  key={outlet.id}
                  className="hover:bg-stone-50/80 transition-colors group"
                >
                  <td className="py-3.5 px-6">
                    <p className="font-bold text-stone-900 text-xs sm:text-sm">
                      {outlet.name}
                    </p>
                    <p className="text-[11px] text-stone-400">{outlet.managerName}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/50">
                      {outlet.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    ₦{outlet.salesToday.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-700">
                    {outlet.ordersToday}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-700">
                    {outlet.activeOrders}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-medium">
                    {outlet.avgPrepMinutes} min
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectOutlet(outlet)}
                      className="inline-flex items-center gap-1 font-bold text-xs text-[#b83827] hover:text-[#9f2d1e] cursor-pointer"
                    >
                      <span>View</span>
                      <span>→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom summary strip */}
        <div className="py-3 px-6 bg-stone-50/60 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            <span>Updated just now · All times in WAT</span>
          </div>
          <div>
            <span>Average order value <strong>₦9,000</strong></span>
            <span className="mx-2">·</span>
            <span>On-time readiness <strong>96%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
