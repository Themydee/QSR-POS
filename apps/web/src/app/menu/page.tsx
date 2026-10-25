'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import {
  LocationPinIcon,
  SearchIcon,
  InfoCircleIcon,
  StarIcon,
  ChefHatIcon,
  ShoppingBagIcon,
} from '../../components/Icons';
import { MenuItem } from '../../data/outlets';

const CATEGORIES = [
  'Popular',
  'Rice bowls',
  'Grills & suya',
  'Sides',
  'Drinks',
  'Combos',
] as const;

export default function MenuPage() {
  const {
    selectedOutlet,
    setIsChangeOutletOpen,
    setIsOutletInfoOpen,
    cart,
    subtotal,
    totalCount,
    addItem,
    updateQuantity,
    setIsCartOpen,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('Popular');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter items by active category and search query
  const filteredDishes = useMemo(() => {
    return selectedOutlet.menu.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === 'Popular') {
        return dish.categories.includes('Popular');
      }
      return dish.categories.includes(activeCategory);
    });
  }, [selectedOutlet.menu, activeCategory, searchQuery]);

  const getTagColor = (tagType?: string) => {
    switch (tagType) {
      case 'bestseller':
        return 'text-[#b83827]';
      case 'heat':
        return 'text-amber-700';
      case 'fresh':
        return 'text-emerald-700';
      case 'favourite':
        return 'text-[#b83827]';
      case 'sides':
      default:
        return 'text-[#b83827]';
    }
  };

  return (
    <div className="w-full bg-[#faf9f6]/40 min-h-screen pt-16 sm:pt-20">
      {/* SubHeader Context Bar */}
      <div className="w-full bg-[#fbf9f5] border-b border-stone-200/60 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700">
            <LocationPinIcon className="w-3.5 h-3.5 text-[#b83827] shrink-0" />
            <span>
              Ordering from <strong className="font-bold text-stone-900">{selectedOutlet.name}</strong>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20">
        {/* Outlet Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-stone-100 shadow-2xs border border-stone-200/80">
              <Image
                src={selectedOutlet.image}
                alt={selectedOutlet.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {selectedOutlet.name}
                </h1>
                {selectedOutlet.isOpen && (
                  <span className="bg-[#eaf7ee] text-[#1b6b38] text-xs font-semibold px-2.5 py-0.5 rounded-md border border-[#d2edd7]">
                    Open now
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {selectedOutlet.address}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-600 mt-2.5">
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 text-stone-900" />
                  {selectedOutlet.rating} ({selectedOutlet.reviewCount}+ reviews)
                </span>
                <span className="text-stone-300">·</span>
                <span>
                  {selectedOutlet.deliversToUser
                    ? `${selectedOutlet.prepTime} delivery`
                    : 'Pickup only'}
                </span>
                <span className="text-stone-300">·</span>
                <span>
                  {selectedOutlet.deliversToUser
                    ? `Delivery from ${formatPrice(selectedOutlet.deliveryFee)}`
                    : 'Free pickup at counter'}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setIsOutletInfoOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-stone-50 border border-stone-200/90 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <InfoCircleIcon className="w-4 h-4 text-stone-500" />
              <span>Outlet information</span>
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="pt-2 pb-6">
          <label htmlFor="dish-search" className="block text-sm font-bold text-stone-900 mb-2">
            Find your favourite
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
              <SearchIcon className="w-4 h-4 text-stone-400" />
            </div>
            <input
              id="dish-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, sides, or drinks"
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white border border-stone-200/90 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]/15 focus:border-[#b83827] transition shadow-2xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-stone-200 overflow-x-auto scrollbar-none mb-8">
          <div className="flex items-center gap-7 text-sm whitespace-nowrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-3 text-sm font-medium transition-colors cursor-pointer relative ${
                    isActive
                      ? 'text-[#b83827] font-bold border-b-2 border-[#b83827]'
                      : 'text-stone-500 hover:text-stone-900 border-b-2 border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Content Grid: Menu Left + Sticky Bag Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Menu (Left Column) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Category Header */}
            <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  {activeCategory === 'Popular' ? 'The crowd favourites' : activeCategory}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Made fresh, packed with flavour.
                </p>
              </div>
              <span className="text-xs text-stone-400 font-medium">
                {filteredDishes.length} items
              </span>
            </div>

            {/* Dishes Grid */}
            {filteredDishes.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-stone-200/80 p-8">
                <p className="text-stone-500 text-sm">No dishes found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-semibold text-[#b83827] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200 group"
                  >
                    {/* Dish Photo */}
                    <Link
                      href={`/menu/${dish.id}`}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 block cursor-pointer"
                    >
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Dish Content */}
                    <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between">
                      <div>
                        {dish.tag && (
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${getTagColor(
                              dish.tagType
                            )}`}
                          >
                            {dish.tag}
                          </span>
                        )}

                        <Link href={`/menu/${dish.id}`}>
                          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-[#b83827] transition-colors cursor-pointer">
                            {dish.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Price and Add button */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 text-sm sm:text-base">
                          {formatPrice(dish.price)}
                        </span>

                        <Link
                          href={`/menu/${dish.id}`}
                          className="px-3 sm:px-3.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <span>+ Add</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar Cart (Right Column) */}
          <div className="lg:col-span-4 sticky top-36">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-2xs">
              {/* Bag Header */}
              <div className="flex items-center justify-between pb-1">
                <h3 className="font-bold text-stone-900 text-lg">Your bag</h3>
                <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
                  {totalCount} items
                </span>
              </div>
              <p className="text-xs text-stone-400 mb-4">
                Delivery · {selectedOutlet.name}
              </p>

              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="py-10 text-center text-stone-400 text-xs">
                  Your bag is currently empty.
                </div>
              ) : (
                <div className="divide-y divide-stone-100 border-t border-b border-stone-100 my-2">
                  {cart.map((ci) => (
                    <div key={ci.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                      <div className="flex-1">
                        <div className="font-bold text-stone-900 text-xs sm:text-sm">
                          {ci.quantity} × {ci.item.name}
                        </div>
                        {ci.customization && (
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {ci.customization}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold text-stone-900 text-xs sm:text-sm">
                          {formatPrice(ci.totalPrice)}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 justify-end">
                          <button
                            onClick={() => updateQuantity(ci.id, -1)}
                            className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-3 text-center font-bold text-stone-900">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(ci.id, 1)}
                            className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtotal Calculation */}
              <div className="pt-3 pb-4">
                <div className="flex justify-between items-center text-sm font-bold text-stone-900">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Delivery calculated at checkout.
                </p>
              </div>

              {/* View Cart Button */}
              <Link
                href="/cart"
                className="w-full py-3.5 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.99] cursor-pointer block text-center"
              >
                View cart · {formatPrice(subtotal)}
              </Link>

              {/* Freshness Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 pt-4 mt-4 border-t border-stone-100">
                <ChefHatIcon className="w-4 h-4 text-stone-400" />
                <span>Cooked fresh for every order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
