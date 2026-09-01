import React, { useState } from 'react';
import {
  Network,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Building2,
  Database,
  Lock,
  ArrowDown,
  Cpu
} from 'lucide-react';

export default function InterDeptGatewayView({ onApplyHousing }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const nodes = [
    {
      id: 1,
      name: 'Citizen Application Portal',
      dept: 'Public Entrypoint',
      icon: '👤',
      payload: 'Citizen submits Housing Scheme request (PMAY / State Housing Board)',
      status: 'Payload Dispatched'
    },
    {
      id: 2,
      name: 'Housing Department',
      dept: 'Lead Allotment Authority',
      icon: '🏠',
      payload: 'Triggers automated inter-departmental verification requests via Single Gateway',
      status: 'Processing Sub-Queries'
    },
    {
      id: 3,
      name: 'Revenue Department API',
      dept: 'Income & Land Title Registry',
      icon: '🏞️',
      payload: 'Validates Annual Household Income < ₹3,00,000 and Zero Land Ownership status',
      status: '🟢 Verified in 0.3s'
    },
    {
      id: 4,
      name: 'Food & Civil Supplies API',
      dept: 'PDS Smart Ration Registry',
      icon: '🍚',
      payload: 'Validates BPL / PHH Ration Card #TN-99214 and verifies 3 dependants in household',
      status: '🟢 Verified in 0.2s'
    },
    {
      id: 5,
      name: 'Finance Department API',
      dept: 'DBT & Treasury Clearing',
      icon: '💰',
      payload: 'Aadhaar-linked Bank Account & PFMS clearance for direct interest subsidy',
      status: '🟢 Verified in 0.4s'
    },
    {
      id: 6,
      name: 'Housing Allotment Clearance',
      dept: 'Instant Zero-Visit Approval',
      icon: '✅',
      payload: '100% Paperless verification complete. Eligible for lottery allotment without office visits.',
      status: '🎉 Approved'
    }
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsSimulating(false);
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="inter-dept-desktop-page">
      {/* Section Header */}
      <div className="section-heading-group">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F3E5F5', color: '#673AB7', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', marginBottom: '8px' }}>
            <Zap size={14} /> Unified Interoperability Framework
          </div>
          <h1 className="section-main-title">Inter-Department Gateway</h1>
          <p className="section-main-subtitle">
            Secure, automated information exchange between 35 authorized government departments without physical citizen visits.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={handleRunSimulation}
          disabled={isSimulating}
        >
          <RefreshCw size={16} className={isSimulating ? 'spin' : ''} />
          {isSimulating ? 'Simulating Live Exchange...' : 'Simulate Inter-Dept Data Flow'}
        </button>
      </div>

      {/* Hero Overview Card */}
      <div className="content-card" style={{ background: 'linear-gradient(135deg, #311B92 0%, #673AB7 100%)', color: 'white', border: 'none', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800' }}>
              The Zero-Friction Citizen Experience
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '6px', maxWidth: '750px', lineHeight: 1.6 }}>
              In traditional systems, citizens must visit 4 different departments (Housing, Revenue, Civil Supplies, Finance) to collect stamp papers.
              On our Single One-Stop Portal, encrypted microservices exchange cryptographically verified data in under 1 second.
            </p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: '16px', padding: '16px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800' }}>0 Days</div>
            <div style={{ fontSize: '11px', opacity: 0.85 }}>Physical Travel Time</div>
          </div>
        </div>
      </div>

      {/* Visual Workflow Nodes Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
        {nodes.map((node) => {
          const isPassed = activeStep >= node.id;
          const isCurrent = activeStep === node.id;

          return (
            <div
              key={node.id}
              className="content-card"
              style={{
                borderColor: isCurrent ? '#673AB7' : isPassed ? '#10B981' : '#E5E7EB',
                background: isCurrent ? '#FDFBFF' : isPassed ? '#FAFAF9' : 'white',
                boxShadow: isCurrent ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                transition: 'all 0.3s ease',
                marginBottom: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: isPassed ? '#673AB7' : '#F3F4F6',
                    color: isPassed ? 'white' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    {node.icon}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#673AB7', background: '#F3E5F5', padding: '2px 8px', borderRadius: '6px' }}>
                        NODE 0{node.id}
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>
                        {node.name}
                      </h3>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        ({node.dept})
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#4B5563', marginTop: '4px', lineHeight: 1.4 }}>
                      {node.payload}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '800',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: isPassed ? '#ECFDF5' : '#F3F4F6',
                    color: isPassed ? '#047857' : '#6B7280',
                    border: `1px solid ${isPassed ? '#A7F3D0' : '#E5E7EB'}`
                  }}>
                    {isPassed ? node.status : 'Awaiting Request'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Banner */}
      <div className="content-card" style={{ marginTop: '28px', textAlign: 'center', padding: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
          Test the Inter-Department Gateway Live
        </h3>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px', marginBottom: '20px' }}>
          Apply for the State Housing Board Scheme to experience automatic income and ration card verification.
        </p>
        <button
          className="btn-primary"
          onClick={onApplyHousing}
        >
          <ShieldCheck size={18} /> Apply for Housing Scheme
        </button>
      </div>
    </div>
  );
}
