import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BusinessTypeSelector } from './components/BusinessTypeSelector';
import { PlatformScope } from './components/PlatformScope';
import { AffiliatedCompanies } from './components/AffiliatedCompanies';
import { Features } from './components/Features';
import { DriverProcess } from './components/DriverProcess';
import { CtaSection } from './components/CtaSection';
import { SuccessStories } from './components/SuccessStories';
import { Footer } from './components/Footer';
import { SignUpModal } from './components/SignUpModal';
import { 
  getCompanyBySlug, 
  getBranchesByCompany, 
  getProductsByCompany,
  getPersonalizacionByCompany
} from './supabaseClient';
import type { CompanyData, BranchData, ProductData, PersonalizacionData } from './supabaseClient';
import { BusinessLandingPage } from './components/BusinessLandingPage';
import { UsuarioSegment } from './components/UsuarioSegment';

type RouteType = 'home' | 'loading' | 'landing' | 'not-found' | 'usuario';


class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', background: '#fee' }}>
          <h2>App crashed</h2>
          <pre>{String(this.state.error.stack || this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [route, setRoute] = useState<RouteType>('loading');
  const [slug, setSlug] = useState<string>('');
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [personalizacion, setPersonalizacion] = useState<PersonalizacionData | null>(null);

  const loadLandingPage = async (pathSlug: string) => {
    setRoute('loading');
    setSlug(pathSlug);
    
    try {
      const companyData = await getCompanyBySlug(pathSlug);
      if (companyData) {
        const [branchesData, productsData, customData] = await Promise.all([
          getBranchesByCompany(companyData.idEmpresa),
          getProductsByCompany(companyData.idEmpresa),
          getPersonalizacionByCompany(companyData.idEmpresa)
        ]);
        setCompany(companyData);
        setBranches(branchesData);
        setProducts(productsData);
        setPersonalizacion(customData);
        setRoute('landing');
      } else {
        setRoute('not-found');
      }
    } catch (err) {
      console.error('Error loading landing page data:', err);
      setRoute('not-found');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (!path || path === 'index.html') {
        setRoute('home');
        setSlug('');
        setCompany(null);
        setBranches([]);
        setProducts([]);
      } else if (path === 'usuario') {
        setRoute('usuario');
      } else {
        loadLandingPage(path);
      }
    };

    // Initial load check
    const initialPath = window.location.pathname.replace(/^\/|\/$/g, '');
    if (!initialPath || initialPath === 'index.html') {
      setRoute('home');
    } else if (initialPath === 'usuario') {
      setRoute('usuario');
    } else {
      loadLandingPage(initialPath);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    setRoute('home');
    setSlug('');
    setCompany(null);
    setBranches([]);
    setProducts([]);
  };

  // 1. Loading Screen
  if (route === 'loading') {
    return (
      <div className="storefront-loading-wrapper">
        <div className="loading-bolt-pulsar">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7L9 17H16L15 25L23 15H16L17 7Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="loading-text">Cargando tienda...</span>
      </div>
    );
  }

  // 2. 404 Not Found Page
  if (route === 'not-found') {
    return (
      <div className="storefront-error-wrapper">
        <div className="error-container glass">
          <div className="error-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h1 className="error-title">Tienda no encontrada</h1>
          <p className="error-message">
            La dirección "{slug}" no corresponde a ningún negocio registrado o activo en nuestra plataforma PideloSeguro.
          </p>
          <button className="btn btn-primary w-full" onClick={handleBackToHome}>
            Volver a pideloseguro.mx
          </button>
        </div>
      </div>
    );
  }

  // 3. Custom Business Storefront Landing Page
  if (route === 'landing' && company) {
    return (
      <BusinessLandingPage 
        company={company} 
        branches={branches} 
        products={products} 
        personalizacion={personalizacion}
        onBackToHome={handleBackToHome}
      />
    );
  }

  // 4. Usuario Standalone Page
  if (route === 'usuario') {
    return (
      <ErrorBoundary>
        <UsuarioSegment />
      </ErrorBoundary>
    );
  }

  // 5. Default pideloseguro.mx Home Page
  return (
    <ErrorBoundary>
      <Navbar />
      <main>
        <Hero />
        <BusinessTypeSelector />
        <PlatformScope />
        <Features />
        <AffiliatedCompanies />
        <DriverProcess />
        <CtaSection />
        <SuccessStories />
      </main>
      <Footer />
      <SignUpModal />
    </ErrorBoundary>
  );
};

export default App;
