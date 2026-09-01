import { UserProfile } from "../types";
import { maskAadhaar } from "../lib/crypto";
import { 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Receipt, 
  Zap, 
  CreditCard, 
  ShoppingBasket, 
  ShieldCheck,
  ArrowUpRight,
  Bell,
  History,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Droplets,
  User as UserIcon
} from "lucide-react";
import { motion } from "motion/react";

export default function Dashboard({ 
  profile, 
  setActiveTab 
}: { 
  profile: UserProfile | null;
  setActiveTab: (tab: string) => void;
}) {
  if (!profile) return null;

  // Row 1 Cards (4 Cards)
  const summaryCardsRow1 = [
    { 
      id: "documents", 
      label: "DOCUMENTS UPLOADED", 
      value: "12", 
      icon: FileText, 
      color: "#2563EB", 
      bg: "#EFF6FF", 
      status: "VERIFIED", 
      statusColor: "#16A34A" 
    },
    { 
      id: "education", 
      label: "EDUCATION STATUS", 
      value: "Completed", 
      icon: GraduationCap, 
      color: "#9333EA", 
      bg: "#F3E8FF", 
      status: "DEGREE VERIFIED", 
      statusColor: "#2563EB" 
    },
    { 
      id: "employment", 
      label: "CURRENT JOB STATUS", 
      value: "Active", 
      icon: Briefcase, 
      color: "#16A34A", 
      bg: "#F0FDF4", 
      status: "FULL-TIME", 
      statusColor: "#4B5563" 
    },
    { 
      id: "taxes", 
      label: "MONTHLY INCOME", 
      value: "₹2,50,000", 
      icon: Receipt, 
      color: "#059669", 
      bg: "#ECFDF5", 
      status: "TAX PAID", 
      statusColor: "#059669" 
    },
  ];

  // Row 2 Cards (4 Cards)
  const summaryCardsRow2 = [
    { 
      id: "loans", 
      label: "ACTIVE LOANS", 
      value: "3", 
      icon: CreditCard, 
      color: "#EA580C", 
      bg: "#FFEDD5", 
      status: "ON TRACK", 
      statusColor: "#16A34A" 
    },
    { 
      id: "bills", 
      label: "PENDING BILLS", 
      value: "₹1,850", 
      icon: Zap, 
      color: "#DC2626", 
      bg: "#FEF2F2", 
      status: "DUE IN 4 DAYS", 
      statusColor: "#DC2626" 
    },
    { 
      id: "ration", 
      label: "RATION STATUS", 
      value: "Active", 
      icon: ShoppingBasket, 
      color: "#0D9488", 
      bg: "#CCFBF1", 
      status: "PHH CATEGORY", 
      statusColor: "#0D9488" 
    },
    { 
      id: "schemes", 
      label: "GOVT SCHEMES", 
      value: "5 Matches", 
      icon: ShieldCheck, 
      color: "#2563EB", 
      bg: "#EFF6FF", 
      status: "ELIGIBLE TO APPLY", 
      statusColor: "#2563EB" 
    }
  ];

  const recentActivity = [
    { action: "Passport_Copy.pdf Uploaded", time: "2 hours ago", icon: FileText, type: "Document Activity" },
    { action: "Electricity Bill Paid", time: "5 hours ago", icon: Zap, type: "Payment Activity" },
    { action: "Login from New Device", time: "Yesterday, 10:30 PM", icon: ShieldCheck, type: "Security Activity" },
    { action: "Profile Photo Updated", time: "2 days ago", icon: Camera, type: "Profile Activity" },
  ];

  const notifications = [
    { title: "Pending Electricity Bill", message: "Your bill for March is due in 4 days.", type: "BILL", time: "1 hour ago" },
    { title: "New Scholarship Scheme", message: "PM Merit Scholarship is now open for applications.", type: "SCHEME", time: "3 hours ago" },
    { title: "Ration Stock Update", message: "Fresh stock of Rice and Wheat arrived at Shop #4521.", type: "RATION", time: "5 hours ago" },
    { title: "Security Alert", message: "Successful login from Chrome on Windows.", type: "SECURITY", time: "Yesterday" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ── SECTION 1: CITIZEN PROFILE CARD ── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
          border: '1px solid #F3F4F6'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left Side Photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #EFF6FF',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <img src={profile.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              background: '#22C55E',
              color: '#FFFFFF',
              padding: '8px',
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(34, 197, 94, 0.3)',
              border: '4px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} color="#FFFFFF" />
            </div>
          </div>

          {/* Right Side Profile Details */}
          <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', letterSpacing: '-0.5px', margin: 0 }}>
                  {profile.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.8px',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    border: '1px solid #DBEAFE',
                    textTransform: 'uppercase'
                  }}>
                    VERIFIED CITIZEN
                  </span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '600' }}>
                    UID: {maskAadhaar(profile.aadhaar)}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab("settings")}
                style={{
                  padding: '10px 22px',
                  background: '#F9FAFB',
                  color: '#003366',
                  borderRadius: '14px',
                  fontWeight: '800',
                  fontSize: '13px',
                  border: '1px solid #E5E7EB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                Edit Profile
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #F3F4F6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={18} color="#9CA3AF" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>DATE OF BIRTH</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0' }}>{profile.dob}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <UserIcon size={18} color="#9CA3AF" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>GENDER</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0' }}>{profile.gender}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Droplets size={18} color="#EF4444" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>BLOOD GROUP</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0' }}>{profile.bloodGroup}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={18} color="#9CA3AF" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>MOBILE NUMBER</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0' }}>{profile.phone}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} color="#9CA3AF" />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>EMAIL ADDRESS</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={profile.email}>{profile.email}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={18} color="#9CA3AF" />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>ADDRESS</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={profile.address}>{profile.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 2: ROW 1 CARDS (4 Cards) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {summaryCardsRow1.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveTab(card.id)}
              style={{
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '24px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '170px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '18px',
                    background: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color={card.color} />
                  </div>
                  <ArrowUpRight size={18} color="#D1D5DB" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: '900', color: '#111827', margin: '4px 0 0 0' }}>
                    {card.value}
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: '16px', borderTop: '1px solid #F9FAFB', marginTop: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: card.statusColor, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  {card.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── SECTION 3: ROW 2 CARDS (4 Cards) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {summaryCardsRow2.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveTab(card.id)}
              style={{
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '24px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '170px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '18px',
                    background: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color={card.color} />
                  </div>
                  <ArrowUpRight size={18} color="#D1D5DB" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0 }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: '900', color: '#111827', margin: '4px 0 0 0' }}>
                    {card.value}
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: '16px', borderTop: '1px solid #F9FAFB', marginTop: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: card.statusColor, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  {card.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── SECTION 4: RECENT ACTIVITY & NOTIFICATIONS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px'
      }}>
        {/* RECENT ACTIVITY */}
        <div style={{ gridColumn: 'span 2 / span 2', background: '#FFFFFF', borderRadius: '32px', padding: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <History size={20} color="#003366" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: 0 }}>Recent Activity</h3>
            </div>
            <button onClick={() => setActiveTab("audit")} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}>
              View Full Audit Log
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {recentActivity.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: idx < recentActivity.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color="#6B7280" />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '800', color: '#111827', margin: 0 }}>{act.action}</p>
                      <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '2px 0 0 0' }}>{act.type}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase' }}>{act.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* NOTIFICATIONS PANEL */}
        <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#FEF2F2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bell size={20} color="#EF4444" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: 0 }}>Notifications</h3>
              </div>
              <span style={{ width: '24px', height: '24px', background: '#EF4444', color: '#FFFFFF', borderRadius: '50%', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {notifications.map((notif, idx) => (
                <div key={idx} style={{ padding: '16px', background: '#F9FAFB', borderRadius: '16px', border: '1px solid #F3F4F6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: notif.type === 'BILL' ? '#EF4444' : '#2563EB', letterSpacing: '0.8px' }}>{notif.type}</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{notif.time}</span>
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', margin: '2px 0' }}>{notif.title}</h4>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{notif.message}</p>
                </div>
              ))}
            </div>
          </div>

          <button style={{ width: '100%', marginTop: '24px', padding: '12px', background: '#F3F4F6', color: '#4B5563', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
}
