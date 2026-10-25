'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { CloseIcon, LocationPinIcon, ClockIcon, ShoppingBagIcon, CheckIcon } from './Icons';

export function OutletMenuModal() {
  const { activeOutletModal, setActiveOutletModal, addItem, cart } = useCart();

  if (!activeOutletModal) return null;

  const outlet = activeOutletModal;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getQuantityInCart = (itemId: string) => {
    const item = cart.find((ci) => ci.item.id === itemId && ci.outletId === outlet.id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150">
        {/* Header with image & basic details */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-stone-100 shrink-0">
          <Image
            src={outlet.image}
            alt={outlet.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Close button */}
          <button
            onClick={() => setActiveOutletModal(null)}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-4 h-4" />
          </button>

          {/* Outlet details overlaid */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#eaf7ee] text-[#1b6b38] text-[11px] font-bold px-2 py-0.5 rounded-md">
                Open now
              </span>
              <span className="text-white/80 text-xs">· {outlet.hours}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-xs">
              {outlet.name} Menu
            </h3>
            <p className="text-white/90 text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
              <LocationPinIcon className="w-3.5 h-3.5 shrink-0 text-white/80" />
              <span>{outlet.address}</span>
            </p>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="p-4 sm:p-6 overflow-y-auto divide-y divide-stone-100 flex-1">
          <div className="flex items-center justify-between pb-3 mb-2">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Popular Specialties &amp; Meals
            </h4>
            <span className="text-xs text-stone-500">
              {outlet.deliversToUser ? 'Delivery & Pickup' : 'Pickup Only'}
            </span>
          </div>

          {outlet.menu.map((dish) => {
            const count = getQuantityInCart(dish.id);

            return (
              <div
                key={dish.id}
                className="py-4 first:pt-2 flex items-start justify-between gap-4 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#b83827] transition-colors">
                      {dish.name}
                    </h5>
                    {(dish.popular || dish.tag) && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {dish.tag || 'Best Seller'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="mt-2 text-sm font-extrabold text-stone-900">
                    {formatPrice(dish.price)}
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  <button
                    onClick={() => addItem(dish, outlet)}
                    className="px-3.5 py-1.5 bg-[#b83827] hover:bg-[#a02f1f] text-white text-xs font-semibold rounded-lg shadow-2xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>{count > 0 ? `Add (${count})` : '+ Add'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Delivery from this branch: {outlet.deliversToUser ? '₦800 · 30-45m' : 'Outside boundary'}
          </div>
          <button
            onClick={() => setActiveOutletModal(null)}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
