import { useState } from "react";
import { Briefcase, Building2, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EmploymentModule({ uid }: { uid: string }) {
  const [activeTab, setActiveTab] = useState<"History" | "Current" | "Income">("Current");

  const employmentHistory = [
    { company: "Google India", position: "Senior Software Engineer", period: "2022 - Present", salary: "₹2,50,000", status: "Current" },
    { company: "Microsoft India", position: "Software Engineer II", period: "2020 - 2022", salary: "₹1,80,000", status: "Past" },
    { company: "Infosys Ltd", position: "Systems Engineer", period: "2018 - 2020", salary: "₹60,000", status: "Past" },
  ];

  const incomeSources = [
    { source: "Primary Salary", amount: "₹2,50,000", frequency: "Monthly", type: "Employment" },
    { source: "Freelance Projects", amount: "₹45,000", frequency: "Variable", type: "Other" },
    { source: "Rental Income", amount: "₹25,000", frequency: "Monthly", type: "Property" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Employment & Income</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Verified work history and income declarations.</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
        }}>
          <Plus size={16} /> Add Record
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '16px', width: 'fit-content' }}>
        {(["Current", "History", "Income"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: activeTab === tab ? '#FFFFFF' : 'transparent',
              color: activeTab === tab ? '#003366' : '#6B7280',
              boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            {tab} {tab === "Income" ? "Sources" : "Job"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}
        >
          <div style={{ gridColumn: 'span 2 / span 2' }}>
            {activeTab === "Current" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', itemsCenter: 'center', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ width: '60px', height: '60px', background: '#F0FDF4', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Briefcase size={28} color="#16A34A" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: 0 }}>Google India</h3>
                    <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Senior Software Engineer • Full Time</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6' }}>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Monthly Salary</p>
                    <p style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: '4px 0 0 0' }}>₹2,50,000</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>EPF UAN Number</p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#003366', fontFamily: 'monospace', margin: '4px 0 0 0' }}>101298475629</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "History" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Work History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {employmentHistory.map((item, idx) => (
                    <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Building2 size={24} color="#003366" />
                        <div>
                          <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>{item.company}</h4>
                          <p style={{ fontSize: '13px', color: '#6B7280', margin: '2px 0 0 0' }}>{item.position} • {item.period}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: item.status === 'Current' ? '#16A34A' : '#6B7280', background: item.status === 'Current' ? '#F0FDF4' : '#F3F4F6', padding: '4px 12px', borderRadius: '12px' }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Income" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Declared Income Sources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {incomeSources.map((item, idx) => (
                    <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>{item.source}</h4>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '2px 0 0 0' }}>{item.type} • {item.frequency}</p>
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: '900', color: '#059669' }}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#003366', padding: '32px', borderRadius: '32px', color: '#FFFFFF', boxShadow: '0 12px 32px rgba(0, 51, 102, 0.25)' }}>
              <p style={{ fontSize: '10px', fontWeight: '800', color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>Total Monthly Income</p>
              <div style={{ fontSize: '40px', fontWeight: '900', marginBottom: '8px' }}>₹3,20,000</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', padding: '4px 12px', borderRadius: '12px' }}>
                <CheckCircle2 size={14} /> Tax Verified
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
