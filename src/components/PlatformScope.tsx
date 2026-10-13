import React from 'react';
import './PlatformScope.css';

export const PlatformScope: React.FC = () => {
  return (
    <section className="scope-section" id="capabilities">
      <div className="container">
        
        {/* Section Header */}
        <div className="scope-header">
          <span className="scope-tag">Versatilidad total para las entregas de tu negocio</span>
          <h2 className="scope-title">Una solución para cada necesidad de envío</h2>
          <p className="scope-desc">
            PideloSeguro.mx se adapta al trayecto, origen y destino de tus entregas. Una sola plataforma con infinitas posibilidades.
          </p>
        </div>

        {/* Scope Grid */}
        <div className="scope-grid">
          
          {/* Card 1: Multiorigen y Multidestino */}
          <div className="scope-card">
            <div className="scope-icon-box">📍</div>
            <h3 className="scope-card-title">Orígenes y Destinos Múltiples</h3>
            <p className="scope-card-desc">
              Solicita recolecciones en uno o varios puntos de partida de forma simultánea y programa entregas multitrayecto con optimización de secuencias viales para ahorrar tiempo y combustible.
            </p>
          </div>

          {/* Card 2: Dirigido a Todos */}
          <div className="scope-card">
            <div className="scope-icon-box">👥</div>
            <h3 className="scope-card-title">Diseñado para Todos</h3>
            <p className="scope-card-desc">
              Una plataforma tan flexible que se adapta a las necesidades de restaurantes consolidados, oficinas corporativas, tiendas en línea en crecimiento y mucho más.
            </p>
          </div>

          {/* Card 3: Tamaños y Traslados */}
          <div className="scope-card">
            <div className="scope-icon-box">✉️</div>
            <h3 className="scope-card-title">Envíos de Todo Tamaño</h3>
            <p className="scope-card-desc">
              Resuelve envíos básicos y urgentes. Nuestra plataforma gestiona desde un sobre de documentos, cajas de mercancías de gran volumen e incluso traslados seguros de personas en tu flota activa.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
