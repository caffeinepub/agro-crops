/**
 * CheckoutModal.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A full-screen modal popup for placing orders via EmailJS (no backend needed).
 *
 * HOW TO SET UP EMAILJS:
 *   1. Create a free account at https://www.emailjs.com
 *   2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
 *   3. Email Template (template_38wjfqt) variables:
 *        {{user_name}}, {{user_phone}}, {{user_email}}, {{user_address}},
 *        {{product_name}}, {{quantity}}, {{total_price}}
 *   4. Go to Account → API Keys → copy your Public Key
 *   5. Replace the placeholder constants below (EMAILJS_SERVICE_ID, etc.)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import {
  AlertCircle,
  CheckCircle2,
  Leaf,
  Loader2,
  ShoppingBag,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// EMAILJS CONFIGURATION — Replace these with your actual keys
// ─────────────────────────────────────────────────────────────────────────
//   EMAILJS_SERVICE_ID  → Your Email Service ID  (e.g. 'service_abc123')
//   EMAILJS_TEMPLATE_ID → Your Template ID        (e.g. 'template_xyz789')
//   EMAILJS_PUBLIC_KEY  → Your Account Public Key (e.g. 'AbCdEfGhIjKlMnOp')
// ─────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_mq76jtj";
const EMAILJS_TEMPLATE_ID = "template_38wjfqt";
const EMAILJS_PUBLIC_KEY = "ralKaweZUsirim3Pg";
// ═══════════════════════════════════════════════════════════════════════════

// ── Props ─────────────────────────────────────────────────────────────────
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called after a successful order — use this to clear the cart. */
  onSuccess: () => void;
  /** Pre-filled product name (editable by customer) */
  initialProductName?: string;
  /** Pre-filled quantity */
  initialQuantity?: number;
  /** Pre-filled total price in ₹ */
  initialTotalPrice?: number;
  /** Optional: full cart items for display */
  cartItems?: Array<{ name: string; quantity: number; price: number }>;
}

// ── Validation helpers ────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidMobile = (v: string) => /^[6-9]\d{9}$/.test(v.trim());

