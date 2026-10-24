'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { CloseIcon, ShoppingBagIcon } from './Icons';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeItem, subtotal, clearCart } =
    useCart();

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = cart.length > 0 ? 800 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="w-5 h-5 text-[#b83827]" />
              <h3 className="font-bold text-stone-900 text-lg">Your Order</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-stone-900 text-base">Your cart is empty</h4>
                <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xs">
                  Choose an outlet and add some delicious jollof, suya, or drinks!
                </p>
              </div>
            ) : (
              cart.map((ci) => (
                <div key={ci.item.id} className="py-4 first:pt-0 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h5 className="font-bold text-stone-900 text-sm">{ci.item.name}</h5>
                    <span className="text-[11px] font-medium text-stone-500 block mt-0.5">
                      From {ci.outletName}
                    </span>
                    <span className="text-xs font-bold text-stone-800 mt-1 block">
                      {formatPrice(ci.item.price * ci.quantity)}
                    </span>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(ci.item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white text-stone-700 hover:bg-stone-200 text-xs font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-stone-900">
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(ci.item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white text-stone-700 hover:bg-stone-200 text-xs font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-100 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-stone-900">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(
                    `Order of ${formatPrice(grandTotal)} placed successfully! Sending to the kitchen.`
                  );
                  clearCart();
                  setIsCartOpen(false);
                }}
                className="w-full py-3.5 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-[0.99]"
              >
                Checkout · {formatPrice(grandTotal)}
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-stone-400 hover:text-stone-600 transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
