
window.addEventListener('error', (e) => {
  document.body.innerHTML = '<div style="padding:20px;color:red;z-index:9999;position:relative;"><h1>Global Error</h1><pre>' + e.error?.stack + '</pre></div>';
});
window.addEventListener('unhandledrejection', (e) => {
  document.body.innerHTML = '<div style="padding:20px;color:red;z-index:9999;position:relative;"><h1>Promise Error</h1><pre>' + e.reason?.stack + '</pre></div>';
});

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
