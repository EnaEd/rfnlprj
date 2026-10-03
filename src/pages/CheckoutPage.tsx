import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';
import { Order } from '../models/Order';
import type { OrderLine } from '../models/Order';
import {
  validateCustomer,
  isValid,
} from '../utils/validation';
import type { CustomerForm, Errors } from '../utils/validation';

const EMPTY: CustomerForm = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  startDate: '',
  comment: '',
};

export function CheckoutPage() {
  const { items, clear } = useCart();
  const { getById, addOrder } = useProducts();
  const { t, lang, formatPrice } = useLocale();

  const [form, setForm] = useState<CustomerForm>(EMPTY);
  const [errors, setErrors] = useState<Errors<CustomerForm>>({});
  const [done, setDone] = useState<string | null>(null);

  const rows = items
    .map((ci) => ({ ci, product: getById(ci.itemId) }))
    .filter((r) => r.product);

  const rentTotal = rows.reduce(
    (s, r) => s + (r.product ? r.product.calcRentPrice(r.ci.days) : 0),
    0,
  );
  const depositTotal = rows.reduce(
    (s, r) => s + (r.product ? r.product.deposit : 0),
    0,
  );

  const field = (key: keyof CustomerForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCustomer(form, lang);
    setErrors(errs);
    if (!isValid(errs)) return;

    const lines: OrderLine[] = rows.map((r) => ({
      itemId: r.product!.id,
      itemName: r.product!.getName(lang),
      pricePerDay: r.product!.pricePerDay,
      days: r.ci.days,
      lineTotal: r.product!.calcRentPrice(r.ci.days),
    }));

    const order = new Order({
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer: { ...form },
      lines,
      total: rentTotal + depositTotal,
      status: 'new',
    });

    addOrder(order);
    clear();
    setDone(order.id);
  };

  if (done) {
    return (
      <div className="container section">
        <div className="success">
          <div className="success__icon">✅</div>
          <h1>{t('orderSuccessTitle')}</h1>
          <p>
            {t('orderSuccessNumber', { id: done })}
          </p>
          <p>{t('orderSuccessNote')}</p>
          <Link to="/catalog" className="btn btn--primary">
            {t('orderSuccessReturnBtn')}
          </Link>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="container section">
        <h1 className="page-title">{t('checkoutTitle')}</h1>
        <p className="empty">{t('checkoutEmptyCart')}</p>
        <Link to="/catalog" className="btn btn--primary">
          {t('checkoutBackToCatalog')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="page-title">{t('checkoutTitle')}</h1>
      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">{t('checkoutFullName')}</label>
            <input
              id="fullName"
              className={`input ${errors.fullName ? 'input--error' : ''}`}
              value={form.fullName}
              onChange={field('fullName')}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">{t('checkoutPhone')}</label>
              <input
                id="phone"
                className={`input ${errors.phone ? 'input--error' : ''}`}
                placeholder={t('checkoutPhonePlaceholder')}
                value={form.phone}
                onChange={field('phone')}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('checkoutEmail')}</label>
              <input
                id="email"
                type="email"
                className={`input ${errors.email ? 'input--error' : ''}`}
                placeholder={t('checkoutEmailPlaceholder')}
                value={form.email}
                onChange={field('email')}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">{t('checkoutAddress')}</label>
            <input
              id="address"
              className={`input ${errors.address ? 'input--error' : ''}`}
              placeholder={t('checkoutAddressPlaceholder')}
              value={form.address}
              onChange={field('address')}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="startDate">{t('checkoutStartDate')}</label>
            <input
              id="startDate"
              type="date"
              className={`input ${errors.startDate ? 'input--error' : ''}`}
              value={form.startDate}
              onChange={field('startDate')}
            />
            {errors.startDate && (
              <span className="error">{errors.startDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="comment">{t('checkoutComment')}</label>
            <textarea
              id="comment"
              className="input"
              rows={3}
              placeholder={t('checkoutCommentPlaceholder')}
              value={form.comment}
              onChange={field('comment')}
            />
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            {t('checkoutSubmit')}
          </button>
        </form>

        <aside className="checkout__summary">
          <h3>{t('checkoutYourOrder')}</h3>
          {rows.map(({ ci, product }) => {
            const title = product!.getName(lang);
            return (
              <div className="summary-row" key={ci.itemId}>
                <span>
                  {title} × {ci.days} {t('checkoutDaysShort')}
                </span>
                <span>{formatPrice(product!.calcRentPrice(ci.days))}</span>
              </div>
            );
          })}
          <div className="summary-row">
            <span>{t('checkoutDeposit')}</span>
            <span>{formatPrice(depositTotal)}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>{t('checkoutToPay')}</span>
            <span>{formatPrice(rentTotal + depositTotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
