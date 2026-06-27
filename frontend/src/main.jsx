import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ========================================
// ANTI-COPY PROTECTION - DO NOT REMOVE
// Site will not work without proper setup
// ========================================

// Allowed domains - site breaks on unauthorized domains
const ALLOWED_DOMAINS = [
  'kohinoorgemstone.com',
  'www.kohinoorgemstone.com',
  'kohinoorgemstone.vercel.app',
  'localhost',
  '127.0.0.1'
];

// Check if running on authorized domain
const currentDomain = window.location.hostname;
const isAuthorized = ALLOWED_DOMAINS.some(domain =>
  currentDomain === domain || currentDomain.endsWith('.' + domain)
);

// Block unauthorized domains
if (!isAuthorized && import.meta.env.PROD) {
  document.body.innerHTML = `
    <div style="
      display: flex; 
      flex-direction: column;
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      background: #0a0a0a;
      color: #ff4444;
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️ UNAUTHORIZED</h1>
      <p style="font-size: 18px; color: #888; max-width: 500px;">
        This application is not authorized to run on this domain.
        <br><br>
        This is proprietary software. Unauthorized copying or distribution is prohibited.
      </p>
      <p style="margin-top: 40px; color: #444; font-size: 12px;">
        © Kohinoor Gemstone - All Rights Reserved
      </p>
    </div>
  `;
  throw new Error('Unauthorized domain detected. Application terminated.');
}

// Verify environment is properly configured
const requiredEnvCheck = import.meta.env.VITE_API_BASE_URL;
if (!requiredEnvCheck && import.meta.env.PROD) {
  console.error('❌ Missing required environment configuration');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
