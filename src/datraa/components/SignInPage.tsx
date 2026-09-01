import { motion } from "motion/react";
import { ShieldCheck, ShieldAlert, Lock, Fingerprint, Globe, ChevronRight } from "lucide-react";

interface SignInPageProps {
  onLogin: () => void;
  isLoggingIn: boolean;
}

export default function SignInPage({ onLogin, isLoggingIn }: SignInPageProps) {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side - Branding & Info */}
      <div className="hidden md:flex md:w-1/2 bg-[#003366] p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-8 h-8 text-[#003366]" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">DATRA</h1>
          </div>
          
          <div className="space-y-8 max-w-lg">
            <h2 className="text-5xl font-black text-white leading-tight">
              Secure Your <span className="text-blue-400">Digital Identity</span> with Blockchain Trust.
            </h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed">
              The unified government portal for managing your Aadhaar-linked documents, 
              education records, and employment history with end-to-end encryption.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-300" />
                </div>
                <h4 className="font-bold text-white text-sm">Zero Trust</h4>
                <p className="text-blue-200/60 text-xs">Military-grade encryption for every record.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-blue-300" />
                </div>
                <h4 className="font-bold text-white text-sm">Biometric MFA</h4>
                <p className="text-blue-200/60 text-xs">Multi-factor authentication via Aadhaar.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="relative z-10 flex items-center gap-4 text-blue-300/40 text-[10px] font-black uppercase tracking-[0.2em]">
          <Globe className="w-4 h-4" />
          <span>Government of India • Digital India Initiative</span>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#003366]" />
          <span className="font-black text-[#003366] text-xl">DATRA</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-10"
        >
          <div className="space-y-3">
            <h3 className="text-4xl font-black text-gray-900 tracking-tight">Sign In</h3>
            <p className="text-gray-500 font-medium">Please use your official credentials to access the secure portal.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              disabled={isLoggingIn}
              className="w-full group flex items-center justify-between bg-white border-2 border-gray-100 p-5 rounded-[2rem] font-black text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200">
                  <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black">Continue with Google</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Secure SSO Login</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Security Notice</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex gap-4">
              <ShieldAlert className="w-6 h-6 text-orange-500 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-orange-900">Authorized Access Only</p>
                <p className="text-xs text-orange-700/70 leading-relaxed">
                  This system is monitored. Unauthorized access attempts are logged and reported to the Ministry of Electronics & IT.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap gap-4 justify-center">
            {["Privacy Policy", "Terms of Service", "Help Desk", "Contact"].map(link => (
              <button key={link} className="text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
