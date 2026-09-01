import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Search, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  RefreshCw, 
  MessageSquare, 
  Send, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Eye,
  History,
  AlertTriangle
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/departmentsData';
import { db } from '../../datraa/lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, addDoc } from 'firebase/firestore';
import Department2FAVerificationModal from './Department2FAVerificationModal';

export default function DepartmentWorkspaceView({ 
  deptId = 'revenue', 
  adminUser = { id: 'ADMIN-102', name: 'Officer Rajesh Kumar', role: 'Revenue Officer', email: 'rajesh.kumar@gov.in' } 
}) {
  const department = DEPARTMENTS.find(d => d.id === deptId) || DEPARTMENTS[0];

  // Security & Authentication Context State
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState('updates'); // updates, queries, records, audit

  // Profile Update Requests State (from Firestore / localStorage)
  const [updateRequests, setUpdateRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Queries State (from Firestore)
  const [deptQueries, setDeptQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queryResponse, setQueryResponse] = useState('');
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionSummary, setResolutionSummary] = useState('');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');

  // Load Real-time Profile Updates & Department Queries from MySQL Server 8.0 (Sole Primary Database Engine)
  useEffect(() => {
    const fetchMySQLDeptData = () => {
      fetch('http://localhost:5000/api/profile-changes')
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.profileChanges)) {
            setUpdateRequests(data.profileChanges);
          }
        })
        .catch(err => console.warn("MySQL profile_changes fetch notice:", err));

      fetch(`http://localhost:5000/api/queries?departmentId=${deptId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.queries)) {
            setDeptQueries(data.queries);
          }
        })
        .catch(err => console.warn("MySQL queries fetch notice:", err));
    };

    fetchMySQLDeptData();
    const interval = setInterval(fetchMySQLDeptData, 3000);
    return () => clearInterval(interval);
  }, [deptId]);

  // Handle Successful 2FA OTP Authentication
  const handle2FASuccess = (token) => {
    setSessionToken(token);
    setIsVerified(true);
    setShowOtpModal(false);
  };

  // Handle Administrator Action on Profile Update Request
  const handleApproveUpdateRequest = () => {
    if (!selectedRequest) return;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const updatedDepts = (selectedRequest.affectedDepartments || []).map(d => {
      if (d.deptId === deptId) {
        return {
          ...d,
          updateStatus: 'APPROVED',
          lastUpdated: nowStr
        };
      }
      return d;
    });

    const allApproved = updatedDepts.every(d => d.updateStatus === 'APPROVED' || d.consentStatus === 'REJECTED');

    // Update Database Record
    try {
      if (selectedRequest.docId) {
        updateDoc(doc(db, "profile_changes", selectedRequest.docId), {
          status: allApproved ? 'COMPLETED' : 'PROCESSING_IN_PROGRESS',
          affectedDepartments: updatedDepts
        }).catch(err => console.warn("Database update error:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setShowConfirmModal(false);
    alert(`Success: ${selectedRequest.fieldLabel} update request approved and updated in ${department.name} Master Record.`);
  };

  // Handle Query Resolution
  const handleResolveQuery = () => {
    if (!selectedQuery || !resolutionSummary.trim()) {
      alert('Please enter a resolution summary.');
      return;
    }

    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const resolutionMsg = {
      id: `m-${Date.now()}`,
      sender: 'admin',
      senderName: `${adminUser.name} (${department.name} Officer)`,
      text: `QUERY RESOLVED: ${resolutionSummary}`,
      timestamp: nowStr
    };

    const updatedTimeline = [
      ...(selectedQuery.timeline || []),
      { status: 'RESOLVED', date: nowStr, actor: `${adminUser.name} (${department.name})` }
    ];

    try {
      if (selectedQuery.docId) {
        updateDoc(doc(db, "queries", selectedQuery.docId), {
          status: 'RESOLVED',
          lastUpdated: nowStr,
          messages: [...(selectedQuery.messages || []), resolutionMsg],
          timeline: updatedTimeline
        }).catch(err => console.warn("Database update error:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setShowResolveModal(false);
    setResolutionSummary('');
    alert(`Query ${selectedQuery.id} marked as RESOLVED. Citizen notified.`);
  };

  // ── 1. ENTRY SCREEN (VERIFICATION REQUIRED) ──
  if (!isVerified) {
    return (
      <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
        <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '28px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', textAlign: 'center' }}>
          
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#EDE9FE', color: '#673AB7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <Building2 size={32} />
          </div>

          <span style={{ fontSize: '11px', fontWeight: '800', background: '#F3E8FF', color: '#673AB7', padding: '4px 14px', borderRadius: '20px', letterSpacing: '0.5px' }}>
            RESTRICTED DEPARTMENT WORKSPACE
          </span>

          <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: '12px 0 6px 0' }}>
            {department.name} Workspace
          </h2>

          <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: 1.5 }}>
            Authorized access required for officer <strong>{adminUser.name}</strong> ({adminUser.role}). Second-factor hardware/OTP authentication is required before accessing sensitive citizen records.
          </p>

          <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '18px', border: '1px solid #E2E8F0', maxWidth: '440px', margin: '0 auto 28px auto', textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#334155', textTransform: 'uppercase', marginBottom: '8px' }}>SECURITY CONTEXT</div>
            <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Officer ID: <strong>{adminUser.id}</strong></div>
              <div>Department: <strong>{department.name}</strong></div>
              <div>Security Requirement: <strong>2FA OTP Verification</strong></div>
            </div>
          </div>

          <button
            onClick={() => setShowOtpModal(true)}
            style={{
              padding: '16px 36px', background: 'linear-gradient(135deg, #673AB7, #512DA8)',
              color: '#FFFFFF', borderRadius: '16px', fontWeight: '900', fontSize: '14px', border: 'none',
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(103,58,183,0.3)', display: 'inline-flex', alignItems: 'center', gap: '10px'
            }}
          >
            <Lock size={18} /> ENTER DEPARTMENT WORKSPACE
          </button>
        </div>

        {/* 2FA Modal */}
        {showOtpModal && (
          <Department2FAVerificationModal
            department={department}
            onVerifySuccess={handle2FASuccess}
            onClose={() => setShowOtpModal(false)}
          />
        )}
      </div>
    );
  }

  // ── 2. AUTHORIZED WORKSPACE VIEW ──
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      
      {/* Workspace Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #311B92 60%, #4A148C 100%)',
        borderRadius: '24px', padding: '28px 32px', color: '#FFFFFF',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px',
        boxShadow: '0 10px 30px rgba(49,27,146,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={28} color="#FFD700" />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', background: 'rgba(255,255,255,0.15)', color: '#FFD700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px', marginBottom: '6px' }}>
              <ShieldCheck size={14} /> 2FA SESSION VERIFIED: {sessionToken?.substring(0, 16)}...
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0, letterSpacing: '-0.3px' }}>{department.name} Operational Workspace</h2>
            <p style={{ fontSize: '13px', color: '#E0E7FF', margin: '4px 0 0 0', opacity: 0.9 }}>
              Officer: <strong>{adminUser.name}</strong> • Role: <strong>{adminUser.role}</strong>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px', borderRadius: '16px' }}>
          <button
            onClick={() => setActiveTab('updates')}
            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', background: activeTab === 'updates' ? '#FFD700' : 'transparent', color: activeTab === 'updates' ? '#1E1B4B' : '#E0E7FF' }}
          >
            Profile Update Requests ({updateRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('queries')}
            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', background: activeTab === 'queries' ? '#FFD700' : 'transparent', color: activeTab === 'queries' ? '#1E1B4B' : '#E0E7FF' }}
          >
            Citizen Queries ({deptQueries.length})
          </button>
        </div>
      </div>

      {/* ── PROFILE UPDATE REQUESTS TAB ── */}
      {activeTab === 'updates' && (
        <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={20} color="#673AB7" /> Pending Profile Update Verification Requests
          </h3>

          {updateRequests.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>No pending profile update requests for {department.name}.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {updateRequests.map(req => {
                const deptItem = (req.affectedDepartments || []).find(d => d.deptId === deptId) || {};
                return (
                  <div key={req.id} style={{ padding: '20px', background: '#F8FAFC', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#673AB7', fontFamily: 'monospace', background: '#F3E8FF', padding: '4px 10px', borderRadius: '8px' }}>
                          {req.id}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: '800', background: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '8px' }}>
                          Citizen Consent: APPROVED
                        </span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A' }}>{req.fieldLabel} Change Request</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                        Citizen: <strong>{req.userName}</strong> • Source: {req.source}
                      </div>
                      <div style={{ fontSize: '13px', color: '#334155', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ textDecoration: 'line-through', color: '#94A3B8' }}>{req.oldValue}</span>
                        <ArrowRight size={14} color="#673AB7" />
                        <strong style={{ color: '#16A34A' }}>{req.newValue}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => { setSelectedRequest(req); setShowConfirmModal(true); }}
                        style={{ padding: '10px 18px', background: '#16A34A', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <CheckCircle2 size={16} /> Approve & Update Record
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── CITIZEN QUERIES TAB ── */}
      {activeTab === 'queries' && (
        <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#673AB7" /> Citizen Queries Assigned to {department.name}
          </h3>

          {deptQueries.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>No queries found for {department.name}.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {deptQueries.map(q => (
                <div key={q.id} style={{ padding: '20px', background: '#F8FAFC', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '900', color: '#673AB7', fontFamily: 'monospace', background: '#F3E8FF', padding: '4px 10px', borderRadius: '8px' }}>
                        {q.id}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '800', background: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '8px' }}>
                        {q.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A' }}>{q.subject}</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Citizen: {q.userName} • Service: {q.serviceName}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => { setSelectedQuery(q); setShowResolveModal(true); }}
                      style={{ padding: '10px 18px', background: '#673AB7', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <CheckCircle2 size={16} /> Resolve Query
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── APPROVE UPDATE CONFIRMATION MODAL ── */}
      {showConfirmModal && selectedRequest && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>Confirm Department Record Update</h3>
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
              Are you sure you want to update this official {department.name} master record for citizen <strong>{selectedRequest.userName}</strong>?
            </p>

            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#334155', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Change ID: <strong>{selectedRequest.id}</strong></div>
              <div>Field: <strong>{selectedRequest.fieldLabel}</strong></div>
              <div>Original Value: <span style={{ textDecoration: 'line-through' }}>{selectedRequest.oldValue}</span></div>
              <div>New Authorized Value: <strong style={{ color: '#16A34A' }}>{selectedRequest.newValue}</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowConfirmModal(false)} style={{ padding: '10px 18px', background: '#F1F5F9', color: '#475569', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleApproveUpdateRequest} style={{ padding: '10px 18px', background: '#16A34A', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Confirm & Write to Database</button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESOLVE QUERY MODAL ── */}
      {showResolveModal && selectedQuery && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>Resolve Citizen Query ({selectedQuery.id})</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>Official Resolution Summary *</label>
              <textarea
                rows={3}
                placeholder="Describe how this query was resolved (e.g. Land record updated after verification)..."
                value={resolutionSummary}
                onChange={e => setResolutionSummary(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowResolveModal(false)} style={{ padding: '10px 18px', background: '#F1F5F9', color: '#475569', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleResolveQuery} style={{ padding: '10px 18px', background: '#673AB7', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Confirm Resolution</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
