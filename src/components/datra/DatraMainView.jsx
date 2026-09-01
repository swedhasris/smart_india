import React, { useState } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Award,
  FileCheck,
  AlertCircle,
  ShieldCheck,
  Clock,
  ArrowRight,
  Network,
  Search
} from 'lucide-react';

import DatraDashboardTab from './DatraDashboardTab';
import DatraSchemesTab from './DatraSchemesTab';
import DatraDocLockerTab from './DatraDocLockerTab';
import DatraGrievanceTab from './DatraGrievanceTab';
import DatraActivityConsentTab from './DatraActivityConsentTab';
import DatraSmartApplyModal from './DatraSmartApplyModal';
import AdminAadhaarLookupTab from './AdminAadhaarLookupTab';
import { INITIAL_DATRA_DOCUMENTS } from './datraServiceAdapters';

export default function DatraMainView({
  user,
  applications = [],
  onUpdateApplications,
  onNavigateToApplications
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState(INITIAL_DATRA_DOCUMENTS);
  const [smartApplyScheme, setSmartApplyScheme] = useState(null);

  // Read saved location context from 3D map exploration (e.g. Tamil Nadu -> Cuddalore -> Chidambaram)
  const locationContext = React.useMemo(() => {
    const saved = localStorage.getItem('gov_location_context');
    return saved ? JSON.parse(saved) : { state: 'Tamil Nadu', district: 'Cuddalore', taluk: 'Chidambaram' };
  }, []);

  const handleAddDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const handleSmartApplySuccess = (newApp) => {
    if (onUpdateApplications) {
      onUpdateApplications(prev => [newApp, ...prev]);
    }
    setSmartApplyScheme(null);
    if (onNavigateToApplications) {
      onNavigateToApplications();
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'DATRA Overview', icon: LayoutDashboard },
    { id: 'schemes', label: 'AI Scheme Discovery', icon: Sparkles, badge: '5 Matches' },
    { id: 'locker', label: 'Document Locker', icon: FileCheck, badge: `${documents.length}` },
    { id: 'grievance', label: 'AI Grievance Classifier', icon: AlertCircle },
    { id: 'lookup', label: 'Citizen Aadhaar Document Verification', icon: Search, badge: 'Aadhaar Lookup' },
    { id: 'privacy', label: 'Consent & Audit Ledger', icon: ShieldCheck },
    { id: 'adapters', label: 'API Adapter Layer', icon: Network, badge: 'Mock APIs' }
  ];

  return (
    <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* ── Top Header Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #311B92 50%, #4A148C 100%)',
        borderRadius: 24, padding: '28px 36px', color: '#fff',
        marginBottom: 24, boxShadow: '0 12px 30px rgba(49, 27, 146, 0.25)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)',
            padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 10
          }}>
            <Sparkles size={14} color="#FFD700" /> SIH 2026 AI INNOVATION FEATURE
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: -0.5 }}>
            DATRA — Smart Citizen Intelligence Engine
          </h1>
          <p style={{ fontSize: 13, color: '#E0E7FF', margin: '6px 0 0', opacity: 0.9 }}>
            Data-driven Automated Tracking & Recommendation Architecture • Instant scheme matching & document verification
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 18px', borderRadius: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#C7D2FE', fontWeight: 700 }}>EXPLORATION LOCATION</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', marginTop: 2 }}>
              {locationContext.taluk}, {locationContext.district}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div style={{
        display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 24,
        background: '#fff', padding: 8, borderRadius: 20, border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 20px', borderRadius: 14, fontSize: 13, fontWeight: 800,
                cursor: 'pointer', border: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap',
                background: isActive ? '#673AB7' : 'transparent',
                color: isActive ? '#fff' : '#4B5563',
                boxShadow: isActive ? '0 4px 14px rgba(103, 58, 183, 0.3)' : 'none'
              }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#EDE9FE',
                  color: isActive ? '#fff' : '#673AB7',
                  fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 10
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Active Tab Content ── */}
      {activeTab === 'dashboard' && (
        <DatraDashboardTab
          user={user}
          locationContext={locationContext}
          documents={documents}
          applications={applications}
          grievances={[]}
          onNavigateTab={setActiveTab}
          onOpenSmartApply={setSmartApplyScheme}
        />
      )}

      {activeTab === 'schemes' && (
        <DatraSchemesTab
          onOpenSmartApply={setSmartApplyScheme}
        />
      )}

      {activeTab === 'locker' && (
        <DatraDocLockerTab
          documents={documents}
          onAddDocument={handleAddDocument}
          onDeleteDocument={handleDeleteDocument}
        />
      )}

      {activeTab === 'grievance' && (
        <DatraGrievanceTab
          locationContext={locationContext}
          user={user}
        />
      )}

      {activeTab === 'lookup' && (
        <AdminAadhaarLookupTab />
      )}

      {activeTab === 'privacy' && (
        <DatraActivityConsentTab
          applications={applications}
          documents={documents}
        />
      )}

      {activeTab === 'adapters' && (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 1, marginBottom: 4 }}>INTEROPERABILITY FRAMEWORK</div>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1F2937', margin: '0 0 8px' }}>
            Government Department API Adapter Layer
          </h3>
          <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 20px' }}>
            Demonstration mock adapters mapping standardized data payloads. Ready for seamless integration with real government APIs.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              { name: 'Education API Adapter', dept: 'Higher Education Department', endpoint: '/api/v1/education/verify-degree', status: 'Active Mock Adapter', latency: '42ms' },
              { name: 'Welfare API Adapter', dept: 'Social Welfare & Justice', endpoint: '/api/v1/welfare/check-pension', status: 'Active Mock Adapter', latency: '38ms' },
              { name: 'Employment API Adapter', dept: 'Labour & Employment Dept', endpoint: '/api/v1/employment/skill-verify', status: 'Active Mock Adapter', latency: '55ms' },
              { name: 'Revenue API Adapter', dept: 'Revenue & Disaster Management', endpoint: '/api/v1/revenue/patta-chitta', status: 'Active Mock Adapter', latency: '29ms' }
            ].map((adp, idx) => (
              <div key={idx} style={{ background: '#F8F9FD', border: '1px solid #E5E7EB', borderRadius: 16, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 900, color: '#1F2937' }}>{adp.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#059669', background: '#D1FAE5', padding: '2px 8px', borderRadius: 10 }}>{adp.status}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>{adp.dept}</div>
                <div style={{ background: '#EDE9FE', borderRadius: 8, padding: '6px 10px', fontSize: 11, fontFamily: 'monospace', color: '#673AB7' }}>
                  ENDPOINT: {adp.endpoint}
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10, textAlign: 'right' }}>Latency: {adp.latency}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Apply Modal */}
      {smartApplyScheme && (
        <DatraSmartApplyModal
          scheme={smartApplyScheme}
          user={user}
          locationContext={locationContext}
          onClose={() => setSmartApplyScheme(null)}
          onSubmitSuccess={handleSmartApplySuccess}
        />
      )}
    </div>
  );
}
