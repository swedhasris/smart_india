import { useState } from "react";
import { User, ShieldCheck, Lock, Bell, Globe, Database, ArrowRight, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";

export default function Settings({ profile, setProfile }: { profile: UserProfile | null, setProfile: (p: UserProfile) => void }) {
  const [activeTab, setActiveTab] = useState<"Profile" | "Security" | "Privacy" | "Notifications" | "Language" | "Data">("Profile");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 text-sm">Manage your profile, security, and data preferences.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-2xl w-full overflow-x-auto custom-scrollbar">
        {["Profile", "Security", "Privacy", "Notifications", "Language", "Data"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab 
                ? "bg-white text-[#003366] shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              {activeTab === "Profile" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <img src={profile?.photo} className="w-24 h-24 rounded-3xl object-cover border-4 border-blue-50 shadow-xl" alt="Profile" />
                      <button className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        Change
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{profile?.name}</h3>
                      <p className="text-sm text-gray-500">{profile?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Full Name</label>
                      <input type="text" defaultValue={profile?.name} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Email Address</label>
                      <input type="email" defaultValue={profile?.email} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Phone Number</label>
                      <input type="tel" defaultValue={profile?.phone} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Blood Group</label>
                      <select defaultValue={profile?.bloodGroup} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Residential Address</label>
                    <textarea defaultValue={profile?.address} rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button className="px-8 py-3 bg-[#003366] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Security" && (
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <ShieldCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-900">Two-Factor Authentication (2FA)</p>
                          <p className="text-[10px] text-blue-700">Protect your account with OTP verification.</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Lock className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Biometric Login</p>
                          <p className="text-[10px] text-gray-400">Use fingerprint or face ID to login.</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-900">Active Sessions</h4>
                    <div className="space-y-3">
                      {[
                        { device: "Chrome on Windows", location: "New Delhi, India", time: "Active Now" },
                        { device: "Safari on iPhone 15", location: "Bangalore, India", time: "2 hours ago" },
                      ].map((session, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Globe className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-800">{session.device}</p>
                              <p className="text-[10px] text-gray-400">{session.location} • {session.time}</p>
                            </div>
                          </div>
                          <button className="text-[10px] font-bold text-red-600 hover:underline">Revoke</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="bg-[#003366] p-8 rounded-3xl shadow-xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold">Data Management</h3>
            </div>
            <p className="text-blue-200 text-sm mb-6">Download a copy of all your data or manage your account status.</p>
            <div className="space-y-3">
              <button className="w-full py-3 bg-white/10 text-white rounded-xl font-bold text-xs hover:bg-white/20 transition-colors border border-white/10">
                Download Data Archive
              </button>
              <button className="w-full py-3 bg-red-500/20 text-red-300 rounded-xl font-bold text-xs hover:bg-red-500/30 transition-colors border border-red-500/20">
                Deactivate Account
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Privacy Score</h4>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-blue-600" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-900">85%</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center uppercase font-bold tracking-widest mt-2">Highly Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
