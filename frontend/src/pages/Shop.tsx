import React, { useState } from 'react';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useCart } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

const products = [
  // ── Seeds (20 products) ──────────────────────────────────────────────────
  { id: 1,   name: 'Organic Tomato Seeds',        category: 'Seeds',       price: 120, image: '/assets/generated/seed-tomato.dim_200x200.png',       description: 'High-yield organic tomato seeds for home and farm use.' },
  { id: 2,   name: 'Organic Spinach Seeds',        category: 'Seeds',       price: 80,  image: '/assets/generated/seed-spinach.dim_200x200.png',      description: 'Nutritious spinach seeds for year-round cultivation.' },
  { id: 101, name: 'Organic Brinjal Seeds',        category: 'Seeds',       price: 90,  image: '/assets/generated/seed-brinjal.dim_200x200.png',      description: 'Disease-resistant brinjal seeds with high germination rate.' },
  { id: 102, name: 'Organic Okra Seeds',           category: 'Seeds',       price: 75,  image: '/assets/generated/seed-okra.dim_200x200.png',         description: 'Fast-growing okra seeds ideal for warm climates.' },
  { id: 103, name: 'Organic Fenugreek Seeds',      category: 'Seeds',       price: 60,  image: '/assets/generated/seed-fenugreek.dim_200x200.png',    description: 'Aromatic fenugreek seeds for culinary and medicinal use.' },
  { id: 104, name: 'Organic Coriander Seeds',      category: 'Seeds',       price: 55,  image: '/assets/generated/seed-coriander.dim_200x200.png',    description: 'Premium coriander seeds with high oil content.' },
  { id: 105, name: 'Organic Bitter Gourd Seeds',   category: 'Seeds',       price: 95,  image: '/assets/generated/seed-bitter-gourd.dim_200x200.png', description: 'Bitter gourd seeds suited for trellis and open-field farming.' },
  { id: 106, name: 'Organic Ridge Gourd Seeds',    category: 'Seeds',       price: 85,  image: '/assets/generated/seed-ridge-gourd.dim_200x200.png',  description: 'Vigorous ridge gourd seeds with excellent vine growth.' },
  { id: 107, name: 'Organic Bottle Gourd Seeds',   category: 'Seeds',       price: 80,  image: '/assets/generated/seed-bottle-gourd.dim_200x200.png', description: 'Large-fruited bottle gourd seeds for summer cultivation.' },
  { id: 108, name: 'Organic Drumstick Seeds',      category: 'Seeds',       price: 110, image: '/assets/generated/seed-drumstick.dim_200x200.png',    description: 'Moringa drumstick seeds rich in nutrients and easy to grow.' },
  { id: 109, name: 'Organic Chilli Seeds',         category: 'Seeds',       price: 100, image: '/assets/generated/seed-chilli.dim_200x200.png',       description: 'Hot chilli seeds with consistent pungency and high yield.' },
  { id: 110, name: 'Organic Capsicum Seeds',       category: 'Seeds',       price: 130, image: '/assets/generated/seed-capsicum.dim_200x200.png',     description: 'Colourful capsicum seeds for greenhouse and open farming.' },
  { id: 111, name: 'Organic Cabbage Seeds',        category: 'Seeds',       price: 70,  image: '/assets/generated/seed-cabbage.dim_200x200.png',      description: 'Compact cabbage seeds ideal for winter season planting.' },
  { id: 112, name: 'Organic Cauliflower Seeds',    category: 'Seeds',       price: 75,  image: '/assets/generated/seed-cauliflower.dim_200x200.png',  description: 'White-curd cauliflower seeds with good shelf life.' },
  { id: 113, name: 'Organic Pumpkin Seeds',        category: 'Seeds',       price: 90,  image: '/assets/generated/seed-pumpkin.dim_200x200.png',      description: 'Large-fruited pumpkin seeds for field and kitchen garden.' },
  { id: 114, name: 'Organic Radish Seeds',         category: 'Seeds',       price: 50,  image: '/assets/generated/seed-radish.dim_200x200.png',       description: 'Quick-maturing radish seeds ready in 25–30 days.' },
  { id: 115, name: 'Organic Carrot Seeds',         category: 'Seeds',       price: 70,  image: '/assets/generated/seed-cauliflower.dim_200x200.png',  description: 'Nantes-type carrot seeds for smooth, sweet roots.' },
  { id: 116, name: 'Organic Moong Seeds',          category: 'Seeds',       price: 85,  image: '/assets/generated/seed-okra.dim_200x200.png',         description: 'Green gram moong seeds for short-duration pulse crop.' },
  { id: 117, name: 'Organic Mustard Seeds',        category: 'Seeds',       price: 65,  image: '/assets/generated/seed-fenugreek.dim_200x200.png',    description: 'Organic mustard seeds for oil and condiment use.' },
  { id: 118, name: 'Organic Sunflower Seeds',      category: 'Seeds',       price: 95,  image: '/assets/generated/seed-pumpkin.dim_200x200.png',      description: 'High-oil sunflower seeds for commercial cultivation.' },

  // ── Vegetables (22 products) ─────────────────────────────────────────────
  { id: 3,   name: 'Fresh Organic Vegetables Pack', category: 'Vegetables', price: 250, image: '/assets/generated/product-vegetables.dim_400x400.png',  description: 'Seasonal organic vegetables freshly harvested.' },
  { id: 4,   name: 'Mixed Vegetable Box',           category: 'Vegetables', price: 350, image: '/assets/generated/product-vegetables.dim_400x400.png',  description: 'Assorted organic vegetables for weekly needs.' },
  { id: 201, name: 'Organic Tomatoes (1 kg)',       category: 'Vegetables', price: 60,  image: '/assets/generated/product-tomato.dim_200x200.png',       description: 'Vine-ripened organic tomatoes, freshly picked.' },
  { id: 202, name: 'Organic Potatoes (1 kg)',       category: 'Vegetables', price: 45,  image: '/assets/generated/product-potato.dim_200x200.png',       description: 'Farm-fresh organic potatoes with thin skin.' },
  { id: 203, name: 'Organic Onions (1 kg)',         category: 'Vegetables', price: 40,  image: '/assets/generated/product-onion.dim_200x200.png',        description: 'Pungent organic onions grown without chemicals.' },
  { id: 204, name: 'Organic Brinjal (500 g)',       category: 'Vegetables', price: 35,  image: '/assets/generated/product-brinjal.dim_200x200.png',      description: 'Glossy purple brinjal, tender and flavourful.' },
  { id: 205, name: 'Organic Okra (500 g)',          category: 'Vegetables', price: 40,  image: '/assets/generated/product-okra.dim_200x200.png',         description: 'Crisp organic okra harvested at peak tenderness.' },
  { id: 206, name: 'Organic Spinach (250 g)',       category: 'Vegetables', price: 30,  image: '/assets/generated/product-spinach.dim_200x200.png',      description: 'Baby spinach leaves, washed and ready to cook.' },
  { id: 207, name: 'Organic Carrots (500 g)',       category: 'Vegetables', price: 50,  image: '/assets/generated/product-carrot.dim_200x200.png',       description: 'Sweet organic carrots rich in beta-carotene.' },
  { id: 208, name: 'Organic Radish (500 g)',        category: 'Vegetables', price: 30,  image: '/assets/generated/product-radish.dim_200x200.png',       description: 'Crispy white radish with a mild peppery taste.' },
  { id: 209, name: 'Organic Cabbage (1 pc)',        category: 'Vegetables', price: 55,  image: '/assets/generated/product-cabbage.dim_200x200.png',      description: 'Firm organic cabbage head, great for salads and stir-fry.' },
  { id: 210, name: 'Organic Cauliflower (1 pc)',    category: 'Vegetables', price: 65,  image: '/assets/generated/product-cauliflower.dim_200x200.png',  description: 'White-curd organic cauliflower, chemical-free.' },
  { id: 211, name: 'Organic Bitter Gourd (500 g)',  category: 'Vegetables', price: 45,  image: '/assets/generated/product-bitter-gourd.dim_200x200.png', description: 'Medicinal bitter gourd with high nutritional value.' },
  { id: 212, name: 'Organic Ridge Gourd (500 g)',   category: 'Vegetables', price: 40,  image: '/assets/generated/product-ridge-gourd.dim_200x200.png',  description: 'Tender ridge gourd ideal for curries and stir-fry.' },
  { id: 213, name: 'Organic Pumpkin (1 kg)',        category: 'Vegetables', price: 50,  image: '/assets/generated/product-pumpkin.dim_200x200.png',      description: 'Sweet organic pumpkin, perfect for soups and curries.' },
  { id: 214, name: 'Organic Green Peas (500 g)',    category: 'Vegetables', price: 70,  image: '/assets/generated/product-green-peas.dim_200x200.png',   description: 'Fresh shelled green peas, sweet and tender.' },
  { id: 215, name: 'Organic Cucumber (500 g)',      category: 'Vegetables', price: 35,  image: '/assets/generated/product-cucumber.dim_200x200.png',     description: 'Cool and crunchy organic cucumbers for salads.' },
  { id: 216, name: 'Organic Capsicum (500 g)',      category: 'Vegetables', price: 90,  image: '/assets/generated/product-vegetables.dim_400x400.png',   description: 'Colourful organic bell peppers, crisp and sweet.' },
  { id: 217, name: 'Organic Ginger (250 g)',        category: 'Vegetables', price: 75,  image: '/assets/generated/product-vegetables.dim_400x400.png',   description: 'Fresh organic ginger root with strong aroma.' },
  { id: 218, name: 'Organic Garlic (250 g)',        category: 'Vegetables', price: 80,  image: '/assets/generated/product-vegetables.dim_400x400.png',   description: 'Aromatic organic garlic bulbs with intense flavour.' },
  { id: 219, name: 'Organic Fenugreek Leaves (250 g)', category: 'Vegetables', price: 25, image: '/assets/generated/product-spinach.dim_200x200.png',  description: 'Fresh methi leaves with a slightly bitter, earthy taste.' },
  { id: 220, name: 'Organic Corn (2 pcs)',          category: 'Vegetables', price: 60,  image: '/assets/generated/product-vegetables.dim_400x400.png',   description: 'Sweet organic corn cobs, great for grilling and boiling.' },

  // ── Fertilizers (21 products) ────────────────────────────────────────────
  { id: 5,   name: 'Organic Compost Fertilizer',   category: 'Fertilizers', price: 450, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Rich compost fertilizer for improved soil health.' },
  { id: 6,   name: 'Vermicompost Fertilizer',      category: 'Fertilizers', price: 380, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Earthworm-based fertilizer for organic farming.' },
  { id: 301, name: 'Neem Cake Fertilizer (1 kg)',  category: 'Fertilizers', price: 200, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Neem cake enriches soil and repels soil-borne pests.' },
  { id: 302, name: 'Bone Meal Fertilizer (1 kg)',  category: 'Fertilizers', price: 320, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Slow-release phosphorus source for root development.' },
  { id: 303, name: 'Cow Dung Manure (5 kg)',       category: 'Fertilizers', price: 150, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Well-composted cow dung manure for all crops.' },
  { id: 304, name: 'Bio-NPK Fertilizer (1 kg)',    category: 'Fertilizers', price: 280, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Balanced bio-NPK blend for vegetative and flowering stages.' },
  { id: 305, name: 'Seaweed Extract (500 ml)',     category: 'Fertilizers', price: 350, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Liquid seaweed extract boosts plant immunity and growth.' },
  { id: 306, name: 'Humic Acid Granules (1 kg)',   category: 'Fertilizers', price: 420, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Humic acid improves nutrient uptake and soil structure.' },
  { id: 307, name: 'Mycorrhiza Bio-Fertilizer (500 g)', category: 'Fertilizers', price: 480, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Mycorrhizal fungi enhance root absorption and drought tolerance.' },
  { id: 308, name: 'Azospirillum Bio-Fertilizer (500 g)', category: 'Fertilizers', price: 260, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Nitrogen-fixing bacteria for cereals and vegetables.' },
  { id: 309, name: 'Phosphate Solubilizing Bacteria (500 g)', category: 'Fertilizers', price: 270, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'PSB converts insoluble phosphate to plant-available form.' },
  { id: 310, name: 'Potassium Mobilizing Bacteria (500 g)', category: 'Fertilizers', price: 275, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'KMB releases potassium from soil minerals for plant uptake.' },
  { id: 311, name: 'Compost Tea Concentrate (1 L)', category: 'Fertilizers', price: 310, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Liquid compost tea packed with beneficial microorganisms.' },
  { id: 312, name: 'Green Manure Mix (500 g)',     category: 'Fertilizers', price: 130, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Dhaincha and sunhemp seed mix for green manuring.' },
  { id: 313, name: 'Organic Potash (1 kg)',        category: 'Fertilizers', price: 340, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Natural potash source for fruit quality and disease resistance.' },
  { id: 314, name: 'Organic Zinc Sulphate (500 g)', category: 'Fertilizers', price: 190, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Corrects zinc deficiency and improves grain filling.' },
  { id: 315, name: 'Sulphur Granules Organic (1 kg)', category: 'Fertilizers', price: 160, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Elemental sulphur lowers soil pH and controls fungal diseases.' },
  { id: 316, name: 'Dolomite Lime (2 kg)',         category: 'Fertilizers', price: 120, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Raises soil pH and supplies calcium and magnesium.' },
  { id: 317, name: 'Wood Ash Fertilizer (1 kg)',   category: 'Fertilizers', price: 100, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Natural wood ash rich in potassium and trace minerals.' },
  { id: 318, name: 'Castor Cake Fertilizer (1 kg)', category: 'Fertilizers', price: 220, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Castor cake enriches soil nitrogen and repels nematodes.' },
  { id: 319, name: 'Trichoderma Bio-Fungicide (500 g)', category: 'Fertilizers', price: 390, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Beneficial fungi that protect roots from soil-borne pathogens.' },
];

const categories = ['Seeds', 'Vegetables', 'Fertilizers'];

export default function Shop() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(t('addedToCart'));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast(t('removedFromWishlist'));
      } else {
        next.add(id);
        toast.success(t('addedToWishlist') + ' ❤️');
      }
      return next;
    });
  };

  const categoryLabels: Record<string, string> = {
    'Seeds': t('seeds'),
    'Vegetables': t('vegetables'),
    'Fertilizers': t('fertilizers'),
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('shopHeroTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('shopHeroSubtitle')}</p>
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
              placeholder={t('searchProducts')}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              {t('allCategories')}
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
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
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
            {selectedCategory ? ` in ${categoryLabels[selectedCategory]}` : ''}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t('noProductsFound')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="rounded-xl border border-border bg-card overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-accent/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/generated/product-vegetables.dim_400x400.png';
                      }}
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition-colors ${
                        wishlist.has(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                      {product.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary font-bold text-lg">₹{product.price}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        {t('addToCart')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
