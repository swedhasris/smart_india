import React from 'react';
import { Search, Bell, User, Menu, X, ShieldCheck, ExternalLink } from 'lucide-react';

export default function DesktopHeader({
  currentPath,
  onNavigate,
  onOpenSearch,
  unreadNotifsCount = 2,
  user,
  sidebarOpen,
  onToggleSidebar
}) {
  const navLinks = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Departments', path: '/departments' },
    { label: 'Services', path: '/departments/revenue' },
    { label: 'Applications', path: '/applications' },
    { label: 'Inter-Department Gateway', path: '/inter-department' }
  ];

  return (
    <header className="desktop-header">
      {/* Left: Brand & Emblem */}
      <div className="header-left" onClick={() => onNavigate('/dashboard')}>
        <button
          className="header-icon-btn"
          style={{ display: 'none' }} // Visible on mobile via CSS media query
          onClick={(e) => {
            e.stopPropagation();
            onToggleSidebar();
          }}
          title="Toggle Navigation Menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="gov-seal-badge" title="Official State Emblem" style={{ background: '#ffffff', padding: '3px', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div>
          <div className="header-brand-title">
            Government One-Stop Portal
          </div>
          <div className="header-brand-sub">
            Single Gateway for Citizens • National & State Services
          </div>
        </div>
      </div>

      {/* Center: Desktop Top Navigation Links */}
      <nav className="header-center-nav">
        {navLinks.map((link) => {
          const isActive = currentPath === link.path || (link.path === '/departments' && currentPath.startsWith('/departments'));
          return (
            <button
              key={link.path}
              className={`header-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(link.path)}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Right: Actions (Search, Notifications, Profile) */}
      <div className="header-right">
        {/* Global Search Button */}
        <button
          className="header-icon-btn"
          onClick={onOpenSearch}
          title="Search All Government Services"
        >
          <Search size={20} />
        </button>

        {/* Notifications Icon Button with Counter */}
        <button
          className="header-icon-btn"
          onClick={() => onNavigate('/notifications')}
          title="Notifications & Alerts"
        >
          <Bell size={20} />
          {unreadNotifsCount > 0 && (
            <span className="badge-counter">{unreadNotifsCount}</span>
          )}
        </button>

        {/* User Account / Profile */}
        <div
          className="header-user-btn"
          onClick={() => onNavigate('/profile')}
          title="Citizen Account Profile"
        >
          <div className="header-avatar">
            {user?.name ? user.name.charAt(0) : 'R'}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.2 }}>
              {user?.name || 'Rajesh Sharma'}
            </div>
            <div style={{ fontSize: '10px', opacity: 0.85 }}>Verified Citizen</div>
          </div>
        </div>
      </div>
    </header>
  );
}
