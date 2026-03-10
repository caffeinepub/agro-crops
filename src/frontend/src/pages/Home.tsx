import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Leaf,
  Mail,
  Phone,
  Sprout,
  TrendingUp,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { useLanguage } from "../contexts/LanguageContext";

const regionCrops = [
  {
    region: "Maharashtra",
    crops: ["Sugarcane", "Cotton", "Soybean", "Jowar"],
    emoji: "🌿",
  },
  {
    region: "Punjab",
    crops: ["Wheat", "Rice", "Maize", "Barley"],
    emoji: "🌾",
  },
  {
    region: "Karnataka",
    crops: ["Coffee", "Ragi", "Sunflower", "Groundnut"],
    emoji: "☕",
  },
  {
    region: "Uttar Pradesh",
    crops: ["Wheat", "Sugarcane", "Potato", "Mustard"],
    emoji: "🥔",
  },
];

const schemeHighlights = [
  {
    name: "PM-KISAN",
    desc: "₹6,000/year direct income support to farmers",
    icon: "💰",
  },
  { name: "PMFBY", desc: "Crop insurance at minimal premium rates", icon: "🛡️" },
  { name: "KCC", desc: "Kisan Credit Card for easy farm credit", icon: "💳" },
  {
    name: "Soil Health Card",
    desc: "Free soil testing and nutrient recommendations",
    icon: "🌱",
  },
];

