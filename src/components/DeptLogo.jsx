import React, { useState } from 'react';
import { DEPT_LOGOS_MAP } from '../data/deptLogos';

/**
 * Official Indian Government Department Logo Component
 * Renders high quality logo images from official government portals & Wikimedia Commons,
 * with automatic fallback to crisp SVG government insignia seals.
 */
export default function DeptLogo({ deptId, name, size = 42, className = '', style = {} }) {
  const [hasError, setHasError] = useState(false);
  const info = DEPT_LOGOS_MAP[deptId] || DEPT_LOGOS_MAP[deptId?.toLowerCase()] || DEPT_LOGOS_MAP.default;

  // Primary image rendering
  if (!hasError && info && info.url) {
    return (
      <div 
        className={`dept-logo-container ${className}`}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: '50%',
          padding: typeof size === 'number' ? `${Math.max(2, size * 0.08)}px` : '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.06)',
          flexShrink: 0,
          overflow: 'hidden',
          ...style
        }}
      >
        <img
          src={info.url}
          alt={name || info.name || 'Government Department Logo'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '2px'
          }}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // High Quality SVG Fallback Seal (State Emblem of India Insignia Badge)
  return (
    <div
      className={`dept-logo-seal ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${info.color} 0%, #1a1a2e 100%)`,
        color: '#FFFFFF',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
        border: '2px solid #FFD700',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        ...style
      }}
      title={info.officialMinistry || info.name}
    >
      <svg 
        viewBox="0 0 100 100" 
        width="65%" 
        height="65%" 
        fill="currentColor"
      >
        {/* Ashoka Stambha / Chakra Motif SVG Representation */}
        <circle cx="50" cy="50" r="44" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeDasharray="4 2" />
        <path d="M50 15 L53 35 L68 22 L58 40 L78 40 L60 50 L78 60 L58 60 L68 78 L53 65 L50 85 L47 65 L32 78 L42 60 L22 60 L40 50 L22 40 L42 40 L32 22 L47 35 Z" fill="#FFD700" opacity="0.9" />
        <circle cx="50" cy="50" r="14" fill="#FFD700" />
        <circle cx="50" cy="50" r="8" fill={info.color} />
      </svg>
      <span style={{
        fontSize: typeof size === 'number' ? `${Math.max(8, size * 0.18)}px` : '9px',
        fontWeight: '900',
        letterSpacing: '0.5px',
        color: '#FFD700',
        lineHeight: 1,
        marginTop: '-2px',
        textTransform: 'uppercase'
      }}>
        {info.code}
      </span>
    </div>
  );
}
