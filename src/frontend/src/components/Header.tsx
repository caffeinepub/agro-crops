import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Menu, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useCart } from "../App";
import { useLanguage } from "../contexts/LanguageContext";
import CheckoutModal from "./CheckoutModal";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/about", label: t("about") },
    { to: "/techniques", label: t("techniques") },
    { to: "/farm", label: t("farm") },
    { to: "/shop", label: t("shop") },
    { to: "/cattle", label: t("cattle") },
    { to: "/equipment", label: t("equipment") },
    { to: "/schemes", label: t("schemes") },
    { to: "/crop-suggestions", label: t("cropSuggestions") },
    { to: "/contact", label: t("contact") },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate({ to: "/signup" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-eco-primary/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/generated/agro-logo.dim_128x128.png"
            alt="Agro Crops"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-display font-bold text-xl text-eco-primary hidden sm:block">
            Agro Crops
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-2 py-1 text-sm font-medium text-eco-dark hover:text-eco-primary hover:bg-eco-light rounded transition-colors"
              activeProps={{ className: "text-eco-primary bg-eco-light" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Cart */}
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="relative p-2 text-eco-dark hover:text-eco-primary transition-colors"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-eco-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-eco-primary flex items-center gap-2">
                  <ShoppingCart size={20} /> {t("cart")}
                </SheetTitle>
              </SheetHeader>

              {/* Cart contents */}
              <div className="flex flex-col flex-1 overflow-hidden">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <ShoppingCart
                        size={48}
                        className="mx-auto mb-2 opacity-30"
                      />
                      <p>Your cart is empty</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto py-4 space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-2 bg-eco-light rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-eco-dark truncate">
                              {item.name}
                            </p>
                            <p className="text-eco-primary font-bold text-sm">
                              ₹{item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 rounded bg-white border border-eco-primary/30 hover:bg-eco-primary hover:text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded bg-white border border-eco-primary/30 hover:bg-eco-primary hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors ml-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-eco-dark mb-3">
                        <span>{t("total")}:</span>
                        <span className="text-eco-primary">
                          ₹{cartTotal.toFixed(2)}
                        </span>
                      </div>
                      {/* Close cart sheet first, then open checkout modal to avoid z-index conflict */}
                      <Button
                        onClick={() => {
                          setCartOpen(false);
                          setTimeout(() => setCheckoutModalOpen(true), 300);
                        }}
                        className="w-full bg-eco-primary hover:bg-eco-dark text-white"
                      >
                        <Leaf size={16} className="mr-2" />
                        {t("checkout")}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Checkout Modal — opened when user clicks Checkout in cart */}
          <CheckoutModal
            isOpen={checkoutModalOpen}
            onClose={() => setCheckoutModalOpen(false)}
            onSuccess={() => {
              clearCart();
              setCheckoutModalOpen(false);
              setCartOpen(false);
            }}
            initialProductName={cartItems.map((i) => i.name).join(", ")}
            initialQuantity={cartCount}
            initialTotalPrice={cartTotal}
            cartItems={cartItems.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            }))}
          />

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="hidden sm:block px-3 py-1.5 text-sm font-medium text-eco-primary border border-eco-primary rounded-full hover:bg-eco-primary hover:text-white transition-colors"
          >
            Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="xl:hidden p-2 text-eco-dark hover:text-eco-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-eco-primary/20 px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-eco-dark hover:text-eco-primary hover:bg-eco-light rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded text-left transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
