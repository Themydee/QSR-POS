import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { OutletMenuModal } from '../components/OutletMenuModal';
import { Toast } from '../components/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Buka & Co. — Freshly Made. Close To Home.',
  description:
    'Smoky jollof, proper suya, and a little extra plantain. Order online for delivery or pickup across our 5 Lagos outlets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-stone-900 font-sans selection:bg-[#b83827]/10 selection:text-[#b83827]">
        <CartProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
          <OutletMenuModal />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
