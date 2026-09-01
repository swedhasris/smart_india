import React, { useState } from 'react';
import { Search, ChevronRight, Sparkles, Network, ClipboardList, ShieldCheck } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function HomeDashboard({
  onSelectDepartment,
  onOpenSearch,
  onNavigateToApplications,
  onNavigateToVisualizer
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredDepts = DEPARTMENTS.filter(d =>
    d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.services.some(s => s.name.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="home-dashboard">
      {/* Smart Search Bar */}
      <div className="search-card" onClick={onOpenSearch}>
        <Search size={20} color="#673AB7" />
        <input
          type="text"
          className="search-input"
          placeholder="What government service do you need?"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <div style={{
          background: 'rgba(103, 58, 183, 0.1)',
          color: '#673AB7',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          whiteSpace: 'nowrap'
        }}>
          Smart AI Search
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="quick-action-bar">
        <div className="quick-chip" onClick={onNavigateToApplications}>
          <ClipboardList size={16} /> My Applications
        </div>
        <div className="quick-chip" onClick={onNavigateToVisualizer}>
          <Network size={16} /> Inter-Dept Gateway
        </div>
        <div className="quick-chip" onClick={() => onSelectDepartment('revenue')} style={{ gap: '6px' }}>
          <DeptLogo deptId="revenue" size={20} /> Revenue Dept
        </div>
        <div className="quick-chip" onClick={() => onSelectDepartment('transport')} style={{ gap: '6px' }}>
          <DeptLogo deptId="transport" size={20} /> Transport
        </div>
        <div className="quick-chip" onClick={() => onSelectDepartment('housing')} style={{ gap: '6px' }}>
          <DeptLogo deptId="housing" size={20} /> Housing Scheme
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7C4DFF 0%, #673AB7 100%)',
        color: 'white',
        borderRadius: '20px',
        padding: '18px 20px',
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(103, 58, 183, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px', opacity: 0.9 }}>
            <ShieldCheck size={14} /> Official Citizen Portal
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: '4px', letterSpacing: '-0.3px' }}>
            35 Departments, 200+ Services
          </h2>
          <p style={{ fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>
            Apply, track & receive verified digital certificates.
          </p>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          🏛️
        </div>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Government Departments</h2>
          <p className="section-subtitle">Select a department to view services</p>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#673AB7', background: '#F3E5F5', padding: '4px 10px', borderRadius: '12px' }}>
          {filteredDepts.length} Available
        </span>
      </div>

      {/* 2-Column Rounded Department Cards Grid */}
      <div className="dept-grid">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="dept-card"
            onClick={() => onSelectDepartment(dept.id)}
          >
            <div>
              <div className="dept-card-top">
                <div className="dept-icon-wrapper">
                  <DeptLogo deptId={dept.id} name={dept.name} size={44} />
                </div>
                <ChevronRight className="dept-chevron" size={20} />
              </div>
              <h3 className="dept-name">{dept.name}</h3>
              <p className="dept-desc">{dept.description}</p>
            </div>
            <div className="dept-tag">
              {dept.services.length} Services
            </div>
          </div>
        ))}
      </div>

      {filteredDepts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '20px' }}>
          <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e' }}>No matching departments found</p>
          <p style={{ fontSize: '13px', color: '#6c757d', marginTop: '4px' }}>Try searching for "Income", "Land", "Ration", or "Licence"</p>
        </div>
      )}
    </div>
  );
}
