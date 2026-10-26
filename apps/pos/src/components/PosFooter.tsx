import { useState, useEffect } from 'react';

export function PosFooter() {
  const [timeStr, setTimeStr] = useState('Saturday, 24 Oct 2026 · 13:44 WAT');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      setTimeStr(`${now.toLocaleDateString('en-GB', options)} · WAT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#f7f5f0] border-t border-stone-200/90 py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-stone-500 select-none">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-medium text-stone-700">Connected</span>
        <span className="text-stone-300">·</span>
        <span>Last synced just now</span>
      </div>

      <div className="hidden md:flex items-center gap-2 text-stone-600">
        <span>Receipt printer ready</span>
        <span className="text-stone-300">·</span>
        <span>Cash drawer connected</span>
      </div>

      <div className="font-mono text-stone-600">
        {timeStr}
      </div>
    </footer>
  );
}
