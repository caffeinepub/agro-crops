import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import VoiceReader from './components/VoiceReader';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import About from './pages/About';
import Techniques from './pages/Techniques';
import Farm from './pages/Farm';
import Shop from './pages/Shop';
import Cattle from './pages/Cattle';
import Equipment from './pages/Equipment';
import Contact from './pages/Contact';
import GovernmentSchemes from './pages/GovernmentSchemes';
import CropSuggestions from './pages/CropSuggestions';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';

// ─── Cart Types ───────────────────────────────────────────────────────────────
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  wishlist: number[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, wishlist, addToCart, removeFromCart, updateQuantity,
      clearCart, toggleWishlist, cartCount, cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
const isAuthenticated = () => sessionStorage.getItem('isAuthenticated') === 'true';

// ─── Authenticated Layout ─────────────────────────────────────────────────────
const VOICE_EXCLUDED_PATHS = ['/signup', '/otp'];

function AuthLayout() {
  const location = useLocation();
  const showVoice = !VOICE_EXCLUDED_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {showVoice && <VoiceReader />}
    </div>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Auth-guarded layout route
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/signup' });
    }
  },
  component: AuthLayout,
});

const homeRoute = createRoute({ getParentRoute: () => mainRoute, path: '/', component: Home });
const aboutRoute = createRoute({ getParentRoute: () => mainRoute, path: '/about', component: About });
const techniquesRoute = createRoute({ getParentRoute: () => mainRoute, path: '/techniques', component: Techniques });
const farmRoute = createRoute({ getParentRoute: () => mainRoute, path: '/farm', component: Farm });
const shopRoute = createRoute({ getParentRoute: () => mainRoute, path: '/shop', component: Shop });
const cattleRoute = createRoute({ getParentRoute: () => mainRoute, path: '/cattle', component: Cattle });
const equipmentRoute = createRoute({ getParentRoute: () => mainRoute, path: '/equipment', component: Equipment });
const contactRoute = createRoute({ getParentRoute: () => mainRoute, path: '/contact', component: Contact });
const schemesRoute = createRoute({ getParentRoute: () => mainRoute, path: '/schemes', component: GovernmentSchemes });
const cropSuggestionsRoute = createRoute({ getParentRoute: () => mainRoute, path: '/crop-suggestions', component: CropSuggestions });

// Public routes
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/' });
    }
  },
  component: Signup,
});

const otpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/otp',
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/' });
    }
  },
  component: OtpVerification,
});

const routeTree = rootRoute.addChildren([
  signupRoute,
  otpRoute,
  mainRoute.addChildren([
    homeRoute,
    aboutRoute,
    techniquesRoute,
    farmRoute,
    shopRoute,
    cattleRoute,
    equipmentRoute,
    contactRoute,
    schemesRoute,
    cropSuggestionsRoute,
  ]),
]);

const router = createRouter({ routeTree });

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
