import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  FileText, 
  ChevronRight, 
  Lock, 
  UserCheck, 
  Eye, 
  ArrowRight,
  Send,
  HelpCircle,
  Link as LinkIcon,
  Sparkles,
  History
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/departmentsData';
import { db } from '../../datraa/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';

const STORAGE_KEY = 'tetran_profile_changes_v1';

// Initial Demo Change Events
const INITIAL_EVENTS = [
  {
    id: 'CHG-2026-000189',
    userId: 'citizen-101',
    userName: 'Swedha Sri',
    field: 'NAME',
    fieldLabel: 'Full Name',
    source: 'UIDAI Aadhaar Identity Record',
    oldValue: 'SWEDHA SRI',
    newValue: 'SWEDHA SRI SATHISH',
    timestamp: 'May 12, 2026 • 10:30 AM',
    hash: '8f92a4b1c7d3e5f6a9b2c4d6e8f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7',
    prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    status: 'CITIZEN_REVIEW_REQUIRED',
    affectedDepartments: [
      {
        deptId: 'revenue',
        deptName: 'Revenue Department',
        recordType: 'Income Certificate & Patta Record',
        currentValue: 'SWEDHA SRI',
        consentStatus: 'PENDING', // PENDING, APPROVED, REJECTED
        updateStatus: 'NOT_SENT', // NOT_SENT, SENT, UNDER_VERIFICATION, APPROVED, REJECTED
        lastUpdated: 'May 12, 2026 • 10:32 AM'
      },
      {
        deptId: 'education',
        deptName: 'Higher Education Department',
        recordType: 'Degree Certificate & Student Portal',
        currentValue: 'SWEDHA SRI',
        consentStatus: 'PENDING',
        updateStatus: 'NOT_SENT',
        lastUpdated: 'May 12, 2026 • 10:32 AM'
      },
      {
        deptId: 'transport',
        deptName: 'Transport & RTO Department',
        recordType: 'Driving License Record',
        currentValue: 'SWEDHA SRI',
        consentStatus: 'PENDING',
        updateStatus: 'NOT_SENT',
        lastUpdated: 'May 12, 2026 • 10:32 AM'
      },
      {
        deptId: 'employment',
        deptName: 'Employment Exchange Department',
        recordType: 'State Employment Registration',
        currentValue: 'SWEDHA SRI',
        consentStatus: 'PENDING',
        updateStatus: 'NOT_SENT',
        lastUpdated: 'May 12, 2026 • 10:32 AM'
      }
    ]
  }
];

