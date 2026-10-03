import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { Filters } from '../components/Filters';
import type { FilterState } from '../components/Filters';
import type { Category } from '../models/RentalItem';
import { useLocale } from '../context/LocaleContext';

export function CatalogPage() {
  const { products } = useProducts();
  const { t } = useLocale();
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'all';

  const priceLimit = useMemo(
    () => Math.max(100, ...products.map((p) => p.pricePerDay)),
    [products],
  );

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: initialCategory,
    maxPrice: priceLimit,
    onlyAvailable: false,
    sort: 'default',
  });

  const visible = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    let list = products.filter((p) => {
      const nameUk = p.getName('uk').toLowerCase();
      const nameRu = p.getName('ru').toLowerCase();
      const byName = !term || nameUk.includes(term) || nameRu.includes(term);
      const byCategory =
        filters.category === 'all' || p.category === filters.category;
      const byPrice = p.pricePerDay <= filters.maxPrice;
      const byAvail = !filters.onlyAvailable || p.available;
      return byName && byCategory && byPrice && byAvail;
    });

    if (filters.sort === 'price-asc') {
      list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sort === 'price-desc') {
      list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    return list;
  }, [products, filters]);

  return (
    <div className="container section">
      <h1 className="page-title">{t('catalogTitle')}</h1>
      <div className="catalog">
        <Filters value={filters} onChange={setFilters} priceLimit={priceLimit} />
        <div className="catalog__content">
          <p className="catalog__count">
            {t('catalogFoundCount', { count: visible.length })}
          </p>
          {visible.length === 0 ? (
            <p className="empty">{t('catalogEmpty')}</p>
          ) : (
            <div className="grid">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
