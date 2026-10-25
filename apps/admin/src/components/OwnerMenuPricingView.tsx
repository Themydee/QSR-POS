import { useState } from 'react';
import type { MenuItemRow } from '../types.ts';
import { SearchIcon, ChevronDownIcon, PlusIcon } from './AdminIcons.tsx';

interface OwnerMenuPricingViewProps {
  menuItems: MenuItemRow[];
  onToggleOutletItemStatus: (itemId: string, outletKey: string) => void;
}

export function OwnerMenuPricingView({
  menuItems,
  onToggleOutletItemStatus,
}: OwnerMenuPricingViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItemRow>(menuItems[0]);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Good food, consistently managed.
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            One shared menu. Local prices and availability for every outlet.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            className="px-4 py-2.5 bg-white border border-stone-200/80 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer shadow-xs"
          >
            Manage categories
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#b83827] hover:bg-[#9f2d1e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add menu item</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Shared menu</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            18 items
          </p>
          <p className="text-xs font-medium text-stone-400 mt-2">
            Across 6 menu categories
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Outlet availability</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            88 / 90
          </p>
          <p className="text-xs font-medium text-stone-400 mt-2">
            Item-outlet combinations available
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <p className="text-xs font-semibold text-stone-500">Unavailable items</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
            2
          </p>
          <p className="text-xs font-medium text-amber-700 mt-2">
            Moi Moi in Yaba · Zobo in Surulere
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-6 border-b border-stone-200/80 text-xs font-bold">
        <button
          type="button"
          className="pb-2.5 border-b-2 border-[#b83827] text-[#b83827] cursor-pointer"
        >
          Menu &amp; outlet prices
        </button>
        <button
          type="button"
          className="pb-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          Categories
        </button>
        <button
          type="button"
          className="pb-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          Customisation groups
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-md">
          <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search menu items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-stone-200/80 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCategoryFilter(categoryFilter === 'All' ? 'Rice bowls' : 'All')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shrink-0 cursor-pointer"
          >
            <span>{categoryFilter === 'All' ? 'All categories' : categoryFilter}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-stone-400" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shrink-0 cursor-pointer"
          >
            <span>All availability</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-stone-400" />
          </button>

          <button
            type="button"
            className="px-3.5 py-2 bg-white border border-stone-200/80 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors shrink-0 cursor-pointer"
          >
            Bulk edit prices
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50/50">
                <th className="py-3 px-5">Menu Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Lekki Ph. 1</th>
                <th className="py-3 px-4">Victoria Isl.</th>
                <th className="py-3 px-4">Ikeja GRA</th>
                <th className="py-3 px-4">Yaba</th>
                <th className="py-3 px-4">Surulere</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map((item) => {
                const isSelected = item.id === selectedItem.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#fef2f2]/60' : 'hover:bg-stone-50/70'
                    }`}
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                        />
                        <span className="font-bold text-stone-900 text-xs sm:text-sm">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-medium">
                      {item.category}
                    </td>

                    {/* 5 Outlets Columns */}
                    {(['lekki', 'vi', 'ikeja', 'yaba', 'surulere'] as const).map((outletKey) => {
                      const outletData = item.outletPricing[outletKey];
                      return (
                        <td
                          key={outletKey}
                          className="py-3 px-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleOutletItemStatus(item.id, outletKey);
                          }}
                        >
                          <p className="font-bold text-stone-900">
                            ₦{outletData.price.toLocaleString()}
                          </p>
                          <span
                            className={`inline-block text-[10px] font-semibold mt-0.5 cursor-pointer hover:underline ${
                              outletData.status === 'Available'
                                ? 'text-stone-400'
                                : outletData.status === 'Low stock'
                                ? 'text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-bold'
                                : 'text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded font-bold'
                            }`}
                          >
                            {outletData.status}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="py-3.5 px-6 bg-stone-50/60 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Showing 6 of 18 items · All prices include VAT</span>
          <div className="flex items-center gap-2">
            <span>Page 1 of 3</span>
            <button
              type="button"
              className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 cursor-pointer disabled:opacity-40"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Selected Item Drawer / Preview */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Base Configuration */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-stone-900">
                Selected · {selectedItem.name}
              </h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-200/50">
                Published
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">
                  Base price (NGN)
                </label>
                <input
                  type="text"
                  value={`₦${selectedItem.basePrice.toLocaleString()}`}
                  readOnly
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">
                  Applies to
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="All 5 outlets"
                    readOnly
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-stone-200/80 hover:bg-stone-50 rounded-xl text-xs font-bold text-stone-800 shrink-0 cursor-pointer"
                  >
                    Edit item
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400">
              {selectedItem.customisations}
            </p>
          </div>

          {/* Alert box */}
          <div className="lg:col-span-5 bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <span>⚠️</span>
              <span>Victoria Island · Low stock</span>
            </div>
            <p className="text-xs text-amber-800 mt-1.5 leading-relaxed">
              8 chicken portions remaining. The item stays available until the outlet marks it sold out.
            </p>
            <p className="text-xs font-bold text-amber-900 mt-2 hover:underline cursor-pointer">
              Review outlet availability →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
