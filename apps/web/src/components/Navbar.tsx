'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BukaLogo, ShoppingBagIcon } from './Icons';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Switch navbar style as soon as user scrolls past 30px
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs py-3.5'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-8 sm:gap-12">
          <Link href="/" className="flex items-center gap-2.5 group">
            <BukaLogo className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105" />
            <span
              className={`text-xl sm:text-[22px] font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-stone-900' : 'text-white drop-shadow-sm'
              }`}
            >
              buka &amp; co.
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link
              href="/"
              className={`font-semibold transition-colors duration-300 ${
                isScrolled
                  ? 'text-[#b83827]'
                  : 'text-amber-300 drop-shadow-xs hover:text-white'
              }`}
            >
              Order online
            </Link>
            <a
              href="#outlets"
              className={`transition-colors duration-300 ${
                isScrolled
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-white/85 hover:text-white drop-shadow-xs'
              }`}
            >
              Our outlets
            </a>
            <a
              href="#outlets"
              className={`transition-colors duration-300 ${
                isScrolled
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-white/85 hover:text-white drop-shadow-xs'
              }`}
            >
              My orders
            </a>
          </nav>
        </div>

        {/* Right side: Greeting, Cart, Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* <span
            className={`hidden sm:inline-block text-sm font-medium transition-colors duration-300 ${
              isScrolled ? 'text-stone-800' : 'text-white/90 drop-shadow-xs'
            }`}
          >
            Hi, Tolu
          </span> */}

          <button
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 shadow-2xs cursor-pointer ${
              isScrolled
                ? 'border border-red-200/80 bg-red-50/40 text-[#b83827] hover:bg-red-50'
                : 'bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 shadow-xs'
            }`}
            aria-label="View shopping cart"
          >
            <ShoppingBagIcon
              className={`w-4 h-4 transition-colors duration-300 ${
                isScrolled ? 'text-[#b83827]' : 'text-white'
              }`}
            />
            <span>Cart · {totalCount}</span>
          </button>

          <div
            className={`w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center select-none shadow-2xs transition-colors duration-300 ${
              isScrolled
                ? 'bg-stone-100 border border-stone-200/60 text-stone-700'
                : 'bg-white/20 backdrop-blur-md border border-white/30 text-white'
            }`}
            title="Tolu Akanbi"
          >
            TA
          </div>
        </div>
      </div>
    </header>
  );
}
