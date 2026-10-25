import { useState } from 'react';
import type {
  OutletData,
  MenuItemRow,
  TeamMember,
  ShiftCashSummary,
  HourlySale,
} from '../types.ts';
import {
  CalendarIcon,
  ArrowUpRight,
  KitchenIcon,
  UsersIcon,
  SearchIcon,
} from './AdminIcons.tsx';

interface OutletManagerViewProps {
  outlet: OutletData;
  hourlySales: HourlySale[];
  menuItems: MenuItemRow[];
  teamMembers: TeamMember[];
  shiftReconciliation: ShiftCashSummary;
  onToggleAcceptOrders: (outletId: string) => void;
  onToggleDelivery: (outletId: string) => void;
  onTogglePickup: (outletId: string) => void;
  onToggleItemStatus: (itemId: string, outletKey: string) => void;
  onOpenKitchen: (outlet: OutletData) => void;
}

export function OutletManagerView({
  outlet,
  hourlySales,
  menuItems,
  teamMembers,
  shiftReconciliation,
  onToggleAcceptOrders,
  onToggleDelivery,
  onTogglePickup,
  onToggleItemStatus,
  onOpenKitchen,
}: OutletManagerViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'kitchen' | 'stock' | 'shift'>('overview');
  const [stockSearch, setStockSearch] = useState('');

  const outletKey = outlet.id; // e.g. 'lekki'

  const maxSaleValue = 200000;

  const mockActiveTickets = [
    {
      id: '#BK-1052',
      customer: 'Chidinma O.',
      items: '2x Smoky Jollof & Chicken, 1x House Zobo',
      status: 'Incoming',
      time: '13:41 (1m ago)',
      type: 'Delivery',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: '#BK-1051',
      customer: 'Tunde Adeleke',
      items: '1x Suya Beef Bowl, 1x Sweet Fried Plantain',
      status: 'Incoming',
      time: '13:39 (3m ago)',
      type: 'Pickup',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: '#BK-1048',
      customer: 'Folake Alabi',
      items: '2x Smoky Jollof & Chicken, 1x House Zobo',
      status: 'Preparing',
      time: '13:32 (10m ago)',
      type: 'Delivery',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      note: 'Please pack plantain separately',
    },
    {
      id: '#BK-1046',
      customer: 'Ibrahim Musa',
      items: '1x Garden Fried Rice, 2x Beef Suya',
      status: 'Preparing',
      time: '13:24 (18m ago)',
      type: 'Delivery',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 font-bold animate-pulse',
      isOverdue: true,
    },
    {
      id: '#BK-1045',
      customer: 'Ngozi Okonjo',
      items: '1x Leaf-wrapped Moi Moi, 1x House Zobo',
      status: 'Preparing',
      time: '13:22 (20m ago)',
      type: 'Pickup',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: '#BK-1043',
      customer: 'Amina Bello',
      items: '2x Smoky Jollof & Chicken',
      status: 'Ready',
      time: '13:15',
      type: 'Delivery',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: '#BK-1041',
      customer: 'Kester Agbo',
      items: '1x Suya Beef Bowl, 1x House Zobo',
      status: 'Ready',
      time: '13:10',
      type: 'Pickup',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Good afternoon, {outlet.managerName.split(' ')[0]}.
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#b83827]/10 text-[#b83827]">
              {outlet.name}
            </span>
          </div>
          <p className="text-sm text-stone-500 mt-1">
            {outlet.address} · Outlet code: <strong className="text-stone-700 font-mono">{outlet.code}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onOpenKitchen(outlet)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#b83827] hover:bg-[#9f2d1e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <KitchenIcon className="w-4 h-4" />
            <span>Open Kitchen Screen</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-stone-200/80 rounded-xl text-xs font-bold text-stone-700 shadow-2xs"
          >
            <CalendarIcon className="w-4 h-4 text-stone-400" />
            <span>Today, 24 Oct 2026</span>
          </button>
        </div>
      </div>

      {/* 4 Scoped Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">
            {outlet.name} sales today
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            ₦{outlet.salesToday.toLocaleString()}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            ↑ 14.2% vs yesterday, same time
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Orders today</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {outlet.ordersToday}
          </p>
          <p className="text-xs font-medium text-stone-500 mt-2">
            {outlet.deliveryOrders} delivery · {outlet.pickupOrders} pickup
          </p>
        </div>

        {/* Active tickets */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Active kitchen tickets</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {outlet.activeOrders}
          </p>
          <p className="text-xs font-medium text-stone-500 mt-2">
            {outlet.activeIncoming} incoming · {outlet.activePreparing} preparing · {outlet.activeReady} ready
          </p>
        </div>

        {/* On-Time Readiness */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">On-time readiness</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            {outlet.onTimeRate}%
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-2">
            Avg. prep {outlet.avgPrepMinutes} min (Target: 95%)
          </p>
        </div>
      </div>

      {/* Sub Tabs navigation */}
      <div className="flex items-center gap-6 border-b border-stone-200/80 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveSubTab('overview')}
          className={`pb-2.5 transition-colors cursor-pointer ${
            activeSubTab === 'overview'
              ? 'border-b-2 border-[#b83827] text-[#b83827]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Branch overview &amp; ops
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('kitchen')}
          className={`pb-2.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'kitchen'
              ? 'border-b-2 border-[#b83827] text-[#b83827]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <span>Live kitchen queue</span>
          <span className="w-4 h-4 rounded-full bg-[#b83827] text-white text-[10px] flex items-center justify-center font-bold">
            {outlet.activeOrders}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('stock')}
          className={`pb-2.5 transition-colors cursor-pointer ${
            activeSubTab === 'stock'
              ? 'border-b-2 border-[#b83827] text-[#b83827]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Item stock &amp; 86&apos;ing
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('shift')}
          className={`pb-2.5 transition-colors cursor-pointer ${
            activeSubTab === 'shift'
              ? 'border-b-2 border-[#b83827] text-[#b83827]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Staff &amp; cash till ({teamMembers.length} on shift)
        </button>
      </div>

      {/* Tab 1: Overview & Operations */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Hourly Sales for this outlet */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-stone-900">
                    {outlet.name} hourly food sales
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Live branch performance compared to yesterday
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                  Live · 13:42 WAT
                </span>
              </div>

              {/* Chart */}
              <div className="h-52 flex items-end justify-around px-4 relative z-10 pt-4">
                {hourlySales.map((item) => {
                  const todayHeight = Math.min(100, (item.today / maxSaleValue) * 100);
                  const yesterdayHeight = Math.min(100, (item.yesterday / maxSaleValue) * 100);
                  return (
                    <div key={item.hour} className="flex flex-col items-center gap-2 group">
                      <div className="flex items-end gap-1.5 h-38">
                        <div
                          style={{ height: `${yesterdayHeight}%` }}
                          className="w-7 sm:w-10 bg-[#ece7df] rounded-t-sm transition-all"
                          title={`Yesterday: ₦${item.yesterday.toLocaleString()}`}
                        />
                        <div
                          style={{ height: `${todayHeight}%` }}
                          className="w-7 sm:w-10 bg-[#b83827] rounded-t-sm transition-all shadow-xs"
                          title={`Today: ₦${item.today.toLocaleString()}`}
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

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#b83827] rounded-xs" /> Today
                <span className="w-2.5 h-2.5 bg-[#ece7df] rounded-xs ml-3" /> Yesterday
              </span>
              <span className="font-bold text-stone-900">
                Peak: ₦154,000 (13:00 lunch rush)
              </span>
            </div>
          </div>

          {/* Right: Operations & Store Controls */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Live branch operational controls
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Immediate toggles taking effect on customer app and till
              </p>
            </div>

            <div className="space-y-4">
              {/* Accept new orders */}
              <div className="flex items-center justify-between p-3.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    Accept new online orders
                  </p>
                  <p className="text-[11px] text-stone-500">
                    {outlet.acceptingOrders
                      ? 'Store active · receiving web & app orders'
                      : 'Orders paused · kitchen busy'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleAcceptOrders(outlet.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    outlet.acceptingOrders ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      outlet.acceptingOrders ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between p-3.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Delivery service</p>
                  <p className="text-[11px] text-stone-500">
                    Within a {outlet.deliveryRadius} · ₦{outlet.deliveryFee.toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleDelivery(outlet.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    outlet.deliveryEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      outlet.deliveryEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Pickup */}
              <div className="flex items-center justify-between p-3.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Pickup counter</p>
                  <p className="text-[11px] text-stone-500">
                    Free · {outlet.pickupPrepTime} preparation
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTogglePickup(outlet.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    outlet.pickupEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      outlet.pickupEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Manager Hotline & Direct Kitchen link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenKitchen(outlet)}
                className="w-full py-3 px-4 bg-[#b83827] hover:bg-[#9f2d1e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <KitchenIcon className="w-4 h-4 text-white" />
                <span>Launch {outlet.name} Kitchen Screen</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Kitchen Queue */}
      {activeSubTab === 'kitchen' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Live Kitchen Tickets · {outlet.name}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Monitoring active preparation station orders in real-time
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenKitchen(outlet)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>Switch to KDS Touch Screen (Port 3002)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-stone-100 border border-stone-200/80 rounded-xl overflow-hidden">
            {mockActiveTickets.map((t) => (
              <div
                key={t.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-stone-900">
                      {t.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${t.badgeClass}`}>
                      {t.status}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500 px-2 py-0.5 bg-stone-100 rounded">
                      {t.type}
                    </span>
                    {t.isOverdue && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                        OVERDUE (&gt;15m)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-700 font-medium">
                    <strong>{t.customer}</strong> · {t.items}
                  </p>
                  {t.note && (
                    <p className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded inline-block font-semibold">
                      📝 Customer note: {t.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-400 font-mono">{t.time}</span>
                  <button
                    type="button"
                    onClick={() => onOpenKitchen(outlet)}
                    className="px-3 py-1.5 bg-white border border-stone-200 hover:border-stone-400 text-xs font-bold text-stone-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Manage Ticket →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Local Item Stock & 86'ing */}
      {activeSubTab === 'stock' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Menu availability &amp; 86&apos;ing for {outlet.name}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Toggle sold-out items to instantly remove them from the online menu and till
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dish name..."
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b83827]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {menuItems
              .filter((item) =>
                item.name.toLowerCase().includes(stockSearch.toLowerCase())
              )
              .map((item) => {
                const status = item.outletPricing[outletKey]?.status || 'Available';
                const price = item.outletPricing[outletKey]?.price || item.basePrice;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-stone-200/80 hover:border-stone-300 transition-all flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs text-stone-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-stone-400">{item.category}</p>
                        <p className="text-xs font-bold text-stone-900 mt-1">
                          ₦{price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          status === 'Available'
                            ? 'bg-emerald-50 text-emerald-800'
                            : status === 'Low stock'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {status}
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleItemStatus(item.id, outletKey)}
                        className="px-2.5 py-1 text-xs font-bold text-[#b83827] hover:bg-[#b83827]/10 rounded-lg transition-colors cursor-pointer"
                      >
                        Toggle Status
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Tab 4: Staff & Till Reconciliation */}
      {activeSubTab === 'shift' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Shift Cash Reconciliation */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-stone-900">
                  Daily Till &amp; Shift Reconciliation
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  Drawer Balanced
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {shiftReconciliation.shiftPeriod} · Lead Cashier: <strong>{shiftReconciliation.cashierName}</strong>
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl text-xs">
                <span className="text-stone-600 font-medium">Opening Till Float</span>
                <span className="font-bold text-stone-900">
                  ₦{shiftReconciliation.openingFloat.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl text-xs">
                <span className="text-stone-600 font-medium">Cash Collected at Counter</span>
                <span className="font-bold text-emerald-700">
                  +₦{shiftReconciliation.cashCollected.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl text-xs">
                <span className="text-stone-600 font-medium">Paystack / Card POS Terminals</span>
                <span className="font-bold text-stone-900">
                  ₦{shiftReconciliation.posCollected.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs">
                <span className="font-bold text-stone-900">Total Physical Cash in Drawer</span>
                <span className="font-extrabold text-sm text-stone-900">
                  ₦{shiftReconciliation.actualCashInTill.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert(`Shift reconciliation approved by ${outlet.managerName}. Register locked and balanced.`)}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Approve &amp; Sign Off Morning Shift
              </button>
            </div>
          </div>

          {/* On-Duty Team */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Team On Shift ({teamMembers.length})
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Currently active staff roster at {outlet.name}
                </p>
              </div>
              <UsersIcon className="w-5 h-5 text-stone-400" />
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200/80 rounded-xl overflow-hidden">
              {teamMembers.map((tm) => (
                <div key={tm.id} className="p-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{tm.name}</p>
                    <p className="text-[11px] text-stone-500">{tm.role} · {tm.shift}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tm.status === 'On shift'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {tm.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
