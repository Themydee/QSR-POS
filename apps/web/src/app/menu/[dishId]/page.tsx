'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import {
  LocationPinIcon,
  ArrowLeftIcon,
  InfoCircleIcon,
  CheckIcon,
} from '../../../components/Icons';
import { CROWD_FAVOURITES, MenuItem } from '../../../data/outlets';

type PepperLevel = 'Mild' | 'Medium' | 'Hot';

interface ProteinOption {
  id: string;
  name: string;
  description: string;
  extraPrice: number;
}

interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

const PROTEIN_OPTIONS: ProteinOption[] = [
  {
    id: 'chicken',
    name: 'Pepper-grilled chicken',
    description: 'Our signature flame-grilled cut',
    extraPrice: 0,
  },
  {
    id: 'croaker-fish',
    name: 'Grilled croaker fish',
    description: 'Freshly grilled with pepper sauce',
    extraPrice: 2000,
  },
];

const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: 'extra-plantain',
    name: 'Extra fried plantain',
    price: 1000,
  },
  {
    id: 'creamy-coleslaw',
    name: 'Creamy coleslaw',
    price: 800,
  },
];

function DishCustomizationContent() {
  const params = useParams();
  const router = useRouter();
  const { selectedOutlet, setIsChangeOutletOpen, addItem, setIsCartOpen } = useCart();

  const dishId = (params?.dishId as string) || 'smoky-jollof-chicken';

  // Find dish or fallback to Smoky Jollof & Chicken
  const dish: MenuItem = useMemo(() => {
    const found = selectedOutlet.menu.find((d) => d.id === dishId);
    return found || CROWD_FAVOURITES[0];
  }, [selectedOutlet.menu, dishId]);

  // Form states matching client design defaults
  const [pepperLevel, setPepperLevel] = useState<PepperLevel>('Medium');
  const [selectedProtein, setSelectedProtein] = useState<string>('chicken');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['extra-plantain']);
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    'Please pack the plantain separately.'
  );
  const [quantity, setQuantity] = useState<number>(2);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) => {
      if (prev.includes(extraId)) {
        return prev.filter((id) => id !== extraId);
      }
      if (prev.length >= 2) return prev; // max 2
      return [...prev, extraId];
    });
  };

  // Pricing calculation
  const proteinCost =
    PROTEIN_OPTIONS.find((p) => p.id === selectedProtein)?.extraPrice || 0;

  const extrasCost = selectedExtras.reduce((sum, extraId) => {
    const item = EXTRA_OPTIONS.find((e) => e.id === extraId);
    return sum + (item ? item.price : 0);
  }, 0);

  const pricePerMeal = dish.price + proteinCost + extrasCost;
  const grandTotal = pricePerMeal * quantity;

  // Build customization summary string (e.g. "Medium pepper · Extra plantain")
  const customizationSummary = useMemo(() => {
    const parts = [`${pepperLevel} pepper`];
    if (selectedProtein !== 'chicken') {
      const p = PROTEIN_OPTIONS.find((opt) => opt.id === selectedProtein);
      if (p) parts.push(p.name);
    }
    selectedExtras.forEach((extraId) => {
      const e = EXTRA_OPTIONS.find((opt) => opt.id === extraId);
      if (e) parts.push(e.name);
    });
    return parts.join(' · ');
  }, [pepperLevel, selectedProtein, selectedExtras]);

  const handleAddToBag = () => {
    // Add custom configured item with quantity
    for (let i = 0; i < quantity; i++) {
      addItem(dish, selectedOutlet, customizationSummary, proteinCost + extrasCost);
    }
    // Navigate back to menu with updated bag
    router.push('/menu');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-6 text-stone-500">
          <Link
            href="/menu"
            className="text-[#b83827] font-semibold hover:underline flex items-center gap-1.5 group"
          >
            <span className="text-base font-bold leading-none">←</span>
            <span>Back to {selectedOutlet.name.split(' ')[0]} menu</span>
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-500">{dish.category}</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-800 font-medium truncate">{dish.name}</span>
        </div>

        {/* 2-Column Customization Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Dish Hero Photo, Story & Allergen Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dish Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            {/* Badges & Meta */}
            <div className="flex items-center gap-2.5 text-xs">
              <span className="bg-[#feeae6] text-[#b83827] font-bold px-2.5 py-1 rounded-md">
                Bestseller
              </span>
              <span className="bg-[#eaf5ed] text-[#2b6b3e] font-bold px-2.5 py-1 rounded-md">
                Freshly grilled
              </span>
              <span className="text-stone-500 font-medium ml-1">
                15–20 min prep
              </span>
            </div>

            {/* Editorial Story */}
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                A proper plate of comfort.
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mt-2">
                Long-grain rice slow-cooked in our smoky tomato and pepper sauce,
                served with a generous piece of pepper-grilled chicken. A little
                taste of home, every time.
              </p>
            </div>

            {/* Good to know / Allergens */}
            <div className="pt-4 border-t border-stone-100 flex items-start gap-3">
              <InfoCircleIcon className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Good to know</h4>
                <p className="text-xs text-stone-500 leading-relaxed mt-0.5">
                  Contains soy. Prepared in a kitchen that also handles peanuts, dairy,
                  and wheat. Tell us about any allergies in your order notes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Form Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* Dish Title & Price Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                {dish.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl sm:text-3xl font-black text-[#b83827]">
                  {formatPrice(dish.price)}
                </span>
                <span className="text-sm font-normal text-stone-500">
                  One generous serving
                </span>
              </div>
            </div>

            {/* Option 1: How much pepper? */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  How much pepper?
                </h3>
                <span className="text-xs text-stone-400 font-normal">
                  Choose 1 · Required
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['Mild', 'Medium', 'Hot'] as PepperLevel[]).map((level) => {
                  const isSelected = pepperLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setPepperLevel(level)}
                      className={`p-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-start sm:justify-center gap-2.5 ${
                        isSelected
                          ? 'border-[#b83827] bg-[#fcedeb] text-stone-900 shadow-2xs'
                          : 'border-stone-200/90 bg-white hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                          isSelected
                            ? 'border-[#b83827] bg-[#b83827] text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckIcon className="w-2.5 h-2.5" />}
                      </span>
                      <span>{level}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option 2: Choose your protein */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  Choose your protein
                </h3>
                <span className="text-xs text-stone-400 font-normal">
                  Choose 1 · Required
                </span>
              </div>

              <div className="space-y-2.5">
                {PROTEIN_OPTIONS.map((protein) => {
                  const isSelected = selectedProtein === protein.id;

                  return (
                    <div
                      key={protein.id}
                      onClick={() => setSelectedProtein(protein.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#b83827] bg-[#fcedeb] shadow-2xs'
                          : 'border-stone-200/90 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                            isSelected
                              ? 'border-[#b83827] bg-[#b83827] text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckIcon className="w-2.5 h-2.5" />}
                        </span>
                        <div>
                          <div className="font-bold text-sm text-stone-900">
                            {protein.name}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {protein.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm font-semibold shrink-0">
                        {protein.extraPrice === 0 ? (
                          <span className="text-stone-700 font-medium">Included</span>
                        ) : (
                          <span className="text-stone-900 font-bold">+ {formatPrice(protein.extraPrice)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Option 3: Make it yours (Extras) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  Make it yours
                </h3>
                <span className="text-xs text-stone-400 font-normal">
                  Optional · Up to 2
                </span>
              </div>

              <div className="space-y-2.5">
                {EXTRA_OPTIONS.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);

                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#b83827] bg-[#fcedeb] shadow-2xs'
                          : 'border-stone-200/90 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 transition-all ${
                            isSelected
                              ? 'border-[#b83827] bg-[#b83827] text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckIcon className="w-2.5 h-2.5" />}
                        </span>
                        <div className="font-bold text-sm text-stone-900">
                          {extra.name}
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-stone-900 shrink-0">
                        + {formatPrice(extra.price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Option 4: Anything we should know? */}
            <div>
              <label
                htmlFor="special-instructions"
                className="block text-xs font-bold text-stone-900 mb-1.5"
              >
                Anything we should know?
              </label>
              <textarea
                id="special-instructions"
                rows={2}
                maxLength={160}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="E.g., No cutlery, please pack the plantain separately."
                className="w-full p-3.5 bg-white border border-stone-200/90 rounded-xl text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]/15 focus:border-[#b83827] transition shadow-2xs resize-none"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Special requests are subject to availability. Max. 160 characters.
              </p>
            </div>

            {/* Bottom Floating / Sticky Action Container */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 block font-normal mb-1">
                  {formatPrice(pricePerMeal)} per meal
                </span>
                <div className="flex items-center gap-3 bg-white border border-stone-200/90 rounded-xl p-1 w-fit shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center text-sm transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold text-stone-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center text-sm transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToBag}
                className="flex-1 sm:flex-initial px-8 py-3.5 sm:py-4 bg-[#b83827] hover:bg-[#a02f1f] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                + Add {quantity} to bag · {formatPrice(grandTotal)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DishCustomizationPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] pt-28 text-center text-stone-500 font-medium">
          Loading your meal...
        </div>
      }
    >
      <DishCustomizationContent />
    </React.Suspense>
  );
}
