import { Heart, Search, ShoppingCart, Zap } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../App";
import CheckoutModal from "../components/CheckoutModal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useLanguage } from "../contexts/LanguageContext";

// Image mappings for each category using available generated assets
const FERTILIZER_IMAGES = {
  compost: "/assets/generated/fertilizer-compost.dim_400x400.png",
  npk: "/assets/generated/fertilizer-npk.dim_400x400.png",
  urea: "/assets/generated/fertilizer-urea.dim_400x400.png",
  dap: "/assets/generated/fertilizer-dap.dim_400x400.png",
  bio: "/assets/generated/fertilizer-biofertilizer.dim_400x400.png",
};

const SEED_IMAGES = {
  tomato: "/assets/generated/seeds-tomato.dim_400x400.png",
  chilli: "/assets/generated/seeds-chilli.dim_400x400.png",
  sunflower: "/assets/generated/seeds-sunflower.dim_400x400.png",
  wheat: "/assets/generated/seeds-wheat.dim_400x400.png",
  rice: "/assets/generated/seeds-rice.dim_400x400.png",
  // Smaller seed images for specific varieties
  spinach: "/assets/generated/seed-spinach.dim_200x200.png",
  brinjal: "/assets/generated/seed-brinjal.dim_200x200.png",
  okra: "/assets/generated/seed-okra.dim_200x200.png",
  fenugreek: "/assets/generated/seed-fenugreek.dim_200x200.png",
  coriander: "/assets/generated/seed-coriander.dim_200x200.png",
  bitterGourd: "/assets/generated/seed-bitter-gourd.dim_200x200.png",
  ridgeGourd: "/assets/generated/seed-ridge-gourd.dim_200x200.png",
  bottleGourd: "/assets/generated/seed-bottle-gourd.dim_200x200.png",
  drumstick: "/assets/generated/seed-drumstick.dim_200x200.png",
  capsicum: "/assets/generated/seed-capsicum.dim_200x200.png",
  cabbage: "/assets/generated/seed-cabbage.dim_200x200.png",
  cauliflower: "/assets/generated/seed-cauliflower.dim_200x200.png",
  pumpkin: "/assets/generated/seed-pumpkin.dim_200x200.png",
  radish: "/assets/generated/seed-radish.dim_200x200.png",
};

const VEGETABLE_IMAGES = {
  tomato: "/assets/generated/shop-product-tomato.dim_300x300.png",
  spinach: "/assets/generated/shop-product-spinach.dim_300x300.png",
  eggplant: "/assets/generated/vegetable-eggplant.dim_400x400.png",
  carrot: "/assets/generated/shop-product-carrot.dim_300x300.png",
  brinjal: "/assets/generated/shop-product-brinjal.dim_300x300.png",
  potato: "/assets/generated/shop-product-potato.dim_300x300.png",
  potato2: "/assets/generated/shop-product-potato.dim_300x300.png",
  onion: "/assets/generated/shop-product-onion.dim_300x300.png",
  okra: "/assets/generated/shop-product-okra.dim_300x300.png",
  radish: "/assets/generated/shop-product-radish.dim_300x300.png",
  cabbage: "/assets/generated/shop-product-cabbage.dim_300x300.png",
  cauliflower: "/assets/generated/shop-product-cauliflower.dim_300x300.png",
  bitterGourd: "/assets/generated/shop-product-bitter-gourd.dim_300x300.png",
  ridgeGourd: "/assets/generated/shop-product-ridge-gourd.dim_300x300.png",
  pumpkin: "/assets/generated/shop-product-pumpkin.dim_300x300.png",
  greenPeas: "/assets/generated/shop-product-green-peas.dim_300x300.png",
  cucumber: "/assets/generated/shop-product-cucumber.dim_300x300.png",
  mixed: "/assets/generated/product-vegetables.dim_400x400.png",
};

