import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Sparkles, FileUp, ChevronRight } from 'lucide-react';

export default function NotificationsView({ onNavigateToTracking, onNavigateToService, onNavigateToVisualizer }) {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Income Certificate Update',
      message: 'Your application GOV-894210 has been verified by the Village Administrative Officer and approved by Tahsildar.',
      time: '10 mins ago',
      type: 'update',
      icon: '🔔',
      read: false,
      actionLabel: 'View Certificate',
      action: onNavigateToTracking
    },
    {
      id: '2',
      title: 'New Government Scheme Alert',
      message: 'You may be eligible for the State Urban Housing Board Scheme under EWS category with auto-verified income.',
      time: '2 hours ago',
      type: 'scheme',
      icon: '🏠',
      read: false,
      actionLabel: 'Explore Scheme',
      action: onNavigateToVisualizer
    },
    {
      id: '3',
      title: 'Document Action Required',
      message: 'Additional address document required for Driving Licence application GOV-612094.',
      time: '1 day ago',
      type: 'action',
      icon: '⚠️',
      read: true,
      actionLabel: 'Upload Document',
      action: onNavigateToTracking
    },
    {
      id: '4',
      title: 'PM-KISAN Farmer Assistance Released',
      message: 'Direct benefit transfer of ₹2,000 processed to your linked bank account.',
      time: '2 days ago',
      type: 'update',
      icon: '🌾',
      read: true,
      actionLabel: 'Check DBT Status',
      action: null
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="notifications-page">
      <div className="section-header">
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#673AB7', textTransform: 'uppercase' }}>
            Alerts & Notices
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a2e' }}>
            Notifications
          </h1>
        </div>
        <button
          onClick={markAllRead}
          style={{ background: 'none', border: 'none', color: '#673AB7', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
        >
          Mark all as read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="detail-card"
            style={{
              background: notif.read ? 'white' : '#F7F5FF',
              borderColor: notif.read ? '#e9ecef' : '#673AB7',
              boxShadow: notif.read ? '0 2px 8px rgba(0,0,0,0.03)' : '0 4px 16px rgba(103, 58, 183, 0.1)'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '42px',
                height: '44px',
                borderRadius: '50%',
                background: notif.read ? '#f4f5fa' : '#F3E5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0
              }}>
                {notif.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1a1a2e' }}>
                    {notif.title}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#6c757d' }}>{notif.time}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px', lineHeight: 1.4 }}>
                  {notif.message}
                </p>

                {notif.actionLabel && (
                  <button
                    onClick={notif.action}
                    style={{
                      marginTop: '10px',
                      background: '#673AB7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {notif.actionLabel} <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
