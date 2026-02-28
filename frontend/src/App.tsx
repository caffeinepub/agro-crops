import React, { createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import About from './pages/About';
import Techniques from './pages/Techniques';
import Farm from './pages/Farm';
import Shop from './pages/Shop';
import Cattle from './pages/Cattle';
import Equipment from './pages/Equipment';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

// Cart Context
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
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

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Auth guard
function isAuthenticated() {
  return sessionStorage.getItem('isAuthenticated') === 'true';
}

// Layout
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({ component: Layout });

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/signup' });
    }
  },
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

const signupRoute = createRoute({ getParentRoute: () => rootRoute, path: '/signup', component: Signup });
const otpRoute = createRoute({ getParentRoute: () => rootRoute, path: '/otp', component: OtpVerification });

const routeTree = rootRoute.addChildren([
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
  ]),
  signupRoute,
  otpRoute,
]);

const router = createRouter({ routeTree });

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <LanguageProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartProvider>
        </LanguageProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
