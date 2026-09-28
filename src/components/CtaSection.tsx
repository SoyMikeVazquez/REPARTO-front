import React from 'react';
import './CtaSection.css';

export const CtaSection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Empecemos hoy mismo</h2>
        <p className="cta-desc">
          Únete a nuestro programa y empieza a gestionar las entregas de tu negocio, más económico que aplicaciones convencionales y tú tienes total control.
        </p>
        <div className="cta-btn-wrapper">
          <a href="#signup" className="btn btn-primary" id="cta-bottom-button" style={{ padding: '16px 40px', fontSize: '16px' }}>
            Comenzar Ahora
          </a>
        </div>
      </div>
    </section>
  );
};
