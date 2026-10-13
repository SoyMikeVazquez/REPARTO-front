import React from 'react';
import './SuccessStories.css';

export const SuccessStories: React.FC = () => {
  return (
    <section className="stories-section" id="stories">
      <div className="container">
        
        {/* Section Header */}
        <div className="stories-header">
          <span className="stories-tag">Impacto Real</span>
          <h2 className="stories-title">Casos de éxito de nuestros clientes</h2>
          <p className="stories-desc">
            Descubre cómo diversos negocios locales transformaron su servicio de entregas utilizando PideloSeguro.mx para gestionar su logística.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="stories-grid">
          
          {/* Card 1: Tostipizza */}
          <div className="story-card">
            <span className="story-metric">Reparto Propio</span>
            <h4 className="story-biz-name">Tostipizza</h4>
            <span className="story-biz-type">Pizzería</span>
            <p className="story-text">
              "Nos ayudó bastante en la gestión de nuestros repartidores. Ahora coordinamos los pedidos al instante y nos sale mucho más económico que usar las aplicaciones tradicionales."
            </p>
          </div>

          {/* Card 2: Tortas la Purísima */}
          <div className="story-card">
            <span className="story-metric">Ahorro de Comisiones</span>
            <h4 className="story-biz-name">Tortas la Purísima</h4>
            <span className="story-biz-type">Comida Rápida</span>
            <p className="story-text">
              "Tener control directo de las entregas es excelente. Dejamos de pagar las altas comisiones de apps externas y el reparto a domicilio se volvió un canal sumamente rentable."
            </p>
          </div>

          {/* Card 3: Antojería Santa Rosa */}
          <div className="story-card">
            <span className="story-metric">Control de Flota</span>
            <h4 className="story-biz-name">Antojería Santa Rosa</h4>
            <span className="story-biz-type">Antojitos Locales</span>
            <p className="story-text">
              "Coordinar las entregas solía ser caótico. Con la plataforma organizamos a nuestro equipo de repartidores sin esfuerzo y el costo logístico es una fracción de lo que nos cobraban antes."
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
