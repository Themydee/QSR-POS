import { useState, useMemo } from 'react';
import type { KitchenOrder, FulfillmentType } from '../types';
import {
  ClockIcon,
  AlertTriangleIcon,
  SearchIcon,
  Volume2Icon,
  VolumeXIcon,
  PauseIcon,
  PlayIcon,
  NoteIcon,
} from './KitchenIcons';

interface OrderBoardViewProps {
  orders: KitchenOrder[];
  onSelectOrder: (order: KitchenOrder) => void;
  onUpdateStatus: (orderId: string, nextStatus: 'preparing' | 'ready' | 'collected') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export function OrderBoardView({
  orders,
  onSelectOrder,
  onUpdateStatus,
  soundEnabled,
  onToggleSound,
  isPaused,
  onTogglePause,
}: OrderBoardViewProps) {
  const [filterType, setFilterType] = useState<'all' | FulfillmentType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter orders by fulfillment and search
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filterType !== 'all' && order.fulfillment !== filterType) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesName = order.customerName.toLowerCase().includes(q);
        const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(q));
        if (!matchesId && !matchesName && !matchesItem) return false;
      }
      return true;
    });
  }, [orders, filterType, searchQuery]);

  // Group orders by status
  const incomingOrders = filteredOrders.filter((o) => o.status === 'incoming');
  const preparingOrders = filteredOrders.filter((o) => o.status === 'preparing');
  const readyOrders = filteredOrders.filter((o) => o.status === 'ready');

  // Counts for filter pills
  const totalActive = orders.filter((o) => o.status !== 'collected').length;
  const deliveryCount = orders.filter((o) => o.status !== 'collected' && o.fulfillment === 'delivery').length;
  const pickupCount = orders.filter((o) => o.status !== 'collected' && o.fulfillment === 'pickup').length;

  // Find overdue order for banner
  const overdueOrder = orders.find((o) => o.isOverdue && o.status === 'preparing');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
      {/* Top Context Bar & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div>
          <span className="text-[11px] font-black uppercase text-[#b83827] tracking-wider block">
            Lekki Phase 1 · Saturday, 24 Oct
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
            Let&apos;s keep the good food moving.
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {totalActive} active orders · 17 min average preparation · 54 orders today
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleSound}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs ${
              soundEnabled
                ? 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
                : 'bg-stone-100 border-stone-200 text-stone-500'
            }`}
          >
            {soundEnabled ? (
              <Volume2Icon className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeXIcon className="w-4 h-4 text-stone-400" />
            )}
            <span>{soundEnabled ? 'Sound on' : 'Sound muted'}</span>
          </button>

          <button
            type="button"
            onClick={onTogglePause}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs ${
              isPaused
                ? 'bg-amber-500 border-amber-600 text-white'
                : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
            }`}
          >
            {isPaused ? (
              <PlayIcon className="w-4 h-4" />
            ) : (
              <PauseIcon className="w-4 h-4 text-stone-600" />
            )}
            <span>{isPaused ? 'Resume orders' : 'Pause new orders'}</span>
          </button>
        </div>
      </div>

      {/* Overdue Alert Banner */}
      {overdueOrder && (
        <div className="bg-[#fef7ee] border border-[#fbd38d]/60 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between text-xs my-3 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-950 font-medium">
            <AlertTriangleIcon className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Order {overdueOrder.id} is {overdueOrder.overdueMinutes || 3} minutes overdue. Please prioritise packing.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectOrder(overdueOrder)}
            className="font-bold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
          >
            <span>View order</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#b83827] text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            All orders · {totalActive}
          </button>

          <button
            type="button"
            onClick={() => setFilterType('delivery')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterType === 'delivery'
                ? 'bg-[#b83827] text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            Delivery · {deliveryCount}
          </button>

          <button
            type="button"
            onClick={() => setFilterType('pickup')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterType === 'pickup'
                ? 'bg-[#b83827] text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            Pickup · {pickupCount}
          </button>
        </div>

        {/* Search Field + Live Time */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <SearchIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order or customer"
              className="pl-9 pr-3.5 py-1.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#b83827] shadow-2xs w-48 sm:w-56"
            />
          </div>

          <div className="text-sm font-black text-stone-900 tracking-tight shrink-0 select-none">
            13:42 WAT
          </div>
        </div>
      </div>

      {/* 3-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 items-start">
        {/* ================= COLUMN 1: INCOMING ================= */}
        <div className="space-y-4">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-stone-900 text-base">Incoming</h2>
              <span className="bg-red-50 text-[#b83827] text-xs font-bold px-2 py-0.5 rounded-full">
                {incomingOrders.length}
              </span>
            </div>
            <span className="text-[11px] text-stone-400">Newest first</span>
          </div>

          {/* Cards List */}
          <div className="space-y-3.5">
            {incomingOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Order ID + Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-black text-base text-stone-900">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        order.fulfillment === 'delivery'
                          ? 'bg-sky-50 text-sky-700'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                  </div>

                  {/* Customer + Total */}
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-stone-600 font-medium">
                      {order.customerName}
                    </span>
                    <span className="font-bold text-stone-900">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  {/* Time Row */}
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-2">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{order.timeLabel}</span>
                  </div>

                  {/* Items List */}
                  <div className="mt-3 space-y-1 text-xs text-stone-700 font-medium border-t border-stone-100 pt-2.5">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <span>
                          {item.quantity} × {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectOrder(order)}
                    className="text-xs font-bold text-[#b83827] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View order</span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateStatus(order.id, 'preparing')}
                    className="px-3.5 py-1.5 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-xs rounded-lg transition active:scale-95 shadow-2xs cursor-pointer"
                  >
                    Accept order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= COLUMN 2: PREPARING ================= */}
        <div className="space-y-4">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-stone-900 text-base">Preparing</h2>
              <span className="bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {preparingOrders.length}
              </span>
            </div>
            <span className="text-[11px] text-stone-400">Priority view</span>
          </div>

          {/* Cards List */}
          <div className="space-y-3.5">
            {preparingOrders.map((order) => {
              const isHighlight = order.numericId === 'BK-1048';
              const isOverdue = order.isOverdue;

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-2xl p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between ${
                    isHighlight
                      ? 'border-2 border-[#b83827]'
                      : isOverdue
                      ? 'border-2 border-amber-300'
                      : 'border border-stone-200/90'
                  }`}
                >
                  <div>
                    {/* Top Row: Order ID + Badge */}
                    <div className="flex items-center justify-between">
                      <span className="font-black text-base text-stone-900">
                        {order.id}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          order.fulfillment === 'delivery'
                            ? 'bg-sky-50 text-sky-700'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}
                      </span>
                    </div>

                    {/* Customer + Total */}
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-stone-600 font-medium">
                        {order.customerName}
                      </span>
                      <span className="font-bold text-stone-900">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>

                    {/* Time / Countdown */}
                    <div
                      className={`flex items-center gap-1.5 text-xs font-bold mt-2 ${
                        isOverdue ? 'text-red-600' : 'text-stone-700'
                      }`}
                    >
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>{order.timeLabel}</span>
                    </div>

                    {/* Items List */}
                    <div className="mt-3 space-y-1 text-xs text-stone-700 font-medium border-t border-stone-100 pt-2.5">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          <div>
                            {item.quantity} × {item.name}
                          </div>
                          {item.addons && (
                            <div className="text-[11px] text-stone-500 font-normal pl-3">
                              + Extra plantain · Medium pepper
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Customer Note Callout (for BK-1048) */}
                    {order.customerNote && (
                      <div className="mt-2.5 p-2 bg-[#fef6ee] border border-[#fed7aa]/50 rounded-xl flex items-center gap-2 text-[11px] text-amber-950">
                        <NoteIcon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="font-medium">{order.customerNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectOrder(order)}
                      className="text-xs font-bold text-[#b83827] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>View order</span>
                      <span>→</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onUpdateStatus(order.id, 'ready')}
                      className={`px-3.5 py-1.5 font-bold text-xs rounded-lg transition active:scale-95 shadow-2xs cursor-pointer ${
                        isHighlight
                          ? 'bg-[#b83827] hover:bg-[#a02f1f] text-white'
                          : 'border border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      Mark ready
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= COLUMN 3: READY ================= */}
        <div className="space-y-4">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-stone-900 text-base">Ready</h2>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {readyOrders.length}
              </span>
            </div>
            <span className="text-[11px] text-stone-400">Ready time</span>
          </div>

          {/* Cards List */}
          <div className="space-y-3.5">
            {readyOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Order ID + Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-black text-base text-stone-900">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        order.fulfillment === 'delivery'
                          ? 'bg-sky-50 text-sky-700'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                  </div>

                  {/* Customer + Total */}
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-stone-600 font-medium">
                      {order.customerName}
                    </span>
                    <span className="font-bold text-stone-900">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  {/* Time Row */}
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{order.timeLabel}</span>
                  </div>

                  {/* Items List */}
                  <div className="mt-3 space-y-1 text-xs text-stone-700 font-medium border-t border-stone-100 pt-2.5">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <span>
                          {item.quantity} × {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectOrder(order)}
                    className="text-xs font-bold text-[#b83827] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View order</span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateStatus(order.id, 'collected')}
                    className="px-3.5 py-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs rounded-lg transition active:scale-95 shadow-2xs cursor-pointer"
                  >
                    {order.fulfillment === 'delivery' ? 'Hand to rider' : 'Collected'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
