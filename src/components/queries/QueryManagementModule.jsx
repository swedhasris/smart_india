import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  ListFilter, 
  Search, 
  FileText, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  Building2, 
  ChevronRight, 
  ArrowLeft,
  X,
  MessageSquare,
  History,
  RotateCcw,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/departmentsData';
import { db } from '../../datraa/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';

// Shared Storage Key for Queries between Citizen and Admin
const STORAGE_KEY = 'tetran_citizen_queries_v1';

// Initial Demo Queries
const INITIAL_QUERIES = [
  {
    id: 'QRY-2026-000123',
    userId: 'citizen-101',
    userName: 'Swedha Sri',
    userPhone: '+91 98765 43211',
    userEmail: 'swedhasrisathish@gmail.com',
    state: 'Tamil Nadu',
    district: 'Cuddalore',
    taluk: 'Chidambaram',
    departmentId: 'revenue',
    departmentName: 'Revenue Department',
    serviceId: 'income-cert',
    serviceName: 'Income Certificate',
    category: 'Application Delay',
    subject: 'Income certificate application pending for 15 days',
    description: 'I submitted my income certificate application on August 15. The status has been stuck at Revenue Inspector verification without updates.',
    priority: 'High',
    status: 'UNDER REVIEW',
    assignedAgent: 'Agent-102 (Revenue Officer)',
    submittedDate: '2026-08-16 10:30 AM',
    lastUpdated: '2026-08-30 04:15 PM',
    attachments: [
      { name: 'Acknowledgement_Receipt.pdf', size: '1.2 MB' }
    ],
    timeline: [
      { status: 'SUBMITTED', date: '2026-08-16 10:30 AM', actor: 'Citizen (Swedha Sri)' },
      { status: 'ASSIGNED', date: '2026-08-17 09:15 AM', actor: 'System (Automated Routing)' },
      { status: 'UNDER REVIEW', date: '2026-08-20 02:00 PM', actor: 'Officer Rajesh Kumar (Agent-102)' }
    ],
    messages: [
      { id: 'm1', sender: 'citizen', senderName: 'Swedha Sri', text: 'My application has been pending for 15 days. Kindly expedite verification.', timestamp: '2026-08-16 10:30 AM' },
      { id: 'm2', sender: 'admin', senderName: 'Officer Rajesh Kumar (Agent-102)', text: 'Your documents are currently under verification with the Village Administrative Officer.', timestamp: '2026-08-20 02:00 PM' }
    ]
  },
  {
    id: 'QRY-2026-000124',
    userId: 'citizen-101',
    userName: 'Swedha Sri',
    userPhone: '+91 98765 43211',
    userEmail: 'swedhasrisathish@gmail.com',
    state: 'Tamil Nadu',
    district: 'Cuddalore',
    taluk: 'Chidambaram',
    departmentId: 'education',
    departmentName: 'Education Department',
    serviceId: 'scholarships',
    serviceName: 'Scholarship Portal',
    category: 'General Inquiry',
    subject: 'Post-Matric Scholarship Disbursement Schedule',
    description: 'Wanted to inquire about the expected date for merit scholarship amount credit to linked bank account.',
    priority: 'Medium',
    status: 'RESOLVED',
    assignedAgent: 'Agent-305 (Education Dept)',
    submittedDate: '2026-08-10 11:00 AM',
    lastUpdated: '2026-08-25 03:30 PM',
    attachments: [],
    timeline: [
      { status: 'SUBMITTED', date: '2026-08-10 11:00 AM', actor: 'Citizen (Swedha Sri)' },
      { status: 'ASSIGNED', date: '2026-08-11 10:00 AM', actor: 'System' },
      { status: 'RESOLVED', date: '2026-08-25 03:30 PM', actor: 'Agent-305' }
    ],
    messages: [
      { id: 'm1', sender: 'citizen', senderName: 'Swedha Sri', text: 'When will the merit scholarship amount be credited?', timestamp: '2026-08-10 11:00 AM' },
      { id: 'm2', sender: 'admin', senderName: 'Education Helpdesk', text: 'Scholarship disbursement for FY26 starts on September 5 via DBT directly to your Aadhaar-seeded bank account.', timestamp: '2026-08-25 03:30 PM' }
    ]
  }
];

