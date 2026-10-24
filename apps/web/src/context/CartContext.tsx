'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Outlet, INITIAL_OUTLETS, CROWD_FAVOURITES } from '../data/outlets';

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  outletId: string;
  outletName: string;
  customization?: string;
  unitPrice: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (item: MenuItem, outlet: Outlet, customization?: string, extraCost?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  activeOutletModal: Outlet | null;
  setActiveOutletModal: (outlet: Outlet | null) => void;
  selectedOutlet: Outlet;
  setSelectedOutlet: (outlet: Outlet) => void;
  isOutletInfoOpen: boolean;
  setIsOutletInfoOpen: (open: boolean) => void;
  isChangeOutletOpen: boolean;
  setIsChangeOutletOpen: (open: boolean) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const defaultOutlet = INITIAL_OUTLETS[0]; // Lekki Phase 1

// Pre-seeded with the 3 items from the client reference design
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-init-jollof',
    item: CROWD_FAVOURITES[0], // Smoky Jollof & Chicken
    quantity: 2,
    outletId: defaultOutlet.id,
    outletName: defaultOutlet.name,
    customization: 'Medium pepper · Extra plantain',
    unitPrice: 7500, // 6500 base + 1000 extra plantain
    totalPrice: 15000,
  },
  {
    id: 'cart-init-zobo',
    item: CROWD_FAVOURITES[4], // House Zobo
    quantity: 1,
    outletId: defaultOutlet.id,
    outletName: defaultOutlet.name,
    customization: '50cl · Chilled',
    unitPrice: 1500,
    totalPrice: 1500,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(defaultOutlet);
  const [activeOutletModal, setActiveOutletModal] = useState<Outlet | null>(null);
  const [isOutletInfoOpen, setIsOutletInfoOpen] = useState(false);
  const [isChangeOutletOpen, setIsChangeOutletOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addItem = (
    item: MenuItem,
    outlet: Outlet,
    customization?: string,
    extraCost: number = 0
  ) => {
    const unitPrice = item.price + extraCost;
    setCart((prev) => {
      const existing = prev.find(
        (ci) =>
          ci.item.id === item.id &&
          ci.outletId === outlet.id &&
          ci.customization === customization
      );
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id
            ? {
                ...ci,
                quantity: ci.quantity + 1,
                totalPrice: (ci.quantity + 1) * ci.unitPrice,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${item.id}`,
          item,
          quantity: 1,
          outletId: outlet.id,
          outletName: outlet.name,
          customization,
          unitPrice,
          totalPrice: unitPrice,
        },
      ];
    });
    showNotification(`Added ${item.name} to bag`);
  };

  const removeItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0
              ? { ...ci, quantity: nextQty, totalPrice: nextQty * ci.unitPrice }
              : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        activeOutletModal,
        setActiveOutletModal,
        selectedOutlet,
        setSelectedOutlet,
        isOutletInfoOpen,
        setIsOutletInfoOpen,
        isChangeOutletOpen,
        setIsChangeOutletOpen,
        notification,
        showNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
