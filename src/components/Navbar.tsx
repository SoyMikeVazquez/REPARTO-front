import React, { useState, useEffect } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

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
            <img src="/logo-pideloseguro.png" alt="PideloSeguro" style={{ height: "40px", objectFit: "contain" }} />
          </a>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="navbar-links">
              <li className="navbar-item">
                <span className="navbar-link" id="nav-link-solutions">
                  Soluciones
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="nav-dropdown">
                  <a href="#restaurants" className="dropdown-link" id="nav-sol-restaurants">
                    <span className="dropdown-title">Restaurantes</span>
                    <span className="dropdown-desc">Despacha comida caliente más rápido y gestiona tus propios repartidores.</span>
                  </a>
                  <a href="#ecommerce" className="dropdown-link" id="nav-sol-ecommerce">
                    <span className="dropdown-title">E-commerce</span>
                    <span className="dropdown-desc">Envía productos al instante y automatiza la confirmación de entrega.</span>
                  </a>
                  <a href="#couriers" className="dropdown-link" id="nav-sol-couriers">
                    <span className="dropdown-title">Empresas Courier</span>
                    <span className="dropdown-desc">Optimiza tus flotas y rutas de distribución local a gran escala.</span>
                  </a>
                </div>
              </li>

              <li className="navbar-item">
                <span className="navbar-link" id="nav-link-features">
                  Funcionalidades
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="nav-dropdown">
                  <a href="#dispatch" className="dropdown-link" id="nav-feat-dispatch">
                    <span className="dropdown-title">Asignación Rápida</span>
                    <span className="dropdown-desc">Asignación y ruteo gestionado por los duseños de negocio.</span>
                  </a>
                  <a href="#driver-app" className="dropdown-link" id="nav-feat-driver">
                    <span className="dropdown-title">App Repartidores</span>
                    <span className="dropdown-desc">Navegación paso a paso, con control por código y hasta fotos de entrega.</span>
                  </a>
                  <a href="#live-tracking" className="dropdown-link" id="nav-feat-tracking">
                    <span className="dropdown-title">Seguimiento en Tiempo Real</span>
                    <span className="dropdown-desc">Brinda a tus clientes una experiencia de rastreo.</span>
                  </a>
                </div>
              </li>


            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <a href="https://dashboard.pideloseguro.mx " className="btn-login" id="btn-login-desktop">Iniciar Sesión</a>
            <a href="https://dashboard.pideloseguro.mx" className="btn btn-primary" id="btn-signup-desktop">Crear cuenta gratis</a>
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
              <span>Soluciones</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: activeMobileDropdown === 'solutions' ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {activeMobileDropdown === 'solutions' && (
              <div className="drawer-sublinks">
                <a href="#restaurants" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-sol-rest">Restaurantes</a>
                <a href="#ecommerce" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-sol-ecom">E-commerce</a>
                <a href="#couriers" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-sol-cour">Empresas Courier</a>
              </div>
            )}
          </div>

          <div className="drawer-item">
            <div className="drawer-link" onClick={() => toggleMobileDropdown('features')} id="drawer-feat-toggle">
              <span>Funcionalidades</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: activeMobileDropdown === 'features' ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {activeMobileDropdown === 'features' && (
              <div className="drawer-sublinks">
                <a href="#dispatch" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-feat-disp">Despacho Automático</a>
                <a href="#driver-app" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-feat-driv">App Repartidores</a>
                <a href="#live-tracking" onClick={() => setIsMobileOpen(false)} className="drawer-sublink" id="drawer-feat-track">Seguimiento en Vivo</a>
              </div>
            )}
          </div>


        </div>

        <div className="drawer-actions">
          <a href="https://dashboard.pideloseguro.mx" onClick={() => setIsMobileOpen(false)} className="btn btn-outline" id="drawer-btn-login">Iniciar Sesión</a>
          <a href="https://dashboard.pideloseguro.mx" onClick={() => setIsMobileOpen(false)} className="btn btn-primary" id="drawer-btn-signup">Crear cuenta gratis</a>
        </div>
      </div>

      {isMobileOpen && <div className="drawer-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  );
};
