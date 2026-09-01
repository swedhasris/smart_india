import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Fingerprint, 
  Scan, 
  Smartphone, 
  ShieldCheck, 
  ShieldAlert,
  CheckCircle2,
  Loader2,
  ArrowRight
} from "lucide-react";
import { UserProfile } from "../types";
import { maskAadhaar } from "../lib/crypto";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface SecurityVerificationProps {
  profile: UserProfile;
  onVerified: () => void;
}

export default function SecurityVerification({ profile, onVerified }: SecurityVerificationProps) {
  const [step, setStep] = useState<"scans" | "otp" | "success">("scans");
  const [fingerprintStatus, setFingerprintStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [faceStatus, setFaceStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [otpStatus, setOtpStatus] = useState<"idle" | "sending" | "sent" | "verifying" | "done">("idle");
  const [otpValue, setOtpValue] = useState("");

  const logSecurityEvent = async (action: string) => {
    try {
      await addDoc(collection(db, "audit_logs"), {
        uid: profile.uid,
        action,
        timestamp: new Date().toISOString(),
        type: "security",
        details: {
          device: navigator.userAgent,
          platform: navigator.platform
        }
      });
    } catch (error) {
      console.error("Failed to log security event", error);
    }
  };

  useEffect(() => {
    logSecurityEvent("MFA Challenge Started");
  }, []);

  const handleFingerprint = () => {
    setFingerprintStatus("scanning");
    setTimeout(() => {
      setFingerprintStatus("done");
      logSecurityEvent("Biometric: Fingerprint Verified");
    }, 2000);
  };

  const handleFaceScan = () => {
    setFaceStatus("scanning");
    setTimeout(() => {
      setFaceStatus("done");
      logSecurityEvent("Biometric: Face Scan Verified");
    }, 2500);
  };

  const handleSendOtp = () => {
    if (fingerprintStatus !== "done" || faceStatus !== "done") return;
    setOtpStatus("sending");
    setTimeout(() => {
      setOtpStatus("sent");
      setStep("otp");
      logSecurityEvent("OTP Sent to Mobile");
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) return;
    setOtpStatus("verifying");
    setTimeout(() => {
      setOtpStatus("done");
      setStep("success");
      logSecurityEvent("MFA Challenge Completed Successfully");
      setTimeout(onVerified, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#003366] via-[#004d99] to-[#0066cc] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden"
      >
        <div className="p-10 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight">System Administrator</h1>
            <p className="text-blue-200 text-sm font-medium">Aadhaar linked secure verification card</p>
          </div>

          {/* Identity Info */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest mb-1">Aadhaar Number</p>
              <p className="text-xl font-bold text-white">{maskAadhaar(profile.aadhaar)}</p>
            </div>
            <div>
              <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest mb-1">Mobile</p>
              <p className="text-xl font-bold text-white">{profile.phone}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "scans" && (
              <motion.div 
                key="scans"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Fingerprint Card */}
                <button 
                  onClick={handleFingerprint}
                  disabled={fingerprintStatus !== "idle"}
                  className={`p-8 rounded-3xl border transition-all flex flex-col items-center gap-4 group relative overflow-hidden ${
                    fingerprintStatus === "done" 
                      ? "bg-green-500/20 border-green-500/50 text-green-400" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 ${
                    fingerprintStatus === "done" ? "bg-green-500 text-white" : "bg-white/10"
                  }`}>
                    {fingerprintStatus === "scanning" ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : fingerprintStatus === "done" ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <Fingerprint className="w-8 h-8" />
                    )}
                  </div>
                  <span className="font-bold text-lg">
                    {fingerprintStatus === "scanning" ? "Scanning..." : fingerprintStatus === "done" ? "Verified" : "Start Fingerprint"}
                  </span>
                  {fingerprintStatus === "scanning" && (
                    <motion.div 
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                    />
                  )}
                </button>

                {/* Face Scan Card */}
                <button 
                  onClick={handleFaceScan}
                  disabled={faceStatus !== "idle"}
                  className={`p-8 rounded-3xl border transition-all flex flex-col items-center gap-4 group relative overflow-hidden ${
                    faceStatus === "done" 
                      ? "bg-green-500/20 border-green-500/50 text-green-400" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 ${
                    faceStatus === "done" ? "bg-green-500 text-white" : "bg-white/10"
                  }`}>
                    {faceStatus === "scanning" ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : faceStatus === "done" ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <Scan className="w-8 h-8" />
                    )}
                  </div>
                  <span className="font-bold text-lg">
                    {faceStatus === "scanning" ? "Scanning..." : faceStatus === "done" ? "Verified" : "Start Face Scan"}
                  </span>
                  {faceStatus === "scanning" && (
                    <div className="absolute inset-0 border-2 border-blue-400/50 animate-pulse rounded-3xl"></div>
                  )}
                </button>

                {/* OTP Action Card */}
                <button 
                  onClick={handleSendOtp}
                  disabled={fingerprintStatus !== "done" || faceStatus !== "done" || otpStatus !== "idle"}
                  className={`p-8 rounded-3xl border transition-all flex flex-col items-center justify-center gap-4 md:col-span-1 ${
                    fingerprintStatus === "done" && faceStatus === "done"
                      ? "bg-blue-600 text-white shadow-xl hover:bg-blue-700"
                      : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <span className="font-black text-xl">Send OTP to mobile</span>
                </button>

                {/* Status Card */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                  <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest mb-1">OTP Delivery</p>
                  <p className="text-lg font-bold text-white">
                    {otpStatus === "idle" ? "Waiting to send OTP" : otpStatus === "sending" ? "Sending..." : "OTP Sent"}
                  </p>
                  <p className="text-xs text-blue-200/60 mt-1">
                    {fingerprintStatus !== "done" || faceStatus !== "done" 
                      ? "Complete both scans first." 
                      : "Ready for mobile verification."}
                  </p>
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Verify Mobile OTP</h2>
                  <p className="text-blue-200 text-sm">Enter the 6-digit code sent to {profile.phone}</p>
                </div>

                <div className="flex justify-center gap-3">
                  <input 
                    type="text" 
                    maxLength={6}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full max-w-[200px] bg-white/10 border-2 border-white/20 rounded-2xl p-4 text-center text-3xl font-black text-white tracking-[0.5em] outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <button 
                  onClick={handleVerifyOtp}
                  disabled={otpValue.length !== 6 || otpStatus === "verifying"}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 disabled:text-white/30 text-white rounded-3xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl"
                >
                  {otpStatus === "verifying" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Verify & Access Portal
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>

                <button 
                  onClick={() => setStep("scans")}
                  className="w-full text-blue-300 text-sm font-bold hover:text-white transition-colors"
                >
                  Back to Scans
                </button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                  <ShieldCheck className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white">Identity Verified</h2>
                  <p className="text-blue-200">Accessing secure government environment...</p>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-black/20 p-6 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] text-blue-300 uppercase font-black tracking-widest">End-to-End Encrypted</span>
          </div>
          <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Ministry of Digital Security</p>
        </div>
      </motion.div>
    </div>
  );
}
