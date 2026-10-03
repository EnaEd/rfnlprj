import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

export function Header() {
  const { count } = useCart();
  const { isAdmin, logout } = useAuth();
  const { t, lang, setLang, currency, setCurrency } = useLocale();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo">
          <span className="logo__icon">🚜</span>
          <span className="logo__text">{t('brandName')}</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end className="nav__link">
            {t('navHome')}
          </NavLink>
          <NavLink to="/catalog" className="nav__link">
            {t('navCatalog')}
          </NavLink>
          <NavLink to="/admin" className="nav__link">
            {t('navAdmin')}
          </NavLink>
        </nav>

        <div className="header__actions">
          <div className="switch-controls">
            <div className="switch-group" aria-label={t('langSelector')}>
              <button
                type="button"
                className={`switch-btn ${lang === 'uk' ? 'switch-btn--active' : ''}`}
                onClick={() => setLang('uk')}
                title="Українська"
              >
                UA
              </button>
              <button
                type="button"
                className={`switch-btn ${lang === 'ru' ? 'switch-btn--active' : ''}`}
                onClick={() => setLang('ru')}
                title="Русский"
              >
                RU
              </button>
            </div>

            <div className="switch-group" aria-label={t('currencySelector')}>
              <button
                type="button"
                className={`switch-btn ${currency === 'UAH' ? 'switch-btn--active' : ''}`}
                onClick={() => setCurrency('UAH')}
                title="Гривня (₴)"
              >
                ₴ UAH
              </button>
              <button
                type="button"
                className={`switch-btn ${currency === 'USD' ? 'switch-btn--active' : ''}`}
                onClick={() => setCurrency('USD')}
                title="US Dollar ($)"
              >
                $ USD
              </button>
            </div>
          </div>

          {isAdmin && (
            <button className="btn btn--ghost" onClick={logout} type="button">
              {t('navLogout')}
            </button>
          )}

          <Link to="/cart" className="cart-link">
            🛒 {t('cart')}
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
