import { useNavigate } from "@tanstack/react-router";
import { Leaf, Lock } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const DEMO_OTP = "1234";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      navigate({ to: "/" });
    }
    inputRefs.current[0]?.focus();
  }, [navigate]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered.length < 4) {
      setError("Please enter all 4 digits.");
      return;
    }
    if (entered === DEMO_OTP) {
      setSuccess(true);
      sessionStorage.setItem("isAuthenticated", "true");
      setTimeout(() => navigate({ to: "/" }), 1000);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-white to-eco-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf size={40} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-2xl text-eco-primary">
              Agro Crops
            </h1>
            <p className="text-gray-500 text-sm mt-1">OTP Verification</p>
          </div>

          <div className="flex items-center gap-2 justify-center mb-6">
            <Lock size={20} className="text-eco-primary" />
            <h2 className="text-xl font-bold text-eco-dark">
              {t("verifyOtp")}
            </h2>
          </div>

          <p className="text-center text-sm text-gray-500 mb-2">
            Enter the OTP sent to your mobile number
          </p>

          {/* Demo notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-6 text-center">
            <p className="text-amber-700 text-sm font-medium">
              Demo OTP:{" "}
              <span className="font-bold tracking-widest">{DEMO_OTP}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable 4-item array
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-eco-primary/30 rounded-xl focus:outline-none focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 text-eco-dark transition-colors"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            {success && (
              <p className="text-eco-primary text-sm text-center mb-4 font-medium">
                OTP verified! Redirecting...
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-eco-primary hover:bg-eco-dark text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {t("verifyOtp")}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate({ to: "/signup" })}
            className="w-full mt-3 text-sm text-eco-primary hover:underline text-center"
          >
            Back to Signup
          </button>
        </div>
      </div>
    </div>
  );
}
