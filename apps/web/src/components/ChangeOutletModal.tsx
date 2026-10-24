'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { INITIAL_OUTLETS, Outlet } from '../data/outlets';
import { CloseIcon, LocationPinIcon, CheckIcon } from './Icons';

export function ChangeOutletModal() {
  const { isChangeOutletOpen, setIsChangeOutletOpen, selectedOutlet, setSelectedOutlet } =
    useCart();

  if (!isChangeOutletOpen) return null;

  const handleSelect = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    setIsChangeOutletOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-lg">Select an Outlet</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Choose your nearest kitchen to view live menu &amp; pricing
            </p>
          </div>
          <button
            onClick={() => setIsChangeOutletOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Outlet List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {INITIAL_OUTLETS.map((outlet) => {
            const isSelected = outlet.id === selectedOutlet.id;

            return (
              <div
                key={outlet.id}
                onClick={() => handleSelect(outlet)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#b83827] bg-red-50/20 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                    <Image
                      src={outlet.image}
                      alt={outlet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">{outlet.name}</h4>
                      {outlet.isOpen && (
                        <span className="bg-[#eaf7ee] text-[#1b6b38] text-[10px] font-bold px-1.5 py-0.2 rounded">
                          Open
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">{outlet.address}</p>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1 mt-1">
                      <LocationPinIcon className="w-3 h-3 text-stone-400" />
                      {outlet.distanceKm} km away · {outlet.prepTime}
                    </span>
                  </div>
                </div>

                <div>
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-[#b83827] text-white flex items-center justify-center">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-stone-400 group-hover:text-stone-900">
                      Select
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            onClick={() => setIsChangeOutletOpen(false)}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
