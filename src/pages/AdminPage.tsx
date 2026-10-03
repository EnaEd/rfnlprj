import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { useLocale } from '../context/LocaleContext';
import { LoginPage } from './LoginPage';
import { getCategoryLabels } from '../models/equipment';
import type { Category, RentalItemData } from '../models/RentalItem';
import { validateProduct } from '../utils/validation';
import type { ProductForm as ProductFormErrors } from '../utils/validation';
import type { Errors } from '../utils/validation';
import type { OrderData } from '../models/Order';

interface FormState {
  id: string | null;
  name: string;
  description: string;
  imageUrl: string;
  pricePerDay: string;
  deposit: string;
  category: Category;
  available: boolean;
}

const EMPTY_FORM: FormState = {
  id: null,
  name: '',
  description: '',
  imageUrl: '',
  pricePerDay: '',
  deposit: '',
  category: 'motoblock',
  available: true,
};

export function AdminPage() {
  const { isAdmin } = useAuth();
  const { products, orders, addProduct, updateProduct, removeProduct, updateOrderStatus } =
    useProducts();
  const { t, lang, formatPrice } = useLocale();
  const categoryLabels = getCategoryLabels(lang);

  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors<ProductFormErrors>>({});

  if (!isAdmin) {
    return <LoginPage />;
  }

  const startEdit = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setForm({
      id: p.id,
      name: p.name,
      description: p.description,
      imageUrl: p.imageUrl,
      pricePerDay: String(p.pricePerDay),
      deposit: String(p.deposit),
      category: p.category,
      available: p.available,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateProduct(
      {
        name: form.name,
        description: form.description,
        imageUrl: form.imageUrl,
        pricePerDay: form.pricePerDay,
        deposit: form.deposit,
      },
      lang,
    );
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const data: RentalItemData = {
      id: form.id ?? `p-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      pricePerDay: Number(form.pricePerDay),
      deposit: Number(form.deposit),
      available: form.available,
      category: form.category,
    };

    if (form.id) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
    setForm(EMPTY_FORM);
    setErrors({});
  };

  return (
    <div className="container section">
      <h1 className="page-title">{t('adminPageTitle')}</h1>

      <div className="tabs">
        <button
          className={`tab ${tab === 'products' ? 'tab--active' : ''}`}
          onClick={() => setTab('products')}
          type="button"
        >
          {t('adminTabProducts', { count: products.length })}
        </button>
        <button
          className={`tab ${tab === 'orders' ? 'tab--active' : ''}`}
          onClick={() => setTab('orders')}
          type="button"
        >
          {t('adminTabOrders', { count: orders.length })}
        </button>
      </div>

      {tab === 'products' && (
        <>
          <form className="admin-form" onSubmit={handleSubmit} noValidate>
            <h3>{form.id ? t('adminEditProduct') : t('adminNewProduct')}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>{t('adminProductName')}</label>
                <input
                  className={`input ${errors.name ? 'input--error' : ''}`}
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>{t('adminProductCategory')}</label>
                <select
                  className="input"
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      category: e.target.value as Category,
                    }))
                  }
                >
                  {Object.entries(categoryLabels).map(([k, label]) => (
                    <option key={k} value={k}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{t('adminProductDescription')}</label>
              <textarea
                className={`input ${errors.description ? 'input--error' : ''}`}
                rows={2}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>

            <div className="form-group">
              <label>{t('adminProductImageUrl')}</label>
              <input
                className={`input ${errors.imageUrl ? 'input--error' : ''}`}
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
              />
              {errors.imageUrl && (
                <span className="error">{errors.imageUrl}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('adminProductPricePerDay')}</label>
                <input
                  className={`input ${errors.pricePerDay ? 'input--error' : ''}`}
                  type="number"
                  value={form.pricePerDay}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, pricePerDay: e.target.value }))
                  }
                />
                {errors.pricePerDay && (
                  <span className="error">{errors.pricePerDay}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('adminProductDeposit')}</label>
                <input
                  className={`input ${errors.deposit ? 'input--error' : ''}`}
                  type="number"
                  value={form.deposit}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, deposit: e.target.value }))
                  }
                />
                {errors.deposit && (
                  <span className="error">{errors.deposit}</span>
                )}
              </div>
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm((p) => ({ ...p, available: e.target.checked }))
                }
              />
              {t('adminProductAvailableCheckbox')}
            </label>

            <div className="admin-form__actions">
              <button type="submit" className="btn btn--primary">
                {form.id ? t('adminProductSave') : t('adminProductAdd')}
              </button>
              {form.id && (
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setErrors({});
                  }}
                >
                  {t('adminProductCancel')}
                </button>
              )}
            </div>
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('adminTablePhoto')}</th>
                <th>{t('adminTableName')}</th>
                <th>{t('adminTableCategory')}</th>
                <th>{t('adminTablePricePerDay')}</th>
                <th>{t('adminTableStatus')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img className="admin-table__img" src={p.imageUrl} alt="" />
                  </td>
                  <td>{p.getName(lang)}</td>
                  <td>{p.getCategoryLabel(lang)}</td>
                  <td>{formatPrice(p.pricePerDay)}</td>
                  <td>{p.available ? t('productAvailable') : t('productUnavailable')}</td>
                  <td className="admin-table__actions">
                    <button
                      className="btn btn--ghost"
                      type="button"
                      onClick={() => startEdit(p.id)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn--ghost"
                      type="button"
                      onClick={() => removeProduct(p.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'orders' && (
        <div className="orders">
          {orders.length === 0 ? (
            <p className="empty">{t('adminNoOrders')}</p>
          ) : (
            orders.map((o) => (
              <div className="order-card" key={o.id}>
                <div className="order-card__head">
                  <div>
                    <b>{o.id}</b>
                    <span className="order-card__date">
                      {new Date(o.createdAt).toLocaleString(
                        lang === 'uk' ? 'uk-UA' : 'ru-RU',
                      )}
                    </span>
                  </div>
                  <select
                    className="input input--sm"
                    value={o.status}
                    onChange={(e) =>
                      updateOrderStatus(
                        o.id,
                        e.target.value as OrderData['status'],
                      )
                    }
                  >
                    <option value="new">{t('orderStatusNew')}</option>
                    <option value="confirmed">{t('orderStatusConfirmed')}</option>
                    <option value="done">{t('orderStatusDone')}</option>
                    <option value="cancelled">{t('orderStatusCancelled')}</option>
                  </select>
                </div>
                <div className="order-card__body">
                  <p>
                    <b>{o.customer.fullName}</b> · {o.customer.phone} ·{' '}
                    {o.customer.email}
                  </p>
                  <p>{t('adminOrderAddress', { address: o.customer.address })}</p>
                  <p>{t('adminOrderStartDate', { date: o.customer.startDate })}</p>
                  {o.customer.comment && (
                    <p>{t('adminOrderComment', { comment: o.customer.comment })}</p>
                  )}
                  <ul className="order-card__lines">
                    {o.lines.map((l) => (
                      <li key={l.itemId}>
                        {t('adminOrderLinesTotal', {
                          name: l.itemName,
                          days: l.days,
                          price: formatPrice(l.pricePerDay),
                          lineTotal: formatPrice(l.lineTotal),
                        })}
                      </li>
                    ))}
                  </ul>
                  <p className="order-card__total">
                    {t('adminOrderSummary', { total: formatPrice(o.total) })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
