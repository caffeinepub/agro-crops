import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Leaf, Phone, ArrowRight } from 'lucide-react';

export default function Signup() {
  const [mobile, setMobile] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  // Redirect authenticated users away from signup
  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate({ to: '/' });
    }
  }, [navigate]);

  const isValid = /^\d{10}$/.test(mobile);
  const showError = touched && !isValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);
    if (!touched) setTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      sessionStorage.setItem('agro_mobile', mobile);
      navigate({ to: '/otp' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/generated/hero-farm.dim_1400x600.png')" }}
      />
      <div className="absolute inset-0 gradient-hero" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-zoomIn">
        <div className="bg-card rounded-3xl shadow-card-hover p-8 md:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-green-pale flex items-center justify-center mb-3 shadow-green">
              <img
                src="/assets/generated/agro-logo.dim_128x128.png"
                alt="Agro Crops"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Leaf className="w-8 h-8 text-primary hidden" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-merriweather">Agro Crops</h1>
            <p className="text-muted-foreground text-sm mt-1">Organic Farming Management System</p>
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-2 text-center">Create Account</h2>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Enter your mobile number to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={handleChange}
                  onBlur={() => setTouched(true)}
                  placeholder="Enter 10-digit number"
                  className={`w-full pl-16 pr-4 py-3 rounded-xl border-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-200 ${
                    showError
                      ? 'border-destructive focus:border-destructive'
                      : isValid && touched
                      ? 'border-primary focus:border-primary'
                      : 'border-border focus:border-primary'
                  }`}
                  maxLength={10}
                  inputMode="numeric"
                />
              </div>
              {showError && (
                <p className="text-destructive text-xs mt-1.5 animate-fadeIn">
                  Please enter a valid 10-digit mobile number
                </p>
              )}
              {isValid && touched && (
                <p className="text-primary text-xs mt-1.5 animate-fadeIn">
                  ✓ Valid mobile number
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                isValid
                  ? 'gradient-green text-white shadow-green hover:shadow-card-hover hover:-translate-y-0.5 active:scale-95'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Sign Up
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
