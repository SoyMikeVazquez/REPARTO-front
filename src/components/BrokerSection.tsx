import React from 'react';
import './BrokerSection.css';
import { useLanguage } from '../context/LanguageContext';

export const BrokerSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="broker-section" id="brokers">
      <div className="container">
        
        {/* Header */}
        <div className="broker-header">
          <div className="broker-badge-wrapper">
            <span className="broker-badge-dot"></span>
            <span className="broker-badge-text">
              {language === 'es' ? 'GESTIÓN HUMANA + TECNOLOGÍA • DEDICATED BROKER' : 'HUMAN LOGISTICS + AI TECH • DEDICATED BROKER'}
            </span>
          </div>
          <h2 className="broker-title">
            {t('brokers.title')}
          </h2>
          <p className="broker-desc">
            {t('brokers.desc')}
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="broker-grid">
          
          {/* Left Column: 4 Key Pillars */}
          <div className="broker-cards-column">
            
            {/* Card 1: Supervisión de Viajes */}
            <div className="broker-card">
              <div className="broker-card-icon">🛵</div>
              <h3 className="broker-card-title">{t('brokers.card1_title')}</h3>
              <p className="broker-card-desc">{t('brokers.card1_desc')}</p>
            </div>

            {/* Card 2: Resolución de Incidencias */}
            <div className="broker-card">
              <div className="broker-card-icon">🛡️</div>
              <h3 className="broker-card-title">{t('brokers.card2_title')}</h3>
              <p className="broker-card-desc">{t('brokers.card2_desc')}</p>
            </div>

            {/* Card 3: Coordinación de Flota */}
            <div className="broker-card">
              <div className="broker-card-icon">⚡</div>
              <h3 className="broker-card-title">{t('brokers.card3_title')}</h3>
              <p className="broker-card-desc">{t('brokers.card3_desc')}</p>
            </div>

            {/* Card 4: Gestor Dedicado */}
            <div className="broker-card">
              <div className="broker-card-icon">🤝</div>
              <h3 className="broker-card-title">{t('brokers.card4_title')}</h3>
              <p className="broker-card-desc">{t('brokers.card4_desc')}</p>
            </div>

          </div>

          {/* Right Column: Interactive / Live Broker Console Mockup */}
          <div className="broker-console-wrapper">
            <div className="broker-console-glow"></div>
            
            {/* Console Header */}
            <div className="broker-console-header">
              <div className="broker-profile-box">
                <div className="broker-avatar">
                  CM
                  <span className="broker-online-badge"></span>
                </div>
                <div className="broker-name-box">
                  <h4>Carlos Mendoza</h4>
                  <span className="broker-status-pill">
                    <span className="broker-live-dot"></span>
                    {t('brokers.live_status')}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="broker-metrics-bar">
              <div className="broker-metric-item">
                <span className="broker-metric-val">14</span>
                <span className="broker-metric-lbl">{t('brokers.stat_active')}</span>
              </div>
              <div className="broker-metric-item">
                <span className="broker-metric-val">99.7%</span>
                <span className="broker-metric-lbl">{t('brokers.stat_ontime')}</span>
              </div>
              <div className="broker-metric-item">
                <span className="broker-metric-val">&lt; 40s</span>
                <span className="broker-metric-lbl">{t('brokers.stat_resolved')}</span>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="broker-feed-section">
              <div className="broker-feed-title">
                <span>{t('brokers.feed_title')}</span>
                <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="broker-live-dot"></span> LIVE
                </span>
              </div>

              <div className="broker-feed-list">
                <div className="broker-feed-item">
                  <div className="broker-feed-icon">🛵</div>
                  <div className="broker-feed-content">
                    <div className="broker-feed-headline">{t('brokers.feed_1_title')}</div>
                    <p className="broker-feed-detail">{t('brokers.feed_1_desc')}</p>
                  </div>
                </div>

                <div className="broker-feed-item">
                  <div className="broker-feed-icon">💬</div>
                  <div className="broker-feed-content">
                    <div className="broker-feed-headline">{t('brokers.feed_2_title')}</div>
                    <p className="broker-feed-detail">{t('brokers.feed_2_desc')}</p>
                  </div>
                </div>

                <div className="broker-feed-item">
                  <div className="broker-feed-icon">⚡</div>
                  <div className="broker-feed-content">
                    <div className="broker-feed-headline">{t('brokers.feed_3_title')}</div>
                    <p className="broker-feed-detail">{t('brokers.feed_3_desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Console Footer */}
            <div className="broker-console-footer">
              <div className="broker-support-info">
                <span className="broker-support-icon">✓</span>
                <span>{t('brokers.chat_support')}</span>
              </div>
              <a href="#signup" className="broker-cta-button">
                {t('brokers.cta')} &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

