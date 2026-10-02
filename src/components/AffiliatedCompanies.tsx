import React, { useEffect, useState } from 'react';
import './AffiliatedCompanies.css';
import { getRecentCompanies } from '../supabaseClient';
import type { RecentCompanyData } from '../supabaseClient';

export const AffiliatedCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<RecentCompanyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getRecentCompanies();
        setCompanies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return null;
  if (companies.length === 0) return null;

  return (
    <section className="affiliated-section">
      <div className="container">
        <div className="affiliated-header">
          <span className="affiliated-tag">NUEVOS SOCIOS</span>
          <h2>Empresas recientemente afiliadas</h2>
          <p>Descubre los negocios que ya confían en Reparto.mx para gestionar y potenciar sus entregas locales.</p>
        </div>
        
        <div className="affiliated-grid">
          {companies.map((company) => (
            <a href={`/${company.urlEmpresaUnico}`} key={company.idEmpresa} className="affiliated-card">
              <div 
                className="affiliated-cover" 
                style={{ 
                  backgroundImage: company.portada ? `url(${company.portada})` : 'linear-gradient(135deg, #1e293b, #0f172a)'
                }}
              >
                <div className="affiliated-overlay"></div>
                {company.logoEmpresa && (
                  <div className="affiliated-logo-wrapper">
                    <img src={company.logoEmpresa} alt={`Logo de ${company.NombreEmpresa}`} className="affiliated-logo" />
                  </div>
                )}
              </div>
              <div className="affiliated-info">
                <h3>{company.NombreEmpresa}</h3>
                <span className="visit-store-link">Visitar tienda &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

