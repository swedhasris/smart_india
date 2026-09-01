import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  QrCode,
  FileText,
  Bookmark,
  ShieldCheck,
  Globe,
  LogOut,
  Edit3,
  Calendar,
  Key,
  Lock,
  Download
} from 'lucide-react';

export default function ProfilePageView({
  user,
  onLogout,
  onNavigateToApplications
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showEditModal, setShowEditModal] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || 'Rajesh Sharma',
    mobile: user?.mobile || '+91 98765 43210',
    email: user?.email || 'rajesh.sharma@example.gov.in',
    dob: '14 May 1992',
    aadhaar: 'XXXX-XXXX-8921',
    pan: 'ABCPS1294F',
    state: 'Tamil Nadu',
    district: 'Chennai',
    taluk: 'Mylapore',
    village: 'Mylapore Central Ward 14',
    pincode: '600004',
    addressLine: '14, Temple Street, South Mada Road'
  });

  const verifiedDocuments = [
    { name: 'Aadhaar Card Cryptographic Verification', docId: 'AADHAAR-8921-DIGI', date: '15 Jan 2026', authority: 'UIDAI' },
    { name: 'Income Certificate 2026', docId: 'GOV-2026-894210', date: '24 Aug 2026', authority: 'Revenue Department' },
    { name: 'Permanent Driving Licence Smartcard', docId: 'DL-TN01-202200194', date: '10 Nov 2025', authority: 'Transport Department' },
    { name: 'Smart Family Ration Card', docId: 'PDS-TN-99214', date: '04 Mar 2024', authority: 'Food & Civil Supplies' }
  ];

  const savedServices = [
    { name: 'Income Certificate', dept: 'Revenue Department', icon: '💰' },
    { name: 'Patta Mutation & Land Title', dept: 'Revenue Department', icon: '📜' },
    { name: 'Permanent Driving Licence', dept: 'Transport Department', icon: '🪪' },
    { name: 'Housing Board Allotment Lottery', dept: 'Housing Department', icon: '🏠' }
  ];

  return (
    <div className="profile-desktop-page">
      {/* Section Header */}
      <div className="section-heading-group">
        <div>
          <h1 className="section-main-title">Citizen Profile & Digital Identity</h1>
          <p className="section-main-subtitle">
            Manage your verified demographic records, document vault, and security settings.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="btn-secondary"
          style={{ color: '#EF4444', borderColor: '#EF4444', padding: '8px 18px', fontSize: '13px' }}
        >
          <LogOut size={16} /> Logout from Portal
        </button>
      </div>

      {/* Desktop 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '28px', marginTop: '24px' }}>
        {/* LEFT COLUMN: Digital ID Smart Card & Navigation */}
        <div>
          {/* Digital Citizen Smart Card */}
          <div style={{
            background: 'linear-gradient(135deg, #311B92 0%, #673AB7 60%, #7C4DFF 100%)',
            color: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '24px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 10px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  National Digital Citizen ID
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', marginTop: '8px' }}>
                  {profile.name}
                </h2>
                <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
                  Aadhaar: {profile.aadhaar}
                </div>
              </div>

              <div style={{
                width: '68px',
                height: '68px',
                background: 'white',
                borderRadius: '16px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}>
                <QrCode size={56} color="#311B92" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '16px', fontSize: '12px' }}>
              <div>
                <div style={{ opacity: 0.8 }}>Mobile:</div>
                <div style={{ fontWeight: '700', marginTop: '2px' }}>{profile.mobile}</div>
              </div>
              <div>
                <div style={{ opacity: 0.8 }}>Jurisdiction:</div>
                <div style={{ fontWeight: '700', marginTop: '2px' }}>{profile.district}, {profile.state}</div>
              </div>
            </div>
          </div>

          {/* Profile Section Selector Tabs */}
          <div className="content-card" style={{ padding: '8px', marginBottom: 0 }}>
            {[
              { id: 'overview', label: 'Personal & Address Information', icon: User },
              { id: 'documents', label: 'Verified Document Vault', icon: FileText },
              { id: 'saved', label: 'Saved Services & Bookmarks', icon: Bookmark },
              { id: 'settings', label: 'Language & Account Settings', icon: Key }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive ? '#F3E5F5' : 'transparent',
                    color: isActive ? '#673AB7' : '#374151',
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} color={isActive ? '#673AB7' : '#6B7280'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Tab Content Display */}
        <div>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Personal Info */}
              <div className="content-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>Personal Information</h3>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px' }}>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Full Name</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.name}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Date of Birth</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.dob}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Mobile Number</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.mobile}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Email Address</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.email}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Aadhaar Number</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.aadhaar}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>PAN Number</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.pan}</div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="content-card">
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
                  Permanent Residence Address
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Street Address</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.addressLine}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Village / Ward</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.village}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Taluk / Division</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.taluk}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>District</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.district}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>State & Pincode</div>
                    <div style={{ fontWeight: '700', color: '#111827', marginTop: '2px' }}>{profile.state} - {profile.pincode}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENT VAULT */}
          {activeTab === 'documents' && (
            <div className="content-card">
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                Verified Digital Document Vault
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
                All government issued certificates and identity documents secured via DigiLocker integration.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {verifiedDocuments.map((doc, idx) => (
                  <div key={idx} style={{
                    background: '#F8F9FD',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <FileText size={28} color="#673AB7" />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>{doc.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                          ID: {doc.docId} • Issued by {doc.authority} on {doc.date}
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                      onClick={() => alert(`Downloading verified copy of ${doc.name}...`)}
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SAVED SERVICES */}
          {activeTab === 'saved' && (
            <div className="content-card">
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                Saved Citizen Services
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
                Quick bookmarks for frequently accessed schemes and application forms.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {savedServices.map((s, idx) => (
                  <div key={idx} style={{
                    background: '#F8F9FD',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '24px' }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: '#111827' }}>{s.name}</div>
                        <div style={{ fontSize: '12px', color: '#673AB7', fontWeight: '600' }}>{s.dept}</div>
                      </div>
                    </div>

                    <Bookmark size={20} color="#673AB7" fill="#673AB7" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="content-card">
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                Portal Settings & Security
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
                Customize your portal language preferences and two-factor authentication.
              </p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
                  Preferred Portal Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  style={{ width: '100%', maxWidth: '360px', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
                >
                  <option value="English">English</option>
                  <option value="हिंदी">हिंदी (Hindi)</option>
                  <option value="தமிழ்">தமிழ் (Tamil)</option>
                  <option value="తెలుగు">తెలుగు (Telugu)</option>
                  <option value="मराठी">मराठी (Marathi)</option>
                  <option value="বাংলা">বাংলা (Bengali)</option>
                </select>
              </div>

              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                <button
                  className="btn-secondary"
                  onClick={onNavigateToApplications}
                >
                  View All Active Applications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="desktop-modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div className="desktop-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Edit Profile Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>Mobile</label>
                <input
                  type="text"
                  value={profile.mobile}
                  onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { setShowEditModal(false); alert('Profile updated successfully!'); }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
