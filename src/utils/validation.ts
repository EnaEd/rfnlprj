import type { Language } from '../i18n/types';

// Валидация форм (требование !!!): проверки полей клиента и товара.

export interface CustomerForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  startDate: string;
  comment?: string;
}

export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Проверка украинского номера телефона:
 * Поддерживает форматы:
 * +380XXXXXXXXX, 380XXXXXXXXX, 0XXXXXXXXX
 * а также с разделителями пробелов, скобок и дефисов.
 */
export function isUkrainianPhone(phone: string): boolean {
  const cleaned = phone.trim().replace(/[\s\-()]/g, '');
  return /^(\+?380\d{9}|0\d{9})$/.test(cleaned);
}

export function validateCustomer(
  form: CustomerForm,
  lang: Language = 'uk',
): Errors<CustomerForm> {
  const errors: Errors<CustomerForm> = {};
  const isRu = lang === 'ru';

  if (!form.fullName.trim()) {
    errors.fullName = isRu ? 'Укажите ФИО' : 'Вкажіть ПІБ';
  } else if (form.fullName.trim().length < 3) {
    errors.fullName = isRu ? 'ФИО слишком короткое' : 'ПІБ занадто коротке';
  }

  if (!form.phone.trim()) {
    errors.phone = isRu ? 'Укажите номер телефона' : 'Вкажіть номер телефону';
  } else if (!isUkrainianPhone(form.phone)) {
    errors.phone = isRu
      ? 'Некорректный украинский номер (+380...)'
      : 'Некоректний український номер (+380...)';
  }

  if (!form.email.trim()) {
    errors.email = isRu ? 'Укажите email' : 'Вкажіть email';
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = isRu ? 'Некорректный email' : 'Некоректний email';
  }

  if (!form.address.trim()) {
    errors.address = isRu
      ? 'Укажите адрес доставки в Украине'
      : 'Вкажіть адресу доставки в Україні';
  }

  if (!form.startDate) {
    errors.startDate = isRu
      ? 'Выберите дату начала аренды'
      : 'Оберіть дату початку оренди';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(form.startDate);
    if (picked < today) {
      errors.startDate = isRu
        ? 'Дата не может быть в прошлом'
        : 'Дата не може бути в минулому';
    }
  }

  return errors;
}

export function isValid<T>(errors: Errors<T>): boolean {
  return Object.keys(errors).length === 0;
}

// Валидация формы товара в админ-панели.
export interface ProductForm {
  name: string;
  description: string;
  imageUrl: string;
  pricePerDay: string;
  deposit: string;
}

export function validateProduct(
  form: ProductForm,
  lang: Language = 'uk',
): Errors<ProductForm> {
  const errors: Errors<ProductForm> = {};
  const isRu = lang === 'ru';

  if (!form.name.trim()) {
    errors.name = isRu ? 'Введите название' : 'Введіть назву';
  }
  if (!form.description.trim()) {
    errors.description = isRu ? 'Введите описание' : 'Введіть опис';
  }
  if (!form.imageUrl.trim()) {
    errors.imageUrl = isRu ? 'Введите ссылку на фото' : 'Введіть посилання на фото';
  }
  if (!form.pricePerDay.trim() || Number(form.pricePerDay) <= 0) {
    errors.pricePerDay = isRu
      ? 'Цена должна быть больше 0'
      : 'Ціна повинна бути більше 0';
  }
  if (form.deposit.trim() === '' || Number(form.deposit) < 0) {
    errors.deposit = isRu ? 'Некорректный залог' : 'Некоректна застава';
  }
  return errors;
}
