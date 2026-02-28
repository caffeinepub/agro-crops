import React, { useState } from 'react';
import { Search, ShoppingCart, Leaf } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useCart } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

const products = [
  { id: 1, name: 'Organic Tomato Seeds', category: 'Seeds', price: 120, image: '/assets/generated/product-seeds.dim_400x400.png', description: 'High-yield organic tomato seeds for home and farm use.' },
  { id: 2, name: 'Organic Spinach Seeds', category: 'Seeds', price: 80, image: '/assets/generated/product-seeds.dim_400x400.png', description: 'Nutritious spinach seeds for year-round cultivation.' },
  { id: 3, name: 'Fresh Organic Vegetables Pack', category: 'Vegetables', price: 250, image: '/assets/generated/product-vegetables.dim_400x400.png', description: 'Seasonal organic vegetables freshly harvested.' },
  { id: 4, name: 'Mixed Vegetable Box', category: 'Vegetables', price: 350, image: '/assets/generated/product-vegetables.dim_400x400.png', description: 'Assorted organic vegetables for weekly needs.' },
  { id: 5, name: 'Organic Compost Fertilizer', category: 'Fertilizers', price: 450, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Rich compost fertilizer for improved soil health.' },
  { id: 6, name: 'Vermicompost Fertilizer', category: 'Fertilizers', price: 380, image: '/assets/generated/product-fertilizer.dim_400x400.png', description: 'Earthworm-based fertilizer for organic farming.' },
];

const categories = ['Seeds', 'Vegetables', 'Fertilizers'];

export default function Shop() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(t('addedToCart'));
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
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('searchProducts')} className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
              className={selectedCategory === '' ? 'eco-btn' : ''}
            >
              {t('allCategories')}
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'eco-btn' : ''}
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
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t('noProductsFound')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="eco-card rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{categoryLabels[product.category]}</span>
                    <h3 className="font-semibold text-foreground mt-2 mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                      <Button size="sm" onClick={() => handleAddToCart(product)} className="eco-btn">
                        <ShoppingCart className="w-4 h-4 mr-1" />
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
