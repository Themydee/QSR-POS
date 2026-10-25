import { useState } from 'react';
import type { UserProfile } from '../types.ts';
import { MOCK_USERS } from '../data/mockManagementData.ts';
import { BellIcon, ChevronDownIcon, LogOutIcon } from './AdminIcons.tsx';

interface AdminNavbarProps {
  currentUser: UserProfile;
  breadcrumb: string;
  onSwitchUser: (user: UserProfile) => void;
  onLogout: () => void;
}

export function AdminNavbar({
  currentUser,
  breadcrumb,
  onSwitchUser,
  onLogout,
}: AdminNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-stone-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-stone-400 font-medium">Workspace</span>
        <span className="text-stone-300">/</span>
        <span className="font-semibold text-stone-900">{breadcrumb}</span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* System status pill */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-100/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All systems online</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#b83827]" />
        </button>

        {/* User profile with quick switch menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-stone-50 transition-colors text-left cursor-pointer group"
          >
            <div
              className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                currentUser.role === 'admin'
                  ? 'bg-stone-900 text-white'
                  : 'bg-amber-700 text-white'
              }`}
            >
              {currentUser.initials}
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-bold text-stone-900 group-hover:text-[#b83827] transition-colors">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-stone-500 font-medium">
                {currentUser.role === 'admin' ? 'Administrator' : `Mgr · ${currentUser.outletName}`}
              </p>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
          </button>

          {/* Switcher Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/80 py-2 z-50">
              <div className="px-4 py-2 border-b border-stone-100">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Switch Account / Scope
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Current: <strong className="text-stone-900">{currentUser.name}</strong> (
                  {currentUser.role === 'admin' ? 'Company Owner' : currentUser.outletName})
                </p>
              </div>

              <div className="py-1">
                {MOCK_USERS.map((user) => {
                  const isCurrent = user.id === currentUser.id;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        onSwitchUser(user);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors ${
                        isCurrent
                          ? 'bg-[#b83827]/10 text-[#b83827] font-bold'
                          : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 ${
                          user.role === 'admin' ? 'bg-stone-900' : 'bg-amber-700'
                        }`}
                      >
                        {user.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold truncate">{user.name}</p>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold text-[#b83827]">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-stone-400 text-[11px] truncate">
                          {user.role === 'admin' ? 'Administrator (All outlets)' : `Outlet Mgr · ${user.outletName}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-stone-100 pt-1 mt-1 px-2">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
