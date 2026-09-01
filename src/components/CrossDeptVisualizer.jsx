import React, { useState } from 'react';
import { Network, ArrowDown, CheckCircle2, ShieldCheck, Cpu, Database, RefreshCw, Zap } from 'lucide-react';

export default function CrossDeptVisualizer({ onApplyHousingScheme }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const flowSteps = [
    {
      step: 1,
      dept: "Housing Department",
      icon: "🏠",
      action: "Citizen applies for Urban Housing Scheme",
      detail: "Receives initial application for PMAY/Housing Board flat allotment",
      dataExchanged: "Applicant ID & Scheme Preference",
      status: "Verified"
    },
    {
      step: 2,
      dept: "Revenue Department",
      icon: "🏞️",
      action: "Income & Land Title Auto-Verification",
      detail: "Secure API queries state land database and Income Certificate records automatically without requiring paper visits",
      dataExchanged: "Verified Household Income < ₹3,00,000 & Zero Land Holding Cert",
      status: "Auto-Fetched in 0.4s"
    },
    {
      step: 3,
      dept: "Food & Civil Supplies",
      icon: "🍚",
      action: "Family Member & Ration Card Verification",
      detail: "Queries PDS Smart Ration database to verify household dependants and BPL eligibility",
      dataExchanged: "Smart Ration Card #TN-99214 & Dependant List",
      status: "Auto-Fetched in 0.3s"
    },
    {
      step: 4,
      dept: "Finance Department",
      icon: "💰",
      action: "DBT Direct Bank Account Verification",
      detail: "Performs instant Aadhaar-DBT bank account validation for direct subsidy disbursement",
      dataExchanged: "Bank Account IFSC & PFMS Clearance",
      status: "Completed"
    }
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    setActiveStep(1);
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <div className="cross-dept-page">
      <div className="section-header">
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#673AB7', textTransform: 'uppercase' }}>
            Interoperability Engine
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e' }}>
            🔗 Department Integration
          </h1>
        </div>
        <button
          className="secondary-btn"
          onClick={handleSimulate}
          disabled={isSimulating}
          style={{ fontSize: '12px', padding: '6px 12px' }}
        >
          <RefreshCw size={14} className={isSimulating ? 'spin' : ''} /> Simulate Integration
        </button>
      </div>

      {/* Explanation Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #311B92 0%, #673AB7 100%)',
        color: 'white',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 8px 24px rgba(103, 58, 183, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Zap color="#FFD700" size={24} />
          <h2 style={{ fontSize: '17px', fontWeight: '800' }}>Single-Window Inter-Departmental Gateway</h2>
        </div>
        <p style={{ fontSize: '12px', opacity: 0.9, lineHeight: 1.5 }}>
          Citizens no longer need to visit multiple government offices to collect physical certificates.
          Our platform establishes secure real-time API channels between all 35 departments.
        </p>
      </div>

      {/* Visual Workflow Steps Diagram */}
      <div className="flow-container">
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a2e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Network size={18} color="#673AB7" /> Example: Housing Scheme Interoperability Flow
        </h3>

        {flowSteps.map((stepItem) => {
          const isActive = activeStep === stepItem.step;
          const isPassed = activeStep >= stepItem.step;
          return (
            <React.Fragment key={stepItem.step}>
              <div
                className="flow-step"
                style={{
                  borderColor: isActive ? '#673AB7' : '#e9ecef',
                  background: isActive ? '#F3E5F5' : 'white',
                  boxShadow: isActive ? '0 8px 24px rgba(103, 58, 183, 0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isPassed ? '#673AB7' : '#f4f5fa',
                    color: isPassed ? 'white' : '#6c757d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0
                  }}>
                    {stepItem.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#673AB7' }}>
                        STEP {stepItem.step}
                      </span>
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1a1a2e' }}>
                        {stepItem.dept}
                      </h4>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: '#4b5563', marginTop: '2px' }}>
                      {stepItem.action}
                    </p>
                    <p style={{ fontSize: '11px', color: '#6c757d', marginTop: '2px' }}>
                      {stepItem.detail}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    background: isPassed ? '#e8f5e9' : '#fff3e0',
                    color: isPassed ? '#2e7d32' : '#e65100'
                  }}>
                    {isPassed ? stepItem.status : 'Pending Data'}
                  </span>
                  <p style={{ fontSize: '10px', color: '#673AB7', marginTop: '4px', fontWeight: '600' }}>
                    {stepItem.dataExchanged}
                  </p>
                </div>
              </div>

              {stepItem.step < 4 && (
                <div className="flow-arrow">
                  <ArrowDown size={20} color={isPassed ? '#673AB7' : '#cbd5e1'} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Try It Live Button */}
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a2e' }}>
          Experience Zero-Friction Application
        </h3>
        <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px', marginBottom: '16px' }}>
          Test applying for Housing Board Flat Scheme with live auto-verification.
        </p>
        <button
          className="primary-btn"
          onClick={onApplyHousingScheme}
        >
          <ShieldCheck size={18} /> Apply for Housing Scheme Now
        </button>
      </div>
    </div>
  );
}
