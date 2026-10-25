import type { KitchenOrder } from '../types';

interface OrderHistoryViewProps {
  collectedOrders: KitchenOrder[];
  onViewOrder: (order: KitchenOrder) => void;
}

export function OrderHistoryView({
  collectedOrders,
  onViewOrder,
}: OrderHistoryViewProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Completed Orders History
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Review orders completed and dispatched from Lekki Phase 1 today.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs divide-y divide-stone-100">
        {collectedOrders.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-sm">
            No completed orders in this shift yet.
          </div>
        ) : (
          collectedOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 transition"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-base text-stone-900">
                    {order.id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-[#2b6b3e]">
                    Completed
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}
                  </span>
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  {order.customerName} · {order.items.map((i) => `${i.quantity} × ${i.name}`).join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-sm sm:text-base text-stone-900">
                  {formatPrice(order.totalAmount)}
                </span>
                <button
                  type="button"
                  onClick={() => onViewOrder(order)}
                  className="px-3 py-1.5 border border-stone-200 bg-white hover:bg-stone-50 rounded-lg text-xs font-bold text-stone-800 transition shadow-2xs cursor-pointer"
                >
                  View ticket
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
