import { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, Leaf, Trash2, Plus, Minus, CheckCircle, User, MapPin, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Techniques', to: '/techniques' },
  { label: 'Farm', to: '/farm' },
  { label: 'Shop', to: '/shop' },
  { label: 'Cattle', to: '/cattle' },
  { label: 'Equipment', to: '/equipment' },
  { label: 'Schemes', to: '/schemes' },
  { label: 'Contact', to: '/contact' },
];

interface CustomerDetails {
  fullName: string;
  address: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  address?: string;
  phone?: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    address: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { cartCount, cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!customerDetails.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!customerDetails.address.trim()) {
      errors.address = 'Delivery address is required';
    }
    if (!customerDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerDetails.phone.trim())) {
      errors.phone = 'Enter a valid 10-digit phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;
    setOrderSuccess(true);
    clearCart();
    setTimeout(() => {
      setOrderSuccess(false);
      setCustomerDetails({ fullName: '', address: '', phone: '' });
      setCartOpen(false);
    }, 3000);
  };

  const handleCartOpenChange = (open: boolean) => {
    setCartOpen(open);
    if (!open) {
      setOrderSuccess(false);
      setFormErrors({});
    }
  };

  return (
    <header className="sticky top-0 z-50 gradient-green shadow-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center">
              <img
                src="/assets/generated/agro-logo.dim_128x128.png"
                alt="Agro Crops Logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <Leaf className="w-6 h-6 text-white hidden" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-lg font-merriweather leading-none">Agro Crops</span>
              <span className="text-white/80 text-xs font-poppins">Organic Farming</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPath === link.to
                    ? 'bg-white/25 text-white'
                    : 'text-white/85 hover:bg-white/15 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Cart Sheet */}
            <Sheet open={cartOpen} onOpenChange={handleCartOpenChange}>
              <SheetTrigger asChild>
                <button
                  className="relative p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
                <SheetHeader className="px-6 py-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2 text-foreground font-merriweather">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Your Cart
                    {cartCount > 0 && (
                      <span className="ml-auto text-xs font-normal text-muted-foreground">
                        {cartCount} item{cartCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </SheetTitle>
                </SheetHeader>

                {/* Order Success State */}
                {orderSuccess ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-lg mb-2 font-merriweather">Order Placed Successfully!</p>
                      <p className="text-sm text-muted-foreground">We will contact you shortly. Thank you for shopping with Agro Crops! 🌱</p>
                    </div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12">
                    <div className="w-20 h-20 rounded-full bg-green-pale flex items-center justify-center">
                      <ShoppingCart className="w-10 h-10 text-primary/40" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground mb-1">Your cart is empty</p>
                      <p className="text-sm text-muted-foreground">Add some organic products to get started!</p>
                    </div>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        router.navigate({ to: '/shop' });
                      }}
                      className="gradient-green text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-green hover:shadow-card-hover transition-all duration-200"
                    >
                      Browse Shop
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex gap-3 items-start bg-card rounded-xl p-3 border border-border">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground leading-snug mb-1 truncate">{item.name}</p>
                            <p className="text-primary font-bold text-sm">₹{item.price}</p>
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-green-pale text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-semibold text-foreground w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-green-pale text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p className="text-sm font-bold text-foreground">₹{item.price * item.quantity}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Customer Details Form */}
                      <div className="mt-4 border border-primary/20 rounded-xl p-4 bg-green-pale/30">
                        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2 font-merriweather">
                          <User className="w-4 h-4 text-primary" />
                          Customer Details
                        </h3>
                        <div className="space-y-3">
                          {/* Full Name */}
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                              <input
                                type="text"
                                placeholder="Enter your full name"
                                value={customerDetails.fullName}
                                onChange={(e) => {
                                  setCustomerDetails(prev => ({ ...prev, fullName: e.target.value }));
                                  if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: undefined }));
                                }}
                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                                  formErrors.fullName ? 'border-red-400' : 'border-border'
                                }`}
                              />
                            </div>
                            {formErrors.fullName && (
                              <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                            )}
                          </div>

                          {/* Delivery Address */}
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1">
                              Delivery Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                              <textarea
                                placeholder="Enter your delivery address"
                                rows={3}
                                value={customerDetails.address}
                                onChange={(e) => {
                                  setCustomerDetails(prev => ({ ...prev, address: e.target.value }));
                                  if (formErrors.address) setFormErrors(prev => ({ ...prev, address: undefined }));
                                }}
                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none ${
                                  formErrors.address ? 'border-red-400' : 'border-border'
                                }`}
                              />
                            </div>
                            {formErrors.address && (
                              <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                              <input
                                type="tel"
                                placeholder="10-digit mobile number"
                                value={customerDetails.phone}
                                maxLength={10}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  setCustomerDetails(prev => ({ ...prev, phone: val }));
                                  if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: undefined }));
                                }}
                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                                  formErrors.phone ? 'border-red-400' : 'border-border'
                                }`}
                              />
                            </div>
                            {formErrors.phone && (
                              <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cart Footer */}
                    <div className="border-t border-border px-6 py-4 space-y-3 bg-card">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">Subtotal</span>
                        <span className="font-bold text-foreground text-lg">₹{cartTotal}</span>
                      </div>
                      <button
                        className="w-full gradient-green text-white py-3 rounded-xl font-semibold text-base shadow-green hover:shadow-card-hover hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout — ₹{cartTotal}
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors py-1"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>

            <button
              className="lg:hidden p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="lg:hidden pb-4 animate-slideUp">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPath === link.to
                      ? 'bg-white/25 text-white'
                      : 'text-white/85 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
