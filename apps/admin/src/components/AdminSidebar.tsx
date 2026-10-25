import type { UserProfile } from '../types.ts';
import {
  FlameLogo,
  OverviewIcon,
  OutletsIcon,
  MenuPricingIcon,
  ReportsIcon,
  KitchenIcon,
  SettingsIcon,
  UsersIcon,
  ArrowUpRight,
} from './AdminIcons.tsx';

interface AdminSidebarProps {
  currentUser: UserProfile;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenKitchen: () => void;
}

export function AdminSidebar({
  currentUser,
  currentTab,
  onSelectTab,
  onOpenKitchen,
}: AdminSidebarProps) {
  const isOwner = currentUser.role === 'admin';

  return (
    <aside className="w-64 bg-white border-r border-stone-200/80 flex flex-col justify-between shrink-0 min-h-screen sticky top-0">
      <div>
        {/* Brand logo */}
        <div className="h-16 px-6 flex items-center gap-2.5 border-b border-stone-100">
          <div className="w-7 h-7 rounded-lg bg-[#b83827] flex items-center justify-center text-white shadow-sm shrink-0">
            <FlameLogo className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-stone-900">
            buka &amp; co.
          </span>
        </div>

        {/* Workspace Scope Pill */}
        <div className="p-4">
          <div className="bg-[#fbf9f5] border border-stone-200/60 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Management</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isOwner
                    ? 'bg-stone-900 text-white'
                    : 'bg-[#b83827] text-white'
                }`}
              >
                {isOwner ? 'HQ' : 'Branch'}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 font-medium truncate">
              {isOwner ? 'All five outlets' : currentUser.outletName}
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="px-3 space-y-1">
          {isOwner ? (
            <>
              {/* Owner Navigation */}
              <button
                type="button"
                onClick={() => onSelectTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'overview'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <OverviewIcon className="w-5 h-5" />
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('outlets')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'outlets'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <OutletsIcon className="w-5 h-5" />
                <span>Outlets</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('menu')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'menu'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <MenuPricingIcon className="w-5 h-5" />
                <span>Menu &amp; pricing</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('reports')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'reports'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <ReportsIcon className="w-5 h-5" />
                <span>Reports</span>
              </button>
            </>
          ) : (
            <>
              {/* Outlet Manager Navigation */}
              <button
                type="button"
                onClick={() => onSelectTab('outlet-overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'outlet-overview'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <OverviewIcon className="w-5 h-5" />
                <span>Outlet Overview</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('outlet-menu')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'outlet-menu'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <MenuPricingIcon className="w-5 h-5" />
                <span>Menu &amp; Availability</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('outlet-team')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'outlet-team'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <UsersIcon className="w-5 h-5" />
                <span>Shift &amp; Till Cash</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('outlet-reports')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  currentTab === 'outlet-reports'
                    ? 'bg-[#b83827]/10 text-[#b83827]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <ReportsIcon className="w-5 h-5" />
                <span>Branch Reports</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-stone-100 space-y-1">
        <button
          type="button"
          onClick={onOpenKitchen}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-stone-600 hover:text-[#b83827] hover:bg-stone-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <KitchenIcon className="w-4 h-4 text-stone-400" />
            <span>Kitchen workspace</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-colors"
        >
          <SettingsIcon className="w-4 h-4 text-stone-400" />
          <span>Settings</span>
        </button>

        <div className="pt-3 px-3 text-[11px] text-stone-400 font-medium">
          Buka &amp; Co. · Phase 1
        </div>
      </div>
    </aside>
  );
}
