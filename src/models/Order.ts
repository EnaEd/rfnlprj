import type { Language } from '../i18n/types';

// ООП: класс заказа аренды. Ещё один пример класса с методами и инкапсуляцией.

export interface OrderLine {
  itemId: string;
  itemName: string;
  pricePerDay: number;
  days: number;
  lineTotal: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  startDate: string;
  comment?: string;
}

export interface OrderData {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  lines: OrderLine[];
  total: number;
  status: 'new' | 'confirmed' | 'done' | 'cancelled';
}

export class Order {
  public readonly id: string;
  public readonly createdAt: string;
  public customer: CustomerInfo;
  public lines: OrderLine[];
  public total: number;
  public status: OrderData['status'];

  constructor(data: OrderData) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.customer = data.customer;
    this.lines = data.lines;
    this.total = data.total;
    this.status = data.status;
  }

  public get itemsCount(): number {
    return this.lines.length;
  }

  public get statusLabel(): string {
    return this.getStatusLabel('uk');
  }

  public getStatusLabel(lang: Language = 'uk'): string {
    const mapUk: Record<OrderData['status'], string> = {
      new: 'Новий',
      confirmed: 'Підтверджений',
      done: 'Завершений',
      cancelled: 'Скасований',
    };
    const mapRu: Record<OrderData['status'], string> = {
      new: 'Новый',
      confirmed: 'Подтверждён',
      done: 'Завершён',
      cancelled: 'Отменён',
    };
    return lang === 'ru' ? mapRu[this.status] : mapUk[this.status];
  }

  public toData(): OrderData {
    return {
      id: this.id,
      createdAt: this.createdAt,
      customer: this.customer,
      lines: this.lines,
      total: this.total,
      status: this.status,
    };
  }
}
