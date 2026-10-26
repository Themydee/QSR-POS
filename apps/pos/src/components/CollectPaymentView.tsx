import { useState, useEffect } from 'react';
import type { PosCartItem, DiningOption, PaymentMethod } from '../types';
import { formatPrice } from '../utils/format';
import {
  CashIcon,
  CardIcon,
  BankIcon,
  SplitIcon,
  BackspaceIcon,
  CheckIcon,
  ArrowLeftIcon,
} from './PosIcons';
import { PosStepper } from './PosStepper';

interface CollectPaymentViewProps {
  orderId: string;
  cart: PosCartItem[];
  diningOption: DiningOption;
  kitchenNote: string;
  onBackToOrder: () => void;
  onConfirmPayment: (details: {
    method: PaymentMethod;
    tendered: number;
    change: number;
  }) => void;
}

export function CollectPaymentView({
  orderId,
  cart,
  diningOption,
  kitchenNote,
  onBackToOrder,
  onConfirmPayment,
}: CollectPaymentViewProps) {
  const totalDue = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [tenderedStr, setTenderedStr] = useState<string>('20000');

  const tenderedAmount = parseInt(tenderedStr, 10) || 0;
  const changeDue = Math.max(0, tenderedAmount - totalDue);

  // Keyboard number entry support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        setTenderedStr((prev) => (prev === '0' ? e.key : prev + e.key));
      } else if (e.key === 'Backspace') {
        setTenderedStr((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
      } else if (e.key === 'Enter') {
        if (tenderedAmount >= totalDue) {
          onConfirmPayment({
            method: paymentMethod,
            tendered: tenderedAmount,
            change: changeDue,
          });
        }
      } else if (e.key === 'Escape') {
        onBackToOrder();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tenderedAmount, totalDue, paymentMethod, changeDue, onConfirmPayment, onBackToOrder]);

  const handleNumpadPress = (val: string) => {
    if (val === 'clear') {
      setTenderedStr('0');
    } else if (val === 'backspace') {
      setTenderedStr((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
    } else if (val === '00') {
      if (tenderedStr !== '0') setTenderedStr((prev) => prev + '00');
    } else {
      setTenderedStr((prev) => (prev === '0' ? val : prev + val));
    }
  };

  const handleQuickPill = (amount: number) => {
    setTenderedStr(amount.toString());
  };

  const canConfirm =
    paymentMethod === 'cash' ? tenderedAmount >= totalDue : true;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      {/* Top Header & Stepper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="text-[11px] font-bold tracking-wider uppercase text-[#b83827]">
            COUNTER SERVICE · {orderId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Collect payment
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Confirm the amount received before sending this takeaway order to the kitchen.
          </p>
        </div>

        <div className="shrink-0">
          <PosStepper currentStep={2} onStepClick={(s) => s === 1 && onBackToOrder()} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Total to Collect, Methods, Tender & Numpad */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Total to Collect Banner Card */}
          <div className="bg-[#fbf5e8] border border-[#f5e3ba] rounded-2xl p-5 sm:p-6 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
                TOTAL TO COLLECT
              </div>
              <div className="text-3xl sm:text-4xl font-black text-stone-900 mt-1 tracking-tight">
                {formatPrice(totalDue)}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200/80 shadow-2xs">
                Awaiting payment
              </span>
              <span className="text-xs text-stone-500">
                {orderId} · {diningOption === 'takeaway' ? 'Takeaway' : 'Dine-in'} · {totalItemCount} items
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
              How would they like to pay?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  id: 'cash' as PaymentMethod,
                  title: 'Cash',
                  desc: 'Cash drawer',
                  icon: <CashIcon className="w-5 h-5" />,
                },
                {
                  id: 'card' as PaymentMethod,
                  title: 'Card / POS terminal',
                  desc: 'Terminal ready',
                  icon: <CardIcon className="w-5 h-5" />,
                },
                {
                  id: 'transfer' as PaymentMethod,
                  title: 'Bank transfer',
                  desc: 'Verify receipt',
                  icon: <BankIcon className="w-5 h-5" />,
                },
                {
                  id: 'split' as PaymentMethod,
                  title: 'Split payment',
                  desc: 'Use two methods',
                  icon: <SplitIcon className="w-5 h-5" />,
                },
              ].map((m) => {
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setPaymentMethod(m.id);
                      if (m.id !== 'cash') {
                        setTenderedStr(totalDue.toString());
                      }
                    }}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                      isSelected
                        ? 'bg-[#fff5f3] border-[#b83827] shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={isSelected ? 'text-[#b83827]' : 'text-stone-500'}>
                        {m.icon}
                      </div>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#b83827]"></div>
                      )}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-bold leading-tight ${
                          isSelected ? 'text-stone-900' : 'text-stone-800'
                        }`}
                      >
                        {m.title}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        {m.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cash Calculation Section */}
          {paymentMethod === 'cash' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Tender Display & Quick Pills */}
              <div className="md:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 mb-1">
                    Cash received
                  </h3>
                  <label className="text-[11px] font-semibold text-stone-500 block mb-2">
                    Amount tendered
                  </label>

                  {/* Big Tender Input Display */}
                  <div className="relative flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 border-[#b83827] bg-white shadow-inner">
                    <span className="text-2xl font-bold text-stone-400">₦</span>
                    <span className="text-3xl font-extrabold text-stone-900 font-mono tracking-wider">
                      {tenderedAmount.toLocaleString('en-NG')}
                    </span>
                  </div>

                  {/* Quick Tender Pills */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => handleQuickPill(totalDue)}
                      className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                        tenderedAmount === totalDue
                          ? 'bg-[#fff5f3] border-[#b83827] text-[#b83827]'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Exact
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPill(20000)}
                      className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                        tenderedAmount === 20000
                          ? 'bg-[#fff5f3] border-[#b83827] text-[#b83827]'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      ₦20,000
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPill(25000)}
                      className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                        tenderedAmount === 25000
                          ? 'bg-[#fff5f3] border-[#b83827] text-[#b83827]'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      ₦25,000
                    </button>
                  </div>

                  {/* Change To Give Customer */}
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left">
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      Change to give customer
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5 tracking-tight">
                      {formatPrice(changeDue)}
                    </div>
                    <div className="text-[11px] text-emerald-600 mt-1">
                      {formatPrice(tenderedAmount)} received − {formatPrice(totalDue)} total
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 mt-4">
                  Count the cash and return the change. The drawer opens when you confirm payment.
                </div>
              </div>

              {/* Numpad Column */}
              <div className="md:col-span-5 bg-white rounded-3xl border border-stone-200/90 p-5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">
                    <span>ENTER AMOUNT</span>
                    <button
                      type="button"
                      onClick={() => handleNumpadPress('clear')}
                      className="text-[#b83827] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  {/* 3x4 Touch Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        onClick={() => handleNumpadPress(digit)}
                        className="h-12 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-lg font-bold text-stone-800 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleNumpadPress('backspace')}
                      className="h-12 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-stone-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    >
                      <BackspaceIcon className="w-5 h-5 text-stone-600" />
                    </button>
                  </div>
                </div>

                <div className="text-center text-[11px] text-stone-400 mt-3">
                  You can also use your keyboard
                </div>
              </div>
            </div>
          ) : (
            /* Card / Transfer Prompt */
            <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-2xs text-center flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ffebe6] text-[#b83827] flex items-center justify-center">
                {paymentMethod === 'card' ? (
                  <CardIcon className="w-8 h-8" />
                ) : (
                  <BankIcon className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                {paymentMethod === 'card'
                  ? 'Swipe or Tap on Card Terminal'
                  : 'Customer Bank Transfer'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm">
                {paymentMethod === 'card'
                  ? 'Request customer to tap or insert card on the POS machine for ₦' + totalDue.toLocaleString() + '.'
                  : 'Ask customer to show payment confirmation on bank app. Confirm funds arrive before completing.'}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Terminal ready</span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onBackToOrder}
              className="px-5 py-3.5 rounded-2xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to order</span>
            </button>

            <button
              type="button"
              disabled={!canConfirm}
              onClick={() => {
                if (canConfirm) {
                  onConfirmPayment({
                    method: paymentMethod,
                    tendered: tenderedAmount,
                    change: changeDue,
                  });
                }
              }}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#b83827] hover:bg-[#a12f20] disabled:bg-stone-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <CheckIcon className="w-4 h-4 text-white" />
              <span>Confirm {paymentMethod} payment · {formatPrice(totalDue)}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary Ticket */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                  Order {orderId}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {totalItemCount} items
                </span>
              </div>

              {/* Dine-in vs Takeaway Pill Indicator */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl my-4 text-xs font-bold pointer-events-none">
                <div
                  className={`py-2 text-center rounded-xl transition-all ${
                    diningOption === 'dine-in'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-400'
                  }`}
                >
                  Dine-in
                </div>
                <div
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                    diningOption === 'takeaway'
                      ? 'bg-[#fff5f3] border border-[#f5c6bc] text-[#b83827] shadow-2xs'
                      : 'text-stone-400'
                  }`}
                >
                  <CheckIcon className="w-3.5 h-3.5 text-[#b83827]" />
                  <span>Takeaway</span>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 pb-3">
                Walk-in customer · Counter sale
              </div>

              {/* Items Breakdown */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex flex-col gap-1 text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-stone-900">
                          {item.quantity} × {item.name}
                        </span>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {formatPrice(item.unitPrice)}
                          {item.extrasTotal > 0 &&
                            ` + ${formatPrice(item.extrasTotal)} plantain / meal`}
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>

                    {item.customization && (
                      <div className="text-[11px] text-stone-500">
                        {item.customization.pepperLevel && `${item.customization.pepperLevel} pepper`}
                        {item.customization.extras && item.customization.extras.length > 0 &&
                          ` · ${item.customization.extras.map((e) => `${e.name} × ${item.quantity}`).join(', ')}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Kitchen Note Reminder */}
              {kitchenNote && (
                <div className="mt-4 p-2.5 rounded-xl bg-[#fff9ea] border border-[#f5e6ba] text-xs flex items-center gap-2">
                  <span className="text-amber-800">📝</span>
                  <span className="font-medium text-amber-900">{kitchenNote}</span>
                </div>
              )}

              {/* Totals */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(totalDue)}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Discount</span>
                  <span className="font-semibold text-stone-900">₦0</span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total due</span>
                  <span className="text-xl text-stone-900">{formatPrice(totalDue)}</span>
                </div>
                <span className="text-[11px] text-stone-400">
                  VAT included · No delivery fee
                </span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 flex items-start gap-2 text-stone-500 text-[11px]">
              <svg className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>The kitchen receives this order only after payment is confirmed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
