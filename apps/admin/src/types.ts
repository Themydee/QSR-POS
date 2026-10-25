export type UserRole = 'admin' | 'manager';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
  outletId?: string;
  outletName?: string;
}

export interface OutletData {
  id: string;
  name: string;
  code: string;
  address: string;
  managerName: string;
  managerEmail: string;
  status: 'Open' | 'Closed' | 'Paused';
  salesToday: number;
  ordersToday: number;
  activeOrders: number;
  avgPrepMinutes: number;
  onTimeRate: number;
  phone: string;
  teamCount: number;
  acceptingOrders: boolean;
  deliveryEnabled: boolean;
  deliveryRadius: string;
  deliveryFee: number;
  pickupEnabled: boolean;
  pickupPrepTime: string;
  operatingHours: string;
  photoUrl: string;
  activeIncoming: number;
  activePreparing: number;
  activeReady: number;
  deliveryOrders: number;
  pickupOrders: number;
}

export interface AttentionItem {
  id: string;
  title: string;
  outlet: string;
  outletId: string;
  description: string;
  type: 'low_stock' | 'sold_out' | 'unavailable' | 'alert';
  severity: 'amber' | 'neutral' | 'red';
}

export interface MenuItemRow {
  id: string;
  name: string;
  category: string;
  image: string;
  basePrice: number;
  outletPricing: Record<string, { price: number; status: 'Available' | 'Low stock' | 'Unavailable' }>;
  customisations: string;
}

export interface HourlySale {
  hour: string;
  today: number;
  yesterday: number;
}

export interface RecentActivity {
  id: string;
  time: string;
  text: string;
  outletId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'On shift' | 'Break' | 'Clocked out';
  shift: string;
  phone: string;
}

export interface ShiftCashSummary {
  openingFloat: number;
  cashCollected: number;
  posCollected: number;
  expectedTotal: number;
  actualCashInTill: number;
  cashierName: string;
  shiftPeriod: string;
}
