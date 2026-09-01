import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  Building,
  CheckCircle2,
  FileText,
  HelpCircle,
  Sparkles,
  Lock,
  Layers
} from 'lucide-react';
import { SERVICE_DETAILS, DEPARTMENTS } from '../data/departmentsData';

export default function ServiceDetailView({
  serviceId = 'income-cert',
  departmentId = 'revenue',
  onBack,
  onApplyNow,
  onTrackApplication,
  onOpenDeptWorkspace
}) {
  const dept = DEPARTMENTS.find(d => d.id === departmentId) || DEPARTMENTS[0];
  const genericSrv = dept.services.find(s => s.id === serviceId) || dept.services[0];

  const detail = SERVICE_DETAILS[serviceId] || {
    id: genericSrv.id,
    departmentId: dept.id,
    departmentName: dept.name,
    name: genericSrv.name,
    icon: genericSrv.icon,
    overview: genericSrv.desc + ". This digital service is part of the state e-Governance initiative for paperless citizen assistance.",
    eligibility: [
      "Must be a permanent resident of the State",
      "Valid Identity proof (Aadhaar Card / Voter ID)",
      "Supporting revenue / tax documentation as applicable"
    ],
    requiredDocuments: [
      { name: "Aadhaar Card / Government Photo ID", type: "Identity Proof", mandatory: true },
      { name: "Proof of Address / Residence Certificate", type: "Address Proof", mandatory: true },
      { name: "Income / Revenue Proof Documents", type: "Income Statement", mandatory: true },
      { name: "Self-Declaration Affidavit", type: "Legal Statement", mandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Fill Application Form", desc: "Provide personal information and family details online." },
      { step: 2, title: "Upload Scanned Documents", desc: "Attach PDF or image copies of identity and address proofs." },
      { step: 3, title: "Verify & Submit", desc: "Review details and submit for official departmental verification." },
      { step: 4, title: "Department Verification", desc: "Designated officer validates submitted records electronically." },
      { step: 5, title: "Digital Certificate Issued", desc: "Download official digitally-signed certificate with QR code." }
    ]
  };

  return (
    <div className="service-detail-desktop-page">
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={onBack}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <ArrowLeft size={16} /> Back to {detail.departmentName}
        </button>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: '600' }}>{detail.departmentName}</span>
        <span style={{ color: '#9CA3AF' }}>/</span>
        <span style={{ color: '#673AB7', fontSize: '14px', fontWeight: '800' }}>{detail.name}</span>
      </div>

      {/* Main 2-Column Split Desktop Layout */}
      <div className="service-split-layout">
        {/* LEFT SIDE (60%): Service Information, Eligibility, Metadata */}
        <div>
          {/* Main Title & Overview Card */}
          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: '#F3E5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>
                {detail.icon}
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>
                  {detail.departmentName}
                </span>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '800', color: '#111827' }}>
                  {detail.name}
                </h1>
              </div>
            </div>

            {/* Quick Metadata Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', color: '#1D4ED8', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                <Clock size={14} /> Processing Time: 3–5 Working Days
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', color: '#047857', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                <ShieldCheck size={14} /> Service Type: G2C (Citizen Direct)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F3E5F5', color: '#673AB7', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                <Lock size={14} /> Aadhaar & Digilocker Integrated
              </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
              Description & Official Purpose
            </h3>
            <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6 }}>
              {detail.overview}
            </p>
          </div>

          {/* Eligibility Criteria Card */}
          <div className="content-card">
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} color="#673AB7" /> Eligibility Requirements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {detail.eligibility.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Application Process Card */}
          <div className="content-card">
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={20} color="#673AB7" /> Application Process Workflow
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {detail.applicationSteps.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#673AB7',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '13px',
                    flexShrink: 0
                  }}>
                    {s.step || idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111827' }}>{s.title}</h4>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (40%): Sticky Apply Card & Required Documents */}
        <div className="sticky-apply-sidebar">
          {/* Apply Online Action Card */}
          <div className="content-card" style={{ border: '2px solid rgba(103, 58, 183, 0.3)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
              Apply Online
            </h3>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
              Submit your request through the 5-step desktop application wizard.
            </p>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '16px', justifyContent: 'center' }}
              onClick={() => onApplyNow(detail)}
            >
              Apply Now <ArrowRight size={20} />
            </button>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={onTrackApplication}
                style={{ background: 'none', border: 'none', color: '#673AB7', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Already applied? Track existing application →
              </button>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
              <button
                className="btn-secondary"
                style={{ width: '100%', padding: '12px', fontSize: '13px', justifyContent: 'center', background: '#F3E8FF', color: '#673AB7', border: '1.5px solid #673AB7', fontWeight: '800', cursor: 'pointer' }}
                onClick={() => {
                  if (typeof onOpenDeptWorkspace === 'function') {
                    onOpenDeptWorkspace();
                  } else {
                    window.location.href = '/dept-workspace';
                  }
                }}
              >
                <Lock size={16} /> DO WORK (Department Staff Workspace)
              </button>
            </div>
          </div>

          {/* Required Documents Checklist Card */}
          <div className="content-card">
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#673AB7" /> Mandatory Documents
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {detail.requiredDocuments.map((doc, idx) => (
                <div key={idx} style={{
                  background: '#F8F9FD',
                  border: '1px solid #E5E7EB',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{doc.name}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{doc.type}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '800', background: '#ECFDF5', color: '#047857', padding: '3px 8px', borderRadius: '6px' }}>
                    Required
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
