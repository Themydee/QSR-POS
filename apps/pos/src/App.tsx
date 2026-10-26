import { useState } from 'react';
import type {
  PosTab,
  PosStep,
  PosCartItem,
  DiningOption,
  PaymentMethod,
  PosOrder,
  ShiftSummary,
  TransactionRecord,
} from './types';
import {
  POS_PRODUCTS,
  INITIAL_CART_ITEMS,
  INITIAL_SHIFT_SUMMARY,
  INITIAL_RECENT_TRANSACTIONS,
} from './data/mockPosData';
import { PosNavbar } from './components/PosNavbar';
import { PosFooter } from './components/PosFooter';
import { BuildOrderView } from './components/BuildOrderView';
import { CollectPaymentView } from './components/CollectPaymentView';
import { ReceiptView } from './components/ReceiptView';
import { ShiftCloseoutView } from './components/ShiftCloseoutView';
import { TransactionsModal } from './components/TransactionsModal';

export function App() {
  const [activeTab, setActiveTab] = useState<PosTab>('sale');
  const [currentStep, setCurrentStep] = useState<PosStep>(1);

  // Cart & Order state
  const [cart, setCart] = useState<PosCartItem[]>(INITIAL_CART_ITEMS);
  const [orderNumber, setOrderNumber] = useState(1053);
  const [diningOption, setDiningOption] = useState<DiningOption>('takeaway');
  const [kitchenNote, setKitchenNote] = useState('Pack the plantain separately.');

  // Completed order data for Receipt View
  const [completedOrder, setCompletedOrder] = useState<PosOrder>({
    orderId: '#BK-1053',
    numericId: 'BK-1053',
    transactionId: 'TX-LK-032',
    diningOption: 'takeaway',
    items: INITIAL_CART_ITEMS,
    kitchenNote: 'Pack the plantain separately.',
    subtotal: 16500,
    discount: 0,
    totalDue: 16500,
    paymentMethod: 'cash',
    tenderedAmount: 20000,
    changeGiven: 3500,
    placedTime: '13:44 WAT',
    cashierName: 'Aisha Bello',
    tillId: 'Till 01',
    outletName: 'Lekki Phase 1',
    outletAddress: '12 Admiralty Way, Lekki, Lagos',
  });

  // Shift & Transactions state
  const [shift, setShift] = useState<ShiftSummary>(INITIAL_SHIFT_SUMMARY);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(
    INITIAL_RECENT_TRANSACTIONS
  );
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);

  // Switch to clean New Sale
  const handleNewSale = () => {
    setActiveTab('sale');
    setCurrentStep(1);
    const nextNum = orderNumber + 1;
    setOrderNumber(nextNum);
    setCart([]);
    setKitchenNote('');
  };

  // Hold / Park Order
  const handleHoldOrder = () => {
    if (cart.length === 0) return;
    alert(`Order #${orderNumber} held. You can start another sale or retrieve it later.`);
    handleNewSale();
  };

  // Clear Order
  const handleClearOrder = () => {
    if (cart.length === 0) return;
    if (window.confirm('Clear all items from this order ticket?')) {
      setCart([]);
      setKitchenNote('');
    }
  };

  // Confirm payment in step 2
  const handleConfirmPayment = (details: {
    method: PaymentMethod;
    tendered: number;
    change: number;
  }) => {
    const totalDue = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const newTxId = `TX-LK-0${32 + (orderNumber - 1053)}`;

    const orderData: PosOrder = {
      orderId: `#BK-${orderNumber}`,
      numericId: `BK-${orderNumber}`,
      transactionId: newTxId,
      diningOption,
      items: [...cart],
      kitchenNote,
      subtotal: totalDue,
      discount: 0,
      totalDue,
      paymentMethod: details.method,
      tenderedAmount: details.tendered,
      changeGiven: details.change,
      placedTime: '13:44 WAT',
      cashierName: 'Aisha Bello',
      tillId: 'Till 01',
      outletName: 'Lekki Phase 1',
      outletAddress: '12 Admiralty Way, Lekki, Lagos',
    };

    setCompletedOrder(orderData);

    // Record new transaction
    const newTx: TransactionRecord = {
      id: newTxId,
      orderId: `#BK-${orderNumber}`,
      label: `#BK-${orderNumber}`,
      time: '13:44',
      method:
        details.method === 'cash'
          ? 'Cash'
          : details.method === 'card'
          ? 'Card'
          : 'Transfer',
      status: 'Paid',
      amount: totalDue,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Update Shift Totals
    setShift((prev) => {
      const isCash = details.method === 'cash';
      const isCard = details.method === 'card';
      const isTransfer = details.method === 'transfer';

      return {
        ...prev,
        totalSales: prev.totalSales + totalDue,
        paidSalesCount: prev.paidSalesCount + 1,
        cashSales: isCash ? prev.cashSales + totalDue : prev.cashSales,
        cashSalesCount: isCash ? prev.cashSalesCount + 1 : prev.cashSalesCount,
        cardSales: isCard ? prev.cardSales + totalDue : prev.cardSales,
        cardSalesCount: isCard ? prev.cardSalesCount + 1 : prev.cardSalesCount,
        transferSales: isTransfer ? prev.transferSales + totalDue : prev.transferSales,
        transferSalesCount: isTransfer ? prev.transferSalesCount + 1 : prev.transferSalesCount,
        expectedCashInDrawer: isCash
          ? prev.expectedCashInDrawer + totalDue
          : prev.expectedCashInDrawer,
      };
    });

    // Advance to Step 3 (Receipt)
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col font-sans">
      {/* Top Navbar */}
      <PosNavbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'transactions') {
            setIsTransactionsModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onNewSale={handleNewSale}
        outletName="Lekki Phase 1"
        outletAddress="12 Admirality Way"
        tillId="Till 01"
        shiftCode={shift.shiftCode}
        cashierName="Aisha Bello"
      />

      {/* Main Screen Views */}
      <main className="flex-1">
        {activeTab === 'sale' && (
          <>
            {currentStep === 1 && (
              <BuildOrderView
                products={POS_PRODUCTS}
                cart={cart}
                orderId={`#BK-${orderNumber}`}
                diningOption={diningOption}
                kitchenNote={kitchenNote}
                onUpdateCart={setCart}
                onUpdateDiningOption={setDiningOption}
                onUpdateKitchenNote={setKitchenNote}
                onProceedToPayment={() => setCurrentStep(2)}
                onHoldOrder={handleHoldOrder}
                onClearOrder={handleClearOrder}
              />
            )}

            {currentStep === 2 && (
              <CollectPaymentView
                orderId={`#BK-${orderNumber}`}
                cart={cart}
                diningOption={diningOption}
                kitchenNote={kitchenNote}
                onBackToOrder={() => setCurrentStep(1)}
                onConfirmPayment={handleConfirmPayment}
              />
            )}

            {currentStep === 3 && (
              <ReceiptView
                order={completedOrder}
                onStartNewSale={handleNewSale}
                onViewTransactions={() => setIsTransactionsModalOpen(true)}
              />
            )}
          </>
        )}

        {activeTab === 'shift' && (
          <ShiftCloseoutView
            shift={shift}
            recentTransactions={transactions.slice(0, 5)}
            onReturnToSale={() => setActiveTab('sale')}
            onViewAllTransactions={() => setIsTransactionsModalOpen(true)}
            onSubmitForReview={(note) => {
              setShift((prev) => ({
                ...prev,
                varianceNote: note,
                status: 'review_required',
              }));
            }}
          />
        )}
      </main>

      {/* Transactions Modal */}
      <TransactionsModal
        isOpen={isTransactionsModalOpen}
        onClose={() => setIsTransactionsModalOpen(false)}
        transactions={transactions}
      />

      {/* Persistent Bottom Status Bar */}
      <PosFooter />
    </div>
  );
}

export default App;