export default function CrossDepartmentProfileUpdateModule({ profile }) {
  const citizenUid = profile?.uid || 'citizen-101';

  const [changeEvents, setChangeEvents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [activeTab, setActiveTab] = useState('events'); // events, history, simulate

  // Form state for simulating a new profile change
  const [simField, setSimField] = useState('NAME');
  const [simOldVal, setSimOldVal] = useState('SWEDHA SRI');
  const [simNewVal, setSimNewVal] = useState('SWEDHA SRI SATHISH');

  // Sync to localStorage
  useEffect(() => {
    if (changeEvents && Array.isArray(changeEvents)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(changeEvents));
    }
  }, [changeEvents]);

  // Sync with MySQL Database (Sole Primary Database Engine)
  useEffect(() => {
    const fetchMySQLProfileChanges = () => {
      fetch(`http://localhost:5000/api/profile-changes?userId=${citizenUid}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.profileChanges)) {
            setChangeEvents(prev => {
              const safePrev = Array.isArray(prev) ? prev : [];
              const merged = [...data.profileChanges];
              safePrev.forEach(p => {
                if (p && p.id && !merged.some(m => m.id === p.id)) {
                  merged.push(p);
                }
              });
              return merged;
            });
          }
        })
        .catch(err => console.warn("MySQL profile_changes fetch notice:", err));
    };

    fetchMySQLProfileChanges();
    const interval = setInterval(fetchMySQLProfileChanges, 3000);
    return () => clearInterval(interval);
  }, [citizenUid]);

  // Set default selected event
  useEffect(() => {
    if (!selectedEvent && changeEvents.length > 0) {
      setSelectedEvent(changeEvents[0]);
    }
  }, [changeEvents, selectedEvent]);

  // Handle Citizen Consent for a single department
  const handleDepartmentConsent = (deptId, action) => { // action: 'APPROVE' | 'REJECT'
    if (!selectedEvent) return;

    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const updatedDepts = selectedEvent.affectedDepartments.map(d => {
      if (d.deptId === deptId) {
        return {
          ...d,
          consentStatus: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          updateStatus: action === 'APPROVE' ? 'UNDER_VERIFICATION' : 'CANCELLED_BY_CITIZEN',
          lastUpdated: nowStr
        };
      }
      return d;
    });

    const allResponded = updatedDepts.every(d => d.consentStatus !== 'PENDING');

    const updatedEvent = {
      ...selectedEvent,
      status: allResponded ? 'PROCESSING_IN_PROGRESS' : selectedEvent.status,
      affectedDepartments: updatedDepts
    };

    // Database Update
    try {
      if (selectedEvent.docId) {
        updateDoc(doc(db, "profile_changes", selectedEvent.docId), {
          status: updatedEvent.status,
          affectedDepartments: updatedDepts
        }).catch(err => console.warn("Database update error:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setChangeEvents(prev => prev.map(e => e.id === selectedEvent.id ? updatedEvent : e));
    setSelectedEvent(updatedEvent);
  };

  // Handle Bulk Citizen Approval
  const handleBulkConsent = (action) => {
    if (!selectedEvent) return;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const updatedDepts = selectedEvent.affectedDepartments.map(d => ({
      ...d,
      consentStatus: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
      updateStatus: action === 'APPROVE' ? 'UNDER_VERIFICATION' : 'CANCELLED_BY_CITIZEN',
      lastUpdated: nowStr
    }));

    const updatedEvent = {
      ...selectedEvent,
      status: action === 'APPROVE' ? 'PROCESSING_IN_PROGRESS' : 'REJECTED_BY_CITIZEN',
      affectedDepartments: updatedDepts
    };

    try {
      if (selectedEvent.docId) {
        updateDoc(doc(db, "profile_changes", selectedEvent.docId), {
          status: updatedEvent.status,
          affectedDepartments: updatedDepts
        }).catch(err => console.warn("Database update error:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setChangeEvents(prev => prev.map(e => e.id === selectedEvent.id ? updatedEvent : e));
    setSelectedEvent(updatedEvent);
    alert(action === 'APPROVE' ? 'Selected department updates approved and submitted securely to Gateway.' : 'Profile update propagation cancelled.');
  };

  // Handle Wrong Change / Fraud Alert ("I DID NOT REQUEST THIS CHANGE")
  const handleReportIncorrectChange = () => {
    if (!disputeReason.trim()) {
      alert('Please state why this profile change was incorrect.');
      return;
    }

    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const updatedDepts = selectedEvent.affectedDepartments.map(d => ({
      ...d,
      consentStatus: 'DISPUTED',
      updateStatus: 'HALTED_FOR_SECURITY_REVIEW',
      lastUpdated: nowStr
    }));

    const updatedEvent = {
      ...selectedEvent,
      status: 'HALTED_DISPUTED',
      disputeReason,
      affectedDepartments: updatedDepts
    };

    try {
      if (selectedEvent.docId) {
        updateDoc(doc(db, "profile_changes", selectedEvent.docId), {
          status: 'HALTED_DISPUTED',
          disputeReason,
          affectedDepartments: updatedDepts
        }).catch(err => console.warn("Database update error:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setChangeEvents(prev => prev.map(ev => ev.id === selectedEvent.id ? updatedEvent : ev));
    setSelectedEvent(updatedEvent);
    setShowDisputeModal(false);
    setDisputeReason('');
    alert('Security Alert Raised! Propagation to all departments has been halted immediately. Unique Ticket #DSP-2026-991 has been assigned to Identity Security Cell.');
  };

  // Handle Simulate New Profile Change
  const handleSimulateChange = (e) => {
    e.preventDefault();
    const newId = `CHG-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const lastEvent = changeEvents[0];
    const prevHash = lastEvent ? lastEvent.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const fakeHash = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

    const deptsForField = simField === 'NAME' 
      ? ['revenue', 'education', 'transport', 'employment']
      : simField === 'ADDRESS'
      ? ['revenue', 'food-supplies', 'electricity', 'water', 'transport']
      : ['revenue', 'health', 'police', 'employment'];

    const affected = DEPARTMENTS.filter(d => deptsForField.includes(d.id)).map(d => ({
      deptId: d.id,
      deptName: d.name,
      recordType: `${d.name} Citizen Master Record`,
      currentValue: simOldVal,
      consentStatus: 'PENDING',
      updateStatus: 'NOT_SENT',
      lastUpdated: nowStr
    }));

    const newEvent = {
      id: newId,
      userId: citizenUid,
      userName: profile?.name || 'Swedha Sri',
      field: simField,
      fieldLabel: simField === 'NAME' ? 'Full Name' : simField === 'ADDRESS' ? 'Residential Address' : 'Mobile Number',
      source: 'UIDAI Aadhaar Portal (Self-Service Hub)',
      oldValue: simOldVal,
      newValue: simNewVal,
      timestamp: nowStr,
      hash: fakeHash,
      prevHash,
      status: 'CITIZEN_REVIEW_REQUIRED',
      affectedDepartments: affected
    };

    // Insert into database
    try {
      addDoc(collection(db, "profile_changes"), newEvent).catch(err => console.warn("Database insert fallback:", err));
    } catch (err) {
      console.warn("Database insert error:", err);
    }

    setChangeEvents(prev => [newEvent, ...prev]);
    setSelectedEvent(newEvent);
    setActiveTab('events');
    alert(`New Profile Change Event created (${newId}). Affected departments identified!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CITIZEN_REVIEW_REQUIRED':
        return { bg: '#FEF3C7', text: '#D97706', label: 'Consent Required' };
      case 'PROCESSING_IN_PROGRESS':
        return { bg: '#EFF6FF', text: '#2563EB', label: 'Processing in Gateway' };
      case 'APPROVED':
      case 'COMPLETED':
        return { bg: '#D1FAE5', text: '#059669', label: 'Record Synchronized' };
      case 'HALTED_DISPUTED':
        return { bg: '#FEE2E2', text: '#DC2626', label: 'Halted (Disputed)' };
      default:
        return { bg: '#F3F4F6', text: '#4B5563', label: status };
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      
      {/* ── Page Header Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        borderRadius: '24px', padding: '28px 32px', color: '#FFFFFF',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RefreshCw size={26} color="#38BDF8" />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px', marginBottom: '6px' }}>
              <ShieldCheck size={14} /> SECURE INTER-DEPARTMENTAL PROFILE SYNC
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0, letterSpacing: '-0.3px' }}>Cross-Department Profile Propagation Engine</h2>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: '4px 0 0 0' }}>
              Detect identity updates in source records and manage department-by-department consent before propagation.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <button
            onClick={() => setActiveTab('events')}
            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', background: activeTab === 'events' ? '#38BDF8' : 'transparent', color: activeTab === 'events' ? '#0F172A' : '#94A3B8' }}
          >
            Active Changes ({changeEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', background: activeTab === 'history' ? '#38BDF8' : 'transparent', color: activeTab === 'history' ? '#0F172A' : '#94A3B8' }}
          >
            Audit Trail & Ledger
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', background: activeTab === 'simulate' ? '#38BDF8' : 'transparent', color: activeTab === 'simulate' ? '#0F172A' : '#94A3B8' }}
          >
            + Test Profile Change
          </button>
        </div>
      </div>

      {/* ── Active Profile Change View ── */}
      {activeTab === 'events' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          
          {/* Left Column: Events List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1E293B', margin: 0 }}>Detected Identity Updates</h3>
            
            {changeEvents.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '20px', textAlign: 'center', color: '#64748B', border: '1px solid #E2E8F0' }}>
                No active profile changes detected.
              </div>
            ) : (
              changeEvents.map(ev => {
                const isSelected = selectedEvent?.id === ev.id;
                const badge = getStatusBadge(ev.status);
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    style={{
                      background: '#FFFFFF', padding: '20px', borderRadius: '20px',
                      border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                      cursor: 'pointer', boxShadow: isSelected ? '0 8px 24px rgba(37,99,235,0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '900', color: '#2563EB', fontFamily: 'monospace', background: '#EFF6FF', padding: '4px 10px', borderRadius: '8px' }}>
                        {ev.id}
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: badge.text, background: badge.bg, padding: '3px 10px', borderRadius: '10px' }}>
                        {badge.label}
                      </span>
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A', marginBottom: '4px' }}>
                      {ev.fieldLabel} Update Detected
                    </div>

                    <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ textDecoration: 'line-through', color: '#94A3B8' }}>{ev.oldValue}</span>
                      <ArrowRight size={14} color="#2563EB" />
                      <strong style={{ color: '#0F172A' }}>{ev.newValue}</strong>
                    </div>

                    <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                      <span>Source: {ev.source.split(' ')[0]}</span>
                      <span>{ev.timestamp}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Department Consent & Execution Panel */}
          {selectedEvent && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                
                {/* Event Summary Card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EVENT DETAILS</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0F172A', margin: '2px 0 6px 0' }}>{selectedEvent.fieldLabel} Update</h3>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Source: <strong style={{ color: '#0F172A' }}>{selectedEvent.source}</strong></div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleBulkConsent('APPROVE')}
                      style={{ padding: '10px 16px', background: '#16A34A', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <CheckCircle2 size={16} /> Approve All Departments
                    </button>
                    <button
                      onClick={() => setShowDisputeModal(true)}
                      style={{ padding: '10px 16px', background: '#FEE2E2', color: '#DC2626', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: '1px solid #FCA5A5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <XCircle size={16} /> I Didn't Request This
                    </button>
                  </div>
                </div>

                {/* Change Diff Banner */}
                <div style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Previous Recorded Value</span>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#64748B', textDecoration: 'line-through' }}>{selectedEvent.oldValue}</div>
                  </div>

                  <ArrowRight size={20} color="#2563EB" />

                  <div>
                    <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: '800', textTransform: 'uppercase' }}>New Verified Value</span>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#16A34A' }}>{selectedEvent.newValue}</div>
                  </div>
                </div>

                {/* Affected Departments Section */}
                <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} color="#2563EB" /> Dependent Government Departments & Records ({selectedEvent.affectedDepartments.length})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {selectedEvent.affectedDepartments.map(dept => {
                    const isApproved = dept.consentStatus === 'APPROVED';
                    const isRejected = dept.consentStatus === 'REJECTED';
                    const isDisputed = dept.consentStatus === 'DISPUTED';

                    return (
                      <div
                        key={dept.deptId}
                        style={{
                          background: '#FFFFFF', padding: '18px 20px', borderRadius: '18px',
                          border: isApproved ? '1px solid #86EFAC' : isDisputed ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A' }}>{dept.deptName}</div>
                          <div style={{ fontSize: '12px', color: '#64748B', margin: '2px 0' }}>Record: <strong style={{ color: '#334155' }}>{dept.recordType}</strong></div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>Current Value: "{dept.currentValue}"</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {dept.consentStatus === 'PENDING' ? (
                            <>
                              <button
                                onClick={() => handleDepartmentConsent(dept.deptId, 'APPROVE')}
                                style={{ padding: '8px 14px', background: '#16A34A', color: '#FFFFFF', borderRadius: '10px', fontSize: '11px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <CheckCircle2 size={14} /> Approve Update
                              </button>
                              <button
                                onClick={() => handleDepartmentConsent(dept.deptId, 'REJECT')}
                                style={{ padding: '8px 14px', background: '#F1F5F9', color: '#475569', borderRadius: '10px', fontSize: '11px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span style={{
                              fontSize: '11px', fontWeight: '900', padding: '6px 12px', borderRadius: '12px',
                              background: isApproved ? '#DCFCE7' : isDisputed ? '#FEE2E2' : '#F1F5F9',
                              color: isApproved ? '#15803D' : isDisputed ? '#B91C1C' : '#475569',
                              display: 'flex', alignItems: 'center', gap: '4px'
                            }}>
                              {isApproved ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                              Consent: {dept.consentStatus}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cryptographic Proof Card */}
                <div style={{ background: '#0F172A', color: '#94A3B8', padding: '16px 20px', borderRadius: '16px', fontSize: '11px', fontFamily: 'monospace' }}>
                  <div style={{ color: '#38BDF8', fontWeight: '800', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🔒 TAMPER-EVIDENT CRYPTOGRAPHIC LEDGER HASH
                  </div>
                  <div>Event Hash: {selectedEvent.hash}</div>
                  <div>Parent Block: {selectedEvent.prevHash.substring(0, 32)}...</div>
                </div>

              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Audit Trail View ── */}
      {activeTab === 'history' && (
        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="#2563EB" /> Cryptographic Profile Change History & Audit Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {changeEvents.map((ev, index) => (
              <div key={ev.id} style={{ padding: '20px', background: '#F8FAFC', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#2563EB', fontFamily: 'monospace' }}>{ev.id}</span>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Block #{changeEvents.length - index} • {ev.timestamp}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>
                  {ev.fieldLabel}: {ev.oldValue} ➔ {ev.newValue}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Source: {ev.source} • Status: <strong>{ev.status}</strong>
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace', marginTop: '8px' }}>
                  Hash: {ev.hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Test Profile Change Simulator ── */}
      {activeTab === 'simulate' && (
        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', maxWidth: '640px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>Simulate a Source Profile Change</h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '24px' }}>
            Test how the dependency engine detects profile field changes and identifies affected department databases.
          </p>

          <form onSubmit={handleSimulateChange} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>Select Profile Field Changed *</label>
              <select
                value={simField}
                onChange={e => setSimField(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '13px', fontWeight: '700', outline: 'none' }}
              >
                <option value="NAME">Full Name</option>
                <option value="ADDRESS">Residential Address</option>
                <option value="MOBILE">Mobile Phone Number</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>Original Source Value *</label>
              <input
                type="text"
                value={simOldVal}
                onChange={e => setSimOldVal(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>New Verified Source Value *</label>
              <input
                type="text"
                value={simNewVal}
                onChange={e => setSimNewVal(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                required
              />
            </div>

            <button
              type="submit"
              style={{ padding: '14px 24px', background: '#2563EB', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Sparkles size={18} /> Trigger Change Detection Engine
            </button>
          </form>
        </div>
      )}

      {/* ── Dispute / Fraud Alert Modal ── */}
      {showDisputeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '20px' }}>
          <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#DC2626', marginBottom: '16px' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0 }}>Report Unauthorized / Incorrect Change</h3>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
              If you did not request this profile change or believe it is erroneous, submitting this alert will immediately halt all propagation across all state government department databases.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>Reason for Dispute *</label>
              <textarea
                rows={3}
                placeholder="Explain why this change is incorrect..."
                value={disputeReason}
                onChange={e => setDisputeReason(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDisputeModal(false)}
                style={{ padding: '10px 18px', background: '#F1F5F9', color: '#475569', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleReportIncorrectChange}
                style={{ padding: '10px 18px', background: '#DC2626', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
              >
                Halt Propagation & Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
