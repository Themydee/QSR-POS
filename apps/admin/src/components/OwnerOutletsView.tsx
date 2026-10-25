import { useState } from 'react';
import type { OutletData, RecentActivity } from '../types.ts';
import { SearchIcon, ChevronDownIcon, PlusIcon, ArrowUpRight } from './AdminIcons.tsx';

interface OwnerOutletsViewProps {
  outlets: OutletData[];
  selectedOutlet: OutletData;
  recentActivities: RecentActivity[];
  onSelectOutlet: (outlet: OutletData) => void;
  onToggleAcceptOrders: (outletId: string) => void;
  onToggleDelivery: (outletId: string) => void;
  onTogglePickup: (outletId: string) => void;
  onOpenKitchen: (outlet: OutletData) => void;
}

export function OwnerOutletsView({
  outlets,
  selectedOutlet,
  recentActivities,
  onSelectOutlet,
  onToggleAcceptOrders,
  onToggleDelivery,
  onTogglePickup,
  onOpenKitchen,
}: OwnerOutletsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Operations' | 'Details' | 'Team'>('Operations');

  const filteredOutlets = outlets.filter((o) =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const outletActivities = recentActivities.filter(
    (a) => a.outletId === selectedOutlet.id
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Our outlets
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Keep every location ready for the next good meal.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#b83827] hover:bg-[#9f2d1e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add outlet</span>
        </button>
      </div>

      {/* Stats pills */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg border border-emerald-100">
          5 outlets open
        </span>
        <span className="text-stone-500">
          5 accepting delivery · 5 accepting pickup
        </span>
        <span className="text-stone-300">·</span>
        <span className="text-stone-500 font-medium">
          22 active orders across Lagos
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search outlet or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-stone-200/80 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]"
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shrink-0"
        >
          <span>All statuses</span>
          <ChevronDownIcon className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Outlets Table & Glance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Table */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                  <th className="py-3 px-5">Outlet</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Sales Today</th>
                  <th className="py-3 px-4 text-right">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOutlets.map((outlet) => {
                  const isSelected = outlet.id === selectedOutlet.id;
                  return (
                    <tr
                      key={outlet.id}
                      onClick={() => onSelectOutlet(outlet)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#fef2f2] text-stone-900 font-medium'
                          : 'hover:bg-stone-50/80 text-stone-700'
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5">
                          <p className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-[#b83827]' : 'text-stone-900'}`}>
                            {outlet.name}
                          </p>
                          {isSelected && (
                            <span className="text-[#b83827] font-bold text-sm">→</span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">{outlet.address}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/50">
                          {outlet.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-stone-900">
                        ₦{outlet.salesToday.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-stone-700">
                        {outlet.activeOrders}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Outlet Glance Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4">
              {selectedOutlet.name} · Today at a glance
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {selectedOutlet.ordersToday}
                </p>
                <p className="text-xs text-stone-400 mt-1">Orders today</p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {selectedOutlet.avgPrepMinutes} min
                </p>
                <p className="text-xs text-stone-400 mt-1">Avg. preparation</p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {selectedOutlet.onTimeRate}%
                </p>
                <p className="text-xs text-stone-400 mt-1">On-time readiness</p>
              </div>
            </div>

            {/* Status pills */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-100">
                {selectedOutlet.activeIncoming} incoming
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-100">
                {selectedOutlet.activePreparing} preparing
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-100">
                {selectedOutlet.activeReady} ready
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenKitchen(selectedOutlet)}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
              <span>Open {selectedOutlet.name} kitchen board</span>
            </button>
          </div>

          {/* Recent activity */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-3">Recent activity</h3>
            <div className="space-y-2.5">
              {outletActivities.length > 0 ? (
                outletActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <span className="font-bold text-stone-400 shrink-0">{act.time}</span>
                    <span className="text-stone-700">{act.text}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-3 text-xs text-stone-500">
                  <span className="font-bold text-stone-400">09:00</span>
                  <span>{selectedOutlet.name} opened for service today.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Outlet Detailed Configuration */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          {/* Storefront Hero Photo */}
          <div className="h-44 w-full bg-stone-100 relative overflow-hidden">
            <img
              src={selectedOutlet.photoUrl}
              alt={selectedOutlet.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                {selectedOutlet.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/50">
                {selectedOutlet.status}
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-4 font-mono">
              Outlet code · {selectedOutlet.code}
            </p>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-stone-200/80 text-xs font-bold mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('Operations')}
                className={`pb-2.5 transition-colors cursor-pointer ${
                  activeTab === 'Operations'
                    ? 'border-b-2 border-[#b83827] text-[#b83827]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Operations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Details')}
                className={`pb-2.5 transition-colors cursor-pointer ${
                  activeTab === 'Details'
                    ? 'border-b-2 border-[#b83827] text-[#b83827]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Team')}
                className={`pb-2.5 transition-colors cursor-pointer ${
                  activeTab === 'Team'
                    ? 'border-b-2 border-[#b83827] text-[#b83827]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Team
              </button>
            </div>

            {/* Tab content: Operations */}
            {activeTab === 'Operations' && (
              <div className="space-y-6">
                {/* Toggles */}
                <div className="space-y-4">
                  {/* Accept new orders */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-stone-900">Accept new orders</p>
                      <p className="text-[11px] text-stone-500">
                        Customers can place orders now
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleAcceptOrders(selectedOutlet.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedOutlet.acceptingOrders ? 'bg-emerald-600' : 'bg-stone-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          selectedOutlet.acceptingOrders ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Delivery */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-stone-900">Delivery</p>
                      <p className="text-[11px] text-stone-500">
                        Within a {selectedOutlet.deliveryRadius} · ₦{selectedOutlet.deliveryFee.toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleDelivery(selectedOutlet.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedOutlet.deliveryEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          selectedOutlet.deliveryEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Pickup */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-stone-900">Pickup</p>
                      <p className="text-[11px] text-stone-500">
                        Free · {selectedOutlet.pickupPrepTime} preparation
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onTogglePickup(selectedOutlet.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedOutlet.pickupEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          selectedOutlet.pickupEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs font-bold text-stone-900 mb-1">Operating hours</p>
                  <p className="text-xs text-stone-700">{selectedOutlet.operatingHours}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Timezone: West Africa Time (WAT)
                  </p>
                </div>

                {/* On the ground */}
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs font-bold text-stone-900 mb-1">On the ground</p>
                  <p className="text-xs text-stone-700">{selectedOutlet.address}, Lagos</p>
                  <p className="text-xs text-stone-700 mt-0.5">
                    Manager: <strong>{selectedOutlet.managerName}</strong>
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {selectedOutlet.phone} · {selectedOutlet.teamCount} team members on shift
                  </p>
                </div>

                {/* Edit Button */}
                <button
                  type="button"
                  className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 shadow-2xs transition-colors cursor-pointer"
                >
                  Edit outlet settings
                </button>

                <p className="text-[11px] text-stone-400 text-center">
                  Last updated today at 9:00 AM by Amaka
                </p>
              </div>
            )}

            {/* Details tab */}
            {activeTab === 'Details' && (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5">Full Legal Address</span>
                  <p className="font-semibold text-stone-800">{selectedOutlet.address}, Lagos, Nigeria</p>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Direct Manager Line</span>
                  <p className="font-semibold text-stone-800">{selectedOutlet.phone}</p>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Kitchen Terminal Target</span>
                  <p className="font-semibold text-stone-800">Port 3002 (WebSockets active)</p>
                </div>
              </div>
            )}

            {/* Team tab */}
            {activeTab === 'Team' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <p className="font-bold text-stone-900">{selectedOutlet.managerName}</p>
                  <p className="text-stone-500">General Manager · Shift Active</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <p className="font-bold text-stone-900">Head Chef &amp; Kitchen Lead</p>
                  <p className="text-stone-500">On duty · 7 active tickets</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
