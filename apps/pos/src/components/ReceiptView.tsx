import { useState } from 'react';
import type { PosOrder } from '../types';
import { formatPrice } from '../utils/format';
import {
  BukaLogo,
  CheckIcon,
  PrinterIcon,
  SendIcon,
  ExternalLinkIcon,
  PlusIcon,
} from './PosIcons';
import { PosStepper } from './PosStepper';

interface ReceiptViewProps {
  order: PosOrder;
  onStartNewSale: () => void;
  onViewTransactions: () => void;
}

export function ReceiptView({
  order,
  onStartNewSale,
  onViewTransactions,
}: ReceiptViewProps) {
  const [recipientContact, setRecipientContact] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSendReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientContact) return;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      {/* Top Header & Stepper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="text-[11px] font-bold tracking-wider uppercase text-[#b83827]">
            COUNTER SERVICE · {order.orderId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            All paid. Let's get cooking.
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Payment recorded and the kitchen ticket sent. Your next customer is one tap away.
          </p>
        </div>

        <div className="shrink-0">
          <PosStepper currentStep={3} />
        </div>
      </div>

      {/* Main Grid: Left Status & Receipt Controls, Right Thermal Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Payment Success Banner */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-6 shadow-2xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckIcon className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-stone-900">
                  Payment successful
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Paid
                </span>
              </div>

              <p className="text-xs text-stone-600 mt-1">
                {formatPrice(order.totalDue)} paid in {order.paymentMethod} · {order.transactionId}
              </p>

              {order.paymentMethod === 'cash' && order.changeGiven > 0 && (
                <div className="mt-2 text-sm font-bold text-emerald-800">
                  Give customer {formatPrice(order.changeGiven)} change
                </div>
              )}
            </div>
          </div>

          {/* Kitchen Order Milestones Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Order {order.orderId}
                </h3>
                <span className="text-xs text-stone-500">
                  {order.diningOption === 'takeaway' ? 'Takeaway' : 'Dine-in'} · Walk-in customer · {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                Sent to kitchen
              </span>
            </div>

            {/* 3 Step Progression */}
            <div className="grid grid-cols-3 gap-3 text-center py-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-xs font-bold text-stone-900">
                  Payment confirmed
                </div>
                <div className="text-[11px] text-stone-500">13:44 WAT</div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                  <span className="text-sm">🍳</span>
                </div>
                <div className="text-xs font-bold text-stone-900">
                  Kitchen received
                </div>
                <div className="text-[11px] text-stone-500">Awaiting acceptance</div>
              </div>

              <div className="flex flex-col items-center gap-1.5 opacity-60">
                <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center">
                  <span className="text-sm">🛍️</span>
                </div>
                <div className="text-xs font-bold text-stone-700">
                  Ready for collection
                </div>
                <div className="text-[11px] text-stone-400">Kitchen will update</div>
              </div>
            </div>

            {/* Kitchen Note Banner */}
            {order.kitchenNote && (
              <div className="p-3 rounded-xl bg-[#fff9ea] border border-[#f5e6ba] text-xs flex items-center gap-2">
                <span className="text-amber-800">💬</span>
                <span className="text-stone-700 font-medium">
                  Kitchen note sent: <strong>{order.kitchenNote}</strong>
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-stone-500">Ask the customer to keep their order number.</span>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#b83827] hover:underline font-bold"
              >
                <span>View kitchen ticket</span>
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Give Them Their Receipt Options */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">
                Give them their receipt
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Printer ready</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="py-3 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <PrinterIcon className="w-4 h-4 text-stone-600" />
                <span>Print receipt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (recipientContact) handleSendReceipt({ preventDefault: () => {} } as any);
                }}
                className="py-3 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <SendIcon className="w-4 h-4 text-stone-600" />
                <span>Send receipt</span>
              </button>
            </div>

            <form onSubmit={handleSendReceipt} className="relative">
              <input
                type="text"
                value={recipientContact}
                onChange={(e) => setRecipientContact(e.target.value)}
                placeholder="Customer phone number or email"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]/20 focus:border-[#b83827]"
              />
              {sentSuccess && (
                <span className="absolute right-3 top-2.5 text-xs font-bold text-emerald-600">
                  Sent ✓
                </span>
              )}
            </form>

            <span className="text-[11px] text-stone-400">
              Ask for permission before sending a digital receipt.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onStartNewSale}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#b83827] hover:bg-[#a12f20] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <PlusIcon className="w-4 h-4 text-white" />
              <span>Start new sale</span>
            </button>

            <button
              type="button"
              onClick={onViewTransactions}
              className="py-3.5 px-5 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>View transactions</span>
            </button>
          </div>
        </div>

        {/* Right Column: Thermal Paper Receipt Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="flex items-center justify-between text-xs font-bold tracking-wider text-stone-400 uppercase mb-2">
              <span>CUSTOMER RECEIPT</span>
              <span>Original copy</span>
            </div>

            {/* Thermal Slip */}
            <div
              id="thermal-receipt"
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-md font-mono text-xs text-stone-800 flex flex-col justify-between"
            >
              {/* Slip Brand */}
              <div className="text-center pb-4 border-b border-dashed border-stone-300">
                <div className="flex justify-center mb-1.5">
                  <BukaLogo className="w-8 h-8" />
                </div>
                <div className="text-base font-black tracking-tight uppercase text-stone-900 font-sans">
                  buka &amp; co.
                </div>
                <div className="font-bold text-stone-900 text-xs mt-0.5 font-sans">
                  {order.outletName}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {order.outletAddress}
                </div>
                <div className="text-[11px] text-stone-500">0800 2852 266</div>
              </div>

              {/* Order & Till Meta */}
              <div className="py-3 border-b border-dashed border-stone-300">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black tracking-wider text-stone-900">
                    {order.orderId}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-stone-100 rounded text-stone-700">
                    Paid · {order.paymentMethod}
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  24 Oct 2026 · 13:44 WAT · {order.diningOption === 'takeaway' ? 'Takeaway' : 'Dine-in'}
                </div>
                <div className="text-[11px] text-stone-500">
                  Cashier: {order.cashierName} · {order.tillId}
                </div>
                <div className="text-[11px] text-stone-500">
                  Receipt: {order.transactionId}
                </div>
              </div>

              {/* Line Items */}
              <div className="py-3 border-b border-dashed border-stone-300 divide-y divide-dashed divide-stone-100">
                <div className="py-1.5">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>2 Smoky Jollof &amp; Chicken</span>
                    <span>₦13,000</span>
                  </div>
                  <div className="text-[10px] text-stone-500">
                    ₦6,500 each · Medium pepper
                  </div>
                </div>

                <div className="py-1.5">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>2 Extra plantain</span>
                    <span>₦2,000</span>
                  </div>
                  <div className="text-[10px] text-stone-500">
                    ₦1,000 each · Added to meals
                  </div>
                </div>

                <div className="py-1.5">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>1 House Zobo</span>
                    <span>₦1,500</span>
                  </div>
                  <div className="text-[10px] text-stone-500">
                    ₦1,500 each · 50cl · Chilled
                  </div>
                </div>
              </div>

              {/* Subtotal, Discount & Total */}
              <div className="py-3 border-b border-dashed border-stone-300 space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Discount</span>
                  <span>₦0</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-900 pt-1">
                  <span>Total paid</span>
                  <span>{formatPrice(order.totalDue)}</span>
                </div>
                <div className="text-[10px] text-stone-400">
                  VAT included · No delivery fee
                </div>
              </div>

              {/* Payment Details */}
              <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
                <div className="flex justify-between text-stone-600">
                  <span>Cash tendered</span>
                  <span>{formatPrice(order.tenderedAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900">
                  <span>Change given</span>
                  <span>{formatPrice(order.changeGiven)}</span>
                </div>
              </div>

              {/* Footer Quote */}
              <div className="text-center pt-4 font-sans text-xs">
                <div className="font-bold text-stone-900">
                  Good food. Good company.
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Keep this receipt for collection.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
