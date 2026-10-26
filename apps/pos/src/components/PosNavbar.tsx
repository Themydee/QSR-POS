import { BukaLogo, PlusIcon, ExternalLinkIcon, LocationPinIcon } from './PosIcons';
import type { PosTab } from '../types';

interface PosNavbarProps {
  activeTab: PosTab;
  onTabChange: (tab: PosTab) => void;
  onNewSale: () => void;
  outletName?: string;
  outletAddress?: string;
  tillId?: string;
  shiftCode?: string;
  cashierName?: string;
}

export function PosNavbar({
  activeTab,
  onTabChange,
  onNewSale,
  outletName = 'Lekki Phase 1',
  outletAddress = '12 Admirality Way',
  tillId = 'Till 01',
  shiftCode = 'LK-241026-A',
  cashierName = 'Aisha Bello',
}: PosNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200/90 shadow-2xs">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <BukaLogo className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-stone-900">
            buka &amp; co.
          </span>
          <span className="text-stone-300 font-light mx-1">|</span>
          <span className="text-sm font-bold text-stone-800 tracking-wide">
            Cashier POS
          </span>
        </div>

        {/* Center Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              onTabChange('sale');
              onNewSale();
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'sale'
                ? 'bg-[#ffebe6] text-[#b83827] border border-[#f5c6bc]'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <PlusIcon className="w-4 h-4 text-[#b83827]" />
            <span>New sale</span>
          </button>

          <button
            onClick={() => onTabChange('transactions')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-[#ffebe6] text-[#b83827] border border-[#f5c6bc]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <span>Transactions</span>
          </button>

          <button
            onClick={() => onTabChange('shift')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'shift'
                ? 'bg-[#ffebe6] text-[#b83827] border border-[#f5c6bc]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Shift &amp; close-out</span>
          </button>
        </div>

        {/* Cashier Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center tracking-wider ring-2 ring-stone-200">
            AB
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-stone-900 leading-tight">
              {cashierName}
            </span>
            <span className="text-[11px] text-stone-500">
              Cashier · {tillId}
            </span>
          </div>
        </div>
      </div>

      {/* Subheader Branch Context Strip */}
      <div className="bg-[#f5f2eb] border-t border-stone-200/70 px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <LocationPinIcon className="w-3.5 h-3.5 text-[#b83827] shrink-0" />
          <span className="font-bold text-stone-900">{outletName}</span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-600">{outletAddress} · {tillId}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Shift open</span>
            <span className="text-emerald-300">·</span>
            <span>{shiftCode} · Opened 09:00 WAT</span>
          </div>

          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#b83827] hover:underline font-semibold text-[11px]"
          >
            <span>Kitchen workspace</span>
            <ExternalLinkIcon className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
