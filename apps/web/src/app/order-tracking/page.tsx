'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CheckoutStepper } from '../../components/CheckoutStepper';
import {
  LocationPinIcon,
  BicycleIcon,
  ChefHatIcon,
  CheckIcon,
  ClockIcon,
} from '../../components/Icons';

function OrderTrackingContent() {
  const { cart, selectedOutlet, grandTotal, deliveryAddress } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const steps = [
    { title: 'Order placed', time: 'Just now', done: true },
    { title: 'In the kitchen', time: 'Cooking fresh now', current: true },
    { title: 'Out for delivery', time: 'Est. in 20 min', done: false },
    { title: 'Arrived at your door', time: 'Est. 2:15 PM', done: false },
  ];

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen pt-16 sm:pt-20">
      {/* SubHeader Context Bar */}
      <div className="w-full bg-[#fbf9f5] border-b border-stone-200/60 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700">
            <LocationPinIcon className="w-3.5 h-3.5 text-[#b83827] shrink-0" />
            <span>
              Order dispatched from{' '}
              <strong className="font-bold text-stone-900">{selectedOutlet.name}</strong>
            </span>
          </div>

          <div className="text-stone-500 font-normal">
            <span>Estimated delivery in 25–35 min</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        {/* Step Indicator */}
        <CheckoutStepper currentStep={3} />

        {/* Success Banner */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#eaf7ee] text-[#1b6b38] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <CheckIcon className="w-3.5 h-3.5" />
                <span>Payment Confirmed via Paystack</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Order #BK-94821 is cooking!
              </h1>
              <p className="text-stone-500 text-sm mt-1">
                We&apos;ve sent your receipt and updates to your phone and email.
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-stone-400 block">Estimated arrival</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#b83827]">
                2:05 – 2:15 PM
              </span>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {steps.map((s, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        s.done
                          ? 'bg-[#b83827] text-white'
                          : s.current
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {s.done ? (
                        <CheckIcon className="w-3.5 h-3.5" />
                      ) : s.current ? (
                        <ChefHatIcon className="w-3.5 h-3.5" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900">
                    {s.title}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    {s.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Courier Card */}
          <div className="bg-[#fbf9f5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-200/60">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#feeae6] text-[#b83827] flex items-center justify-center shrink-0">
                <BicycleIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-900">
                  Rider: Babatunde Adeleke
                </div>
                <div className="text-xs text-stone-500">
                  Buka Delivery Dispatch · Red Box #04
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:08002852266"
                className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50 transition shadow-2xs"
              >
                Call rider
              </a>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs mb-8">
          <h3 className="font-bold text-base text-stone-900 mb-4">
            Items in this order
          </h3>

          <div className="divide-y divide-stone-100">
            {cart.map((ci) => (
              <div
                key={ci.id}
                className="py-3 flex items-start justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <Image
                      src={ci.item.image}
                      alt={ci.item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{ci.item.name}</div>
                    {ci.customization && (
                      <div className="text-xs text-stone-500 mt-0.5">
                        {ci.customization}
                      </div>
                    )}
                    <div className="text-xs text-stone-400 mt-0.5">
                      Qty: {ci.quantity}
                    </div>
                  </div>
                </div>

                <div className="font-bold text-stone-900">
                  {formatPrice(ci.totalPrice)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-sm">
            <span className="font-bold text-stone-900">Total Paid</span>
            <span className="font-black text-stone-900 text-lg">
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#b83827] hover:underline"
          >
            <span>Order more delicious food</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] pt-28 text-center text-stone-500">
          Loading order status...
        </div>
      }
    >
      <OrderTrackingContent />
    </Suspense>
  );
}
