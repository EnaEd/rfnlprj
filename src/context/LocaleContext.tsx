import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language, Currency } from '../i18n/types';
import { getTranslation, type TranslationKey } from '../i18n/translations';
import { loadJSON, saveJSON, setCookie, getCookie, STORAGE_KEYS } from '../utils/storage';

export const USD_RATE = 41.5; // 1 USD = 41.5 UAH

interface LocaleContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  formatPrice: (amountInUah: number) => string;
  convertPrice: (amountInUah: number) => number;
  usdRate: number;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const cookieLang = getCookie('rental.lang') as Language | null;
    if (cookieLang === 'uk' || cookieLang === 'ru') return cookieLang;
    const local = loadJSON<Language>(STORAGE_KEYS.lang, 'uk');
    return local === 'ru' ? 'ru' : 'uk';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const local = loadJSON<Currency>(STORAGE_KEYS.currency, 'UAH');
    return local === 'USD' ? 'USD' : 'UAH';
  });

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    saveJSON(STORAGE_KEYS.lang, nextLang);
    setCookie('rental.lang', nextLang, 365);
    document.documentElement.lang = nextLang;
  };

  const setCurrency = (nextCurrency: Currency) => {
    setCurrencyState(nextCurrency);
    saveJSON(STORAGE_KEYS.currency, nextCurrency);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      lang,
      setLang,
      currency,
      setCurrency,
      usdRate: USD_RATE,
      t: (key: TranslationKey, params?: Record<string, string | number>) =>
        getTranslation(lang, key, params),
      convertPrice: (amountInUah: number) => {
        if (currency === 'USD') {
          return Math.round(amountInUah / USD_RATE);
        }
        return amountInUah;
      },
      formatPrice: (amountInUah: number) => {
        if (currency === 'USD') {
          const inUsd = Math.round(amountInUah / USD_RATE);
          return `$${inUsd.toLocaleString('en-US')}`;
        }
        const formatted = Math.round(amountInUah).toLocaleString(
          lang === 'uk' ? 'uk-UA' : 'ru-RU',
        );
        return `${formatted} ₴`;
      },
    };
  }, [lang, currency]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale должен использоваться внутри LocaleProvider');
  return ctx;
}
