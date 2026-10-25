import { useState, useEffect } from 'react';

export function KitchenFooter() {
  const [timeStr, setTimeStr] = useState('Saturday, 24 Oct 2026 · 13:42 WAT');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as "Saturday, 24 Oct 2026 · 13:42 WAT"
      const datePart = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(now);

      const timePart = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);

      setTimeStr(`${datePart} · ${timePart} WAT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-stone-200/80 py-2.5 px-4 sm:px-8 text-xs text-stone-500 flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Connected · Last synced just now</span>
      </div>

      <div className="font-medium text-stone-600">
        {timeStr}
      </div>
    </footer>
  );
}
