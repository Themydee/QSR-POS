'use client';

import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { LocationSearch } from '../components/LocationSearch';
import { OutletGrid } from '../components/OutletGrid';
import { INITIAL_OUTLETS, Outlet } from '../data/outlets';

export default function Home() {
  const [address, setAddress] = useState('Admiralty Way, Lekki Phase 1, Lagos');
  const [outlets, setOutlets] = useState<Outlet[]>(INITIAL_OUTLETS);

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    const lower = newAddress.toLowerCase();

    // Dynamically update proximity and delivery availability based on neighborhood
    if (lower.includes('ikeja')) {
      setOutlets((prev) =>
        prev.map((o) => {
          if (o.id === 'ikeja') {
            return { ...o, distanceKm: 0.8, deliversToUser: true, prepTime: '25–35 min' };
          }
          if (o.id === 'yaba') {
            return { ...o, distanceKm: 8.5, deliversToUser: true, prepTime: '40–50 min' };
          }
          return { ...o, deliversToUser: false, prepTime: 'Pickup only' };
        })
      );
    } else if (lower.includes('yaba')) {
      setOutlets((prev) =>
        prev.map((o) => {
          if (o.id === 'yaba') {
            return { ...o, distanceKm: 0.5, deliversToUser: true, prepTime: '20–30 min' };
          }
          if (o.id === 'surulere') {
            return { ...o, distanceKm: 4.2, deliversToUser: true, prepTime: '35–45 min' };
          }
          return { ...o, deliversToUser: false, prepTime: 'Pickup only' };
        })
      );
    } else if (lower.includes('surulere')) {
      setOutlets((prev) =>
        prev.map((o) => {
          if (o.id === 'surulere') {
            return { ...o, distanceKm: 1.1, deliversToUser: true, prepTime: '25–35 min' };
          }
          if (o.id === 'yaba') {
            return { ...o, distanceKm: 4.5, deliversToUser: true, prepTime: '35–45 min' };
          }
          return { ...o, deliversToUser: false, prepTime: 'Pickup only' };
        })
      );
    } else {
      // Default: Lekki / VI area
      setOutlets(INITIAL_OUTLETS);
    }
  };

  const handleFindOutlets = () => {
    const el = document.getElementById('outlets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationSearch
          currentAddress={address}
          onAddressChange={handleAddressChange}
          onFindOutlets={handleFindOutlets}
        />
        <OutletGrid outlets={outlets} />
      </div>
    </main>
  );
}
