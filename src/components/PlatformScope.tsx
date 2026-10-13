import React from 'react';
import './PlatformScope.css';
import { useLanguage } from '../context/LanguageContext';

export const PlatformScope: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="scope-section" id="capabilities">
      <div className="container">
        
        {/* Section Header */}
        <div className="scope-header">
          <span className="scope-tag">{t('scope.tag')}</span>
          <h2 className="scope-title">{t('scope.title')}</h2>
          <p className="scope-desc">
            {t('scope.desc')}
          </p>
        </div>

        {/* Scope Grid */}
        <div className="scope-grid">
          
          {/* Card 1: Multiorigen y Multidestino */}
          <div className="scope-card">
            <div className="scope-icon-box">📍</div>
            <h3 className="scope-card-title">{t('scope.card1_title')}</h3>
            <p className="scope-card-desc">
              {t('scope.card1_desc')}
            </p>
          </div>

          {/* Card 2: Dirigido a Todos */}
          <div className="scope-card">
            <div className="scope-icon-box">👥</div>
            <h3 className="scope-card-title">{t('scope.card2_title')}</h3>
            <p className="scope-card-desc">
              {t('scope.card2_desc')}
            </p>
          </div>

          {/* Card 3: Tamaños y Traslados */}
          <div className="scope-card">
            <div className="scope-icon-box">✉️</div>
            <h3 className="scope-card-title">{t('scope.card3_title')}</h3>
            <p className="scope-card-desc">
              {t('scope.card3_desc')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
