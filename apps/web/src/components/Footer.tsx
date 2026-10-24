import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-stone-200/80 bg-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-normal">
        <div>
          <span>© 2026 Buka &amp; Co.</span>
          <span className="mx-2">·</span>
          <span>Good food. Good company.</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Need a hand?</span>
          <a
            href="tel:08002852266"
            className="font-medium text-stone-700 hover:text-stone-900 transition-colors"
          >
            0800 2852 266
          </a>
          <span className="text-stone-300">·</span>
          <a href="#help" className="hover:text-stone-900 transition-colors">
            Help
          </a>
          <span className="text-stone-300">·</span>
          <a href="#privacy" className="hover:text-stone-900 transition-colors">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
