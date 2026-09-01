import React, { useState } from 'react';
import {
  Search,
  FileText,
  Filter,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function MyApplicationsView({
  applications = [],
  onOpenTrackingModal,
  onApplyNew
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.departmentName.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && app.status.toUpperCase().replace(/\s+/g, '_') === statusFilter;
  });

  const getBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="gov-status-badge status-approved">🟢 Approved</span>;
      case 'Under Verification':
      case 'Document Verification':
      case 'Revenue Officer Review':
        return <span className="gov-status-badge status-under-review">🔵 Under Verification</span>;
      case 'Pending':
      case 'Submitted':
        return <span className="gov-status-badge status-pending">🟡 Pending</span>;
      case 'Rejected':
        return <span className="gov-status-badge status-rejected">🔴 Rejected</span>;
      default:
        return <span className="gov-status-badge status-pending">🟡 {status}</span>;
    }
  };

  return (
    <div className="my-applications-desktop-page">
      {/* Section Header */}
      <div className="section-heading-group">
        <div>
          <h1 className="section-main-title">My Applications</h1>
          <p className="section-main-subtitle">
            Manage and track all your government service applications submitted across 35 departments.
          </p>
        </div>

        <button className="btn-primary" onClick={onApplyNew}>
          + Apply for New Service
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div className="content-card" style={{ padding: '20px', marginBottom: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280' }}>Total Submitted</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>
            {applications.length}
          </div>
        </div>
        <div className="content-card" style={{ padding: '20px', marginBottom: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0288D1' }}>Under Verification</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0288D1', marginTop: '4px' }}>
            {applications.filter(a => a.status === 'Under Verification' || a.status === 'Submitted').length}
          </div>
        </div>
        <div className="content-card" style={{ padding: '20px', marginBottom: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#10B981' }}>Approved Certificates</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>
            {applications.filter(a => a.status === 'Approved').length}
          </div>
        </div>
        <div className="content-card" style={{ padding: '20px', marginBottom: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#673AB7' }}>Average Turnaround</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#673AB7', marginTop: '4px' }}>
            3.2 Days
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="content-card" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '380px' }}>
          <Search size={18} color="#6B7280" />
          <input
            type="text"
            placeholder="Search by Application ID, service, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'ALL', label: 'All' },
            { id: 'UNDER_VERIFICATION', label: 'Under Verification' },
            { id: 'APPROVED', label: 'Approved' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              style={{
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                background: statusFilter === f.id ? '#673AB7' : '#F3F4F6',
                color: statusFilter === f.id ? 'white' : '#4B5563'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Data Table */}
      <div className="desktop-table-container">
        <table className="desktop-gov-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Service</th>
              <th>Department</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id}>
                <td>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: '#311B92' }}>
                    {app.id}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{app.icon || '📄'}</span>
                    <div>
                      <div style={{ fontWeight: '700', color: '#111827' }}>{app.serviceName}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>Applicant: {app.applicantName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: '600', color: '#374151' }}>
                    {app.departmentName}
                  </span>
                </td>
                <td>
                  <span style={{ color: '#4B5563', fontSize: '13px' }}>
                    {app.appliedDate}
                  </span>
                </td>
                <td>
                  {getBadge(app.status)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => onOpenTrackingModal(app)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                  >
                    <Eye size={14} /> View Details / Track
                  </button>
                </td>
              </tr>
            ))}

            {filteredApps.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px 0', color: '#6B7280' }}>
                  <FileText size={36} color="#9CA3AF" style={{ margin: '0 auto 10px auto' }} />
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>No applications found</div>
                  <p style={{ fontSize: '13px', marginTop: '4px' }}>Try clearing your search query or apply for a new service.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
