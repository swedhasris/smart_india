import React from 'react';
import { Bell, User, Monitor, Smartphone, Search } from 'lucide-react';

export default function Navbar({
  user,
  onOpenNotifications,
  onOpenProfile,
  onOpenSearch,
  isDesktopView,
  onToggleDesktopView,
  unreadCount = 3
}) {
  return (
    <header className="gov-navbar">
      <div className="gov-logo-group">
        <div className="gov-emblem" title="State Seal Emblem" style={{ background: '#ffffff', padding: '2px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div className="gov-title-text">
          <h1>Government One-Stop Portal</h1>
          <p>Single Gateway for Citizens</p>
        </div>
      </div>

      <div className="gov-nav-actions">
        {/* Search quick button */}
        <button className="icon-btn" onClick={onOpenSearch} title="Search Services">
          <Search size={19} />
        </button>

        {/* View toggle (Mobile frame vs Desktop mode) */}
        <button
          className="icon-btn"
          onClick={onToggleDesktopView}
          title={isDesktopView ? "Switch to Mobile Frame" : "Switch to Desktop View"}
        >
          {isDesktopView ? <Smartphone size={19} /> : <Monitor size={19} />}
        </button>

        {/* Notification Icon */}
        <button className="icon-btn" onClick={onOpenNotifications} title="Notifications">
          <Bell size={19} />
          {unreadCount > 0 && <span className="badge-dot" />}
        </button>

        {/* User Profile Avatar */}
        <button
          className="icon-btn"
          onClick={onOpenProfile}
          title="Citizen Account"
          style={{ background: 'rgba(255, 255, 255, 0.25)', border: '1.5px solid rgba(255, 255, 255, 0.5)' }}
        >
          <User size={19} />
        </button>
      </div>
    </header>
  );
}
