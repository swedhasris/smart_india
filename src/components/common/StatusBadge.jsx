import React from 'react';

export default function StatusBadge({ status }) {
  const getBadgeStyle = (st) => {
    const s = (st || '').toLowerCase();
    switch (s) {
      case 'approved':
      case 'completed':
      case 'resolved':
      case 'valid':
      case 'verified':
        return {
          bg: '#ecfdf5',
          border: '#a7f3d0',
          text: '#059669',
          icon: '🟢',
          label: 'Approved / Verified'
        };
      case 'reviewing':
      case 'under review':
      case 'forwarded':
        return {
          bg: '#f5f3ff',
          border: '#ddd6fe',
          text: '#7c3aed',
          icon: '🟣',
          label: 'Under Review'
        };
      case 'verifying':
      case 'under verification':
      case 'assigned':
      case 'investigating':
        return {
          bg: '#eff6ff',
          border: '#bfdbfe',
          text: '#2563eb',
          icon: '🔵',
          label: 'Under Verification'
        };
      case 'pending':
      case 'submitted':
      case 'received':
        return {
          bg: '#fefce8',
          border: '#fef08a',
          text: '#ca8a04',
          icon: '🟡',
          label: 'Pending'
        };
      case 'rejected':
      case 'invalid':
      case 'closed':
        return {
          bg: '#fef2f2',
          border: '#fecaca',
          text: '#dc2626',
          icon: '🔴',
          label: 'Rejected'
        };
      default:
        return {
          bg: '#f8fafc',
          border: '#e2e8f0',
          text: '#64748b',
          icon: '⚪',
          label: st || 'Unknown'
        };
    }
  };

  const badge = getBadgeStyle(status);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '700',
      background: badge.bg,
      border: `1px solid ${badge.border}`,
      color: badge.text,
      whiteSpace: 'nowrap'
    }}>
      <span style={{ fontSize: '10px' }}>{badge.icon}</span>
      <span>{badge.label}</span>
    </span>
  );
}
