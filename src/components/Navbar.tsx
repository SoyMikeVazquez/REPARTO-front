import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo-pidelo-seguro.png';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (name: string) => {
    if (activeMobileDropdown === name) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(name);
    }
  };

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo" id="nav-logo">
            <img 
              src={logoImg} 
              alt="Pidelo Seguro" 
              style={{ height: "40px", width: "40px", objectFit: "contain", borderRadius: "10px", display: "block" }} 
            />
            <span className="navbar-logo-text">Pidelo Seguro</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="navbar-links">
              <li className="navbar-item">
                <span className="navbar-link" id="nav-link-solutions">
                  {t('nav.solutions')}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="nav-dropdown">
                  <a href="#restaurants" className="dropdown-link" id="nav-sol-restaurants">
                    <span className="dropdown-title">{t('nav.restaurants')}</span>
                    <span className="dropdown-desc">{t('nav.restaurants_desc')}</span>
                  </a>
                  <a href="#ecommerce" className="dropdown-link" id="nav-sol-ecommerce">
                    <span className="dropdown-title">{t('nav.ecommerce')}</span>
                    <span className="dropdown-desc">{t('nav.ecommerce_desc')}</span>
                  </a>
                  <a href="#couriers" className="dropdown-link" id="nav-sol-couriers">
                    <span className="dropdown-title">{t('nav.couriers')}</span>
                    <span className="dropdown-desc">{t('nav.couriers_desc')}</span>
                  </a>
                </div>
              </li>

              <li className="navbar-item">
                <span className="navbar-link" id="nav-link-features">
                  {t('nav.features')}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="nav-dropdown">
                  <a href="#dispatch" className="dropdown-link" id="nav-feat-dispatch">
                    <span className="dropdown-title">{t('nav.dispatch')}</span>
                    <span className="dropdown-desc">{t('nav.dispatch_desc')}</span>
                  </a>
                  <a href="#driver-app" className="dropdown-link" id="nav-feat-driver">
                    <span className="dropdown-title">{t('nav.driver_app')}</span>
                    <span className="dropdown-desc">{t('nav.driver_app_desc')}</span>
                  </a>
                  <a href="#live-tracking" className="dropdown-link" id="nav-feat-tracking">
                    <span className="dropdown-title">{t('nav.tracking')}</span>
                    <span className="dropdown-desc">{t('nav.tracking_desc')}</span>
                  </a>
                </div>
              </li>

              {/* Dedicated Brokers Link */}
              <li className="navbar-item">
                <a href="#brokers" className="navbar-link" id="nav-link-brokers">
                  {t('nav.brokers')}
                </a>
              </li>

            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            {/* Language Switcher */}
            <div className="lang-toggle-wrapper">
              <button 
                type="button"
                className={`lang-btn ${language === 'es' ? 'active' : ''}`}
                onClick={() => setLanguage('es')}
                title="Español"
              >
                ES
              </button>
              <span className="lang-divider">|</span>
              <button 
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                title="English"
              >
                EN
              </button>
            </div>

            <a href="https://dashboard.pideloseguro.com" className="btn-login" id="btn-login-desktop">{t('nav.login')}</a>
            <a href="https://dashboard.pideloseguro.com" className="btn btn-primary" id="btn-signup-desktop">{t('nav.signup')}</a>
          </div>

          {/* Hamburger Mobile Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileOpen(!isMobileOpen)} 
            aria-label="Toggle Menu"
            id="mobile-toggle-button"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
        <div className="drawer-links">
          <div className="drawer-item">
            <div className="drawer-link" onClick={() => toggleMobileDropdown('solutions')} id="drawer-sol-toggle">
              <span>{t('nav.solutions')}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: activeMobileDropdown === 'solutions' ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {activeMobileDropdown === 'solutions' && (
              <div className="drawer-sublinks">
                <a href="#restaurants" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-sol-rest">{t('nav.restaurants')}</a>
                <a href="#ecommerce" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-sol-ecom">{t('nav.ecommerce')}</a>
                <a href="#couriers" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-sol-cour">{t('nav.couriers')}</a>
              </div>
            )}
          </div>

          <div className="drawer-item">
            <div className="drawer-link" onClick={() => toggleMobileDropdown('features')} id="drawer-feat-toggle">
              <span>{t('nav.features')}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: activeMobileDropdown === 'features' ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {activeMobileDropdown === 'features' && (
              <div className="drawer-sublinks">
                <a href="#dispatch" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-feat-disp">{t('nav.dispatch')}</a>
                <a href="#driver-app" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-feat-driv">{t('nav.driver_app')}</a>
                <a href="#live-tracking" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-feat-track">{t('nav.tracking')}</a>
              </div>
            )}
          </div>

          {/* Dedicated Brokers Mobile Link */}
          <div className="drawer-item">
            <a href="#brokers" onClick={() => setIsMobileOpen(false)} className="drawer-link" id="drawer-brokers-link">
              <span>{t('nav.brokers')}</span>
              <span className="nav-badge-pill">24/7</span>
            </a>
          </div>

        </div>

        <div className="drawer-actions">
          {/* Mobile Language Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div className="lang-toggle-wrapper">
              <button 
                type="button"
                className={`lang-btn ${language === 'es' ? 'active' : ''}`}
                onClick={() => setLanguage('es')}
              >
                Español (ES)
              </button>
              <span className="lang-divider">|</span>
              <button 
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                English (EN)
              </button>
            </div>
          </div>

          <a href="https://dashboard.pideloseguro.com" onClick={() => setIsMobileOpen(false)} className="btn btn-outline" id="drawer-btn-login">{t('nav.login')}</a>
          <a href="https://dashboard.pideloseguro.com" onClick={() => setIsMobileOpen(false)} className="btn btn-primary" id="drawer-btn-signup">{t('nav.signup')}</a>
        </div>
      </div>

      {isMobileOpen && <div className="drawer-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  );
};
