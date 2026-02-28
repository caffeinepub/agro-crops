import { useState } from 'react';
import { Heart, ShoppingCart, Check, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import AnimatedSection from '../components/AnimatedSection';

const products = [
  { id: 1, name: 'Organic Wheat Seeds', price: 299, category: 'Seeds', image: '/assets/generated/product-seeds.dim_400x400.png', badge: 'Best Seller' },
  { id: 2, name: 'Organic Rice Seeds', price: 349, category: 'Seeds', image: '/assets/generated/product-seeds.dim_400x400.png', badge: null },
  { id: 3, name: 'Heirloom Tomato Seeds', price: 199, category: 'Seeds', image: '/assets/generated/product-seeds.dim_400x400.png', badge: 'New' },
  { id: 4, name: 'Fresh Organic Tomatoes', price: 89, category: 'Vegetables', image: '/assets/generated/product-vegetables.dim_400x400.png', badge: null },
  { id: 5, name: 'Organic Spinach Bundle', price: 65, category: 'Vegetables', image: '/assets/generated/product-vegetables.dim_400x400.png', badge: 'Fresh' },
  { id: 6, name: 'Mixed Vegetable Pack', price: 149, category: 'Vegetables', image: '/assets/generated/product-vegetables.dim_400x400.png', badge: null },
  { id: 7, name: 'Vermicompost Fertilizer', price: 450, category: 'Fertilizers', image: '/assets/generated/product-fertilizer.dim_400x400.png', badge: 'Popular' },
  { id: 8, name: 'Neem Cake Fertilizer', price: 380, category: 'Fertilizers', image: '/assets/generated/product-fertilizer.dim_400x400.png', badge: null },
  { id: 9, name: 'Organic Compost Mix', price: 320, category: 'Fertilizers', image: '/assets/generated/product-fertilizer.dim_400x400.png', badge: null },
  { id: 10, name: 'Maize Seeds (1kg)', price: 275, category: 'Seeds', image: '/assets/generated/product-seeds.dim_400x400.png', badge: null },
  { id: 11, name: 'Organic Carrots (500g)', price: 75, category: 'Vegetables', image: '/assets/generated/product-vegetables.dim_400x400.png', badge: null },
  { id: 12, name: 'Bio-Fertilizer Liquid', price: 520, category: 'Fertilizers', image: '/assets/generated/product-fertilizer.dim_400x400.png', badge: 'Premium' },
];

const categories = ['All', 'Seeds', 'Vegetables', 'Fertilizers'];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const { addToCart, toggleWishlist, isWishlisted, cartItems } = useCart();

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => setAddedItems(prev => prev.filter(id => id !== product.id)), 2000);
  };

  const getCartQty = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    return item?.quantity || 0;
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="gradient-green py-16 px-4 text-center">
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            🛒 Organic Store
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
            Organic Shop
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Premium quality organic seeds, fresh vegetables, and natural fertilizers for your farm.
          </p>
        </AnimatedSection>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-green-pale/30 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'gradient-green text-white shadow-green'
                    : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="search-input pl-10 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <AnimatedSection key={product.id} animation="slideUp" delay={i * 60}>
                  <div className="eco-card overflow-hidden flex flex-col h-full group">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 gradient-green text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isWishlisted(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500'
                        }`}
                        aria-label="Toggle wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-xs text-primary font-medium bg-green-pale px-2 py-0.5 rounded-full w-fit mb-2">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-foreground mb-1 text-sm leading-snug flex-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-xl font-bold text-primary">₹{product.price}</span>
                          {getCartQty(product.id) > 0 && (
                            <span className="ml-2 text-xs text-muted-foreground">×{getCartQty(product.id)} in cart</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          addedItems.includes(product.id)
                            ? 'bg-green-pale text-primary border border-primary'
                            : 'gradient-green text-white shadow-green hover:shadow-card-hover hover:-translate-y-0.5 active:scale-95'
                        }`}
                      >
                        {addedItems.includes(product.id) ? (
                          <><Check className="w-4 h-4" /> Added!</>
                        ) : (
                          <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                        )}
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
