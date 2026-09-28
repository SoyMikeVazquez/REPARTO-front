import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-content-minimal">
          
          {/* Left Side: Brand */}
          <div className="footer-brand-minimal">
            <a href="#" className="footer-logo" id="footer-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#E53E3E" />
                <path d="M17 7L9 17H16L15 25L23 15H16L17 7Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>reparto<span style={{ color: '#E53E3E' }}>.mx</span></span>
            </a>
            <p className="footer-tagline">
              Gestión y optimización de repartidores locales.
            </p>
          </div>

          {/* Right Side: Links & Copyright */}
          <div className="footer-right-minimal">
            <div className="footer-links-minimal">
              <a href="#about" className="footer-link-min" id="footer-link-about">Nosotros</a>
              <a href="#contact" className="footer-link-min" id="footer-link-contact">Contacto</a>
              <a href="#privacy" className="footer-link-min" id="footer-link-privacy">Privacidad</a>
            </div>
            
            <div className="footer-copyright-min">
              &copy; {new Date().getFullYear()} Broker.com.mx. Todos los derechos reservados.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
