import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { RentalItem } from '../models/RentalItem';
import type { RentalItemData, Category } from '../models/RentalItem';
import { createRentalItem } from '../models/equipment';
import { Order } from '../models/Order';
import type { OrderData } from '../models/Order';
import { SEED_PRODUCTS } from '../data/seed';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

interface ProductsContextValue {
  products: RentalItem[];
  orders: Order[];
  getById: (id: string) => RentalItem | undefined;
  addProduct: (data: RentalItemData) => void;
  updateProduct: (data: RentalItemData) => void;
  removeProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderData['status']) => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<RentalItem[]>(() => {
    const data = loadJSON<RentalItemData[]>(STORAGE_KEYS.products, SEED_PRODUCTS);
    const enriched = data.map((item) => {
      const seed = SEED_PRODUCTS.find((s) => s.id === item.id);
      if (seed) {
        return {
          ...seed,
          ...item,
          name: item.name && item.name !== seed.nameRu ? item.name : seed.name,
          description: item.description && item.description !== seed.descriptionRu ? item.description : seed.description,
          nameRu: item.nameRu ?? seed.nameRu,
          descriptionRu: item.descriptionRu ?? seed.descriptionRu,
        };
      }
      return item;
    });
    return enriched.map(createRentalItem);
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const data = loadJSON<OrderData[]>(STORAGE_KEYS.orders, []);
    return data.map((o) => new Order(o));
  });

  useEffect(() => {
    saveJSON(STORAGE_KEYS.products, products.map((p) => p.toData()));
  }, [products]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.orders, orders.map((o) => o.toData()));
  }, [orders]);

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      orders,
      getById: (id) => products.find((p) => p.id === id),
      addProduct: (data) =>
        setProducts((prev) => [...prev, createRentalItem(data)]),
      updateProduct: (data) =>
        setProducts((prev) =>
          prev.map((p) => (p.id === data.id ? createRentalItem(data) : p)),
        ),
      removeProduct: (id) =>
        setProducts((prev) => prev.filter((p) => p.id !== id)),
      addOrder: (order) => setOrders((prev) => [order, ...prev]),
      updateOrderStatus: (id, status) =>
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id
              ? new Order({ ...o.toData(), status })
              : o,
          ),
        ),
    }),
    [products, orders],
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

// Кастомный хук (требование: хуки) для доступа к контексту.
export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts должен использоваться внутри ProductsProvider');
  return ctx;
}

export type { Category };
