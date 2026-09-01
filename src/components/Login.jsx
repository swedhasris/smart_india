import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, Lock, KeyRound, ArrowRight, UserPlus, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!identifier) {
      alert('Please enter your Mobile number or Email');
      return;
    }
    // Perform login
    onLoginSuccess({
      name: identifier.includes('@') ? identifier.split('@')[0] : 'Rajesh Sharma',
      mobile: identifier.includes('@') ? '+91 98765 43210' : identifier,
      email: identifier.includes('@') ? identifier : 'rajesh.sharma@example.gov.in',
      aadhaar: 'XXXX-XXXX-8921'
    });
  };

  const handleSendOtp = () => {
    if (!identifier) {
      alert('Please enter your Mobile Number or Email first');
      return;
    }
    setOtpSent(true);
  };

  const handleOtpLogin = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      alert('Please enter valid 6-digit OTP (e.g., 123456)');
      return;
    }
    onLoginSuccess({
      name: 'Rajesh Sharma',
      mobile: identifier,
      email: 'rajesh.sharma@example.gov.in',
      aadhaar: 'XXXX-XXXX-8921'
    });
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess({
      name: 'Rajesh Sharma',
      mobile: '+91 98765 43210',
      email: 'rajesh.sharma@example.com',
      aadhaar: 'XXXX-XXXX-8921'
    });
  };

  return (
    <div className="auth-container">
      {/* Government Emblem & Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '36px',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}>
          🇮🇳
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          Government One-Stop Portal
        </h1>
        <p style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px', fontWeight: '500' }}>
          All Government Services in One Place
        </p>
      </div>

      {/* Main Login Card */}
      <div className="auth-card">
        {/* Toggle Login Mode */}
        <div style={{
          display: 'flex',
          background: '#f4f5fa',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '20px'
        }}>
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
              color: loginMethod === 'password' ? '#673AB7' : '#6c757d',
              boxShadow: loginMethod === 'password' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
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
              color: loginMethod === 'otp' ? '#673AB7' : '#6c757d',
              boxShadow: loginMethod === 'otp' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            OTP Login
          </button>
        </div>

        {loginMethod === 'password' ? (
          <form onSubmit={handlePasswordLogin}>
            <div className="form-group">
              <label className="form-label">Mobile Number / Email ID</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 10-digit Mobile or Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: 'none', border: 'none', color: '#673AB7', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
              </div>
            </div>

            <button type="submit" className="primary-btn" style={{ marginTop: '10px' }}>
              Login to Portal <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpLogin}>
            <div className="form-group">
              <label className="form-label">Mobile Number / Aadhaar Number</label>
              <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter registered mobile"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{
                    background: '#7C4DFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
            </div>

            {otpSent && (
              <div className="form-group">
                <label className="form-label">Enter 6-Digit OTP</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    style={{ paddingLeft: '40px', letterSpacing: '4px', fontWeight: '800' }}
                  />
                  <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#2e7d32', marginTop: '6px', fontWeight: '600' }}>
                  ✓ Demo OTP sent to {identifier || 'your mobile'}
                </p>
              </div>
            )}

            <button type="submit" className="primary-btn" style={{ marginTop: '10px' }}>
              Verify & Login <ShieldCheck size={18} />
            </button>
          </form>
        )}

        {/* Quick Demo Login Option */}
        <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px dashed #e9ecef', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#6c757d', marginBottom: '10px' }}>Testing the prototype?</p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="secondary-btn"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            ⚡ Quick Demo Login (Skip Auth)
          </button>
        </div>

        {/* Create Account Link */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ fontSize: '13px', color: '#6c757d' }}>
            New to Citizen Services?{' '}
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              style={{ background: 'none', border: 'none', color: '#673AB7', fontWeight: '700', cursor: 'pointer' }}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a2e' }}>Reset Password</h3>
              <button onClick={() => setShowForgotModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            {!forgotSubmitted ? (
              <div>
                <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '16px' }}>
                  Enter your registered mobile number or email ID to receive a password reset link.
                </p>
                <div className="form-group">
                  <label className="form-label">Mobile Number / Email</label>
                  <input type="text" className="form-control" placeholder="e.g. 9876543210" />
                </div>
                <button
                  className="primary-btn"
                  onClick={() => setForgotSubmitted(true)}
                >
                  Send Reset Link
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={48} color="#2e7d32" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e' }}>Reset Link Sent!</h4>
                <p style={{ fontSize: '13px', color: '#6c757d', marginTop: '6px' }}>
                  A password reset link has been dispatched to your registered contact.
                </p>
                <button
                  className="secondary-btn"
                  style={{ width: '100%', marginTop: '16px' }}
                  onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); }}
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a2e' }}>New Citizen Registration</h3>
              <button onClick={() => setShowRegisterModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div>
              <div className="form-group">
                <label className="form-label">Full Name (As per Aadhaar)</label>
                <input type="text" className="form-control" placeholder="e.g. Rajesh Sharma" />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input type="text" className="form-control" placeholder="10-digit Mobile Number" />
              </div>
              <div className="form-group">
                <label className="form-label">Aadhaar Number (Optional)</label>
                <input type="text" className="form-control" placeholder="12-digit Aadhaar" />
              </div>
              <div className="form-group">
                <label className="form-label">Create Password</label>
                <input type="password" className="form-control" placeholder="••••••••" />
              </div>
              <button
                className="primary-btn"
                onClick={() => {
                  alert('Account created successfully! Logging you in...');
                  setShowRegisterModal(false);
                  handleQuickDemoLogin();
                }}
              >
                Register & Login <UserPlus size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
