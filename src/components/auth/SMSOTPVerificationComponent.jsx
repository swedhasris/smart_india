import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, KeyRound, Clock, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

export default function SMSOTPVerificationComponent({
  title = "Mobile Phone OTP Verification",
  subtitle = "Verify your mobile number to receive security notifications and official updates.",
  initialPhone = "",
  onVerificationSuccess,
  onCancel
}) {
  const [phone, setPhone] = useState(initialPhone || '9876543210');
  const [step, setStep] = useState('ENTER_PHONE'); // 'ENTER_PHONE' | 'ENTER_OTP' | 'VERIFIED'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const normalizePhone = (p) => {
    let clean = (p || '').replace(/[^+\d]/g, '');
    if (!clean.startsWith('+')) {
      if (clean.length === 10) clean = '+91' + clean;
      else if (clean.length === 12 && clean.startsWith('91')) clean = '+' + clean;
    }
    return clean;
  };

  // Handle Send OTP
  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formattedPhone = normalizePhone(phone);
    if (!/^\+91[6-9]\d{9}$/.test(formattedPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone })
      });

      const data = await response.json();
      setIsSending(false);

      if (response.ok && data.success) {
        setStep('ENTER_OTP');
        setCooldown(60);
        setSuccessMessage(`OTP sent successfully via SMS to ${formattedPhone}. Valid for 5 minutes.`);
        setOtp(['', '', '', '', '', '']);
        // Focus first OTP field
        setTimeout(() => {
          const el = document.getElementById('sms-otp-0');
          if (el) el.focus();
        }, 100);
      } else {
        setErrorMessage(data.message || 'Failed to send OTP SMS. Please try again.');
      }
    } catch (err) {
      setIsSending(false);
      setErrorMessage('Unable to connect to SMS authentication service. Please check backend connection.');
    }
  };

  // Handle Digit Change
  const handleDigitChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage('');

    if (value && index < 5) {
      const nextInput = document.getElementById(`sms-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`sms-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP received via SMS.');
      return;
    }

    const formattedPhone = normalizePhone(phone);
    setIsVerifying(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone, otp: enteredOtp })
      });

      const data = await response.json();
      setIsVerifying(false);

      if (response.ok && data.success) {
        setStep('VERIFIED');
        setSuccessMessage('Mobile phone number verified successfully!');
        if (typeof onVerificationSuccess === 'function') {
          setTimeout(() => onVerificationSuccess(formattedPhone), 800);
        }
      } else {
        setErrorMessage(data.message || 'Invalid OTP code. Please try again.');
      }
    } catch (err) {
      setIsVerifying(false);
      setErrorMessage('Unable to verify OTP. Please try again.');
    }
  };

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
      maxWidth: '480px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#EDE9FE', padding: '10px', borderRadius: '14px', color: '#673AB7' }}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937', margin: 0 }}>{title}</h3>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>{subtitle}</p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div style={{
          background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626',
          padding: '12px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
          marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div style={{
          background: '#ECFDF5', border: '1px solid #6EE7B7', color: '#047857',
          padding: '12px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
          marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <div>{successMessage}</div>
        </div>
      )}

      {/* STEP 1: Phone Number Input */}
      {step === 'ENTER_PHONE' && (
        <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: '6px' }}>
              Mobile Phone Number
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{
                position: 'absolute', left: '14px', fontSize: '14px', fontWeight: 800, color: '#673AB7',
                background: '#EDE9FE', padding: '4px 8px', borderRadius: '6px', pointerEvents: 'none'
              }}>
                🇮🇳 +91
              </span>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                maxLength={10}
                disabled={isSending}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 78px',
                  borderRadius: '14px',
                  border: '1.5px solid #D1D5DB',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#1F2937',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending || !phone.trim()}
            style={{
              background: '#673AB7',
              color: '#FFFFFF',
              border: 'none',
              padding: '14px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: isSending ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isSending ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Dispatching SMS...
              </>
            ) : (
              <>
                Send OTP SMS <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      )}

      {/* STEP 2: Enter 6-Digit OTP Received via SMS */}
      {step === 'ENTER_OTP' && (
        <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '13px', color: '#4B5563' }}>
            An SMS containing a 6-digit OTP code has been dispatched to <strong>{normalizePhone(phone)}</strong>.
          </div>

          {/* 6 Digit Input Boxes */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`sms-otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleDigitChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                disabled={isVerifying}
                style={{
                  width: '46px',
                  height: '52px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 900,
                  borderRadius: '12px',
                  border: digit ? '2px solid #673AB7' : '1.5px solid #D1D5DB',
                  background: digit ? '#F3E8FF' : '#FFFFFF',
                  outline: 'none'
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.join('').length < 6}
            style={{
              background: '#673AB7',
              color: '#FFFFFF',
              border: 'none',
              padding: '14px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: isVerifying ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isVerifying ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Verifying Code...
              </>
            ) : (
              <>
                Verify OTP <CheckCircle2 size={18} />
              </>
            )}
          </button>

          {/* Resend Cooldown & Change Phone Number Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
            <button
              type="button"
              onClick={() => {
                setStep('ENTER_PHONE');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Change Mobile Number
            </button>

            <button
              type="button"
              disabled={cooldown > 0 || isSending}
              onClick={handleSendOTP}
              style={{
                background: 'none',
                border: 'none',
                color: cooldown > 0 ? '#9CA3AF' : '#673AB7',
                fontSize: '12px',
                fontWeight: 800,
                cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={12} />
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Verified Success Screen */}
      {step === 'VERIFIED' && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{
            width: '64px', height: '64px', background: '#ECFDF5', color: '#059669',
            borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937', margin: '0 0 6px 0' }}>
            Verification Complete!
          </h4>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            Your mobile number <strong>{normalizePhone(phone)}</strong> has been verified successfully.
          </p>
        </div>
      )}
    </div>
  );
}
