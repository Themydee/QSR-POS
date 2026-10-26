import { useState } from 'react';
import type { ShiftSummary, TransactionRecord } from '../types';
import { formatPrice } from '../utils/format';
import {
  CashIcon,
  CardIcon,
  BankIcon,
  DownloadIcon,
  AlertTriangleIcon,
  LockIcon,
} from './PosIcons';

interface ShiftCloseoutViewProps {
  shift: ShiftSummary;
  recentTransactions: TransactionRecord[];
  onReturnToSale: () => void;
  onViewAllTransactions: () => void;
  onSubmitForReview: (note: string) => void;
}

export function ShiftCloseoutView({
  shift,
  recentTransactions,
  onReturnToSale,
  onViewAllTransactions,
  onSubmitForReview,
}: ShiftCloseoutViewProps) {
  // Denomination counter states
  const [counts, setCounts] = useState<Record<number, number>>({
    1000: 90,
    500: 24,
    200: 15,
    100: 10,
  });

  const [varianceNote, setVarianceNote] = useState(shift.varianceNote);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute counted cash
  const countedTotal = Object.entries(counts).reduce(
    (sum, [noteStr, count]) => sum + parseInt(noteStr, 10) * (count || 0),
    0
  );

  const variance = countedTotal - shift.expectedCashInDrawer;
  const cashToHandOver = Math.max(0, countedTotal - shift.retainNextFloat);

  const handleCountChange = (note: number, valStr: string) => {
    const val = parseInt(valStr, 10) || 0;
    setCounts((prev) => ({ ...prev, [note]: Math.max(0, val) }));
  };

  const handleRecount = () => {
    setCounts({
      1000: 90,
      500: 24,
      200: 15,
      100: 10,
    });
  };

  const handleDownloadReport = () => {
    const report = `
========================================
BUKA & CO. - CASHIER SHIFT REPORT
========================================
Outlet: ${shift.outletName} (${shift.outletAddress})
Shift Code: ${shift.shiftCode}
Till: ${shift.tillId}
Cashier: ${shift.cashierName}
Opened At: ${shift.openedAt}
Report Generated: ${new Date().toLocaleString('en-GB')}

--- SALES SUMMARY ---
Total Sales: ${formatPrice(shift.totalSales)} (${shift.paidSalesCount} transactions)
Cash Sales: ${formatPrice(shift.cashSales)} (${shift.cashSalesCount} sales)
Card Sales: ${formatPrice(shift.cardSales)} (${shift.cardSalesCount} sales)
Bank Transfer: ${formatPrice(shift.transferSales)} (${shift.transferSalesCount} sales)

--- CASH RECONCILIATION ---
Opening Float: ${formatPrice(shift.openingFloat)}
Cash Received: ${formatPrice(shift.cashSales)}
Expected Cash In Drawer: ${formatPrice(shift.expectedCashInDrawer)}
Actual Counted Cash: ${formatPrice(countedTotal)}
Variance: ${variance === 0 ? 'Balanced' : formatPrice(variance)}
Variance Note: ${varianceNote}

Next Shift Float Retained: ${formatPrice(shift.retainNextFloat)}
Cash Handed Over To Supervisor: ${formatPrice(cashToHandOver)}
Supervisor: ${shift.supervisorName}
========================================
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shift-report-${shift.shiftCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      {/* Top Header & Report Download */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="text-[11px] font-bold tracking-wider uppercase text-[#b83827]">
            {shift.outletName.toUpperCase()} · {shift.tillId.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Balance the till. Close with confidence.
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {shift.cashierName} · Shift {shift.shiftCode} · {shift.openedAt}–14:00 WAT · {shift.paidSalesCount} paid sales
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadReport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs shadow-2xs transition-all cursor-pointer self-start md:self-auto"
        >
          <DownloadIcon className="w-4 h-4 text-stone-600" />
          <span>Download shift report</span>
        </button>
      </div>

      {/* Illustrative Notice Banner */}
      <div className="mt-4 p-3 rounded-2xl bg-stone-100 border border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span className="text-stone-400 font-bold">ⓘ</span>
          <span>
            Illustrative cashier-shift totals, not live outlet totals. This example includes the ₦16,500 cash sale #BK-1053.
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-stone-500 border border-stone-200 shrink-0">
          Example close-out
        </span>
      </div>

      {/* 4 Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Total Sales */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Total shift sales</span>
            <span className="text-stone-400">🧾</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {formatPrice(shift.totalSales)}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {shift.paidSalesCount} paid sales · VAT included
            </div>
          </div>
        </div>

        {/* Cash Sales */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Cash sales</span>
            <CashIcon className="w-4 h-4 text-[#b83827]" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {formatPrice(shift.cashSales)}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {shift.cashSalesCount} sales · Net of customer change
            </div>
          </div>
        </div>

        {/* Card Sales */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Card / POS terminal</span>
            <CardIcon className="w-4 h-4 text-stone-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {formatPrice(shift.cardSales)}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {shift.cardSalesCount} sales · Successful payments
            </div>
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Bank transfer</span>
            <BankIcon className="w-4 h-4 text-stone-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {formatPrice(shift.transferSales)}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {shift.transferSalesCount} sales · Verified payments
            </div>
          </div>
        </div>
      </div>

      {/* 3 Detailed Balancing Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Expected in Drawer (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900 mb-4">
              Expected in drawer
            </h3>

            <div className="divide-y divide-stone-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-600">Opening float</span>
                <span className="font-bold text-stone-900">{formatPrice(shift.openingFloat)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-600">+ Cash sales</span>
                <span className="font-bold text-stone-900">{formatPrice(shift.cashSales)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-600">− Cash refunds</span>
                <span className="font-bold text-stone-900">₦0</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-stone-600">− Cash payouts / drops</span>
                <span className="font-bold text-stone-900">₦0</span>
              </div>
              <div className="py-3 flex justify-between text-sm font-black text-stone-900 pt-3">
                <span>Expected cash</span>
                <span className="text-base">{formatPrice(shift.expectedCashInDrawer)}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 mt-4 leading-relaxed">
            Opening float + cash sales − refunds − payouts. Card and transfer sales stay outside the drawer.
          </p>
        </div>

        {/* Counted Cash Denomination Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-stone-900">
                Counted cash
              </h3>
              <button
                type="button"
                onClick={handleRecount}
                className="text-xs font-bold text-[#b83827] hover:underline cursor-pointer"
              >
                Recount
              </button>
            </div>

            <div className="grid grid-cols-12 text-[11px] font-bold text-stone-400 uppercase tracking-wider pb-1.5 border-b border-stone-100">
              <span className="col-span-4">NOTE</span>
              <span className="col-span-4 text-center">COUNT</span>
              <span className="col-span-4 text-right">TOTAL</span>
            </div>

            <div className="divide-y divide-stone-100 text-xs mt-1">
              {[1000, 500, 200, 100].map((note) => {
                const count = counts[note] ?? 0;
                const total = note * count;
                return (
                  <div key={note} className="py-2 grid grid-cols-12 items-center">
                    <span className="col-span-4 font-bold text-stone-800">
                      ₦{note.toLocaleString()}
                    </span>
                    <div className="col-span-4 flex justify-center">
                      <input
                        type="number"
                        min="0"
                        value={count}
                        onChange={(e) => handleCountChange(note, e.target.value)}
                        className="w-16 text-center py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#b83827]"
                      />
                    </div>
                    <span className="col-span-4 text-right font-bold text-stone-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-sm font-black text-stone-900">
              <span>Counted total</span>
              <span className="text-base">{formatPrice(countedTotal)}</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 mt-4">
            ₦50, ₦20, ₦10, ₦5 and coins: 0
          </div>
        </div>

        {/* Close-Out Review (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900">
                Close-out review
              </h3>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-500 text-[11px] font-bold">
                Draft
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Expected cash</span>
                <span className="font-bold text-stone-900">{formatPrice(shift.expectedCashInDrawer)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Counted cash</span>
                <span className="font-bold text-stone-900">{formatPrice(countedTotal)}</span>
              </div>
            </div>

            {/* Amber Shortage Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-700" />
                  <span>Cash variance · Short</span>
                </span>
              </div>
              <div className="text-2xl font-black text-amber-900 tracking-tight">
                {variance < 0 ? `−₦${Math.abs(variance).toLocaleString()}` : formatPrice(variance)}
              </div>
              <div className="text-[11px] text-amber-800">
                {formatPrice(countedTotal)} counted − {formatPrice(shift.expectedCashInDrawer)} expected
              </div>
            </div>

            {/* Variance Note Input */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wide block mb-1">
                Variance note · Required
              </label>
              <textarea
                rows={2}
                value={varianceNote}
                onChange={(e) => setVarianceNote(e.target.value)}
                className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#b83827]"
              />
            </div>

            {/* Float Handover Breakdown */}
            <div className="pt-2 border-t border-stone-100 flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Retain next-shift float</span>
                <span className="font-bold text-stone-900">{formatPrice(shift.retainNextFloat)}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-stone-900 pt-1">
                <span>Cash to hand over</span>
                <span className="text-base">{formatPrice(cashToHandOver)}</span>
              </div>
              <span className="text-[11px] text-stone-400">
                {formatPrice(countedTotal)} counted − {formatPrice(shift.retainNextFloat)} retained float
              </span>
            </div>

            {/* Supervisor Handover Notice */}
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
              <span className="text-stone-500 mt-0.5">🛡️</span>
              <span>
                <strong>{shift.supervisorName}</strong> must review the shortage. The shift remains open until close-out is approved.
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              disabled={isSubmitted}
              onClick={() => {
                setIsSubmitted(true);
                onSubmitForReview(varianceNote);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#b83827] hover:bg-[#a12f20] disabled:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <LockIcon className="w-3.5 h-3.5 text-white" />
              <span>
                {isSubmitted ? 'Submitted for supervisor review ✓' : 'Submit close-out for review'}
              </span>
            </button>

            <button
              type="button"
              onClick={onReturnToSale}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Save draft &amp; return to sale
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="mt-8 bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Recent transactions
            </h3>
            <span className="text-xs text-stone-500">
              Latest 5 of {shift.paidSalesCount} paid sales in this example shift
            </span>
          </div>

          <button
            type="button"
            onClick={onViewAllTransactions}
            className="text-xs font-bold text-[#b83827] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all transactions</span>
            <span>→</span>
          </button>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-3 px-2">TRANSACTION</th>
                <th className="py-3 px-2">TIME</th>
                <th className="py-3 px-2">METHOD</th>
                <th className="py-3 px-2">STATUS</th>
                <th className="py-3 px-2 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {recentTransactions.map((tx) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
