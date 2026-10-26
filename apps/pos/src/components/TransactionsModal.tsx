import { useState } from 'react';
import type { TransactionRecord } from '../types';
import { formatPrice } from '../utils/format';
import { SearchIcon } from './PosIcons';

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: TransactionRecord[];
}

export function TransactionsModal({
  isOpen,
  onClose,
  transactions,
}: TransactionsModalProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState<'All' | 'Cash' | 'Card' | 'Transfer'>('All');

  if (!isOpen) return null;

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tx.orderId.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tx.label.toLowerCase().includes(filterQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (methodFilter === 'All') return true;
    return tx.method === methodFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Shift Transactions
            </h3>
            <p className="text-xs text-stone-500">
              Showing completed till payments for Shift LK-241026-A
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 bg-stone-50 border-b border-stone-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by transaction ID or order number..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#b83827]"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold">
            {(['All', 'Cash', 'Card', 'Transfer'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethodFilter(m)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  methodFilter === m
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table List */}
        <div className="overflow-y-auto p-4 flex-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-2.5 px-2">TX ID</th>
                <th className="py-2.5 px-2">TIME</th>
                <th className="py-2.5 px-2">METHOD</th>
                <th className="py-2.5 px-2">STATUS</th>
                <th className="py-2.5 px-2 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400 text-xs">
                    No matching transactions found.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-2">
                      <span className="font-bold text-stone-900">{tx.id}</span>
                      <span className="text-stone-400 ml-1.5">{tx.label}</span>
                    </td>
                    <td className="py-3 px-2 text-stone-500">{tx.time}</td>
                    <td className="py-3 px-2 text-stone-700 font-semibold">{tx.method}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200/80">
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-stone-900">
                      {formatPrice(tx.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/60 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium">
            {filtered.length} transactions · Total: {formatPrice(filtered.reduce((s, t) => s + t.amount, 0))}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
