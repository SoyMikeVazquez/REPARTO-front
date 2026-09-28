import React from 'react';
import './DriverProcess.css';

export const DriverProcess: React.FC = () => {
  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="process-grid">
          
          {/* Left Column: Driver Onboarding Steps */}
          <div className="process-info">
            <span className="process-tag">Fácil y Rápido</span>
            <h2 className="process-title">El proceso de entrega, simplificado para tu equipo</h2>
            
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-details">
                  <span className="step-title">El repartidor se registra</span>
                  <p className="step-desc">Completa un formulario rápido con datos básicos de contacto e identificación.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-details">
                  <span className="step-title">Descarga la App de Reparto</span>
                  <p className="step-desc">Disponible sin costo para descargar directamente en sistemas iOS y Android.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-details">
                  <span className="step-title">¡Listo para dar servicio!</span>
                  <p className="step-desc">El repartidor enciende su disponibilidad y está listo para recibir pedidos en cualquier vehículo:</p>
                  <div className="vehicle-badges">
                    <span className="vehicle-badge">🛵 Motocicleta</span>
                    <span className="vehicle-badge">🚗 Automóvil</span>
                    <span className="vehicle-badge">🚲 Bicicleta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Business Catalog Menu Mockup */}
          <div className="interface-mockup-container">
            <div style={{ textAlign: 'left', maxWidth: '380px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="process-tag" style={{ color: '#10B981' }}>Tu Propia Interfaz</span>
              <h3 style={{ fontStyle: 'normal', fontWeight: '700', fontSize: '20px', color: 'var(--light-text-primary)', margin: 0 }}>Menú de productos personalizado</h3>
              <p style={{ fontSize: '14px', color: 'var(--light-text-secondary)', margin: 0, lineHeight: '1.5' }}>
                Tu negocio tendrá una interfaz web propia para que tus clientes personalicen sus pedidos y el sistema calcule la recolección automática hasta sus hogares.
              </p>
            </div>

            <div className="phone-emulator" style={{ height: '390px' }}>
              <div className="phone-screen phone-screen-menu">
                <div className="phone-menu-header">
                  <span className="phone-menu-brand">Tostipizza</span>
                  <span className="phone-menu-cart">🛒 (2)</span>
                </div>
                
                <div className="phone-menu-body">
                  <div className="menu-item-card">
                    <div className="menu-item-info">
                      <span className="menu-item-name">Tostipizza Especial</span>
                      <span className="menu-item-price">$165.00 MXN</span>
                    </div>
                    <button className="menu-item-add">+</button>
                  </div>

                  <div className="order-customize-box">
                    <span className="phone-label" style={{ fontWeight: 'bold' }}>Personalizar Pedido</span>
                    <div className="order-option-row">
                      <input type="checkbox" defaultChecked />
                      <span>Agregar salsa especial (+ $15.00)</span>
                    </div>
                    <div className="order-option-row">
                      <input type="checkbox" defaultChecked />
                      <span>Entregar sin contacto en puerta</span>
                    </div>
                  </div>

                  <div className="phone-menu-btn-red">
                    Confirmar y Enviar a Domicilio
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
