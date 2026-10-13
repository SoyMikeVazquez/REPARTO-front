import React from 'react';
import './DriverProcess.css';

export const DriverProcess: React.FC = () => {
  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="process-grid">
          
          {/* Left Column: Business Customization & Storefront */}
          <div className="process-info">
            <span className="process-tag">Tu Propia Tienda Digital</span>
            <h2 className="process-title">Personaliza tu página web, menú, precios y sucursales</h2>
            
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-details">
                  <span className="step-title">Tu página web con tu propia marca</span>
                  <p className="step-desc">
                    Obtén tu enlace web exclusivo. Personaliza tu logotipo, foto de portada, colores y descripción para que tus clientes reconozcan tu negocio al instante.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-details">
                  <span className="step-title">Menú digital, precios y catálogo al momento</span>
                  <p className="step-desc">
                    Sube tus platillos o productos con fotos, descripciones, variantes y extras personalizables. Modifica precios y promociones en tiempo real sin intermediarios ni comisiones abusivas.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-details">
                  <span className="step-title">Sucursales, contacto directo y WhatsApp</span>
                  <p className="step-desc">
                    Configura una o varias sucursales activas, tus zonas de cobertura de reparto y conecta tus botones de WhatsApp, llamada directa y redes sociales para que tus clientes ordenen sin fricción.
                  </p>
                  <div className="vehicle-badges">
                    <span className="vehicle-badge">🎨 Logo y Portada</span>
                    <span className="vehicle-badge">📋 Menú y Precios</span>
                    <span className="vehicle-badge">📍 Sucursales Activas</span>
                    <span className="vehicle-badge">💬 WhatsApp y Teléfono</span>
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
                Tu negocio tendrá una interfaz web propia para que tus clientes personalicen sus pedidos y el sistema calcule la recolección y entrega automática hasta sus hogares.
              </p>
            </div>

            <div className="phone-emulator" style={{ height: '390px' }}>
              <div className="phone-screen phone-screen-menu">
                <div className="phone-menu-header">
                  <span className="phone-menu-brand">Tostipizza • Menú Digital</span>
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
