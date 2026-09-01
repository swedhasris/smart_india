import { useState } from "react";
import { ShoppingBasket, Users, Store, Plus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RationSystem({ uid }: { uid: string }) {
  const [activeTab, setActiveTab] = useState<"Members" | "History" | "Store" | "Stock">("Members");

  const members = [
    { name: "Sathish Kumar", relation: "Self (Head)", age: 45, status: "Verified" },
    { name: "Swedhasri Sathish", relation: "Daughter", age: 22, status: "Verified" },
    { name: "Lakshmi Sathish", relation: "Spouse", age: 42, status: "Verified" },
    { name: "Rahul Sathish", relation: "Son", age: 18, status: "Verified" },
  ];

  const purchaseHistory = [
    { date: "Mar 10, 2024", items: "Rice (20kg), Wheat (10kg), Sugar (2kg)", amount: "₹450", status: "Collected" },
    { date: "Feb 12, 2024", items: "Rice (20kg), Wheat (10kg), Oil (2L)", amount: "₹520", status: "Collected" },
    { date: "Jan 15, 2024", items: "Rice (20kg), Wheat (10kg), Sugar (2kg)", amount: "₹450", status: "Collected" },
  ];

  const stockAvailability = [
    { item: "Rice", available: "1200 kg", price: "₹3/kg", status: "In Stock" },
    { item: "Wheat", available: "850 kg", price: "₹2/kg", status: "In Stock" },
    { item: "Sugar", available: "45 kg", price: "₹13.5/kg", status: "Low Stock" },
    { item: "Kerosene", available: "0 L", price: "₹25/L", status: "Out of Stock" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Ration Card & Public Distribution</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Manage your household ration card, members, and purchase history.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '6px 14px', borderRadius: '20px', border: '1px solid #DBEAFE' }}>
            Card Type: PHH (Priority Household)
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
          }}>
            <Plus size={16} /> Add Member
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '16px', width: 'fit-content' }}>
        {(["Members", "History", "Store", "Stock"] as const).map((tab) => (
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
            {tab} {tab === "Stock" ? "Availability" : tab === "Store" ? "Details" : ""}
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
            {activeTab === "Members" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Household Family Members</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {members.map((m, idx) => (
                    <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Users size={20} color="#003366" />
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#16A34A', background: '#F0FDF4', padding: '2px 8px', borderRadius: '10px' }}>{m.status}</span>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>{m.name}</h4>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{m.relation} • {m.age} yrs</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "History" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Ration Collection History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {purchaseHistory.map((item, idx) => (
                    <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>{item.items}</h4>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>Collected on {item.date}</p>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '900', color: '#16A34A' }}>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Stock" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>FPS Shop Commodity Availability</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {stockAvailability.map((s, idx) => (
                    <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>{s.item}</p>
                      <p style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: 0 }}>{s.available}</p>
                      <p style={{ fontSize: '12px', fontWeight: '800', color: s.status === 'In Stock' ? '#16A34A' : '#DC2626', margin: 0 }}>{s.status} ({s.price})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Store" && (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', gap: '24px', alignItems: 'center' }}>
                <Store size={48} color="#003366" />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Fair Price Shop #4521</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0 0' }}>Central Secretariat Sector 4, New Delhi - 110001</p>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#16A34A', margin: '6px 0 0 0' }}>Dealer: Ramesh Chand • Open Today 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#003366', padding: '32px', borderRadius: '32px', color: '#FFFFFF', boxShadow: '0 12px 32px rgba(0, 51, 102, 0.25)' }}>
              <p style={{ fontSize: '10px', fontWeight: '800', color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>Ration Entitlement Status</p>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>March Quota</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', padding: '4px 12px', borderRadius: '12px' }}>
                <CheckCircle2 size={14} /> Ready for Collection
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
