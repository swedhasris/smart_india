import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Layers,
  FileText,
  Network,
  Bell,
  Bot,
  User,
  Settings,
  ShieldCheck,
  Headphones,
  LogOut,
  Sparkles,
  Search,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export default function DesktopSidebar({
  currentPath,
  onNavigate,
  onLogout,
  applicationsCount = 3,
  notificationsCount = 2
}) {
  const primaryMenu = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Departments', path: '/departments', icon: Building2, badge: '35' },
    { label: 'All Services', path: '/departments/revenue', icon: Layers, badge: '200+' },
    { label: 'My Applications', path: '/applications', icon: FileText, badge: `${applicationsCount}` },
    { label: 'Inter-Department Gateway', path: '/inter-department', icon: Network }
  ];

  const secondaryMenu = [
    { label: 'DATRA AI Engine', path: '/datra', icon: Sparkles, highlight: true, badge: 'SIH' },
    { label: 'Queries', path: '/queries', icon: HelpCircle },
    { label: 'Profile Sync & Consent', path: '/profile-updates', icon: RefreshCw, badge: 'Sync' },
    { label: 'Admin Query Management', path: '/admin-queries', icon: HelpCircle, badge: 'Admin' },
    { label: 'Revenue Dept Workspace', path: '/dept-workspace', icon: Building2, badge: '2FA' },
    { label: 'Citizen DATRA Lookup', path: '/aadhaar-lookup', icon: Search, badge: 'Aadhaar' },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: `${notificationsCount}` },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Settings & Security', path: '/profile', icon: Settings }
  ];

  return (
    <aside className="desktop-sidebar">
      <div>
        {/* Navigation Category 1: Citizen Services */}
        <div className="sidebar-section-label">Main Services</div>
        <div className="sidebar-menu">
          {primaryMenu.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path === '/departments' && currentPath.startsWith('/departments') && currentPath !== '/departments/revenue');
            return (
              <button
                key={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.path)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge && <span className="sidebar-item-badge">{item.badge}</span>}
              </button>
            );
          })}
        </div>

        {/* Navigation Category 2: Account & Intelligence */}
        <div className="sidebar-section-label" style={{ marginTop: '24px' }}>Citizen Workspace</div>
        <div className="sidebar-menu">
          {secondaryMenu.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.label}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.path)}
                style={item.highlight ? { color: '#673AB7', fontWeight: '800' } : {}}
              >
                <Icon size={18} color={item.highlight ? '#673AB7' : 'currentColor'} />
                <span>{item.label}</span>
                {item.badge && <span className="sidebar-item-badge">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer Info Card */}
      <div>
        <div className="sidebar-footer-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#673AB7', fontWeight: '800', fontSize: '13px' }}>
            <ShieldCheck size={16} /> 24x7 Citizen Support
          </div>
          <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px', lineHeight: 1.4 }}>
            Toll-Free Helpline: <strong>1800-11-2026</strong> for urgent application inquiries.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="sidebar-item"
          style={{ marginTop: '12px', color: '#EF4444' }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
