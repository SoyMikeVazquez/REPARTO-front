import React, { useState } from 'react';
import './BusinessTypeSelector.css';

type BusinessType = 'restaurante' | 'comida_rapida' | 'ecommerce' | 'tienda_fisica';

interface AdvantageDetails {
  title: string;
  description: string;
  icon: string;
}

export const BusinessTypeSelector: React.FC = () => {
  const [selectedType, setSelectedType] = useState<BusinessType>('restaurante');

  // Content for cards based on chosen business type
  const getAdvantages = (type: BusinessType): AdvantageDetails[] => {
    switch (type) {
      case 'restaurante':
        return [
          {
            title: 'Reseñas en Google',
            description: 'incentivaremos a que los usuarios pongan más reseñas en tu negocio, esto permite que tengás aún más clientes',
            icon: '⭐'
          },
          {
            title: 'Automatiza entregas',
            description: 'El sistema calcula rutas óptimas y despacha de inmediato el pedido de alimentos al conductor idóneo más cercano.',
            icon: '🛵'
          },
          {
            title: 'Conteo exitoso de clientes',
            description: 'Mantén un registro automatizado de tus comensales frecuentes, ubicaciones recurrentes y platillos preferidos.',
            icon: '📊'
          }
        ];
      case 'comida_rapida':
        return [
          {
            title: 'Reseñas en Google',
            description: 'incentivaremos a que los usuarios pongan más reseñas en tu negocio, esto permite que tengás aún más clientes',
            icon: '⚡'
          },
          {
            title: 'Automatiza entregas',
            description: 'Despacha decenas de órdenes simultáneamente en tus horas pico y fines de semana sin retrasos ni errores humanos.',
            icon: '⏱️'
          },
          {
            title: 'Conteo exitoso de clientes',
            description: 'Monitorea la retención y recompensa a tus clientes más fieles según su frecuencia de pedidos a domicilio.',
            icon: '📈'
          }
        ];
      case 'ecommerce':
        return [
          {
            title: 'Seguimiento en tiempo real',
            description: 'Optimo para aquellas empresas que quieren llevar sus productos en línea a clientes que viven cerca del ecommerce',
            icon: '📦'
          },
          {
            title: 'Gestiona tus entregas',
            description: 'Ya que tu negocio es digital, puedes gestionar tus entregas desde nuestro software, en donde tu tienes el controls',
            icon: '💻'
          },
          {
            title: 'Conteo exitoso de clientes',
            description: 'Conoce los hábitos de compra, frecuencia y zonas geográficas de mayor demanda de tu tienda online.',
            icon: '🎯'
          }
        ];
      case 'tienda_fisica':
        return [
          {
            title: 'Reseñas en Google',
            description: 'Invita a los compradores a calificar la velocidad y amabilidad del servicio de entrega a domicilio en Google Maps.',
            icon: '🏬'
          },
          {
            title: 'Automatiza entregas',
            description: 'Despacha compras realizadas en mostrador directo a la casa del cliente al momento de pagar en caja.',
            icon: '🎁'
          },
          {
            title: 'Conteo exitoso de clientes',
            description: 'Lleva el control exacto de entregas completadas con firma digital, asegurando la satisfacción en cada domicilio.',
            icon: '👥'
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
          <h2 className="business-title">Seleccionar el tipo de negocio que tienes</h2>
        </div>

        {/* Business Tabs Pill Row */}
        <div className="business-tabs-row">
          <button 
            className={`business-tab-pill ${selectedType === 'restaurante' ? 'active' : ''}`}
            onClick={() => setSelectedType('restaurante')}
            id="biz-tab-restaurante"
          >
            Restaurante
          </button>
          
          <button 
            className={`business-tab-pill ${selectedType === 'comida_rapida' ? 'active' : ''}`}
            onClick={() => setSelectedType('comida_rapida')}
            id="biz-tab-comida-rapida"
          >
            Comida Rápida
          </button>
          
          <button 
            className={`business-tab-pill ${selectedType === 'ecommerce' ? 'active' : ''}`}
            onClick={() => setSelectedType('ecommerce')}
            id="biz-tab-ecommerce"
          >
            E-commerce
          </button>
          
          <button 
            className={`business-tab-pill ${selectedType === 'tienda_fisica' ? 'active' : ''}`}
            onClick={() => setSelectedType('tienda_fisica')}
            id="biz-tab-tienda-fisica"
          >
            Tienda Física
          </button>
        </div>

        {/* Advantages Container */}
        <div className="advantages-container">
          <h3 className="advantages-title-text">Ventajas del servicio</h3>
          
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
