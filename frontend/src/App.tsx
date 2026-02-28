import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';
import Home from './pages/Home';
import About from './pages/About';
import Techniques from './pages/Techniques';
import Farm from './pages/Farm';
import Shop from './pages/Shop';
import Cattle from './pages/Cattle';
import Equipment from './pages/Equipment';
import Contact from './pages/Contact';
import GovernmentSchemes from './pages/GovernmentSchemes';

function isAuthenticated() {
  return sessionStorage.getItem('isAuthenticated') === 'true';
}

// Layout with header/footer
function MainLayout() {
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

// Auth layout (no header/footer)
function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

const rootRoute = createRootRoute();

// Auth routes (signup, otp) — redirect authenticated users away
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signup',
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/' });
    }
  },
  component: Signup,
});

const otpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/otp',
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/' });
    }
  },
  component: OtpVerification,
});

// Main routes — redirect unauthenticated users to /signup
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/signup' });
    }
  },
  component: MainLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/about',
  component: About,
});

const techniquesRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/techniques',
  component: Techniques,
});

const farmRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/farm',
  component: Farm,
});

const shopRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/shop',
  component: Shop,
});

const cattleRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/cattle',
  component: Cattle,
});

const equipmentRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/equipment',
  component: Equipment,
});

const contactRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/contact',
  component: Contact,
});

const schemesRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/schemes',
  component: GovernmentSchemes,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([signupRoute, otpRoute]),
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
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
