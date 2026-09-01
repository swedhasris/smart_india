import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Key,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { INITIAL_DATRA_CONSENTS, INITIAL_DATRA_AUDIT_LOGS } from './datraServiceAdapters';

export default function DatraActivityConsentTab({ applications, documents }) {
  const [consents, setConsents] = useState(INITIAL_DATRA_CONSENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_DATRA_AUDIT_LOGS);
  const [activeSubTab, setActiveSubTab] = useState('activity'); // 'activity' | 'consent' | 'audit'

  const handleRevokeConsent = (id) => {
    setConsents(consents.map(c => c.id === id ? { ...c, status: 'Revoked' } : c));
    const newLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      action: 'Consent Revoked',
      details: `Revoked data sharing permission for ${consents.find(c => c.id === id)?.department}`,
      ip: '157.48.92.12',
      severity: 'Warning'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleApproveConsent = (id) => {
    setConsents(consents.map(c => c.id === id ? { ...c, status: 'Approved', grantedDate: new Date().toISOString().split('T')[0] } : c));
    const newLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      action: 'Consent Granted',
      details: `Granted data sharing permission for ${consents.find(c => c.id === id)?.department}`,
      ip: '157.48.92.12',
      severity: 'Success'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header with Sub-tabs */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>PRIVACY & GOVERNANCE LEDGER</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: '2px 0 0' }}>
              Unified Activity, Consent Ledger & Security Audit Logs
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { id: 'activity', label: '⚡ Unified Activity Timeline' },
            { id: 'consent', label: '🔒 Active Data Sharing Consents' },
            { id: 'audit', label: '🛡️ Security Audit Logs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '10px 20px', borderRadius: 30, fontSize: 13, fontWeight: 800,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: activeSubTab === tab.id ? '#673AB7' : '#F3F4F6',
                color: activeSubTab === tab.id ? '#fff' : '#4B5563'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sub-tab 1: Unified Activity Timeline ── */}
      {activeSubTab === 'activity' && (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1F2937', margin: '0 0 16px' }}>
            Chronological Citizen Activity Stream
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {applications.map(app => (
              <div key={app.id} style={{
                background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ background: '#EDE9FE', color: '#673AB7', padding: 10, borderRadius: 12 }}>
                    <Activity size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#1F2937' }}>
                      Application Submitted: {app.serviceName}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>
                      Ref #: {app.id} • Dept: {app.departmentName}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700 }}>
                  {app.submittedDate || 'Today'}
                </div>
              </div>
            ))}

            {documents.map(doc => (
              <div key={doc.id} style={{
                background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 14, padding: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ background: '#D1FAE5', color: '#059669', padding: 10, borderRadius: 12 }}>
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#1F2937' }}>
                      Document Verified: {doc.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>
                      Ref #: {doc.docNumber} • Verified by: {doc.verifiedBy}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700 }}>
                  {doc.uploadDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Sub-tab 2: Consent Management Ledger ── */}
      {activeSubTab === 'consent' && (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1F2937', margin: '0 0 16px' }}>
            Data Sharing Permissions & Department Consent Ledger
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {consents.map(cst => (
              <div key={cst.id} style={{
                border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, background: '#F9FAFB',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', background: '#EDE9FE', padding: '3px 10px', borderRadius: 12 }}>
                      {cst.department}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 12,
                      background: cst.status === 'Approved' ? '#D1FAE5' : cst.status === 'Revoked' ? '#FEE2E2' : '#FEF3C7',
                      color: cst.status === 'Approved' ? '#059669' : cst.status === 'Revoked' ? '#DC2626' : '#D97706'
                    }}>
                      {cst.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1F2937', margin: '0 0 6px' }}>
                    {cst.purpose}
                  </h4>

                  <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 12 }}>
                    <strong>Shared Data Attributes:</strong> {cst.sharedData.join(', ')}
                  </div>
                </div>

                <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 12, padding: 10, margin: '8px 0', fontSize: 11 }}>
                  <div><strong>Requesting Dept:</strong> {cst.department || 'Education Department'}</div>
                  <div><strong>Receiving Dept:</strong> {cst.receivingDept || 'Revenue Department'}</div>
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 12, marginTop: 10, display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => handleApproveConsent(cst.id)}
                    style={{
                      flex: 1, padding: '8px 0',
                      background: cst.status === 'Approved' ? '#059669' : '#673AB7',
                      border: 'none', borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 900, cursor: 'pointer'
                    }}
                  >
                    {cst.status === 'Approved' ? '✓ ALLOWED' : 'ALLOW'}
                  </button>
                  <button
                    onClick={() => handleRevokeConsent(cst.id)}
                    style={{
                      flex: 1, padding: '8px 0',
                      background: cst.status === 'Revoked' ? '#DC2626' : '#F3F4F6',
                      border: '1px solid #D1D5DB', borderRadius: 10,
                      color: cst.status === 'Revoked' ? '#fff' : '#374151', fontSize: 12, fontWeight: 900, cursor: 'pointer'
                    }}
                  >
                    {cst.status === 'Revoked' ? '✕ DENIED' : 'DENY'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Sub-tab 3: Security Audit Log ── */}
      {activeSubTab === 'audit' && (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1F2937', margin: '0 0 16px' }}>
            Immutable Security & Privacy Audit Trail
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {auditLogs.map(log => (
              <div key={log.id} style={{
                background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#1F2937', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={16} color="#673AB7" /> {log.action}
                  </div>
                  <div style={{ color: '#4B5563', marginTop: 2 }}>{log.details}</div>
                </div>
                <div style={{ textAlign: 'right', color: '#9CA3AF', fontSize: 11 }}>
                  <div>{log.timestamp}</div>
                  <div style={{ fontFamily: 'monospace' }}>IP: {log.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
