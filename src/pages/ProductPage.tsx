import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useProducts();
  const { add, has } = useCart();
  const { t, lang, formatPrice } = useLocale();
  const navigate = useNavigate();
  const [days, setDays] = useState(1);

  const product = id ? getById(id) : undefined;

  if (!product) {
    return (
      <div className="container section">
        <p className="empty">{t('productNotFound')}</p>
        <Link to="/catalog" className="btn btn--primary">
          {t('checkoutBackToCatalog')}
        </Link>
      </div>
    );
  }

  const inCart = has(product.id);
  const title = product.getName(lang);
  const desc = product.getDescription(lang);
  const catLabel = product.getCategoryLabel(lang);
  const specs = product.getSpecs(lang);

  return (
    <div className="container section">
      <Link to="/catalog" className="back-link">
        {t('productBackToCatalog')}
      </Link>
      <div className="product">
        <div className="product__media">
          <img src={product.imageUrl} alt={title} />
          {!product.available && (
            <span className="card__badge card__badge--big">
              {t('productOccupied')}
            </span>
          )}
        </div>
        <div className="product__info">
          <span className="card__category">{catLabel}</span>
          <h1 className="product__title">{title}</h1>
          <p className="product__desc">{desc}</p>

          <table className="specs">
            <tbody>
              {Object.entries(specs).map(([k, v]) => (
                <tr key={k}>
                  <td className="specs__key">{k}</td>
                  <td className="specs__val">{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="product__price-row">
            <div className="price price--lg">
              {formatPrice(product.pricePerDay)}
              <span className="price__period">{t('productPricePerDay')}</span>
            </div>
            <div className="product__deposit">
              {t('productDeposit', { deposit: formatPrice(product.deposit) })}
            </div>
          </div>

          <div className="rent-calc">
            <label htmlFor="days">{t('productRentTermDays')}</label>
            <input
              id="days"
              className="input input--sm"
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
            />
            <div className="rent-calc__total">
              <b>{t('productRentTotal', { total: formatPrice(product.calcRentPrice(days)) })}</b>
            </div>
          </div>

          <div className="product__actions">
            <button
              className="btn btn--primary btn--lg"
              type="button"
              disabled={!product.available || inCart}
              onClick={() => add(product.id, days)}
            >
              {inCart ? t('productAlreadyInCart') : t('productAddToCart')}
            </button>
            <button
              className="btn btn--outline btn--lg"
              type="button"
              disabled={!product.available}
              onClick={() => {
                add(product.id, days);
                navigate('/cart');
              }}
            >
              {t('productCheckoutNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
