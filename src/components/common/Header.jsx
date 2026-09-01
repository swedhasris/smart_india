import React, { useState } from 'react';
import { Shield, Bell, Search, User, LogOut, ChevronDown, RefreshCw, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES, DEMO_USERS } from '../../data/govData';

export default function Header({ currentPath, onNavigate, onOpenSearch, onOpenAI }) {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case USER_ROLES.ULTRA_SUPER_ADMIN:
        return { label: 'ULTRA SUPER ADMIN', bg: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', text: '#ffffff', icon: '👑' };
      case USER_ROLES.SUPER_ADMIN:
        return { label: 'SUPER ADMIN (STATE)', bg: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)', text: '#ffffff', icon: '🏛️' };
      case USER_ROLES.ADMIN:
        return { label: 'ADMIN (REVENUE DEPT)', bg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', text: '#ffffff', icon: '👔' };
      case USER_ROLES.AGENT:
        return { label: 'AGENT / VERIFIER', bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)', text: '#ffffff', icon: '🧑‍💻' };
      case USER_ROLES.CITIZEN:
      default:
        return { label: 'CITIZEN PORTAL', bg: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', text: '#ffffff', icon: '👤' };
    }
  };

  const badge = getRoleBadge(currentRole);

  const handleSelectRole = (roleKey) => {
    switchRole(roleKey);
    setShowRoleDropdown(false);
    // Route to home of that role
    switch (roleKey) {
      case USER_ROLES.ULTRA_SUPER_ADMIN:
        onNavigate('/ultra-admin/dashboard');
        break;
      case USER_ROLES.SUPER_ADMIN:
        onNavigate('/super-admin/dashboard');
        break;
      case USER_ROLES.ADMIN:
        onNavigate('/admin/dashboard');
        break;
      case USER_ROLES.AGENT:
        onNavigate('/agent/dashboard');
        break;
      case USER_ROLES.CITIZEN:
      default:
        onNavigate('/dashboard');
        break;
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      height: '72px',
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Brand & Emblem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          onClick={() => handleSelectRole(currentRole)}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            🇮🇳
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#1e1b4b', letterSpacing: '-0.3px' }}>
                Government One-Stop Portal
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                background: '#ede9fe',
                color: '#6d28d9',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ddd6fe'
              }}>
                ENTERPRISE RBAC
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: '500' }}>
              National Unified Public Services & Administration Gateway
            </p>
          </div>
        </div>
      </div>

      {/* Center Actions: Role Switcher Tool */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Active Role Pill with Dropdown Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '30px',
              background: badge.bg,
              color: badge.text,
              border: 'none',
              cursor: 'pointer',
              fontWeight: '800',
              fontSize: '12px',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>{badge.icon}</span>
            <span>{badge.label}</span>
            <ChevronDown size={14} />
          </button>

          {/* Quick Role Switcher Dropdown */}
          {showRoleDropdown && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: '320px',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
              border: '1px solid #e2e8f0',
              zIndex: 100,
              animation: 'fadeIn 0.15s ease'
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⚡ Quick Role Perspective Switcher
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                  Select a role to inspect its unique dashboard & permissions
                </p>
              </div>

              {DEMO_USERS.map((u) => {
                const uBadge = getRoleBadge(u.role);
                const isSelected = currentUser?.role === u.role;
                return (
                  <div
                    key={u.role}
                    onClick={() => handleSelectRole(u.role)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: isSelected ? '#f5f3ff' : 'transparent',
                      border: isSelected ? '1px solid #ddd6fe' : '1px solid transparent',
                      marginBottom: '4px',
                      transition: 'background 0.15s'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{u.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: isSelected ? '#6d28d9' : '#1e293b' }}>
                        {u.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {uBadge.label}
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{ fontSize: '11px', background: '#7c3aed', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Search size={16} />
          <span>Global Search...</span>
          <span style={{ fontSize: '11px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>⌘K</span>
        </button>

        {/* GovAI Button */}
        <button
          onClick={onOpenAI}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
            border: '1px solid #ddd6fe',
            color: '#6d28d9',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={15} />
          <span>GovAI Assistant</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => {
            if (currentRole === USER_ROLES.CITIZEN) onNavigate('/dashboard/notifications');
            else if (currentRole === USER_ROLES.SUPER_ADMIN) onNavigate('/super-admin/notifications');
            else if (currentRole === USER_ROLES.ADMIN) onNavigate('/admin/notifications');
            else if (currentRole === USER_ROLES.AGENT) onNavigate('/agent/notifications');
            else onNavigate('/ultra-admin/audit');
          }}
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            cursor: 'pointer'
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ef4444'
          }} />
        </button>

        {/* User Profile Avatar with Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#ede9fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              {currentUser?.avatar || '👤'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', lineHeight: '1.2' }}>
                {currentUser?.name?.split(',')[0]}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                {currentUser?.title?.substring(0, 24)}...
              </div>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: '240px',
              background: '#ffffff',
              borderRadius: '14px',
              padding: '8px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e2e8f0',
              zIndex: 100
            }}>
              <div style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{currentUser?.email}</div>
                <div style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '600', marginTop: '4px' }}>
                  {currentUser?.office || currentUser?.district}
                </div>
              </div>
              <div
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  onNavigate('/login');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                <LogOut size={16} />
                <span>Sign Out of Portal</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
