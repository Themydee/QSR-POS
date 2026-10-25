import type { OutletData, HourlySale } from '../types.ts';
import { CalendarIcon, ChevronDownIcon, DownloadIcon } from './AdminIcons.tsx';

interface OwnerReportsViewProps {
  outlets: OutletData[];
  hourlySales: HourlySale[];
}

export function OwnerReportsView({ outlets, hourlySales }: OwnerReportsViewProps) {
  const totalSales = outlets.reduce((sum, o) => sum + o.salesToday, 0);
  const totalOrders = outlets.reduce((sum, o) => sum + o.ordersToday, 0);
  const totalDeliveryOrders = outlets.reduce((sum, o) => sum + o.deliveryOrders, 0);
  const totalPickupOrders = outlets.reduce((sum, o) => sum + o.pickupOrders, 0);
  const deliverySales = 1080000;
  const pickupSales = 594000;

  const maxSaleValue = 800000;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            The numbers behind the good food.
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Sales and service performance across all five outlets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Exporting full sales, delivery & POS CSV report for Lagos outlets...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200/80 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <DownloadIcon className="w-4 h-4 text-stone-500" />
          <span>Export report</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-bold text-stone-700 shadow-2xs"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-stone-400" />
            <span>Today · 24 Oct 2026</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs"
          >
            <span>All 5 outlets</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-stone-400" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs"
          >
            <span>All channels</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </div>

        <p className="text-xs text-stone-400">Compared with yesterday, same time</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-6 border-b border-stone-200/80 text-xs font-bold">
        <button
          type="button"
          className="pb-2.5 border-b-2 border-[#b83827] text-[#b83827] cursor-pointer"
        >
          Sales &amp; operations
        </button>
        <button
          type="button"
          className="pb-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          Menu performance
        </button>
        <button
          type="button"
          className="pb-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          Payments
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Food sales</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            ₦{totalSales.toLocaleString()}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            ↑ 12.4% vs yesterday
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Paid orders</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {totalOrders}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            ↑ 10.7% vs yesterday
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Average order value</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            ₦9,000
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            ↑ 1.5% vs yesterday
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Avg. preparation</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            18 min
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            2 min faster than yesterday
          </p>
        </div>
      </div>

      {/* Middle Row: Hourly Chart & How customers ordered */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly food sales */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-stone-900">Hourly food sales</h2>
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
              As of 13:42 WAT
            </span>
          </div>

          <div className="h-56 flex items-end justify-around px-8 relative z-10 pt-4">
            {hourlySales.map((item) => {
              const todayHeight = Math.min(100, (item.today / maxSaleValue) * 100);
              const yesterdayHeight = Math.min(100, (item.yesterday / maxSaleValue) * 100);
              return (
                <div key={item.hour} className="flex flex-col items-center gap-2 group">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      style={{ height: `${yesterdayHeight}%` }}
                      className="w-8 sm:w-12 bg-[#ece7df] rounded-t-sm transition-all group-hover:brightness-95"
                    />
                    <div
                      style={{ height: `${todayHeight}%` }}
                      className="w-8 sm:w-12 bg-[#b83827] rounded-t-sm transition-all group-hover:bg-[#9f2d1e] shadow-xs"
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

        {/* How customers ordered */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 mb-5">
              How customers ordered
            </h2>

            {/* Delivery */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1.5">
                <span>Delivery</span>
                <span>₦{deliverySales.toLocaleString()}</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mb-1">
                <div className="bg-[#b83827] h-full rounded-full" style={{ width: '64.5%' }} />
              </div>
              <p className="text-[11px] text-stone-500">
                {totalDeliveryOrders} orders · 64.5% of sales
              </p>
            </div>

            {/* Pickup */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1.5">
                <span>Pickup</span>
                <span>₦{pickupSales.toLocaleString()}</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mb-1">
                <div className="bg-emerald-800 h-full rounded-full" style={{ width: '35.5%' }} />
              </div>
              <p className="text-[11px] text-stone-500">
                {totalPickupOrders} orders · 35.5% of sales
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-stone-600 font-semibold">
                  On-time readiness
                </span>
                <span className="text-lg font-extrabold text-stone-900">96%</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Meals marked ready within the promised preparation time. Target: 95%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Outlet Performance Breakdown */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Outlet performance breakdown
          </h2>
          <button
            type="button"
            className="text-xs font-bold text-[#b83827] hover:underline cursor-pointer"
          >
            Download CSV ↓
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                <th className="py-3 px-6">Outlet</th>
                <th className="py-3 px-4">Food Sales</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Delivery</th>
                <th className="py-3 px-4">Pickup</th>
                <th className="py-3 px-4">Avg. Prep</th>
                <th className="py-3 px-6 text-right">On Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {outlets.map((outlet) => (
                <tr key={outlet.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-stone-900">
                    {outlet.name}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    ₦{outlet.salesToday.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 font-semibold">
                    {outlet.ordersToday}
                  </td>
                  <td className="py-3.5 px-4 text-stone-700">
                    {outlet.deliveryOrders}
                  </td>
                  <td className="py-3.5 px-4 text-stone-700">
                    {outlet.pickupOrders}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {outlet.avgPrepMinutes} min
                  </td>
                  <td className="py-3.5 px-6 text-right font-bold text-emerald-700">
                    {outlet.onTimeRate}%
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="bg-stone-50 font-bold border-t-2 border-stone-200">
                <td className="py-4 px-6 text-stone-900">All outlets</td>
                <td className="py-4 px-4 text-stone-900">
                  ₦{totalSales.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-stone-900">{totalOrders}</td>
                <td className="py-4 px-4 text-stone-900">{totalDeliveryOrders}</td>
                <td className="py-4 px-4 text-stone-900">{totalPickupOrders}</td>
                <td className="py-4 px-4 text-stone-900">18 min</td>
                <td className="py-4 px-6 text-right text-emerald-800">96%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Banner */}
      <div className="p-4 bg-stone-100/70 border border-stone-200/80 rounded-2xl text-xs text-stone-600 flex items-start gap-3">
        <span className="text-stone-400 text-sm">ⓘ</span>
        <p className="leading-relaxed">
          Food sales include VAT and exclude delivery fees. Paid orders include orders still being prepared. Preparation and on-time metrics reflect orders marked ready. Live data through 13:42 WAT on 24 Oct 2026.
        </p>
      </div>
    </div>
  );
}
