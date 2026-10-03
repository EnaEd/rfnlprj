import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { getCategoryLabels } from '../models/equipment';
import { useLocale } from '../context/LocaleContext';

export function HomePage() {
  const { products } = useProducts();
  const { t, lang } = useLocale();
  const popular = products.filter((p) => p.available).slice(0, 6);
  const categoryLabels = getCategoryLabels(lang);

  return (
    <div>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">{t('heroTitle')}</h1>
            <p className="hero__subtitle">{t('heroSubtitle')}</p>
            <div className="hero__actions">
              <Link to="/catalog" className="btn btn--primary btn--lg">
                {t('heroCatalogBtn')}
              </Link>
              <a href="#categories" className="btn btn--outline btn--lg">
                {t('heroCategoriesBtn')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <h2 className="section__title">{t('categoriesTitle')}</h2>
          <div className="categories">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Link
                key={key}
                to={`/catalog?category=${key}`}
                className="category-tile"
              >
                <span className="category-tile__label">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--grey">
        <div className="container">
          <h2 className="section__title">{t('popularTitle')}</h2>
          <div className="grid">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container advantages">
          <div className="advantage">
            <div className="advantage__icon">🚚</div>
            <h3>{t('advDeliveryTitle')}</h3>
            <p>{t('advDeliveryDesc')}</p>
          </div>
          <div className="advantage">
            <div className="advantage__icon">💰</div>
            <h3>{t('advDiscountTitle')}</h3>
            <p>{t('advDiscountDesc')}</p>
          </div>
          <div className="advantage">
            <div className="advantage__icon">🛠️</div>
            <h3>{t('advQualityTitle')}</h3>
            <p>{t('advQualityDesc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
