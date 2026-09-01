import React from 'react';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function DepartmentDetail({ departmentId, onBack, onSelectService }) {
  const dept = DEPARTMENTS.find(d => d.id === departmentId) || DEPARTMENTS[0];
  const [search, setSearch] = React.useState('');

  const filteredServices = dept.services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="department-detail-page">
      {/* Header back button */}
      <div className="page-header-nav">
        <button className="back-btn" onClick={onBack} title="Back to Dashboard">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#673AB7', textTransform: 'uppercase' }}>
            Department View
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.4px' }}>
            {dept.name}
          </h1>
        </div>
      </div>

      {/* Department Overview Card Banner */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 16px rgba(103, 58, 183, 0.06)',
        border: '1px solid rgba(103, 58, 183, 0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <DeptLogo deptId={dept.id} name={dept.name} size={54} />
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a2e' }}>
            Access {dept.name} Services
          </h2>
          {dept.officialMinistry && (
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#673AB7' }}>
              🏛️ {dept.officialMinistry}
            </div>
          )}
          <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>
            {dept.description} • {dept.services.length} Online Services
          </p>
        </div>
      </div>

      {/* Search within sub-services */}
      <div className="search-card" style={{ marginBottom: '16px' }}>
        <Search size={18} color="#673AB7" />
        <input
          type="text"
          className="search-input"
          placeholder={`Search in ${dept.name}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sub-services Grid / List */}
      <div className="section-header">
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a2e' }}>Available Sub-Services</h3>
        <span style={{ fontSize: '12px', color: '#6c757d' }}>{filteredServices.length} items</span>
      </div>

      <div className="subservice-grid">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="subservice-card"
            onClick={() => onSelectService(service.id, dept.id)}
          >
            <div className="subservice-icon">
              {service.icon}
            </div>
            <div className="subservice-info">
              <h4 className="subservice-title">{service.name}</h4>
              <p className="subservice-desc">{service.desc}</p>
            </div>
            <ChevronRight size={18} color="#673AB7" />
          </div>
        ))}
      </div>
    </div>
  );
}
