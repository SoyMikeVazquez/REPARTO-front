import React from 'react';

export const UsuarioSegment: React.FC = () => {
  return (
    <section id="usuario-segment" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: '60px 20px', 
      backgroundColor: '#f9fafb', 
      textAlign: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
      }}>
        
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a202c', margin: 0, letterSpacing: '-0.02em' }}>
          Usuarios
        </h2>
        
        <p style={{ fontSize: '1.15rem', color: '#4a5568', lineHeight: '1.6', maxWidth: '600px', margin: 0 }}>
          Recomendanda a usuarios y conductores a trabajar en la plataforma...
        </p>

        {/* Store Badges Row */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
          <a 
            href="https://apps.apple.com/mx/app/taxiseguro-app-oficial/id6745491422" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ transition: 'transform 0.2s', display: 'inline-block' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src="https://static.wixstatic.com/media/21410b_912c40230abd4cf982ca1a1b88535aec~mv2.jpg/v1/crop/x_18,y_15,w_482,h_163/fill/w_210,h_70,al_c,q_80,usm_0.66_1.00_0.01,enc_auto,quality_auto/App%20Store.jpg" 
              alt="Descargar en App Store" 
              style={{ height: '55px', borderRadius: '8px' }} 
            />
          </a>

          <a 
            href="https://play.google.com/store/apps/details?id=com.pideloseguro.usuario&hl=es_MX" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ transition: 'transform 0.2s', display: 'inline-block' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src="https://static.wixstatic.com/media/21410b_402f09c293704e829d918d50ed72b4fb~mv2.png/v1/fill/w_240,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_auto,quality_auto/Google%20Play%20Store.png" 
              alt="Disponible en Google Play" 
              style={{ height: '55px', borderRadius: '8px' }} 
            />
          </a>
        </div>

        <p style={{ fontSize: '1rem', color: '#718096', marginTop: '10px', marginBottom: '0' }}>
          ingresa al sitio web:
        </p>

        <a 
          href="http://www.taxiseguro.net" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '1.25rem', color: '#3182ce', textDecoration: 'none', fontWeight: '600' }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          www.taxiseguro.net
        </a>

        <a 
          href="https://wa.link/f54r4r" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            marginTop: '16px',
            padding: '14px 28px', 
            backgroundColor: '#25D366', 
            color: 'white', 
            fontWeight: 'bold', 
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
            transition: 'background-color 0.2s, transform 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1DA851';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#25D366';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          QUIERO UNA FRANQUICIA
        </a>

        <div style={{ marginTop: '30px', fontSize: '0.85rem', color: '#a0aec0', borderTop: '1px solid #e2e8f0', paddingTop: '20px', width: '100%' }}>
          <a 
            href="http://www.guiadefranquicias.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#a0aec0', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#718096'}
            onMouseOut={(e) => e.currentTarget.style.color = '#a0aec0'}
          >
            © 2017 guiadefranquicias.com
          </a>
        </div>
      </div>
    </section>
  );
};
