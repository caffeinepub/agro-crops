import { Leaf, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'agro-crops');

  return (
    <footer className="gradient-green text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg font-merriweather">Agro Crops</div>
                <div className="text-white/70 text-xs">Organic Farming Management</div>
              </div>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              Empowering farmers with knowledge, tools, and resources for sustainable organic farming.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-merriweather">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Farm', to: '/farm' },
                { label: 'Shop', to: '/shop' },
                { label: 'Cattle', to: '/cattle' },
                { label: 'Contact', to: '/contact' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/75 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-merriweather">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/75 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:kharatchaitanya03@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  kharatchaitanya03@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/75 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href="tel:+918421016006"
                  className="hover:text-white transition-colors"
                >
                  +91 8421016006
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/75 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/70 text-sm">
            © {year} Agro Crops. All rights reserved.
          </p>
          <p className="text-white/70 text-sm flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-300 fill-red-300" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
