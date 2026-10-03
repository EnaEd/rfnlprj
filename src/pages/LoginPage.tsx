import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

// Форма входа администратора с валидацией.
export function LoginPage() {
  const { login } = useAuth();
  const { t } = useLocale();
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.login.trim() || !form.password.trim()) {
      setError(t('adminLoginErrorAllFields'));
      return;
    }
    if (!login(form.login.trim(), form.password)) {
      setError(t('adminLoginErrorInvalid'));
    }
  };

  return (
    <div className="container section">
      <div className="login">
        <h1 className="page-title">{t('adminLoginTitle')}</h1>
        <p className="login__hint">{t('adminLoginHint')}</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login">{t('adminLoginLabel')}</label>
            <input
              id="login"
              className="input"
              value={form.login}
              onChange={(e) =>
                setForm((p) => ({ ...p, login: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('adminPasswordLabel')}</label>
            <input
              id="password"
              type="password"
              className="input"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>
          {error && <div className="error error--box">{error}</div>}
          <button type="submit" className="btn btn--primary btn--block">
            {t('adminLoginSubmit')}
          </button>
        </form>
      </div>
    </div>
  );
}
