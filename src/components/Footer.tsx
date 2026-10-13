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
              <img src="/logo-pideloseguro.png" alt="PideloSeguro" style={{ height: "32px", objectFit: "contain", marginBottom: "8px" }} />
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
