import { Link } from 'react-router-dom';
import type { RentalItem } from '../models/RentalItem';
import { useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';

// Компонент принимает товар через props (требование: пропсы).
interface ProductCardProps {
  product: RentalItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { add, has } = useCart();
  const { t, lang, formatPrice } = useLocale();
  const inCart = has(product.id);
  const title = product.getName(lang);
  const desc = product.getDescription(lang);
  const catLabel = product.getCategoryLabel(lang);

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__img-wrap">
        <img className="card__img" src={product.imageUrl} alt={title} />
        {!product.available && (
          <span className="card__badge">{t('productOccupied')}</span>
        )}
      </Link>
      <div className="card__body">
        <span className="card__category">{catLabel}</span>
        <h3 className="card__title">
          <Link to={`/product/${product.id}`}>{title}</Link>
        </h3>
        <p className="card__desc">{desc}</p>
        <div className="card__footer">
          <div className="price">
            {formatPrice(product.pricePerDay)}
            <span className="price__period">{t('productPricePerDay')}</span>
          </div>
          <button
            className="btn btn--primary"
            type="button"
            disabled={!product.available || inCart}
            onClick={() => add(product.id)}
          >
            {inCart ? t('productInCart') : t('productRentAction')}
          </button>
        </div>
      </div>
    </article>
  );
}