// Floating particle component
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "rgba(120, 230, 60, 0.6)",
        boxShadow: "0 0 8px rgba(120, 230, 60, 0.8)",
        animation: "particleFloat 6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div style={{ background: "hsl(145, 25%, 4%)" }}>
      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(30, 100, 50, 0.25) 0%, rgba(8, 22, 12, 0.85) 60%, hsl(145, 25%, 3%) 100%)",
        }}
      >
        {/* Farm hero image as overlay */}
        <img
          src="/assets/generated/hero-farm.dim_1400x600.png"
          alt="Farm"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18, mixBlendMode: "luminosity" }}
        />

        {/* Animated grid */}
        <div className="grid-overlay" />

        {/* Scan line */}
        <div className="scan-line" />

        {/* Particles */}
        {[
          { left: "10%", bottom: "30%", animationDelay: "0s" },
          { left: "25%", bottom: "20%", animationDelay: "1.2s" },
          { left: "60%", bottom: "40%", animationDelay: "2.5s" },
          { left: "75%", bottom: "25%", animationDelay: "0.8s" },
          { left: "85%", bottom: "50%", animationDelay: "3.1s" },
          { left: "45%", bottom: "15%", animationDelay: "1.7s" },
        ].map((p, _i) => (
          <Particle key={`p-${p.left}`} style={p} />
        ))}

        {/* Radial glow orb */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(50, 180, 80, 0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-20">
          <AnimatedSection animation="slideUp">
            {/* Futuristic badge */}
            <div className="badge-futuristic mb-8 inline-flex">
              <Leaf size={12} />
              ORGANIC FARMING PLATFORM
            </div>

            <h1
              className="font-display font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                background:
                  "linear-gradient(135deg, #ffffff 0%, hsl(100, 72%, 72%) 40%, hsl(135, 60%, 55%) 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                letterSpacing: "-0.02em",
              }}
            >
              {t("heroTitle")}
            </h1>

            <p
              className="mb-10 max-w-xl leading-relaxed"
              style={{
                fontSize: "1.15rem",
                color: "rgba(200, 240, 210, 0.75)",
                fontFamily: "Outfit",
              }}
            >
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                data-ocid="home.primary_button"
                className="eco-btn-primary"
                style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
              >
                {t("exploreShop")} <ArrowRight size={18} />
              </Link>
              <Link
                to="/techniques"
                data-ocid="home.secondary_button"
                className="eco-btn-secondary"
                style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
              >
                {t("learnTechniques")} <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-14">
              {[
                { value: "10,000+", label: "Farmers Helped" },
                { value: "35+", label: "Crop Varieties" },
                { value: "18", label: "Gov Schemes" },
                { value: "23", label: "Equipment Guides" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display font-bold"
                    style={{
                      fontSize: "1.6rem",
                      color: "hsl(100, 72%, 65%)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: "rgba(200, 225, 205, 0.45)",
                      fontSize: "0.75rem",
                      fontFamily: "Outfit",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background:
              "linear-gradient(to bottom, transparent, hsl(145, 25%, 4%))",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ============ BENEFITS GRID ============ */}
      <section className="py-20" style={{ background: "hsl(145, 22%, 5%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-14">
              <div className="badge-futuristic mb-4 inline-flex">
                PLATFORM FEATURES
              </div>
              <h2
                className="font-display font-bold"
                style={{ fontSize: "2.25rem", color: "hsl(120, 30%, 92%)" }}
              >
                {t("whyOrganicTitle")}
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Leaf size={28} />,
                title: t("organicFarming"),
                desc: t("organicFarmingDesc"),
                emoji: "🌿",
              },
              {
                icon: <TrendingUp size={28} />,
                title: t("modernTechniques"),
                desc: t("modernTechniquesDesc"),
                emoji: "📈",
              },
              {
                icon: <BookOpen size={28} />,
                title: t("govSchemes"),
                desc: t("govSchemesDesc"),
                emoji: "🏛",
              },
              {
                icon: <Sprout size={28} />,
                title: t("cropGuide"),
                desc: t("cropGuideDesc"),
                emoji: "🌱",
              },
            ].map((item, i) => (
              <AnimatedSection
                key={item.title}
                animation="zoomIn"
                delay={i * 100}
              >
                <div
                  className="card-3d p-7 text-center h-full"
                  style={{ minHeight: 200 }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(100, 200, 60, 0.15), rgba(50, 150, 70, 0.1))",
                      border: "1px solid rgba(120, 230, 60, 0.2)",
                      color: "hsl(100, 72%, 62%)",
                      boxShadow: "0 0 20px rgba(120, 230, 60, 0.1)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="font-bold mb-3"
                    style={{
                      color: "hsl(120, 30%, 92%)",
                      fontFamily: "Sora",
                      fontSize: "1rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(200, 225, 205, 0.55)",
                      fontSize: "0.875rem",
                      fontFamily: "Outfit",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REGION CROPS ============ */}
      <section className="py-20" style={{ background: "hsl(145, 25%, 4%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <div className="badge-futuristic mb-4 inline-flex">
                LOCATION INTEL
              </div>
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "2.25rem", color: "hsl(120, 30%, 92%)" }}
              >
                {t("regionCropGuideTitle")}
              </h2>
              <p
                style={{
                  color: "rgba(200, 225, 205, 0.5)",
                  fontFamily: "Outfit",
                }}
              >
                {t("regionCropGuideSubtitle")}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {regionCrops.map((r, i) => (
              <AnimatedSection key={r.region} animation="fadeIn" delay={i * 80}>
                <div className="card-3d-subtle p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ fontSize: "1.5rem" }}>{r.emoji}</span>
                    <h3
                      className="font-bold"
                      style={{
                        color: "hsl(100, 72%, 62%)",
                        fontFamily: "Sora",
                        fontSize: "1rem",
                      }}
                    >
                      {r.region}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {r.crops.map((crop) => (
                      <li
                        key={crop}
                        className="flex items-center gap-2 text-sm"
                        style={{
                          color: "rgba(200, 225, 205, 0.65)",
                          fontFamily: "Outfit",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "rgba(120, 230, 60, 0.5)",
                            flexShrink: 0,
                            boxShadow: "0 0 6px rgba(120, 230, 60, 0.4)",
                          }}
                        />
                        {crop}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/crop-suggestions"
              data-ocid="home.primary_button"
              className="eco-btn-primary"
            >
              {t("viewDetailedCropSuggestions")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CROP OF THE SEASON ============ */}
      <section className="py-20" style={{ background: "hsl(145, 22%, 5%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-12">
              <div className="badge-futuristic mb-4 inline-flex">
                SEASONAL PICKS
              </div>
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "2.25rem", color: "hsl(120, 30%, 92%)" }}
              >
                🌾 Crop of the Season
              </h2>
              <p
                style={{
                  color: "rgba(200, 225, 205, 0.5)",
                  fontFamily: "Outfit",
                }}
              >
                Featured crops currently in peak growing season — expert tips
                for best results
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🍚",
                name: "Rice",
                season: "Currently in Season",
                seasonColor: {
                  bg: "rgba(120, 230, 60, 0.1)",
                  text: "hsl(100, 72%, 62%)",
                },
                benefit: "Staple food crop, high yield varieties available",
                tip: "Maintain 5cm water level during tillering stage",
              },
              {
                emoji: "🌸",
                name: "Cotton",
                season: "Currently in Season",
                seasonColor: {
                  bg: "rgba(120, 230, 60, 0.1)",
                  text: "hsl(100, 72%, 62%)",
                },
                benefit: "Cash crop with fiber production and oil extraction",
                tip: "Monitor for bollworm weekly — use pheromone traps",
              },
              {
                emoji: "🌿",
                name: "Sugarcane",
                season: "Year-round",
                seasonColor: {
                  bg: "rgba(80, 150, 230, 0.1)",
                  text: "hsl(210, 72%, 65%)",
                },
                benefit:
                  "High income crop — sugar, ethanol & bagasse production",
                tip: "Ratoon management reduces replanting cost by 40%",
              },
            ].map((crop, i) => (
              <AnimatedSection
                key={crop.name}
                animation="zoomIn"
                delay={i * 100}
              >
                <div className="card-3d p-7 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{ fontSize: "2.5rem" }}>{crop.emoji}</span>
                    <div>
                      <h3
                        className="font-bold"
                        style={{
                          color: "hsl(120, 30%, 92%)",
                          fontFamily: "Sora",
                          fontSize: "1.1rem",
                        }}
                      >
                        {crop.name}
                      </h3>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: crop.seasonColor.bg,
                          color: crop.seasonColor.text,
                          border: `1px solid ${crop.seasonColor.text}30`,
                          fontFamily: "Outfit",
                        }}
                      >
                        {crop.season}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-sm mb-2"
                    style={{
                      color: "rgba(200, 225, 205, 0.6)",
                      fontFamily: "Outfit",
                    }}
                  >
                    <span
                      style={{ color: "hsl(120, 30%, 85%)", fontWeight: 600 }}
                    >
                      Key Benefit:
                    </span>{" "}
                    {crop.benefit}
                  </p>
                  <p
                    className="text-sm mb-5"
                    style={{
                      color: "rgba(200, 225, 205, 0.6)",
                      fontFamily: "Outfit",
                    }}
                  >
                    <span
                      style={{ color: "hsl(120, 30%, 85%)", fontWeight: 600 }}
                    >
                      💡 Tip:
                    </span>{" "}
                    {crop.tip}
                  </p>
                  <Link
                    to="/farm"
                    data-ocid="home.secondary_button"
                    className="eco-btn"
                    style={{ fontSize: "0.85rem", padding: "0.45rem 1.2rem" }}
                  >
                    Learn More <ArrowRight size={13} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SCHEME HIGHLIGHTS ============ */}
      <section className="py-20" style={{ background: "hsl(145, 25%, 4%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-12">
              <div className="badge-futuristic mb-4 inline-flex">
                GOVERNMENT SUPPORT
              </div>
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "2.25rem", color: "hsl(120, 30%, 92%)" }}
              >
                {t("schemeHighlightsTitle")}
              </h2>
              <p
                style={{
                  color: "rgba(200, 225, 205, 0.5)",
                  fontFamily: "Outfit",
                }}
              >
                {t("schemeHighlightsSubtitle")}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {schemeHighlights.map((s, i) => (
              <AnimatedSection key={s.name} animation="zoomIn" delay={i * 100}>
                <div
                  className="card-3d-subtle p-6 text-center"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 60,
                      height: 60,
                      background:
                        "radial-gradient(circle, rgba(120, 230, 60, 0.08) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                    {s.icon}
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      color: "hsl(120, 30%, 90%)",
                      fontFamily: "Sora",
                      fontSize: "0.95rem",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      color: "rgba(200, 225, 205, 0.55)",
                      fontSize: "0.82rem",
                      fontFamily: "Outfit",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/schemes"
              data-ocid="home.primary_button"
              className="eco-btn-primary"
            >
              {t("viewAllSchemes")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FUTURE SCOPE ============ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(145, 22%, 5%) 0%, hsl(145, 30%, 7%) 50%, hsl(145, 22%, 5%) 100%)",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(50, 180, 80, 0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <div className="badge-futuristic mb-4 inline-flex">
                THE FUTURE
              </div>
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "2.25rem", color: "hsl(120, 30%, 92%)" }}
              >
                {t("futureOfFarmingTitle")}
              </h2>
              <p
                style={{
                  color: "rgba(200, 225, 205, 0.5)",
                  fontFamily: "Outfit",
                }}
              >
                {t("futureOfFarmingSubtitle")}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t("precisionAg"),
                desc: t("precisionAgDesc"),
                icon: "📡",
              },
              { title: t("droneTech"), desc: t("droneTechDesc"), icon: "🚁" },
              { title: t("aiInsights"), desc: t("aiInsightsDesc"), icon: "🤖" },
            ].map((item, i) => (
              <AnimatedSection
                key={item.title}
                animation="fadeIn"
                delay={i * 150}
              >
                <div
                  className="card-3d p-8 text-center"
                  style={{
                    background: "rgba(8, 22, 12, 0.6)",
                    borderColor: "rgba(120, 230, 60, 0.12)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    {item.icon}
                  </div>
                  <h3
                    className="font-bold mb-3"
                    style={{
                      color: "hsl(100, 72%, 65%)",
                      fontFamily: "Sora",
                      fontSize: "1.05rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(200, 225, 205, 0.55)",
                      fontSize: "0.875rem",
                      fontFamily: "Outfit",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT CALLOUT ============ */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(20, 70, 35, 0.9), rgba(30, 100, 50, 0.8))",
          borderTop: "1px solid rgba(120, 230, 60, 0.15)",
          borderBottom: "1px solid rgba(120, 230, 60, 0.15)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(120, 230, 60, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 230, 60, 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fadeIn">
            <h2
              className="font-display font-bold mb-6"
              style={{
                fontSize: "1.875rem",
                background: "linear-gradient(135deg, #fff, hsl(100, 72%, 80%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("contactCalloutTitle")}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a
                href="mailto:kharatchaitanya03@gmail.com"
                className="flex items-center gap-2 transition-all px-4 py-2 rounded-full"
                style={{
                  color: "rgba(220, 255, 230, 0.9)",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(120, 230, 60, 0.25)",
                  fontFamily: "Outfit",
                }}
              >
                <Mail size={18} /> kharatchaitanya03@gmail.com
              </a>
              <a
                href="tel:+918421016006"
                className="flex items-center gap-2 transition-all px-4 py-2 rounded-full"
                style={{
                  color: "rgba(220, 255, 230, 0.9)",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(120, 230, 60, 0.25)",
                  fontFamily: "Outfit",
                }}
              >
                <Phone size={18} /> +91 8421016006
              </a>
            </div>
            <Link
              to="/contact"
              data-ocid="home.secondary_button"
              className="eco-btn-secondary"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
            >
              {t("contactUsLink")} <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
