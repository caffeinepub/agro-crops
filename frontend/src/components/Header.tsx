import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, Leaf, Plus, Minus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useCart } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { toast } from 'sonner';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [customerDetails, setCustomerDetails] = useState({ fullName: '', deliveryAddress: '', phoneNumber: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  const navLinks = [
    { label: t('home'), path: '/' },
    { label: t('about'), path: '/about' },
    { label: t('techniques'), path: '/techniques' },
    { label: t('farm'), path: '/farm' },
    { label: t('shop'), path: '/shop' },
    { label: t('cattle'), path: '/cattle' },
    { label: t('equipment'), path: '/equipment' },
    { label: t('schemes'), path: '/schemes' },
    { label: t('contact'), path: '/contact' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setMobileMenuOpen(false);
    navigate({ to: '/signup' });
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!customerDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!customerDetails.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    if (!/^\d{10}$/.test(customerDetails.phoneNumber)) newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details');
    } else if (checkoutStep === 'details') {
      if (validateDetails()) {
        clearCart();
        setCheckoutStep('success');
        toast.success(t('orderSuccess'));
      }
    }
  };

  const handleCartClose = () => {
    setCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setCustomerDetails({ fullName: '', deliveryAddress: '', phoneNumber: '' });
      setErrors({});
    }, 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">Agro Crops</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                activeProps={{ className: 'px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher - Desktop */}
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>

            {/* Cart */}
            {isAuthenticated && (
              <Sheet open={cartOpen} onOpenChange={(open) => { if (!open) handleCartClose(); else setCartOpen(true); }}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t('cartTitle')}</SheetTitle>
                  </SheetHeader>

                  {checkoutStep === 'success' ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Leaf className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-lg font-semibold text-center text-foreground">{t('orderSuccess')}</p>
                      <Button onClick={handleCartClose} className="eco-btn">{t('home')}</Button>
                    </div>
                  ) : checkoutStep === 'details' ? (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t('fullName')}</Label>
                        <Input
                          id="fullName"
                          value={customerDetails.fullName}
                          onChange={(e) => setCustomerDetails(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder={t('fullName')}
                        />
                        {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryAddress">{t('deliveryAddress')}</Label>
                        <Input
                          id="deliveryAddress"
                          value={customerDetails.deliveryAddress}
                          onChange={(e) => setCustomerDetails(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                          placeholder={t('deliveryAddress')}
                        />
                        {errors.deliveryAddress && <p className="text-destructive text-xs">{errors.deliveryAddress}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">{t('phoneNumber')}</Label>
                        <Input
                          id="phoneNumber"
                          value={customerDetails.phoneNumber}
                          onChange={(e) => setCustomerDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
                          placeholder="10-digit phone number"
                          maxLength={10}
                        />
                        {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber}</p>}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" onClick={() => setCheckoutStep('cart')} className="flex-1">
                          Back
                        </Button>
                        <Button onClick={handleCheckout} className="flex-1 eco-btn">
                          {t('proceedToCheckout')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
                          <ShoppingCart className="w-12 h-12 opacity-30" />
                          <p>{t('noItemsInCart')}</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 mb-4">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
                                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                                  <p className="text-primary font-semibold text-sm">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-border pt-4 space-y-3">
                            <div className="flex justify-between font-semibold text-foreground">
                              <span>{t('total')}</span>
                              <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={clearCart} className="flex-1 text-destructive border-destructive hover:bg-destructive/10">
                                {t('clearCart')}
                              </Button>
                              <Button onClick={handleCheckout} className="flex-1 eco-btn">
                                {t('proceedToCheckout')}
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            )}

            {/* Auth Button */}
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex">
                {t('logout')}
              </Button>
            ) : (
              <Button size="sm" onClick={() => navigate({ to: '/signup' })} className="hidden sm:flex eco-btn">
                {t('login')}
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                activeProps={{ className: 'block px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center gap-3">
              <LanguageSwitcher />
            </div>
            <div className="px-3 py-2">
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                  {t('logout')}
                </Button>
              ) : (
                <Button size="sm" onClick={() => { navigate({ to: '/signup' }); setMobileMenuOpen(false); }} className="w-full eco-btn">
                  {t('login')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
