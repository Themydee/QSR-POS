'use client';

import React from 'react';
import Image from 'next/image';
import { Outlet } from '../data/outlets';
import { LocationPinIcon, ClockIcon, ShoppingBagIcon, ArrowRightIcon } from './Icons';
import { useCart } from '../context/CartContext';

interface OutletGridProps {
  outlets: Outlet[];
}

export function OutletGrid({ outlets }: OutletGridProps) {
  const { setActiveOutletModal } = useCart();
  const deliverCount = outlets.filter((o) => o.deliversToUser).length;

  return (
    <section id="outlets" className="w-full pt-8 pb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight">
            Five outlets. One good feeling.
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            All in Lagos. Choose an outlet to see its menu, prices, and availability.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf7ee] text-[#1b6b38] text-xs font-semibold border border-[#d2edd7]">
            {deliverCount} deliver to you
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outlets.map((outlet, index) => {
          // In the design, Lekki Phase 1 (index 0) has a solid terracotta button, others have outline buttons
          const isPrimaryAction = index === 0;

          return (
            <div
              key={outlet.id}
              className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200 group"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                <Image
                  src={outlet.image}
                  alt={`${outlet.name} storefront`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Outlet Card Body */}
              <div className="p-5 sm:p-5.5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Title & Open Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                      {outlet.name}
                    </h3>
                    {outlet.isOpen && (
                      <span className="bg-[#eaf7ee] text-[#1b6b38] text-xs font-semibold px-2 py-0.5 rounded-md border border-[#d2edd7]">
                        Open
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <p className="text-stone-500 text-xs sm:text-sm mt-1">
                    {outlet.address}
                  </p>

                  {/* Meta: Distance & Prep Time */}
                  <div className="flex items-center gap-4 text-xs text-stone-500 mt-3 font-normal">
                    <span className="inline-flex items-center gap-1">
                      <LocationPinIcon className="w-3.5 h-3.5 text-stone-400" />
                      {outlet.distanceKm} km away
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5 text-stone-400" />
                      {outlet.prepTime}
                    </span>
                  </div>
                </div>

                {/* Footer Action Row */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span
                    className={`text-xs ${
                      outlet.deliversToUser
                        ? 'text-[#1b6b38] font-medium'
                        : 'text-stone-400'
                    }`}
                  >
                    {outlet.deliversToUser ? 'Delivery & pickup' : 'Outside your delivery area'}
                  </span>

                  <button
                    onClick={() => setActiveOutletModal(outlet)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                      isPrimaryAction
                        ? 'bg-[#b83827] text-white hover:bg-[#a02f1f] shadow-2xs'
                        : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    View menu
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* 6th Item: Pickup Callout Card */}
        <div className="bg-[#eef8f2] border border-[#d7eee0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            {/* Bag Icon */}
            <div className="w-10 h-10 rounded-xl bg-white/90 border border-[#c5e6ce] flex items-center justify-center text-[#1b6b38] shadow-2xs">
              <ShoppingBagIcon className="w-5 h-5 text-[#1b6b38]" />
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-[22px] font-black text-stone-900 tracking-tight leading-snug mt-5">
              On your way?
              <br />
              We&apos;ll have it ready.
            </h3>

            {/* Paragraph */}
            <p className="text-sm text-stone-600 mt-2.5 leading-relaxed">
              Order ahead for pickup from any of our five outlets. Freshly packed, without the wait.
            </p>

            {/* Link */}
            <button
              onClick={() => setActiveOutletModal(outlets[0])}
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#1b6b38] hover:underline cursor-pointer group"
            >
              <span>Pickup is always free</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Footer Hours */}
          <div className="text-xs text-stone-500/90 pt-6 mt-6 border-t border-[#d8ebe0]">
            All outlets open daily · 9:00 AM–10:00 PM
          </div>
        </div>
      </div>
    </section>
  );
}
