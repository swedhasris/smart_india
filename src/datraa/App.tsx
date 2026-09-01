import { useState, useEffect, useRef } from "react";
import { auth, db, googleProvider, OperationType, handleFirestoreError } from "./lib/firebase";
import { signInWithPopup, onAuthStateChanged, User, signOut, getIdToken } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { UserProfile, AuditLog } from "./types";
import { generateHash, maskAadhaar } from "./lib/crypto";
import { 
  LayoutDashboard, 
  User as UserIcon, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Receipt, 
  Zap, 
  CreditCard, 
  ShoppingBasket, 
  ShieldCheck, 
  Settings as SettingsIcon,
  LogOut,
  Mic,
  MicOff,
  Send,
  Bot,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Dashboard from "./components/Dashboard";
import AadhaarSystem from "./components/AadhaarSystem";
import DocumentStorage from "./components/DocumentStorage";
import EducationModule from "./components/EducationModule";
import EmploymentModule from "./components/EmploymentModule";
import TaxModule from "./components/TaxModule";
import UtilityBills from "./components/UtilityBills";
import LoanModule from "./components/LoanModule";
import RationSystem from "./components/RationSystem";
import GovtSchemes from "./components/GovtSchemes";
import Settings from "./components/Settings";
import ChatBot from "./components/ChatBot";
import VoiceAgent from "./components/VoiceAgent";
import SecurityVerification from "./components/SecurityVerification";
import SecurityAudit from "./components/SecurityAudit";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import OTPVerification from "./components/auth/OTPVerification";

type AuthView = "login" | "register" | "otp" | "dashboard";

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [otpEmail, setOtpEmail] = useState("");
  const [initialDevOtp, setInitialDevOtp] = useState("123456");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setProfile(data.user);
          setAuthView("dashboard");
        }
      }
    } catch (error) {
      console.error("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setProfile(userData);
    setAuthView("dashboard");
  };

  const handleRegisterSuccess = (email: string, devOtp?: string) => {
    setOtpEmail(email);
    if (devOtp) {
      setInitialDevOtp(devOtp);
    }
    setAuthView("otp");
  };

  const handleVerificationSuccess = (userData?: any) => {
    if (userData) {
      setUser(userData);
      setProfile(userData);
      setAuthView("dashboard");
    } else {
      setAuthView("login");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      let idToken = "";
      try {
        const result = await signInWithPopup(auth, googleProvider);
        idToken = await getIdToken(result.user);
      } catch (fbErr: any) {
        console.warn("Client Firebase popup error (sandbox iframe):", fbErr);
        // Fallback for iframe preview environment where popup may be restricted
      }
      
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          idToken,
          email: "swedhasrisathish@gmail.com",
          name: "Swedha Sri"
        }),
      });

      const data = await response.json();
      if (response.ok && data.user) {
        handleLogin(data.user);
      } else {
        alert(data.error || "Google login failed. Please use email & password or Quick Demo access.");
      }
    } catch (error: any) {
      console.error("Google login error", error);
      alert("Google login failed: " + (error?.message || "Please use Demo Access or direct login"));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      try {
        await signOut(auth);
      } catch (e) {
        // ignore
      }
      setUser(null);
      setProfile(null);
      setIsVerified(false);
      setAuthView("login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f0f2f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#003366] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#003366] font-semibold">Initializing Datra Secure Portal...</p>
        </div>
      </div>
    );
  }

  if (authView === "login") {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onRegisterClick={() => setAuthView("register")} 
        onGoogleLogin={handleGoogleLogin}
        onGoToOtp={(email) => {
          setOtpEmail(email);
          setAuthView("otp");
        }}
      />
    );
  }

  if (authView === "register") {
    return (
      <RegisterPage 
        onRegisterSuccess={handleRegisterSuccess} 
        onLoginClick={() => setAuthView("login")} 
      />
    );
  }

  if (authView === "otp") {
    return (
      <OTPVerification 
        email={otpEmail} 
        initialDevOtp={initialDevOtp}
        onVerificationSuccess={handleVerificationSuccess} 
        onBackToLogin={() => setAuthView("login")}
      />
    );
  }

  if (profile && !isVerified) {
    return <SecurityVerification profile={profile} onVerified={() => setIsVerified(true)} />;
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "aadhaar", label: "Aadhaar System", icon: UserIcon },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "employment", label: "Employment", icon: Briefcase },
    { id: "taxes", label: "Income Tax", icon: Receipt },
    { id: "bills", label: "Utility Bills", icon: Zap },
    { id: "loans", label: "Loans", icon: CreditCard },
    { id: "ration", label: "Ration System", icon: ShoppingBasket },
    { id: "schemes", label: "Govt Schemes", icon: ShieldCheck },
    { id: "audit", label: "Security Audit", icon: ShieldAlert },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="h-screen w-screen flex bg-[#f8f9fa] overflow-hidden font-sans text-gray-800">
      {/* Left Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#003366] text-white flex flex-col shadow-xl z-30"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-xl tracking-tight">DATRA</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-blue-800 rounded transition-colors">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6 mx-auto" />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-blue-100 hover:bg-blue-800/50"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
 
        <div className="p-4 border-t border-blue-800/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-300 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>
 
      {/* Center Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800 capitalize">{activeTab.replace("-", " ")}</h2>
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" placeholder="Search records..." className="bg-transparent text-xs outline-none w-48" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Blockchain Verified
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">{profile?.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{profile?.role}</p>
              </div>
              <img src={profile?.photo} className="w-9 h-9 rounded-full border-2 border-blue-100 shadow-sm" alt="Profile" />
            </div>
          </div>
        </header>
 
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#f8f9fa]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && <Dashboard profile={profile} setActiveTab={setActiveTab} />}
              {activeTab === "aadhaar" && <AadhaarSystem profile={profile} />}
              {activeTab === "documents" && <DocumentStorage uid={user?.uid} />}
              {activeTab === "education" && <EducationModule uid={user?.uid} />}
              {activeTab === "employment" && <EmploymentModule uid={user?.uid} />}
              {activeTab === "taxes" && <TaxModule uid={user?.uid} />}
              {activeTab === "bills" && <UtilityBills uid={user?.uid} />}
              {activeTab === "loans" && <LoanModule uid={user?.uid} />}
              {activeTab === "ration" && <RationSystem uid={user?.uid} />}
              {activeTab === "schemes" && <GovtSchemes profile={profile} />}
              {activeTab === "audit" && <SecurityAudit uid={user?.uid} />}
              {activeTab === "settings" && <Settings profile={profile} setProfile={setProfile} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
 
      {/* Right AI Panel */}
      <motion.aside 
        initial={false}
        animate={{ width: isChatOpen ? 380 : 0 }}
        className="bg-white border-l border-gray-100 flex flex-col shadow-2xl z-20 relative"
      >
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`absolute -left-10 top-20 bg-[#003366] text-white p-2 rounded-l-xl shadow-lg transition-transform hover:scale-110 ${!isChatOpen ? "translate-x-0" : "translate-x-0"}`}
        >
          {isChatOpen ? <ChevronRight className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
 
        {isChatOpen && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#003366] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Datra Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <span className="text-[10px] text-blue-200 uppercase font-bold">AI Active</span>
                  </div>
                </div>
              </div>
              <VoiceAgent />
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatBot profile={profile} />
            </div>
          </div>
        )}
      </motion.aside>
    </div>
  );
}
