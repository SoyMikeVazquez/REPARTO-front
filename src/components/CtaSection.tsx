import React from 'react';
import './CtaSection.css';
import { useLanguage } from '../context/LanguageContext';

export const CtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <span className="cta-badge">{t('cta.badge')}</span>
        <h2 className="cta-title">{t('cta.title')}</h2>
        <p className="cta-desc">
          {t('cta.desc')}
        </p>
        <div className="cta-btn-wrapper">
          <a href="#signup" className="btn btn-primary" id="cta-bottom-button" style={{ padding: '16px 40px', fontSize: '16px' }}>
            {t('cta.btn')} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
