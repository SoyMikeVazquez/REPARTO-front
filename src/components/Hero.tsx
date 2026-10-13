import React from 'react';
import './Hero.css';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Headline and Form */}
          <div className="hero-content animate-slide-in">
            <h1 className="hero-title">
              {language === 'es' ? (
                <>
                  Gestiona y automatiza <span className="hero-title-red">repartidores</span> para tu <span className="hero-title-red">negocio</span>
                </>
              ) : (
                <>
                  Manage and automate <span className="hero-title-red">delivery drivers</span> for your <span className="hero-title-red">restaurant</span> & parcels.
                </>
              )}
            </h1>

            <p className="hero-desc">
              {t('hero.desc')}
            </p>

            <div className="hero-form-wrapper">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#signup" className="btn btn-primary" id="cta-hero-start" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  {t('hero.cta_start')}
                </a>
                <a href="#brokers" className="btn btn-outline" id="cta-hero-brokers" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  {language === 'es' ? 'Conocer Brokers' : 'Explore Brokers'}
                </a>
              </div>

              <div className="hero-form-footer">
                <div className="hero-form-footer-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{t('hero.footer_routes')}</span>
                </div>
                <div className="hero-form-footer-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{t('hero.footer_setup')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Restaurant Chef looking at phone */}
          <div className="hero-mockup-wrapper animate-float">
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
              <img 
                src="/chef_restaurant_delivery.png" 
                alt="Chef de restaurante gestionando entregas con pideloseguro en su celular" 
                style={{ 
                  width: '100%', 
                  borderRadius: '20px', 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  border: '1px solid var(--light-border)',
                  display: 'block' 
                }} 
              />
              
              <div className="floating-element float-1" style={{ top: '-15px', left: '-20px' }}>
                <div className="float-icon" style={{ background: 'rgba(230, 0, 0, 0.1)', color: 'var(--primary-red)' }}>
                  🍽️
                </div>
                <div className="float-info">
                  <span className="float-title">{language === 'es' ? 'Cocina & Paquetería' : 'Kitchen & Express'}</span>
                  <span className="float-val">{language === 'es' ? 'Mochila Térmica Activa' : 'Thermal Bag Active'}</span>
                </div>
              </div>

              <div className="floating-element float-2" style={{ bottom: '20px', right: '-20px' }}>
                <div className="float-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="float-info">
                  <span className="float-title">{t('hero.float_title')}</span>
                  <span className="float-val">{t('hero.float_val')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
