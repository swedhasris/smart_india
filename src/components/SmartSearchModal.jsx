import React, { useState } from 'react';
import { Search, X, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function SmartSearchModal({ onClose, onSelectService, onSelectDepartment }) {
  const [query, setQuery] = useState('');

  const sampleQueries = [
    "I need an income certificate",
    "I want to change my land ownership",
    "I need a ration card",
    "I want a driving licence",
    "I need a scholarship",
    "I want to apply for a government housing scheme"
  ];

  // Flatten all services for global search
  const allServices = DEPARTMENTS.flatMap(dept =>
    dept.services.map(srv => ({
      ...srv,
      deptId: dept.id,
      deptName: dept.name,
      deptIcon: dept.icon
    }))
  );

  const filteredServices = allServices.filter(s => {
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.deptName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px', padding: '20px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles color="#673AB7" size={20} />
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a2e' }}>
              Smart AI Service Discovery
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#6c757d" />
          </button>
        </div>

        {/* Input */}
        <div className="search-card" style={{ marginBottom: '16px', borderColor: '#673AB7' }}>
          <Search size={20} color="#673AB7" />
          <input
            type="text"
            className="search-input"
            placeholder="Search e.g. 'income certificate', 'patta', 'driving licence'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={16} color="#6c757d" />
            </button>
          )}
        </div>

        {/* Sample search prompts */}
        {!query && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#6c757d', marginBottom: '8px' }}>
              Popular Citizen Queries:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {sampleQueries.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(sample)}
                  style={{
                    background: '#F3E5F5',
                    color: '#673AB7',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredServices.map((service) => (
            <div
              key={`${service.deptId}-${service.id}`}
              onClick={() => {
                onSelectService(service.id, service.deptId);
                onClose();
              }}
              style={{
                background: '#F4F5FA',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#673AB7'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '22px' }}>{service.icon}</span>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1a1a2e' }}>
                    {service.name}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#673AB7', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DeptLogo deptId={service.deptId} name={service.deptName} size={18} /> {service.deptName} → {service.name}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} color="#673AB7" />
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 0', color: '#6c757d' }}>
              <p style={{ fontSize: '14px', fontWeight: '700' }}>No exact service matching "{query}"</p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Try searching with keywords like 'Land', 'Cert', 'Scheme'</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
