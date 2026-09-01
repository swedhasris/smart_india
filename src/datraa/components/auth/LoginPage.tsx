import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, ShieldCheck, ArrowRight, Chrome, Eye, EyeOff, UserCheck, KeyRound, AlertCircle, CheckCircle2, X } from "lucide-react";

interface LoginPageProps {
  onLogin: (userData: any) => void;
  onRegisterClick: () => void;
  onGoogleLogin: () => void;
  onGoToOtp?: (email: string) => void;
}

export default function LoginPage({ onLogin, onRegisterClick, onGoogleLogin, onGoToOtp }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotStep, setForgotStep] = useState<"email" | "reset">("email");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUnverifiedEmail(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || "Invalid email or password");
        if (data.unverified && data.email) {
          setUnverifiedEmail(data.email);
        }
      }
    } catch (err) {
      setError("Unable to connect to authentication server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoCitizen = async () => {
    setEmail("citizen@datra.gov.in");
    setPassword("Password@123");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "citizen@datra.gov.in", password: "Password@123" }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || "Demo login failed");
      }
    } catch (err) {
      setError("Demo authentication error.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAdmin = async () => {
    setEmail("swedhasrisathish@gmail.com");
    setPassword("Password@123");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "swedhasrisathish@gmail.com", password: "Password@123" }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || "Admin demo login failed");
      }
    } catch (err) {
      setError("Admin authentication error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    setForgotError("");
    setForgotSuccess("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotStep("reset");
        setDevOtpHint(data.devOtp || "123456");
        if (data.devOtp) {
          setForgotOtp(data.devOtp);
        }
        setForgotSuccess("Verification code sent to " + forgotEmail);
      } else {
        setForgotError(data.error || "Failed to send reset code.");
      }
    } catch (err) {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOtp || !newPassword) return;
    setForgotLoading(true);
    setForgotError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: forgotOtp.trim(),
          newPassword
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotSuccess("Password reset successfully! You can now log in.");
        setTimeout(() => {
          setShowForgotModal(false);
          setEmail(forgotEmail);
          setPassword(newPassword);
          setForgotStep("email");
          setForgotSuccess("");
        }, 1500);
      } else {
        setForgotError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f2f5] p-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#002b5c] via-[#003366] to-[#004d99] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 pointer-events-none" />
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9 text-blue-300" />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">DATRA</h1>
          <p className="text-blue-200 text-xs font-medium mt-1">Trusted Data Management System</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-blue-200 mt-3 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Aadhaar & Blockchain Encrypted
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1 text-center">Login to Your Account</h2>
          <p className="text-xs text-gray-500 text-center mb-6">Enter your registered credentials to access your secure portal</p>
          
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-700 text-xs rounded-2xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{error}</p>
                {unverifiedEmail && onGoToOtp && (
                  <button
                    type="button"
                    onClick={() => onGoToOtp(unverifiedEmail)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-800 underline hover:text-red-950"
                  >
                    Verify OTP for {unverifiedEmail} <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">Password</label>
                <button 
                  type="button" 
                  onClick={() => {
                    setForgotEmail(email || "citizen@datra.gov.in");
                    setShowForgotModal(true);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#003366] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#002244] active:scale-[0.99] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Login to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Helpers */}
          <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-2">1-Click Quick Access</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoCitizen}
                disabled={loading}
                className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100/80 border border-blue-100 rounded-xl text-xs font-bold text-[#003366] flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Citizen Demo</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                disabled={loading}
                className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          <div className="mt-5 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-3 text-gray-400 font-bold tracking-wider">Or</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={onGoogleLogin}
            className="mt-4 w-full flex items-center justify-center gap-2.5 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors font-semibold text-xs text-gray-700 shadow-sm"
          >
            <Chrome className="w-4 h-4 text-blue-500" />
            <span>Login with Google</span>
          </button>

          <p className="mt-6 text-center text-xs text-gray-500 font-medium">
            New User?{" "}
            <button 
              type="button"
              onClick={onRegisterClick} 
              className="font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 ml-1"
            >
              Register Now
            </button>
          </p>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <KeyRound className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900">Reset Password</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {forgotError && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{forgotError}</span>
                </div>
              )}

              {forgotSuccess && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 text-xs rounded-xl border border-green-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{forgotSuccess}</span>
                </div>
              )}

              {forgotStep === "email" ? (
                <form onSubmit={handleSendResetOtp} className="mt-5 space-y-4">
                  <p className="text-xs text-gray-500">
                    Enter your registered email ID to receive a 6-digit security reset code.
                  </p>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email ID</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="citizen@datra.gov.in"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3 bg-[#003366] text-white font-bold text-xs rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60"
                  >
                    {forgotLoading ? "Sending Code..." : "Send Verification Code"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="mt-5 space-y-4">
                  {devOtpHint && (
                    <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 flex items-center justify-between">
                      <span>Demo Code: <strong>{devOtpHint}</strong></span>
                      <button
                        type="button"
                        onClick={() => setForgotOtp(devOtpHint)}
                        className="px-2 py-1 bg-blue-600 text-white rounded-md text-[10px] font-bold"
                      >
                        Autofill
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">6-Digit Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-2.5 text-center tracking-widest font-mono text-lg bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForgotStep("email")}
                      className="w-1/3 py-2.5 border border-gray-200 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-2/3 py-2.5 bg-[#003366] text-white font-bold text-xs rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60"
                    >
                      {forgotLoading ? "Resetting..." : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

