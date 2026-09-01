import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Search,
  CheckCircle2,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function GovAIPageView({ onOpenService, onNavigateToApplications }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! I am TETRAN, your intelligent digital assistant for all 35 Government Departments. How can I guide you with schemes, documents, queries, or applications today?',
      actions: []
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sampleQueries = [
    "My income certificate is delayed",
    "I need an income certificate",
    "I lost my documents",
    "I need a ration card",
    "I want to apply for a scholarship",
    "How do I track my application?"
  ];

  const handleSendMessage = (customQuery) => {
    const q = (customQuery || inputText).trim();
    if (!q) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let botResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '',
        actions: []
      };

      const queryLower = q.toLowerCase();

      if (queryLower.includes('name change') || queryLower.includes('changed my name') || queryLower.includes('address change') || queryLower.includes('profile change')) {
        botResponse.text = `Your identity change has been recorded in the Aadhaar source identity system.

TETRAN Dependency Engine found potentially affected state department records:
1. Revenue Department (Income Cert & Patta)
2. Higher Education Department (Degrees & Portal)
3. Transport Department (Driving License)
4. Employment Exchange Department

Would you like to review these departments and grant step-by-step consent before propagation?`;
        botResponse.actions = [
          { label: 'REVIEW PROFILE UPDATES', action: () => window.location.hash = '#profile-updates' },
          { label: 'NOT NOW', action: () => alert('Understood. You can review updates anytime under Profile Sync & Consent.') }
        ];
      } else if (queryLower.includes('delay') || queryLower.includes('pending') || queryLower.includes('query')) {
        botResponse.text = `I found your Income Certificate application with the Revenue Department. It is currently under verification (Pending for 15 days).

Would you like to raise an official query about this delay?`;
        botResponse.actions = [
          { label: 'YES, RAISE QUERY', action: () => onOpenService('income-cert', 'revenue') },
          { label: 'NO', action: () => alert('Understood. You can track application status under My Applications.') }
        ];
      } else if (queryLower.includes('income certificate') || queryLower.includes('income cert')) {
        botResponse.text = `You can apply directly for an Income Certificate online through:
• Revenue Department
• Service: Income Certificate
• Application Processing: 3-5 Working Days

Required Documents: Aadhaar Card, Income Slip / Form 16, Residence Proof.`;
        botResponse.actions = [
          { label: 'Apply for Income Certificate', action: () => onOpenService('income-cert', 'revenue') },
          { label: 'Check Income Certificate Eligibility', action: () => alert('Eligibility: Permanent State Resident with verifiable family income.') }
        ];
      } else if (queryLower.includes('lost') || queryLower.includes('police') || queryLower.includes('fir')) {
        botResponse.text = `For lost certificates, Aadhaar, or mobile phones, you can instantly file a digital Lost Document Report through the Police Department.`;
        botResponse.actions = [
          { label: 'File Lost Document Report', action: () => onOpenService('lost-docs', 'police') }
        ];
      } else if (queryLower.includes('ration') || queryLower.includes('food')) {
        botResponse.text = `Ration card services are handled by the Food & Civil Supplies Department. You can apply for a New Smart Ration Card or modify family members.`;
        botResponse.actions = [
          { label: 'New Smart Ration Card', action: () => onOpenService('new-ration-card', 'food-supplies') }
        ];
      } else if (queryLower.includes('scholarship') || queryLower.includes('education')) {
        botResponse.text = `Scholarship portals under the Education and Social Welfare departments are currently open for pre-matric, post-matric, and STEM higher education grants.`;
        botResponse.actions = [
          { label: 'Education Department Scholarships', action: () => onOpenService('scholarships', 'education') }
        ];
      } else if (queryLower.includes('land') || queryLower.includes('patta') || queryLower.includes('mutation')) {
        botResponse.text = `For land registration, Patta transfer, and land survey measurement, visit the Revenue Department portal.`;
        botResponse.actions = [
          { label: 'Patta Services (Revenue Dept)', action: () => onOpenService('patta-services', 'revenue') },
          { label: 'Land Records (Chitta/FMB)', action: () => onOpenService('land-records', 'revenue') }
        ];
      } else if (queryLower.includes('track') || queryLower.includes('gov-')) {
        botResponse.text = `You can track the live verification timeline for your submitted applications in the My Applications dashboard.`;
        botResponse.actions = [
          { label: 'Open My Applications Tracker', action: onNavigateToApplications }
        ];
      } else {
        botResponse.text = `I am TETRAN. I searched our knowledge repository of 35 Government Departments and 200+ services for "${q}". You can browse all departments or use the search bar at the top.`;
      }

      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <div className="ai-desktop-page">
      {/* Top Banner */}
      <div style={{ background: 'var(--primary-gradient)', color: 'white', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🤖
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800' }}>
              TETRAN Intelligent Assistant
            </h2>
            <p style={{ fontSize: '12px', opacity: 0.85 }}>
              Ask natural language queries across all 35 state departments & schemes
            </p>
          </div>
        </div>

        <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
          AI Powered • 24x7 Available
        </span>
      </div>

      {/* Chat Messages Log */}
      <div style={{ flex: 1, padding: '28px', overflowY: 'auto', background: '#F8F9FD', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '75%',
              background: m.sender === 'user' ? '#673AB7' : 'white',
              color: m.sender === 'user' ? 'white' : '#111827',
              padding: '18px 22px',
              borderRadius: '18px',
              boxShadow: 'var(--shadow-sm)',
              border: m.sender === 'user' ? 'none' : '1px solid #E5E7EB'
            }}
          >
            <div style={{ fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {m.text}
            </div>

            {m.actions && m.actions.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                {m.actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={act.action}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '12px', borderColor: '#673AB7', color: '#673AB7' }}
                  >
                    {act.label} <ArrowRight size={14} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Questions Strip */}
      <div style={{ padding: '12px 24px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', alignSelf: 'center', whiteSpace: 'nowrap' }}>
          Suggested:
        </span>
        {sampleQueries.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            style={{
              background: '#F3E5F5',
              border: '1px solid rgba(103, 58, 183, 0.2)',
              color: '#673AB7',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{ padding: '16px 24px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '12px' }}
      >
        <input
          type="text"
          placeholder="Ask GovAI anything (e.g. 'I need an income certificate', 'How to apply for DL')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1, padding: '14px 20px', borderRadius: '12px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '14px' }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>
          <Send size={18} />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
