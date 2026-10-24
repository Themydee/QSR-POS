'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Outlet, INITIAL_OUTLETS } from '../data/outlets';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  outletId: string;
  outletName: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (item: MenuItem, outlet: Outlet) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  activeOutletModal: Outlet | null;
  setActiveOutletModal: (outlet: Outlet | null) => void;
  notification: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOutletModal, setActiveOutletModal] = useState<Outlet | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addItem = (item: MenuItem, outlet: Outlet) => {
    setCart((prev) => {
      // If adding from another outlet, optionally keep or replace, but here we support items
      const existing = prev.find((ci) => ci.item.id === item.id && ci.outletId === outlet.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id && ci.outletId === outlet.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { item, quantity: 1, outletId: outlet.id, outletName: outlet.name }];
    });
    showNotification(`Added ${item.name} to cart`);
  };

  const removeItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

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
        notification,
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
