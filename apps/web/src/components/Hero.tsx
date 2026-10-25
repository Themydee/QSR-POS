'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

interface BackgroundScene {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const SCENES: BackgroundScene[] = [
  {
    id: 'suya',
    title: 'Flame-Grilled Suya',
    subtitle: 'Sizzling on open charcoal with Yaji spice',
    image: '/images/suya-grill.jpg',
  },
  {
    id: 'jollof',
    title: 'Wood-Fired Jollof',
    subtitle: 'Firewood-smoked, richly seasoned party rice',
    image: '/images/party-jollof.jpg',
  },
  {
    id: 'feast',
    title: 'Buka & Co. Feast',
    subtitle: 'Smoky jollof, dodo, chicken, and chilled zobo',
    image: '/images/hero-feast.jpg',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance scenes briskly every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SCENES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSearch = () => {
    const el = document.getElementById('search-section') || document.getElementById('outlets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-screen min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-stone-950"
    >
      {/* Background Images with brisk smooth Crossfade & Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        {SCENES.map((scene, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                priority={idx === 0}
                className={`object-cover object-center transform transition-transform duration-[3500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                sizes="100vw"
              />
            </div>
          );
        })}

        {/* Studio Directional Gradient: Deep Velvety Dark on Left for Impeccable Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent z-10 w-full lg:w-[68%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-stone-950/95 z-10" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex-1 flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-10">
        <div className="max-w-3xl my-auto">
         

          {/* Elevated Typography with Intentional Editorial Pacing */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-[-0.035em] text-white leading-[1.08] mb-6">
            Your favourites,
            <br />
            <span className="font-serif italic font-normal text-amber-100/95 tracking-normal">
              from your neighbourhood.
            </span>
          </h1>

          {/* Refined Subtitle */}
          <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-9">
            Smoky jollof, proper suya, and a little extra plantain.
            <br className="hidden sm:inline" />
            Find your nearest Buka &amp; Co. and let&apos;s eat.
          </p>

          {/* Premium Pill Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8">
            <Link
              href="/menu"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#b83827] hover:bg-[#a02f1f] text-white font-semibold text-sm sm:text-base rounded-full shadow-lg shadow-black/40 hover:shadow-red-950/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2.5 group"
            >
              <span>Order now</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#outlets"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium text-sm sm:text-base rounded-full hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              View 5 Lagos outlets
            </a>
          </div>

          {/* Live Micro-Trust Signals */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 font-normal">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-stone-300 font-medium">All 5 kitchens open now</span>
            </div>
            <span className="text-stone-600">·</span>
            <span>Average delivery 30–45 mins</span>
            <span className="text-stone-600">·</span>
            <span>Pickup always free</span>
          </div>
        </div>
      </div>
    </section>
  );
}
