import { useState } from "react";
import { motion } from "motion/react";
import { User, Phone, Mail, Lock, ShieldCheck, ArrowRight, Calendar, MapPin, UserCircle, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react";

interface RegisterPageProps {
  onRegisterSuccess: (email: string, devOtp?: string) => void;
  onLoginClick: () => void;
}

export default function RegisterPage({ onRegisterSuccess, onLoginClick }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    aadhaar: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "1994-06-12",
    gender: "Male",
    address: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (e.target.name === "aadhaar") {
      value = value.replace(/\D/g, "").slice(0, 12);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFillDemoData = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const randomAadhaar = "5489" + Math.floor(10000000 + Math.random() * 90000000).toString();
    setFormData({
      fullName: "Vikram Sharma",
      phone: "+91 98765 " + randomSuffix + "20",
      aadhaar: randomAadhaar,
      email: `citizen.${randomSuffix}@datra.gov.in`,
      password: "Password@123",
      confirmPassword: "Password@123",
      dob: "1992-04-18",
      gender: "Male",
      address: "B-404, Golden Palms Residency, Sector 62, Noida, UP - 201309"
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate Aadhaar (12 digits)
    const cleanAadhaar = formData.aadhaar.replace(/\D/g, "");
    if (cleanAadhaar.length !== 12) {
      setError("Aadhaar Number must be exactly 12 numeric digits.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please verify both password fields.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          aadhaar: cleanAadhaar,
          email: formData.email.trim()
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onRegisterSuccess(formData.email.trim(), data.devOtp);
      } else {
        setError(data.error || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setError("Unable to connect to authentication server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f2f5] p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#002b5c] via-[#003366] to-[#004d99] p-8 text-white text-center relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9 text-blue-300" />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">DATRA</h1>
          <p className="text-blue-200 text-xs font-medium mt-1">Trusted Citizen Identity & Data Management System</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Create Citizen Account</h2>
              <p className="text-xs text-gray-500">Official national digital repository registration</p>
            </div>
            <button
              type="button"
              onClick={handleFillDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 transition-colors self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Fill Demo Details</span>
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-xs rounded-2xl flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" name="fullName" required
                    value={formData.fullName} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="Vikram Sharma"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Aadhaar Number */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Aadhaar Number <span className="text-gray-400 font-normal">(12 Digits)</span>
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" name="aadhaar" required maxLength={12}
                    value={formData.aadhaar} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-mono tracking-wider font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="548962317845"
                  />
                </div>
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email ID</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="citizen@datra.gov.in"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"} name="password" required
                    value={formData.password} onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required
                    value={formData.confirmPassword} onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="date" name="dob" required
                    value={formData.dob} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Gender</label>
                <div className="relative">
                  <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select 
                    name="gender" required
                    value={formData.gender} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Permanent Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <textarea 
                  name="address" required rows={2}
                  value={formData.address} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                  placeholder="House/Flat No., Street, Area, City, State, Pincode"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#003366] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#002244] active:scale-[0.99] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing Registration...
                </span>
              ) : (
                <>
                  <span>Complete Registration & Generate OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500 font-medium">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={onLoginClick} 
              className="font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 ml-1"
            >
              Login Here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

