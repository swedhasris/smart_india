import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  Building,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ApplicationTrackingModal({
  application,
  onClose
}) {
  if (!application) return null;

  const defaultTimeline = [
    { title: 'Application Submitted', date: application.appliedDate || '25 Aug 2026', completed: true, note: 'Digital application received on Government Gateway.' },
    { title: 'Document Verification', date: '25 Aug 2026', completed: true, note: 'Identity and supporting documents verified via automated API check.' },
    { title: 'Revenue Officer Review', date: application.status === 'Approved' ? '25 Aug 2026' : 'In Progress', completed: application.status === 'Approved', note: 'VAO/Tahsildar inspection and recommendation.' },
    { title: 'Approved & Certificate Issued', date: application.status === 'Approved' ? '25 Aug 2026' : 'Pending', completed: application.status === 'Approved', note: 'Digital certificate signed with QR code.' }
  ];

  const timelineSteps = application.timeline || defaultTimeline;

  return (
    <div className="desktop-modal-backdrop" onClick={onClose}>
      <div
        className="desktop-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '760px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>
              Real-Time Tracking
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#111827' }}>
              Application: {application.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} color="#4B5563" />
          </button>
        </div>

        {/* Metadata Details Grid */}
        <div style={{
          background: '#F8F9FD',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Service Name</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '2px' }}>{application.serviceName}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Department</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '2px' }}>{application.departmentName}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Applicant</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '2px' }}>{application.applicantName}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Submission Date</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#374151', marginTop: '2px' }}>{application.appliedDate}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Assigned Officer</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#374151', marginTop: '2px' }}>{application.assignedOfficer || 'VAO Mylapore Division'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>Current Status</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#673AB7', marginTop: '2px' }}>{application.status}</div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
          Verification Progress Timeline
        </h3>

        <div style={{ position: 'relative', paddingLeft: '32px', marginBottom: '28px' }}>
          <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '11px', width: '2px', background: '#E5E7EB' }} />

          {timelineSteps.map((step, idx) => (
            <div key={idx} style={{ position: 'relative', marginBottom: '20px' }}>
              <div style={{
                position: 'absolute',
                left: '-32px',
                top: '0',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: step.completed ? '#10B981' : '#E5E7EB',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxShadow: step.completed ? '0 0 0 3px rgba(16, 185, 129, 0.2)' : 'none'
              }}>
                {step.completed ? <CheckCircle2 size={14} /> : <Clock size={12} color="#6B7280" />}
              </div>

              <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '14px 18px', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>{step.title}</span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>{step.date}</span>
                </div>
                {step.note && (
                  <p style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Download Section if Approved */}
        {application.status === 'Approved' ? (
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '16px', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ShieldCheck size={28} color="#047857" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#065F46' }}>
                  Official Digital Certificate Generated
                </div>
                <div style={{ fontSize: '12px', color: '#047857' }}>
                  Digitally signed with National Cryptographic Seal & QR Verification.
                </div>
              </div>
            </div>
            <button
              className="btn-primary"
              style={{ background: '#059669', padding: '10px 20px', fontSize: '13px' }}
              onClick={() => alert(`Downloading Verified Signed Certificate PDF for ${application.id}...`)}
            >
              <Download size={16} /> Download Signed PDF
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={onClose}>
              Close Tracker
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
