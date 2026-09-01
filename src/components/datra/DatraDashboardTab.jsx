import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  TrendingUp,
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Lock,
  UserCheck,
  Building2
} from 'lucide-react';
import { GOVERNMENT_SCHEMES } from './datraServiceAdapters';

export default function DatraDashboardTab({
  user,
  locationContext,
  documents,
  applications,
  grievances,
  onNavigateTab,
  onOpenSmartApply
}) {
  const verifiedDocsCount = documents.filter(d => d.status === 'Verified').length;
  const pendingDocsCount  = documents.filter(d => d.status !== 'Verified').length;
  const recommendedSchemes = GOVERNMENT_SCHEMES.slice(0, 3);

  const stateName    = locationContext?.state || 'Tamil Nadu';
  const districtName = locationContext?.district || 'Cuddalore';
  const talukName    = locationContext?.taluk || 'Chidambaram';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── 1. Citizen Welcome Banner & Profile Status ── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
        border: '1px solid rgba(103, 58, 183, 0.3)',
        borderRadius: 20, padding: '24px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, #673AB7, #3F51B5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 900, color: '#fff',
            boxShadow: '0 8px 20px rgba(103, 58, 183, 0.3)'
          }}>
            {user?.name ? user.name.charAt(0) : 'R'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: 0 }}>
                Welcome back, {user?.name || 'Rajesh Sharma'}
              </h2>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)', color: '#059669',
                fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20,
                display: 'flex', alignItems: 'center', gap: 4
              }}>
                <ShieldCheck size={14} /> Aadhaar Authenticated
              </span>
            </div>

            <div style={{ fontSize: 13, color: '#4B5563', marginTop: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>🆔 Aadhaar: {user?.aadhaar || 'XXXX-XXXX-8921'}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#673AB7' }}>
                <Building2 size={14} /> Location: {talukName} Taluk, {districtName}, {stateName}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div style={{
          background: '#fff', border: '1px solid #E5E7EB',
          borderRadius: 16, padding: '14px 20px', minWidth: 240,
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: '#374151', marginBottom: 6 }}>
            <span>Profile Completeness</span>
            <span style={{ color: '#673AB7' }}>92%</span>
          </div>
          <div style={{ width: '100%', height: 8, background: '#F3F4F6', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #673AB7, #10B981)', borderRadius: 10 }} />
          </div>
          <div style={{ fontSize: 10, color: '#6B7280', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <UserCheck size={12} color="#10B981" /> Ready for Instant AI Scheme Pre-fill
          </div>
        </div>
      </div>

      {/* ── 2. Top Stats Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>Recommended Schemes</span>
            <Sparkles size={18} color="#673AB7" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1F2937' }}>5 Schemes</div>
          <div style={{ fontSize: 11, color: '#10B981', marginTop: 4, fontWeight: 700 }}>
            Up to ₹5.6 Lakhs in financial benefits
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>Document Locker</span>
            <FileCheck size={18} color="#10B981" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1F2937' }}>{verifiedDocsCount} / {documents.length} Verified</div>
          <div style={{ fontSize: 11, color: pendingDocsCount > 0 ? '#F59E0B' : '#10B981', marginTop: 4, fontWeight: 700 }}>
            {pendingDocsCount > 0 ? `${pendingDocsCount} pending verification` : 'All documents verified'}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>Active Applications</span>
            <Clock size={18} color="#3B82F6" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1F2937' }}>{applications.length} Active</div>
          <div style={{ fontSize: 11, color: '#3B82F6', marginTop: 4, fontWeight: 700 }}>
            Latest: Income Certificate (Processing)
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>Consent & Privacy</span>
            <Lock size={18} color="#8B5CF6" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1F2937' }}>2 Active</div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
            Revenue & Social Welfare access
          </div>
        </div>
      </div>

      {/* ── 3. Recommended Schemes Fast-Track ── */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>AI MATCHED SCHEMES</div>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1F2937', margin: '2px 0 0' }}>
              Top Eligible Welfare Programs for You
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('schemes')}
            style={{
              background: 'none', border: 'none', color: '#673AB7',
              fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
            }}
          >
            View All Schemes <ArrowUpRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {recommendedSchemes.map(sch => (
            <div
              key={sch.id}
              style={{
                border: '1px solid #E5E7EB', borderRadius: 16, padding: 20,
                background: '#FAF5FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', background: '#EDE9FE', padding: '3px 10px', borderRadius: 12 }}>
                    {sch.category}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: '#059669', background: '#D1FAE5', padding: '3px 10px', borderRadius: 12 }}>
                    {sch.matchScore}% Match
                  </span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 900, color: '#1F2937', margin: '0 0 6px' }}>{sch.title}</h4>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 8 }}>
                  💰 Benefit: {sch.benefit}
                </div>
                <div style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5 }}>
                  {sch.description}
                </div>
              </div>

              <div style={{ marginTop: 16, pt: 12, borderTop: '1px solid #E5E7EB', display: 'flex', gap: 10 }}>
                <button
                  onClick={() => onOpenSmartApply(sch)}
                  style={{
                    flex: 1, padding: '10px 0',
                    background: 'linear-gradient(135deg, #673AB7, #512DA8)',
                    border: 'none', borderRadius: 12, color: '#fff',
                    fontSize: 13, fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(103, 58, 183, 0.25)'
                  }}
                >
                  ⚡ Smart Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
