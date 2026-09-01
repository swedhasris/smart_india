import { useState } from "react";
import { ShieldCheck, GraduationCap, Heart, Sprout, Home, Briefcase, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";

export default function GovtSchemes({ profile }: { profile: UserProfile | null }) {
  const [activeTab, setActiveTab] = useState<"Education" | "Women" | "Food" | "Health" | "Farmer" | "Housing" | "Employment">("Education");

  const schemes = {
    Education: [
      { name: "Post-Matric Scholarship", provider: "Ministry of Social Justice", benefit: "Full Tuition Fee Waiver", eligibility: "Eligible" },
      { name: "National Overseas Scholarship", provider: "Ministry of External Affairs", benefit: "₹15L for Masters", eligibility: "Check Details" },
      { name: "Central Sector Scheme", provider: "Ministry of Education", benefit: "₹10,000 per year", eligibility: "Eligible" },
    ],
    Women: [
      { name: "Pradhan Mantri Matru Vandana Yojana", provider: "Ministry of WCD", benefit: "₹5,000 Cash Incentive", eligibility: "N/A" },
      { name: "Mahila Coir Yojana", provider: "Ministry of MSME", benefit: "Skill Training + Stipend", eligibility: "Eligible" },
    ],
    Food: [
      { name: "PM Garib Kalyan Anna Yojana", provider: "Ministry of Food", benefit: "5kg Free Foodgrains", eligibility: "Eligible" },
      { name: "One Nation One Ration Card", provider: "Ministry of Food", benefit: "Interstate Portability", eligibility: "Active" },
    ],
    Health: [
      { name: "Ayushman Bharat (PM-JAY)", provider: "National Health Authority", benefit: "₹5L Health Cover", eligibility: "Eligible" },
      { name: "PM Bhartiya Janaushadhi Pariyojana", provider: "Ministry of Chemicals", benefit: "Affordable Medicines", eligibility: "Active" },
    ],
    Farmer: [
      { name: "PM Kisan Samman Nidhi", provider: "Ministry of Agriculture", benefit: "₹6,000 per year", eligibility: "N/A" },
      { name: "PM Fasal Bima Yojana", provider: "Ministry of Agriculture", benefit: "Crop Insurance", eligibility: "N/A" },
    ],
    Housing: [
      { name: "PM Awas Yojana (Urban)", provider: "Ministry of Housing", benefit: "Interest Subsidy on Home Loan", eligibility: "Check Details" },
      { name: "PM Awas Yojana (Gramin)", provider: "Ministry of Rural Dev", benefit: "₹1.2L for House Construction", eligibility: "N/A" },
    ],
    Employment: [
      { name: "PM Mudra Yojana", provider: "MUDRA Bank", benefit: "Loan up to ₹10L", eligibility: "Eligible" },
      { name: "MGNREGA", provider: "Ministry of Rural Dev", benefit: "100 Days Guaranteed Work", eligibility: "Eligible" },
    ],
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Government Welfare Schemes</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Discover and apply for schemes based on your eligibility profile.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '16px', width: 'fit-content', overflowX: 'auto' }}>
        {(["Education", "Women", "Food", "Health", "Farmer", "Housing", "Employment"] as const).map((tab) => (
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
              boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
              whiteSpace: 'nowrap'
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
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}
        >
          {schemes[activeTab].map((scheme, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '28px', borderRadius: '28px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: scheme.eligibility === 'Eligible' ? '#16A34A' : '#2563EB', background: scheme.eligibility === 'Eligible' ? '#F0FDF4' : '#EFF6FF', padding: '4px 12px', borderRadius: '12px' }}>
                    {scheme.eligibility}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>{scheme.name}</h3>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>{scheme.provider}</p>
                <div style={{ marginTop: '16px', padding: '12px', background: '#F9FAFB', borderRadius: '14px', border: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Key Benefit</p>
                  <p style={{ fontSize: '13px', fontWeight: '800', color: '#059669', margin: '2px 0 0 0' }}>💰 {scheme.benefit}</p>
                </div>
              </div>

              <button style={{
                width: '100%', padding: '12px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
              }}>
                Apply Now
              </button>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
