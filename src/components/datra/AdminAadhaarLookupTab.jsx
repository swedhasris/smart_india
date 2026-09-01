import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  FileText, 
  Eye, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  UserCheck, 
  Sparkles,
  Building2,
  Calendar,
  Phone,
  Mail,
  Filter
} from 'lucide-react';
import { maskAadhaar } from '../../datraa/lib/crypto';

// Demo Registered Citizens for Administrator Verification
const REGISTERED_CITIZENS = [
  {
    aadhaar: 'XXXX-XXXX-1098',
    rawAadhaar: '123456781098',
    name: 'Swedha Sri',
    dob: '1995-05-20',
    gender: 'Female',
    phone: '+91 98765 43211',
    email: 'swedhasrisathish@gmail.com',
    address: 'Block C-12, Central Secretariat, New Delhi - 110001',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    documents: [
      { id: 'doc-101', name: 'Aadhaar_Card_Official.pdf', type: 'Aadhaar', number: 'XXXX-XXXX-1098', status: 'Verified', date: '2026-08-15', hash: '0x7f8a3b1c9d2e4f5a' },
      { id: 'doc-102', name: 'PAN_Card.pdf', type: 'PAN', number: 'ABCDE6789M', status: 'Verified', date: '2026-08-16', hash: '0x3b1c9d2e4f5a7f8a' },
      { id: 'doc-103', name: 'Degree_Certificate_IITD.pdf', type: 'Education', number: 'IITD-2022-CSE', status: 'Verified', date: '2026-08-20', hash: '0x9d2e4f5a7f8a3b1c' },
      { id: 'doc-104', name: 'Income_Certificate_FY25.pdf', type: 'Revenue', number: 'REV-2026-9812', status: 'Verified', date: '2026-08-22', hash: '0x4f5a7f8a3b1c9d2e' },
      { id: 'doc-105', name: 'Driving_License.pdf', type: 'Transport', number: 'DL-1420220019', status: 'Pending Approval', date: '2026-08-28', hash: '0x2e4f5a7f8a3b1c9d' }
    ]
  },
  {
    aadhaar: 'XXXX-XXXX-8921',
    rawAadhaar: '987654328921',
    name: 'Rajesh Sharma',
    dob: '1988-11-14',
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@example.gov.in',
    address: 'Sector 4, Chidambaram, Cuddalore, Tamil Nadu - 608001',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    documents: [
      { id: 'doc-201', name: 'Aadhaar_Card.pdf', type: 'Aadhaar', number: 'XXXX-XXXX-8921', status: 'Verified', date: '2026-07-10', hash: '0x1a2b3c4d5e6f7a8b' },
      { id: 'doc-202', name: 'Patta_Chitta_Document.pdf', type: 'Revenue', number: 'TN-REV-8871', status: 'Verified', date: '2026-07-12', hash: '0x5e6f7a8b1a2b3c4d' },
      { id: 'doc-203', name: 'Community_Certificate.pdf', type: 'Social Welfare', number: 'CW-2025-1029', status: 'Verified', date: '2026-07-15', hash: '0x8b1a2b3c4d5e6f7a' }
    ]
  }
];

