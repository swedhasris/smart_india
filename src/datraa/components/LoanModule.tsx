import { Landmark, Coins, Map, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function LoanModule({ uid }: { uid: string }) {
  const loans = [
    { type: "Education Loan", bank: "State Bank of India", amount: "₹12,00,000", emi: "₹15,400", balance: "₹8,45,000", status: "Active", icon: Landmark, color: "#2563EB", bg: "#EFF6FF" },
    { type: "Gold Loan", bank: "Muthoot Finance", amount: "₹2,50,000", emi: "₹4,200", balance: "₹1,10,000", status: "Active", icon: Coins, color: "#CA8A04", bg: "#FEF9C3" },
    { type: "Land Loan", bank: "HDFC Bank", amount: "₹45,00,000", emi: "₹38,000", balance: "₹42,15,000", status: "Active", icon: Map, color: "#16A34A", bg: "#F0FDF4" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Loan Management</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Track your active loans, EMIs, and outstanding balances.</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
        }}>
          <Plus size={16} /> Apply for Loan
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {loans.map((loan, idx) => {
            const Icon = loan.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: '#FFFFFF',
                  padding: '32px',
                  borderRadius: '32px',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '20px', background: loan.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={28} color={loan.color} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>{loan.type}</h3>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>{loan.bank}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#16A34A', background: '#F0FDF4', padding: '6px 14px', borderRadius: '12px' }}>
                    {loan.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '16px', borderTop: '1px solid #F9FAFB' }}>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Total Loan</p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '4px 0 0 0' }}>{loan.amount}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Monthly EMI</p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#2563EB', margin: '4px 0 0 0' }}>{loan.emi}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Outstanding</p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#EA580C', margin: '4px 0 0 0' }}>{loan.balance}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#003366', padding: '32px', borderRadius: '32px', color: '#FFFFFF', boxShadow: '0 12px 32px rgba(0, 51, 102, 0.25)' }}>
            <p style={{ fontSize: '10px', fontWeight: '800', color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>Credit Score Status</p>
            <div style={{ fontSize: '48px', fontWeight: '900', marginBottom: '8px' }}>785</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', padding: '4px 12px', borderRadius: '12px' }}>
              <CheckCircle2 size={14} /> Excellent Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
