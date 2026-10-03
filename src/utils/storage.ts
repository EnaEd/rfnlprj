// Универсальные помощники для сохранения данных в localStorage.

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // переполнение хранилища игнорируем
  }
}

// Простейшая работа с cookie (требование: куки/localStorage).
export function setCookie(name: string, value: string, days = 30): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export const STORAGE_KEYS = {
  products: 'rental.products',
  cart: 'rental.cart',
  orders: 'rental.orders',
  auth: 'rental.auth',
  lang: 'rental.lang',
  currency: 'rental.currency',
} as const;
