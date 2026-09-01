import React, { useState } from 'react';
import {
  FileCheck,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  Download,
  Trash2,
  Eye,
  Plus,
  ShieldCheck,
  X
} from 'lucide-react';

export default function DatraDocLockerTab({ documents, onAddDocument, onDeleteDocument }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Income Proof');
  const [newDocCategory, setNewDocCategory] = useState('Income');
  const [newDocNumber, setNewDocNumber] = useState('');

  const categories = ['All', 'Identity', 'Income', 'Community', 'Address', 'Property', 'Education'];

  const filteredDocs = documents.filter(doc =>
    selectedCategory === 'All' || doc.category === selectedCategory
  );

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDocName) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      type: newDocType,
      category: newDocCategory,
      docNumber: newDocNumber || `DOC/2026/${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Verified', // SIH Auto verification simulation
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-12-31',
      fileSize: '1.4 MB',
      verifiedBy: 'State e-Seva Automated Verification Adapter',
      isPrivate: true
    };

    onAddDocument(newDoc);
    setShowUploadModal(false);
    setNewDocName('');
    setNewDocNumber('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span style={{ background: '#D1FAE5', color: '#059669', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle2 size={14} /> Verified
          </span>
        );
      case 'Pending Verification':
        return (
          <span style={{ background: '#FEF3C7', color: '#D97706', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={14} /> Pending Verification
          </span>
        );
      default:
        return (
          <span style={{ background: '#FEE2E2', color: '#DC2626', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertTriangle size={14} /> Action Required
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header & Controls */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>SECURE CITIZEN VAULT</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: '2px 0 0' }}>
              Document Locker & Verification Registry
            </h2>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            style={{
              background: 'linear-gradient(135deg, #673AB7, #512DA8)',
              border: 'none', borderRadius: 30, color: '#fff',
              padding: '10px 22px', fontSize: 13, fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 14px rgba(103, 58, 183, 0.3)'
            }}
          >
            <Plus size={18} /> Upload New Document
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px', borderRadius: 20, fontSize: 12, fontWeight: 800,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: selectedCategory === cat ? '#673AB7' : '#F3F4F6',
                color: selectedCategory === cat ? '#fff' : '#4B5563'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            style={{
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: 20, padding: 22, boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#4B5563', background: '#F3F4F6', padding: '3px 10px', borderRadius: 12 }}>
                  {doc.category}
                </span>
                {getStatusBadge(doc.status)}
              </div>

              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#1F2937', margin: '0 0 4px' }}>
                {doc.name}
              </h4>
              <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 12 }}>
                Ref #: <strong style={{ color: '#374151' }}>{doc.docNumber}</strong>
              </div>

              <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: '10px 12px', fontSize: 11, color: '#4B5563', display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                <div>🗓️ Uploaded: <strong>{doc.uploadDate}</strong></div>
                <div>⌛ Expiry: <strong>{doc.expiryDate}</strong></div>
                <div>🏛️ Verified by: <strong>{doc.verifiedBy}</strong></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F3F4F6', pt: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Lock size={12} color="#10B981" /> End-to-End Encrypted
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => alert(`Simulated document download for ${doc.name}`)}
                  style={{ background: '#EEF2FF', border: 'none', borderRadius: 8, padding: 8, color: '#4F46E5', cursor: 'pointer' }}
                  title="Download Document"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => onDeleteDocument(doc.id)}
                  style={{ background: '#FEE2E2', border: 'none', borderRadius: 8, padding: 8, color: '#DC2626', cursor: 'pointer' }}
                  title="Delete Document"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div
          onClick={() => setShowUploadModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <form
            onSubmit={handleUploadSubmit}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 24, maxWidth: 480, width: '100%',
              padding: 28, boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1F2937', margin: 0 }}>
                Upload Document to Locker
              </h3>
              <button type="button" onClick={() => setShowUploadModal(false)} style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer' }}>
                <X size={18} color="#4B5563" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                  Document Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caste & Community Certificate"
                  value={newDocName}
                  onChange={e => setNewDocName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: 13, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                  Category
                </label>
                <select
                  value={newDocCategory}
                  onChange={e => setNewDocCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: 13, outline: 'none' }}
                >
                  <option value="Identity">Identity Proof</option>
                  <option value="Income">Income Proof</option>
                  <option value="Community">Community Proof</option>
                  <option value="Address">Address Proof</option>
                  <option value="Property">Property / Land Deed</option>
                  <option value="Education">Education Marksheet</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                  Document / Certificate Ref Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. TN-COMM-2026-9981"
                  value={newDocNumber}
                  onChange={e => setNewDocNumber(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: 13, outline: 'none' }}
                />
              </div>

              {/* Upload Dropzone Box */}
              <div style={{
                border: '2px dashed #CBD5E1', borderRadius: 16, padding: 24,
                textAlign: 'center', background: '#F8FAFC', cursor: 'pointer'
              }}>
                <UploadCloud size={32} color="#673AB7" style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>
                  Click to select file or drag PDF / JPG
                </div>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>
                  Max 5MB • Encrypted via SIH Vault Security
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%', padding: '12px 0', marginTop: 20,
                background: 'linear-gradient(135deg, #673AB7, #512DA8)',
                border: 'none', borderRadius: 12, color: '#fff',
                fontSize: 14, fontWeight: 900, cursor: 'pointer'
              }}
            >
              Verify & Save to Locker →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
