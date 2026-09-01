import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, FileText, Download, AlertTriangle, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function ApplicationTracking({ applications = [], initialTargetId, onNavigateToService }) {
  const [searchQuery, setSearchQuery] = useState(initialTargetId || '');
  const [expandedAppId, setExpandedAppId] = useState(initialTargetId || (applications[0]?.id || ''));

  const filteredApps = applications.filter(app =>
    app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-chip status-approved';
      case 'Rejected':
        return 'status-chip' ;
      case 'Submitted':
      case 'Under Verification':
      case 'Document Verification':
      case 'Officer Review':
        return 'status-chip status-pending';
      default:
        return 'status-chip status-warning';
    }
  };

  return (
    <div className="application-tracking-page">
      <div className="section-header">
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#673AB7', textTransform: 'uppercase' }}>
            Tracking System
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e' }}>
            My Applications
          </h1>
        </div>
        <span style={{ fontSize: '12px', background: '#F3E5F5', color: '#673AB7', padding: '4px 12px', borderRadius: '12px', fontWeight: '700' }}>
          {applications.length} Active
        </span>
      </div>

      {/* Search Input for Application ID */}
      <div className="search-card" style={{ marginBottom: '20px' }}>
        <Search size={18} color="#673AB7" />
        <input
          type="text"
          className="search-input"
          placeholder="Enter Application ID (e.g. GOV-894210)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* List of Applications */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredApps.map((app) => {
          const isExpanded = expandedAppId === app.id;
          return (
            <div
              key={app.id}
              className="detail-card"
              style={{
                borderColor: isExpanded ? '#673AB7' : '#e9ecef',
                boxShadow: isExpanded ? '0 8px 24px rgba(103, 58, 183, 0.12)' : '0 4px 12px rgba(0,0,0,0.04)'
              }}
            >
              {/* App Summary Card Bar */}
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#F3E5F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    {app.icon || '📄'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a2e' }}>
                      {app.serviceName}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6c757d' }}>
                      ID: <span style={{ fontWeight: '800', color: '#311b92' }}>{app.id}</span> • {app.departmentName}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={getStatusBadgeClass(app.status)}>
                    {app.status === 'Approved' && '🟢 '}
                    {app.status === 'Under Verification' && '🔵 '}
                    {app.status === 'Officer Review' && '🟡 '}
                    {app.status === 'Submitted' && '🟢 '}
                    {app.status}
                  </span>
                  {isExpanded ? <ChevronUp size={20} color="#673AB7" /> : <ChevronDown size={20} color="#6c757d" />}
                </div>
              </div>

              {/* Detailed Expanded View with Visual Timeline */}
              {isExpanded && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #e9ecef' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '12px', color: '#6c757d' }}>
                    <span>Applicant: <strong>{app.applicantName}</strong></span>
                    <span>Applied: <strong>{app.appliedDate}</strong></span>
                  </div>

                  {/* Visual Step Timeline */}
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7', marginBottom: '8px' }}>
                    Application Tracking Timeline
                  </h4>
                  <div className="timeline">
                    {app.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className={`timeline-item ${step.completed ? 'completed' : ''} ${step.status === app.status ? 'active' : ''}`}
                      >
                        <div className="timeline-dot">
                          {step.completed && <CheckCircle2 size={12} color="white" />}
                        </div>
                        <div className="timeline-content">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="timeline-title">{step.status}</span>
                            <span className="timeline-date">{step.date}</span>
                          </div>
                          {step.note && <div className="timeline-note">{step.note}</div>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Certificate if Approved */}
                  {app.status === 'Approved' && (
                    <div style={{ marginTop: '20px', background: '#e8f5e9', padding: '14px', borderRadius: '12px', border: '1px solid #c8e6c9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <ShieldCheck color="#2e7d32" size={24} />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '800', color: '#1b5e20' }}>
                            Certificate Digitally Issued & Signed
                          </p>
                          <p style={{ fontSize: '11px', color: '#2e7d32' }}>
                            Official State QR verification valid nationwide.
                          </p>
                        </div>
                      </div>
                      <button
                        className="primary-btn"
                        style={{ background: '#2e7d32' }}
                        onClick={() => alert(`Downloading Official Signed Certificate PDF for ${app.id}...`)}
                      >
                        <Download size={18} /> Download Signed Certificate (PDF)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredApps.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '20px' }}>
            <AlertTriangle size={36} color="#f57f17" style={{ margin: '0 auto 10px auto' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '800' }}>No Applications Found</h3>
            <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
              Search for another application ID or submit a new service request.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
