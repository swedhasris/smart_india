import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function NotificationsPageView({
  onOpenTracking,
  onOpenService,
  onOpenGateway
}) {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Income Certificate Under Review',
      message: 'Your application GOV-2026-123456 has cleared VAO document validation and is currently undergoing Revenue Officer approval.',
      time: '12 minutes ago',
      type: 'update',
      icon: '💰',
      read: false,
      actionText: 'Track Status Timeline',
      actionType: 'tracking'
    },
    {
      id: '2',
      title: 'New Government Housing Scheme Alert',
      message: 'You are eligible for the State Urban Housing Scheme (PMAY-U) with pre-verified income and zero-friction clearance.',
      time: '3 hours ago',
      type: 'scheme',
      icon: '🏠',
      read: false,
      actionText: 'View Inter-Dept Gateway',
      actionType: 'gateway'
    },
    {
      id: '3',
      title: 'Additional Address Document Required',
      message: 'Additional verification document needed for Driving Licence Smartcard request GOV-2026-612094.',
      time: '1 day ago',
      type: 'action',
      icon: '⚠️',
      read: true,
      actionText: 'Upload Additional Document',
      actionType: 'tracking'
    },
    {
      id: '4',
      title: 'PM-KISAN DBT Direct Credit Released',
      message: 'Direct benefit transfer of ₹2,000 processed to your Aadhaar linked bank account via PFMS.',
      time: '3 days ago',
      type: 'update',
      icon: '🌾',
      read: true,
      actionText: 'View Financial Record',
      actionType: null
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="notifications-desktop-page">
      <div className="section-heading-group">
        <div>
          <h1 className="section-main-title">Notifications & Official Circulars</h1>
          <p className="section-main-subtitle">
            Stay updated on application progress, eligible state schemes, and document requirements.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="content-card"
            style={{
              background: n.read ? 'white' : '#FDFBFF',
              borderColor: n.read ? '#E5E7EB' : '#673AB7',
              borderLeft: n.read ? '1px solid #E5E7EB' : '5px solid #673AB7',
              boxShadow: n.read ? 'var(--shadow-xs)' : 'var(--shadow-md)',
              marginBottom: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: n.read ? '#F3F4F6' : '#F3E5F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  {n.icon}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>
                      {n.title}
                    </h3>
                    {!n.read && (
                      <span style={{ background: '#F3E5F5', color: '#673AB7', fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '10px' }}>
                        New
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '6px', lineHeight: 1.5 }}>
                    {n.message}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {n.time}
                    </span>

                    {n.actionText && (
                      <button
                        onClick={() => {
                          if (n.actionType === 'tracking') onOpenTracking();
                          if (n.actionType === 'gateway') onOpenGateway();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#673AB7',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {n.actionText} <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
