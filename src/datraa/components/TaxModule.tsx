import { useState } from "react";
import { Receipt, Home, Car, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TaxModule({ uid }: { uid: string }) {
  const [activeTab, setActiveTab] = useState<"Overview" | "Property" | "Vehicle" | "Utility" | "Summary">("Overview");

  const taxes = [
    { type: "Income Tax", amount: "₹45,200", status: "Paid", icon: Receipt, color: "#2563EB", bg: "#EFF6FF" },
    { type: "Property Tax", amount: "₹12,500", status: "Pending", icon: Home, color: "#9333EA", bg: "#F3E8FF" },
    { type: "Vehicle Tax", amount: "₹3,200", status: "Paid", icon: Car, color: "#16A34A", bg: "#F0FDF4" },
    { type: "Utility Bills", amount: "₹1,850", status: "Paid", icon: Zap, color: "#EA580C", bg: "#FFEDD5" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Income Tax & Assets</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Manage your tax liabilities and asset declarations.</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
        }}>
          <Receipt size={16} /> File ITR
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '16px', width: 'fit-content' }}>
        {(["Overview", "Property", "Vehicle", "Utility", "Summary"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
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
            {tab}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {taxes.map((tax, idx) => {
                const Icon = tax.icon;
                return (
                  <div key={idx} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '28px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '18px', background: tax.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={24} color={tax.color} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: tax.status === 'Paid' ? '#16A34A' : '#DC2626', background: tax.status === 'Paid' ? '#F0FDF4' : '#FEF2F2', padding: '4px 10px', borderRadius: '12px' }}>
                        {tax.status}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>{tax.type}</p>
                      <p style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: '4px 0 0 0' }}>{tax.amount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#003366', padding: '32px', borderRadius: '32px', color: '#FFFFFF', boxShadow: '0 12px 32px rgba(0, 51, 102, 0.25)' }}>
              <p style={{ fontSize: '10px', fontWeight: '800', color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>AY 2024-25 Tax Status</p>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>ITR-1 Filed</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', padding: '4px 12px', borderRadius: '12px' }}>
                <CheckCircle2 size={14} /> Refund Processed
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
