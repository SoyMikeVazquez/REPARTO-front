import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    'nav.solutions': 'Soluciones',
    'nav.restaurants': 'Restaurantes',
    'nav.restaurants_desc': 'Despacha comida caliente más rápido y gestiona tus propios repartidores.',
    'nav.ecommerce': 'E-commerce',
    'nav.ecommerce_desc': 'Envía productos al instante y automatiza la confirmación de entrega.',
    'nav.couriers': 'Empresas Courier',
    'nav.couriers_desc': 'Optimiza tus flotas y rutas de distribución local a gran escala.',
    'nav.features': 'Funcionalidades',
    'nav.dispatch': 'Asignación Rápida',
    'nav.driver_app': 'Tienda Web & Menú',
    'nav.driver_app_desc': 'Personaliza tu página web, catálogo de productos y precios al instante.',
    'nav.tracking': 'Seguimiento en Tiempo Real',
    'nav.tracking_desc': 'Brinda a tus clientes una experiencia de rastreo en vivo.',
    'nav.brokers': 'Brokers Dedicados',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Crear cuenta gratis',
    
    // Hero
    'hero.badge_tag': 'Nuevo',
    'hero.badge_text': 'Software de Reparto y Optimización de Rutas',
    'hero.title': 'Gestiona, automatiza y asigna repartidores para entregar tus productos.',
    'hero.desc': 'La plataforma preferida por restaurantes para entregar comida caliente y a tiempo, con la versatilidad de gestionar también paquetería local y e-commerce con seguimiento en vivo.',
    'hero.cta_start': 'Comenzar Ahora',
    'hero.cta_features': 'Ver Funciones',
    'hero.footer_routes': 'Rutas optimizadas para comida y paquetes',
    'hero.footer_setup': 'Implementación rápida y sencilla',
    'hero.float_title': 'Restaurante y Envíos',
    'hero.float_val': 'Comida Caliente a Tiempo',

    // Brokers section
    'brokers.tag': 'GESTIÓN HUMANA + TECNOLOGÍA',
    'brokers.badge': 'DEDICATED DELIVERY BROKERS',
    'brokers.title': 'Tu negocio nunca estará solo: tendrás un Broker a cargo de los viajes de tus repartidores',
    'brokers.desc': 'Más que un software, asignamos a un gestor de operaciones dedicado que supervisa en tiempo real cada viaje de tus repartidores, resuelve imprevistos viales y asegura que tus entregas lleguen a tiempo sin que tengas que distraerte de tu negocio.',
    'brokers.card1_title': 'Supervisión Continua de Viajes',
    'brokers.card1_desc': 'Monitoreo activo desde la recolección hasta la puerta del cliente. Si un repartidor toma una ruta no óptima o se demora, tu broker interviene de inmediato.',
    'brokers.card2_title': 'Resolución Inmediata de Incidencias',
    'brokers.card2_desc': '¿Dirección confusa o cliente que no responde? Tu broker contacta al cliente, coordina con el conductor y lo resuelve en segundos sin quitarte tiempo.',
    'brokers.card3_title': 'Coordinación y Garantía de Flota',
    'brokers.card3_desc': 'Previene saturaciones balanceando la disponibilidad de repartidores en tus horarios pico y fines de semana de alta demanda.',
    'brokers.card4_title': 'Tu Aliado Estratégico Dedicado',
    'brokers.card4_desc': 'Una persona real con contacto directo que conoce tu negocio, cuida tus tiempos de preparación y protege la reputación de cada entrega.',
    'brokers.live_title': 'Consola en Vivo del Broker',
    'brokers.live_status': 'En turno activo • Supervisando tu cuenta',
    'brokers.stat_active': 'Viajes Activos',
    'brokers.stat_ontime': 'Puntualidad',
    'brokers.stat_resolved': 'Incidencias Resueltas',
    'brokers.feed_title': 'Monitoreo en tiempo real',
    'brokers.feed_1_title': 'Viaje #2048 en camino',
    'brokers.feed_1_desc': 'Repartidor a 4 min de la entrega. Ruta supervisada y confirmada.',
    'brokers.feed_2_title': 'Incidencia atendida por Broker',
    'brokers.feed_2_desc': 'Cliente cambió número de timbre a Depto 3B. Resuelto en 40s sin demora.',
    'brokers.feed_3_title': 'Asignación express completada',
    'brokers.feed_3_desc': 'Repartidor más cercano aceptó el pedido en 2.1 segundos.',
    'brokers.cta': 'Comenzar con un Broker Asignado',
    'brokers.chat_support': 'Soporte humano directo por WhatsApp o llamada con tu Broker 24/7',

    // Scope
    'scope.tag': 'Versatilidad total para las entregas de tu negocio',
    'scope.title': 'Una solución para cada necesidad de envío',
    'scope.desc': 'PideloSeguro se adapta al trayecto, origen y destino de tus entregas. Una sola plataforma con infinitas posibilidades.',
    'scope.card1_title': 'Orígenes y Destinos Múltiples',
    'scope.card1_desc': 'Solicita recolecciones en uno o varios puntos de partida de forma simultánea y programa entregas multitrayecto con optimización de secuencias viales para ahorrar tiempo y combustible.',
    'scope.card2_title': 'Diseñado para Todos',
    'scope.card2_desc': 'Una plataforma tan flexible que se adapta a las necesidades de restaurantes consolidados, oficinas corporativas, tiendas en línea en crecimiento y mucho más.',
    'scope.card3_title': 'Envíos de Todo Tamaño',
    'scope.card3_desc': 'Resuelve envíos básicos y urgentes. Nuestra plataforma gestiona desde un sobre de documentos, cajas de mercancías de gran volumen e incluso traslados seguros de personas en tu flota activa.',

    // CTA
    'cta.badge': 'PROGRAMA DE SOCIOS • GESTIÓN DE ENTREGAS',
    'cta.title': 'Únete al programa y obtén tu propio Broker de entregas',
    'cta.desc': 'Empieza hoy mismo y cuenta con una persona dedicada a coordinar a tus repartidores, supervisar cada viaje y resolver cualquier imprevisto en tiempo real. Mucho más económico que las apps tradicionales y con atención 100% humana para tu negocio.',
    'cta.btn': 'Comenzar con mi Broker Asignado'
  },
  en: {
    // Nav
    'nav.solutions': 'Solutions',
    'nav.restaurants': 'Restaurants',
    'nav.restaurants_desc': 'Deliver hot food faster and manage your own fleet of couriers.',
    'nav.ecommerce': 'E-commerce',
    'nav.ecommerce_desc': 'Instant local delivery with automated proof of fulfillment.',
    'nav.couriers': 'Courier Fleets',
    'nav.couriers_desc': 'Scale and optimize local multi-drop distribution routes.',
    'nav.features': 'Features',
    'nav.dispatch': 'Smart Dispatch',
    'nav.dispatch_desc': 'Automated driver assignment and route dispatching.',
    'nav.driver_app': 'Web Store & Menu',
    'nav.driver_app_desc': 'Customize your online storefront, digital menu, and pricing.',
    'nav.tracking': 'Live Tracking',
    'nav.tracking_desc': 'Provide customers with real-time delivery status.',
    'nav.brokers': 'Delivery Brokers',
    'nav.login': 'Log In',
    'nav.signup': 'Start Free',

    // Hero
    'hero.badge_tag': 'New',
    'hero.badge_text': 'Next-Gen Delivery Software & Route Optimization',
    'hero.title': 'Manage, automate, and assign delivery drivers for your business.',
    'hero.desc': 'The premier delivery platform for restaurants ensuring hot food arrives on time, with full versatility to handle local parcels and e-commerce with live tracking.',
    'hero.cta_start': 'Get Started Now',
    'hero.cta_features': 'Explore Features',
    'hero.footer_routes': 'Optimized routes for food & parcels',
    'hero.footer_setup': 'Fast & seamless onboarding',
    'hero.float_title': 'Restaurant & Delivery',
    'hero.float_val': 'Hot Food On Time',

    // Brokers section
    'brokers.tag': 'HUMAN SUPPORT + AI LOGISTICS',
    'brokers.badge': 'DEDICATED DELIVERY BROKERS',
    'brokers.title': 'Your business is never on its own: get a Dedicated Broker managing your trips',
    'brokers.desc': 'More than just software: we assign a dedicated operations manager who monitors every courier trip in real time, handles roadside incidents, and ensures on-time deliveries so you can focus on growing your business.',
    'brokers.card1_title': 'Real-Time Trip Oversight',
    'brokers.card1_desc': 'Active monitoring from order pickup to customer drop-off. If a driver takes a slow route or gets stuck, your broker intervenes immediately.',
    'brokers.card2_title': 'Instant Issue Resolution',
    'brokers.card2_desc': 'Confusing address or unresponsive customer? Your broker contacts the client, coordinates with the driver, and solves it in seconds.',
    'brokers.card3_title': 'Fleet & Rush-Hour Coordination',
    'brokers.card3_desc': 'Prevents bottlenecks by balancing driver availability during your peak hours and high-demand weekends.',
    'brokers.card4_title': 'Your Dedicated Growth Partner',
    'brokers.card4_desc': 'A designated human professional who understands your business, schedules, and actively protects your brand reputation.',
    'brokers.live_title': 'Live Broker Command Center',
    'brokers.live_status': 'Active on duty • Monitoring your account',
    'brokers.stat_active': 'Active Trips',
    'brokers.stat_ontime': 'On-Time Rate',
    'brokers.stat_resolved': 'Issues Resolved',
    'brokers.feed_title': 'Live Operations Stream',
    'brokers.feed_1_title': 'Trip #2048 on route',
    'brokers.feed_1_desc': 'Courier 4 mins away from destination. Route verified by Broker.',
    'brokers.feed_2_title': 'Issue solved by Broker',
    'brokers.feed_2_desc': 'Customer apartment verified as Apt 3B. Resolved in 40s with zero delay.',
    'brokers.feed_3_title': 'Express dispatch assigned',
    'brokers.feed_3_desc': 'Nearest available courier accepted the order in 2.1 seconds.',
    'brokers.cta': 'Get Started with a Dedicated Broker',
    'brokers.chat_support': 'Direct human support with your dedicated broker via WhatsApp or call 24/7',

    // Scope
    'scope.tag': 'Complete versatility for your business deliveries',
    'scope.title': 'A tailored solution for every delivery need',
    'scope.desc': 'PideloSeguro adapts to any route, pickup, and destination. One unified platform with endless possibilities.',
    'scope.card1_title': 'Multi-Origin & Multi-Destination',
    'scope.card1_desc': 'Request pickups from multiple spots simultaneously and schedule multi-stop deliveries with sequence optimization to save time and fuel.',
    'scope.card2_title': 'Built for Every Business',
    'scope.card2_desc': 'A flexible platform tailored for established restaurants, corporate offices, fast-growing online stores, and more.',
    'scope.card3_title': 'Any Parcel Size & Transfer',
    'scope.card3_desc': 'Handles urgent documents, large merchandise boxes, and seamless fleet transfers with full security.',

    // CTA
    'cta.badge': 'PARTNER PROGRAM • DELIVERY FLEET OPS',
    'cta.title': 'Join the program and get your Dedicated Delivery Broker',
    'cta.desc': 'Get started today with a dedicated operations specialist coordinating your drivers, supervising every trip, and resolving issues in real time. Far more cost-effective than conventional apps with 100% human support.',
    'cta.btn': 'Get Started with Your Broker'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['es'][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
