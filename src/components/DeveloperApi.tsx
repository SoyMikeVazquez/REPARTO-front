import React, { useState } from 'react';
import './DeveloperApi.css';

type LangType = 'curl' | 'node' | 'python';

export const DeveloperApi: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LangType>('curl');

  const renderCodeSnippet = () => {
    switch (selectedLang) {
      case 'curl':
        return (
          <>
            <span className="code-line"><span className="code-keyword">curl</span> -X POST <span className="code-string">"https://api.reparto.mx/v1/deliveries"</span> \</span>
            <span className="code-line">  -H <span className="code-string">"Authorization: Bearer YOUR_API_KEY"</span> \</span>
            <span className="code-line">  -H <span className="code-string">"Content-Type: application/json"</span> \</span>
            <span className="code-line">  -d <span className="code-string">&#x27;&#123;</span></span>
            <span className="code-line">    <span className="code-string">"destination"</span>: <span className="code-string">&#x27;&#123; "address": "Av. Reforma 405, CDMX" &#125;&#x27;</span>,</span>
            <span className="code-line">    <span className="code-string">"customer"</span>: <span className="code-string">&#x27;&#123; "name": "Elena Torres", "phone": "+525512345678" &#125;&#x27;</span>,</span>
            <span className="code-line">    <span className="code-string">"items"</span>: <span className="code-string">&#x27;[ &#123; "name": "Pizza Grande", "qty": 1 &#125; ]&#x27;</span></span>
            <span className="code-line">  <span className="code-string">&#125;&#x27;</span></span>
          </>
        );
      case 'node':
        return (
          <>
            <span className="code-line"><span className="code-keyword">const</span> SDK = <span className="code-function">require</span>(<span className="code-string">&#x27;@repartomx/sdk&#x27;</span>);</span>
            <span className="code-line"><span className="code-keyword">const</span> client = <span className="code-keyword">new</span> SDK.<span className="code-function">Client</span>(&#123; apiKey: <span className="code-string">&#x27;YOUR_API_KEY&#x27;</span> &#125;);</span>
            <span className="code-line">&nbsp;</span>
            <span className="code-line"><span className="code-keyword">await</span> client.deliveries.<span className="code-function">create</span>(&#123;</span>
            <span className="code-line">  destination: &#123; address: <span className="code-string">&#x27;Av. Reforma 405, CDMX&#x27;</span> &#125;,</span>
            <span className="code-line">  customer: &#123; name: <span className="code-string">&#x27;Elena Torres&#x27;</span>, phone: <span className="code-string">&#x27;+525512345678&#x27;</span> &#125;,</span>
            <span className="code-line">  items: [&#123; name: <span className="code-string">&#x27;Pizza Grande&#x27;</span>, qty: <span className="code-number">1</span> &#125;]</span>
            <span className="code-line">&#125;);</span>
          </>
        );
      case 'python':
        return (
          <>
            <span className="code-line"><span className="code-keyword">import</span> repartomx</span>
            <span className="code-line">repartomx.api_key = <span className="code-string">"YOUR_API_KEY"</span></span>
            <span className="code-line">&nbsp;</span>
            <span className="code-line">delivery = repartomx.Delivery.<span className="code-function">create</span>(</span>
            <span className="code-line">  destination=&#123;<span className="code-string">"address"</span>: <span className="code-string">"Av. Reforma 405, CDMX"</span>&#125;,</span>
            <span className="code-line">  customer=&#123;<span className="code-string">"name"</span>: <span className="code-string">"Elena Torres"</span>, <span className="code-string">"phone"</span>: <span className="code-string">"+525512345678"</span>&#125;,</span>
            <span className="code-line">  items=[&#123;<span className="code-string">"name"</span>: <span className="code-string">"Pizza Grande"</span>, <span className="code-string">"qty"</span>: <span className="code-number">1</span>&#125;]</span>
            <span className="code-line">)</span>
          </>
        );
    }
  };

  return (
    <section className="api-section" id="api">
      <div className="container">
        
        {/* Section Header */}
        <div className="api-header">
          <span className="features-tag">Integración Fácil</span>
          <h2 className="api-title">Creado por y para desarrolladores</h2>
          <p className="api-desc">
            Automatiza tu logística al 100%. Despacha entregas directamente desde tu software o e-commerce con nuestra API REST y librerías cliente.
          </p>
        </div>

        {/* Content Grid */}
        <div className="api-grid">
          
          {/* Left Column: Code Terminal Simulator */}
          <div className="terminal-wrapper">
            <div className="terminal-header">
              <div className="terminal-tabs">
                <button 
                  className={`terminal-tab ${selectedLang === 'curl' ? 'active' : ''}`}
                  onClick={() => setSelectedLang('curl')}
                  id="tab-code-curl"
                >
                  cURL
                </button>
                <button 
                  className={`terminal-tab ${selectedLang === 'node' ? 'active' : ''}`}
                  onClick={() => setSelectedLang('node')}
                  id="tab-code-node"
                >
                  Node.js
                </button>
                <button 
                  className={`terminal-tab ${selectedLang === 'python' ? 'active' : ''}`}
                  onClick={() => setSelectedLang('python')}
                  id="tab-code-python"
                >
                  Python
                </button>
              </div>

              <div className="terminal-actions-dots">
                <span className="mockup-dot mockup-dot-red" style={{ width: '8px', height: '8px' }}></span>
                <span className="mockup-dot mockup-dot-yellow" style={{ width: '8px', height: '8px' }}></span>
                <span className="mockup-dot mockup-dot-green" style={{ width: '8px', height: '8px' }}></span>
              </div>
            </div>

            <pre className="terminal-body">
              <code>{renderCodeSnippet()}</code>
            </pre>
          </div>

          {/* Right Column: Descriptions & Integrations Icons */}
          <div className="api-info">
            <h3 className="api-info-subtitle">Conecta tu tienda en minutos</h3>
            <p className="api-info-desc">
              Si no quieres programar desde cero, ofrecemos plugins y conectores listos para instalar. Automatiza tus despachos cuando se confirme una compra de forma inmediata.
            </p>

            <div className="integrations-grid">
              <div className="integration-card">
                <div className="integration-icon">🛍️</div>
                <span className="integration-name">Shopify</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">🛒</div>
                <span className="integration-name">WooCommerce</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">⚡</div>
                <span className="integration-name">Zapier</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">🔗</div>
                <span className="integration-name">Webhooks API</span>
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <a href="#docs" className="btn btn-outline" style={{ width: '100%' }} id="developer-docs-button">
                Ver Documentación de la API
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
