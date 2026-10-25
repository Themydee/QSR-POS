import { useState } from 'react';
import type { FormEvent } from 'react';
import type { UserProfile } from '../types.ts';
import { MOCK_USERS } from '../data/mockManagementData.ts';
import { FlameLogo } from './AdminIcons.tsx';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedUser, setSelectedUser] = useState<UserProfile>(MOCK_USERS[0]);
  const [email, setEmail] = useState(MOCK_USERS[0].email);
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSelectQuickProfile = (user: UserProfile) => {
    setSelectedUser(user);
    setEmail(user.email);
    setPassword('••••••••••••');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(selectedUser);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand header */}
        <div className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#b83827] flex items-center justify-center text-white shadow-sm">
            <FlameLogo className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-stone-900">
            buka &amp; co.
          </span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          Operations &amp; Outlet Management
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Sign in to access your administrative workspace or outlet dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-stone-200/80 rounded-2xl">
          {/* Quick Demo Switcher */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Choose Login Persona
              </span>
              <span className="text-xs text-[#b83827] font-semibold bg-[#b83827]/10 px-2 py-0.5 rounded-full">
                Interactive Demo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Owner Profile */}
              <button
                type="button"
                onClick={() => handleSelectQuickProfile(MOCK_USERS[0])}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all col-span-1 sm:col-span-2 ${
                  selectedUser.id === MOCK_USERS[0].id
                    ? 'border-[#b83827] bg-[#b83827]/5 ring-1 ring-[#b83827]'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  AO
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-stone-900">Amaka Okafor</p>
                    <span className="text-[11px] font-semibold px-2 py-0.2 rounded bg-stone-900 text-white">
                      Company Owner
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 truncate">
                    Global Administrator · All five outlets &amp; macro reports
                  </p>
                </div>
              </button>

              {/* 5 Outlet Managers */}
              {MOCK_USERS.slice(1).map((user) => {
                const isSelected = selectedUser.id === user.id;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelectQuickProfile(user)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#b83827] bg-[#b83827]/5 ring-1 ring-[#b83827]'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {user.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">
                        Mgr · {user.outletName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-stone-400 font-medium">
                Sign in with selected credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#b83827] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#b83827] focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-stone-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-300 text-[#b83827] focus:ring-[#b83827]"
                />
                Remember this terminal
              </label>
              <span className="text-[#b83827] font-semibold hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-[#b83827] hover:bg-[#9f2d1e] text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign in as {selectedUser.name}</span>
              <span className="text-white/80 font-normal text-xs">
                ({selectedUser.role === 'admin' ? 'Company Administrator' : selectedUser.outletName})
              </span>
            </button>
          </form>

          {/* Scoped Permission Note */}
          <div className="mt-6 p-3 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-600 flex items-start gap-2.5">
            <span className="text-base leading-none">🛡️</span>
            <div>
              <span className="font-bold text-stone-800">
                {selectedUser.role === 'admin' ? 'Company Administrator Access' : `${selectedUser.outletName} Manager Access`}
              </span>
              <p className="mt-0.5 text-stone-500 leading-relaxed">
                {selectedUser.role === 'admin'
                  ? 'Full oversight of all 5 Lagos branches, catalog master pricing, and financial reporting.'
                  : `Dedicated outlet workspace. Access live kitchen tickets, shift float reconciliation, and menu item 86'ing for ${selectedUser.outletName}.`}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-stone-400">
          Buka &amp; Co. QSR Platform · Phase 1 Operations · Secure RBAC
        </p>
      </div>
    </div>
  );
}
