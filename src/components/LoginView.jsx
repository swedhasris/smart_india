import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Lock,
  KeyRound,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function LoginView({ onLoginSuccess }) {
  const [loginMethod, setLoginMethod] = useState('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: identifier.includes('@') ? identifier.split('@')[0] : 'Rajesh Sharma',
      mobile: identifier.includes('@') ? '+91 98765 43210' : identifier || '+91 98765 43210',
      email: identifier.includes('@') ? identifier : 'rajesh.sharma@example.gov.in',
      aadhaar: 'XXXX-XXXX-8921'
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: 'Rajesh Sharma',
      mobile: identifier || '+91 98765 43210',
      email: 'rajesh.sharma@example.gov.in',
      aadhaar: 'XXXX-XXXX-8921'
    });
  };

  const handleDemoCitizenLogin = () => {
    onLoginSuccess({
      name: 'Rajesh Sharma',
      mobile: '+91 98765 43210',
      email: 'rajesh.sharma@example.gov.in',
      aadhaar: 'XXXX-XXXX-8921'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at top right, #4A148C 0%, #311B92 40%, #111827 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '28px',
        width: '100%',
        maxWidth: '520px',
        padding: '40px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Government Emblem & Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '24px',
            background: '#F3E5F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '38px',
            margin: '0 auto 16px auto',
            border: '2px solid rgba(103, 58, 183, 0.2)',
            boxShadow: '0 8px 24px rgba(103, 58, 183, 0.15)'
          }}>
            🇮🇳
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>
            Government One-Stop Portal
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px', fontWeight: '600' }}>
            All Government Services in One Place • National Citizen Gateway
          </p>
        </div>

        {/* Dual Mode Tab Selector */}
        <div style={{ display: 'flex', background: '#F1F3F9', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setLoginMethod('password')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              background: loginMethod === 'password' ? 'white' : 'transparent',
              color: loginMethod === 'password' ? '#673AB7' : '#6B7280',
              boxShadow: loginMethod === 'password' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('otp')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              background: loginMethod === 'otp' ? 'white' : 'transparent',
              color: loginMethod === 'otp' ? '#673AB7' : '#6B7280',
              boxShadow: loginMethod === 'otp' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            Aadhaar / Mobile OTP Login
          </button>
        </div>

        {/* Form Mode: Password */}
        {loginMethod === 'password' ? (
          <form onSubmit={handlePasswordSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                Mobile Number / Registered Email ID
              </label>
              <input
                type="text"
                placeholder="Enter 10-digit Mobile or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: 'none', border: 'none', color: '#673AB7', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '14px' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center' }}
            >
              Login to Citizen Portal <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                Mobile Number / Aadhaar ID
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter registered mobile number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '14px' }}
                />
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="btn-secondary"
                  style={{ padding: '0 16px', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
            </div>

            {otpSent && (
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  Enter 6-Digit OTP Received via SMS
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '16px', letterSpacing: '4px', fontWeight: '800' }}
                />
                <div style={{ fontSize: '12px', color: '#10B981', marginTop: '6px', fontWeight: '700' }}>
                  ✓ Demo OTP sent to {identifier || 'registered device'}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center' }}
            >
              Verify OTP & Login <ShieldCheck size={18} />
            </button>
          </form>
        )}

        {/* 1-Click Quick Prototype Login */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px dashed #E5E7EB', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleDemoCitizenLogin}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', borderColor: '#673AB7', background: '#F8F9FD' }}
          >
            ⚡ Instant Demo Login (Skip Authentication)
          </button>
        </div>

        {/* Register Account Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ fontSize: '13px', color: '#6B7280' }}>
            New to National Citizen Services?{' '}
          </span>
          <button
            type="button"
            onClick={() => setShowRegisterModal(true)}
            style={{ background: 'none', border: 'none', color: '#673AB7', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
          >
            Create Citizen Account
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="desktop-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="desktop-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Reset Portal Password</h3>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
              Enter your mobile or email to receive an official password reset link.
            </p>
            <input
              type="text"
              placeholder="e.g. 9876543210"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #E5E7EB', marginBottom: '16px' }}
            />
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { setShowForgotModal(false); alert('Password reset link sent to your registered contact.'); }}
            >
              Send Reset Link
            </button>
          </div>
        </div>
      )}

      {/* Register Account Modal */}
      {showRegisterModal && (
        <div className="desktop-modal-backdrop" onClick={() => setShowRegisterModal(false)}>
          <div className="desktop-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>New Citizen Registration</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Full Name (as per Aadhaar)" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }} />
              <input type="text" placeholder="Mobile Number" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }} />
              <input type="text" placeholder="Aadhaar ID" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }} />
              <input type="password" placeholder="Create Password" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }} />
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                onClick={() => { setShowRegisterModal(false); handleDemoCitizenLogin(); }}
              >
                Register & Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
