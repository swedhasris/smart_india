import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';

export default function GovAIAssistant({
  onSelectService,
  onNavigateToApplications,
  onNavigateToVisualizer
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! I am GovAI, your intelligent government service assistant. How can I guide you today?',
      action: null
    }
  ]);

  const quickPrompts = [
    "I need an income certificate",
    "What documents for driving licence?",
    "How to track application GOV-894210?",
    "Tell me about housing scheme eligibility"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMsg('');

    // Generate intelligent AI Response
    setTimeout(() => {
      let botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'I can help you navigate that government service. Please choose from the options below or ask for specific document requirements.',
        action: null
      };

      const q = query.toLowerCase();

      if (q.includes('income certificate') || q.includes('income cert')) {
        botReply.text = 'You can apply for an Income Certificate directly through Revenue Department → Income Certificate. Required documents include Aadhaar Card, Income declaration, and address proof.';
        botReply.action = {
          label: 'Launch Income Certificate Form',
          onClick: () => {
            onSelectService('income-cert', 'revenue');
            setIsOpen(false);
          }
        };
      } else if (q.includes('driving licence') || q.includes('dl') || q.includes('licence')) {
        botReply.text = 'For a Permanent Driving Licence, you require a valid Learner Licence (LLR) held for over 30 days, Medical Form 1A, and Aadhaar card.';
        botReply.action = {
          label: 'Open Transport Dept → Driving Licence',
          onClick: () => {
            onSelectService('driving-licence', 'transport');
            setIsOpen(false);
          }
        };
      } else if (q.includes('track') || q.includes('gov-')) {
        botReply.text = 'You can track real-time verification progress for any application ID (e.g. GOV-894210) in the My Applications timeline.';
        botReply.action = {
          label: 'Go to My Applications Tracking',
          onClick: () => {
            onNavigateToApplications();
            setIsOpen(false);
          }
        };
      } else if (q.includes('housing') || q.includes('interoperability') || q.includes('integration')) {
        botReply.text = 'Our Single-Window Gateway connects Housing, Revenue, Food & Civil Supplies, and Finance departments so you don’t need paper verification.';
        botReply.action = {
          label: 'View Cross-Department Gateway',
          onClick: () => {
            onNavigateToVisualizer();
            setIsOpen(false);
          }
        };
      } else if (q.includes('ration') || q.includes('food')) {
        botReply.text = 'You can apply for New Smart Ration Card or add family members under Food & Civil Supplies Department.';
        botReply.action = {
          label: 'Open Food & Civil Supplies',
          onClick: () => {
            onSelectService('new-ration-card', 'food-supplies');
            setIsOpen(false);
          }
        };
      } else {
        botReply.text = `I found 35 departments offering services for "${query}". You can search using our Smart AI Search bar at the top or browse department cards.`;
      }

      setMessages(prev => [...prev, botReply]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className="gov-ai-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with GovAI Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={26} />}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="white" />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '800' }}>GovAI Assistant</h3>
                <p style={{ fontSize: '10px', opacity: 0.9 }}>Government Smart Virtual Agent</p>
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
          <div className="ai-messages-list">
            {messages.map((m) => (
              <div key={m.id} className={`ai-msg ${m.sender}`}>
                <p>{m.text}</p>
                {m.action && (
                  <button
                    onClick={m.action.onClick}
                    style={{
                      marginTop: '8px',
                      background: '#673AB7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {m.action.label} <ArrowRight size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Suggestions Chips */}
          <div style={{ padding: '8px', background: '#f4f5fa', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                style={{
                  background: 'white',
                  border: '1px solid #673AB7',
                  color: '#673AB7',
                  borderRadius: '16px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="ai-chat-input-area"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Ask GovAI anything..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '13px' }}
            />
            <button
              type="submit"
              className="primary-btn"
              style={{ padding: '8px 14px', width: 'auto', borderRadius: '12px' }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
