import React, { useState } from 'react';
import './PricingCalculator.css';

interface PlanDetails {
  name: string;
  price: string;
  perOrder: string;
  costValue: number;
  bullets: string[];
}

export const PricingCalculator: React.FC = () => {
  const [orders, setOrders] = useState<number>(300);

  // Compute plan details based on selected orders
  const getPlanDetails = (val: number): PlanDetails => {
    if (val <= 300) {
      return {
        name: 'Plan Gratuito',
        price: '$0',
        perOrder: '$0 MXN / envío',
        costValue: 0,
        bullets: [
          'Hasta 300 envíos mensuales sin costo',
          'Despacho automático básico',
          'Rastreo interactivo de cliente en vivo',
          'Hasta 2 repartidores activos'
        ]
      };
    } else if (val <= 1500) {
      return {
        name: 'Plan Crecimiento',
        price: '$990',
        perOrder: '$1.20 MXN por envío adicional',
        costValue: 990,
        bullets: [
          'Hasta 1,500 envíos incluidos al mes',
          'Repartidores activos ilimitados',
          'Prueba de entrega con firma y foto digital',
          'Integración nativa con Shopify y WooCommerce'
        ]
      };
    } else {
      return {
        name: 'Plan Pro',
        price: '$2,490',
        perOrder: '$0.80 MXN por envío adicional',
        costValue: 2490,
        bullets: [
          'Envíos ilimitados (sin cargos ocultos)',
          'Optimización avanzada de rutas multiflota',
          'Alertas SMS totalmente personalizadas',
          'Acceso a la API y soporte prioritario 24/7'
        ]
      };
    }
  };

  const plan = getPlanDetails(orders);

  // Calculate monthly savings
  // Average on-demand delivery app fee: $45 MXN per delivery
  // Saving formula: (orders * 45) - plan cost
  const calculatedSavings = (orders * 45) - plan.costValue;
  const formattedSavings = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(calculatedSavings);

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        
        {/* Section Header */}
        <div className="pricing-header">
          <span className="features-tag">Precios Justos</span>
          <h2 className="pricing-title">Calcula tu plan ideal</h2>
          <p className="pricing-desc">
            Olvídate de comisiones abusivas por envío. Con PideloSeguro.mx, gestionas tu propia flota de entregas a un precio fijo y transparente.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="pricing-grid">
          
          {/* Slider and Plan summary */}
          <div className="calculator-card">
            
            {/* Slider Control */}
            <div className="slider-container">
              <div className="slider-header">
                <span className="slider-label">Envíos mensuales estimulados</span>
                <span className="slider-count" id="pricing-orders-display">
                  {orders >= 5000 ? '5,000+' : orders.toLocaleString('es-MX')} envíos
                </span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="100"
                value={orders}
                onChange={(e) => setOrders(parseInt(e.target.value))}
                className="custom-range"
                id="pricing-slider"
              />
              <div className="slider-ticks">
                <span>100</span>
                <span>1,500</span>
                <span>3,000</span>
                <span>5,000+</span>
              </div>
            </div>

            {/* Dynamic Plan details block */}
            <div className="plan-summary-box">
              <div className="plan-badge-row">
                <span className="plan-name-label">{plan.name}</span>
                <div className="badge badge-red">Sugerido</div>
              </div>
              
              <div>
                <span className="plan-price-val">{plan.price} MXN</span>
                <span className="plan-price-period"> / mes</span>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  {plan.perOrder}
                </div>
              </div>

              <ul className="plan-bullets">
                {plan.bullets.map((bullet, idx) => (
                  <li key={idx} className="plan-bullet">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Side: Savings Card (Dark visual appeal) */}
          <div className="savings-card">
            <div className="savings-header">
              <span className="savings-tag">Tu Ahorro Estimado</span>
              <h3 className="savings-title">PideloSeguro.mx vs Apps de Delivery On-Demand</h3>
            </div>

            <div className="savings-amount-box">
              <div className="savings-amount" id="pricing-savings-display">
                {formattedSavings}
              </div>
              <span className="savings-amount-desc">pesos ahorrados mensualmente</span>
            </div>

            <p className="savings-explanation">
              Utilizar repartidores propios apoyados por la tecnología de ruteo de <strong>PideloSeguro.mx</strong> reduce tu costo logístico de $45 MXN promedio por pedido a solo centavos. Esto incrementa de inmediato tus márgenes de ganancia.
            </p>

            <a href="#signup" className="btn btn-primary" style={{ marginTop: '24px', width: '100%' }} id="pricing-cta-button">
              Comenzar a Ahorrar Ahora
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
