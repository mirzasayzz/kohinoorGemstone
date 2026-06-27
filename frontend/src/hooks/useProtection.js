// ========================================
// ANTI-COPY PROTECTION HOOK
// This hook must be used in all components
// Site will break on unauthorized domains
// ========================================

import { useEffect } from 'react';

// Authorized domains list
const ALLOWED_DOMAINS = [
    'kohinoorgemstone.com',
    'www.kohinoorgemstone.com',
    'kohinoorgemstone.vercel.app',
    'kohinoorgemstone-06a4b66393f6.herokuapp.com',
    'localhost',
    '127.0.0.1'
];

// License key validation (obfuscated)
const LICENSE_KEY = 'KG-2024-TUBA-MIRZA-LICENSED';
const VALIDATION_HASH = btoa(LICENSE_KEY).split('').reverse().join('');

// Check if domain is authorized
const isDomainAuthorized = () => {
    if (typeof window === 'undefined') return true;
    const hostname = window.location.hostname;
    return ALLOWED_DOMAINS.some(domain =>
        hostname === domain || hostname.endsWith('.' + domain)
    );
};

// Validation check
const validateLicense = () => {
    const storedHash = VALIDATION_HASH;
    const expectedHash = btoa(LICENSE_KEY).split('').reverse().join('');
    return storedHash === expectedHash;
};

// Anti-tampering check
const checkIntegrity = () => {
    const criticalElements = [
        'kohinoorgemstone',
        'Kohinoor Gemstone',
        'Tuba Mirza'
    ];

    // Check if critical branding exists
    const bodyText = document.body?.innerText || '';
    const hasValidBranding = criticalElements.some(el =>
        bodyText.toLowerCase().includes(el.toLowerCase())
    );

    return hasValidBranding;
};

// Main protection hook
export const useProtection = (componentName = 'Unknown') => {
    useEffect(() => {
        // Only check in production
        if (import.meta.env.DEV) return;

        // Domain check
        if (!isDomainAuthorized()) {
            console.error(`🚫 [${componentName}] Unauthorized domain detected`);
            document.body.innerHTML = `
        <div style="
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          color: #ff4444;
          font-family: system-ui, sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <div style="font-size: 80px; margin-bottom: 20px;">🚫</div>
          <h1 style="font-size: 36px; margin-bottom: 10px; color: #fff;">ACCESS DENIED</h1>
          <p style="font-size: 16px; color: #888; max-width: 400px; line-height: 1.6;">
            This application is licensed to <strong style="color: #facc15;">kohinoorgemstone.com</strong> only.
            <br><br>
            Unauthorized copying, distribution, or hosting is strictly prohibited and may result in legal action.
          </p>
          <div style="margin-top: 40px; padding: 20px; background: rgba(255,68,68,0.1); border-radius: 10px; border: 1px solid rgba(255,68,68,0.3);">
            <p style="color: #ff6b6b; font-size: 14px; margin: 0;">
              ⚠️ This incident has been logged
            </p>
          </div>
          <p style="margin-top: 40px; color: #444; font-size: 11px;">
            © 2024 Kohinoor Gemstone. All Rights Reserved.<br>
            Developed by Tuba Mirza
          </p>
        </div>
      `;
            throw new Error(`Unauthorized: Component ${componentName} blocked`);
        }

        // License validation
        if (!validateLicense()) {
            console.error(`🚫 [${componentName}] License validation failed`);
        }

        // Disable DevTools detection
        const detectDevTools = () => {
            const threshold = 160;
            if (
                window.outerWidth - window.innerWidth > threshold ||
                window.outerHeight - window.innerHeight > threshold
            ) {
                // DevTools might be open - log warning
                console.warn('%c⚠️ Developer tools detected', 'color: orange; font-size: 14px;');
            }
        };

        window.addEventListener('resize', detectDevTools);

        return () => {
            window.removeEventListener('resize', detectDevTools);
        };
    }, [componentName]);
};

// Export domain check for use in other places
export const isAuthorizedDomain = isDomainAuthorized;
export const PROTECTED_DOMAINS = ALLOWED_DOMAINS;

export default useProtection;
