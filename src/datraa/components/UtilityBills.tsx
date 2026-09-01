import { useState } from "react";
import { Zap, Droplets, Flame, History, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function UtilityBills({ uid }: { uid: string }) {
  const bills = [
    { type: "Electricity", provider: "BSES Yamuna", billNo: "1029384756", amount: "₹1,245", dueDate: "Mar 28, 2024", status: "Unpaid", icon: Zap, color: "#EA580C", bg: "#FFEDD5" },
    { type: "Water", provider: "Delhi Jal Board", billNo: "DJB-98231", amount: "₹450", dueDate: "Mar 25, 2024", status: "Paid", icon: Droplets, color: "#2563EB", bg: "#EFF6FF" },
    { type: "Gas", provider: "Indraprastha Gas", billNo: "IGL-7721", amount: "₹890", dueDate: "Apr 02, 2024", status: "Unpaid", icon: Flame, color: "#DC2626", bg: "#FEF2F2" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Utility Bills & Payments</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>View and pay your essential utility bills via secure UPI.</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
        }}>
          <History size={16} /> Payment History
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {bills.map((bill, idx) => {
            const Icon = bill.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: '#FFFFFF',
                  padding: '24px',
                  borderRadius: '28px',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '18px', background: bill.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={26} color={bill.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#111827', margin: 0 }}>{bill.type}</h3>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>{bill.provider} • {bill.billNo}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <div>
                    <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Amount Due</p>
                    <p style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '2px 0 0 0' }}>{bill.amount}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Due Date</p>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: bill.status === "Unpaid" ? "#DC2626" : "#374151", margin: '2px 0 0 0' }}>{bill.dueDate}</p>
                  </div>
                  <div>
                    {bill.status === "Unpaid" ? (
                      <button style={{
                        padding: '10px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
                      }}>
                        Pay via UPI
                      </button>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#16A34A', background: '#F0FDF4', padding: '6px 14px', borderRadius: '12px' }}>
                        <CheckCircle2 size={16} /> Paid
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#003366', padding: '32px', borderRadius: '32px', color: '#FFFFFF', boxShadow: '0 12px 32px rgba(0, 51, 102, 0.25)' }}>
            <p style={{ fontSize: '10px', fontWeight: '800', color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>Total Pending Utility</p>
            <div style={{ fontSize: '40px', fontWeight: '900', marginBottom: '8px' }}>₹2,135</div>
            <p style={{ fontSize: '12px', color: '#BFDBFE', margin: 0 }}>2 bills due within the next 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