const products = [
  // ── Seeds (20 products) ──────────────────────────────────────────────────
  {
    id: 1,
    name: "Organic Tomato Seeds",
    category: "Seeds",
    price: 120,
    image: SEED_IMAGES.tomato,
    description: "High-yield organic tomato seeds for home and farm use.",
  },
  {
    id: 2,
    name: "Organic Spinach Seeds",
    category: "Seeds",
    price: 80,
    image: SEED_IMAGES.spinach,
    description: "Nutritious spinach seeds for year-round cultivation.",
  },
  {
    id: 101,
    name: "Organic Brinjal Seeds",
    category: "Seeds",
    price: 90,
    image: SEED_IMAGES.brinjal,
    description: "Disease-resistant brinjal seeds with high germination rate.",
  },
  {
    id: 102,
    name: "Organic Okra Seeds",
    category: "Seeds",
    price: 75,
    image: SEED_IMAGES.okra,
    description: "Fast-growing okra seeds ideal for warm climates.",
  },
  {
    id: 103,
    name: "Organic Fenugreek Seeds",
    category: "Seeds",
    price: 60,
    image: SEED_IMAGES.fenugreek,
    description: "Aromatic fenugreek seeds for culinary and medicinal use.",
  },
  {
    id: 104,
    name: "Organic Coriander Seeds",
    category: "Seeds",
    price: 55,
    image: SEED_IMAGES.coriander,
    description: "Premium coriander seeds with high oil content.",
  },
  {
    id: 105,
    name: "Organic Bitter Gourd Seeds",
    category: "Seeds",
    price: 95,
    image: SEED_IMAGES.bitterGourd,
    description:
      "Bitter gourd seeds suited for trellis and open-field farming.",
  },
  {
    id: 106,
    name: "Organic Ridge Gourd Seeds",
    category: "Seeds",
    price: 85,
    image: SEED_IMAGES.ridgeGourd,
    description: "Vigorous ridge gourd seeds with excellent vine growth.",
  },
  {
    id: 107,
    name: "Organic Bottle Gourd Seeds",
    category: "Seeds",
    price: 80,
    image: SEED_IMAGES.bottleGourd,
    description: "Large-fruited bottle gourd seeds for summer cultivation.",
  },
  {
    id: 108,
    name: "Organic Drumstick Seeds",
    category: "Seeds",
    price: 110,
    image: SEED_IMAGES.drumstick,
    description: "Moringa drumstick seeds rich in nutrients and easy to grow.",
  },
  {
    id: 109,
    name: "Organic Chilli Seeds",
    category: "Seeds",
    price: 100,
    image: SEED_IMAGES.chilli,
    description: "Hot chilli seeds with consistent pungency and high yield.",
  },
  {
    id: 110,
    name: "Organic Capsicum Seeds",
    category: "Seeds",
    price: 130,
    image: SEED_IMAGES.capsicum,
    description: "Colourful capsicum seeds for greenhouse and open farming.",
  },
  {
    id: 111,
    name: "Organic Cabbage Seeds",
    category: "Seeds",
    price: 70,
    image: SEED_IMAGES.cabbage,
    description: "Compact cabbage seeds ideal for winter season planting.",
  },
  {
    id: 112,
    name: "Organic Cauliflower Seeds",
    category: "Seeds",
    price: 75,
    image: SEED_IMAGES.cauliflower,
    description: "White-curd cauliflower seeds with good shelf life.",
  },
  {
    id: 113,
    name: "Organic Pumpkin Seeds",
    category: "Seeds",
    price: 90,
    image: SEED_IMAGES.pumpkin,
    description: "Large-fruited pumpkin seeds for field and kitchen garden.",
  },
  {
    id: 114,
    name: "Organic Radish Seeds",
    category: "Seeds",
    price: 50,
    image: SEED_IMAGES.radish,
    description: "Quick-maturing radish seeds ready in 25–30 days.",
  },
  {
    id: 115,
    name: "Organic Carrot Seeds",
    category: "Seeds",
    price: 70,
    image: SEED_IMAGES.cauliflower,
    description: "Nantes-type carrot seeds for smooth, sweet roots.",
  },
  {
    id: 116,
    name: "Organic Moong Seeds",
    category: "Seeds",
    price: 85,
    image: SEED_IMAGES.rice,
    description: "Green gram moong seeds for short-duration pulse crop.",
  },
  {
    id: 117,
    name: "Organic Mustard Seeds",
    category: "Seeds",
    price: 65,
    image: SEED_IMAGES.wheat,
    description: "Organic mustard seeds for oil and condiment use.",
  },
  {
    id: 118,
    name: "Organic Sunflower Seeds",
    category: "Seeds",
    price: 95,
    image: SEED_IMAGES.sunflower,
    description: "High-oil sunflower seeds for commercial cultivation.",
  },

  // ── Vegetables (22 products) ─────────────────────────────────────────────
  {
    id: 3,
    name: "Fresh Organic Vegetables Pack",
    category: "Vegetables",
    price: 250,
    image: VEGETABLE_IMAGES.mixed,
    description: "Seasonal organic vegetables freshly harvested.",
  },
  {
    id: 4,
    name: "Mixed Vegetable Box",
    category: "Vegetables",
    price: 350,
    image: VEGETABLE_IMAGES.mixed,
    description: "Assorted organic vegetables for weekly needs.",
  },
  {
    id: 201,
    name: "Organic Tomatoes (1 kg)",
    category: "Vegetables",
    price: 60,
    image: VEGETABLE_IMAGES.tomato,
    description: "Vine-ripened organic tomatoes, freshly picked.",
  },
  {
    id: 202,
    name: "Organic Potatoes (1 kg)",
    category: "Vegetables",
    price: 45,
    image: VEGETABLE_IMAGES.potato2,
    description: "Farm-fresh organic potatoes with thin skin.",
  },
  {
    id: 203,
    name: "Organic Onions (1 kg)",
    category: "Vegetables",
    price: 40,
    image: VEGETABLE_IMAGES.onion,
    description: "Pungent organic onions grown without chemicals.",
  },
  {
    id: 204,
    name: "Organic Brinjal (500 g)",
    category: "Vegetables",
    price: 35,
    image: VEGETABLE_IMAGES.brinjal,
    description: "Glossy purple brinjal, tender and flavourful.",
  },
  {
    id: 205,
    name: "Organic Okra (500 g)",
    category: "Vegetables",
    price: 40,
    image: VEGETABLE_IMAGES.okra,
    description: "Crisp organic okra harvested at peak tenderness.",
  },
  {
    id: 206,
    name: "Organic Spinach (250 g)",
    category: "Vegetables",
    price: 30,
    image: VEGETABLE_IMAGES.spinach,
    description: "Baby spinach leaves, washed and ready to cook.",
  },
  {
    id: 207,
    name: "Organic Carrots (500 g)",
    category: "Vegetables",
    price: 50,
    image: VEGETABLE_IMAGES.carrot,
    description: "Sweet organic carrots rich in beta-carotene.",
  },
  {
    id: 208,
    name: "Organic Radish (500 g)",
    category: "Vegetables",
    price: 30,
    image: VEGETABLE_IMAGES.radish,
    description: "Crispy white radish with a mild peppery taste.",
  },
  {
    id: 209,
    name: "Organic Cabbage (1 pc)",
    category: "Vegetables",
    price: 55,
    image: VEGETABLE_IMAGES.cabbage,
    description: "Firm organic cabbage head, great for salads and stir-fry.",
  },
  {
    id: 210,
    name: "Organic Cauliflower (1 pc)",
    category: "Vegetables",
    price: 65,
    image: VEGETABLE_IMAGES.cauliflower,
    description: "White-curd organic cauliflower, chemical-free.",
  },
  {
    id: 211,
    name: "Organic Bitter Gourd (500 g)",
    category: "Vegetables",
    price: 45,
    image: VEGETABLE_IMAGES.bitterGourd,
    description: "Medicinal bitter gourd with high nutritional value.",
  },
  {
    id: 212,
    name: "Organic Ridge Gourd (500 g)",
    category: "Vegetables",
    price: 40,
    image: VEGETABLE_IMAGES.ridgeGourd,
    description: "Tender ridge gourd ideal for curries and stir-fry.",
  },
  {
    id: 213,
    name: "Organic Pumpkin (1 kg)",
    category: "Vegetables",
    price: 50,
    image: VEGETABLE_IMAGES.pumpkin,
    description: "Sweet organic pumpkin, perfect for soups and curries.",
  },
  {
    id: 214,
    name: "Organic Green Peas (500 g)",
    category: "Vegetables",
    price: 70,
    image: VEGETABLE_IMAGES.greenPeas,
    description: "Fresh shelled green peas, sweet and tender.",
  },
  {
    id: 215,
    name: "Organic Cucumber (500 g)",
    category: "Vegetables",
    price: 35,
    image: VEGETABLE_IMAGES.cucumber,
    description: "Cool and crunchy organic cucumbers for salads.",
  },
  {
    id: 216,
    name: "Organic Capsicum (500 g)",
    category: "Vegetables",
    price: 90,
    image: VEGETABLE_IMAGES.eggplant,
    description: "Colourful organic bell peppers, crisp and sweet.",
  },
  {
    id: 217,
    name: "Organic Ginger (250 g)",
    category: "Vegetables",
    price: 75,
    image: VEGETABLE_IMAGES.mixed,
    description: "Fresh organic ginger root with strong aroma.",
  },
  {
    id: 218,
    name: "Organic Garlic (250 g)",
    category: "Vegetables",
    price: 80,
    image: VEGETABLE_IMAGES.mixed,
    description: "Aromatic organic garlic bulbs with intense flavour.",
  },
  {
    id: 219,
    name: "Organic Fenugreek Leaves (250 g)",
    category: "Vegetables",
    price: 25,
    image: VEGETABLE_IMAGES.spinach,
    description: "Fresh methi leaves with a slightly bitter, earthy taste.",
  },
  {
    id: 220,
    name: "Organic Corn (2 pcs)",
    category: "Vegetables",
    price: 60,
    image: VEGETABLE_IMAGES.mixed,
    description: "Sweet organic corn cobs, great for grilling and boiling.",
  },

  // ── Fertilizers (21 products) ────────────────────────────────────────────
  {
    id: 5,
    name: "Organic Compost Fertilizer",
    category: "Fertilizers",
    price: 450,
    image: FERTILIZER_IMAGES.compost,
    description: "Rich compost fertilizer for improved soil health.",
  },
  {
    id: 6,
    name: "Vermicompost Fertilizer",
    category: "Fertilizers",
    price: 380,
    image: FERTILIZER_IMAGES.bio,
    description: "Earthworm-based fertilizer for organic farming.",
  },
  {
    id: 301,
    name: "Neem Cake Fertilizer (1 kg)",
    category: "Fertilizers",
    price: 200,
    image: FERTILIZER_IMAGES.npk,
    description: "Neem cake enriches soil and repels soil-borne pests.",
  },
  {
    id: 302,
    name: "Bone Meal Fertilizer (1 kg)",
    category: "Fertilizers",
    price: 320,
    image: FERTILIZER_IMAGES.dap,
    description: "Slow-release phosphorus source for root development.",
  },
  {
    id: 303,
    name: "Cow Dung Manure (5 kg)",
    category: "Fertilizers",
    price: 150,
    image: FERTILIZER_IMAGES.compost,
    description: "Well-composted cow dung manure for all crops.",
  },
  {
    id: 304,
    name: "Bio-NPK Fertilizer (1 kg)",
    category: "Fertilizers",
    price: 280,
    image: FERTILIZER_IMAGES.npk,
    description: "Balanced bio-NPK blend for vegetative and flowering stages.",
  },
  {
    id: 305,
    name: "Seaweed Extract (500 ml)",
    category: "Fertilizers",
    price: 350,
    image: FERTILIZER_IMAGES.bio,
    description: "Liquid seaweed extract boosts plant immunity and growth.",
  },
  {
    id: 306,
    name: "Humic Acid Granules (1 kg)",
    category: "Fertilizers",
    price: 420,
    image: FERTILIZER_IMAGES.urea,
    description: "Humic acid improves nutrient uptake and soil structure.",
  },
  {
    id: 307,
    name: "Mycorrhiza Bio-Fertilizer (500 g)",
    category: "Fertilizers",
    price: 480,
    image: FERTILIZER_IMAGES.bio,
    description:
      "Mycorrhizal fungi enhance root absorption and drought tolerance.",
  },
  {
    id: 308,
    name: "Azospirillum Bio-Fertilizer (500 g)",
    category: "Fertilizers",
    price: 260,
    image: FERTILIZER_IMAGES.bio,
    description: "Nitrogen-fixing bacteria for cereals and vegetables.",
  },
  {
    id: 309,
    name: "Phosphate Solubilizing Bacteria (500 g)",
    category: "Fertilizers",
    price: 270,
    image: FERTILIZER_IMAGES.dap,
    description: "PSB converts insoluble phosphate to plant-available form.",
  },
  {
    id: 310,
    name: "Potassium Mobilizing Bacteria (500 g)",
    category: "Fertilizers",
    price: 275,
    image: FERTILIZER_IMAGES.npk,
    description: "KMB releases potassium from soil minerals for plant uptake.",
  },
  {
    id: 311,
    name: "Compost Tea Concentrate (1 L)",
    category: "Fertilizers",
    price: 310,
    image: FERTILIZER_IMAGES.compost,
    description: "Liquid compost tea packed with beneficial microorganisms.",
  },
  {
    id: 312,
    name: "Green Manure Mix (500 g)",
    category: "Fertilizers",
    price: 130,
    image: FERTILIZER_IMAGES.compost,
    description: "Dhaincha and sunhemp seed mix for green manuring.",
  },
  {
    id: 313,
    name: "Organic Potash (1 kg)",
    category: "Fertilizers",
    price: 340,
    image: FERTILIZER_IMAGES.urea,
    description:
      "Natural potash source for fruit quality and disease resistance.",
  },
  {
    id: 314,
    name: "Organic Zinc Sulphate (500 g)",
    category: "Fertilizers",
    price: 190,
    image: FERTILIZER_IMAGES.dap,
    description: "Corrects zinc deficiency and improves grain filling.",
  },
  {
    id: 315,
    name: "Sulphur Granules Organic (1 kg)",
    category: "Fertilizers",
    price: 160,
    image: FERTILIZER_IMAGES.urea,
    description:
      "Elemental sulphur lowers soil pH and controls fungal diseases.",
  },
  {
    id: 316,
    name: "Dolomite Lime (2 kg)",
    category: "Fertilizers",
    price: 120,
    image: FERTILIZER_IMAGES.npk,
    description: "Raises soil pH and supplies calcium and magnesium.",
  },
  {
    id: 317,
    name: "Wood Ash Fertilizer (1 kg)",
    category: "Fertilizers",
    price: 100,
    image: FERTILIZER_IMAGES.compost,
    description: "Natural wood ash rich in potassium and trace minerals.",
  },
  {
    id: 318,
    name: "Castor Cake Fertilizer (1 kg)",
    category: "Fertilizers",
    price: 220,
    image: FERTILIZER_IMAGES.bio,
    description: "Castor cake enriches soil nitrogen and repels nematodes.",
  },
  {
    id: 319,
    name: "Trichoderma Bio-Fungicide (500 g)",
    category: "Fertilizers",
    price: 390,
    image: FERTILIZER_IMAGES.bio,
    description:
      "Beneficial fungi that protect roots from soil-borne pathogens.",
  },
];

