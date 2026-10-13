import React, { useState } from 'react';
import './BusinessTypeSelector.css';
import { useLanguage } from '../context/LanguageContext';

type BusinessType = 'restaurante' | 'comida_rapida' | 'ecommerce' | 'tienda_fisica';

interface AdvantageDetails {
  title: string;
  description: string;
  icon: string;
}

export const BusinessTypeSelector: React.FC = () => {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<BusinessType>('restaurante');

  // Content for cards based on chosen business type and language
  const getAdvantages = (type: BusinessType): AdvantageDetails[] => {
    if (language === 'en') {
      switch (type) {
        case 'restaurante':
          return [
            {
              title: 'Manage with your point of sale',
              description: 'Sync kitchen orders and counter sales with your POS to collect payments and dispatch delivery orders without manual errors.',
              icon: '🖥️'
            },
            {
              title: 'Your Broker manages orders with their courier fleet',
              description: 'Your assigned Broker supervises every delivery in real time so hot meals arrive on time, intact, and in optimal conditions.',
              icon: '🛵'
            },
            {
              title: 'Revenue & income management',
              description: 'Track daily sales, register cash flows, cash-on-delivery reconciliations, and transparent profit reports without unfair commissions.',
              icon: '📊'
            }
          ];
        case 'comida_rapida':
          return [
            {
              title: 'Manage with your point of sale',
              description: 'Speed up counter billing and route orders straight to prep stations and couriers to handle high peak-hour volume.',
              icon: '⚡'
            },
            {
              title: 'Your Broker manages orders with their courier fleet',
              description: 'Your Broker balances and coordinates couriers during rush hours and weekends to eliminate bottlenecks.',
              icon: '🛵'
            },
            {
              title: 'Revenue & income management',
              description: 'Automatic shift closings, register audits, and clear profitability analytics on every delivered combo or item.',
              icon: '📊'
            }
          ];
        case 'ecommerce':
          return [
            {
              title: 'Manage with your point of sale',
              description: 'Connect online orders and storefront sales into one unified checkout and inventory management panel.',
              icon: '💻'
            },
            {
              title: 'Your Broker manages orders with their courier fleet',
              description: 'Your Broker schedules warehouse pickups and assigns nearby couriers for express same-day drop-offs.',
              icon: '📦'
            },
            {
              title: 'Revenue & income management',
              description: 'Full oversight of net sales revenue, shipping margins, average basket size, and automated financial settlements.',
              icon: '📊'
            }
          ];
        case 'tienda_fisica':
          return [
            {
              title: 'Manage with your point of sale',
              description: 'Ring up purchases at checkout and offer customers instant home delivery right from your POS terminal.',
              icon: '🏪'
            },
            {
              title: 'Your Broker manages orders with their courier fleet',
              description: 'Your Broker coordinates couriers to bring in-store purchases and local packages directly to your customers\' doorsteps.',
              icon: '🛵'
            },
            {
              title: 'Revenue & income management',
              description: 'Consolidate counter revenue and delivery earnings in a single account with transparent daily reconciliation.',
              icon: '📊'
            }
          ];
      }
    }

    // Default: Spanish
    switch (type) {
      case 'restaurante':
        return [
          {
            title: 'Gestiona con tu punto de venta',
            description: 'Sincroniza comandas de mostrador y cocina con tu punto de venta (POS) para cobrar y enviar pedidos a domicilio sin errores ni doble captura.',
            icon: '🖥️'
          },
          {
            title: 'Tu Broker gestiona tus pedidos con su flotilla de repartidores',
            description: 'Tu gestor logístico dedicado supervisa en tiempo real cada viaje de los repartidores para que tus platillos lleguen calientes, a tiempo y en forma.',
            icon: '🛵'
          },
          {
            title: 'Gestión de ingresos',
            description: 'Monitorea tus ventas diarias, cobros en mostrador, pagos contra entrega y balance financiero con total transparencia y sin comisiones abusivas.',
            icon: '📊'
          }
        ];
      case 'comida_rapida':
        return [
          {
            title: 'Gestiona con tu punto de venta',
            description: 'Cobra ágilmente en caja y despacha comandas de inmediato a cocina y repartidores para despachar decenas de órdenes por hora.',
            icon: '⚡'
          },
          {
            title: 'Tu Broker gestiona tus pedidos con su flotilla de repartidores',
            description: 'Tu Broker coordina y balancea a los repartidores en tus horarios pico y fines de semana para evitar demoras y saturaciones.',
            icon: '🛵'
          },
          {
            title: 'Gestión de ingresos',
            description: 'Cortes de caja por turno, control de efectivo recibido y reportes detallados del rendimiento económico de cada orden.',
            icon: '📊'
          }
        ];
      case 'ecommerce':
        return [
          {
            title: 'Gestiona con tu punto de venta',
            description: 'Unifica tus pedidos de tienda digital y ventas físicas en un solo panel de cobro, salida de mercancía e inventario.',
            icon: '💻'
          },
          {
            title: 'Tu Broker gestiona tus pedidos con su flotilla de repartidores',
            description: 'Tu Broker organiza recolecciones en tus bodegas y asigna repartidores para entregas express el mismo día.',
            icon: '📦'
          },
          {
            title: 'Gestión de ingresos',
            description: 'Supervisa tus entradas de dinero netas, costo por envío, ticket promedio y balances financieros en tiempo real.',
            icon: '📊'
          }
        ];
      case 'tienda_fisica':
        return [
          {
            title: 'Gestiona con tu punto de venta',
            description: 'Cobra en caja y ofrece a tus compradores servicio de entrega a domicilio directo desde tu terminal de punto de venta.',
            icon: '🏪'
          },
          {
            title: 'Tu Broker gestiona tus pedidos con su flotilla de repartidores',
            description: 'Tu Broker asigna conductores cercanos para llevar las compras y paquetes de tus clientes hasta su puerta sin fricciones.',
            icon: '🛵'
          },
          {
            title: 'Gestión de ingresos',
            description: 'Visualiza tus ventas de mostrador e ingresos por envíos en un solo reporte con arqueo de caja exacto y transparente.',
            icon: '📊'
          }
        ];
    }
  };

  const advantages = getAdvantages(selectedType);

  return (
    <section className="business-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="business-header">
          <h2 className="business-title">
            {language === 'es' ? 'Seleccionar el tipo de negocio que tienes' : 'Select your type of business'}
          </h2>
        </div>

        {/* Business Tabs Pill Row */}
        <div className="business-tabs-row">
          <button 
            className={`business-tab-pill ${selectedType === 'restaurante' ? 'active' : ''}`}
            onClick={() => setSelectedType('restaurante')}
            id="biz-tab-restaurante"
          >
            {language === 'es' ? 'Restaurante' : 'Restaurant'}
          </button>
          
          <button 
            className={`business-tab-pill ${selectedType === 'comida_rapida' ? 'active' : ''}`}
            onClick={() => setSelectedType('comida_rapida')}
            id="biz-tab-comida-rapida"
          >
            {language === 'es' ? 'Comida Rápida' : 'Fast Food'}
          </button>
          
          <button 
            className={`business-tab-pill ${selectedType === 'ecommerce' ? 'active' : ''}`}
            onClick={() => setSelectedType('ecommerce')}
            id="biz-tab-ecommerce"
          >
            {language === 'es' ? 'E-commerce' : 'E-commerce'}
          </button>
          
          <button 
            className={`business-tab-pill ${selectedType === 'tienda_fisica' ? 'active' : ''}`}
            onClick={() => setSelectedType('tienda_fisica')}
            id="biz-tab-tienda-fisica"
          >
            {language === 'es' ? 'Tienda Física' : 'Retail Store'}
          </button>
        </div>

        {/* Advantages Container */}
        <div className="advantages-container">
          <h3 className="advantages-title-text">
            {language === 'es' ? 'Beneficios' : 'Service Advantages'}
          </h3>
          
          <div className="advantages-grid-minimal">
            {advantages.map((adv, idx) => (
              <div className="advantage-card-min animate-slide-in" key={`${selectedType}-${idx}`}>
                <div className="advantage-icon-box">{adv.icon}</div>
                <h4 className="advantage-card-title">{adv.title}</h4>
                <p className="advantage-card-desc">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
