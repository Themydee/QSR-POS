export type OrderStatus = 'incoming' | 'preparing' | 'ready' | 'collected';
export type FulfillmentType = 'delivery' | 'pickup';

export interface OrderItem {
  name: string;
  quantity: number;
  customization?: string;
  addons?: string[];
  price: number;
}

export interface ActivityEvent {
  time: string;
  description: string;
}

export interface KitchenOrder {
  id: string; // e.g. '#BK-1048'
  numericId: string; // e.g. 'BK-1048'
  customerName: string;
  customerPhone: string;
  deliveryAddress?: {
    street: string;
    area: string;
    instructions?: string;
  };
  totalAmount: number;
  foodSubtotal: number;
  deliveryFee: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'unpaid';
  status: OrderStatus;
  fulfillment: FulfillmentType;
  placedTime: string;
  targetHandoffTime: string;
  timeLabel: string;
  isOverdue?: boolean;
  overdueMinutes?: number;
  items: OrderItem[];
  customerNote?: string;
  assignedChef?: string;
  riderName?: string;
  riderAssigned?: boolean;
  checklist?: { id: string; label: string; checked: boolean }[];
  activity: ActivityEvent[];
}
