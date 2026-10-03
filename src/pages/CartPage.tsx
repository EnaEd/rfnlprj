import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';

export function CartPage() {
  const { items, setDays, remove, clear } = useCart();
  const { getById } = useProducts();
  const { t, lang, formatPrice } = useLocale();

  const rows = items
    .map((ci) => ({ ci, product: getById(ci.itemId) }))
    .filter((r) => r.product);

  const rentTotal = rows.reduce(
    (sum, r) => sum + (r.product ? r.product.calcRentPrice(r.ci.days) : 0),
    0,
  );
  const depositTotal = rows.reduce(
    (sum, r) => sum + (r.product ? r.product.deposit : 0),
    0,
  );

  if (rows.length === 0) {
    return (
      <div className="container section">
        <h1 className="page-title">{t('cartTitle')}</h1>
        <p className="empty">{t('cartEmpty')}</p>
        <Link to="/catalog" className="btn btn--primary">
          {t('cartChooseEquipment')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="page-title">{t('cartTitle')}</h1>
      <div className="cart">
        <div className="cart__items">
          {rows.map(({ ci, product }) => {
            const title = product!.getName(lang);
            return (
              <div className="cart-row" key={ci.itemId}>
                <img
                  className="cart-row__img"
                  src={product!.imageUrl}
                  alt={title}
                />
                <div className="cart-row__info">
                  <Link
                    to={`/product/${product!.id}`}
                    className="cart-row__name"
                  >
                    {title}
                  </Link>
                  <span className="cart-row__price">
                    {formatPrice(product!.pricePerDay)}
                    {t('productPricePerDay')} ·{' '}
                    {t('productDepositInline', {
                      deposit: formatPrice(product!.deposit),
                    })}
                  </span>
                </div>
                <div className="cart-row__days">
                  <label>{t('cartDaysLabel')}</label>
                  <input
                    className="input input--sm"
                    type="number"
                    min={1}
                    value={ci.days}
                    onChange={(e) =>
                      setDays(ci.itemId, Math.max(1, Number(e.target.value)))
                    }
                  />
                </div>
                <div className="cart-row__total">
                  {formatPrice(product!.calcRentPrice(ci.days))}
                </div>
                <button
                  className="btn btn--ghost cart-row__remove"
                  type="button"
                  onClick={() => remove(ci.itemId)}
                  title="Видалити"
                >
                  ✕
                </button>
              </div>
            );
          })}
          <button className="btn btn--ghost" type="button" onClick={clear}>
            {t('cartClear')}
          </button>
        </div>

        <aside className="cart__summary">
          <h3>{t('cartSummaryTitle')}</h3>
          <div className="summary-row">
            <span>{t('cartRentSummary')}</span>
            <span>{formatPrice(rentTotal)}</span>
          </div>
          <div className="summary-row">
            <span>{t('cartDepositSummary')}</span>
            <span>{formatPrice(depositTotal)}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>{t('cartTotalToPay')}</span>
            <span>{formatPrice(rentTotal + depositTotal)}</span>
          </div>
          <Link to="/checkout" className="btn btn--primary btn--lg btn--block">
            {t('cartProceedToCheckout')}
          </Link>
        </aside>
      </div>
    </div>
  );
}
