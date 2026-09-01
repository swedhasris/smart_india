import React, { useState } from 'react';
import { Bot, X, Send, ArrowRight, Sparkles } from 'lucide-react';

export default function GovAIFloatingWidget({ onOpenService, onNavigateToApplications }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am GovAI. How can I help you find services, eligibility, or track your application today?'
    }
  ]);

  const handleSend = (text) => {
    const q = (text || inputText).trim();
    if (!q) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: q }]);
    setInputText('');

    setTimeout(() => {
      let reply = 'You can browse services under the 35 government departments or use the search bar.';
      let action = null;

      const ql = q.toLowerCase();
      if (ql.includes('income')) {
        reply = 'Apply for Income Certificate under Revenue Department with Aadhaar & Salary proof.';
        action = { label: 'Open Income Certificate', onClick: () => { onOpenService('income-cert', 'revenue'); setIsOpen(false); } };
      } else if (ql.includes('driving') || ql.includes('licence')) {
        reply = 'Apply for Driving Licence with your Learner Licence number under Transport Department.';
        action = { label: 'Open Driving Licence', onClick: () => { onOpenService('driving-licence', 'transport'); setIsOpen(false); } };
      } else if (ql.includes('track')) {
        reply = 'Track your application status in real-time in the My Applications dashboard.';
        action = { label: 'Open My Applications', onClick: () => { onNavigateToApplications(); setIsOpen(false); } };
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: reply, action }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button on Desktop Bottom Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '32px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 24px rgba(103, 58, 183, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 90,
          transition: 'all 0.2s ease'
        }}
        title="Chat with GovAI"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '32px',
            width: '380px',
            height: '520px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-purple)',
            zIndex: 95,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ background: 'var(--primary-gradient)', color: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={22} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: '800' }}>GovAI Quick Assistant</div>
                <div style={{ fontSize: '11px', opacity: 0.85 }}>Online • Intelligent Help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#F8F9FD', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? '#673AB7' : 'white',
                  color: m.sender === 'user' ? 'white' : '#111827',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  boxShadow: 'var(--shadow-xs)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  border: m.sender === 'user' ? 'none' : '1px solid #E5E7EB'
                }}
              >
                {m.text}
                {m.action && (
                  <button
                    onClick={m.action.onClick}
                    className="btn-primary"
                    style={{ marginTop: '8px', padding: '6px 12px', fontSize: '11px', width: '100%', justifyContent: 'center' }}
                  >
                    {m.action.label} <ArrowRight size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '8px 12px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {["Income Certificate", "Track Application", "Driving Licence"].map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                style={{
                  background: '#F3E5F5',
                  color: '#673AB7',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', outline: 'none', fontSize: '13px' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 16px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
