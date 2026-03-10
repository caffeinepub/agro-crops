import { Link } from "@tanstack/react-router";
import { Leaf, Mail, MapPin, Phone, Sprout } from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(3, 9, 6, 0.98)",
        borderTop: "1px solid rgba(120, 230, 60, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glow at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(120, 230, 60, 0.5), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "60px",
          background:
            "radial-gradient(ellipse, rgba(120, 230, 60, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(100, 65%, 38%), hsl(135, 50%, 28%))",
                  boxShadow: "0 0 16px rgba(120, 230, 60, 0.35)",
                }}
              >
                <Leaf size={20} className="text-white" />
              </div>
              <div>
                <span
                  className="font-display font-bold text-xl block"
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
                <span
                  style={{
                    color: "rgba(120, 230, 60, 0.5)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    fontFamily: "Outfit",
                  }}
                >
                  ORGANIC FARMING
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(200, 225, 205, 0.55)" }}
            >
              Empowering farmers with knowledge, tools, and resources for
              sustainable and profitable agriculture.
            </p>
            {/* Social/contact badges */}
            <div className="flex gap-2 flex-wrap">
              <a
                href="mailto:kharatchaitanya03@gmail.com"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                  background: "rgba(120, 230, 60, 0.07)",
                  border: "1px solid rgba(120, 230, 60, 0.18)",
                  color: "hsl(100, 72%, 62%)",
                  fontFamily: "Outfit",
                }}
              >
                <Mail size={11} /> Email
              </a>
              <a
                href="tel:+918421016006"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                  background: "rgba(120, 230, 60, 0.07)",
                  border: "1px solid rgba(120, 230, 60, 0.18)",
                  color: "hsl(100, 72%, 62%)",
                  fontFamily: "Outfit",
                }}
              >
                <Phone size={11} /> Call
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold text-base mb-5"
              style={{
                color: "hsl(100, 72%, 62%)",
                fontFamily: "Sora",
                letterSpacing: "0.05em",
              }}
            >
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", emoji: "🌿", label: t("home") },
                { to: "/about", emoji: "📖", label: t("about") },
                { to: "/techniques", emoji: "🤝", label: t("techniques") },
                { to: "/farm", emoji: "🌾", label: t("farm") },
                { to: "/shop", emoji: "🛒", label: t("shop") },
                { to: "/schemes", emoji: "🏛", label: t("schemes") },
                {
                  to: "/crop-suggestions",
                  emoji: "📍",
                  label: t("cropSuggestions"),
                },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm transition-all group"
                    style={{
                      color: "rgba(200, 225, 205, 0.5)",
                      fontFamily: "Outfit",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{ background: "rgba(120, 230, 60, 0.3)" }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.emoji} {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-base mb-5"
              style={{
                color: "hsl(100, 72%, 62%)",
                fontFamily: "Sora",
                letterSpacing: "0.05em",
              }}
            >
              {t("contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li
                className="flex items-center gap-3 text-sm"
                style={{ color: "rgba(200, 225, 205, 0.6)" }}
              >
                <Mail
                  size={15}
                  style={{ color: "hsl(100, 65%, 55%)", flexShrink: 0 }}
                />
                <a
                  href="mailto:kharatchaitanya03@gmail.com"
                  className="hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "Outfit" }}
                >
                  kharatchaitanya03@gmail.com
                </a>
              </li>
              <li
                className="flex items-center gap-3 text-sm"
                style={{ color: "rgba(200, 225, 205, 0.6)" }}
              >
                <Phone
                  size={15}
                  style={{ color: "hsl(100, 65%, 55%)", flexShrink: 0 }}
                />
                <a
                  href="tel:+918421016006"
                  className="hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "Outfit" }}
                >
                  +91 8421016006
                </a>
              </li>
              <li
                className="flex items-start gap-3 text-sm"
                style={{ color: "rgba(200, 225, 205, 0.6)" }}
              >
                <MapPin
                  size={15}
                  style={{
                    color: "hsl(100, 65%, 55%)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <span style={{ fontFamily: "Outfit" }}>Maharashtra, India</span>
              </li>
            </ul>

            {/* Stats mini */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { value: "10K+", label: "Farmers" },
                { value: "20+", label: "Crops" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: "rgba(8, 22, 12, 0.9)",
                    border: "1px solid rgba(120, 230, 60, 0.1)",
                  }}
                >
                  <div
                    className="font-bold text-lg"
                    style={{ color: "hsl(100, 72%, 62%)", fontFamily: "Sora" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      color: "rgba(200, 225, 205, 0.45)",
                      fontFamily: "Outfit",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(120, 230, 60, 0.08)",
            color: "rgba(200, 225, 205, 0.35)",
            fontFamily: "Outfit",
          }}
        >
          <p>
            © {year} Agro Crops. {t("rights")}.
          </p>
          <div className="flex items-center gap-2">
            <Sprout size={12} style={{ color: "rgba(120, 230, 60, 0.4)" }} />
            <span>Organic Farming Management System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