export default function AdminAadhaarLookupTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCitizen, setSelectedCitizen] = useState(REGISTERED_CITIZENS[0]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = REGISTERED_CITIZENS.find(c => 
      c.aadhaar.toLowerCase().includes(query) ||
      c.rawAadhaar.includes(query) ||
      c.name.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedCitizen(found);
    } else {
      alert(`No citizen records found matching "${searchQuery}". Please enter a valid Aadhaar Number or Name.`);
    }
  };

  const handleApproveDoc = (docId) => {
    const updatedDocs = selectedCitizen.documents.map(d => 
      d.id === docId ? { ...d, status: 'Verified' } : d
    );
    setSelectedCitizen({ ...selectedCitizen, documents: updatedDocs });
    setActionSuccess('Document successfully verified on official government ledger!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: "'Inter', sans-serif" }}>
      {/* ── Search & Filter Bar ── */}
      <div style={{ background: '#FFFFFF', padding: '24px 32px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#673AB7', letterSpacing: 1, textTransform: 'uppercase', marginBottom: '4px' }}>
              ADMINISTRATOR VERIFICATION PORTAL
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1F2937', margin: 0 }}>
              Citizen DATRA Document Lookup
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0 0' }}>
              Enter a Citizen's Aadhaar Number to inspect, verify, and audit their linked government documents.
            </p>
          </div>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', minWidth: '360px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Enter Aadhaar No (e.g. 1098 or 8921)..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '14px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <button type="submit" style={{ padding: '12px 24px', background: '#673AB7', color: '#FFFFFF', borderRadius: '14px', fontWeight: 800, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(103, 58, 183, 0.3)' }}>
              Lookup
            </button>
          </form>
        </div>
      </div>

      {actionSuccess && (
        <div style={{ background: '#D1FAE5', border: '1px solid #10B981', color: '#065F46', padding: '14px 20px', borderRadius: '16px', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} color="#10B981" />
          {actionSuccess}
        </div>
      )}

      {/* ── Main Citizen Details & Documents ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Left Column: Citizen Identity Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <img 
                src={selectedCitizen.photo} 
                alt={selectedCitizen.name}
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #EDE9FE', boxShadow: '0 4px 14px rgba(103, 58, 183, 0.2)' }}
              />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1F2937', margin: 0 }}>{selectedCitizen.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span style={{ background: '#D1FAE5', color: '#059669', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px' }}>
                    Aadhaar Verified
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Aadhaar Number</p>
                <p style={{ fontSize: '16px', fontWeight: 900, color: '#673AB7', fontFamily: 'monospace', margin: '2px 0 0 0' }}>{selectedCitizen.aadhaar}</p>
              </div>

              <div>
                <p style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Date of Birth & Gender</p>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#374151', margin: '2px 0 0 0' }}>{selectedCitizen.dob} • {selectedCitizen.gender}</p>
              </div>

              <div>
                <p style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Mobile Contact</p>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#374151', margin: '2px 0 0 0' }}>{selectedCitizen.phone}</p>
              </div>

              <div>
                <p style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Email Address</p>
                <p style={{ fontSize: '13px', fontWeight: '800', color: '#374151', margin: '2px 0 0 0' }}>{selectedCitizen.email}</p>
              </div>

              <div>
                <p style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>Registered Address</p>
                <p style={{ fontSize: '12px', color: '#4B5563', margin: '2px 0 0 0', lineHeight: 1.4 }}>{selectedCitizen.address}</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #311B92 100%)', padding: '24px', borderRadius: '24px', color: '#FFFFFF', boxShadow: '0 8px 24px rgba(49, 27, 146, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={20} color="#A78BFA" />
              <h4 style={{ fontSize: '14px', fontWeight: 900, margin: 0 }}>Official Verification Security</h4>
            </div>
            <p style={{ fontSize: '12px', color: '#E0E7FF', margin: 0, lineHeight: 1.5 }}>
              All documents listed in DATRA are cryptographically signed and backed by government blockchain ledgers.
            </p>
          </div>
        </div>

        {/* Right Column: Citizen Document Repository */}
        <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937', margin: 0 }}>
                Linked Documents ({selectedCitizen.documents.length})
              </h3>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#673AB7', background: '#EDE9FE', padding: '4px 12px', borderRadius: '12px' }}>
                Aadhaar: {selectedCitizen.aadhaar}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedCitizen.documents.map((doc) => (
                <div key={doc.id} style={{ padding: '20px', background: '#F8F9FD', borderRadius: '18px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '46px', height: '46px', background: '#EDE9FE', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={22} color="#673AB7" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#1F2937', margin: 0 }}>{doc.name}</h4>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: doc.status === 'Verified' ? '#059669' : '#D97706', background: doc.status === 'Verified' ? '#D1FAE5' : '#FEF3C7', padding: '2px 8px', borderRadius: '8px' }}>
                          {doc.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                        Type: {doc.type} • Doc No: {doc.number} • Uploaded: {doc.date}
                      </p>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'monospace', margin: '2px 0 0 0' }}>
                        Ledger Hash: {doc.hash}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setSelectedDoc(doc)}
                      style={{ padding: '8px 16px', background: '#FFFFFF', color: '#673AB7', border: '1px solid #C7D2FE', borderRadius: '12px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Eye size={14} /> Inspect
                    </button>
                    {doc.status !== 'Verified' && (
                      <button 
                        onClick={() => handleApproveDoc(doc.id)}
                        style={{ padding: '8px 16px', background: '#059669', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)' }}
                      >
                        <CheckCircle2 size={14} /> Approve & Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inspect Document Preview Modal */}
      {selectedDoc && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', maxWidth: '600px', width: '100%', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} color="#673AB7" />
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937', margin: 0 }}>{selectedDoc.name}</h3>
              </div>
              <button onClick={() => setSelectedDoc(null)} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 900, cursor: 'pointer', color: '#6B7280' }}>✕</button>
            </div>

            <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div><span style={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>Citizen:</span> <strong style={{ color: '#1F2937' }}>{selectedCitizen.name} ({selectedCitizen.aadhaar})</strong></div>
              <div><span style={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>Document Type:</span> <strong style={{ color: '#1F2937' }}>{selectedDoc.type}</strong></div>
              <div><span style={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>Document Number:</span> <strong style={{ color: '#1F2937' }}>{selectedDoc.number}</strong></div>
              <div><span style={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>Blockchain Ledger Hash:</span> <code style={{ background: '#EDE9FE', padding: '2px 6px', borderRadius: '6px', color: '#673AB7', fontSize: '12px' }}>{selectedDoc.hash}</code></div>
              <div><span style={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>Verification Status:</span> <span style={{ color: '#059669', fontWeight: 800 }}>{selectedDoc.status}</span></div>
            </div>

            <div style={{ display: 'flex', justifyBetween: 'space-between', gap: '12px' }}>
              <button onClick={() => setSelectedDoc(null)} style={{ flex: 1, padding: '12px', background: '#F3F4F6', color: '#4B5563', borderRadius: '14px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>Close</button>
              <button onClick={() => { alert('Official verification certificate downloaded.'); setSelectedDoc(null); }} style={{ flex: 1, padding: '12px', background: '#673AB7', color: '#FFFFFF', borderRadius: '14px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>Download Audit PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
