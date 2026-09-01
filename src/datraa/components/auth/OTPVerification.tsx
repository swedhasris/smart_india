import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, RefreshCw, Sparkles, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  initialDevOtp?: string;
  onVerificationSuccess: (userData?: any) => void;
  onBackToLogin: () => void;
}

export default function OTPVerification({ 
  email, 
  initialDevOtp,
  onVerificationSuccess, 
  onBackToLogin 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(initialDevOtp || "");
  const [devOtp, setDevOtp] = useState(initialDevOtp || "123456");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg("OTP Verified Successfully! Logging in...");
        setTimeout(() => {
          onVerificationSuccess(data.user);
        }, 1000);
      } else {
        setError(data.error || "Invalid OTP code. Please check or click Resend.");
      }
    } catch (err) {
      setError("Unable to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setCountdown(30);
        if (data.devOtp) {
          setDevOtp(data.devOtp);
          setOtp(data.devOtp);
        }
        setSuccessMsg("A new 6-digit OTP code has been generated.");
      } else {
        setError(data.error || "Failed to resend OTP.");
      }
    } catch (e) {
      setError("Failed to contact server.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f2f5] p-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#002b5c] via-[#003366] to-[#004d99] p-8 text-white text-center relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9 text-blue-300" />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">DATRA</h1>
          <p className="text-blue-200 text-xs font-medium mt-1">Trusted Data Management System</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1 text-center">Verify Identity OTP</h2>
          <p className="text-xs text-gray-500 text-center mb-5">
            A 6-digit one-time password has been sent to{" "}
            <span className="font-bold text-gray-800 break-all">{email || "your registered email"}</span>
          </p>

          {/* Dev / Preview OTP Helper Banner */}
          <div className="mb-6 p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-wider text-blue-800">Generated OTP Code</p>
                <p className="text-sm font-mono font-bold text-[#003366]">{devOtp}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOtp(devOtp)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              Autofill
            </button>
          </div>
          
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-green-50 border border-green-100 text-green-700 text-xs rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2 text-center">
                Enter 6-Digit Code
              </label>
              <input 
                type="text" 
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-3xl tracking-[0.4em] font-mono font-black py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="000000"
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || otp.length < 6}
              className="w-full bg-[#003366] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#002244] active:scale-[0.99] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Verifying Code...
                </span>
              ) : (
                <>
                  <span>Verify & Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button 
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || resending}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
              <span>{countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP Code"}</span>
            </button>
            <button 
              type="button"
              onClick={onBackToLogin} 
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

