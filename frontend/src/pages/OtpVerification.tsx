import { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Leaf, ArrowLeft, CheckCircle } from 'lucide-react';

const DEMO_OTP = '1234';
const OTP_LENGTH = 4;

export default function OtpVerification() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const mobile = sessionStorage.getItem('agro_mobile') || 'XXXXXXXXXX';

  // Redirect authenticated users away from OTP page
  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate({ to: '/' });
      return;
    }
    inputRefs.current[0]?.focus();
  }, [navigate]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const newOtp = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    const nextEmpty = pasted.length < OTP_LENGTH ? pasted.length : OTP_LENGTH - 1;
    inputRefs.current[nextEmpty]?.focus();
  };

  const handleVerify = () => {
    const entered = otp.join('');
    if (entered.length < OTP_LENGTH) {
      setError('Please enter all 4 digits');
      return;
    }
    if (entered === DEMO_OTP) {
      // Mark user as authenticated in sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true');
      setSuccess(true);
      setTimeout(() => navigate({ to: '/' }), 1200);
    } else {
      setError('Invalid OTP. Try 1234 for demo.');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/generated/hero-farm.dim_1400x600.png')" }}
      />
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 w-full max-w-md mx-4 animate-zoomIn">
        <div className="bg-card rounded-3xl shadow-card-hover p-8 md:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-green-pale flex items-center justify-center mb-3 shadow-green">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-merriweather">Verify OTP</h1>
            <p className="text-muted-foreground text-sm mt-1 text-center">
              Enter the 4-digit code sent to{' '}
              <span className="font-semibold text-foreground">+91 {mobile.replace(/(\d{6})(\d{4})/, '******$2')}</span>
            </p>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-3 py-6 animate-zoomIn">
              <CheckCircle className="w-16 h-16 text-primary" />
              <p className="text-primary font-semibold text-lg">Verified Successfully!</p>
              <p className="text-muted-foreground text-sm">Redirecting to home...</p>
            </div>
          ) : (
            <>
              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-background text-foreground focus:outline-none transition-all duration-200 ${
                      error
                        ? 'border-destructive'
                        : digit
                        ? 'border-primary bg-green-pale'
                        : 'border-border focus:border-primary'
                    }`}
                  />
                ))}
              </div>

              {error && (
                <p className="text-destructive text-sm text-center mb-4 animate-fadeIn">{error}</p>
              )}

              <p className="text-xs text-muted-foreground text-center mb-5">
                Demo OTP: <span className="font-bold text-primary">1234</span>
              </p>

              <button
                onClick={handleVerify}
                className="w-full py-3 rounded-xl font-semibold text-base gradient-green text-white shadow-green hover:shadow-card-hover hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                Verify OTP
              </button>

              <button
                onClick={() => navigate({ to: '/signup' })}
                className="w-full flex items-center justify-center gap-2 mt-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Signup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
