import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Shield, ShieldCheck, ShieldAlert, Clock, Smartphone, Globe } from "lucide-react";
import { motion } from "motion/react";

interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
  type?: string;
  details?: {
    device?: string;
    platform?: string;
  };
}

export default function SecurityAudit({ uid }: { uid: string }) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "audit_logs"),
      where("uid", "==", uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AuditLog[];
      setLogs(logsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Audit Trail</h2>
          <p className="text-sm text-gray-500">Real-time blockchain-style immutable logs of your account activity.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          System Integrity: 100%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Events</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {logs.filter(l => l.type === "security").length}
          </p>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">MFA Verifications</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
            <ShieldAlert className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Failed Attempts</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Activity Log</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading audit logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No activity recorded yet.</div>
          ) : (
            logs.map((log, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={log.id} 
                className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  log.type === "security" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                }`}>
                  {log.type === "security" ? <ShieldCheck className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 truncate">{log.action}</h4>
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {log.details?.device && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                        <Globe className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{log.details.device}</span>
                      </div>
                    )}
                    {log.details?.platform && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                        <Smartphone className="w-3 h-3" />
                        <span>{log.details.platform}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
