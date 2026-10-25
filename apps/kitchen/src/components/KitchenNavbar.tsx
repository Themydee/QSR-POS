import { BukaLogo, LocationPinIcon } from './KitchenIcons';

export type KitchenTab = 'board' | 'history' | 'availability';

interface KitchenNavbarProps {
  activeTab: KitchenTab;
  onTabChange: (tab: KitchenTab) => void;
  outletName?: string;
  chefName?: string;
  isPaused?: boolean;
}

export function KitchenNavbar({
  activeTab,
  onTabChange,
  outletName = 'Lekki Phase 1',
  chefName = 'Chef Emeka',
  isPaused = false,
}: KitchenNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2.5">
            <BukaLogo className="w-7 h-7" />
            <span className="text-xl font-bold tracking-tight text-stone-900">
              buka &amp; co.
            </span>
            <span className="text-stone-300 font-light mx-1">|</span>
            <span className="text-sm font-bold text-stone-700 uppercase tracking-wider">
              Kitchen
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button
              onClick={() => onTabChange('board')}
              className={`font-semibold transition-colors cursor-pointer pb-0.5 ${
                activeTab === 'board'
                  ? 'text-[#b83827] border-b-2 border-[#b83827]'
                  : 'text-stone-500 hover:text-stone-900 border-b-2 border-transparent'
              }`}
            >
              Order board
            </button>
            <button
              onClick={() => onTabChange('history')}
              className={`font-semibold transition-colors cursor-pointer pb-0.5 ${
                activeTab === 'history'
                  ? 'text-[#b83827] border-b-2 border-[#b83827]'
                  : 'text-stone-500 hover:text-stone-900 border-b-2 border-transparent'
              }`}
            >
              Order history
            </button>
            <button
              onClick={() => onTabChange('availability')}
              className={`font-semibold transition-colors cursor-pointer pb-0.5 ${
                activeTab === 'availability'
                  ? 'text-[#b83827] border-b-2 border-[#b83827]'
                  : 'text-stone-500 hover:text-stone-900 border-b-2 border-transparent'
              }`}
            >
              Availability
            </button>
          </nav>
        </div>

        {/* Right Info: Outlet Pill, Live Status, Chef Name */}
        <div className="flex items-center gap-3">
          {/* Outlet selector pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200/90 bg-white text-xs font-semibold text-stone-800 shadow-2xs">
            <LocationPinIcon className="w-3.5 h-3.5 text-stone-500" />
            <span>{outletName}</span>
          </div>

          {/* Live indicator */}
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
              isPaused
                ? 'bg-amber-100 text-amber-800'
                : 'bg-[#eaf5ed] text-[#2b6b3e]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPaused ? 'bg-amber-600' : 'bg-emerald-600 animate-pulse'
              }`}
            />
            <span>{isPaused ? 'Paused' : 'Live'}</span>
          </span>

          {/* Chef Name */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center">
              CE
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-stone-800">
              {chefName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
