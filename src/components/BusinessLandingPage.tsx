import React, { useState, useMemo, useEffect } from 'react';
import type { CompanyData, BranchData, ProductData, PersonalizacionData } from '../supabaseClient';
import { createOrder } from '../supabaseClient';
import { sendOrderEmail } from '../resendClient';
import { RouteMap } from './RouteMap';
import logoImg from '../assets/logo-pidelo-seguro.png';
import './BusinessLandingPage.css';

interface BusinessLandingPageProps {
  company: CompanyData;
  branches: BranchData[];
  products: ProductData[];
  personalizacion: PersonalizacionData | null;
  onBackToHome: () => void;
}

export const BusinessLandingPage: React.FC<BusinessLandingPageProps> = ({
  company,
  branches,
  products,
  personalizacion,
  onBackToHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [orderBranch, setOrderBranch] = useState<string>('');
  const [modalQty, setModalQty] = useState<number>(1);
  const [cart, setCart] = useState<{ product: ProductData; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Update browser metadata dynamically for the client
  useEffect(() => {
    // Save original values
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const favicon = document.querySelector('link[rel="icon"]');
    
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const originalFavicon = favicon ? favicon.getAttribute('href') : '';

    // Set new values based on personalization
    const newTitle = (personalizacion?.meta_titulo && personalizacion.meta_titulo !== 'EMPTY') 
      ? personalizacion.meta_titulo 
      : 'PideloSeguro | Software de Gestión y Optimización de Entregas';
      
    const newDesc = (personalizacion?.meta_descripcion && personalizacion.meta_descripcion !== 'EMPTY')
      ? personalizacion.meta_descripcion 
      : 'Optimiza tus entregas locales, planifica rutas eficientes y rastrea repartidores en tiempo real con PideloSeguro. La plataforma ideal para restaurantes, e-commerce y servicios de mensajería.';
      
    const newFavicon = company.logoEmpresa || '/logo-pideloseguro.png';

    document.title = newTitle;
    if (metaDesc) metaDesc.setAttribute('content', newDesc);
    if (ogTitle) ogTitle.setAttribute('content', newTitle);
    if (ogDesc) ogDesc.setAttribute('content', newDesc);
    if (favicon) favicon.setAttribute('href', newFavicon);

    // Cleanup on unmount (restore original values if navigating away)
    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc || '');
      if (favicon) favicon.setAttribute('href', originalFavicon || '');
    };
  }, [personalizacion, company]);

  const [addressQuery, setAddressQuery] = useState<string>('');
  const [addressSuggestions, setAddressSuggestions] = useState<{ placeName: string; center: number[] }[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<{ placeName: string; center: number[] } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState<boolean>(false);

  // Payment Demo States
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [simulatedOrderRef, setSimulatedOrderRef] = useState<string>('');

  // Customer Data & Map States
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);



  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get active branches for ordering dropdown
  const activeBranches = useMemo(() => {
    return branches.filter((b) => b.status === 'active' || b.disponibilidad);
  }, [branches]);

  // Set default branch on load
  useEffect(() => {
    if (activeBranches.length > 0 && !orderBranch) {
      setOrderBranch(activeBranches[0].id);
    }
  }, [activeBranches, orderBranch]);

  // Extract unique categories dynamically from products
  const categories = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      if (p.category) list.add(p.category);
    });
    return ['Todos', ...Array.from(list)];
  }, [products]);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Haversine Distance Fallback
  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Shipping Fee Parser
  const calculateFeeForBranch = (distKm: number, tarifas: any[]): number => {
    if (!tarifas || tarifas.length === 0) {
      return 40; // Default fee
    }
    let fee = 0;
    let matched = false;

    // Check tiers
    for (const tier of tarifas) {
      if (tier.min_km !== undefined && tier.max_km !== undefined && tier.precio !== undefined) {
        if (distKm >= Number(tier.min_km) && distKm <= Number(tier.max_km)) {
          fee = Number(tier.precio);
          matched = true;
          break;
        }
      }
    }

    // Check extra km rule
    if (!matched) {
      const extraRule = tarifas.find((t: any) => t.km_extra === true || t.precio_por_km !== undefined);
      if (extraRule) {
        let maxDefinedKm = 0;
        let basePrice = 0;
        tarifas.forEach((tier: any) => {
          if (tier.max_km > maxDefinedKm) {
            maxDefinedKm = Number(tier.max_km);
            basePrice = Number(tier.precio);
          }
        });

        if (distKm > maxDefinedKm) {
          const excessKm = distKm - maxDefinedKm;
          const pricePerKm = Number(extraRule.precio_por_km || 10);
          fee = basePrice + excessKm * pricePerKm;
          matched = true;
        }
      }
    }

    if (!matched) {
      let maxPrice = 40;
      tarifas.forEach((tier: any) => {
        if (Number(tier.precio) > maxPrice) {
          maxPrice = Number(tier.precio);
        }
      });
      fee = maxPrice;
    }
    return fee;
  };

  // Mapbox Geocoding Fetch
  const fetchAddressSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!token) {
      console.warn('Mapbox Token is not set in environment variables.');
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&country=mx&limit=5`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.features) {
        setAddressSuggestions(
          data.features.map((f: any) => ({
            placeName: f.place_name,
            center: f.center, // [lng, lat]
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
    }
  };

  // Mapbox Directions Fetch
  const calculateDistanceAndFee = async (userLng: number, userLat: number, branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch || branch.lat === null || branch.lng === null) {
      setDistance(null);
      setShippingFee(null);
      setRouteCoordinates([]);
      return;
    }

    setIsCalculatingShipping(true);
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${branch.lng},${branch.lat};${userLng},${userLat}?geometries=geojson&access_token=${token}`;

    let distKm = 0;
    try {
      if (!token) throw new Error('No Mapbox Token');
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        distKm = data.routes[0].distance / 1000;
        setDistance(distKm);
        
        if (data.routes[0].geometry && data.routes[0].geometry.coordinates) {
          const coords = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]] as [number, number]);
          setRouteCoordinates(coords);
        } else {
          setRouteCoordinates([[branch.lat, branch.lng], [userLat, userLng]]);
        }
      } else {
        throw new Error('No route found');
      }
    } catch (err) {
      console.warn('Mapbox directions API error, falling back to Haversine:', err);
      distKm = calculateHaversineDistance(branch.lat, branch.lng, userLat, userLng);
      setDistance(distKm);
      setRouteCoordinates([[branch.lat, branch.lng], [userLat, userLng]]);
    }

    const fee = calculateFeeForBranch(distKm, branch.tarifas);
    setShippingFee(fee);
    setIsCalculatingShipping(false);
  };

  // Debounce Geocoding Suggestions
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (addressQuery && (!selectedAddress || addressQuery !== selectedAddress.placeName)) {
        fetchAddressSuggestions(addressQuery);
      } else if (!addressQuery) {
        setAddressSuggestions([]);
      }
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [addressQuery, selectedAddress]);

  // Recalculate if branch changes
  useEffect(() => {
    if (selectedAddress && orderBranch) {
      calculateDistanceAndFee(selectedAddress.center[0], selectedAddress.center[1], orderBranch);
    }
  }, [orderBranch]);

  // Handle Select Suggestion
  const handleSelectSuggestion = (suggestion: { placeName: string; center: number[] }) => {
    setSelectedAddress(suggestion);
    setAddressQuery(suggestion.placeName);
    setAddressSuggestions([]);
    if (orderBranch) {
      calculateDistanceAndFee(suggestion.center[0], suggestion.center[1], orderBranch);
    }
  };

  // Cart Handlers
  const handleAddToCart = (product: ProductData, qtyToAdd: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSendWhatsAppCartOrder = async () => {
    const targetBranch = activeBranches.find((b) => b.id === orderBranch);
    const phoneNumber = (personalizacion?.numero_whatsapp && personalizacion.numero_whatsapp !== 'EMPTY')
      ? personalizacion.numero_whatsapp
      : (targetBranch ? targetBranch.phone : (company.TelefonosEmpresa?.[0] || ''));

    if (!phoneNumber) {
      alert('Esta sucursal no tiene teléfono configurado. Intente llamar directamente.');
      return;
    }

    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    if (!selectedAddress) {
      alert('Por favor, ingresa y selecciona tu dirección de entrega.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      alert('Por favor, completa tus datos (Nombre, Teléfono y Correo) antes de continuar.');
      return;
    }

    setIsSubmittingOrder(true);

    const subtotalVal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryFeeVal = shippingFee || 0;
    const totalVal = subtotalVal + deliveryFeeVal;

    // 1. Save to Supabase
    const orderData = {
      cliente_nombre: customerName,
      direccion: selectedAddress.placeName,
      telefono: customerPhone,
      total: totalVal,
      id_empresa: company.idEmpresa,
      id_sucursal: orderBranch,
      productos: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      lat: selectedAddress.center[1],
      lng: selectedAddress.center[0]
    };

    const supabaseRes = await createOrder(orderData);
    let orderId = `ord-${Date.now()}`;
    if (supabaseRes.success) {
      orderId = supabaseRes.data?.id || orderId;
    } else {
      console.error('Error saving order to Supabase:', supabaseRes.error);
    }

    // 2. Send Email Confirmation via Resend
    try {
      await sendOrderEmail({
        orderId,
        cliente_nombre: customerName,
        email: customerEmail,
        telefono: customerPhone,
        direccion: selectedAddress.placeName,
        total: totalVal,
        productos: orderData.productos,
        companyName: company.NombreEmpresa,
        branchName: targetBranch ? targetBranch.name : 'Sucursal'
      });
    } catch (err) {
      console.error('Error sending order email via Resend:', err);
    }

    setIsSubmittingOrder(false);

    let cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '52' + cleanPhone;
    }

    const itemsText = cart
      .map(
        (item) =>
          `- *${item.quantity}x* ${item.product.name} (${formatPrice(item.product.price)} c/u) -> ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n');

    let text = `*NUEVO PEDIDO - ${company.NombreEmpresa}*

`;
    text += `*Orden ID:* ${orderId}

`;
    text += `*Detalle de Productos:*
${itemsText}

`;
    text += `*Subtotal:* ${formatPrice(subtotalVal)}
`;
    text += `*Costo de Envío:* ${formatPrice(deliveryFeeVal)} ${distance !== null ? `(Distancia: ${distance.toFixed(1)} km)` : ''}
`;
    text += `*TOTAL:* ${formatPrice(totalVal)}

`;
    text += `*Datos de Entrega:*
`;
    text += `*Cliente:* ${customerName}
`;
    text += `*Teléfono:* ${customerPhone}
`;
    text += `*Correo:* ${customerEmail}
`;
    text += `*Sucursal de origen:* ${targetBranch ? targetBranch.name : 'No especificada'}
`;
    text += `*Dirección:* ${selectedAddress.placeName}
`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const handleCallCartOrder = async () => {
    const targetBranch = activeBranches.find((b) => b.id === orderBranch);
    const phoneNumber = targetBranch?.phone || company.TelefonosEmpresa?.[0] || (personalizacion?.numero_whatsapp !== 'EMPTY' ? personalizacion?.numero_whatsapp : '');

    if (!phoneNumber) {
      alert('Esta sucursal no tiene teléfono configurado.');
      return;
    }

    if (cart.length === 0) { alert('Tu carrito está vacío.'); return; }
    if (!selectedAddress) { alert('Por favor, ingresa tu dirección.'); return; }
    if (!customerName.trim() || !customerPhone.trim()) { alert('Por favor, completa Nombre y Teléfono.'); return; }

    setIsSubmittingOrder(true);
    
    const subtotalVal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryFeeVal = shippingFee || 0;
    const totalVal = subtotalVal + deliveryFeeVal;

    const orderData = {
      cliente_nombre: customerName,
      direccion: selectedAddress.placeName,
      telefono: customerPhone,
      total: totalVal,
      id_empresa: company.idEmpresa,
      id_sucursal: orderBranch,
      productos: cart.map(item => ({ id: item.product.id, name: item.product.name, price: item.product.price, quantity: item.quantity })),
      lat: selectedAddress.center[1],
      lng: selectedAddress.center[0]
    };

    const supabaseRes = await createOrder(orderData);
    setIsSubmittingOrder(false);

    if (supabaseRes.success) {
      alert('¡Orden registrada en el sistema! Transfiriendo llamada...');
      setCart([]);
      setIsCartOpen(false);
      window.location.href = `tel:${String(phoneNumber).replace(/\D/g, '')}`;
    } else {
      console.error(supabaseRes.error);
      alert('Error al registrar, pero puedes llamar directamente.');
      window.location.href = `tel:${String(phoneNumber).replace(/\D/g, '')}`;
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
      alert('Por favor, ingresa todos los campos de tu tarjeta de prueba.');
      return;
    }

    if (!selectedAddress || !orderBranch) {
      alert('Por favor, selecciona una sucursal y dirección de entrega.');
      return;
    }

    setPaymentStatus('processing');
    
    const targetBranch = activeBranches.find((b) => b.id === orderBranch);
    const subtotalVal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryFeeVal = shippingFee || 0;
    const totalVal = subtotalVal + deliveryFeeVal;

    // 1. Save to Supabase
    const orderData = {
      cliente_nombre: customerName,
      direccion: selectedAddress.placeName,
      telefono: customerPhone,
      total: totalVal,
      id_empresa: company.idEmpresa,
      id_sucursal: orderBranch,
      productos: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      lat: selectedAddress.center[1],
      lng: selectedAddress.center[0]
    };

    const supabaseRes = await createOrder(orderData);
    let orderId = `ord-${Date.now()}`;
    if (supabaseRes.success) {
      orderId = supabaseRes.data?.id || orderId;
    } else {
      console.error('Error saving order to Supabase:', supabaseRes.error);
    }

    // 2. Send Email Confirmation via Resend
    try {
      await sendOrderEmail({
        orderId,
        cliente_nombre: customerName,
        email: customerEmail,
        telefono: customerPhone,
        direccion: selectedAddress.placeName,
        total: totalVal,
        productos: orderData.productos,
        companyName: company.NombreEmpresa,
        branchName: targetBranch ? targetBranch.name : 'Sucursal'
      });
    } catch (err) {
      console.error('Error sending order email via Resend:', err);
    }

    setSimulatedOrderRef(orderId);
    setPaymentStatus('success');
  };

  const handleCloseSuccessScreen = () => {
    setShowPaymentModal(false);
    setPaymentStatus('idle');
    setCart([]); // Empty the cart on close
  };

  // Handle setting default order branch on modal open
  const handleOpenProductModal = (product: ProductData) => {
    setSelectedProduct(product);
    setModalQty(1);
  };

  // Format currency helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  
  
  // 1. Determinar el logo a usar
  const displayLogo = (personalizacion?.logo && personalizacion.logo !== 'EMPTY') 
    ? personalizacion.logo 
    : company.logoEmpresa;

  // 2. Filtrar sucursales si el cliente seleccionó activas
  const displayBranches = useMemo(() => {
    if (Array.isArray(personalizacion?.sucursales_activas) && personalizacion.sucursales_activas.length > 0) {
      return branches.filter(b => personalizacion.sucursales_activas.map(String).includes(String(b.id)));
    }
    return branches;
  }, [branches, personalizacion?.sucursales_activas]);

  const renderHero = () => (
    <>
      {/* Hero Banner Section */}
          <section className="storefront-hero">
            <div className="hero-gradient-overlay"></div>
            <div className="storefront-hero-container">
              <div className="storefront-hero-content animate-slide-in">
                {displayLogo ? (
                  <div className="hero-logo-wrapper">
                    <img src={displayLogo} alt={company.NombreEmpresa} className="hero-logo-large" />
                  </div>
                ) : (
                  <div className="hero-logo-wrapper logo-placeholder-large">
                    {company.NombreEmpresa.charAt(0).toUpperCase()}
                  </div>
                )}
                <h1 className="hero-title">{company.NombreEmpresa}</h1>
                <p className="hero-subtitle">
                  {company.DescripcionEmpresa || '¡Bienvenidos a nuestra tienda en línea oficial! Consulta nuestro catálogo de productos y haz tu pedido directamente a nuestras sucursales.'}
                </p>
                <div className="hero-cta-group">
                  <a href="#menu-catalog" className="btn btn-primary btn-scroll">
                    Ver Catálogo
                  </a>
                  <a href="#branches-section" className="btn btn-secondary btn-scroll">
                    Sucursales
                  </a>
                </div>
              </div>
            </div>
          </section>
    </>
  );

  const renderBranches = () => (
    <>
      {/* Branches Section */}
          <section className="storefront-section" id="branches-section">
            <div className="storefront-container">
              <div className="section-header">
                <span className="section-badge badge badge-red">Nuestras Sucursales</span>
                <h2 className="section-title">¿Dónde encontrarnos?</h2>
                <p className="section-desc">Visítanos o comunícate directamente a la sucursal más cercana a tu domicilio.</p>
              </div>
    
              {displayBranches.length === 0 ? (
                <div className="empty-state glass">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                  <h3>No hay sucursales disponibles</h3>
                  <p>Esta empresa no cuenta con sucursales activas en este momento.</p>
                </div>
              ) : (
                <div className="branches-grid grid-3">
                  {displayBranches.map((branch) => {
                    const isAvailable = branch.status === 'active' && (branch.disponibilidad ?? true);
                    return (
                      <div key={branch.id} className="branch-card glass animate-slide-in">
                        {branch.fotos && branch.fotos.length > 0 ? (
                          <div className="branch-img-wrapper">
                            <img src={branch.fotos[0]} alt={branch.name} className="branch-img" loading="lazy" />
                          </div>
                        ) : (
                          <div className="branch-img-wrapper no-img-gradient">
                            <div className="branch-placeholder-icon">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18"></path>
                                <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 0V3h12v18H9V7M9 7H3M13 7h2m-2 4h2m-2 4h2"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="branch-body">
                          <div className="branch-header-row">
                            <h3 className="branch-name">{branch.name}</h3>
                            <span className={`badge ${isAvailable ? 'badge-open' : 'badge-closed'}`}>
                              {isAvailable ? 'Abierta' : 'Cerrada'}
                            </span>
                          </div>
                          <p className="branch-address">{branch.address}</p>
                          
                          {branch.phone && (
                            <div className="branch-phone-row">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                              </svg>
                              <a href={`tel:${branch.phone}`} className="branch-phone-link">
                                {branch.phone}
                              </a>
                            </div>
                          )}
    
                          <div className="branch-actions">
                            {branch.phone && (
                              <a href={`tel:${branch.phone}`} className="btn btn-outline btn-sm">
                                Llamar
                              </a>
                            )}
                            {(branch.LinkGoogleMaps || (branch.lat && branch.lng)) && (
                              <a 
                                href={branch.LinkGoogleMaps || `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-secondary btn-sm"
                              >
                                Ver Mapa
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
    </>
  );

  
  const renderRedes = () => {
    const hasFb = personalizacion?.facebook && personalizacion.facebook !== 'EMPTY';
    const hasIg = personalizacion?.instagram && personalizacion.instagram !== 'EMPTY';
    const hasTk = personalizacion?.tiktok && personalizacion.tiktok !== 'EMPTY';

    if (!hasFb && !hasIg && !hasTk) return null;

    return (
      <React.Fragment>
        {/* Redes Sociales Section */}
        <section className="storefront-section redes-bg" id="redes-section">
          <div className="storefront-container text-center">
            <h2 className="section-title">Síguenos en nuestras redes</h2>
            <p className="section-desc">Mantente al tanto de nuestras novedades y promociones exclusivas.</p>
            <div className="social-links-container">
              {hasFb && (
                <a href={personalizacion.facebook} target="_blank" rel="noreferrer" className="social-btn facebook">
                  <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {hasIg && (
                <a href={personalizacion.instagram} target="_blank" rel="noreferrer" className="social-btn instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {hasTk && (
                <a href={personalizacion.tiktok} target="_blank" rel="noreferrer" className="social-btn tiktok">
                  <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
                </a>
              )}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  };

  const renderGaleria = () => {
    const fotos = Array.isArray(personalizacion?.galeria_fotos) ? personalizacion.galeria_fotos : [];
    if (fotos.length === 0) return null;

    return (
      <React.Fragment>
        {/* Galería Section */}
        <section className="storefront-section galeria-bg" id="galeria-section">
          <div className="storefront-container">
            <div className="section-header">
              <span className="section-badge badge badge-red">Nuestra Galería</span>
              <h2 className="section-title">Conoce nuestro negocio</h2>
              <p className="section-desc">Explora algunas imágenes de nuestros espacios y platillos.</p>
            </div>
            <div className="gallery-grid">
              {fotos.map((url, i) => (
                <div key={i} className="gallery-item">
                  <img src={url} alt={`Galería ${i}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  };

  const renderProducts = () => (
    <>
      {/* Catalog / Products Section */}
          <section className="storefront-section catalog-bg" id="menu-catalog">
            <div className="storefront-container">
              <div className="section-header">
                <span className="section-badge badge badge-red">Nuestro Menú</span>
                <h2 className="section-title">Productos Disponibles</h2>
                <p className="section-desc">Selecciona entre nuestras categorías y realiza tu pedido al instante.</p>
              </div>
    
              {products.length === 0 ? (
                <div className="empty-state glass">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3>No hay productos registrados</h3>
                  <p>Esta empresa no cuenta con productos en su catálogo actualmente.</p>
                </div>
              ) : (
                <>
                  {/* Category Filter Tabs */}
                  <div className="category-tabs-container">
                    <div className="category-tabs">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
    
                  {/* Products Grid */}
                  <div className="products-grid grid-3">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="product-card glass animate-slide-in"
                        onClick={() => handleOpenProductModal(product)}
                      >
                        {product.fotos && product.fotos.length > 0 ? (
                          <div className="product-img-wrapper">
                            <img src={product.fotos[0]} alt={product.name} className="product-img" loading="lazy" />
                          </div>
                        ) : (
                          <div className="product-img-wrapper no-img-gradient">
                            <div className="product-placeholder-icon">
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="product-body">
                          <div className="product-category-label">{product.category}</div>
                          <h3 className="product-title">{product.name}</h3>
                          <p className="product-desc-short">{product.description || 'Sin descripción disponible.'}</p>
                          <div className="product-footer">
                            <span className="product-price">{formatPrice(product.price)}</span>
                            <button 
                              className="btn btn-primary btn-sm btn-order"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
    </>
  );


  try {
    return (
    <div className="landing-storefront-wrapper" style={{
      '--sf-bg': (personalizacion?.color_fondo && personalizacion.color_fondo !== 'EMPTY') ? personalizacion.color_fondo : '#0f172a',
      '--sf-text': (personalizacion?.color_texto && personalizacion.color_texto !== 'EMPTY') ? personalizacion.color_texto : '#ffffff',
      '--sf-title': (personalizacion?.color_titulos && personalizacion.color_titulos !== 'EMPTY') ? personalizacion.color_titulos : '#ffffff',
    } as React.CSSProperties}>
      <style>{`
        .landing-storefront-wrapper { background-color: var(--sf-bg) !important; color: var(--sf-text) !important; }
        .section-title, .hero-title, .storefront-brand-name { color: var(--sf-title) !important; }
        .storefront-hero { 
          background-image: ${personalizacion?.portada && personalizacion.portada !== 'EMPTY' ? `url(${personalizacion.portada})` : 'none'} !important; 
          background-size: cover; 
          background-position: center; 
        }
      `}</style>

      {/* Storefront Header / Navbar */}
      <header className="storefront-navbar glass">
        <div className="storefront-nav-container">
          <div className="storefront-nav-logo" onClick={onBackToHome}>
            {displayLogo ? (
              <img src={displayLogo} alt={company.NombreEmpresa} className="logo-img" />
            ) : (
              <div className="logo-placeholder">
                {company.NombreEmpresa.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="storefront-brand-name">{company.NombreEmpresa}</span>
          </div>
          <button className="btn-back-main" onClick={onBackToHome}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Volver a PideloSeguro</span>
          </button>
        </div>
      </header>

      
      {/* Dynamic Sections Render */}
      {(Array.isArray(personalizacion?.orden_web) ? personalizacion.orden_web : ['hero', 'sucursales', 'productos', 'galeria', 'redes']).map((section, idx) => {
        if (section === 'hero') return <React.Fragment key={idx}>{renderHero()}</React.Fragment>;
        if (section === 'sucursales') return <React.Fragment key={idx}>{renderBranches()}</React.Fragment>;
        if (section === 'productos') return <React.Fragment key={idx}>{renderProducts()}</React.Fragment>;
        if (section === 'galeria') return <React.Fragment key={idx}>{renderGaleria()}</React.Fragment>;
        if (section === 'redes') return <React.Fragment key={idx}>{renderRedes()}</React.Fragment>;
        return null;
      })}

      {/* Powered by footer */}
      <footer className="storefront-footer">
        <div className="storefront-container footer-content">
          <p>© {new Date().getFullYear()} {company.NombreEmpresa}. Todos los derechos reservados.</p>
          <div className="powered-by">
            <span>Tecnología brindada por</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="footer-pideloseguro-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <img src={logoImg} alt="Pidelo Seguro" style={{ height: "24px", width: "24px", objectFit: "contain", borderRadius: "6px" }} />
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>Pidelo Seguro</span>
            </a>
          </div>
        </div>
      </footer>

      
      {/* Floating WA Button */}
      {(personalizacion?.numero_whatsapp && personalizacion.numero_whatsapp !== 'EMPTY') && (
        <a 
          href={`https://wa.me/${String(personalizacion.numero_whatsapp).replace(/\D/g, '')}`} 
          className="floating-contact-btn wa-btn" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2C6.493 2 2 6.495 2 12.031c0 1.767.46 3.493 1.348 5.014l-1.348 5.01 5.097-1.338c1.474.808 3.125 1.233 4.908 1.233 5.539 0 10.028-4.49 10.028-10.03C22.062 6.495 17.573 2 12.031 2zm0 18.062c-1.579 0-3.13-.426-4.482-1.228l-.322-.191-3.03.795.81-2.955-.21-.334c-.878-1.396-1.344-3.003-1.344-4.662C3.453 7.29 7.3 3.442 12.03 3.442c4.726 0 8.573 3.847 8.573 8.577.001 4.73-3.846 8.577-8.572 8.577z"/>
          </svg>
        </a>
      )}
      {/* Floating Email Button */}
      {(personalizacion?.correo_general_info && personalizacion.correo_general_info !== 'EMPTY') && (
        <a 
          href={`mailto:${personalizacion.correo_general_info}`} 
          className="floating-contact-btn email-btn" 
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal-content glass animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="modal-columns">
              <div className="modal-image-col">
                {selectedProduct.fotos && selectedProduct.fotos.length > 0 ? (
                  <img src={selectedProduct.fotos[0]} alt={selectedProduct.name} className="modal-product-img" />
                ) : (
                  <div className="modal-product-img no-img-gradient flex-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                )}
              </div>

              <div className="modal-info-col">
                <span className="modal-product-category">{selectedProduct.category}</span>
                <h2 className="modal-product-title">{selectedProduct.name}</h2>
                <div className="modal-product-price">{formatPrice(selectedProduct.price)}</div>
                
                <p className="modal-product-desc">
                  {selectedProduct.description || 'Este producto no cuenta con una descripción detallada por el momento. Consulta con nuestros asesores de venta para más detalles.'}
                </p>

                {activeBranches.length > 0 ? (
                  <div className="modal-order-panel">
                    <div className="modal-qty-container">
                      <label htmlFor="modal-qty-input" className="panel-label">Cantidad:</label>
                      <div className="modal-qty-controls">
                        <button onClick={() => setModalQty(q => Math.max(1, q - 1))}>-</button>
                        <span id="modal-qty-input">{modalQty}</span>
                        <button onClick={() => setModalQty(q => q + 1)}>+</button>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary w-full btn-add-cart-modal" 
                      onClick={() => {
                        handleAddToCart(selectedProduct, modalQty);
                        setSelectedProduct(null);
                        setIsCartOpen(true);
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cart-add-icon">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Agregar al Carrito
                    </button>
                  </div>
                ) : (
                  <div className="modal-order-panel no-branch-warning">
                    <p>No hay sucursales activas en este momento para realizar pedidos.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button className="floating-cart-btn animate-float-glow" onClick={() => setIsCartOpen(true)}>
          <div className="cart-badge-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-btn-text">
            Ver Carrito ({formatPrice(cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))})
          </span>
        </button>
      )}

      {/* Side Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-content animate-slide-left" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Tu Pedido</h2>
              <button className="drawer-close-btn" onClick={() => setIsCartOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="drawer-body">
              {/* Cart Items List */}
              <div className="cart-items-section">
                <h3>Productos</h3>
                {cart.length === 0 ? (
                  <p className="empty-cart-text">El carrito está vacío. Agrega algunos productos de nuestro catálogo.</p>
                ) : (
                  <div className="cart-items-list-wrapper">
                    {cart.map((item) => (
                      <div key={item.product.id} className="cart-item-row">
                        <div className="cart-item-info">
                          <span className="cart-item-name">{item.product.name}</span>
                          <span className="cart-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                        <div className="cart-item-qty-controls">
                          <button onClick={() => handleUpdateQuantity(item.product.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleAddToCart(item.product, 1)}>+</button>
                          <button className="cart-item-remove" onClick={() => handleRemoveFromCart(item.product.id)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Delivery Configuration */}
              <div className="cart-delivery-section">
                <h3>Datos de Entrega</h3>
                
                {/* Branch Selector */}
                <div className="form-group">
                  <label htmlFor="cart-branch-select" className="form-label">¿De qué sucursal deseas pedir?</label>
                  <div className="select-wrapper">
                    <select
                      id="cart-branch-select"
                      value={orderBranch}
                      onChange={(e) => setOrderBranch(e.target.value)}
                      className="branch-select-input"
                    >
                      {activeBranches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} - {b.address.substring(0, 30)}...
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address Autocomplete Input */}
                <div className="form-group address-autocomplete-group">
                  <label htmlFor="address-search" className="form-label">Dirección de Entrega (México):</label>
                  <input
                    id="address-search"
                    type="text"
                    placeholder="Escribe tu calle, número y ciudad..."
                    value={addressQuery}
                    onChange={(e) => {
                      setAddressQuery(e.target.value);
                      if (selectedAddress) {
                        setSelectedAddress(null);
                        setDistance(null);
                        setShippingFee(null);
                      }
                    }}
                    className="address-search-input"
                  />
                  {addressSuggestions.length > 0 && (
                    <ul className="address-suggestions-list">
                      {addressSuggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleSelectSuggestion(suggestion)}
                          className="address-suggestion-item"
                        >
                          {suggestion.placeName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Selected Address Display */}
                {selectedAddress && (
                  <div className="selected-address-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Dirección fijada correctamente.</span>
                  </div>
                )}

                {/* Route Map Display */}
                {selectedAddress && orderBranch && (
                  <div className="cart-map-container" style={{ height: '220px', marginTop: '16px', marginBottom: '8px' }}>
                    <RouteMap
                      origin={[
                        activeBranches.find(b => b.id === orderBranch)?.lat || 0,
                        activeBranches.find(b => b.id === orderBranch)?.lng || 0
                      ]}
                      destination={[selectedAddress.center[1], selectedAddress.center[0]]}
                      routeCoords={routeCoordinates}
                      originName={activeBranches.find(b => b.id === orderBranch)?.name || 'Sucursal'}
                      destinationName="Tu ubicación"
                    />
                  </div>
                )}

                {/* Customer Details Form */}
                {selectedAddress && (
                  <div className="cart-customer-section animate-slide-in" style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sf-red)', marginBottom: '16px' }}>
                      Tus Datos
                    </h3>
                    <div className="form-group">
                      <label htmlFor="customer-name" className="form-label">Nombre Completo:</label>
                      <input
                        id="customer-name"
                        type="text"
                        placeholder="Ej. Juan Pérez"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="address-search-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customer-phone" className="form-label">Teléfono de Contacto:</label>
                      <input
                        id="customer-phone"
                        type="tel"
                        placeholder="Ej. 5512345678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                        className="address-search-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customer-email" className="form-label">Correo Electrónico:</label>
                      <input
                        id="customer-email"
                        type="email"
                        placeholder="Ej. juan@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="address-search-input"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer / Summary */}
            <div className="drawer-footer">
              <div className="price-row">
                <span>Subtotal</span>
                <span>{formatPrice(cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0))}</span>
              </div>
              <div className="price-row">
                <span>Envío {distance !== null ? `(${distance.toFixed(1)} km)` : ''}</span>
                {isCalculatingShipping ? (
                  <span className="calculating-text">Calculando...</span>
                ) : (
                  <span>{shippingFee !== null ? formatPrice(shippingFee) : '$0.00'}</span>
                )}
              </div>
              <div className="price-row total-row">
                <span>Total</span>
                <span>
                  {formatPrice(
                    cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + (shippingFee || 0)
                  )}
                </span>
              </div>

              <div className="drawer-actions-stack">
                <button
                  className="btn btn-primary btn-checkout-wa"
                  onClick={handleSendWhatsAppCartOrder}
                  disabled={isSubmittingOrder || isCalculatingShipping || !selectedAddress || cart.length === 0 || !customerName.trim() || !customerPhone.trim() || !customerEmail.trim()}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="whatsapp-icon">
                    <path d="M12.031 2C6.493 2 2 6.495 2 12.031c0 1.767.46 3.493 1.348 5.014l-1.348 5.01 5.097-1.338c1.474.808 3.125 1.233 4.908 1.233 5.539 0 10.028-4.49 10.028-10.03C22.062 6.495 17.573 2 12.031 2zm0 18.062c-1.579 0-3.13-.426-4.482-1.228l-.322-.191-3.03.795.81-2.955-.21-.334c-.878-1.396-1.344-3.003-1.344-4.662C3.453 7.29 7.3 3.442 12.03 3.442c4.726 0 8.573 3.847 8.573 8.577.001 4.73-3.846 8.577-8.572 8.577zm4.728-6.195c-.259-.13-.153-.3-.672-.559-.52-.26-1.53-.755-1.767-.841-.237-.087-.409-.13-.578.13-.17.26-.657.823-.807.996-.15.174-.3.195-.559.065-.26-.13-1.096-.404-2.088-1.288-.772-.689-1.293-1.54-1.444-1.8-.15-.26-.016-.4.114-.53.118-.118.259-.3.39-.45.13-.15.173-.26.259-.433.087-.174.044-.326-.021-.456-.065-.13-.579-1.396-.794-1.913-.21-.504-.419-.434-.578-.442l-.493-.01c-.17 0-.447.065-.68.322-.233.256-.89.87-.89 2.126 0 1.257.91 2.47 1.039 2.643.13.174 1.796 2.748 4.35 3.85.608.261 1.082.417 1.452.535.61.194 1.165.166 1.603.1.488-.073 1.5-.612 1.71-1.206.21-.595.21-1.106.147-1.206-.063-.1-.23-.15-.49-.28z"/>
                  </svg>
                  <span>{isSubmittingOrder ? 'Procesando...' : 'Pedir por WhatsApp'}</span>
                </button>

                <button
                    className="btn btn-outline"
                    onClick={handleCallCartOrder}
                    disabled={isSubmittingOrder || isCalculatingShipping || !selectedAddress || cart.length === 0 || !customerName.trim() || !customerPhone.trim() || !customerEmail.trim()}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>Llamar por Teléfono</span>
                  </button>
                  <button
                    className="btn btn-outline btn-pay-card"
                  onClick={() => {
                    setIsCartOpen(false);
                    setShowPaymentModal(true);
                    setPaymentStatus('idle');
                    setCardName('');
                    setCardNumber('');
                    setCardExpiry('');
                    setCardCvv('');
                  }}
                  disabled={isSubmittingOrder || isCalculatingShipping || !selectedAddress || cart.length === 0 || !customerName.trim() || !customerPhone.trim() || !customerEmail.trim()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="card-icon-svg">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                  <span>Pagar con Tarjeta (Demo)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Demo Modal */}
      {showPaymentModal && (
        <div className="product-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="product-modal-content glass animate-slide-in" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowPaymentModal(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {paymentStatus === 'idle' && (
              <form onSubmit={handleProcessPayment} className="payment-form">
                <h2 className="payment-modal-title">Pagar con Tarjeta</h2>
                <p className="payment-modal-subtitle">Introduce cualquier dato ficticio para simular la aprobación de tu pedido.</p>

                <div className="payment-summary-box">
                  <span>Total a pagar:</span>
                  <strong>
                    {formatPrice(
                      cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + (shippingFee || 0)
                    )}
                  </strong>
                </div>

                <div className="form-group">
                  <label htmlFor="card-name-input" className="form-label">Nombre del Titular</label>
                  <input
                    id="card-name-input"
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="address-search-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card-number-input" className="form-label">Número de Tarjeta</label>
                  <input
                    id="card-number-input"
                    type="text"
                    required
                    maxLength={19}
                    placeholder="1234 5678 1234 5678"
                    value={cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                      setCardNumber(formatted);
                    }}
                    className="address-search-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="card-expiry-input" className="form-label">Expiración</label>
                    <input
                      id="card-expiry-input"
                      type="text"
                      required
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length >= 2) {
                          setCardExpiry(val.substring(0, 2) + '/' + val.substring(2, 4));
                        } else {
                          setCardExpiry(val);
                        }
                      }}
                      className="address-search-input"
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="card-cvv-input" className="form-label">CVV</label>
                    <input
                      id="card-cvv-input"
                      type="password"
                      required
                      maxLength={4}
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="address-search-input"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full btn-pay-submit" style={{ marginTop: '10px' }}>
                  Completar Pedido (Simular Pago)
                </button>
              </form>
            )}

            {paymentStatus === 'processing' && (
              <div className="payment-status-wrapper flex-column-center">
                <div className="payment-spinner"></div>
                <h3 className="status-title">Procesando pago...</h3>
                <p className="status-desc">Estamos comunicándonos con la pasarela de pago de prueba...</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="payment-status-wrapper flex-column-center">
                <div className="payment-success-icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className="status-title success-text">¡Pago Aprobado con Éxito!</h2>
                <p className="status-desc text-center">
                  Tu transacción ha sido validada. Hemos generado la orden de despacho para la sucursal.
                </p>
                <div className="order-receipt-box">
                  <div className="receipt-row">
                    <span>Referencia:</span>
                    <strong>{simulatedOrderRef}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Estatus:</span>
                    <span className="badge badge-open">Listo para envío</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full" onClick={handleCloseSuccessScreen} style={{ marginTop: '10px' }}>
                  Aceptar y Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    );

  } catch (error) {
    return (
      <div style={{ padding: '50px', color: 'red', backgroundColor: '#fee', minHeight: '100vh', zIndex: 99999, position: 'relative' }}>
        <h2>Runtime Error in BusinessLandingPage</h2>
        <pre>{error instanceof Error ? error.stack : String(error)}</pre>
      </div>
    );
  }

};

