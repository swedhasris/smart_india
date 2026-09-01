import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, QrCode, FileText, Bookmark, Bell, HelpCircle, Globe, LogOut, Edit3, ShieldCheck, Check } from 'lucide-react';

export default function AccountProfile({ user, onLogout, onNavigateToApplications }) {
  const [activeSubTab, setActiveSubTab] = useState('profile'); // 'profile' | 'documents' | 'saved'
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Rajesh Sharma',
    mobile: user?.mobile || '+91 98765 43210',
    email: user?.email || 'rajesh.sharma@example.gov.in',
    address: '14, Temple Street, Mylapore',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600004',
    aadhaar: 'XXXX-XXXX-8921'
  });

  const languages = ['English', 'हिंदी (Hindi)', 'தமிழ் (Tamil)', 'తెలుగు (Telugu)', 'मराठी (Marathi)', 'বাংলা (Bengali)'];

  const userDocuments = [
    { name: 'Aadhaar Card Smart Verification', id: 'DOC-AADHAAR-8921', date: '2026-01-15', status: 'Verified' },
    { name: 'Income Certificate 2026', id: 'DOC-INC-2026-99', date: '2026-08-24', status: 'Active' },
    { name: 'Driving Licence Smartcard', id: 'DOC-DL-99412', date: '2025-11-10', status: 'Verified' }
  ];

  const savedServices = [
    { name: 'Income Certificate', dept: 'Revenue Department', icon: '💰' },
    { name: 'Patta Services', dept: 'Revenue Department', icon: '📜' },
    { name: 'Driving Licence', dept: 'Transport Department', icon: '🪪' }
  ];

  return (
    <div className="account-profile-page">
      {/* Header */}
      <div className="section-header">
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#673AB7', textTransform: 'uppercase' }}>
            Citizen Profile
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e' }}>
            My Account
          </h1>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: '#ffebee',
            color: '#c62828',
            border: 'none',
            borderRadius: '12px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* Citizen Digital Smartcard Preview */}
      <div style={{
        background: 'linear-gradient(135deg, #4A148C 0%, #673AB7 60%, #7C4DFF 100%)',
        color: 'white',
        borderRadius: '24px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 12px 30px rgba(103, 58, 183, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', tracking: '1px', background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '8px', fontWeight: '800' }}>
              Official Citizen ID
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: '6px' }}>
              {profileData.name}
            </h2>
            <p style={{ fontSize: '12px', opacity: 0.9 }}>
              Aadhaar: {profileData.aadhaar}
            </p>
          </div>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'white',
            borderRadius: '12px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <QrCode size={52} color="#4A148C" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '12px', fontSize: '11px' }}>
          <div>
            <span style={{ opacity: 0.8 }}>Mobile:</span> <strong>{profileData.mobile}</strong>
          </div>
          <div>
            <span style={{ opacity: 0.8 }}>District:</span> <strong>{profileData.district}</strong>
          </div>
        </div>
      </div>

      {/* Profile Sub-Tabs */}
      <div style={{
        display: 'flex',
        background: 'white',
        borderRadius: '16px',
        padding: '4px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        {[
          { id: 'profile', label: 'Details' },
          { id: 'documents', label: 'Document Vault' },
          { id: 'saved', label: 'Saved Services' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              background: activeSubTab === t.id ? '#673AB7' : 'transparent',
              color: activeSubTab === t.id ? 'white' : '#6c757d',
              transition: 'all 0.2s ease'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: DETAILS */}
      {activeSubTab === 'profile' && (
        <div className="detail-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a2e' }}>Personal Information</h3>
            <button
              onClick={() => setShowEditModal(true)}
              style={{ background: 'none', border: 'none', color: '#673AB7', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Edit3 size={14} /> Edit
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563' }}>
              <User size={18} color="#673AB7" />
              <span>Full Name: <strong>{profileData.name}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563' }}>
              <Phone size={18} color="#673AB7" />
              <span>Mobile: <strong>{profileData.mobile}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563' }}>
              <Mail size={18} color="#673AB7" />
              <span>Email: <strong>{profileData.email}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563' }}>
              <MapPin size={18} color="#673AB7" />
              <span>Address: <strong>{profileData.address}, {profileData.district}, {profileData.state} - {profileData.pincode}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DOCUMENT VAULT */}
      {activeSubTab === 'documents' && (
        <div className="detail-card">
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a2e', marginBottom: '14px' }}>
            Verified Digital Document Vault
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {userDocuments.map((doc, idx) => (
              <div key={idx} style={{
                background: '#F4F5FA',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText color="#673AB7" size={20} />
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{doc.name}</p>
                    <p style={{ fontSize: '11px', color: '#6c757d' }}>{doc.id} • Verified {doc.date}</p>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '8px' }}>
                  ✓ {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SAVED SERVICES */}
      {activeSubTab === 'saved' && (
        <div className="detail-card">
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a2e', marginBottom: '14px' }}>
            Saved & Bookmark Services
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedServices.map((s, idx) => (
              <div key={idx} style={{
                background: '#F4F5FA',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{s.icon}</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{s.name}</p>
                    <p style={{ fontSize: '11px', color: '#6c757d' }}>{s.dept}</p>
                  </div>
                </div>
                <Bookmark size={18} color="#673AB7" fill="#673AB7" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences & Portal Settings Options */}
      <div className="detail-card">
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a2e', marginBottom: '14px' }}>
          Portal Settings & Preferences
        </h3>

        {/* Language Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={16} color="#673AB7" /> Select Preferred Portal Language
          </label>
          <select
            className="form-control"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang, idx) => (
              <option key={idx} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Help & Support */}
        <button
          className="secondary-btn"
          style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '10px' }}
          onClick={() => alert('Government Helpline Support: 1800-11-2026 (Toll-Free, 24x7)')}
        >
          <HelpCircle size={18} /> Helpline & Toll-Free Support (1800-11-2026)
        </button>

        {/* My Applications Shortcut */}
        <button
          className="secondary-btn"
          style={{ width: '100%', justifyContent: 'flex-start' }}
          onClick={onNavigateToApplications}
        >
          <FileText size={18} /> View All My Submitted Applications
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Edit Citizen Profile</h3>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                value={profileData.mobile}
                onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">District</label>
              <input
                type="text"
                className="form-control"
                value={profileData.district}
                onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
              />
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                setShowEditModal(false);
                alert('Profile updated successfully!');
              }}
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
