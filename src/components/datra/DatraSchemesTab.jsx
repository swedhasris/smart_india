import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  HelpCircle,
  FileText,
  Building2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { GOVERNMENT_SCHEMES } from './datraServiceAdapters';

export default function DatraSchemesTab({ onOpenSmartApply }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [whyEligibleScheme, setWhyEligibleScheme] = useState(null);

  const categories = ['All', 'Agriculture', 'Housing', 'Education', 'Healthcare', 'Welfare'];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter(sch => {
    const matchCat = selectedCategory === 'All' || sch.category === selectedCategory;
    const matchSearch = sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sch.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header & Controls */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>DISCOVERY & ELIGIBILITY ENGINE</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: '2px 0 0' }}>
              Government Schemes & Social Welfare Services
            </h2>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search scheme, benefit, department…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px 10px 42px',
                border: '1px solid #D1D5DB', borderRadius: 30,
                fontSize: 13, color: '#1F2937', outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px', borderRadius: 20, fontSize: 12, fontWeight: 800,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: selectedCategory === cat ? '#673AB7' : '#F3F4F6',
                color: selectedCategory === cat ? '#fff' : '#4B5563'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {filteredSchemes.map(sch => (
          <div
            key={sch.id}
            style={{
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: 20, padding: 24, boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', background: '#EDE9FE', padding: '4px 12px', borderRadius: 12 }}>
                  {sch.category}
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: '#059669', background: '#D1FAE5', padding: '4px 12px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={14} /> {sch.matchScore}% Match
                </span>
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 900, color: '#1F2937', margin: '0 0 6px', lineHeight: 1.3 }}>
                {sch.title}
              </h3>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Building2 size={14} /> {sch.department}
              </div>

              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 12, padding: '10px 14px', marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#047857', letterSpacing: 0.5 }}>BENEFIT AMOUNT / COVERAGE</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#065F46', marginTop: 2 }}>
                  {sch.benefit}
                </div>
              </div>

              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, marginBottom: 16 }}>
                {sch.description}
              </p>
            </div>

            <div>
              {/* Why Am I Eligible Trigger */}
              <button
                onClick={() => setWhyEligibleScheme(sch)}
                style={{
                  width: '100%', padding: '10px', marginBottom: 12,
                  background: '#F9FAFB', border: '1px dashed #D1D5DB',
                  borderRadius: 12, color: '#673AB7', fontSize: 12, fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                }}
              >
                <HelpCircle size={15} /> Why am I eligible for this?
              </button>

              <button
                onClick={() => onOpenSmartApply(sch)}
                style={{
                  width: '100%', padding: '12px 0',
                  background: 'linear-gradient(135deg, #673AB7, #512DA8)',
                  border: 'none', borderRadius: 14, color: '#fff',
                  fontSize: 14, fontWeight: 900, cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(103, 58, 183, 0.3)'
                }}
              >
                ⚡ Apply via Smart Pre-fill →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* "Why Am I Eligible?" Modal */}
      {whyEligibleScheme && (
        <div
          onClick={() => setWhyEligibleScheme(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 24, maxWidth: 540, width: '100%',
              padding: 28, boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ background: '#EDE9FE', padding: 8, borderRadius: 12, color: '#673AB7' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>AI ELIGIBILITY ANALYSIS</div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1F2937', margin: 0 }}>
                    Why You Qualify ({whyEligibleScheme.matchScore}% Match)
                  </h3>
                </div>
              </div>
              <button onClick={() => setWhyEligibleScheme(null)} style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer' }}>
                <X size={18} color="#4B5563" />
              </button>
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>
              {whyEligibleScheme.title}
            </div>

            <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', letterSpacing: 0.5, marginBottom: 10 }}>MATCHED CITIZEN CRITERIA</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {whyEligibleScheme.whyEligible.map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: '#1F2937', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', letterSpacing: 0.5, marginBottom: 8 }}>REQUIRED DOCUMENTS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {whyEligibleScheme.requiredDocs.map(doc => (
                  <span key={doc} style={{ background: '#EEF2FF', color: '#4F46E5', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 12 }}>
                    📄 {doc}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                const sch = whyEligibleScheme;
                setWhyEligibleScheme(null);
                onOpenSmartApply(sch);
              }}
              style={{
                width: '100%', padding: '14px 0',
                background: 'linear-gradient(135deg, #673AB7, #512DA8)',
                border: 'none', borderRadius: 14, color: '#fff',
                fontSize: 14, fontWeight: 900, cursor: 'pointer'
              }}
            >
              Proceed to Smart Application →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
