import React, { useState } from 'react';
import { DISTRICT_TALUKS_MAP } from '../data/stateDistrictMapData';
import { MapPin, Sparkles, ArrowRight, Building2, ShieldCheck } from 'lucide-react';

export default function DistrictVisualTalukMap({
  districtObj,
  stateObj,
  onSelectTaluk
}) {
  const [hoveredTalukId, setHoveredTalukId] = useState(districtObj.taluks?.[0]?.id || 'chidambaram-taluk');

  const talukShapes = DISTRICT_TALUKS_MAP[districtObj.id] ||
                      districtObj.taluks?.map((t, idx) => ({
                        id: t.id,
                        name: t.name,
                        color: t.color || (idx % 2 === 0 ? '#8B5CF6' : '#06B6D4'),
                        path: `M${80 + (idx % 3) * 160},${80 + Math.floor(idx / 3) * 160} L${220 + (idx % 3) * 160},${80 + Math.floor(idx / 3) * 160} L${200 + (idx % 3) * 160},${220 + Math.floor(idx / 3) * 160} L${60 + (idx % 3) * 160},${220 + Math.floor(idx / 3) * 160} Z`,
                        cx: 140 + (idx % 3) * 160,
                        cy: 150 + Math.floor(idx / 3) * 160,
                        hq: t.headquarters,
                        highlights: t.highlights
                      })) || [];

  const currentHoveredTaluk = talukShapes.find(t => t.id === hoveredTalukId) || talukShapes[0] || {
    name: 'Chidambaram Taluk',
    hq: 'Chidambaram',
    highlights: 'Lord Nataraja Cosmic Temple and Annamalai University',
    color: '#8B5CF6'
  };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'minmax(460px, 1fr) 360px', gap: 28,
      background: 'rgba(255,255,255,0.03)', border: `1px solid ${districtObj.color || '#06B6D4'}44`,
      borderRadius: 28, padding: 32, backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)', alignItems: 'center'
    }}>
      {/* ── LEFT: INTERACTIVE MULTI-COLORED TALUK SVG MAP ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 12
        }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: districtObj.color || '#06B6D4', letterSpacing: 2 }}>
            🗺️ DISTRICT TALUK GEOGRAPHIC MAP
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>
            Click on your Taluk to open Citizen Services Login
          </div>
        </div>

        <div style={{
          width: '100%', maxWidth: 540, height: 420, position: 'relative',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(7,11,22,0.85) 80%)',
          borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
        }}>
          <svg
            viewBox="60 40 500 350"
            style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.7))' }}
          >
            <defs>
              <filter id="talukGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {talukShapes.map(taluk => {
              const isHov = hoveredTalukId === taluk.id;
              const fillCol = taluk.color || '#8B5CF6';

              return (
                <g key={taluk.id} style={{ cursor: 'pointer' }}>
                  <path
                    d={taluk.path}
                    fill={fillCol}
                    fillOpacity={isHov ? 0.95 : 0.65}
                    stroke={isHov ? '#ffffff' : 'rgba(255,255,255,0.4)'}
                    strokeWidth={isHov ? 3 : 1.5}
                    filter={isHov ? 'url(#talukGlow)' : 'none'}
                    style={{ transition: 'all 0.2s ease' }}
                    onMouseEnter={() => setHoveredTalukId(taluk.id)}
                    onClick={() => onSelectTaluk(taluk)}
                  />

                  {/* Taluk Center Marker */}
                  <circle
                    cx={taluk.cx}
                    cy={taluk.cy}
                    r={isHov ? 6 : 4}
                    fill="#ffffff"
                    stroke={fillCol}
                    strokeWidth={2}
                    pointerEvents="none"
                  />

                  <text
                    x={taluk.cx}
                    y={taluk.cy - 10}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={isHov ? "13" : "11"}
                    fontWeight={isHov ? "900" : "700"}
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
                  >
                    {taluk.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10 }}>
          💡 Each Taluk is rendered in a distinct color representing regional jurisdiction
        </div>
      </div>

      {/* ── RIGHT: SELECTED TALUK SPOTLIGHT & LOGIN GATEWAY ── */}
      <div style={{
        background: 'rgba(7,11,22,0.85)', border: `1px solid ${currentHoveredTaluk.color || '#8B5CF6'}66`,
        borderRadius: 24, padding: 26, boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 420
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{
              background: `${currentHoveredTaluk.color || '#8B5CF6'}25`,
              color: currentHoveredTaluk.color || '#8B5CF6',
              fontSize: 11, fontWeight: 900, padding: '4px 12px', borderRadius: 12, textTransform: 'uppercase'
            }}>
              TALUK JURISDICTION
            </span>
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: currentHoveredTaluk.color || '#8B5CF6' }} />
          </div>

          <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '4px 0 6px' }}>
            {currentHoveredTaluk.name}
          </h3>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>
            🏛️ Headquarters: <strong style={{ color: '#fff' }}>{currentHoveredTaluk.hq || currentHoveredTaluk.headquarters}</strong>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '14px 16px',
            fontSize: 13, color: '#D1D5DB', lineHeight: 1.6, marginBottom: 16
          }}>
            💡 {currentHoveredTaluk.highlights}
          </div>

          <div style={{ fontSize: 11, color: '#10B981', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} /> Ready for Regional Government Services Login
          </div>
        </div>

        <button
          onClick={() => onSelectTaluk(currentHoveredTaluk)}
          style={{
            width: '100%', padding: '14px 0',
            background: `linear-gradient(135deg, ${currentHoveredTaluk.color || '#8B5CF6'}, #673AB7)`,
            border: 'none', borderRadius: 14, color: '#fff',
            fontSize: 14, fontWeight: 900, cursor: 'pointer',
            boxShadow: `0 6px 20px ${currentHoveredTaluk.color || '#8B5CF6'}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}
        >
          <span>Enter {currentHoveredTaluk.name} Portal</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
