import React from 'react';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AccessDenied({ requiredRole = 'Higher Administrative Authority', onGoBack }) {
  const { currentUser, switchRole } = useAuth();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(124, 58, 237, 0.04) 100%)'
    }}>
      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 20px 40px -15px rgba(220, 38, 38, 0.15)',
        border: '1px solid #fee2e2',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#fef2f2',
          border: '2px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          color: '#dc2626'
        }}>
          <ShieldAlert size={42} />
        </div>

        <div style={{
          display: 'inline-block',
          background: '#fee2e2',
          color: '#b91c1c',
          fontWeight: '800',
          fontSize: '12px',
          letterSpacing: '1px',
          padding: '4px 14px',
          borderRadius: '20px',
          marginBottom: '16px'
        }}>
          HTTP 403 — FORBIDDEN ACCESS
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
          Access Restricted by RBAC Policy
        </h2>

        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '24px' }}>
          Your current session is authenticated as <strong>{currentUser?.name}</strong> with role 
          <span style={{
            display: 'inline-block',
            background: '#ede9fe',
            color: '#6d28d9',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '6px',
            margin: '0 6px'
          }}>
            {currentUser?.role}
          </span>.
          This module requires <strong>{requiredRole}</strong> privileges.
        </p>

        <div style={{
          background: '#f9fafb',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '28px',
          border: '1px solid #e5e7eb',
          fontSize: '13px',
          color: '#6b7280',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', fontWeight: '700', marginBottom: '6px' }}>
            <Lock size={15} color="#dc2626" />
            Security & Auditing Notice
          </div>
          All unauthorized route access attempts are cryptographically timestamped and recorded in the Ultra Super Admin Global Audit Trail.
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onGoBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
            }}
          >
            <Home size={16} /> Return to My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
