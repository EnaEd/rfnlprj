import { useLocale } from '../context/LocaleContext';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="logo logo--light">
            <span className="logo__icon">🚜</span>
            <span className="logo__text">{t('brandName')}</span>
          </div>
          <p className="footer__text">{t('footerDesc')}</p>
        </div>
        <div className="footer__col">
          <h4>{t('footerContactsTitle')}</h4>
          <p>{t('footerPhone')}</p>
          <p>{t('footerEmail')}</p>
          <p>{t('footerHours')}</p>
        </div>
        <div className="footer__col">
          <h4>{t('footerHowItWorksTitle')}</h4>
          <p>{t('footerStep1')}</p>
          <p>{t('footerStep2')}</p>
          <p>{t('footerStep3')}</p>
        </div>
      </div>
      <div className="footer__bottom">
        {t('footerCopyright', { year: CURRENT_YEAR })}
      </div>
    </footer>
  );
}