const categories = ["Seeds", "Vegetables", "Fertilizers"];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(t("addedToCart"));
  };

  // Open the checkout modal directly for a single product (Buy Now)
  const handleBuyNow = (product: (typeof products)[0]) => {
    setBuyNowProduct({ name: product.name, price: product.price });
    setCheckoutOpen(true);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast(t("removedFromWishlist"));
      } else {
        next.add(id);
        toast.success(`${t("addedToWishlist")} ❤️`);
      }
      return next;
    });
  };

  const categoryLabels: Record<string, string> = {
    Seeds: t("seeds"),
    Vegetables: t("vegetables"),
    Fertilizers: t("fertilizers"),
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <ShoppingCart className="w-4 h-4" />
            <span>Organic Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("shopHeroTitle")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("shopHeroSubtitle")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-background border-b border-border sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchProducts")}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
            >
              {t("allCategories")}
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {categoryLabels[cat]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-6">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            product{filtered.length !== 1 ? "s" : ""}
            {selectedCategory ? ` in ${categoryLabels[selectedCategory]}` : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t("noProductsFound")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-border bg-card overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-accent/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to category-level image if specific image fails
                        const target = e.currentTarget;
                        if (product.category === "Fertilizers") {
                          target.src =
                            "/assets/generated/product-fertilizer.dim_400x400.png";
                        } else if (product.category === "Seeds") {
                          target.src =
                            "/assets/generated/product-seeds.dim_400x400.png";
                        } else {
                          target.src =
                            "/assets/generated/product-vegetables.dim_400x400.png";
                        }
                        target.onerror = null;
                      }}
                    />
                    {/* Wishlist button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                      aria-label={
                        wishlist.has(product.id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${wishlist.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                      />
                    </button>
                    {/* Category badge */}
                    <span className="absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground">
                      {categoryLabels[product.category] || product.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto gap-1">
                      <span className="text-base font-bold text-primary shrink-0">
                        ₹{product.price}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="text-xs h-8 px-2"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          {t("addToCart")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBuyNow(product)}
                          className="text-xs h-8 px-2 border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                          data-ocid="shop.buy_now_button"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Buy Now checkout modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          setBuyNowProduct(null);
        }}
        onSuccess={() => {
          setCheckoutOpen(false);
          setBuyNowProduct(null);
        }}
        initialProductName={buyNowProduct?.name ?? ""}
        initialQuantity={1}
        initialTotalPrice={buyNowProduct?.price ?? 0}
      />
    </div>
  );
}
