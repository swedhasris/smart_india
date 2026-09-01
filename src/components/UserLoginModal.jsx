import React, { useState } from 'react';
import { X, Fingerprint, Smile, Smartphone, ShieldCheck, CheckCircle2, Lock, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

export default function UserLoginModal({ onClose, onLoginSuccess }) {
  // Form State
  const [aadhaar, setAadhaar] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Selected Security Authentication Mode: 'fingerprint' | 'faceid' | 'otp'
  const [authMode, setAuthMode] = useState('fingerprint');

  // Interactive Verification Simulation State: 'idle' | 'authenticating' | 'verified' | 'error'
  const [authStatus, setAuthStatus] = useState('idle');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [validationError, setValidationError] = useState('');

  // Validation Check
  const validateInputs = () => {
    const cleanAadhaar = aadhaar.replace(/\D/g, '');
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanAadhaar.length !== 12) {
      setValidationError('Please enter a valid 12-digit Aadhaar Number.');
      return false;
    }
    if (!fullName.trim()) {
      setValidationError('Please enter your Full Name as in Aadhaar.');
      return false;
    }
    if (cleanPhone.length !== 10) {
      setValidationError('Please enter a valid 10-digit Indian Mobile Number.');
      return false;
    }

    setValidationError('');
    return true;
  };

  // Format Aadhaar Input with Masking/Dashes (XXXX-XXXX-XXXX)
  const handleAadhaarChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    let formatted = raw;
    if (raw.length > 4 && raw.length <= 8) {
      formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
    } else if (raw.length > 8) {
      formatted = `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8)}`;
    }
    setAadhaar(formatted);
  };

  // Format Phone Input
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(raw);
  };

  // Biometric / OTP Authentication Simulator
  const handleAuthenticate = () => {
    if (!validateInputs()) return;

    if (authMode === 'otp' && !otpSent) {
      setOtpSent(true);
      return;
    }

    setAuthStatus('authenticating');

    // Simulate 2 second realistic authentication scan
    setTimeout(() => {
      setAuthStatus('verified');

      // Mask Aadhaar for user profile security
      const cleanAadhaar = aadhaar.replace(/\D/g, '');
      const maskedAadhaar = `XXXX-XXXX-${cleanAadhaar.slice(8) || '8921'}`;

      const userPayload = {
        name: fullName || 'Rajesh Sharma',
        mobile: `+91 ${phone || '9876543210'}`,
        email: `${fullName.toLowerCase().replace(/\s+/g, '.')}@citizen.gov.in`,
        aadhaar: maskedAadhaar,
        role: 'CITIZEN'
      };

      // Complete login after brief delay
      setTimeout(() => {
        onLoginSuccess(userPayload);
      }, 1000);
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(11, 15, 25, 0.84)',
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
        maxWidth: '580px',
        borderRadius: '28px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(103, 58, 183, 0.18)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        margin: 'auto'
      }}>
        {/* Tricolour Accent */}
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

        <div style={{ padding: '36px 32px 32px 32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#F3E5F5',
              color: '#673AB7',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '800',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <span>👤</span> Citizen Portal Login
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: '800', color: '#111827' }}>
              Citizen Login
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
              Securely access your government services with Aadhaar & Biometrics.
            </p>
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* User Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {/* Aadhaar Field */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Aadhaar Number <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="1234 - 5678 - 9012"
                  value={aadhaar}
                  onChange={handleAadhaarChange}
                  disabled={authStatus !== 'idle'}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '14px',
                    border: '1.5px solid #E5E7EB',
                    fontSize: '15px',
                    fontWeight: '700',
                    outline: 'none',
                    letterSpacing: '1px'
                  }}
                />
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>
                  🪪
                </span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Full Name (as in Aadhaar) <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rajesh Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={authStatus !== 'idle'}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '14px',
                  fontWeight: '600',
                  outline: 'none'
                }}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Mobile Number <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                  padding: '12px 14px',
                  background: '#F3F4F6',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#374151'
                }}>
                  +91
                </div>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={authStatus !== 'idle'}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #E5E7EB',
                    fontSize: '15px',
                    fontWeight: '700',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3 Security Authentication Modes Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: '800', color: '#111827', display: 'block', marginBottom: '10px' }}>
              Select Security Authentication Mode:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {/* Option 1: Fingerprint */}
              <button
                type="button"
                onClick={() => { setAuthMode('fingerprint'); setOtpSent(false); setAuthStatus('idle'); }}
                style={{
                  padding: '14px 10px',
                  borderRadius: '16px',
                  border: authMode === 'fingerprint' ? '2px solid #673AB7' : '1.5px solid #E5E7EB',
                  background: authMode === 'fingerprint' ? '#F3E5F5' : '#FFFFFF',
                  color: authMode === 'fingerprint' ? '#673AB7' : '#4B5563',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Fingerprint size={24} color={authMode === 'fingerprint' ? '#673AB7' : '#6B7280'} />
                <span style={{ fontSize: '12px', fontWeight: '800' }}>Fingerprint</span>
              </button>

              {/* Option 2: Face ID */}
              <button
                type="button"
                onClick={() => { setAuthMode('faceid'); setOtpSent(false); setAuthStatus('idle'); }}
                style={{
                  padding: '14px 10px',
                  borderRadius: '16px',
                  border: authMode === 'faceid' ? '2px solid #673AB7' : '1.5px solid #E5E7EB',
                  background: authMode === 'faceid' ? '#F3E5F5' : '#FFFFFF',
                  color: authMode === 'faceid' ? '#673AB7' : '#4B5563',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Smile size={24} color={authMode === 'faceid' ? '#673AB7' : '#6B7280'} />
                <span style={{ fontSize: '12px', fontWeight: '800' }}>Face ID</span>
              </button>

              {/* Option 3: OTP */}
              <button
                type="button"
                onClick={() => { setAuthMode('otp'); setAuthStatus('idle'); }}
                style={{
                  padding: '14px 10px',
                  borderRadius: '16px',
                  border: authMode === 'otp' ? '2px solid #673AB7' : '1.5px solid #E5E7EB',
                  background: authMode === 'otp' ? '#F3E5F5' : '#FFFFFF',
                  color: authMode === 'otp' ? '#673AB7' : '#4B5563',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Smartphone size={24} color={authMode === 'otp' ? '#673AB7' : '#6B7280'} />
                <span style={{ fontSize: '12px', fontWeight: '800' }}>OTP</span>
              </button>
            </div>
          </div>

          {/* Interactive Biometric / OTP Scanner Area */}
          {authStatus === 'authenticating' && (
            <div style={{
              background: '#F9FAFB',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
              border: '2px dashed #673AB7',
              marginBottom: '20px',
              animation: 'pulse 1.5s infinite'
            }}>
              {authMode === 'fingerprint' && (
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#F3E5F5',
                    color: '#673AB7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <Fingerprint size={36} className="animate-spin" />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111827' }}>Scanning Fingerprint...</h4>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Place your finger firmly on the biometric sensor.</p>
                </div>
              )}

              {authMode === 'faceid' && (
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#F3E5F5',
                    color: '#673AB7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <Smile size={36} />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111827' }}>Scanning Face...</h4>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Look straight into the camera for facial verification.</p>
                </div>
              )}

              {authMode === 'otp' && (
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#F3E5F5',
                    color: '#673AB7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <RefreshCw size={32} className="spin-icon" />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111827' }}>Verifying One-Time Password...</h4>
                </div>
              )}
            </div>
          )}

          {authStatus === 'verified' && (
            <div style={{
              background: '#ECFDF5',
              border: '2px solid #10B981',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <CheckCircle2 size={42} color="#10B981" style={{ margin: '0 auto 8px auto' }} />
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#065F46' }}>
                {authMode === 'fingerprint' ? 'Fingerprint Verified ✓' : authMode === 'faceid' ? 'Face Verified ✓' : 'Mobile Number Verified ✓'}
              </h4>
              <p style={{ fontSize: '13px', color: '#047857', marginTop: '4px' }}>
                Authentication successful. Redirecting to Citizen Dashboard...
              </p>
            </div>
          )}

          {/* OTP Sent Extra Field */}
          {authMode === 'otp' && otpSent && authStatus === 'idle' && (
            <div style={{ marginBottom: '20px', background: '#F8F9FD', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                ✓ OTP sent to +91 {phone} (Demo OTP: 123456)
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1.5px solid #673AB7',
                  fontSize: '18px',
                  fontWeight: '800',
                  letterSpacing: '4px',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Primary Submit Button */}
          {authStatus === 'idle' && (
            <button
              onClick={handleAuthenticate}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: 'none',
                background: 'var(--primary-gradient, linear-gradient(135deg, #4A148C 0%, #673AB7 100%))',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(103, 58, 183, 0.28)'
              }}
            >
              {authMode === 'otp' && !otpSent ? (
                <>Send One-Time Password <ArrowRight size={18} /></>
              ) : (
                <>Verify & Authenticate <Lock size={18} /></>
              )}
            </button>
          )}

          <div style={{
            marginTop: '20px',
            fontSize: '11px',
            color: '#9CA3AF',
            textAlign: 'center',
            lineHeight: 1.4
          }}>
            🔐 Demo Interface Security Note: Aadhaar numbers are sanitized & masked. No sensitive Aadhaar data is stored permanently.
          </div>
        </div>
      </div>
    </div>
  );
}
