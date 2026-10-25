'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { CheckoutStepper } from '../../components/CheckoutStepper';
import {
  LocationPinIcon,
  ClockIcon,
  CheckIcon,
  ShieldIcon,
  LockIcon,
  NoteIcon,
} from '../../components/Icons';

function CheckoutPageContent() {
  const router = useRouter();
  const {
    cart,
    selectedOutlet,
    setIsChangeOutletOpen,
    subtotal,
    deliveryFee,
    grandTotal,
    totalCount,
    kitchenNote,
    deliveryType,
    setDeliveryType,
    customerDetails,
    setCustomerDetails,
    deliveryAddress,
    setDeliveryAddress,
    paymentMethod,
    setPaymentMethod,
    promoDiscount,
    clearCart,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Paystack payment popup & confirmation
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to order tracking
      router.push('/order-tracking');
    }, 1200);
  };

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
        <CheckoutStepper currentStep={2} />

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Let’s make it yours.
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Confirm your details and we’ll take it from here.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Checkout Details) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Section 1: How would you like your order? */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                <h3 className="font-bold text-base text-stone-900 mb-4">
                  How would you like your order?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Delivery Option */}
                  <div
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-4 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                      deliveryType === 'delivery'
                        ? 'border-[#b83827] bg-[#fcedeb] shadow-2xs'
                        : 'border-stone-200/90 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition ${
                        deliveryType === 'delivery'
                          ? 'border-[#b83827] bg-[#b83827] text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {deliveryType === 'delivery' && (
                        <CheckIcon className="w-2.5 h-2.5" />
                      )}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-stone-900">
                        Delivery
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        30–40 min · ₦1,500
                      </div>
                    </div>
                  </div>

                  {/* Pickup Option */}
                  <div
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-4 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                      deliveryType === 'pickup'
                        ? 'border-[#b83827] bg-[#fcedeb] shadow-2xs'
                        : 'border-stone-200/90 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition ${
                        deliveryType === 'pickup'
                          ? 'border-[#b83827] bg-[#b83827] text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {deliveryType === 'pickup' && (
                        <CheckIcon className="w-2.5 h-2.5" />
                      )}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-stone-900">
                        Pickup
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Ready in 15–20 min · Free
                      </div>
                    </div>
                  </div>
                </div>

                {/* ETA Note */}
                <div className="flex items-center gap-2 text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100">
                  <ClockIcon className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    Deliver as soon as possible · Estimated 2:05–2:15 PM
                  </span>
                </div>
              </div>

              {/* Section 2: Your details */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                <h3 className="font-bold text-base text-stone-900 mb-4">
                  Your details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-xs font-bold text-stone-900 mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      value={customerDetails.fullName}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-xs font-bold text-stone-900 mb-1.5"
                    >
                      Phone number
                    </label>
                    <input
                      id="phone-number"
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-xs font-bold text-stone-900 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    required
                    value={customerDetails.email}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                  />
                  <p className="text-[11px] text-stone-400 mt-1.5">
                    Your receipt and order updates will be sent here.
                  </p>
                </div>
              </div>

              {/* Section 3: Delivery address */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-stone-900">
                    Delivery address
                  </h3>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#b83827] hover:underline cursor-pointer"
                  >
                    Use a saved address
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Street address */}
                  <div>
                    <label
                      htmlFor="street-address"
                      className="block text-xs font-bold text-stone-900 mb-1.5"
                    >
                      Street address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <LocationPinIcon className="w-4 h-4" />
                      </div>
                      <input
                        id="street-address"
                        type="text"
                        required
                        value={deliveryAddress.street}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            street: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                      />
                    </div>
                  </div>

                  {/* Area and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="area-input"
                        className="block text-xs font-bold text-stone-900 mb-1.5"
                      >
                        Area
                      </label>
                      <input
                        id="area-input"
                        type="text"
                        required
                        value={deliveryAddress.area}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            area: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city-input"
                        className="block text-xs font-bold text-stone-900 mb-1.5"
                      >
                        City / State
                      </label>
                      <input
                        id="city-input"
                        type="text"
                        required
                        value={deliveryAddress.cityState}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            cityState: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                      />
                    </div>
                  </div>

                  {/* Delivery Instructions */}
                  <div>
                    <label
                      htmlFor="delivery-instructions"
                      className="block text-xs font-bold text-stone-900 mb-1.5"
                    >
                      Delivery instructions (optional)
                    </label>
                    <input
                      id="delivery-instructions"
                      type="text"
                      value={deliveryAddress.instructions}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          instructions: e.target.value,
                        })
                      }
                      placeholder="E.g., Blue gate, opposite the pharmacy."
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                    />
                  </div>

                  {/* Save address checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer pt-1 select-none">
                    <input
                      type="checkbox"
                      checked={deliveryAddress.saveAddress}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          saveAddress: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#b83827] focus:ring-[#b83827] accent-[#b83827]"
                    />
                    <span className="text-xs font-medium text-stone-700">
                      Save this address for next time
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 4: How would you like to pay? */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                <h3 className="font-bold text-base text-stone-900 mb-4">
                  How would you like to pay?
                </h3>

                <div className="space-y-3">
                  {/* Pay Online */}
                  <div
                    onClick={() => setPaymentMethod('online')}
                    className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      paymentMethod === 'online'
                        ? 'border-[#b83827] bg-[#fcedeb] shadow-2xs'
                        : 'border-stone-200/90 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition ${
                          paymentMethod === 'online'
                            ? 'border-[#b83827] bg-[#b83827] text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {paymentMethod === 'online' && (
                          <CheckIcon className="w-2.5 h-2.5" />
                        )}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-stone-900">
                          Pay online
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Card, bank transfer, or USSD · Powered by Paystack
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-stone-700 shrink-0">
                      Recommended
                    </span>
                  </div>

                  {/* Pay at Pickup */}
                  <div
                    onClick={() => {
                      if (deliveryType === 'pickup') {
                        setPaymentMethod('pickup');
                      }
                    }}
                    className={`p-4 rounded-xl border transition flex items-center justify-between gap-3 ${
                      deliveryType !== 'pickup'
                        ? 'border-stone-200/60 bg-stone-50/60 opacity-60 cursor-not-allowed'
                        : paymentMethod === 'pickup'
                        ? 'border-[#b83827] bg-[#fcedeb] shadow-2xs cursor-pointer'
                        : 'border-stone-200/90 bg-white hover:bg-stone-50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition ${
                          paymentMethod === 'pickup' && deliveryType === 'pickup'
                            ? 'border-[#b83827] bg-[#b83827] text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {paymentMethod === 'pickup' && deliveryType === 'pickup' && (
                          <CheckIcon className="w-2.5 h-2.5" />
                        )}
                      </span>
                      <div>
                        <div className="font-medium text-sm text-stone-900">
                          Pay at pickup
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5">
                          Card or cash at the outlet · Available for pickup orders only
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Helper Note */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-3.5 pt-3 border-t border-stone-100">
                  <ShieldIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your payment details are encrypted. We never store your card information.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Your Order & Summary) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Your Order Card */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-bold text-base text-stone-900">
                    Your order
                  </h3>
                  <Link
                    href="/cart"
                    className="text-xs font-semibold text-[#b83827] hover:underline"
                  >
                    Edit cart
                  </Link>
                </div>

                {/* Items */}
                <div className="divide-y divide-stone-100 py-2">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="py-3 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                          <Image
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 text-xs sm:text-sm">
                            {cartItem.item.name}
                          </div>
                          {cartItem.customization && (
                            <div className="text-[11px] text-stone-400 mt-0.5">
                              {cartItem.customization}
                            </div>
                          )}
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {cartItem.quantity} × {formatPrice(cartItem.unitPrice)}
                          </div>
                        </div>
                      </div>

                      <div className="font-bold text-stone-900 text-xs sm:text-sm text-right shrink-0">
                        {formatPrice(cartItem.totalPrice)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Instructions Note */}
                {kitchenNote && (
                  <div className="pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-500">
                    <NoteIcon className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="italic">{kitchenNote}</span>
                  </div>
                )}
              </div>

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
                      {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
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

                <button
                  type="submit"
                  disabled={isProcessing || cart.length === 0}
                  className="w-full py-4 bg-[#b83827] hover:bg-[#a02f1f] disabled:bg-stone-300 text-white font-bold text-sm sm:text-base rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing with Paystack...</span>
                    </>
                  ) : (
                    <span>Pay {formatPrice(grandTotal)} &amp; place order</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mt-3.5">
                  <LockIcon className="w-3.5 h-3.5 text-stone-400" />
                  <span>Secure payment with Paystack</span>
                </div>
              </div>

              {/* Terms disclaimer */}
              <p className="text-[11px] text-stone-400 text-center leading-relaxed px-2">
                By placing your order, you agree to our Terms of service and Privacy
                policy. Your order is confirmed after payment.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] pt-28 text-center text-stone-500">
          Loading checkout...
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
