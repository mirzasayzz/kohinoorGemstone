import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { BusinessProvider } from './context/BusinessContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SocketProvider } from './context/SocketContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AllGemstones from './pages/AllGemstones';
import GemstoneDetail from './pages/GemstoneDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { API_CONFIG } from './config/config';
import './index.css';

// Keep backend alive - ping every 10 minutes to prevent cold starts (only in production)
const keepBackendAlive = () => {
  // Only ping in production to prevent cold starts on Render
  if (import.meta.env.PROD) {
    fetch(`${API_CONFIG.BASE_URL}/health`, { method: 'GET' }).catch(() => {});
  }
};

// Initial wake-up and periodic keep-alive
if (typeof window !== 'undefined') {
  keepBackendAlive(); // Wake up immediately on page load
  setInterval(keepBackendAlive, 10 * 60 * 1000); // Every 10 minutes
  
  // ========================================
  // Copy Protection - Makes site harder to copy
  // ========================================
  
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Disable keyboard shortcuts for copying
  document.addEventListener('keydown', (e) => {
    // Disable Ctrl+S, Ctrl+U, Ctrl+C, Ctrl+Shift+I, F12
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
      e.key === 'F12'
    ) {
      e.preventDefault();
      return false;
    }
  });
  
  // Disable drag events
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Console warning for DevTools
  console.log(
    '%c⚠️ Warning!',
    'color: red; font-size: 40px; font-weight: bold;'
  );
  console.log(
    '%cThis is protected content. Unauthorized copying or reproduction is prohibited.',
    'color: #333; font-size: 16px;'
  );
}

// 404 Not Found component
const NotFound = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 text-center">
    <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
    <a href="/" className="btn-primary">
      Return Home
    </a>
  </div>
);

// App wrapper with providers
const AppWithProviders = () => {
  return (
    <ToastProvider>
      <BusinessProvider>
        <AuthProvider>
          <SocketProvider>
            <WishlistProvider>
              <CartProvider>
                <Router>
                <div className="App font-body">
                  <Routes>
                    {/* Auth pages - standalone without layout */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    
                    {/* Main app with layout */}
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="gemstones" element={<AllGemstones />} />
                      <Route path="gemstone/:slug" element={<GemstoneDetail />} />
                      <Route path="about" element={<About />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="wishlist" element={<Wishlist />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="settings" element={<Navigate to="/profile" replace />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </div>
              </Router>
              </CartProvider>
            </WishlistProvider>
          </SocketProvider>
        </AuthProvider>
      </BusinessProvider>
    </ToastProvider>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AppWithProviders />
    </HelmetProvider>
  );
}

export default App;
