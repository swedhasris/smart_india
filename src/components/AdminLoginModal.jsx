import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail, KeyRound, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DEMO_USERS } from '../data/govData';

export default function AdminLoginModal({ onClose, onLoginSuccess }) {
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Demo Admin Accounts from existing RBAC system (DEMO_USERS in govData.js)
  const adminRoles = [
    {
      title: "Ultra Super Admin",
      user: DEMO_USERS[0], // Dr. Vikramaditya Verma, IAS (NeGD)
      desc: "National Chief Digital Officer & Full Governance Control"
    },
    {
      title: "Super Admin",
      user: DEMO_USERS[1], // Smt. Ananya Sundaram, IAS (Revenue & Public Grievances)
      desc: "State Commissioner & Regional Administrator"
    },
    {
      title: "District Admin",
      user: DEMO_USERS[2], // K. R. Narayanan, DRO
      desc: "District Revenue Officer (DRO) & Collectorate Control"
    },
    {
      title: "Verification Agent",
      user: DEMO_USERS[3], // Priya Ramachandran, VAO
      desc: "Village Administrative Officer & Verification Agent"
    }
  ];

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const chosenAdmin = adminRoles[selectedRoleIndex].user;
      
      onLoginSuccess({
        id: chosenAdmin.id,
        name: chosenAdmin.name,
        email: adminEmail || chosenAdmin.email,
        role: chosenAdmin.role,
        title: chosenAdmin.title,
        department: chosenAdmin.department,
        departmentId: chosenAdmin.departmentId,
        state: chosenAdmin.state,
        district: chosenAdmin.district,
        office: chosenAdmin.office,
        avatar: chosenAdmin.avatar || '👨‍💼'
      });
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(11, 15, 25, 0.86)',
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: '620px',
        borderRadius: '28px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(30, 58, 138, 0.2)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        margin: 'auto'
      }}>
        {/* Header Tricolour Bar */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #FF671F 0%, #FFFFFF 50%, #046A38 100%)'
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: '#F3F4F6',
            color: '#4B5563',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{ padding: '36px 36px 32px 36px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#EFF6FF',
              color: '#1E3A8A',
              padding: '6px 16px',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: '800',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <ShieldCheck size={16} color="#1E3A8A" /> Secure Administrator Access
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: '800', color: '#111827' }}>
              Administrator Login
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
              Official access for Government Officers, Commissioners & Verification Agents.
            </p>
          </div>

          {/* Role Preset Quick Switcher */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '12px', fontWeight: '800', color: '#4B5563', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Select Admin Role Preset:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {adminRoles.map((roleObj, idx) => (
                <div
                  key={roleObj.title}
                  onClick={() => {
                    setSelectedRoleIndex(idx);
                    setAdminEmail(roleObj.user.email);
                    setPassword('admin123');
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    border: selectedRoleIndex === idx ? '2px solid #2563EB' : '1.5px solid #E5E7EB',
                    background: selectedRoleIndex === idx ? '#EFF6FF' : '#F9FAFB',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '800', color: selectedRoleIndex === idx ? '#1E3A8A' : '#111827' }}>
                    {roleObj.user.avatar} {roleObj.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {roleObj.user.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLoginSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Email / Admin ID */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Official Email / Govt Admin ID <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="officer@gov.in"
                    value={adminEmail || adminRoles[selectedRoleIndex].user.email}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '14px',
                      border: '1.5px solid #E5E7EB',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  />
                  <Mail size={18} color="#6B7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Secret Password <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password || 'admin123'}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '14px',
                      border: '1.5px solid #E5E7EB',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  />
                  <KeyRound size={18} color="#6B7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* Security Indicators Bar */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '14px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              fontSize: '12px',
              fontWeight: '700',
              color: '#475569',
              marginBottom: '24px',
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🔒 Encrypted Connection
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🛡️ Role-Based Access
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                📋 Audit Logging
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(30, 58, 138, 0.28)'
              }}
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>Sign In to Admin Workspace <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
