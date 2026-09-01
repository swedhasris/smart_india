import React, { useState } from 'react';
import { 
  BookOpen, 
  Bot, 
  Calendar, 
  Bell, 
  FileText, 
  Library, 
  Bus, 
  Smile, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Send,
  Sparkles,
  Heart,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DigitalDiaryModule({ profile }: { profile: any }) {
  const [activeTab, setActiveTab] = useState<'diary' | 'aiteacher' | 'timetable' | 'circulars' | 'resources' | 'bus' | 'mood'>('diary');

  // Diary Entries
  const [diaryEntries, setDiaryEntries] = useState([
    { id: 1, date: '2026-08-30', title: 'Preparation for National Merit Exam', content: 'Completed Chapter 4 Mathematics & Physics formulas.', tag: 'Study' },
    { id: 2, date: '2026-08-28', title: 'Submitted Scholarship Application', content: 'Uploaded marksheets and income certificate on government portal.', tag: 'Govt Portal' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // AI Teacher Chat
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Teacher. Ask me anything about your studies, exam prep, or government educational schemes!' }
  ]);
  const [userQuery, setUserQuery] = useState('');

  // Mood Box State
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodReason, setMoodReason] = useState('');
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  const handleAddDiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setDiaryEntries([
      { id: Date.now(), date: new Date().toISOString().split('T')[0], title: newTitle, content: newContent, tag: 'General' },
      ...diaryEntries
    ]);
    setNewTitle('');
    setNewContent('');
  };

  const handleSendAiQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    const query = userQuery;
    setAiChat(prev => [
      ...prev,
      { sender: 'user', text: query },
      { sender: 'ai', text: `Great question about "${query}"! Here is a step-by-step breakdown: 1. Review core formulas. 2. Practice past year model papers. 3. Check official curriculum guidelines on the education portal.` }
    ]);
    setUserQuery('');
  };

  const handleMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;
    setMoodSubmitted(true);
    setTimeout(() => {
      setMoodSubmitted(false);
      setSelectedMood(null);
      setMoodReason('');
    }, 2500);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Student & Learning Hub</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Digital diary, AI Teacher assistant, timetable, circulars & mood check-in.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '16px', width: 'fit-content', overflowX: 'auto' }}>
        {[
          { id: 'diary', label: 'Digital Diary', icon: BookOpen },
          { id: 'aiteacher', label: 'AI Teacher', icon: Bot },
          { id: 'timetable', label: 'Time Table', icon: Calendar },
          { id: 'circulars', label: 'Circulars', icon: Bell },
          { id: 'resources', label: 'Library & Papers', icon: Library },
          { id: 'bus', label: 'My Bus', icon: Bus },
          { id: 'mood', label: 'Mood Box', icon: Smile }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                color: activeTab === tab.id ? '#003366' : '#6B7280',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {/* 1. DIGITAL DIARY & NOTES */}
          {activeTab === 'diary' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              <div style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '28px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '0 0 16px 0' }}>Add Diary Entry</h3>
                  <form onSubmit={handleAddDiary} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input 
                      type="text" 
                      placeholder="Title / Subject..." 
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '14px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                    />
                    <textarea 
                      placeholder="Write your notes, homework, or study targets..." 
                      value={newContent}
                      onChange={e => setNewContent(e.target.value)}
                      rows={3}
                      style={{ padding: '12px 16px', borderRadius: '14px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', resize: 'none' }}
                    />
                    <button type="submit" style={{ padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', width: 'fit-content' }}>
                      <Plus size={14} style={{ display: 'inline', marginRight: '6px' }} /> Save Entry
                    </button>
                  </form>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {diaryEntries.map(entry => (
                    <div key={entry.id} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '4px 10px', borderRadius: '10px' }}>{entry.tag}</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{entry.date}</span>
                      </div>
                      <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#111827', margin: '0 0 6px 0' }}>{entry.title}</h4>
                      <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. AI TEACHER */}
          {activeTab === 'aiteacher' && (
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', height: '500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={22} color="#003366" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#111827', margin: 0 }}>AI Teacher Assistant</h3>
                  <p style={{ fontSize: '12px', color: '#16A34A', margin: 0, fontWeight: '700' }}>● Instant Explanations & Study Support</p>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }} className="custom-scrollbar">
                {aiChat.map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', background: msg.sender === 'user' ? '#003366' : '#F9FAFB', color: msg.sender === 'user' ? '#FFFFFF' : '#111827', padding: '14px 18px', borderRadius: '18px', fontSize: '13px', lineHeight: 1.5, border: msg.sender === 'ai' ? '1px solid #F3F4F6' : 'none' }}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendAiQuery} style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                <input 
                  type="text" 
                  placeholder="Ask a question or topic to AI Teacher..." 
                  value={userQuery}
                  onChange={e => setUserQuery(e.target.value)}
                  style={{ flex: 1, padding: '12px 18px', borderRadius: '14px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                />
                <button type="submit" style={{ padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* 3. TIME TABLE */}
          {activeTab === 'timetable' && (
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '0 0 20px 0' }}>Weekly Class & Event Schedule</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  { day: 'Monday', subject: 'Mathematics & Science', time: '09:00 AM - 12:30 PM' },
                  { day: 'Tuesday', subject: 'English & Social Studies', time: '09:00 AM - 12:30 PM' },
                  { day: 'Wednesday', subject: 'Computer Science & Lab', time: '10:00 AM - 01:30 PM' },
                  { day: 'Thursday', subject: 'Physics & Chemistry', time: '09:00 AM - 12:30 PM' },
                  { day: 'Friday', subject: 'Exam Revision & Quiz', time: '09:00 AM - 11:30 AM' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#2563EB', textTransform: 'uppercase' }}>{item.day}</span>
                    <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>{item.subject}</h4>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CIRCULARS */}
          {activeTab === 'circulars' && (
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '0 0 8px 0' }}>Official Circulars & Notifications</h3>
              {[
                { title: 'PM Merit Scholarship 2026 Portal Open', date: 'Aug 29, 2026', desc: 'All eligible 10th and 12th students can now apply for annual merit stipend.' },
                { title: 'Free Transport E-Pass Renewal Notice', date: 'Aug 25, 2026', desc: 'Students can renew monthly bus e-pass using Aadhaar authentication.' }
              ].map((circ, idx) => (
                <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#003366' }}>CIRCULAR</span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{circ.date}</span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>{circ.title}</h4>
                  <p style={{ fontSize: '13px', color: '#4B5563', margin: 0 }}>{circ.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* 5. LIBRARY & RESOURCES */}
          {activeTab === 'resources' && (
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Digital Library & Model Papers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {[
                  { name: 'Mathematics Model Paper 2026.pdf', cat: 'Model Paper' },
                  { name: 'Science Curriculum Guide.pdf', cat: 'Syllabus' },
                  { name: 'NCERT Reference Book Class 12.pdf', cat: 'Library Book' }
                ].map((res, idx) => (
                  <div key={idx} style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '8px', width: 'fit-content' }}>{res.cat}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#111827', margin: 0 }}>{res.name}</h4>
                    <button style={{ padding: '8px 14px', background: '#003366', color: '#FFFFFF', borderRadius: '10px', fontWeight: '800', fontSize: '11px', border: 'none', cursor: 'pointer', width: 'fit-content' }}>
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. MY BUS */}
          {activeTab === 'bus' && (
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Bus size={48} color="#003366" />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>My Bus Pass & Transport</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0 0' }}>Route #204: Central Secretariat ➔ Education Campus (Status: Active Pass)</p>
                <p style={{ fontSize: '12px', fontWeight: '800', color: '#16A34A', margin: '6px 0 0 0' }}>Next Bus Arrival: 08:45 AM at Stop #12</p>
              </div>
            </div>
          )}

          {/* 7. MOOD BOX */}
          {activeTab === 'mood' && (
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', maxWidth: '500px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: '0 0 8px 0', textAlign: 'center' }}>Daily Mood Check-in</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', marginBottom: '24px' }}>How are you feeling about your studies today?</p>

              {moodSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px', background: '#F0FDF4', borderRadius: '20px', color: '#16A34A', fontWeight: '800' }}>
                  <CheckCircle2 size={36} style={{ margin: '0 auto 8px' }} />
                  Thank you! Your mood check-in has been logged.
                </div>
              ) : (
                <form onSubmit={handleMoodSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    {[
                      { emoji: '😊', label: 'Happy' },
                      { emoji: '😐', label: 'Neutral' },
                      { emoji: '😔', label: 'Sad' },
                      { emoji: '🔥', label: 'Motivated' }
                    ].map((m) => (
                      <button
                        key={m.label}
                        type="button"
                        onClick={() => setSelectedMood(m.label)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '16px',
                          borderRadius: '16px',
                          border: selectedMood === m.label ? '2px solid #003366' : '1px solid #E5E7EB',
                          background: selectedMood === m.label ? '#EFF6FF' : '#F9FAFB',
                          cursor: 'pointer',
                          fontSize: '24px'
                        }}
                      >
                        {m.emoji}
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#374151' }}>{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {selectedMood && (
                    <textarea 
                      placeholder="Would you like to share a reason? (Optional)"
                      value={moodReason}
                      onChange={e => setMoodReason(e.target.value)}
                      rows={3}
                      style={{ padding: '12px 16px', borderRadius: '14px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', resize: 'none' }}
                    />
                  )}

                  <button 
                    type="submit" 
                    disabled={!selectedMood}
                    style={{ padding: '12px', background: selectedMood ? '#003366' : '#9CA3AF', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '13px', border: 'none', cursor: selectedMood ? 'pointer' : 'not-allowed' }}
                  >
                    Submit Mood Check-in
                  </button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
