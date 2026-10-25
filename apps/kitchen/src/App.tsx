import { useState } from 'react';
import type { KitchenOrder } from './types';
import { INITIAL_KITCHEN_ORDERS } from './data/mockOrders';
import { KitchenNavbar } from './components/KitchenNavbar';
import type { KitchenTab } from './components/KitchenNavbar';
import { OrderBoardView } from './components/OrderBoardView';
import { ActiveOrderDetailView } from './components/ActiveOrderDetailView';
import { AvailabilityView } from './components/AvailabilityView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { KitchenFooter } from './components/KitchenFooter';

function playKitchenChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Two-tone bell chime
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  } catch {
    // AudioContext blocked or not allowed until user interaction
  }
}

export function App() {
  const [activeTab, setActiveTab] = useState<KitchenTab>('board');
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_KITCHEN_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<KitchenOrder | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playKitchenChime();
    }
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleUpdateStatus = (
    orderId: string,
    nextStatus: 'preparing' | 'ready' | 'collected'
  ) => {
    if (soundEnabled) {
      playKitchenChime();
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        let desc = '';
        if (nextStatus === 'preparing') desc = 'Order accepted by kitchen';
        else if (nextStatus === 'ready') desc = 'Marked ready by Chef Emeka';
        else if (nextStatus === 'collected') desc = 'Handed over / Collected';

        return {
          ...order,
          status: nextStatus,
          activity: [{ time: timeStr, description: desc }, ...order.activity],
        };
      })
    );

    // If currently viewing this order, update selected order state too
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((curr) => (curr ? { ...curr, status: nextStatus } : null));
    }
  };

  const collectedOrders = orders.filter((o) => o.status === 'collected');

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col font-sans">
      {/* Top Kitchen Navbar */}
      <KitchenNavbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedOrder(null);
        }}
        isPaused={isPaused}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {selectedOrder ? (
          <ActiveOrderDetailView
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
            onMarkReady={(id) => handleUpdateStatus(id, 'ready')}
          />
        ) : activeTab === 'board' ? (
          <OrderBoardView
            orders={orders}
            onSelectOrder={(order) => setSelectedOrder(order)}
            onUpdateStatus={handleUpdateStatus}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            isPaused={isPaused}
            onTogglePause={handleTogglePause}
          />
        ) : activeTab === 'availability' ? (
          <AvailabilityView />
        ) : (
          <OrderHistoryView
            collectedOrders={collectedOrders}
            onViewOrder={(order) => setSelectedOrder(order)}
          />
        )}
      </main>

      {/* Persistent Bottom Status Bar */}
      <KitchenFooter />
    </div>
  );
}

export default App;
