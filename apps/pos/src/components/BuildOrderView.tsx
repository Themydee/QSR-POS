import { useState, useEffect, useRef } from 'react';
import type { PosProduct, PosCartItem, DiningOption, PosCategory } from '../types';
import { formatPrice } from '../utils/format';
import {
  SearchIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  CheckIcon,
  PauseIcon,
} from './PosIcons';
import { PosStepper } from './PosStepper';

interface BuildOrderViewProps {
  products: PosProduct[];
  cart: PosCartItem[];
  orderId: string;
  diningOption: DiningOption;
  kitchenNote: string;
  onUpdateCart: (cart: PosCartItem[]) => void;
  onUpdateDiningOption: (opt: DiningOption) => void;
  onUpdateKitchenNote: (note: string) => void;
  onProceedToPayment: () => void;
  onHoldOrder: () => void;
  onClearOrder: () => void;
}

export function BuildOrderView({
  products,
  cart,
  orderId,
  diningOption,
  kitchenNote,
  onUpdateCart,
  onUpdateDiningOption,
  onUpdateKitchenNote,
  onProceedToPayment,
  onHoldOrder,
  onClearOrder,
}: BuildOrderViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PosCategory | 'popular'>('popular');
  const [selectedCustomizingProduct, setSelectedCustomizingProduct] = useState<PosProduct | null>(
    products.find((p) => p.id === 'smoky-jollof') || null
  );
  const [customizingPepper, setCustomizingPepper] = useState<'Mild' | 'Medium' | 'Hot'>('Medium');
  const [customizingExtraPlantain, setCustomizingExtraPlantain] = useState(true);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘K or Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter products by category and search
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'popular') return true;
    return item.category === selectedCategory;
  });

  // Calculate items count and total
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalDue = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Helper to count how many of a given product is currently in the cart
  const getProductCountInCart = (productId: string) => {
    return cart
      .filter((i) => i.productId === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Add product to cart
  const handleAddProduct = (product: PosProduct) => {
    const existingIndex = cart.findIndex((i) => i.productId === product.id);

    if (existingIndex > -1) {
      const updated = [...cart];
      const item = updated[existingIndex];
      const newQty = item.quantity + 1;
      const unitWithExtras = item.unitPrice + (item.extrasTotal || 0);
      updated[existingIndex] = {
        ...item,
        quantity: newQty,
        totalPrice: unitWithExtras * newQty,
      };
      onUpdateCart(updated);
    } else {
      const extrasTotal = product.availableExtras && customizingExtraPlantain ? 1000 : 0;
      const newItem: PosCartItem = {
        id: `cart-${Date.now()}-${product.id}`,
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: 1,
        extrasTotal,
        totalPrice: product.price + extrasTotal,
        customization: {
          pepperLevel: product.availablePepperLevels ? customizingPepper : undefined,
          extras:
            product.availableExtras && customizingExtraPlantain
              ? [{ id: 'extra-plantain', name: 'Extra plantain', price: 1000 }]
              : [],
        },
      };
      onUpdateCart([...cart, newItem]);
    }

    if (product.availablePepperLevels || product.availableExtras) {
      setSelectedCustomizingProduct(product);
    }
  };

  // Increment item quantity
  const handleIncrement = (cartItemId: string) => {
    const updated = cart.map((item) => {
      if (item.id === cartItemId) {
        const newQty = item.quantity + 1;
        const unitWithExtras = item.unitPrice + (item.extrasTotal || 0);
        return {
          ...item,
          quantity: newQty,
          totalPrice: unitWithExtras * newQty,
        };
      }
      return item;
    });
    onUpdateCart(updated);
  };

  // Decrement item quantity
  const handleDecrement = (cartItemId: string) => {
    const target = cart.find((i) => i.id === cartItemId);
    if (!target) return;

    if (target.quantity <= 1) {
      handleRemoveItem(cartItemId);
    } else {
      const updated = cart.map((item) => {
        if (item.id === cartItemId) {
          const newQty = item.quantity - 1;
          const unitWithExtras = item.unitPrice + (item.extrasTotal || 0);
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitWithExtras * newQty,
          };
        }
        return item;
      });
      onUpdateCart(updated);
    }
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    onUpdateCart(cart.filter((item) => item.id !== cartItemId));
  };

  // Apply customizations to an active cart item
  const handleApplyCustomization = () => {
    if (!selectedCustomizingProduct) return;
    const targetIndex = cart.findIndex(
      (item) => item.productId === selectedCustomizingProduct.id
    );
    if (targetIndex === -1) return;

    const extras = customizingExtraPlantain
      ? [{ id: 'extra-plantain', name: 'Extra plantain', price: 1000 }]
      : [];
    const extrasTotal = customizingExtraPlantain ? 1000 : 0;

    const updated = [...cart];
    const current = updated[targetIndex];
    const unitWithExtras = current.unitPrice + extrasTotal;

    updated[targetIndex] = {
      ...current,
      customization: {
        pepperLevel: customizingPepper,
        extras,
      },
      extrasTotal,
      totalPrice: unitWithExtras * current.quantity,
    };

    onUpdateCart(updated);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Top Header & Stepper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="text-[11px] font-bold tracking-wider uppercase text-[#b83827]">
            COUNTER SERVICE · {orderId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Good food, one order at a time.
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Build a walk-in order. Payment sends the ticket straight to the kitchen.
          </p>
        </div>

        <div className="shrink-0">
          <PosStepper currentStep={1} />
        </div>
      </div>

      {/* Main Grid: Left 2/3 menu catalog, Right 1/3 Order Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Search, Categories, Dishes, and Customization */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Search Bar with ⌘K badge */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, sides, or drinks"
              className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-14 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#b83827]/20 focus:border-[#b83827] shadow-2xs transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
              <span className="text-[11px] font-mono font-semibold text-stone-400 bg-stone-100 border border-stone-200/80 px-2 py-0.5 rounded-md">
                ⌘ K
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
            {(
              [
                { id: 'popular', label: 'Popular' },
                { id: 'rice-bowls', label: 'Rice bowls' },
                { id: 'grills', label: 'Grills & suya' },
                { id: 'sides', label: 'Sides' },
                { id: 'drinks', label: 'Drinks' },
                { id: 'combos', label: 'Combos' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#b83827] text-white shadow-xs font-bold'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/90'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Catalog Section Header */}
          <div className="flex items-center justify-between text-xs pt-1">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              The crowd favourites
            </h2>
            <span className="text-stone-500 font-medium">
              {filteredProducts.length} items · Lekki prices · VAT included
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((prod) => {
              const inOrderCount = getProductCountInCart(prod.id);

              return (
                <div
                  key={prod.id}
                  onClick={() => handleAddProduct(prod)}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/menu-jollof.jpg';
                      }}
                    />
                    {inOrderCount > 0 && (
                      <div className="absolute top-2.5 right-2.5 bg-stone-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {inOrderCount} in order
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#b83827] transition-colors leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="text-sm font-bold text-stone-900">
                        {formatPrice(prod.price)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddProduct(prod);
                        }}
                        className="w-8 h-8 rounded-full bg-[#ffebe6] text-[#b83827] hover:bg-[#b83827] hover:text-white flex items-center justify-center transition-all shadow-2xs"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customisation Drawer / Tray */}
          {selectedCustomizingProduct && (
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Customise · {selectedCustomizingProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Applies to meals in ticket · {formatPrice(selectedCustomizingProduct.price + (customizingExtraPlantain ? 1000 : 0))} each with extras
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Applied to order</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Pepper Level */}
                <div>
                  <div className="font-bold tracking-wider uppercase text-stone-500 mb-2">
                    PEPPER LEVEL
                  </div>
                  <div className="flex items-center gap-2">
                    {(['Mild', 'Medium', 'Hot'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setCustomizingPepper(level);
                          handleApplyCustomization();
                        }}
                        className={`px-4 py-2 rounded-xl font-semibold border transition-all cursor-pointer ${
                          customizingPepper === level
                            ? 'bg-[#fff5f3] border-[#b83827] text-[#b83827] shadow-2xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <div className="font-bold tracking-wider uppercase text-stone-500 mb-2">
                    EXTRAS · PER MEAL
                  </div>
                  <button
                    onClick={() => {
                      setCustomizingExtraPlantain(!customizingExtraPlantain);
                      handleApplyCustomization();
                    }}
                    className={`flex items-center justify-between w-full p-2.5 rounded-xl border transition-all cursor-pointer ${
                      customizingExtraPlantain
                        ? 'bg-[#fff5f3] border-[#b83827] text-stone-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          customizingExtraPlantain
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {customizingExtraPlantain && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span>Extra plantain</span>
                    </div>
                    <span className="font-bold text-[#b83827]">+₦1,000</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Ticket Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between">
            {/* Ticket Header & Items Count */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                  Order {orderId}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {totalItemCount} items
                </span>
              </div>

              {/* Dine-in vs Takeaway Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl my-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => onUpdateDiningOption('dine-in')}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    diningOption === 'dine-in'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Dine-in
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateDiningOption('takeaway')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${
                    diningOption === 'takeaway'
                      ? 'bg-[#fff5f3] border border-[#f5c6bc] text-[#b83827] shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <CheckIcon className="w-3.5 h-3.5 text-[#b83827]" />
                  <span>Takeaway</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-400 pb-3">
                Walk-in customer · Counter sale
              </div>

              {/* Order Items List */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-stone-400 text-xs">
                    No items in ticket. Tap items on the left to add.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-3 flex flex-col gap-1.5 text-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-bold text-stone-900">
                            {item.quantity} × {item.name}
                          </span>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {formatPrice(item.unitPrice)}
                            {item.extrasTotal > 0 && ` + ${formatPrice(item.extrasTotal)} plantain / meal`}
                          </div>
                        </div>
                        <span className="font-bold text-stone-900">
                          {formatPrice(item.totalPrice)}
                        </span>
                      </div>

                      {/* Customization Details */}
                      {item.customization && (
                        <div className="text-[11px] text-stone-500">
                          {item.customization.pepperLevel && `${item.customization.pepperLevel} pepper`}
                          {item.customization.extras && item.customization.extras.length > 0 &&
                            ` · ${item.customization.extras.map((e) => `${e.name} × ${item.quantity}`).join(', ')}`}
                        </div>
                      )}

                      {/* Quantity Controls & Edit Action */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item.id)}
                            className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-stone-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncrement(item.id)}
                            className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>

                        {item.customization ? (
                          <button
                            type="button"
                            onClick={() => {
                              const prod = products.find((p) => p.id === item.productId);
                              if (prod) setSelectedCustomizingProduct(prod);
                            }}
                            className="text-[11px] font-semibold text-[#b83827] hover:underline cursor-pointer"
                          >
                            Customise
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Kitchen Note Input Box */}
              <div className="mt-4 p-2.5 rounded-xl bg-[#fff9ea] border border-[#f5e6ba] text-xs flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <input
                  type="text"
                  value={kitchenNote}
                  onChange={(e) => onUpdateKitchenNote(e.target.value)}
                  placeholder="Kitchen note (e.g. Pack plantain separately)"
                  className="bg-transparent border-none text-stone-800 placeholder-stone-400 focus:outline-none w-full text-xs font-medium"
                />
              </div>

              {/* Totals Breakdown */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(totalDue)}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Discount</span>
                  <span className="font-semibold text-stone-900">₦0</span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total due</span>
                  <span className="text-xl text-stone-900">{formatPrice(totalDue)}</span>
                </div>
                <span className="text-[11px] text-stone-400">
                  VAT included · No delivery fee
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={onProceedToPayment}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#b83827] hover:bg-[#a12f20] disabled:bg-stone-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <span>→</span>
                <span>Collect payment · {formatPrice(totalDue)}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={onHoldOrder}
                  className="py-2.5 px-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PauseIcon className="w-3.5 h-3.5 text-stone-500" />
                  <span>Hold order</span>
                </button>
                <button
                  type="button"
                  onClick={onClearOrder}
                  className="py-2.5 px-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center justify-center transition-colors cursor-pointer"
                >
                  Clear order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
