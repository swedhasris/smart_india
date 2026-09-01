import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, FileText, ArrowRight, ShieldCheck, HelpCircle, Layers } from 'lucide-react';
import { SERVICE_DETAILS, DEPARTMENTS } from '../data/departmentsData';

export default function SubServiceDetail({
  serviceId,
  departmentId,
  onBack,
  onApplyNow,
  onTrackApplication
}) {
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);

  // Fallback lookup if specific details object isn't fully expanded
  const dept = DEPARTMENTS.find(d => d.id === departmentId) || DEPARTMENTS[0];
  const genericSubservice = dept.services.find(s => s.id === serviceId) || dept.services[0];
  
  const detail = SERVICE_DETAILS[serviceId] || {
    id: genericSubservice.id,
    departmentId: dept.id,
    departmentName: dept.name,
    name: genericSubservice.name,
    icon: genericSubservice.icon,
    overview: genericSubservice.desc + ". This digital government service enables eligible citizens to apply online without visiting physically.",
    eligibility: [
      "Must be a permanent resident of the State",
      "Valid Identity proof (Aadhaar / Voter ID)",
      "Required supporting documents for verification"
    ],
    requiredDocuments: [
      { name: "Aadhaar Card / Government Photo ID", type: "Identity Proof", mandatory: true },
      { name: "Proof of Address / Residence Certificate", type: "Address Proof", mandatory: true },
      { name: "Self Declaration Form", type: "Affidavit", mandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Personal Details", desc: "Enter name, DOB, Aadhaar number, and contact info." },
      { step: 2, title: "Address & Service Info", desc: "Provide permanent residence location and taluk." },
      { step: 3, title: "Document Upload", desc: "Upload scanned copies of required certificates." },
      { step: 4, title: "Review & Submit", desc: "Confirm entries and generate GOV application ID." }
    ]
  };

  return (
    <div className="subservice-detail-page">
      {/* Back button */}
      <div className="page-header-nav">
        <button className="back-btn" onClick={onBack} title="Back to Department">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#673AB7' }}>
            {detail.departmentName}
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.3px' }}>
            {detail.name}
          </h1>
        </div>
      </div>

      {/* Main Service Card Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #673AB7 0%, #7C4DFF 100%)',
        color: 'white',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 8px 24px rgba(103, 58, 183, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px'
          }}>
            {detail.icon}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800' }}>{detail.name}</h2>
            <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.25)', padding: '2px 8px', borderRadius: '10px' }}>
              Official Digital Portal Service
            </span>
          </div>
        </div>
        <p style={{ fontSize: '12px', opacity: 0.95, lineHeight: 1.4 }}>
          {detail.overview}
        </p>
      </div>

      {/* 1. What is this? */}
      <div className="detail-card">
        <h3 className="detail-section-title">
          <HelpCircle size={18} /> What is this?
        </h3>
        <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.5 }}>
          {detail.overview}
        </p>
      </div>

      {/* 2. Eligibility */}
      <div className="detail-card">
        <h3 className="detail-section-title">
          <ShieldCheck size={18} /> Eligibility Criteria
        </h3>
        {detail.eligibility.map((req, idx) => (
          <div key={idx} className="checklist-item">
            <CheckCircle2 className="check-icon" size={16} />
            <span>{req}</span>
          </div>
        ))}
      </div>

      {/* 3. Documents Required */}
      <div className="detail-card">
        <h3 className="detail-section-title">
          <FileText size={18} /> Documents Required
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {detail.requiredDocuments.map((doc, idx) => (
            <div key={idx} style={{
              background: '#F4F5FA',
              padding: '10px 14px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{doc.name}</p>
                <p style={{ fontSize: '11px', color: '#6c757d' }}>{doc.type}</p>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '8px',
                background: doc.mandatory ? '#ffebee' : '#e8f5e9',
                color: doc.mandatory ? '#c62828' : '#2e7d32'
              }}>
                {doc.mandatory ? 'Mandatory' : 'Optional'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Application Process Steps */}
      <div className="detail-card">
        <h3 className="detail-section-title">
          <Layers size={18} /> Application Process
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {detail.applicationSteps.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#673AB7',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '12px',
                flexShrink: 0
              }}>
                {s.step}
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{s.title}</p>
                <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="btn-group" style={{ marginBottom: '30px' }}>
        <button
          className="primary-btn"
          onClick={() => onApplyNow(detail)}
        >
          Apply Now <ArrowRight size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            className="secondary-btn"
            onClick={() => setShowEligibilityModal(true)}
          >
            Check Eligibility
          </button>

          <button
            className="secondary-btn"
            onClick={() => setShowDocsModal(true)}
          >
            Required Documents
          </button>
        </div>

        <button
          className="secondary-btn"
          onClick={onTrackApplication}
          style={{ justifyContent: 'center' }}
        >
          Track Existing Application
        </button>
      </div>

      {/* Eligibility Modal */}
      {showEligibilityModal && (
        <div className="modal-overlay" onClick={() => setShowEligibilityModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Eligibility Checklist</h3>
            {detail.eligibility.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '13px' }}>
                <CheckCircle2 color="#2e7d32" size={16} /> <span>{item}</span>
              </div>
            ))}
            <button className="primary-btn" style={{ marginTop: '16px' }} onClick={() => setShowEligibilityModal(false)}>
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Docs Modal */}
      {showDocsModal && (
        <div className="modal-overlay" onClick={() => setShowDocsModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Document Checklist</h3>
            {detail.requiredDocuments.map((doc, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <p style={{ fontSize: '13px', fontWeight: '700' }}>• {doc.name}</p>
                <p style={{ fontSize: '11px', color: '#6c757d' }}>Category: {doc.type}</p>
              </div>
            ))}
            <button className="primary-btn" style={{ marginTop: '16px' }} onClick={() => setShowDocsModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
