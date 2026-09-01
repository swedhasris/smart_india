import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  ArrowLeft,
  Building2,
  Paperclip,
  RotateCcw
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/departmentsData';
import { db } from '../../datraa/lib/firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const STORAGE_KEY = 'tetran_citizen_queries_v1';

export default function AdminQueryManagementView() {
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [talukFilter, setTalukFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Admin reply inputs
  const [adminMessage, setAdminMessage] = useState('');
  const [agentAssignment, setAgentAssignment] = useState('Agent-102 (Revenue Officer)');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  }, [queries]);

  // Sync real-time from MySQL Database (Sole Primary Database Engine)
  useEffect(() => {
    const fetchMySQLQueries = () => {
      fetch('http://localhost:5000/api/queries')
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
        .catch(err => console.warn("MySQL fetch notice:", err));
    };

    fetchMySQLQueries();
    const interval = setInterval(fetchMySQLQueries, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter queries for Admin Scope
  const filteredQueries = queries.filter(q => {
    const matchesSearch = 
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = departmentFilter === 'ALL' || q.departmentId === departmentFilter;
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    const matchesTaluk = talukFilter === 'ALL' || (q.taluk && q.taluk.toLowerCase().includes(talukFilter.toLowerCase())) || (q.talukId && q.talukId === talukFilter);

    return matchesSearch && matchesDept && matchesStatus && matchesTaluk;
  });

  // Handle Admin Send Response
  const handleAdminResponse = (e) => {
    e.preventDefault();
    if (!adminMessage.trim() || !selectedQuery) return;

    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'admin',
      senderName: 'Officer Rajesh Kumar (Admin)',
      text: adminMessage,
      timestamp: nowStr
    };

    const updatedQuery = {
      ...selectedQuery,
      lastUpdated: nowStr,
      messages: [...selectedQuery.messages, newMsg]
    };

    // Update Database
    try {
      if (selectedQuery.docId) {
        updateDoc(doc(db, "queries", selectedQuery.docId), {
          lastUpdated: nowStr,
          messages: updatedQuery.messages
        }).catch(err => console.warn("Database update notice:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setQueries(prev => prev.map(q => q.id === selectedQuery.id ? updatedQuery : q));
    setSelectedQuery(updatedQuery);
    setAdminMessage('');
    alert('Response sent to citizen successfully.');
  };

  // Handle Status Update from Admin
  const handleStatusChange = (newStatus) => {
    if (!selectedQuery) return;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const updatedQuery = {
      ...selectedQuery,
      status: newStatus,
      lastUpdated: nowStr,
      timeline: [
        ...selectedQuery.timeline,
        { status: newStatus, date: nowStr, actor: 'Officer Rajesh Kumar (Admin)' }
      ]
    };

    // Update Database
    try {
      if (selectedQuery.docId) {
        updateDoc(doc(db, "queries", selectedQuery.docId), {
          status: newStatus,
          lastUpdated: nowStr,
          timeline: updatedQuery.timeline
        }).catch(err => console.warn("Database status update notice:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setQueries(prev => prev.map(q => q.id === selectedQuery.id ? updatedQuery : q));
    setSelectedQuery(updatedQuery);
    alert(`Query status updated to ${newStatus}.`);
  };

  // Handle Agent Assignment
  const handleAssignAgent = (e) => {
    e.preventDefault();
    if (!selectedQuery) return;
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const nextStatus = selectedQuery.status === 'SUBMITTED' ? 'ASSIGNED' : selectedQuery.status;

    const updatedQuery = {
      ...selectedQuery,
      status: nextStatus,
      assignedAgent: agentAssignment,
      lastUpdated: nowStr,
      timeline: [
        ...selectedQuery.timeline,
        { status: 'ASSIGNED', date: nowStr, actor: `Assigned to ${agentAssignment}` }
      ]
    };

    // Update Database
    try {
      if (selectedQuery.docId) {
        updateDoc(doc(db, "queries", selectedQuery.docId), {
          status: nextStatus,
          assignedAgent: agentAssignment,
          lastUpdated: nowStr,
          timeline: updatedQuery.timeline
        }).catch(err => console.warn("Database assignment update notice:", err));
      }
    } catch (e) {
      console.warn("Database error:", e);
    }

    setQueries(prev => prev.map(q => q.id === selectedQuery.id ? updatedQuery : q));
    setSelectedQuery(updatedQuery);
    alert(`Query assigned to ${agentAssignment}.`);
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
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: "'Inter', sans-serif" }}>
      {/* ── Top Header ── */}
      <div style={{ background: '#FFFFFF', padding: '24px 32px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#673AB7', letterSpacing: 1, textTransform: 'uppercase', marginBottom: '4px' }}>
              OFFICIAL GOVERNMENT QUERY INBOX
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1F2937', margin: 0 }}>
              Administrator Query Management
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0 0' }}>
              Review, assign, and resolve citizen grievances and inquiries across all government departments.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: '#F8F9FD', padding: '10px 16px', borderRadius: '14px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#6B7280', fontWeight: 800 }}>TOTAL QUERIES</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937' }}>{queries.length}</div>
            </div>
            <div style={{ background: '#FEF3C7', padding: '10px 16px', borderRadius: '14px', border: '1px solid #FCD34D', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#B45309', fontWeight: 800 }}>UNDER REVIEW</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#B45309' }}>
                {queries.filter(q => q.status === 'UNDER REVIEW' || q.status === 'SUBMITTED').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      {selectedQuery ? (
        /* DETAIL & RESPONSE VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button 
            onClick={() => setSelectedQuery(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#673AB7', fontWeight: 800, fontSize: '13px', cursor: 'pointer', width: 'fit-content' }}
          >
            <ArrowLeft size={16} /> Back to Query Inbox
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Left Column: Query Summary & Officer Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#673AB7', fontFamily: 'monospace', background: '#EDE9FE', padding: '4px 12px', borderRadius: '10px' }}>
                    {selectedQuery.id}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: getStatusColor(selectedQuery.status).text, background: getStatusColor(selectedQuery.status).bg, padding: '4px 12px', borderRadius: '12px' }}>
                    {selectedQuery.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937', margin: '0 0 12px 0' }}>{selectedQuery.subject}</h3>

                {/* Citizen Details */}
                <div style={{ padding: '16px', background: '#F8F9FD', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '6px' }}>CITIZEN INFORMATION</div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#1F2937' }}>{selectedQuery.userName}</div>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>Phone: {selectedQuery.userPhone} • Email: {selectedQuery.userEmail}</div>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>Scope: {selectedQuery.taluk}, {selectedQuery.district}, {selectedQuery.state}</div>
                </div>

                {/* Query Body */}
                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5, marginBottom: '20px' }}>
                  <strong>Description:</strong><br />
                  {selectedQuery.description}
                </div>

                {/* Officer Status Control Panel */}
                <div style={{ paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#673AB7', textTransform: 'uppercase', marginBottom: '10px' }}>
                    ADMINISTRATOR STATUS CONTROLS
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleStatusChange('UNDER REVIEW')}
                      style={{ padding: '8px 14px', background: '#FEF3C7', color: '#D97706', border: '1px solid #FCD34D', borderRadius: '10px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Set Under Review
                    </button>
                    <button 
                      onClick={() => handleStatusChange('NEED MORE INFORMATION')}
                      style={{ padding: '8px 14px', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '10px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Request Info
                    </button>
                    <button 
                      onClick={() => handleStatusChange('RESOLVED')}
                      style={{ padding: '8px 14px', background: '#D1FAE5', color: '#059669', border: '1px solid #6EE7B7', borderRadius: '10px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>

              {/* Agent Assignment Form */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#1F2937', margin: '0 0 12px 0' }}>Assign to Department Agent</h4>
                <form onSubmit={handleAssignAgent} style={{ display: 'flex', gap: '10px' }}>
                  <select
                    value={agentAssignment}
                    onChange={e => setAgentAssignment(e.target.value)}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '12px', fontWeight: 700 }}
                  >
                    <option value="Agent-102 (Revenue Officer)">Agent-102 (Revenue Officer)</option>
                    <option value="Agent-204 (Police Inspector)">Agent-204 (Police Inspector)</option>
                    <option value="Agent-305 (Education Specialist)">Agent-305 (Education Specialist)</option>
                    <option value="Agent-401 (Health Officer)">Agent-401 (Health Officer)</option>
                  </select>
                  <button type="submit" style={{ padding: '10px 18px', background: '#673AB7', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                    Assign
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Communication Conversation Thread */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', height: '620px' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={20} color="#673AB7" />
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1F2937', margin: 0 }}>Communication Thread</h3>
              </div>

              {/* Messages Feed */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedQuery.messages.map((m) => {
                  const isAdmin = m.sender === 'admin';
                  return (
                    <div key={m.id} style={{ alignSelf: isAdmin ? 'flex-end' : 'flex-start', maxWidth: '85%', display: 'flex', flexDirection: 'column', alignItems: isAdmin ? 'flex-end' : 'flex-start' }}>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 800, marginBottom: '4px' }}>
                        {m.senderName} • {m.timestamp}
                      </div>
                      <div style={{
                        background: isAdmin ? '#673AB7' : '#F3F4F6',
                        color: isAdmin ? '#FFFFFF' : '#1F2937',
                        padding: '14px 18px',
                        borderRadius: '18px',
                        fontSize: '13px',
                        lineHeight: 1.5
                      }}>
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Response Box */}
              <form onSubmit={handleAdminResponse} style={{ paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Write response or request information from citizen..."
                  value={adminMessage}
                  onChange={e => setAdminMessage(e.target.value)}
                  style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none' }}
                />
                <button type="submit" style={{ padding: '12px 20px', background: '#673AB7', color: '#FFFFFF', borderRadius: '14px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={16} /> Reply
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* INBOX LIST VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Filters Bar */}
          <div style={{ background: '#FFFFFF', padding: '20px 28px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search queries by ID, citizen name, or topic..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={e => setDepartmentFilter(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '12px', fontWeight: 700, outline: 'none', background: '#FFFFFF' }}
              >
                <option value="ALL">All Departments</option>
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              {/* Taluk / Location Filter */}
              <select
                value={talukFilter}
                onChange={e => setTalukFilter(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '12px', fontWeight: 700, outline: 'none', background: '#FFFFFF' }}
              >
                <option value="ALL">All Taluks & Locations</option>
                <option value="Thanjavur">Thanjavur Taluk</option>
                <option value="Chidambaram">Chidambaram Taluk</option>
                <option value="Cuddalore">Cuddalore Taluk</option>
                <option value="Kumbakonam">Kumbakonam Taluk</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '12px', fontWeight: 700, outline: 'none', background: '#FFFFFF' }}
              >
                <option value="ALL">All Statuses</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER REVIEW">Under Review</option>
                <option value="NEED MORE INFORMATION">Need More Info</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          {/* Query Table List */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8F9FD', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px 24px' }}>Query ID</th>
                  <th style={{ padding: '16px 24px' }}>Citizen Name</th>
                  <th style={{ padding: '16px 24px' }}>Department & Service</th>
                  <th style={{ padding: '16px 24px' }}>Subject</th>
                  <th style={{ padding: '16px 24px' }}>Status</th>
                  <th style={{ padding: '16px 24px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>
                      No queries match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredQueries.map(q => {
                    const badge = getStatusColor(q.status);
                    return (
                      <tr key={q.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '16px 24px', fontWeight: 900, color: '#673AB7', fontFamily: 'monospace' }}>
                          {q.id}
                        </td>
                        <td style={{ padding: '16px 24px', fontWeight: 800, color: '#1F2937' }}>
                          {q.userName}
                          <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>{q.userPhone}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#374151' }}>
                          <strong style={{ color: '#1F2937' }}>{q.departmentName}</strong>
                          <div style={{ fontSize: '11px', color: '#6B7280' }}>{q.serviceName}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#1F2937', fontWeight: 700 }}>
                          {q.subject}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 900, color: badge.text, background: badge.bg, padding: '4px 10px', borderRadius: '8px' }}>
                            {q.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <button
                            onClick={() => setSelectedQuery(q)}
                            style={{ padding: '8px 14px', background: '#EDE9FE', color: '#673AB7', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            Review & Reply <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