export default function QueryManagementModule({ 
  profile, 
  initialPrefill = null, 
  onClosePrefill = null 
}) {
  const [activeTab, setActiveTab] = useState('myqueries');
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_QUERIES;
  });

  // Selected Department & Service for wizard flow
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Form State
  const [category, setCategory] = useState('Application Delay');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [attachment, setAttachment] = useState(null);

  // Selected Query for Details & Chat Thread
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Filter & Search State for My Queries
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Follow up message state inside query details
  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState(null);

  // Save to localStorage whenever queries state updates
  useEffect(() => {
    if (queries && Array.isArray(queries)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
    }
  }, [queries]);

  const citizenUid = profile?.uid || 'citizen-101';

  // Real-time Database Polling & Fetching from MySQL Server 8.0 (Sole Database Engine)
  useEffect(() => {
    const fetchFromMySQL = () => {
      fetch(`http://localhost:5000/api/queries?userId=${citizenUid}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.queries)) {
            setQueries(prev => {
              const safePrev = Array.isArray(prev) ? prev : [];
              const merged = [...data.queries];
              safePrev.forEach(p => {
                if (p && p.id && !merged.some(m => m.id === p.id)) {
                  merged.push(p);
                }
              });
              return merged;
            });
          }
        })
        .catch(err => console.warn("MySQL database fetch notice:", err));
    };

    fetchFromMySQL();
    const interval = setInterval(fetchFromMySQL, 3000);
    return () => clearInterval(interval);
  }, [citizenUid]);

  // Handle Initial Prefill from TETRAN AI
  useEffect(() => {
    if (initialPrefill) {
      if (initialPrefill.departmentId) {
        const dept = DEPARTMENTS.find(d => d && (d.id === initialPrefill.departmentId || (d.name && d.name.toLowerCase().includes(initialPrefill.departmentId.toLowerCase()))));
        if (dept) {
          setSelectedDept(dept);
          if (initialPrefill.serviceId) {
            const srv = (dept.services || []).find(s => s && (s.id === initialPrefill.serviceId || (s.name && s.name.toLowerCase().includes(initialPrefill.serviceId.toLowerCase()))));
            if (srv) setSelectedService(srv);
          }
        }
      }
      if (initialPrefill.subject) {
        setSubject(initialPrefill.subject);
      }
      setActiveTab('raise');
    }
  }, [initialPrefill]);

  // Safe queries array
  const safeQueries = Array.isArray(queries) ? queries : [];

  // Filter citizen queries (strictly belonging to logged-in user)
  const myQueries = safeQueries.filter(q => q && q.userId === citizenUid);

  const filteredQueries = myQueries.filter(q => {
    if (!q) return false;
    const qId = q.id || '';
    const qSubject = q.subject || '';
    const qDept = q.departmentName || '';
    const qSrv = q.serviceName || '';
    const searchLower = (searchQuery || '').toLowerCase();

    const matchesSearch = 
      qId.toLowerCase().includes(searchLower) ||
      qSubject.toLowerCase().includes(searchLower) ||
      qDept.toLowerCase().includes(searchLower) ||
      qSrv.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Submit New Query
  const handleSubmitQuery = (e) => {
    e.preventDefault();
    if (!selectedDept || !selectedService || !subject.trim() || !description.trim()) {
      alert('Please select Department, Service, and enter Subject & Description.');
      return;
    }

    const newQueryId = `QRY-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const newQueryObj = {
      id: newQueryId,
      userId: citizenUid,
      userName: profile?.name || 'Swedha Sri',
      userPhone: profile?.phone || '+91 98765 43211',
      userEmail: profile?.email || 'swedhasrisathish@gmail.com',
      state: profile?.state || 'Tamil Nadu',
      stateId: profile?.stateId || 'TN',
      district: profile?.district || 'Thanjavur',
      districtId: profile?.districtId || 'thanjavur',
      taluk: profile?.taluk || 'Thanjavur Taluk',
      talukId: profile?.talukId || 'thanjavur-taluk',
      departmentId: selectedDept.id,
      departmentName: selectedDept.name,
      subDepartmentId: selectedDept.id,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      category,
      subject,
      description,
      priority,
      status: 'SUBMITTED',
      assignedAgent: 'Unassigned (Pending Routing)',
      submittedDate: nowStr,
      lastUpdated: nowStr,
      attachments: attachment ? [{ name: attachment.name, size: `${(attachment.size / 1024 / 1024).toFixed(1)} MB` }] : [],
      timeline: [
        { status: 'SUBMITTED', date: nowStr, actor: `Citizen (${profile?.name || 'Swedha Sri'})` }
      ],
      messages: [
        { id: `m-${Date.now()}`, sender: 'citizen', senderName: profile?.name || 'Swedha Sri', text: description, timestamp: nowStr }
      ]
    };

    // 1. Submit to MySQL Database
    try {
      fetch('http://localhost:5000/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQueryObj)
      }).then(res => res.json()).then(data => {
        console.log("Query saved to MySQL database:", data);
      }).catch(err => console.warn("MySQL API notice:", err));
    } catch (e) {
      console.warn("MySQL error:", e);
    }

    // 2. Submit to Firestore Database Backup
    try {
      addDoc(collection(db, "queries"), newQueryObj).catch(err => console.warn("Firestore insert notice:", err));
    } catch (err) {
      console.warn("Database insert fallback:", err);
    }

    // 2. Update local state & storage
    setQueries(prev => [newQueryObj, ...prev]);
    alert(`Query submitted successfully! Your Query ID is ${newQueryId}.`);

    // Reset Form
    setSubject('');
    setDescription('');
    setAttachment(null);
    setSelectedQuery(newQueryObj);
    setActiveTab('myqueries');

    if (onClosePrefill) onClosePrefill();
  };

  // Handle Citizen Send Reply / Additional Info
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() && !replyFile) return;

    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'citizen',
      senderName: profile?.name || 'Swedha Sri',
      text: replyText,
      timestamp: nowStr,
      attachmentName: replyFile ? replyFile.name : null
    };

    const nextStatus = selectedQuery.status === 'NEED MORE INFORMATION' ? 'UNDER REVIEW' : selectedQuery.status;

    const updatedQuery = {
      ...selectedQuery,
      status: nextStatus,
      lastUpdated: nowStr,
      messages: [...selectedQuery.messages, newMsg],
      timeline: selectedQuery.status === 'NEED MORE INFORMATION' ? [
        ...selectedQuery.timeline,
        { status: 'UNDER REVIEW', date: nowStr, actor: `Citizen provided required info` }
      ] : selectedQuery.timeline
    };

    // Update Database
    try {
      if (selectedQuery.docId) {
        updateDoc(doc(db, "queries", selectedQuery.docId), {
          status: nextStatus,
          lastUpdated: nowStr,
          messages: updatedQuery.messages,
          timeline: updatedQuery.timeline
        }).catch(err => console.warn("Database update error:", err));
      }
    } catch (e) {
      console.warn("Database update fallback:", e);
    }

    setQueries(prev => prev.map(q => q.id === selectedQuery.id ? updatedQuery : q));
    setSelectedQuery(updatedQuery);
    setReplyText('');
    setReplyFile(null);
  };

  // Handle Citizen Action: Confirm Resolution or Reopen Query
  const handleToggleResolution = (statusAction) => {
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const actionLabel = statusAction === 'CLOSED' ? 'Resolved & Confirmed by Citizen' : 'Reopened by Citizen';

    const updatedQuery = {
      ...selectedQuery,
      status: statusAction,
      lastUpdated: nowStr,
      timeline: [
        ...selectedQuery.timeline,
        { status: statusAction, date: nowStr, actor: actionLabel }
      ]
    };

    // Update Database
    try {
      if (selectedQuery.docId) {
        updateDoc(doc(db, "queries", selectedQuery.docId), {
          status: statusAction,
          lastUpdated: nowStr,
          timeline: updatedQuery.timeline
        }).catch(err => console.warn("Database status update error:", err));
      }
    } catch (e) {
      console.warn("Database status fallback:", e);
    }

    setQueries(prev => prev.map(q => q.id === selectedQuery.id ? updatedQuery : q));
    setSelectedQuery(updatedQuery);
    alert(`Query status updated to ${statusAction}.`);
  };

  const getStatusColor = (st) => {
    switch (st) {
      case 'SUBMITTED': return { bg: '#EFF6FF', text: '#2563EB' };
      case 'ASSIGNED': return { bg: '#F0FDF4', text: '#16A34A' };
      case 'UNDER REVIEW': return { bg: '#FEF3C7', text: '#D97706' };
      case 'NEED MORE INFORMATION': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'IN PROGRESS': return { bg: '#EDE9FE', text: '#673AB7' };
      case 'RESOLVED': return { bg: '#D1FAE5', text: '#059669' };
      case 'CLOSED': return { bg: '#F3F4F6', text: '#4B5563' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* ── Top Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Citizen Query Management</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Raise issues, track department resolution progress, and communicate directly with authorized officials.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { setSelectedQuery(null); setActiveTab('myqueries'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
              background: activeTab === 'myqueries' && !selectedQuery ? '#003366' : '#FFFFFF',
              color: activeTab === 'myqueries' && !selectedQuery ? '#FFFFFF' : '#374151',
              borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: '1px solid #E5E7EB', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <ListFilter size={16} /> My Queries ({myQueries.length})
          </button>

          <button
            onClick={() => { setSelectedQuery(null); setActiveTab('raise'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
              background: activeTab === 'raise' ? '#003366' : '#2563EB',
              color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
            }}
          >
            <PlusCircle size={16} /> Raise New Query
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT VIEW ── */}

      {/* 1. QUERY DETAILS & CONVERSATION VIEW */}
      {selectedQuery ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button 
            onClick={() => setSelectedQuery(null)} 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#2563EB', fontWeight: '800', fontSize: '13px', cursor: 'pointer', width: 'fit-content' }}
          >
            <ArrowLeft size={16} /> Back to My Queries List
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Left: Query Metadata & Timeline Stepper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '28px', border: '1px solid #F3F4F6', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#003366', fontFamily: 'monospace', background: '#EFF6FF', padding: '4px 12px', borderRadius: '10px' }}>
                    {selectedQuery.id}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '900', color: getStatusColor(selectedQuery.status).text, background: getStatusColor(selectedQuery.status).bg, padding: '4px 12px', borderRadius: '12px' }}>
                    {selectedQuery.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '0 0 8px 0' }}>{selectedQuery.subject}</h3>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 16px 0' }}>
                  Department: <strong style={{ color: '#111827' }}>{selectedQuery.departmentName}</strong> • Service: <strong style={{ color: '#111827' }}>{selectedQuery.serviceName}</strong>
                </p>

                <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '16px', border: '1px solid #F3F4F6', fontSize: '13px', color: '#374151', lineHeight: 1.5, marginBottom: '20px' }}>
                  {selectedQuery.description}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: '#6B7280' }}>
                  <div><strong>Category:</strong> {selectedQuery.category}</div>
                  <div><strong>Priority:</strong> {selectedQuery.priority}</div>
                  <div><strong>Assigned Officer:</strong> {selectedQuery.assignedAgent}</div>
                  <div><strong>Submitted On:</strong> {selectedQuery.submittedDate}</div>
                  <div><strong>Location Scope:</strong> {selectedQuery.taluk}, {selectedQuery.district}, {selectedQuery.state}</div>
                </div>

                {/* Resolution Action Buttons for Citizen */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {selectedQuery.status !== 'CLOSED' ? (
                    <button
                      onClick={() => handleToggleResolution('CLOSED')}
                      style={{ padding: '10px 18px', background: '#16A34A', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <CheckCircle2 size={16} /> Confirm Resolution
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleResolution('UNDER REVIEW')}
                      style={{ padding: '10px 18px', background: '#DC2626', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <RotateCcw size={16} /> Reopen Query
                    </button>
                  )}
                </div>
              </div>

              {/* Timeline Progress Stepper */}
              <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '28px', border: '1px solid #F3F4F6', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#111827', margin: '0 0 20px 0' }}>Status History Timeline</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(selectedQuery.timeline || []).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px', flexShrink: 0 }}>
                        {idx + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#111827' }}>{item.status}</div>
                        <div style={{ fontSize: '11px', color: '#6B7280', margin: '2px 0 0 0' }}>By {item.actor} • {item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Communication Conversation */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '28px', border: '1px solid #F3F4F6', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', height: '620px' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessageSquare size={20} color="#003366" />
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#111827', margin: 0 }}>Official Conversation Thread</h3>
                </div>
                <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '700' }}>Linked to Query ID</span>
              </div>

              {/* Messages Container */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }} className="custom-scrollbar">
                {(selectedQuery.messages || []).map((m) => {
                  const isCitizen = m.sender === 'citizen';
                  return (
                    <div key={m.id} style={{ alignSelf: isCitizen ? 'flex-end' : 'flex-start', maxWidth: '85%', display: 'flex', flexDirection: 'column', alignItems: isCitizen ? 'flex-end' : 'flex-start' }}>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '700', marginBottom: '4px' }}>
                        {m.senderName} • {m.timestamp}
                      </div>
                      <div style={{
                        background: isCitizen ? '#003366' : '#F3F4F6',
                        color: isCitizen ? '#FFFFFF' : '#111827',
                        padding: '14px 18px',
                        borderRadius: '18px',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}>
                        {m.text}
                        {m.attachmentName && (
                          <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Paperclip size={12} /> {m.attachmentName}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Citizen Reply Input */}
              <form onSubmit={handleSendReply} style={{ paddingTop: '16px', borderTop: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedQuery.status === 'NEED MORE INFORMATION' && (
                  <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '8px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
                    ⚠️ Officer requested additional information. Please reply below and attach required documents.
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Type your message or response to the officer..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    style={{ flex: 1, padding: '12px 18px', borderRadius: '14px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                  />
                  <button type="submit" style={{ padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Send size={16} /> Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : activeTab === 'raise' ? (
        /* 2. RAISE NEW QUERY WIZARD FORM */
        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 24px 0' }}>Raise a New Government Service Query</h3>

          {/* Department & Sub-department Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '28px' }}>
            {/* Step A: Select Department */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>1. Select Government Department *</label>
              <select
                value={selectedDept?.id || ''}
                onChange={e => {
                  const dept = DEPARTMENTS.find(d => d.id === e.target.value);
                  setSelectedDept(dept || null);
                  setSelectedService(null);
                }}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', background: '#FFFFFF', fontWeight: '700' }}
              >
                <option value="">-- Choose Department --</option>
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Step B: Select Sub-department / Service */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>2. Select Sub-Department / Service *</label>
              <select
                disabled={!selectedDept}
                value={selectedService?.id || ''}
                onChange={e => {
                  const srv = selectedDept?.services.find(s => s.id === e.target.value);
                  setSelectedService(srv || null);
                }}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', background: !selectedDept ? '#F3F4F6' : '#FFFFFF', fontWeight: '700' }}
              >
                <option value="">-- Choose Service --</option>
                {selectedDept?.services.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmitQuery} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>Query Category *</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', background: '#FFFFFF', fontWeight: '700' }}
                >
                  <option value="Application Delay">Application Delay</option>
                  <option value="Document Verification Error">Document Verification Error</option>
                  <option value="Technical & Portal Issue">Technical & Portal Issue</option>
                  <option value="Payment / Fee Discrepancy">Payment / Fee Discrepancy</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>Priority Level</label>
                <select 
                  value={priority} 
                  onChange={e => setPriority(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', background: '#FFFFFF', fontWeight: '700' }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High (Urgent)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>Query Subject *</label>
              <input 
                type="text" 
                placeholder="Brief summary of your inquiry or issue..." 
                value={subject} 
                onChange={e => setSubject(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>Detailed Query Description *</label>
              <textarea 
                placeholder="Explain your problem clearly. Mention application numbers, dates, or specific issues..." 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                rows={4}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', resize: 'none' }}
              />
            </div>

            {/* File Upload */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#374151', display: 'block', marginBottom: '8px' }}>Supporting Attachment (Optional)</label>
              <input 
                type="file" 
                onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)}
                style={{ fontSize: '12px', color: '#6B7280' }}
              />
            </div>

            {/* Submit Action */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button 
                type="button" 
                onClick={() => setActiveTab('myqueries')}
                style={{ padding: '12px 24px', background: '#F3F4F6', color: '#374151', borderRadius: '14px', fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{ padding: '12px 28px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,51,102,0.25)' }}
              >
                Submit Query
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* 3. MY QUERIES LIST VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search & Filter Bar */}
          <div style={{ background: '#FFFFFF', padding: '20px 28px', borderRadius: '24px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '280px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search by Query ID, subject, or department..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['ALL', 'SUBMITTED', 'UNDER REVIEW', 'NEED MORE INFORMATION', 'RESOLVED'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '8px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', border: 'none', cursor: 'pointer',
                    background: statusFilter === st ? '#003366' : '#F3F4F6',
                    color: statusFilter === st ? '#FFFFFF' : '#4B5563'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Queries List */}
          {filteredQueries.length === 0 ? (
            <div style={{ background: '#FFFFFF', padding: '48px', borderRadius: '28px', border: '1px solid #F3F4F6', textAlign: 'center', color: '#6B7280' }}>
              <HelpCircle size={42} color="#9CA3AF" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#111827', margin: 0 }}>No Queries Found</h4>
              <p style={{ fontSize: '13px', margin: '4px 0 16px 0' }}>You haven't submitted any queries matching your filter criteria.</p>
              <button 
                onClick={() => setActiveTab('raise')}
                style={{ padding: '10px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer' }}
              >
                Raise a Query Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredQueries.map(q => {
                const badge = getStatusColor(q.status);
                return (
                  <div 
                    key={q.id}
                    onClick={() => setSelectedQuery(q)}
                    style={{
                      background: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'all 0.2s ease',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Building2 size={24} color="#003366" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '900', color: '#003366', fontFamily: 'monospace' }}>{q.id}</span>
                          <span style={{ fontSize: '10px', fontWeight: '900', color: badge.text, background: badge.bg, padding: '2px 8px', borderRadius: '8px' }}>
                            {q.status}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#111827', margin: 0 }}>{q.subject}</h4>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>
                          {q.departmentName} • {q.serviceName} • Submitted: {q.submittedDate}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        View Details <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
