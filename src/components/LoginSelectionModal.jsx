import React from 'react';
import { X, User, ShieldCheck, ArrowRight, Lock, Building2 } from 'lucide-react';

export default function LoginSelectionModal({
  onClose,
  onSelectUserLogin,
  onSelectAdminLogin
}) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(11, 15, 25, 0.82)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: '820px',
        borderRadius: '28px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(103, 58, 183, 0.18)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
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
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#E5E7EB'; e.currentTarget.style.color = '#111827'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#4B5563'; }}
        >
          <X size={20} />
        </button>

        <div style={{ padding: '40px 36px 36px 36px', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(103, 58, 183, 0.08)',
            color: '#673AB7',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '0.5px',
            marginBottom: '14px',
            textTransform: 'uppercase'
          }}>
            <span>🇮🇳</span> Official Gateway Authentication
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '28px',
            fontWeight: '800',
            color: '#111827',
            letterSpacing: '-0.5px'
          }}>
            Welcome to Government One-Stop Portal
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            marginTop: '6px',
            marginBottom: '36px'
          }}>
            Choose how you want to continue.
          </p>

          {/* 2 Choice Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* CARD 1: USER / CITIZEN */}
            <div
              onClick={onSelectUserLogin}
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
                border: '2px solid #E5E7EB',
                borderRadius: '24px',
                padding: '32px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#673AB7';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(103, 58, 183, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #673AB7 0%, #7C4DFF 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  boxShadow: '0 8px 20px rgba(103, 58, 183, 0.28)'
                }}>
                  <User size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                  👤 USER / CITIZEN
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5, marginBottom: '24px' }}>
                  Access government services, submit online forms, and track your applications.
                </p>
              </div>

              <button style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                border: 'none',
                background: 'var(--primary-gradient, linear-gradient(135deg, #4A148C 0%, #673AB7 100%))',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                Continue as User <ArrowRight size={18} />
              </button>
            </div>

            {/* CARD 2: ADMINISTRATOR */}
            <div
              onClick={onSelectAdminLogin}
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
                border: '2px solid #E5E7EB',
                borderRadius: '24px',
                padding: '32px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1E3A8A';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 58, 138, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  boxShadow: '0 8px 20px rgba(30, 58, 138, 0.28)'
                }}>
                  <ShieldCheck size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                  🛡️ ADMINISTRATOR
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5, marginBottom: '24px' }}>
                  Access government administration, verification workspace, and RBAC portal.
                </p>
              </div>

              <button style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                Continue as Administrator <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            fontSize: '12px',
            color: '#6B7280'
          }}>
            <span>🔒 256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>🛡️ National Cyber Security Compliant</span>
            <span>•</span>
            <span>🇮🇳 Digital India Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
