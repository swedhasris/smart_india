import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight, Building2 } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function DesktopSearchModal({
  initialQuery = '',
  onClose,
  onOpenService,
  onOpenDepartment
}) {
  const [query, setQuery] = useState(initialQuery);

  const samplePrompts = [
    "Income Certificate",
    "Patta Land Ownership",
    "Driving Licence",
    "Smart Ration Card",
    "Housing Scheme Allotment",
    "Scholarship Portal",
    "FIR Lost Document"
  ];

  // Flatten all services for global search
  const allServices = DEPARTMENTS.flatMap(d =>
    d.services.map(s => ({
      ...s,
      deptId: d.id,
      deptName: d.name,
      deptIcon: d.icon
    }))
  );

  const results = allServices.filter(s => {
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.deptName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="desktop-modal-backdrop" onClick={onClose}>
      <div
        className="desktop-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: '28px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} color="#673AB7" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800' }}>
              Global Government Service Search
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} color="#4B5563" />
          </button>
        </div>

        {/* Big Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '2px solid #673AB7',
          borderRadius: '14px',
          padding: '12px 18px',
          background: '#F8F9FD',
          marginBottom: '16px'
        }}>
          <Search size={22} color="#673AB7" />
          <input
            type="text"
            placeholder="Type service name (e.g. Income Certificate, Ration Card)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontWeight: '600' }}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={18} color="#6B7280" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', marginBottom: '8px' }}>
              Popular Citizen Inquiries:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(p)}
                  style={{
                    background: '#F3E5F5',
                    color: '#673AB7',
                    border: '1px solid rgba(103, 58, 183, 0.15)',
                    borderRadius: '16px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {results.map((srv) => (
            <div
              key={`${srv.deptId}-${srv.id}`}
              style={{
                background: '#F8F9FD',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '26px' }}>{srv.icon}</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#111827' }}>{srv.name}</div>
                    <div style={{ fontSize: '12px', color: '#673AB7', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <DeptLogo deptId={srv.deptId} name={srv.deptName} size={18} /> {srv.deptName}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenService(srv.id, srv.deptId);
                    onClose();
                  }}
                  style={{
                    background: '#673AB7', color: '#fff', border: 'none',
                    borderRadius: 20, padding: '8px 16px', fontSize: 12, fontWeight: 800,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  Start Application <ArrowRight size={14} />
                </button>
              </div>

              {/* Description & Eligibility */}
              <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5 }}>
                {srv.desc}
              </div>

              {/* Smart Required Documents Checklist */}
              <div style={{ background: '#EDE9FE', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 0.5, marginBottom: 6 }}>
                  📋 SMART REQUIRED DOCUMENTS CHECKLIST:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12 }}>
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓ Aadhaar Identity Proof (Available)</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓ Address Proof (Available)</span>
                  <span style={{ color: '#D97706', fontWeight: 700 }}>⚠️ Income Certificate (Needs Verification)</span>
                  <span style={{ color: '#DC2626', fontWeight: 700 }}>❌ Self-Declaration Form (Missing)</span>
                </div>
              </div>

              {/* Smart 5-Step Application Guidance */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#6B7280', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, color: '#673AB7' }}>5-Step Application Workflow:</span>
                <span>1. Personal Info</span> →
                <span>2. Documents</span> →
                <span>3. Review</span> →
                <span>4. Consent</span> →
                <span>5. Submit</span>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '36px', color: '#6B7280' }}>
              <div style={{ fontSize: '15px', fontWeight: '700' }}>No exact service matches "{query}"</div>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Browse through 35 departments in the left sidebar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
