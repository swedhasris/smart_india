import React, { useState } from 'react';
import { Search, ArrowRight, Building2, Sparkles } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function DepartmentsListView({ onOpenDepartment }) {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredDepts = DEPARTMENTS.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.services.some(s => s.name.toLowerCase().includes(search.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="departments-list-desktop-page">
      {/* Header */}
      <div className="section-heading-group">
        <div>
          <h1 className="section-main-title">All Government Departments</h1>
          <p className="section-main-subtitle">
            Explore public services across 35 ministries, directorates, and autonomous state bodies.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '360px' }}>
          <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search all 35 departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '14px' }}
          />
        </div>
      </div>

      {/* 4-5 Column Responsive Grid */}
      <div className="departments-grid-desktop" style={{ marginTop: '24px' }}>
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="dept-desktop-card"
            onClick={() => onOpenDepartment(dept.id)}
          >
            <div>
              <div className="dept-card-header">
                <div className="dept-circle-icon">
                  <DeptLogo deptId={dept.id} name={dept.name} size={44} />
                </div>
                <span className="dept-services-badge">
                  {dept.services.length} Services
                </span>
              </div>

              <h3 className="dept-title-text">{dept.name}</h3>
              <p className="dept-desc-text">{dept.description}</p>
            </div>

            <div className="dept-view-link">
              <span>Explore Department Services</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
