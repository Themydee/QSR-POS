'use client';

import React from 'react';
import Link from 'next/link';

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { number: 1, label: 'Your cart', href: '/cart' },
    { number: 2, label: 'Checkout', href: '/checkout' },
    { number: 3, label: 'Order tracking', href: '/order-tracking' },
  ];

  return (
    <div className="flex items-center gap-3 text-xs sm:text-sm font-medium select-none mb-6">
      {steps.map((step, idx) => {
        const isActive = currentStep === step.number;
        const isPast = currentStep > step.number;

        return (
          <React.Fragment key={step.number}>
            {idx > 0 && (
              <div className="w-8 sm:w-12 h-px bg-stone-200 shrink-0" />
            )}

            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#b83827] text-white shadow-2xs'
                    : isPast
                    ? 'bg-stone-200 text-stone-600'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {step.number}
              </span>

              {isPast ? (
                <Link
                  href={step.href}
                  className="text-stone-500 hover:text-stone-800 transition-colors"
                >
                  {step.label}
                </Link>
              ) : (
                <span
                  className={
                    isActive
                      ? 'font-bold text-stone-900'
                      : 'text-stone-400 font-normal'
                  }
                >
                  {step.label}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
