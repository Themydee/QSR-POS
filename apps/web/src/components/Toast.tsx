'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckIcon } from './Icons';

export function Toast() {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-stone-900 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs sm:text-sm font-medium border border-stone-800">
        <span className="w-4 h-4 rounded-full bg-[#1b6b38] flex items-center justify-center shrink-0">
          <CheckIcon className="w-2.5 h-2.5 text-white" />
        </span>
        <span>{notification}</span>
      </div>
    </div>
  );
}
