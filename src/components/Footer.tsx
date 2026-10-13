import React from 'react';
import './Footer.css';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo-pidelo-seguro.png';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-content-minimal">
          
          {/* Left Side: Brand */}
          <div className="footer-brand-minimal">
            <a href="#" className="footer-logo" id="footer-logo">
              <img 
                src={logoImg} 
                alt="Pidelo Seguro" 
                style={{ height: "36px", width: "36px", objectFit: "contain", borderRadius: "10px", display: "block" }} 
              />
              <span className="footer-logo-text">Pidelo Seguro</span>
            </a>
            <p className="footer-tagline">
              {language === 'es' ? 'Gestión y optimización de repartidores para tu negocio.' : 'Delivery fleet management and route optimization for your business.'}
            </p>
          </div>

          {/* Right Side: Links & Copyright */}
          <div className="footer-right-minimal">
            <div className="footer-links-minimal">
              <a href="#about" className="footer-link-min" id="footer-link-about">{language === 'es' ? 'Nosotros' : 'About Us'}</a>
              <a href="#contact" className="footer-link-min" id="footer-link-contact">{language === 'es' ? 'Contacto' : 'Contact'}</a>
              <a href="#privacy" className="footer-link-min" id="footer-link-privacy">{language === 'es' ? 'Privacidad' : 'Privacy'}</a>
            </div>
            
            <div className="footer-copyright-min">
              &copy; {new Date().getFullYear()} Pidelo Seguro. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
