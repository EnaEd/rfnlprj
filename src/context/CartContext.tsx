import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export interface CartItem {
  itemId: string;
  days: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (itemId: string, days?: number) => void;
  setDays: (itemId: string, days: number) => void;
  remove: (itemId: string) => void;
  clear: () => void;
  has: (itemId: string) => boolean;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    loadJSON<CartItem[]>(STORAGE_KEYS.cart, []),
  );

  useEffect(() => {
    saveJSON(STORAGE_KEYS.cart, items);
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      add: (itemId, days = 1) =>
        setItems((prev) =>
          prev.some((i) => i.itemId === itemId)
            ? prev
            : [...prev, { itemId, days }],
        ),
      setDays: (itemId, days) =>
        setItems((prev) =>
          prev.map((i) =>
            i.itemId === itemId ? { ...i, days: Math.max(1, days) } : i,
          ),
        ),
      remove: (itemId) =>
        setItems((prev) => prev.filter((i) => i.itemId !== itemId)),
      clear: () => setItems([]),
      has: (itemId) => items.some((i) => i.itemId === itemId),
      count: items.length,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart должен использоваться внутри CartProvider');
  return ctx;
}
