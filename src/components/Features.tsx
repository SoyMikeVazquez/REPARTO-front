import React from 'react';
import './Features.css';

export const Features: React.FC = () => {
  return (
    <section className="features-section" id="features">
      <div className="container">

        {/* SECTION 1: Asignación automática y despacho sin fricciones */}
        <div className="feature-row" id="dispatch">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Paso 1: Despacho</span>
            <h3 className="feature-info-title">Asignación automática y despacho sin fricciones</h3>
            <p className="feature-info-desc">
              Optimiza tus operaciones y reduce el trabajo administrativo. Nuestro sistema de ruteo analiza la ubicación, capacidad y carga de trabajo de tus repartidores para despachar cada pedido al instante.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Asignación automática en menos de 2 segundos</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Agrupación inteligente de órdenes en la misma zona</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Reducción total de tiempos muertos en despacho</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Dispatch Node */}
          <div className="feature-visual-panel">
            <div className="dispatch-visual">
              <div className="visual-node">
                <div className="visual-node-details">
                  <div className="node-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div>
                    <span className="node-title">Orden Entrante #2045</span>
                    <div className="node-subtitle">Dirección: Av. Juárez 140</div>
                  </div>
                </div>
                <span className="node-status-badge node-status-assigned">Recibido</span>
              </div>

              <div className="dispatch-flow-line">
                <span className="flow-dot-animated"></span>
              </div>

              <div className="visual-node">
                <div className="visual-node-details">
                  <div className="node-icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                    </svg>
                  </div>
                  <div>
                    <span className="node-title">Motor PideloSeguro.mx</span>
                    <div className="node-subtitle">Buscando conductor más cercano...</div>
                  </div>
                </div>
              </div>

              <div className="dispatch-flow-line">
                <span className="flow-dot-animated"></span>
              </div>

              <div className="visual-node" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.04)' }}>
                <div className="visual-node-details">
                  <div className="node-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <span className="node-title">Conductor Asignado</span>
                    <div className="node-subtitle">Jesús Gómez (A 1.2 km de distancia)</div>
                  </div>
                </div>
                <span className="node-status-badge" style={{ background: '#10B981', color: '#FFFFFF' }}>Despachado</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Visualización de cómo el repartidor va en tiempo real */}
        <div className="feature-row reverse" id="driver-app">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Paso 2: Ruta</span>
            <h3 className="feature-info-title">Visualización de cómo el repartidor va en tiempo real</h3>
            <p className="feature-info-desc">
              Otorga a tus repartidores las mejores herramientas para navegar la ciudad. Nuestra interfaz de ruteo traza el camino exacto, evitando congestión vial y optimizando la secuencia de paradas de entrega.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Navegación fluida y cálculo de ruta rápido</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Indicaciones de calles y puntos de entrega</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Rastreo de velocidad y GPS activo en mapa</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Driver app simulation path offset */}
          <div className="feature-visual-panel">
            <div className="phone-emulator">
              <div className="phone-screen">
                <div className="phone-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  <span className="phone-header-title">En Ruta</span>
                </div>
                <div className="driver-map-bg">
                  {/* Banner Instruction */}
                  <div className="nav-instruction-banner">
                    <span className="nav-direction-arrow">↑</span>
                    <span className="nav-direction-text">A 200m gira a la derecha en Av. Reforma</span>
                  </div>

                  {/* SVG Paths for Roads */}
                  <svg className="nav-path-svg">
                    <path d="M 40 260 L 120 260 L 120 140 L 220 140" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M 40 260 L 120 260 L 120 140 L 180 140" stroke="rgba(229, 62, 62, 0.4)" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>

                  {/* Pin Destination */}
                  <div className="nav-destination-marker">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>

                  {/* Animated Driver Pin moving along path */}
                  <div className="nav-driver-marker-animated"></div>

                  {/* Floating ETA */}
                  <div className="nav-floating-eta">
                    <span>ETA: 8 min</span>
                    <span style={{ color: '#E53E3E' }}>1.4 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: El cliente estará en contacto con el repartidor */}
        <div className="feature-row" id="live-tracking">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Paso 3: Cliente</span>
            <h3 className="feature-info-title">El cliente estará en contacto con el repartidor</h3>
            <p className="feature-info-desc">
              Mejora la satisfacción del cliente. PideloSeguro.mx envía un enlace interactivo de seguimiento donde el cliente final chatea en vivo con el repartidor, eliminando dudas y facilitando la recepción de su paquete.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Canal de chat directo cliente-repartidor</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Calificación y comentarios inmediatos</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Instrucciones de entrega y notas de ubicación</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Customer Tracking Chat Screen */}
          <div className="feature-visual-panel">
            <div className="phone-emulator">
              <div className="phone-screen phone-screen-tracking">
                <div className="tracking-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="logo-dot" style={{ color: '#E53E3E', fontSize: '14px' }}>●</span>
                    <span style={{ fontSize: '12px', fontWeight: '700' }}>Seguimiento en Vivo</span>
                  </div>
                </div>
                
                <div className="chat-bubble-container">
                  <div className="chat-bubble driver">
                    ¡Hola! Ya voy llegando con tu paquete a tu domicilio.
                  </div>
                  <div className="chat-bubble customer">
                    ¡Excelente, muchas gracias! Ya te espero en la entrada.
                  </div>
                </div>

                <div className="tracking-driver-capsule">
                  <div className="tracking-driver-avatar">JG</div>
                  <div className="tracking-driver-info">
                    <span className="tracking-driver-name">Jesús Gómez</span>
                    <span className="tracking-driver-vehicle">Bicicleta Eléctrica</span>
                  </div>
                  <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Reportes detallados de tus entregas */}
        <div className="feature-row reverse" id="reports">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Paso 4: Análisis</span>
            <h3 className="feature-info-title">Reportes detallados de tus entregas</h3>
            <p className="feature-info-desc">
              Toma decisiones respaldadas por datos. PideloSeguro.mx recopila métricas operativas clave para que conozcas la eficiencia de tus conductores, el volumen de pedidos diarios y la satisfacción de tus clientes.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Volumen de envíos semanales y mensuales</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Tiempos promedio de entrega y distancia recorrida</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Porcentaje de éxito y satisfacción del cliente</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Analytics report chart */}
          <div className="feature-visual-panel">
            <div className="report-visual-dashboard">
              <div className="report-header-row">
                <span className="report-header-title">Eficiencia de Envíos</span>
                <span className="report-timeframe">Esta semana</span>
              </div>
              
              <div className="report-metrics-row">
                <div className="report-metric-card">
                  <div className="report-metric-val">98.4%</div>
                  <div className="report-metric-lbl">Entregas a tiempo</div>
                </div>
                <div className="report-metric-card">
                  <div className="report-metric-val">18 min</div>
                  <div className="report-metric-lbl">Tiempo prom.</div>
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-bar-col">
                  <div className="chart-bar-fill" style={{ height: '70px' }}></div>
                  <span className="chart-bar-label">Lun</span>
                </div>
                <div className="chart-bar-col">
                  <div className="chart-bar-fill" style={{ height: '85px' }}></div>
                  <span className="chart-bar-label">Mar</span>
                </div>
                <div className="chart-bar-col">
                  <div className="chart-bar-fill" style={{ height: '110px' }}></div>
                  <span className="chart-bar-label">Mié</span>
                </div>
                <div className="chart-bar-col">
                  <div className="chart-bar-fill" style={{ height: '95px' }}></div>
                  <span className="chart-bar-label">Jue</span>
                </div>
                <div className="chart-bar-col">
                  <div className="chart-bar-fill" style={{ height: '120px' }}></div>
                  <span className="chart-bar-label">Vie</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
