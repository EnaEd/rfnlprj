export type Language = 'uk' | 'ru';
export type Currency = 'UAH' | 'USD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  rateToUah: number; // 1 unit in UAH
}
