import type { Category } from '../models/RentalItem';
import { getCategoryLabels } from '../models/equipment';
import { useLocale } from '../context/LocaleContext';

export interface FilterState {
  search: string;
  category: Category | 'all';
  maxPrice: number;
  onlyAvailable: boolean;
  sort: 'default' | 'price-asc' | 'price-desc';
}

interface FiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  priceLimit: number;
}

// Панель фильтров поиска товаров (требование: фильтры поиска).
export function Filters({ value, onChange, priceLimit }: FiltersProps) {
  const { t, lang, formatPrice } = useLocale();
  const categoryLabels = getCategoryLabels(lang);

  const update = (patch: Partial<FilterState>) =>
    onChange({ ...value, ...patch });

  return (
    <aside className="filters">
      <div className="filters__group">
        <label className="filters__label" htmlFor="search">
          {t('filtersSearchLabel')}
        </label>
        <input
          id="search"
          className="input"
          type="text"
          placeholder={t('filtersSearchPlaceholder')}
          value={value.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="category">
          {t('filtersCategoryLabel')}
        </label>
        <select
          id="category"
          className="input"
          value={value.category}
          onChange={(e) =>
            update({ category: e.target.value as FilterState['category'] })
          }
        >
          <option value="all">{t('filtersAllCategories')}</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="price">
          {t('filtersPriceLimit', { price: formatPrice(value.maxPrice) })}
        </label>
        <input
          id="price"
          type="range"
          min={0}
          max={priceLimit}
          step={50}
          value={value.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
        />
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="sort">
          {t('filtersSortLabel')}
        </label>
        <select
          id="sort"
          className="input"
          value={value.sort}
          onChange={(e) =>
            update({ sort: e.target.value as FilterState['sort'] })
          }
        >
          <option value="default">{t('filtersSortDefault')}</option>
          <option value="price-asc">{t('filtersSortPriceAsc')}</option>
          <option value="price-desc">{t('filtersSortPriceDesc')}</option>
        </select>
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={value.onlyAvailable}
          onChange={(e) => update({ onlyAvailable: e.target.checked })}
        />
        {t('filtersOnlyAvailable')}
      </label>
    </aside>
  );
}
