'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { CloseIcon, LocationPinIcon, ClockIcon, StarIcon } from './Icons';

export function OutletInfoModal() {
  const { isOutletInfoOpen, setIsOutletInfoOpen, selectedOutlet } = useCart();

  if (!isOutletInfoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150">
        {/* Banner Image */}
        <div className="relative aspect-[21/9] w-full bg-stone-100">
          <Image
            src={selectedOutlet.image}
            alt={selectedOutlet.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={() => setIsOutletInfoOpen(false)}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-5 right-5 text-white">
            <span className="bg-[#eaf7ee] text-[#1b6b38] text-[11px] font-bold px-2 py-0.5 rounded-md inline-block mb-1">
              {selectedOutlet.isOpen ? 'Open now' : 'Closed'}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {selectedOutlet.name}
            </h3>
          </div>
        </div>

        {/* Outlet Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <LocationPinIcon className="w-4 h-4 text-[#b83827] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Address
              </div>
              <div className="text-sm font-medium text-stone-900">
                {selectedOutlet.address}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {selectedOutlet.area}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ClockIcon className="w-4 h-4 text-[#b83827] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Opening Hours
              </div>
              <div className="text-sm font-medium text-stone-900">
                Monday – Sunday: 9:00 AM – 10:00 PM
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StarIcon className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Ratings &amp; Reviews
              </div>
              <div className="text-sm font-medium text-stone-900">
                ★ {selectedOutlet.rating} ({selectedOutlet.reviewCount}+ verified reviews)
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Direct Kitchen Line:</span>
            <a
              href={`tel:${selectedOutlet.phone}`}
              className="font-semibold text-stone-900 hover:text-[#b83827]"
            >
              {selectedOutlet.phone}
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsOutletInfoOpen(false)}
              className="w-full py-3 bg-[#b83827] hover:bg-[#a02f1f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Close Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
