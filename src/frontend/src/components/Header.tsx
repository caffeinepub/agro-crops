import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Leaf,
  LogOut,
  Menu,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../App";
import { useLanguage } from "../contexts/LanguageContext";
import CheckoutModal from "./CheckoutModal";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { to: "/", emoji: "🌿", key: "home" },
  { to: "/about", emoji: "📖", key: "about" },
  { to: "/techniques", emoji: "🤝", key: "techniques" },
  { to: "/farm", emoji: "🌾", key: "farm" },
  { to: "/shop", emoji: "🛒", key: "shop" },
  { to: "/cattle", emoji: "🐄", key: "cattle" },
  { to: "/equipment", emoji: "🚜", key: "equipment" },
  { to: "/schemes", emoji: "🏛", key: "schemes" },
  { to: "/crop-suggestions", emoji: "📍", key: "cropSuggestions" },
  { to: "/contact", emoji: "☎", key: "contact" },
];

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate({ to: "/signup" });
  };

  const links = navLinks.map((l) => ({ ...l, label: t(l.key as any) }));

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(4, 12, 8, 0.92)" : "rgba(4, 12, 8, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(120, 230, 60, 0.12)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(120, 230, 60, 0.06)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          data-ocid="nav.link"
        >
          <div
            className="relative"
            style={{
              filter: "drop-shadow(0 0 12px rgba(120, 230, 60, 0.5))",
              transition: "filter 0.3s ease",
            }}
          >
            <img
              src="/assets/generated/agro-logo.dim_128x128.png"
              alt="Agro Crops"
              className="h-10 w-10 rounded-full object-cover"
              style={{ border: "1.5px solid rgba(120, 230, 60, 0.4)" }}
            />
          </div>
          <div className="hidden sm:block">
            <span
              className="font-display font-bold text-xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(100, 72%, 62%), hsl(135, 55%, 50%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Agro Crops
            </span>
            <p
              className="text-xs"
              style={{
                color: "rgba(120, 230, 60, 0.6)",
                letterSpacing: "0.12em",
                fontFamily: "Outfit",
              }}
            >
              ORGANIC FARMING
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1"
              style={{
                fontFamily: "Sora, sans-serif",
                color: "rgba(220, 240, 225, 0.75)",
              }}
              activeProps={{
                style: {
                  color: "hsl(100, 72%, 62%)",
                  background: "rgba(120, 230, 60, 0.08)",
                  boxShadow:
                    "0 0 12px rgba(120, 230, 60, 0.15), inset 0 0 8px rgba(120, 230, 60, 0.05)",
                  border: "1px solid rgba(120, 230, 60, 0.2)",
                  fontFamily: "Sora, sans-serif",
                } as React.CSSProperties,
              }}
            >
              <span style={{ fontSize: "0.85rem" }}>{link.emoji}</span>
              <span>{link.label}</span>
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
                data-ocid="cart.button"
                className="relative p-2 rounded-full transition-all duration-200"
                style={{
                  color: "hsl(100, 60%, 58%)",
                  border: "1px solid rgba(120, 230, 60, 0.2)",
                  background: "rgba(120, 230, 60, 0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 16px rgba(120, 230, 60, 0.4)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(120, 230, 60, 0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(120, 230, 60, 0.2)";
                }}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(100, 72%, 50%), hsl(135, 55%, 40%))",
                      color: "#fff",
                      boxShadow: "0 0 8px rgba(120, 230, 60, 0.5)",
                      fontFamily: "Sora",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              className="w-full sm:max-w-md flex flex-col"
              style={{
                background: "rgba(4, 12, 8, 0.95)",
                backdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(120, 230, 60, 0.15)",
              }}
            >
              <SheetHeader>
                <SheetTitle
                  className="flex items-center gap-2"
                  style={{ color: "hsl(100, 72%, 62%)", fontFamily: "Sora" }}
                >
                  <ShoppingCart size={20} /> {t("cart")}
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col flex-1 overflow-hidden">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center" data-ocid="cart.empty_state">
                      <ShoppingCart
                        size={48}
                        className="mx-auto mb-3"
                        style={{ color: "rgba(120, 230, 60, 0.3)" }}
                      />
                      <p style={{ color: "rgba(200, 225, 205, 0.5)" }}>
                        {t("yourCartIsEmpty")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto py-4 space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-xl"
                          style={{
                            background: "rgba(8, 22, 12, 0.85)",
                            border: "1px solid rgba(120, 230, 60, 0.1)",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg"
                            style={{
                              border: "1px solid rgba(120, 230, 60, 0.15)",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-medium text-sm truncate"
                              style={{
                                color: "hsl(120, 30%, 88%)",
                                fontFamily: "Sora",
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              className="font-bold text-sm"
                              style={{ color: "hsl(100, 72%, 62%)" }}
                            >
                              ₹{item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 rounded-lg transition-all"
                              style={{
                                background: "rgba(120, 230, 60, 0.08)",
                                border: "1px solid rgba(120, 230, 60, 0.2)",
                                color: "hsl(100, 72%, 62%)",
                              }}
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className="w-6 text-center text-sm font-medium"
                              style={{ color: "hsl(120, 30%, 88%)" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded-lg transition-all"
                              style={{
                                background: "rgba(120, 230, 60, 0.08)",
                                border: "1px solid rgba(120, 230, 60, 0.2)",
                                color: "hsl(100, 72%, 62%)",
                              }}
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 rounded-lg ml-1 transition-all"
                              style={{
                                color: "hsl(0, 70%, 60%)",
                                background: "rgba(255, 50, 50, 0.06)",
                                border: "1px solid rgba(255, 50, 50, 0.15)",
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="pt-4"
                      style={{
                        borderTop: "1px solid rgba(120, 230, 60, 0.12)",
                      }}
                    >
                      <div
                        className="flex justify-between font-bold mb-3"
                        style={{ fontFamily: "Sora" }}
                      >
                        <span style={{ color: "hsl(120, 30%, 88%)" }}>
                          {t("total")}:
                        </span>
                        <span style={{ color: "hsl(100, 72%, 62%)" }}>
                          ₹{cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <button
                        type="button"
                        data-ocid="cart.primary_button"
                        onClick={() => {
                          setCartOpen(false);
                          setTimeout(() => setCheckoutModalOpen(true), 300);
                        }}
                        className="w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(100, 65%, 45%), hsl(135, 55%, 35%))",
                          color: "#fff",
                          fontFamily: "Sora",
                          boxShadow: "0 4px 20px rgba(120, 230, 60, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.boxShadow =
                            "0 8px 30px rgba(120, 230, 60, 0.5)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.boxShadow =
                            "0 4px 20px rgba(120, 230, 60, 0.3)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.transform = "none";
                        }}
                      >
                        <Leaf size={16} />
                        {t("checkout")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

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
            data-ocid="nav.button"
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              color: "rgba(200, 230, 205, 0.7)",
              border: "1px solid rgba(120, 230, 60, 0.15)",
              background: "rgba(120, 230, 60, 0.04)",
              fontFamily: "Sora",
              fontSize: "0.8rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(120, 230, 60, 0.4)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "hsl(100, 72%, 62%)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(120, 230, 60, 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(120, 230, 60, 0.15)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(200, 230, 205, 0.7)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(120, 230, 60, 0.04)";
            }}
          >
            <LogOut size={14} />
            {t("logout")}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            data-ocid="nav.toggle"
            className="xl:hidden p-2 rounded-lg transition-all"
            style={{
              color: "hsl(100, 60%, 58%)",
              border: "1px solid rgba(120, 230, 60, 0.15)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="xl:hidden px-4 py-4"
          style={{
            background: "rgba(4, 12, 8, 0.97)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(120, 230, 60, 0.1)",
          }}
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className="px-3 py-2.5 text-sm font-medium rounded-xl transition-all flex items-center gap-2"
                style={{
                  color: "rgba(200, 230, 210, 0.75)",
                  fontFamily: "Sora",
                }}
                onClick={() => setMobileOpen(false)}
                activeProps={{
                  style: {
                    color: "hsl(100, 72%, 62%)",
                    background: "rgba(120, 230, 60, 0.08)",
                    border: "1px solid rgba(120, 230, 60, 0.2)",
                    fontFamily: "Sora",
                  } as React.CSSProperties,
                }}
              >
                <span>{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 px-3 py-2 text-sm font-medium rounded-xl text-left flex items-center gap-2 transition-all"
              style={{
                color: "hsl(0, 65%, 62%)",
                background: "rgba(255, 50, 50, 0.05)",
                fontFamily: "Sora",
              }}
            >
              <LogOut size={14} /> {t("logout")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
