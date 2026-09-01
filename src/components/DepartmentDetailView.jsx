import React, { useState } from 'react';
import { ArrowLeft, Search, ArrowRight, ShieldCheck, FileCheck, Award, Layers, Sparkles } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function DepartmentDetailView({
  departmentId = 'revenue',
  onBack,
  onOpenService,
  onOpenDeptWorkspace
}) {
  const dept = DEPARTMENTS.find(d => d.id === departmentId) || DEPARTMENTS[0];
  const [subSearch, setSubSearch] = useState('');

  const filteredServices = dept.services.filter(s =>
    s.name.toLowerCase().includes(subSearch.toLowerCase()) ||
    s.desc.toLowerCase().includes(subSearch.toLowerCase())
  );

  return (
    <div className="dept-detail-desktop-page">
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#673AB7', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}
        >
          <ArrowLeft size={16} /> Back to Departments
        </button>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: '600' }}>Departments</span>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span style={{ color: '#673AB7', fontSize: '14px', fontWeight: '800' }}>{dept.name}</span>
      </div>

      {/* Full Width Department Overview Banner */}
      <section className="dept-overview-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <DeptLogo deptId={dept.id} name={dept.name} size={64} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: '800', color: '#111827' }}>
                  {dept.name}
                </h1>
                <span style={{ background: '#ECFDF5', color: '#10B981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
                  ✓ Fully Digitized
                </span>
              </div>
              {dept.officialMinistry && (
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#673AB7', marginTop: '2px' }}>
                  🏛️ {dept.officialMinistry}
                </div>
              )}
              <p style={{ fontSize: '15px', color: '#4B5563', marginTop: '4px' }}>
                {dept.description} • Fast-track online applications with instant e-Signatures.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn-primary"
              onClick={() => onOpenService('income-cert', dept.id)}
            >
              <Sparkles size={16} /> Most Popular: Income Certificate
            </button>
          </div>
        </div>

        {/* 4 Metrics Panel as Requested */}
        <div className="metrics-row">
          <div className="metric-item">
            <div className="metric-num">{dept.services.length}</div>
            <div className="metric-lbl">Total Services Available</div>
          </div>
          <div className="metric-item">
            <div className="metric-num">100%</div>
            <div className="metric-lbl">Online E-Services</div>
          </div>
          <div className="metric-item">
            <div className="metric-num">12</div>
            <div className="metric-lbl">Application Services</div>
          </div>
          <div className="metric-item">
            <div className="metric-num">4</div>
            <div className="metric-lbl">Instant Certificate Issuances</div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section>
        <div className="section-heading-group">
          <div>
            <h2 className="section-main-title">{dept.name} Services</h2>
            <p className="section-main-subtitle">Select any citizen service to view eligibility, required documents, or apply online.</p>
          </div>

          {/* Search within department */}
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={`Search ${dept.name}...`}
              value={subSearch}
              onChange={(e) => setSubSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                borderRadius: '12px',
                border: '1.5px solid #E5E7EB',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Desktop Responsive Sub-Services Grid (3-4 columns) */}
        <div className="departments-grid-desktop">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="dept-desktop-card"
              onClick={() => onOpenService(srv.id, dept.id)}
            >
              <div>
                <div className="dept-card-header">
                  <div className="dept-circle-icon">
                    {srv.icon}
                  </div>
                  {srv.featured && (
                    <span style={{ background: '#FFFBEB', color: '#F59E0B', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px' }}>
                      ★ High Demand
                    </span>
                  )}
                </div>

                <h3 className="dept-title-text">{srv.name}</h3>
                <p className="dept-desc-text">{srv.desc}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                <div className="dept-view-link">
                  <span>View Details & Apply</span>
                  <ArrowRight size={16} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof onOpenDeptWorkspace === 'function') {
                      onOpenDeptWorkspace();
                    } else {
                      window.location.href = '/dept-workspace';
                    }
                  }}
                  style={{ background: '#F3E8FF', color: '#673AB7', border: '1px solid #673AB7', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  DO WORK
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
