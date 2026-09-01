import React, { useState } from 'react';
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
  Bot,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  ShieldAlert,
  BookOpen,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Datra Components
import Dashboard from './components/Dashboard';
import AadhaarSystem from './components/AadhaarSystem';
import DocumentStorage from './components/DocumentStorage';
import EducationModule from './components/EducationModule';
import EmploymentModule from './components/EmploymentModule';
import TaxModule from './components/TaxModule';
import UtilityBills from './components/UtilityBills';
import LoanModule from './components/LoanModule';
import RationSystem from './components/RationSystem';
import GovtSchemes from './components/GovtSchemes';
import Settings from './components/Settings';
import ChatBot from './components/ChatBot';
import VoiceAgent from './components/VoiceAgent';
import SecurityVerification from './components/SecurityVerification';
import SecurityAudit from './components/SecurityAudit';
import DigitalDiaryModule from './components/DigitalDiaryModule';
import QueryManagementModule from '../components/queries/QueryManagementModule';
import CrossDepartmentProfileUpdateModule from '../components/profile/CrossDepartmentProfileUpdateModule';
import { UserProfile } from './types';
import { maskAadhaar } from './lib/crypto';

interface DatraUserPortalProps {
  user: any;
  onLogout: () => void;
}

export default function DatraUserPortal({ user, onLogout }: DatraUserPortalProps) {
  const [profile, setProfile] = useState<UserProfile>(() => ({
    uid: user?.id || user?.aadhaar || 'citizen-101',
    name: user?.name || 'Swedha Sri',
    photo: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    aadhaar: user?.aadhaar || '5892 4108 7643',
    dob: '1995-05-20',
    gender: 'Female',
    bloodGroup: 'A+',
    phone: user?.mobile || user?.phone || '+91 98765 43211',
    email: user?.email || 'swedhasrisathish@gmail.com',
    address: 'Block C-12, Central Secretariat, New Delhi - 110001',
    role: 'citizen',
    is_verified: true
  }));

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isVerified) {
    return <SecurityVerification profile={profile} onVerified={() => setIsVerified(true)} />;
  }

  // Exact 10 menu items matching target sidebar
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
    { id: "diary", label: "Digital Diary & Student Hub", icon: BookOpen },
    { id: "queries", label: "Queries", icon: HelpCircle },
    { id: "profile-sync", label: "Profile Sync & Consent", icon: RefreshCw },
  ];

  return (
    <div 
      className="h-screen w-screen flex bg-[#f8f9fa] overflow-hidden text-gray-800"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Left Sidebar (Matching Image 2 100%) ── */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        style={{
          background: '#003366',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          zIndex: 30,
          flexShrink: 0
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: isSidebarOpen ? '32px 24px 24px 24px' : '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {isSidebarOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={32} color="#60A5FA" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: '900', fontSize: '22px', letterSpacing: '0.5px', color: '#FFFFFF' }}>DATRA</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            style={{ background: 'transparent', border: 'none', color: '#93C5FD', cursor: 'pointer', padding: '4px', borderRadius: '8px' }}
            title="Toggle Menu"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={26} style={{ margin: '0 auto' }} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: isSidebarOpen ? '16px' : '16px 8px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }} className="custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: isSidebarOpen ? '14px 20px' : '14px',
                  justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: isActive ? '#2563EB' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#E2E8F0',
                  fontWeight: isActive ? '700' : '500',
                  boxShadow: isActive ? '0 8px 20px rgba(37, 99, 235, 0.35)' : 'none'
                }}
              >
                <Icon size={22} style={{ flexShrink: 0, color: isActive ? '#FFFFFF' : '#94A3B8' }} />
                {isSidebarOpen && <span style={{ fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Logout */}
        <div style={{ padding: isSidebarOpen ? '20px 24px 28px 24px' : '20px 12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button 
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: isSidebarOpen ? '12px 16px' : '12px',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              background: 'transparent',
              color: '#FF8A8A',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            <LogOut size={22} style={{ flexShrink: 0, color: '#FF8A8A' }} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800 capitalize">
              {menuItems.find(m => m.id === activeTab)?.label || activeTab}
            </h2>
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search records..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs outline-none w-48 text-gray-700" 
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Blockchain Verified
            </div>

            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900 leading-tight">{profile.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">CITIZEN</p>
              </div>
              <img 
                src={profile.photo} 
                className="w-9 h-9 rounded-full border-2 border-blue-100 shadow-sm object-cover flex-shrink-0" 
                alt="Profile Avatar" 
              />
            </div>
          </div>
        </header>

        {/* Content Body Area */}
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
              {activeTab === "documents" && <DocumentStorage uid={profile.uid} />}
              {activeTab === "education" && <EducationModule uid={profile.uid} />}
              {activeTab === "employment" && <EmploymentModule uid={profile.uid} />}
              {activeTab === "taxes" && <TaxModule uid={profile.uid} />}
              {activeTab === "bills" && <UtilityBills uid={profile.uid} />}
              {activeTab === "loans" && <LoanModule uid={profile.uid} />}
              {activeTab === "ration" && <RationSystem uid={profile.uid} />}
              {activeTab === "schemes" && <GovtSchemes profile={profile} />}
              {activeTab === "diary" && <DigitalDiaryModule profile={profile} />}
              {activeTab === "queries" && <QueryManagementModule profile={profile} />}
              {activeTab === "profile-sync" && <CrossDepartmentProfileUpdateModule profile={profile} />}
              {activeTab === "audit" && <SecurityAudit uid={profile.uid} />}
              {activeTab === "settings" && <Settings profile={profile} setProfile={setProfile} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating AI Assistant Drawer */}
      <motion.aside 
        initial={false}
        animate={{ width: isChatOpen ? 380 : 0 }}
        className="bg-white border-l border-gray-100 flex flex-col shadow-2xl z-20 relative flex-shrink-0"
      >
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`absolute -left-10 top-20 bg-[#003366] text-white p-2 rounded-l-xl shadow-lg transition-transform hover:scale-110 ${!isChatOpen ? "translate-x-0" : "translate-x-0"}`}
          title="Datra Assistant"
        >
          {isChatOpen ? <ChevronRight className="w-6 h-6" /> : <Bot className="w-6 h-6 text-white" />}
        </button>

        {isChatOpen && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#003366] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-inner flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Datra Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
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
