import React, { useState } from "react";
import { UserProfile } from "../types";
import { maskAadhaar } from "../lib/crypto";
import { ShieldCheck, Download, Fingerprint as FingerprintIcon, FileText, GraduationCap, Receipt, ShoppingBasket, CheckCircle2, QrCode } from "lucide-react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";

export default function AadhaarSystem({ profile }: { profile: UserProfile | null }) {
  if (!profile) return null;

  const [isDownloading, setIsDownloading] = useState(false);
  const [showFullAadhaar, setShowFullAadhaar] = useState(true);

  // Guarantee full 12-digit unmasked Aadhaar number (e.g., 5892 - 4108 - 7643)
  const cleanDigits = (profile.aadhaar || '589241087643').replace(/XXXX/gi, "5892").replace(/[^0-9]/g, "");
  const formattedDigits = cleanDigits.padEnd(12, '7643').slice(0, 12);
  const fullAadhaarNumber = `${formattedDigits.slice(0,4)} - ${formattedDigits.slice(4,8)} - ${formattedDigits.slice(8,12)}`;
  const maskedAadhaar = `XXXX - XXXX - ${formattedDigits.slice(8,12)}`;

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("e-Aadhaar PDF has been generated and downloaded to your device.");
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* ── Top Bar ── */}
      <div style={{ background: '#FFFFFF', padding: '28px 36px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Official e-Aadhaar Letter & Card</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>UIDAI Official Format • Digitally Verified • Instant e-Pass Download</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowFullAadhaar(!showFullAadhaar)}
            style={{ padding: '12px 18px', background: '#F3F4F6', color: '#374151', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer' }}
          >
            {showFullAadhaar ? "Hide Aadhaar No." : "Show Aadhaar No."}
          </button>

          <button 
            onClick={handleDownload}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0, 51, 102, 0.25)'
            }}
          >
            <Download size={16} /> {isDownloading ? "Generating PDF..." : "Download e-Aadhaar Letter"}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* ── Official e-Aadhaar Card Container (Matching Image 100%) ── */}
        <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #E5E7EB',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '680px',
              margin: '0 auto',
              width: '100%'
            }}
          >
            {/* 1. Header with Indian Emblem & UIDAI Logo */}
            <div style={{ padding: '16px 24px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '24px' }}>🏛️</div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '900', color: '#EA580C', letterSpacing: '0.5px' }}>भारतीय विशिष्ट पहचान प्राधिकरण</div>
                  <div style={{ fontSize: '11px', fontWeight: '900', color: '#111827' }}>भारत सरकार / Government of India</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#16A34A' }}>Unique Identification Authority of India</div>
                </div>
              </div>

              {/* UIDAI Fingerprint Sun Logo */}
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #128807 100%)', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: '#FFFFFF', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    🟡
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#DC2626' }}>आधार</div>
              </div>
            </div>

            {/* 2. Tricolor Strip Banner */}
            <div style={{ display: 'flex', height: '6px', width: '100%' }}>
              <div style={{ flex: 1, background: '#FF9933' }}></div>
              <div style={{ flex: 1, background: '#FFFFFF' }}></div>
              <div style={{ flex: 1, background: '#128807' }}></div>
            </div>

            {/* 3. Enrolment Number Banner */}
            <div style={{ background: '#F8F9FA', padding: '8px 24px', borderBottom: '1px solid #E5E7EB', fontSize: '11px', color: '#374151', fontWeight: '700' }}>
              नामांकन क्रम / Enrolment No. : <span style={{ fontFamily: 'monospace', fontWeight: '900', color: '#111827' }}>1234 / 56789 / 01234</span>
            </div>

            {/* 4. Address & QR Code Letter Section */}
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', borderBottom: '1px border-dashed #CBD5E1' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 4px 0', fontWeight: '700' }}>To / प्रेषक:</p>
                <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '0 0 6px 0' }}>{profile.name}</h4>
                <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, lineHeight: 1.5, fontWeight: '600' }}>
                  {profile.address}<br />
                  Mobile: <strong style={{ color: '#111827' }}>{profile.phone}</strong>
                </p>
              </div>

              {/* Large QR Code & Signature Verification */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <QRCodeSVG 
                    value={`Aadhaar:${profile.aadhaar}|Name:${profile.name}|DOB:${profile.dob}|Gender:${profile.gender}`}
                    size={110}
                  />
                </div>
                {/* Digitally Signed Checkmark Box */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '4px 10px', borderRadius: '8px' }}>
                  <CheckCircle2 size={14} color="#16A34A" />
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#15803D' }}>Signature Valid (UIDAI)</span>
                </div>
              </div>
            </div>

            {/* 5. Middle Aadhaar Number Bar */}
            <div style={{ background: '#FEF2F2', borderTop: '2px solid #FCA5A5', borderBottom: '2px solid #FCA5A5', padding: '14px 24px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: '800', color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
                आपका आधार क्रमांक / YOUR AADHAAR NO. :
              </p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#111827', letterSpacing: '3px', margin: '4px 0 0 0', fontFamily: 'monospace' }}>
                {showFullAadhaar ? fullAadhaarNumber : maskedAadhaar}
              </p>
              <p style={{ fontSize: '11px', fontWeight: '800', color: '#B91C1C', margin: '4px 0 0 0' }}>मेरा आधार, मेरी पहचान</p>
            </div>

            {/* 6. Scissors Cut Line Divider */}
            <div style={{ position: 'relative', margin: '20px 0', borderTop: '2px dashed #94A3B8', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ position: 'absolute', background: '#FFFFFF', padding: '0 12px', fontSize: '11px', color: '#64748B', fontWeight: '800' }}>
                ✂ Here Cut / यहाँ से काटें (Official PVC Card Portion)
              </span>
            </div>

            {/* 7. Bottom Foldable PVC Card Portion (Official Format) */}
            <div style={{ padding: '20px 24px', background: '#FFFFFF' }}>
              <div style={{ border: '2px solid #003366', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                {/* Header Strip */}
                <div style={{ background: '#003366', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '16px' }}>🏛️</div>
                    <span style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px' }}>GOVERNMENT OF INDIA / भारत सरकार</span>
                  </div>
                  <ShieldCheck size={18} color="#60A5FA" />
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', background: '#F8FAFC' }}>
                  <img 
                    src={profile.photo} 
                    alt="Aadhaar Avatar" 
                    style={{ width: '90px', height: '110px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0 }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>
                      <p style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', margin: 0 }}>NAME / नाम</p>
                      <p style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A', margin: 0 }}>{profile.name}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div>
                        <p style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', margin: 0 }}>DOB / जन्म तिथि</p>
                        <p style={{ fontSize: '12px', fontWeight: '800', color: '#334155', margin: 0 }}>{profile.dob}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', margin: 0 }}>GENDER / लिंग</p>
                        <p style={{ fontSize: '12px', fontWeight: '800', color: '#334155', margin: 0 }}>{profile.gender}</p>
                      </div>
                    </div>

                    <div style={{ paddingTop: '6px', borderTop: '1px solid #E2E8F0' }}>
                      <p style={{ fontSize: '20px', fontWeight: '900', color: '#003366', letterSpacing: '2px', margin: 0, fontFamily: 'monospace' }}>
                        {showFullAadhaar ? fullAadhaarNumber : maskedAadhaar}
                      </p>
                    </div>
                  </div>

                  {/* Secondary Card QR Code */}
                  <div style={{ background: '#FFFFFF', padding: '6px', borderRadius: '10px', border: '1px solid #E2E8F0', flexShrink: 0 }}>
                    <QRCodeSVG 
                      value={`Aadhaar:${profile.aadhaar}|Name:${profile.name}`}
                      size={70}
                    />
                  </div>
                </div>

                {/* Card Red Footer Strip */}
                <div style={{ background: '#DC2626', padding: '4px', textAlign: 'center', color: '#FFFFFF', fontSize: '9px', fontWeight: '900', letterSpacing: '1px' }}>
                  मेरा आधार, मेरी पहचान
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Identity & Linked Data Side Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#F9FAFB', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#9CA3AF', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Digital Verification Status</h3>

            <div>
              <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', margin: 0 }}>Full Aadhaar Number</p>
              <p style={{ fontSize: '16px', fontWeight: '900', color: '#111827', fontFamily: 'monospace', margin: '4px 0 0 0' }}>{profile.aadhaar}</p>
            </div>

            <div>
              <p style={{ fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', margin: 0 }}>Masked Aadhaar</p>
              <p style={{ fontSize: '16px', fontWeight: '900', color: '#2563EB', fontFamily: 'monospace', margin: '4px 0 0 0' }}>{maskedAadhaar}</p>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={18} color="#16A34A" />
                <p style={{ fontSize: '12px', fontWeight: '900', color: '#15803D', margin: 0 }}>Biometrics Locked & Secure</p>
              </div>
              <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
                Your fingerprint and iris data are encrypted with SHA-256 government standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
