import type { Language } from '../i18n/types';

// ООП: базовый абстрактный класс для любой единицы техники в аренду.
// От него наследуются все конкретные виды техники (принцип наследования).

export type Category =
  | 'motoblock'
  | 'minitractor'
  | 'powertool'
  | 'ladder'
  | 'stepladder';

export interface RentalItemData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pricePerDay: number;
  deposit: number;
  available: boolean;
  category: Category;
  // Произвольные характеристики конкретного вида техники
  specs?: Record<string, string | number | boolean>;
  nameRu?: string;
  descriptionRu?: string;
}

/**
 * Абстрактный базовый класс. Инкапсулирует общие поля и поведение,
 * а также задаёт абстрактные методы, которые реализуют наследники.
 */
export abstract class RentalItem {
  public readonly id: string;
  public name: string;
  public description: string;
  public imageUrl: string;
  public pricePerDay: number;
  public deposit: number;
  public available: boolean;
  public readonly category: Category;
  public nameRu?: string;
  public descriptionRu?: string;

  protected constructor(data: RentalItemData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.pricePerDay = data.pricePerDay;
    this.deposit = data.deposit;
    this.available = data.available;
    this.category = data.category;
    this.nameRu = data.nameRu;
    this.descriptionRu = data.descriptionRu;
  }

  /** Человекочитаемое название категории — переопределяется в наследниках. */
  public abstract get categoryLabel(): string;

  /** Локализованное название категории. */
  public abstract getCategoryLabel(lang?: Language): string;

  /** Технические характеристики конкретной техники. */
  public abstract getSpecs(lang?: Language): Record<string, string | number | boolean>;

  /** Получение локализованного названия товара */
  public getName(lang: Language = 'uk'): string {
    if (lang === 'ru' && this.nameRu) return this.nameRu;
    return this.name;
  }

  /** Получение локализованного описания товара */
  public getDescription(lang: Language = 'uk'): string {
    if (lang === 'ru' && this.descriptionRu) return this.descriptionRu;
    return this.description;
  }

  /** Полиморфный метод: расчёт стоимости аренды за N дней со скидкой. */
  public calcRentPrice(days: number): number {
    if (days <= 0) return 0;
    let price = this.pricePerDay * days;
    // Скидка за длительную аренду
    if (days >= 7) price *= 0.9;
    else if (days >= 3) price *= 0.95;
    return Math.round(price);
  }

  /** Итог к оплате с залогом. */
  public calcTotalWithDeposit(days: number): number {
    return this.calcRentPrice(days) + this.deposit;
  }

  /** Сериализация в простой объект для хранения в localStorage. */
  public toData(): RentalItemData {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      pricePerDay: this.pricePerDay,
      deposit: this.deposit,
      available: this.available,
      category: this.category,
      specs: this.getSpecs('uk'),
      nameRu: this.nameRu,
      descriptionRu: this.descriptionRu,
    };
  }
}
