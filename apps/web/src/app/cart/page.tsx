'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CheckoutStepper } from '../../components/CheckoutStepper';
import {
  LocationPinIcon,
  ArrowLeftIcon,
  BicycleIcon,
  NoteIcon,
  HeartHandIcon,
} from '../../components/Icons';
import { CROWD_FAVOURITES } from '../../data/outlets';

function CartPageContent() {
  const {
    cart,
    selectedOutlet,
    setIsChangeOutletOpen,
    removeItem,
    updateQuantity,
    addItem,
    subtotal,
    deliveryFee,
    grandTotal,
    totalCount,
    kitchenNote,
    setKitchenNote,
    promoCode,
    setPromoCode,
    promoDiscount,
    promoError,
    applyPromoCode,
  } = useCart();

  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteInput, setNoteInput] = useState(kitchenNote);
  const [promoInput, setPromoInput] = useState(promoCode);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSaveNote = () => {
    setKitchenNote(noteInput);
    setIsEditingNote(false);
  };

  // Upsell sides
  const upsellMoiMoi = CROWD_FAVOURITES[5]; // Steamed Moi-Moi
  const upsellDodo = CROWD_FAVOURITES[3]; // Sweet Dodo Portion

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen pt-16 sm:pt-20">
      {/* SubHeader Context Bar */}
      <div className="w-full bg-[#fbf9f5] border-b border-stone-200/60 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700">
            <LocationPinIcon className="w-3.5 h-3.5 text-[#b83827] shrink-0" />
            <span>
              Ordering from{' '}
              <strong className="font-bold text-stone-900">{selectedOutlet.name}</strong>
            </span>
            <button
              onClick={() => setIsChangeOutletOpen(true)}
              className="text-[#b83827] font-semibold hover:underline ml-1 cursor-pointer"
            >
              Change outlet
            </button>
          </div>

          <div className="text-stone-500 font-normal">
            <span>{selectedOutlet.hours}</span>
            <span className="mx-1.5">·</span>
            <span>
              {selectedOutlet.deliversToUser
                ? `Delivery in ${selectedOutlet.prepTime}`
                : 'Pickup only'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        {/* Step Indicator */}
        <CheckoutStepper currentStep={1} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Your good-food bag
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              A quick look before we get cooking.
            </p>
          </div>

          <Link
            href="/menu"
            className="w-fit flex items-center gap-2 px-4 py-2 bg-white border border-stone-200/90 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 hover:bg-stone-50 transition shadow-2xs"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Keep browsing</span>
          </Link>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/90 p-12 text-center max-w-lg mx-auto shadow-2xs my-12">
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Your bag is currently empty
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              Looks like you haven&apos;t added any smoky jollof or grills yet.
            </p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-sm rounded-xl transition"
            >
              Explore our menu
            </Link>
          </div>
        ) : (
          /* 2-Column Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Items & Upsells) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Cart Items Box */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                {/* Header row */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <h2 className="font-bold text-stone-900 text-base sm:text-lg">
                    {totalCount} items from {selectedOutlet.name}
                  </h2>
                  <span className="bg-[#eaf5ed] text-[#2b6b3e] text-xs font-semibold px-2.5 py-1 rounded-md">
                    Available now
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-stone-100">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                          <Image
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Details */}
                        <div>
                          <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                            {cartItem.item.name}
                          </h3>

                          {cartItem.customization && (
                            <p className="text-xs text-stone-500 mt-0.5">
                              {cartItem.customization}
                            </p>
                          )}

                          <p className="text-xs text-stone-400 mt-1">
                            {cartItem.quantity} × {formatPrice(cartItem.unitPrice)}
                          </p>

                          {/* Stepper + Edit + Remove */}
                          <div className="flex items-center gap-3.5 mt-3">
                            <div className="flex items-center gap-2 bg-stone-50 border border-stone-200/90 rounded-lg p-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(cartItem.id, -1)}
                                className="w-6 h-6 rounded bg-white hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs shadow-2xs transition cursor-pointer"
                              >
                                −
                              </button>
                              <span className="w-4 text-center font-bold text-stone-900 text-xs">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(cartItem.id, 1)}
                                className="w-6 h-6 rounded bg-white hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs shadow-2xs transition cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <Link
                              href={`/menu/${cartItem.item.id}`}
                              className="text-xs font-semibold text-[#b83827] hover:underline cursor-pointer"
                            >
                              Edit
                            </Link>

                            <button
                              type="button"
                              onClick={() => removeItem(cartItem.id)}
                              className="text-xs font-medium text-stone-400 hover:text-stone-700 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line Item Total */}
                      <div className="font-extrabold text-stone-900 text-base sm:text-lg sm:text-right shrink-0">
                        {formatPrice(cartItem.totalPrice)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kitchen Note Row */}
                <div className="pt-4 border-t border-stone-100 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <NoteIcon className="w-4 h-4 text-stone-400" />
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        Kitchen note
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEditingNote((v) => !v)}
                      className="text-xs font-semibold text-[#b83827] hover:underline cursor-pointer"
                    >
                      {isEditingNote ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditingNote ? (
                    <div className="mt-2.5 flex items-center gap-2">
                      <input
                        type="text"
                        maxLength={160}
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="E.g., Please pack the plantain separately."
                        className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-200/90 rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                      />
                      <button
                        type="button"
                        onClick={handleSaveNote}
                        className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-stone-500 mt-1 pl-6">
                      {kitchenNote || 'No special instructions added.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery ETA Callout Banner */}
              <div className="bg-[#eaf7ee] border border-[#d2edd7] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 sm:gap-4 shadow-2xs">
                <div className="w-9 h-9 rounded-full bg-[#d2edd7]/60 text-[#1b6b38] flex items-center justify-center shrink-0">
                  <BicycleIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">
                    Good food is about 30–40 minutes away
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Delivery to Admiralty Way, Lekki. You can choose pickup at checkout.
                  </p>
                </div>
              </div>

              {/* Cross-sell / Upsells */}
              <div>
                <h3 className="font-bold text-base sm:text-lg text-stone-900 mb-3.5">
                  A little something on the side?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Leaf-wrapped Moi Moi */}
                  <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src="/images/menu-moi-moi.jpg"
                        alt="Leaf-wrapped Moi Moi"
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-stone-900 leading-snug">
                        Leaf-wrapped Moi Moi
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">₦1,800</div>
                      <button
                        type="button"
                        onClick={() => addItem(upsellMoiMoi, selectedOutlet)}
                        className="text-xs font-semibold text-[#b83827] hover:underline mt-1 cursor-pointer block"
                      >
                        + Add to bag
                      </button>
                    </div>
                  </div>

                  {/* Sweet Fried Plantain */}
                  <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src="/images/menu-dodo.jpg"
                        alt="Sweet Fried Plantain"
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-stone-900 leading-snug">
                        Sweet Fried Plantain
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">₦1,000</div>
                      <button
                        type="button"
                        onClick={() => addItem(upsellDodo, selectedOutlet)}
                        className="text-xs font-semibold text-[#b83827] hover:underline mt-1 cursor-pointer block"
                      >
                        + Add to bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Summary & Promo) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                <h3 className="font-bold text-lg text-stone-900">
                  Order summary
                </h3>
                <p className="text-xs text-stone-400 mt-0.5 mb-5">
                  {selectedOutlet.name} · {totalCount} items
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-stone-600">
                    <span>Delivery fee</span>
                    <span className="font-bold text-stone-900">
                      {formatPrice(deliveryFee)}
                    </span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600">
                      <span>Promo discount</span>
                      <span className="font-bold">
                        - {formatPrice(promoDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-extrabold text-stone-900 text-base">
                      Total
                    </span>
                    <span className="font-extrabold text-stone-900 text-xl">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 mt-1 mb-5">
                  Prices include VAT. No surprises at checkout.
                </p>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-sm sm:text-base rounded-xl transition shadow-xs text-center block cursor-pointer active:scale-[0.99]"
                >
                  Continue to checkout
                </Link>
              </div>

              {/* Promo Code Card */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 shadow-2xs">
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 mb-2">
                  Have a promo code?
                </h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                  />
                  {promoError && (
                    <p className="text-xs text-red-600">{promoError}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => applyPromoCode(promoInput)}
                    className="w-full py-2.5 bg-white border border-stone-200/90 hover:bg-stone-50 rounded-xl text-stone-800 font-semibold text-xs sm:text-sm transition shadow-2xs cursor-pointer"
                  >
                    Apply code
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-2 text-center">
                <HeartHandIcon className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Made fresh when you order. Packed with care, always.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] pt-28 text-center text-stone-500">
          Loading your bag...
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
