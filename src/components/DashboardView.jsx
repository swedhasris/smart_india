import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ClipboardList,
  SearchCheck,
  Award,
  Bot,
  Network,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import DeptLogo from './DeptLogo';

export default function DashboardView({
  user,
  onNavigate,
  onOpenService,
  onOpenDepartment,
  onOpenSearchModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const quickActions = [
    {
      title: 'My Applications',
      desc: 'View status of all submitted forms',
      icon: ClipboardList,
      color: '#673AB7',
      path: '/applications'
    },
    {
      title: 'Track Application',
      desc: 'Instant lookup via reference ID',
      icon: SearchCheck,
      color: '#0288D1',
      path: '/applications'
    },
    {
      title: 'Digital Certificates',
      desc: 'Download verified QR signed certs',
      icon: Award,
      color: '#2E7D32',
      path: '/profile'
    },
    {
      title: 'GovAI Assistant',
      desc: 'Ask questions in natural language',
      icon: Bot,
      color: '#7C4DFF',
      path: '/ai-assistant'
    },
    {
      title: 'Inter-Department Gateway',
      desc: 'See cross-dept auto verification',
      icon: Network,
      color: '#E65100',
      path: '/inter-department'
    }
  ];

  // Filter departments based on search or category
  const filteredDepartments = DEPARTMENTS.filter(dept => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      dept.name.toLowerCase().includes(q) ||
      dept.description.toLowerCase().includes(q) ||
      dept.services.some(s => s.name.toLowerCase().includes(q));

    if (activeFilter === 'all') return matchesQuery;
    if (activeFilter === 'essential') return matchesQuery && ['revenue', 'police', 'education', 'health', 'food-supplies'].includes(dept.id);
    if (activeFilter === 'welfare') return matchesQuery && ['social-welfare', 'women-child', 'housing', 'rural-dev'].includes(dept.id);
    if (activeFilter === 'business') return matchesQuery && ['industries', 'msme', 'commercial-taxes', 'registration'].includes(dept.id);
    return matchesQuery;
  });

  return (
    <div className="dashboard-content">
      {/* 1. Greeting Hero Section */}
      <section className="dashboard-hero">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F3E5F5', color: '#673AB7', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', marginBottom: '10px' }}>
            <ShieldCheck size={16} /> Official Single-Window Citizen Gateway
          </div>
          <h1 className="hero-title">
            Good Morning, {user?.name || 'Citizen'} 👋
          </h1>
          <p className="hero-subtitle">
            Access 35+ government departments and over 200+ public citizen services from one unified portal.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ background: '#F8F9FD', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '14px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#673AB7' }}>35</div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Departments</div>
          </div>
          <div style={{ background: '#F8F9FD', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '14px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#10B981' }}>200+</div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Live Services</div>
          </div>
        </div>
      </section>

      {/* 2. Large Search Hero Box */}
      <section className="search-hero-box">
        <Search size={24} color="#673AB7" />
        <input
          type="text"
          className="search-hero-input"
          placeholder="What government service do you need? (e.g. Income Certificate, Scholarship, Housing Scheme, Ration Card...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onOpenSearchModal(searchQuery);
          }}
        />
        <button
          className="ai-search-btn"
          onClick={() => onOpenSearchModal(searchQuery)}
        >
          <Sparkles size={18} />
          <span>TETRAN Search</span>
        </button>
      </section>

      {/* ── 🌟 TETRAN INTELLIGENT CITIZEN ASSISTANT SECTION ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #311B92 60%, #4A148C 100%)',
        borderRadius: 24, padding: '28px 32px', color: '#fff',
        margin: '24px 0 32px', boxShadow: '0 12px 35px rgba(49, 27, 146, 0.25)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)',
              padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 10
            }}>
              <Sparkles size={14} color="#FFD700" /> TETRAN • CITIZEN ASSISTANT LAYER
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
              How can TETRAN help you today, {user?.name || 'Citizen'}?
            </h2>
            <p style={{ fontSize: 13, color: '#E0E7FF', margin: '4px 0 0', opacity: 0.9 }}>
              Ask naturally to discover services, check eligibility, generate document checklists, or track applications.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/datra')}
            style={{
              background: 'linear-gradient(135deg, #FF671F, #FF8C42)', border: 'none',
              borderRadius: 20, padding: '10px 20px', color: '#fff', fontSize: 13, fontWeight: 900,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(255,103,31,0.4)'
            }}
          >
            <Sparkles size={16} /> Open Full DATRA AI Suite <ArrowRight size={16} />
          </button>
        </div>

        {/* Natural Language Prompt Shortcuts */}
        <div style={{ fontSize: 12, fontWeight: 800, color: '#C7D2FE', marginBottom: 10, letterSpacing: 0.5 }}>
          TRY ASKING TETRAN:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            "I want to apply for a scholarship",
            "I need an income certificate",
            "I want financial assistance",
            "I need a government housing scheme",
            "I want to renew my certificate",
            "Where is my application?"
          ].map((promptText, pIdx) => (
            <button
              key={pIdx}
              onClick={() => onOpenSearchModal(promptText)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: 20, padding: '8px 16px', color: '#F3F4F6', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.borderColor = '#FFD700'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'; }}
            >
              <Bot size={14} color="#93C5FD" /> "{promptText}"
            </button>
          ))}
        </div>

        {/* AI Disclaimer Footer */}
        <div style={{
          marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#C7D2FE'
        }}>
          <ShieldCheck size={14} color="#34D399" />
          <span>
            <strong>Tetra AI Safety Disclaimer:</strong> The AI provides service discovery and eligibility assistance. Final eligibility and application decisions remain strictly with the government department officer.
          </span>
        </div>
      </section>

      {/* 3. Quick Actions Section */}
      <section className="quick-actions-section">
        <div className="section-heading-group">
          <div>
            <h2 className="section-main-title">Quick Actions</h2>
            <p className="section-main-subtitle">Frequently accessed citizen tools and services</p>
          </div>
        </div>

        <div className="quick-actions-grid">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                className="quick-action-card"
                onClick={() => onNavigate(action.path)}
              >
                <div>
                  <div className="quick-action-icon-wrap" style={{ color: action.color }}>
                    <Icon size={26} />
                  </div>
                  <h3 className="quick-action-title">{action.title}</h3>
                  <p className="quick-action-desc">{action.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#673AB7', marginTop: '16px' }}>
                  Access Now <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Government Departments Grid */}
      <section className="departments-section">
        <div className="section-heading-group">
          <div>
            <h2 className="section-main-title">Government Departments</h2>
            <p className="section-main-subtitle">
              Select a department to explore all associated digital sub-services and schemes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', background: '#F1F3F9', padding: '4px', borderRadius: '30px' }}>
            {[
              { id: 'all', label: 'All Departments (35)' },
              { id: 'essential', label: 'Essential Services' },
              { id: 'welfare', label: 'Welfare & Housing' },
              { id: 'business', label: 'Business & Tax' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                style={{
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: activeFilter === pill.id ? '#673AB7' : 'transparent',
                  color: activeFilter === pill.id ? 'white' : '#4B5563',
                  transition: 'all 0.2s ease'
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column / 5-Column Desktop Responsive Cards Grid */}
        <div className="departments-grid-desktop">
          {filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="dept-desktop-card"
              onClick={() => onOpenDepartment(dept.id)}
            >
              <div>
                <div className="dept-card-header">
                  <div className="dept-circle-icon">
                    <DeptLogo deptId={dept.id} name={dept.name} size={44} />
                  </div>
                  <span className="dept-services-badge">
                    {dept.services.length} Services
                  </span>
                </div>

                <h3 className="dept-title-text">{dept.name}</h3>
                <p className="dept-desc-text">{dept.description}</p>
              </div>

              <div className="dept-view-link">
                <span>View Services</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
