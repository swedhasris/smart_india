import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  AlertCircle,
  X,
  Lock
} from 'lucide-react';

export default function DatraSmartApplyModal({ scheme, user, locationContext, onClose, onSubmitSuccess }) {
  const [agreeConsent, setAgreeConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const stateName    = locationContext?.state || 'Tamil Nadu';
  const districtName = locationContext?.district || 'Cuddalore';
  const talukName    = locationContext?.taluk || 'Chidambaram';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeConsent) {
      alert('Consent approval is required to share verified documents with the government department.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const appId = `APP-2026-DATRA-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp = {
        id: appId,
        serviceId: scheme?.id || 'smart-scheme',
        serviceName: scheme?.title || 'Government Welfare Scheme',
        departmentId: scheme?.deptId || 'revenue',
        departmentName: scheme?.department || 'Revenue & Social Welfare',
        applicantName: user?.name || 'Rajesh Sharma',
        aadhaar: user?.aadhaar || 'XXXX-XXXX-8921',
        mobile: user?.mobile || '+91 98765 43210',
        location: `${talukName} Taluk, ${districtName}, ${stateName}`,
        submittedDate: new Date().toISOString().split('T')[0],
        status: 'Submitted',
        currentStep: 1,
        totalSteps: 4,
        statusMessage: 'Application submitted successfully via DATRA Smart Pre-fill. Pending officer verification.',
        history: [
          { date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), title: 'Submitted', desc: `Smart Application ${appId} submitted with consent.` }
        ]
      };

      setSubmitting(false);
      onSubmitSuccess(newApp);
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(17, 24, 39, 0.75)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24, maxWidth: 580, width: '100%',
          maxHeight: '90vh', overflowY: 'auto', padding: 32,
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)', fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#EDE9FE', padding: 10, borderRadius: 14, color: '#673AB7' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>DATRA SMART APPLICATION</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1F2937', margin: 0 }}>
                {scheme?.title}
              </h3>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer' }}>
            <X size={18} color="#4B5563" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Department badge */}
          <div style={{ background: '#F3F4F6', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Building2 size={16} color="#673AB7" />
            <span>Department: <strong>{scheme?.department}</strong></span>
          </div>

          {/* Auto Pre-filled Citizen Info */}
          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 0.5, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} /> AUTO PRE-FILLED FROM AUTHENTICATED PROFILE
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 12 }}>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: 10 }}>Applicant Name</span>
                <strong style={{ color: '#1F2937' }}>{user?.name || 'Rajesh Sharma'}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: 10 }}>Aadhaar Number</span>
                <strong style={{ color: '#1F2937' }}>{user?.aadhaar || 'XXXX-XXXX-8921'}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: 10 }}>Mobile Number</span>
                <strong style={{ color: '#1F2937' }}>{user?.mobile || '+91 98765 43210'}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: 10 }}>Local Jurisdiction</span>
                <strong style={{ color: '#1F2937' }}>{talukName}, {districtName}</strong>
              </div>
            </div>
          </div>

          {/* Auto-Attached Verified Documents */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#374151', letterSpacing: 0.5, marginBottom: 8 }}>
              AUTO-ATTACHED VAULT DOCUMENTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {scheme?.requiredDocs?.map((doc, idx) => (
                <div key={idx} style={{
                  background: '#F9FAFB', border: '1px solid #E5E7EB',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12
                }}>
                  <span style={{ fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={15} color="#673AB7" /> {doc}
                  </span>
                  <span style={{ color: '#059669', fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={14} /> Attached from Locker
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit User Consent Confirmation */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#D97706', letterSpacing: 0.5, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Lock size={15} /> MANDATORY CONSENT CONFIRMATION
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                checked={agreeConsent}
                onChange={e => setAgreeConsent(e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <span>
                I hereby grant explicit digital consent to share my verified Aadhaar profile, Income Certificate, and location context with <strong>{scheme?.department}</strong> solely for processing this application.
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1, padding: '12px 0', background: '#F3F4F6',
                border: 'none', borderRadius: 12, color: '#4B5563',
                fontSize: 13, fontWeight: 800, cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                flex: 2, padding: '12px 0',
                background: 'linear-gradient(135deg, #673AB7, #512DA8)',
                border: 'none', borderRadius: 12, color: '#fff',
                fontSize: 14, fontWeight: 900, cursor: 'pointer',
                opacity: submitting ? 0.7 : 1
              }}
            >
              {submitting ? 'Submitting Application…' : 'Confirm & Submit Application →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
