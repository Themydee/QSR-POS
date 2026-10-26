export type PosTab = 'sale' | 'transactions' | 'shift';

export type PosStep = 1 | 2 | 3; // 1: Build order, 2: Collect payment, 3: Receipt

export type PosCategory = 'popular' | 'rice-bowls' | 'grills' | 'sides' | 'drinks' | 'combos';

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

export interface PosProduct {
  id: string;
  name: string;
  category: PosCategory;
  price: number;
  description: string;
  image: string;
  tag?: string;
  tagType?: 'bestseller' | 'heat' | 'fresh';
  availablePepperLevels?: ('Mild' | 'Medium' | 'Hot')[];
  availableExtras?: ExtraItem[];
}

export interface OrderItemCustomization {
  pepperLevel?: 'Mild' | 'Medium' | 'Hot';
  extras?: ExtraItem[];
}

export interface PosCartItem {
  id: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  customization?: OrderItemCustomization;
  extrasTotal: number;
  totalPrice: number;
}

export type DiningOption = 'dine-in' | 'takeaway';
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'split';

export interface PosOrder {
  orderId: string; // e.g. '#BK-1053'
  numericId: string;
  transactionId: string; // e.g. 'TX-LK-032'
  diningOption: DiningOption;
  items: PosCartItem[];
  kitchenNote: string;
  subtotal: number;
  discount: number;
  totalDue: number;
  paymentMethod: PaymentMethod;
  tenderedAmount: number;
  changeGiven: number;
  placedTime: string;
  cashierName: string;
  tillId: string;
  outletName: string;
  outletAddress: string;
}

export interface ShiftDenomination {
  note: number;
  count: number;
  total: number;
}

export interface ShiftSummary {
  shiftCode: string;
  openedAt: string;
  cashierName: string;
  tillId: string;
  outletName: string;
  outletAddress: string;
  totalSales: number;
  paidSalesCount: number;
  cashSales: number;
  cashSalesCount: number;
  cardSales: number;
  cardSalesCount: number;
  transferSales: number;
  transferSalesCount: number;
  openingFloat: number;
  cashRefunds: number;
  cashPayouts: number;
  expectedCashInDrawer: number;
  denominations: ShiftDenomination[];
  countedCash: number;
  variance: number;
  varianceNote: string;
  retainNextFloat: number;
  cashToHandOver: number;
  supervisorName: string;
  status: 'open' | 'review_required' | 'closed';
}

export interface TransactionRecord {
  id: string; // 'TX-LK-032'
  orderId: string; // '#BK-1053'
  label: string; // 'Counter sale'
  time: string; // '13:44'
  method: 'Cash' | 'Card' | 'Transfer';
  status: 'Paid';
  amount: number;
}
