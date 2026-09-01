import React, { useState } from 'react';
import {
  AlertCircle,
  Sparkles,
  Send,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { classifyGrievanceWithAI } from './datraServiceAdapters';

export default function DatraGrievanceTab({ locationContext, user }) {
  const [grievanceText, setGrievanceText] = useState('');
  const [aiClassification, setAiClassification] = useState(null);
  const [grievancesList, setGrievancesList] = useState([
    {
      id: 'GRV-2026-9901',
      title: 'Water supply disruption in Ward 4, Mylapore',
      category: 'Water Supply & Sanitation',
      department: 'Public Works & Water Supply',
      priority: 'HIGH',
      submittedDate: '2026-08-27',
      status: 'Officer Assigned',
      assignedOfficer: 'Er. S. Sundaram (Assistant Executive Engineer)',
      timeline: [
        { status: 'Submitted', date: '2026-08-27 10:30 AM', note: 'Grievance submitted via DATRA Portal' },
        { status: 'AI Classified', date: '2026-08-27 10:31 AM', note: 'Auto-routed to Public Works & Water Supply' },
        { status: 'Officer Assigned', date: '2026-08-28 09:15 AM', note: 'Assigned to AEE Mylapore Zone' }
      ]
    }
  ]);

  const handleTextChange = (text) => {
    setGrievanceText(text);
    if (text.trim().length > 15) {
      const result = classifyGrievanceWithAI(text);
      setAiClassification(result);
    } else {
      setAiClassification(null);
    }
  };

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    if (!grievanceText.trim()) return;

    const classification = aiClassification || classifyGrievanceWithAI(grievanceText);

    const newGrievance = {
      id: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: grievanceText.slice(0, 60) + '…',
      category: classification.category,
      department: classification.department,
      priority: classification.priority,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Department Assigned',
      assignedOfficer: 'Desk Officer (Auto-Assigned)',
      timeline: [
        { status: 'Submitted', date: 'Just Now', note: 'Grievance submitted via DATRA AI Classifier' },
        { status: 'Department Assigned', date: 'Just Now', note: `Auto-routed to ${classification.department}` }
      ]
    };

    setGrievancesList([newGrievance, ...grievancesList]);
    setGrievanceText('');
    setAiClassification(null);
    alert(`Grievance ${newGrievance.id} successfully created and routed to ${newGrievance.department}!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', letterSpacing: 1 }}>CITIZEN REDRESSAL & AI ROUTING</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', margin: '2px 0 0' }}>
          Smart Grievance Classification & Real-Time Redressal
        </h2>
        <p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>
          Describe your complaint in natural language. DATRA AI automatically identifies department, priority, and required evidence.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Create Grievance Form */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1F2937', margin: '0 0 16px' }}>
            Submit a New Grievance
          </h3>

          <form onSubmit={handleSubmitGrievance} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>
                Describe your issue / complaint *
              </label>
              <textarea
                required
                rows={4}
                placeholder="e.g., Street lights in Gandhi Road have not been functioning for 3 days causing safety concerns…"
                value={grievanceText}
                onChange={e => handleTextChange(e.target.value)}
                style={{
                  width: '100%', padding: '12px', border: '1px solid #D1D5DB',
                  borderRadius: 12, fontSize: 13, outline: 'none', resize: 'vertical'
                }}
              />
            </div>

            {/* AI Live Auto-Classification Result */}
            {aiClassification && (
              <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, color: '#673AB7', marginBottom: 8 }}>
                  <Sparkles size={16} /> AI CLASSIFICATION & ROUTING PREVIEW ({aiClassification.confidenceScore})
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
                  <div>
                    <span style={{ color: '#6B7280', fontSize: 10, display: 'block' }}>Target Department</span>
                    <strong style={{ color: '#1F2937' }}>{aiClassification.department}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280', fontSize: 10, display: 'block' }}>Priority Recommendation</span>
                    <span style={{
                      color: aiClassification.priority === 'HIGH' ? '#DC2626' : '#D97706',
                      fontWeight: 800, background: '#fff', padding: '2px 8px', borderRadius: 8, display: 'inline-block'
                    }}>
                      {aiClassification.priority}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: 11, color: '#4C1D95', marginTop: 10, fontStyle: 'italic', background: '#EDE9FE', padding: '6px 10px', borderRadius: 8 }}>
                  💡 {aiClassification.aiReasoning}
                </div>
              </div>
            )}

            <button
              type="submit"
              style={{
                padding: '12px 0',
                background: 'linear-gradient(135deg, #673AB7, #512DA8)',
                border: 'none', borderRadius: 12, color: '#fff',
                fontSize: 14, fontWeight: 900, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              <Send size={16} /> Submit & Route Grievance →
            </button>
          </form>
        </div>

        {/* Active Grievances Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1F2937', margin: 0 }}>
            Your Grievances & Redressal History
          </h3>

          {grievancesList.map(grv => (
            <div
              key={grv.id}
              style={{
                background: '#fff', border: '1px solid #E5E7EB',
                borderRadius: 20, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#673AB7', background: '#EDE9FE', padding: '3px 10px', borderRadius: 12 }}>
                  {grv.id}
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#059669', background: '#D1FAE5', padding: '3px 10px', borderRadius: 12 }}>
                  {grv.status}
                </span>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1F2937', margin: '0 0 6px' }}>
                {grv.title}
              </h4>
              <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 12 }}>
                🏛️ {grv.department} • Priority: <strong style={{ color: grv.priority === 'HIGH' ? '#DC2626' : '#D97706' }}>{grv.priority}</strong>
              </div>

              {/* Timeline Progress */}
              <div style={{ borderTop: '1px solid #F3F4F6', pt: 10, marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 6 }}>
                  TIMELINE & LOGS
                </div>
                {grv.timeline.map((item, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#4B5563', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                    <span>✅ <strong>{item.status}:</strong> {item.note}</span>
                    <span style={{ color: '#9CA3AF', fontSize: 10 }}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
