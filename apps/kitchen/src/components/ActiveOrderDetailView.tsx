import { useState, useEffect } from 'react';
import type { KitchenOrder } from '../types';
import {
  ArrowLeftIcon,
  PrinterIcon,
  ClockIcon,
  CheckIcon,
  FlagIcon,
} from './KitchenIcons';

interface ActiveOrderDetailViewProps {
  order: KitchenOrder;
  onBack: () => void;
  onMarkReady: (orderId: string) => void;
}

export function ActiveOrderDetailView({
  order,
  onBack,
  onMarkReady,
}: ActiveOrderDetailViewProps) {
  // Live countdown timer initialized to 10 minutes (600 seconds)
  const [secondsLeft, setSecondsLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Checklist items
  const [checklist, setChecklist] = useState([
    { id: '1', label: '2 meals checked', checked: false },
    { id: '2', label: 'Zobo chilled & packed', checked: true },
    { id: '3', label: 'Plantain packed separately', checked: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = checklist.filter((c) => c.checked).length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm mb-4 text-stone-500">
        <button
          type="button"
          onClick={onBack}
          className="text-[#b83827] font-semibold hover:underline flex items-center gap-1.5 cursor-pointer group"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to order board</span>
        </button>
        <span className="text-stone-300">/</span>
        <span className="text-stone-800 font-medium">Order {order.id}</span>
      </div>

      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Order {order.id}
            </h1>
            <span className="bg-[#feeae6] text-[#b83827] text-xs font-bold px-2.5 py-1 rounded-md">
              {order.status === 'preparing'
                ? 'Preparing'
                : order.status === 'incoming'
                ? 'Incoming'
                : 'Ready'}
            </span>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-md">
              {order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}
            </span>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            {order.customerName} · Placed today at {order.placedTime} · Lekki Phase 1
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-white border border-stone-200/90 rounded-xl text-xs sm:text-sm font-bold text-stone-800 hover:bg-stone-50 flex items-center gap-2 shadow-2xs transition cursor-pointer self-start sm:self-auto"
        >
          <PrinterIcon className="w-4 h-4 text-stone-500" />
          <span>Print ticket</span>
        </button>
      </div>

      {/* 10 Minutes to Ready Timer Banner */}
      <div className="bg-[#fef7ee] border border-[#fed7aa]/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#fbd38d]/40 text-amber-800 flex items-center justify-center shrink-0">
            <ClockIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-amber-950">
              10 minutes to ready
            </h3>
            <p className="text-xs text-amber-900/80 mt-0.5">
              Target handoff {order.targetHandoffTime} · Preparing since {order.placedTime} · Assigned to {order.assignedChef || 'Chef Emeka'}
            </p>
          </div>
        </div>

        <div className="font-mono font-black text-2xl sm:text-3xl text-amber-950 tracking-wider">
          {formatTimer(secondsLeft)}
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= Left Column (Items & Checklist) ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Prepare These Items Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="font-extrabold text-base sm:text-lg text-stone-900">
                Prepare these items
              </h2>
              <span className="text-xs text-stone-400 font-normal">
                3 items · 2 meal portions
              </span>
            </div>

            {/* Items Breakdown */}
            <div className="divide-y divide-stone-100">
              {/* Item 1: Smoky Jollof & Chicken */}
              <div className="py-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center font-black text-xl text-stone-800 shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-stone-900">
                      Smoky Jollof &amp; Chicken
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      Medium pepper · Pepper-grilled chicken
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      + Extra fried plantain × 2 (₦1,000 each)
                    </p>
                  </div>
                </div>

                <div className="font-extrabold text-stone-900 text-base sm:text-lg shrink-0">
                  ₦15,000
                </div>
              </div>

              {/* Item 2: House Zobo */}
              <div className="py-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center font-black text-xl text-stone-800 shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-stone-900">
                      House Zobo
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      50cl · Chilled
                    </p>
                  </div>
                </div>

                <div className="font-extrabold text-stone-900 text-base sm:text-lg shrink-0">
                  ₦1,500
                </div>
              </div>
            </div>
          </div>

          {/* Customer Note Callout Banner */}
          <div className="bg-[#fef7ee] border-l-4 border-l-amber-600 border border-[#fed7aa]/50 rounded-2xl p-4 sm:p-5 shadow-2xs">
            <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider block mb-1">
              Customer note
            </span>
            <p className="font-bold text-base text-stone-900">
              Please pack the plantain separately.
            </p>
          </div>

          {/* Before You Mark It Ready (Quality Check Checklist) */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="font-extrabold text-base text-stone-900">
                Before you mark it ready
              </h3>
              <span className="text-xs text-stone-400 font-normal">
                {checkedCount} of {checklist.length} checked
              </span>
            </div>

            {/* Checkboxes Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center gap-3 select-none ${
                    item.checked
                      ? 'border-[#b83827] bg-[#fcedeb]'
                      : 'border-stone-200/90 bg-white hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    className="hidden"
                  />
                  <span
                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 transition ${
                      item.checked
                        ? 'border-[#b83827] bg-[#b83827] text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {item.checked && <CheckIcon className="w-2.5 h-2.5" />}
                  </span>
                  <span className="text-xs font-bold text-stone-800">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => alert('Issue reported to outlet manager.')}
                className="px-4 py-2.5 bg-white border border-stone-200/90 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-2 shadow-2xs transition cursor-pointer"
              >
                <FlagIcon className="w-3.5 h-3.5 text-stone-400" />
                <span>Report an issue</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onMarkReady(order.id);
                  onBack();
                }}
                className="px-6 py-2.5 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Mark order ready</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= Right Column (Customer, Payment, Activity) ================= */}
        <div className="lg:col-span-4 space-y-5">
          {/* Customer & Delivery Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
            <h3 className="font-extrabold text-base text-stone-900 mb-3">
              Customer &amp; delivery
            </h3>

            <div className="pb-3 border-b border-stone-100">
              <div className="font-bold text-sm text-stone-900">
                {order.customerName}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {order.customerPhone}
              </div>
            </div>

            <div className="pt-3">
              <div className="font-bold text-sm text-stone-900">
                14 Admiralty Way
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Lekki Phase 1, Lagos
              </div>
              <p className="text-xs text-stone-400 italic mt-2">
                Blue gate, opposite the pharmacy. Please call on arrival.
              </p>

              <div className="mt-3.5 inline-block px-3 py-1 bg-stone-100 rounded-md text-xs font-semibold text-stone-600">
                Rider not assigned yet
              </div>

              <div className="text-[11px] text-stone-400 mt-2">
                Customer delivery estimate: 14:05–14:15
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-extrabold text-base text-stone-900">
                Payment summary
              </h3>
              <span className="bg-[#eaf5ed] text-[#2b6b3e] text-xs font-bold px-2.5 py-0.5 rounded-md">
                Paid
              </span>
            </div>

            <div className="py-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Food subtotal</span>
                <span className="font-bold text-stone-900">
                  {formatPrice(order.foodSubtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Delivery fee</span>
                <span className="font-bold text-stone-900">
                  {formatPrice(order.deliveryFee)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="font-extrabold text-stone-900 text-sm">
                Total paid
              </span>
              <span className="font-black text-stone-900 text-lg">
                {formatPrice(order.totalAmount)}
              </span>
            </div>

            <div className="text-xs text-stone-400 mt-2">
              {order.paymentMethod}
            </div>
          </div>

          {/* Activity Log Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
            <h3 className="font-extrabold text-base text-stone-900 mb-3">
              Activity
            </h3>

            <div className="space-y-3">
              {order.activity.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="text-stone-400 font-mono shrink-0">
                    {event.time}
                  </span>
                  <span className="text-stone-700 font-medium">
                    {event.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