// ── Component ─────────────────────────────────────────────────────────────
export default function CheckoutModal({
  isOpen,
  onClose,
  onSuccess,
  initialProductName = "",
  initialQuantity = 1,
  initialTotalPrice = 0,
  cartItems = [],
}: CheckoutModalProps) {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState(initialProductName);
  const [quantity, setQuantity] = useState(String(initialQuantity));
  const totalPriceDisplay = `₹${initialTotalPrice.toFixed(2)}`;

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Sync pre-filled values when modal reopens with new data
  useEffect(() => {
    if (isOpen) {
      setProductName(initialProductName);
      setQuantity(String(initialQuantity));
      setStatus("idle");
      setErrors({});
      setErrorMsg("");
    }
  }, [isOpen, initialProductName, initialQuantity]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";

    if (!mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!isValidMobile(mobile))
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number.";

    if (!email.trim()) newErrors.email = "Email address is required.";
    else if (!isValidEmail(email))
      newErrors.email = "Enter a valid email address.";

    if (!address.trim()) newErrors.address = "Delivery address is required.";

    if (!productName.trim())
      newErrors.productName = "Product name is required.";

    const qty = Number(quantity);
    if (!quantity || Number.isNaN(qty) || qty < 1)
      newErrors.quantity = "Quantity must be at least 1.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");
    setErrorMsg("");

    // Build cart summary for email (when ordering from cart)
    const cartSummary =
      cartItems.length > 0
        ? cartItems
            .map(
              (i) =>
                `${i.name} × ${i.quantity} = ₹${(i.price * i.quantity).toFixed(2)}`,
            )
            .join("\n")
        : `${productName} × ${quantity}`;

    // EmailJS template parameters — exact variable names required by template_38wjfqt
    const templateParams = {
      user_name: fullName.trim(),
      user_phone: mobile.trim(),
      user_email: email.trim(),
      user_address: address.trim(),
      product_name: cartItems.length > 0 ? cartSummary : productName.trim(),
      quantity: quantity,
      total_price: totalPriceDisplay,
    };

    try {
      // Send via EmailJS — uses ONLY public key (no server needed)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      // ✅ Success
      setStatus("success");

      // Clear cart & close after a short delay so user sees the success message
      setTimeout(() => {
        onSuccess();
        // Reset form for next use
        setFullName("");
        setMobile("");
        setEmail("");
        setAddress("");
        setStatus("idle");
      }, 1800);
    } catch (err) {
      // ❌ Error
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(
        "Failed to place order. Please check your connection and try again.",
      );
    }
  };

  // Don't render anything when closed
  if (!isOpen) return null;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    /* Overlay */
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      tabIndex={-1}
      data-ocid="checkout.modal"
    >
      {/* Modal card — uses dialog element for semantic correctness */}
      <dialog
        open
        aria-label="Checkout"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col animate-zoomIn m-0 p-0 border-0"
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="bg-eco-primary text-white px-6 py-4 rounded-t-2xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Leaf size={22} />
            <h2 className="font-display font-bold text-lg">Place Your Order</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close checkout"
            data-ocid="checkout.close_button"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Success state ────────────────────────────────────────────── */}
        {status === "success" && (
          <div
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
            data-ocid="checkout.success_state"
          >
            <div className="w-20 h-20 bg-eco-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={48} className="text-eco-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-eco-primary mb-2">
              Order placed successfully!
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Thank you for your order. We'll contact you shortly at{" "}
              <strong>{mobile}</strong>.
            </p>
          </div>
        )}

        {/* ── Form ─────────────────────────────────────────────────────── */}
        {status !== "success" && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 flex flex-col gap-4"
          >
            {/* Order summary when cart has items */}
            {cartItems.length > 0 && (
              <div className="bg-eco-light rounded-xl p-3 flex items-start gap-2">
                <ShoppingBag
                  size={16}
                  className="text-eco-primary mt-0.5 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  {cartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between text-xs text-eco-dark"
                    >
                      <span className="truncate mr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold shrink-0">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold text-eco-primary border-t border-eco-primary/20 mt-2 pt-2">
                    <span>Total</span>
                    <span>{totalPriceDisplay}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Error banner ────────────────────────────────────────── */}
            {status === "error" && (
              <div
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm"
                data-ocid="checkout.error_state"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ── Full Name ───────────────────────────────────────────── */}
            <div>
              <label
                htmlFor="checkout-fullname"
                className="block text-sm font-semibold text-eco-dark mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition-colors ${
                  errors.fullName
                    ? "border-red-400 bg-red-50"
                    : "border-eco-primary/30 focus:border-eco-primary"
                }`}
                data-ocid="checkout.fullname_input"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* ── Mobile Number ───────────────────────────────────────── */}
            <div>
              <label
                htmlFor="checkout-mobile"
                className="block text-sm font-semibold text-eco-dark mb-1"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-mobile"
                type="tel"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="10-digit mobile number"
                autoComplete="tel"
                maxLength={10}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition-colors ${
                  errors.mobile
                    ? "border-red-400 bg-red-50"
                    : "border-eco-primary/30 focus:border-eco-primary"
                }`}
                data-ocid="checkout.mobile_input"
              />
              {errors.mobile && (
                <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* ── Email ──────────────────────────────────────────────── */}
            <div>
              <label
                htmlFor="checkout-email"
                className="block text-sm font-semibold text-eco-dark mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition-colors ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-eco-primary/30 focus:border-eco-primary"
                }`}
                data-ocid="checkout.email_input"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* ── Delivery Address ───────────────────────────────────── */}
            <div>
              <label
                htmlFor="checkout-address"
                className="block text-sm font-semibold text-eco-dark mb-1"
              >
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="checkout-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/flat no., street, city, state, PIN code"
                autoComplete="street-address"
                rows={3}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition-colors resize-none ${
                  errors.address
                    ? "border-red-400 bg-red-50"
                    : "border-eco-primary/30 focus:border-eco-primary"
                }`}
                data-ocid="checkout.address_input"
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            {/* ── Product Name ──────────────────────────────────────── */}
            <div>
              <label
                htmlFor="checkout-product"
                className="block text-sm font-semibold text-eco-dark mb-1"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-product"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product name"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition-colors ${
                  errors.productName
                    ? "border-red-400 bg-red-50"
                    : "border-eco-primary/30 focus:border-eco-primary"
                }`}
                data-ocid="checkout.product_input"
              />
              {errors.productName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.productName}
                </p>
              )}
            </div>

            {/* ── Quantity & Total Price row ─────────────────────────── */}
            <div className="grid grid-cols-2 gap-3">
              {/* Quantity */}
              <div>
                <label
                  htmlFor="checkout-quantity"
                  className="block text-sm font-semibold text-eco-dark mb-1"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={1}
                  placeholder="1"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary transition-colors ${
                    errors.quantity
                      ? "border-red-400 bg-red-50"
                      : "border-eco-primary/30 focus:border-eco-primary"
                  }`}
                  data-ocid="checkout.quantity_input"
                />
                {errors.quantity && (
                  <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>
                )}
              </div>

              {/* Total Price (read-only) */}
              <div>
                <label
                  htmlFor="checkout-total"
                  className="block text-sm font-semibold text-eco-dark mb-1"
                >
                  Total Price
                </label>
                <input
                  id="checkout-total"
                  type="text"
                  value={totalPriceDisplay}
                  readOnly
                  className="w-full border border-eco-primary/20 rounded-lg px-3 py-2.5 text-sm bg-eco-light text-eco-primary font-bold cursor-not-allowed"
                />
              </div>
            </div>

            {/* ── Submit button ─────────────────────────────────────── */}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-eco-primary hover:bg-eco-dark text-white font-semibold py-3 rounded-xl transition-all mt-1"
              data-ocid="checkout.submit_button"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Placing Order…
                </>
              ) : (
                <>
                  <Leaf size={16} className="mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </form>
        )}
      </dialog>
    </div>
  );
}
