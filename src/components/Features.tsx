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
            <span className="features-tag">Características • Despacho Automatizado</span>
            <h3 className="feature-info-title">Asignación express de comida caliente y paquetes</h3>
            <p className="feature-info-desc">
              Diseñado especialmente para el ritmo acelerado de tu cocina y negocio. Nuestro sistema despacha cada orden al instante justo cuando está lista, asegurando que tus platillos lleguen calientes a tus comensales, con la flexibilidad de transportar también paquetes o compras locales sin demoras.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Asignación automática en minutos</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Prioridad para comida caliente y repartidores con mochila térmica</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Versatilidad total: platillos de restaurante y paquetería local</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Dispatch Node */}
          <div className="feature-visual-panel">
            <div className="dispatch-visual">
              <div className="visual-node">
                <div className="visual-node-details">
                  <div className="node-icon-box" style={{ background: 'rgba(230, 0, 0, 0.1)', color: 'var(--primary-red)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="node-title">Orden de Restaurante #2045 (Hamburguesa & Bebida)</span>
                    <div className="node-subtitle">Listo en cocina • Av. Juárez 140 (Comida caliente o paquete)</div>
                  </div>
                </div>
                <span className="node-status-badge node-status-assigned">Listo en Cocina</span>
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
                    <span className="node-title">Motor Inteligente PideloSeguro</span>
                    <div className="node-subtitle">Localizando repartidor con mochila térmica más cercano...</div>
                  </div>
                </div>
              </div>

              <div className="dispatch-flow-line">
                <span className="flow-dot-animated"></span>
              </div>

              <div className="visual-node" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.04)' }}>
                <div className="visual-node-details">
                  <div className="node-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="18.5" cy="17.5" r="3.5"></circle>
                      <circle cx="5.5" cy="17.5" r="3.5"></circle>
                      <circle cx="15" cy="5" r="1"></circle>
                      <path d="M12 17.5V14l-3-3 4-3 2 3h2"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="node-title">Repartidor Asignado en 2s</span>
                    <div className="node-subtitle">Jesús Gómez (Mochila térmica • A 1.2 km de tu local)</div>
                  </div>
                </div>
                <span className="node-status-badge" style={{ background: '#10B981', color: '#FFFFFF' }}>En camino</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Gestor de flotilla / Broker dedicado */}
        <div className="feature-row reverse" id="brokers">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Características • Gestor de Flotilla (Broker)</span>
            <h3 className="feature-info-title">Un Broker dedicado a tu flotilla para entregas en tiempo y forma</h3>
            <p className="feature-info-desc">
              Tu restaurante o negocio nunca estará solo. Te asignamos un gestor logístico dedicado que supervisa en tiempo real cada viaje de tus repartidores, coordina rutas, atiende imprevistos viales y garantiza que cada platillo o paquete llegue puntual y en perfectas condiciones.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Supervisión activa de cada viaje de principio a fin</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Resolución inmediata de incidencias sin distraer a tu cocina</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Garantía de repartidores activos en horas pico y fines de semana</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Broker Console Mockup */}
          <div className="feature-visual-panel">
            <div className="broker-feature-card">
              <div className="broker-fc-header">
                <div className="broker-fc-profile">
                  <div className="broker-fc-avatar">
                    CM
                    <span className="broker-fc-online"></span>
                  </div>
                  <div className="broker-fc-info">
                    <h4>Carlos Mendoza</h4>
                    <span className="broker-fc-status">
                      <span className="broker-fc-pulse"></span>
                      Broker Asignado a tu Cuenta
                    </span>
                  </div>
                </div>
              </div>

              <div className="broker-fc-stats">
                <div>
                  <span className="broker-fc-stat-val">14</span>
                  <span className="broker-fc-stat-lbl">Viajes Activos</span>
                </div>
                <div>
                  <span className="broker-fc-stat-val">99.7%</span>
                  <span className="broker-fc-stat-lbl">A Tiempo</span>
                </div>
                <div>
                  <span className="broker-fc-stat-val">&lt; 40s</span>
                  <span className="broker-fc-stat-lbl">Resolución</span>
                </div>
              </div>

              <div className="broker-fc-feed">
                <div className="broker-fc-feed-item">
                  <span className="broker-fc-feed-icon">🛵</span>
                  <div>
                    <p className="broker-fc-feed-text">Viaje #2048: Repartidor en ruta con comida caliente</p>
                    <span className="broker-fc-feed-sub">Ruta óptima verificada • Llegada en 4 min</span>
                  </div>
                </div>

                <div className="broker-fc-feed-item">
                  <span className="broker-fc-feed-icon">💬</span>
                  <div>
                    <p className="broker-fc-feed-text">Incidencia atendida por Broker</p>
                    <span className="broker-fc-feed-sub">Confirmó número de departamento en 30s sin demoras</span>
                  </div>
                </div>

                <div className="broker-fc-feed-item">
                  <span className="broker-fc-feed-icon">⚡</span>
                  <div>
                    <p className="broker-fc-feed-text">Flotilla balanceada para hora pico</p>
                    <span className="broker-fc-feed-sub">4 repartidores listos en la zona de tu negocio</span>
                  </div>
                </div>
              </div>

              <div className="broker-fc-footer">
                <div className="broker-fc-badge">
                  <span style={{ color: '#10B981' }}>✓</span>
                  <span>Soporte directo por WhatsApp o llamada</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: El cliente estará en contacto con el repartidor */}
        <div className="feature-row" id="live-tracking">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Características • Comunicación con el Cliente</span>
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
                    <span className="logo-dot" style={{ color: 'var(--primary-red)', fontSize: '14px' }}>●</span>
                    <span style={{ fontSize: '12px', fontWeight: '700' }}>Seguimiento en Vivo</span>
                  </div>
                </div>
                
                <div className="chat-bubble-container">
                  <div className="chat-bubble driver">
                    ¡Hola! Tu pedido acaba de salir de cocina en mochila térmica y va en camino.
                  </div>
                  <div className="chat-bubble customer">
                    ¡Perfecto, muchas gracias! Ya te espero en la entrada.
                  </div>
                </div>

                <div className="tracking-driver-capsule">
                  <div className="tracking-driver-avatar">JG</div>
                  <div className="tracking-driver-info">
                    <span className="tracking-driver-name">Jesús Gómez</span>
                    <span className="tracking-driver-vehicle">Mochila Térmica • Entrega Rápida</span>
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

        {/* SECTION 4: Gestión de pedidos, entregas, POS, inventario y más */}
        <div className="feature-row reverse" id="reports">
          {/* Left Info */}
          <div className="feature-info">
            <span className="features-tag">Características • Control Total de tu Negocio</span>
            <h3 className="feature-info-title">Gestiona pedidos, entregas, punto de venta, inventario y más</h3>
            <p className="feature-info-desc">
              Centraliza toda la operación de tu negocio en una sola plataforma. Administra comandas en cocina o mostrador, cobra con punto de venta integrado (POS), controla tus existencias de inventario en tiempo real y supervisa tus repartidores sin complicaciones.
            </p>
            <ul className="feature-bullet-list">
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Control de pedidos y entregas en tiempo real</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Punto de venta (POS) y cobros de mostrador</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Control de inventario e insumos sin desfases</span>
              </li>
              <li className="feature-bullet-item">
                <div className="feature-bullet-icon">✓</div>
                <span className="feature-bullet-text">Métricas operativas y reportes de rendimiento</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Layout: Analytics & POS / Inventory dashboard */}
          <div className="feature-visual-panel">
            <div className="report-visual-dashboard">
              <div className="report-header-row">
                <span className="report-header-title">Panel Operativo de Negocio</span>
                <span className="report-timeframe">En vivo</span>
              </div>
              
              <div className="report-metrics-row">
                <div className="report-metric-card">
                  <div className="report-metric-val">148</div>
                  <div className="report-metric-lbl">Pedidos y POS hoy</div>
                </div>
                <div className="report-metric-card">
                  <div className="report-metric-val">99.2%</div>
                  <div className="report-metric-lbl">Inventario al 100%</div>
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
