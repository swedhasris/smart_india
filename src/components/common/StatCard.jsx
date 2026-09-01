import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: IconComponent,
  color = '#7c3aed',
  trend = null,
  isPositive = true,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '22px 24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </span>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          {IconComponent && <IconComponent size={22} />}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
          {value}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
            {subtitle}
          </span>

          {trend && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '20px',
              background: isPositive ? '#ecfdf5' : '#fef2f2',
              color: isPositive ? '#059669' : '#dc2626'
            }}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
