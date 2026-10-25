import { useState } from 'react';

interface MenuItemAvailability {
  id: string;
  name: string;
  category: string;
  isAvailable: boolean;
  stockCount?: number;
}

const INITIAL_AVAILABILITY: MenuItemAvailability[] = [
  { id: '1', name: 'Smoky Jollof & Chicken', category: 'Rice bowls', isAvailable: true, stockCount: 28 },
  { id: '2', name: 'Peppered Suya Beef Bowl', category: 'Grills & suya', isAvailable: true, stockCount: 14 },
  { id: '3', name: 'Village Fried Rice', category: 'Rice bowls', isAvailable: true, stockCount: 19 },
  { id: '4', name: 'Sweet Fried Plantain (Dodo)', category: 'Sides', isAvailable: true, stockCount: 45 },
  { id: '5', name: 'House Zobo Infusion', category: 'Drinks', isAvailable: true, stockCount: 32 },
  { id: '6', name: 'Steamed Moi-Moi Deluxe', category: 'Sides', isAvailable: false, stockCount: 0 },
  { id: '7', name: 'Grilled Croaker Fish', category: 'Proteins', isAvailable: true, stockCount: 6 },
  { id: '8', name: 'Flame-Grilled Pepper Chicken', category: 'Proteins', isAvailable: true, stockCount: 22 },
];

export function AvailabilityView() {
  const [items, setItems] = useState<MenuItemAvailability[]>(INITIAL_AVAILABILITY);

  const toggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Menu Item Availability (86&apos;ing)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Toggle items sold out in the kitchen to instantly update online ordering and POS tills.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs divide-y divide-stone-100">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50/60 transition"
          >
            <div>
              <div className="font-bold text-sm sm:text-base text-stone-900">
                {item.name}
              </div>
              <div className="text-xs text-stone-400 mt-0.5">
                {item.category} · {item.stockCount} portions remaining
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  item.isAvailable
                    ? 'bg-[#eaf5ed] text-[#2b6b3e]'
                    : 'bg-red-50 text-[#b83827]'
                }`}
              >
                {item.isAvailable ? 'In stock' : 'Sold out (86ed)'}
              </span>

              <button
                type="button"
                onClick={() => toggleAvailability(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs active:scale-95 ${
                  item.isAvailable
                    ? 'border border-red-200 bg-red-50 text-[#b83827] hover:bg-red-100'
                    : 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                {item.isAvailable ? 'Mark sold out' : 'Restore item'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
