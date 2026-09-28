import React from 'react';
import './Hero.css';

export const Hero: React.FC = () => {

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Headline and Form */}
          <div className="hero-content animate-slide-in">
            <div className="hero-badge-container">
              <div className="hero-badge">
                <span className="hero-badge-tag">Nuevo</span>
                <span className="hero-badge-text">Software de Reparto y Optimización de Rutas</span>
              </div>
            </div>

            <h1 className="hero-title text-gradient">
              Gestiona, automatiza y asigna repartidores para entregar tus productos.
            </h1>

            <p className="hero-desc">
              La plataforma ideal para tu restaurante, e-commerce y negocio local, dale mayor confianza a tus clientes con un seguimiento en tiempo real.
            </p>

            <div className="hero-form-wrapper">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#signup" className="btn btn-primary" id="cta-hero-start" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  Comenzar Ahora
                </a>
                <a href="#features" className="btn btn-outline" id="cta-hero-features" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  Ver Funciones
                </a>
              </div>

              <div className="hero-form-footer">
                <div className="hero-form-footer-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Rutas optimizadas en tiempo real</span>
                </div>
                <div className="hero-form-footer-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Implementación rápida y sencilla</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Restaurant Chef looking at phone */}
          <div className="hero-mockup-wrapper animate-float">
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
              <img 
                src="/chef_restaurant_delivery.png" 
                alt="Chef de restaurante gestionando entregas con reparto.mx en su celular" 
                style={{ 
                  width: '100%', 
                  borderRadius: '20px', 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  border: '1px solid var(--light-border)',
                  display: 'block' 
                }} 
              />
              
              <div className="floating-element float-2" style={{ bottom: '20px', right: '-20px' }}>
                <div className="float-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="float-info">
                  <span className="float-title">Pedidos de Hoy</span>
                  <span className="float-val">100% Entregados</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
