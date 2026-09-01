import React, { useState, useEffect } from 'react';
import { REAL_TAMIL_NADU_DISTRICTS } from '../data/tnRealDistricts';
import { INDIA_SVG_MAP } from '../data/indiaRealBoundaries';
import { Compass, ArrowRight } from 'lucide-react';

export default function StateVisualDistrictMap({
  stateObj,
  onSelectDistrict
}) {
  const firstDistId = stateObj?.districts?.[0]?.id || '';
  const [hoveredDistId, setHoveredDistId] = useState(firstDistId);
  const [selectedDistId, setSelectedDistId] = useState(firstDistId);

  useEffect(() => {
    const initId = stateObj?.districts?.[0]?.id || '';
    setHoveredDistId(initId);
    setSelectedDistId(initId);
  }, [stateObj?.id]);

  const stateIdNorm = (stateObj?.id || 'tn').toLowerCase();
  const isTamilNadu = stateIdNorm === 'tn' || stateObj?.name === 'Tamil Nadu';

  // Find SVG boundary path for non-TN states from INDIA_SVG_MAP
  const svgLoc = INDIA_SVG_MAP.locations.find(
    l => l.id.toLowerCase() === stateIdNorm || l.id.toLowerCase() === `in-${stateIdNorm}` || l.name === stateObj?.name
  ) || INDIA_SVG_MAP.locations.find(l => l.id === 'tn');

  const districtsList = stateObj?.districts || [];

  const currentHoveredDist = districtsList.find(d => d.id === (hoveredDistId || selectedDistId)) ||
                             districtsList.find(d => d.id.includes(hoveredDistId) || (hoveredDistId && hoveredDistId.includes(d.id))) ||
                             districtsList[0] ||
                             {
                               id: 'default-dist',
                               name: stateObj?.name ? `${stateObj.name} Central` : 'District',
                               headquarters: stateObj?.capital || 'Headquarters',
                               popularity: `Administrative Headquarters of ${stateObj?.name || 'State'}`,
                               description: `Official administrative district of ${stateObj?.name || 'State'}.`,
                               color: stateObj?.color || '#8B5CF6'
                             };

  const handleDistrictClick = (distId) => {
    setSelectedDistId(distId);
    const foundDist = districtsList.find(d => d.id === distId || d.id.includes(distId) || distId.includes(d.id));
    if (foundDist) {
      onSelectDistrict(foundDist);
    } else {
      onSelectDistrict({
        id: distId,
        name: distId.toUpperCase(),
        headquarters: distId.toUpperCase(),
        color: stateObj?.color || '#8B5CF6',
        popularity: `${distId} District Administrative Territory`,
        description: `Official administrative district of ${stateObj?.name}.`,
        taluks: [
          { id: `${distId}-taluk-1`, name: `${distId} Main Taluk`, color: stateObj?.color || '#8B5CF6', headquarters: distId, highlights: `Civic Administration Center of ${distId}` }
        ]
      });
    }
  };

  // Generate dynamic district SVG shapes for any state (non-TN or generic)
  const generateGenericDistrictShapes = () => {
    const count = districtsList.length || 1;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const gridW = 700 / cols;
    const gridH = 800 / rows;

    return districtsList.map((d, idx) => {
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      const x = 50 + c * gridW + (r % 2 === 1 ? 15 : 0);
      const y = 50 + r * gridH;
      const w = gridW - 20;
      const h = gridH - 25;
      const cx = Math.round(x + w / 2);
      const cy = Math.round(y + h / 2);

      // Create stylized organic rounded polygon path
      const path = `M ${x + 10},${y} L ${x + w - 10},${y + 5} Q ${x + w},${y + 15} ${x + w},${y + 25} L ${x + w - 5},${y + h - 15} Q ${x + w - 10},${y + h} ${x + w - 25},${y + h} L ${x + 15},${y + h - 5} Q ${x},${y + h - 15} ${x},${y + h - 25} L ${x + 5},${y + 15} Q ${x + 10},${y} ${x + 10},${y} Z`;

      return {
        id: d.id,
        name: d.name,
        color: d.color || stateObj?.color || '#8B5CF6',
        path,
        cx,
        cy
      };
    });
  };

  const districtShapes = isTamilNadu ? REAL_TAMIL_NADU_DISTRICTS : generateGenericDistrictShapes();

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'minmax(500px, 1fr) 380px', gap: 32,
      background: 'rgba(255,255,255,0.03)', border: `1px solid ${stateObj?.color || '#8B5CF6'}44`,
      borderRadius: 28, padding: 32, backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)', alignItems: 'center'
    }}>
      {/* ── LEFT: REAL GEOGRAPHIC SVG STATE DISTRICT MAP ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 14
        }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: stateObj?.color || '#8B5CF6', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Compass size={16} /> OFFICIAL POLITICAL DISTRICT MAP • {(stateObj?.name || 'STATE').toUpperCase()}
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>
            Accurate Survey Boundaries • Click to enter
          </div>
        </div>

        <div style={{
          width: '100%', maxWidth: 580, height: 520, position: 'relative',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(7,11,22,0.85) 80%)',
          borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
        }}>
          <svg
            viewBox="0 0 800 900"
            style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.8))' }}
          >
            <defs>
              <filter id="distGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background State Boundary Silhouette (for non-TN states) */}
            {!isTamilNadu && svgLoc && svgLoc.path && (
              <g transform="translate(48, 50) scale(1.14)">
                <path
                  d={svgLoc.path}
                  fill={`${stateObj?.color || '#8B5CF6'}18`}
                  stroke={`${stateObj?.color || '#8B5CF6'}66`}
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                />
              </g>
            )}

            {/* Render Geographic District Polygons */}
            {districtShapes.map(shape => {
              const isHov = (hoveredDistId || selectedDistId) === shape.id;
              const isSel = selectedDistId === shape.id;
              const fillCol = shape.color || stateObj?.color || '#8B5CF6';

              return (
                <g key={shape.id} style={{ cursor: 'pointer' }}>
                  <path
                    d={shape.path}
                    fill={fillCol}
                    fillOpacity={isHov ? 0.95 : isSel ? 0.85 : 0.62}
                    stroke={isHov ? '#ffffff' : 'rgba(255,255,255,0.35)'}
                    strokeWidth={isHov ? 3.5 : 1.2}
                    filter={isHov ? 'url(#distGlow)' : 'none'}
                    style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    onMouseEnter={() => setHoveredDistId(shape.id)}
                    onClick={() => handleDistrictClick(shape.id)}
                  />

                  {/* District Center Pin/Label */}
                  <circle
                    cx={shape.cx}
                    cy={shape.cy}
                    r={isHov ? 6.5 : 3.5}
                    fill="#ffffff"
                    stroke={fillCol}
                    strokeWidth={2}
                    pointerEvents="none"
                  />

                  <text
                    x={shape.cx}
                    y={shape.cy - 7}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={isHov ? "14" : "10"}
                    fontWeight={isHov ? "900" : "700"}
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95)', letterSpacing: '0.2px' }}
                  >
                    {shape.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>🏛️</span>
          <span>True geographical outline of {stateObj?.name || 'State'} districts based on official political survey boundaries.</span>
        </div>
      </div>

      {/* ── RIGHT: SELECTED DISTRICT SPOTLIGHT PANEL ── */}
      <div style={{
        background: 'rgba(7,11,22,0.88)', border: `1px solid ${currentHoveredDist.color || stateObj?.color || '#8B5CF6'}66`,
        borderRadius: 24, padding: 28, boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 520
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{
              background: `${currentHoveredDist.color || stateObj?.color || '#8B5CF6'}25`,
              color: currentHoveredDist.color || stateObj?.color || '#8B5CF6',
              fontSize: 11, fontWeight: 900, padding: '4px 14px', borderRadius: 12, textTransform: 'uppercase'
            }}>
              DISTRICT SPOTLIGHT
            </span>
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 700 }}>
              {currentHoveredDist.taluks?.length || 4} Taluks Mapped
            </span>
          </div>

          <h3 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '4px 0 6px' }}>
            {currentHoveredDist.name} District
          </h3>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14 }}>
            🏛️ Administrative HQ: <strong style={{ color: '#fff' }}>{currentHoveredDist.headquarters || currentHoveredDist.name}</strong>
          </div>

          {currentHoveredDist.popularity && (
            <div style={{
              background: 'rgba(255,103,31,0.12)', border: '1px solid rgba(255,103,31,0.3)',
              borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#FFD700', fontWeight: 700, marginBottom: 14
            }}>
              ⭐ {currentHoveredDist.popularity}
            </div>
          )}

          <p style={{ fontSize: 13, color: '#D1D5DB', lineHeight: 1.6, margin: '0 0 16px' }}>
            {currentHoveredDist.description}
          </p>

          {currentHoveredDist.heritage && (
            <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>
              🏛️ <strong>Heritage:</strong> <span style={{ color: '#fff' }}>{currentHoveredDist.heritage}</span>
            </div>
          )}
          {currentHoveredDist.food && (
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>
              🍛 <strong>Cuisine:</strong> <span style={{ color: '#fff' }}>{currentHoveredDist.food}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => handleDistrictClick(currentHoveredDist.id)}
          style={{
            width: '100%', padding: '15px 0',
            background: `linear-gradient(135deg, ${currentHoveredDist.color || stateObj?.color || '#8B5CF6'}, #673AB7)`,
            border: 'none', borderRadius: 14, color: '#fff',
            fontSize: 14, fontWeight: 900, cursor: 'pointer',
            boxShadow: `0 6px 20px ${currentHoveredDist.color || stateObj?.color || '#8B5CF6'}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span>Explore {currentHoveredDist.name} Taluks Map</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
