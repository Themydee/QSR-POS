'use client';

import React, { useState } from 'react';
import { LocationPinIcon, SearchIcon, GpsIcon } from './Icons';

interface LocationSearchProps {
  currentAddress: string;
  onAddressChange: (newAddress: string) => void;
  onFindOutlets: () => void;
}

const LAGOS_SUGGESTIONS = [
  'Admiralty Way, Lekki Phase 1, Lagos',
  'Akin Adesola Street, Victoria Island, Lagos',
  'Isaac John Street, Ikeja GRA, Lagos',
  'Herbert Macaulay Way, Yaba, Lagos',
  'Adeniran Ogunsanya Street, Surulere, Lagos',
  'Bourdillon Road, Ikoyi, Lagos',
];

export function LocationSearch({
  currentAddress,
  onAddressChange,
  onFindOutlets,
}: LocationSearchProps) {
  const [query, setQuery] = useState(currentAddress);
  const [isFocused, setIsFocused] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddressChange(query);
    onFindOutlets();
    setIsFocused(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    onAddressChange(suggestion);
    onFindOutlets();
    setIsFocused(false);
  };

  const handleUseMyLocation = () => {
    setIsDetecting(true);
    // Simulate high-accuracy geolocation
    setTimeout(() => {
      const detected = 'Admiralty Way, Lekki Phase 1, Lagos';
      setQuery(detected);
      onAddressChange(detected);
      onFindOutlets();
      setIsDetecting(false);
    }, 600);
  };

  return (
    <section id="search-section" className="w-full pt-10 pb-4 scroll-mt-24">
      <h2 className="text-sm font-semibold text-stone-900 mb-2.5">
        Where are we bringing the good food?
      </h2>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
          {/* Address Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
              <LocationPinIcon className="w-4 h-4 text-stone-400" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Enter your street address or neighborhood..."
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]/15 focus:border-[#b83827] transition shadow-2xs font-normal"
            />

            {/* Suggestions Popover */}
            {isFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-stone-200 rounded-xl shadow-lg z-30 py-2 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3.5 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Popular Lagos Locations
                </div>
                {LAGOS_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseDown={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 flex items-center gap-2.5 transition-colors"
                  >
                    <LocationPinIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Find Outlets Primary Button */}
          <button
            type="submit"
            className="px-6 py-3 sm:py-3.5 bg-[#b83827] hover:bg-[#a02f1f] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.98] shrink-0"
          >
            <SearchIcon className="w-4 h-4" />
            <span>Find outlets</span>
          </button>

          {/* Use My Location Secondary Button */}
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isDetecting}
            className="px-5 py-3 sm:py-3.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98] shrink-0 disabled:opacity-60"
          >
            <GpsIcon className={`w-4 h-4 text-stone-600 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>{isDetecting ? 'Detecting...' : 'Use my location'}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
