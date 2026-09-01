import React, { useState, useEffect } from 'react';
import { FAMOUS_PLACES_DETAIL_DATA } from '../data/famousPlacesDetailData';
import {
  ArrowLeft, MapPin, Compass, Landmark, ShieldCheck, Award,
  Sparkles, Clock, Calendar, Globe, BookOpen, Layers, Info, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function FamousPlaceDetailExplorer({
  placeId = 'brihadeeswarar',
  onClose,
  onSelectPlace,
  onSelectDistrict,
  onSelectState,
  onBackToIndia
}) {
  // Retrieve detailed data or fallback to Brihadisvara
  const currentData = FAMOUS_PLACES_DETAIL_DATA[placeId] || FAMOUS_PLACES_DETAIL_DATA['brihadeeswarar'];

  const [activePart, setActivePart] = useState(currentData.parts?.[0] || null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentData.parts?.length > 0) {
      setActivePart(currentData.parts[0]);
    }
  }, [placeId]);

  if (!currentData) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9000, background: '#070b16', color: '#fff',
      overflowY: 'auto', overflowX: 'hidden'
    }}>
      {/* ── 1. TOP BREADCRUMB & CONTROL NAVIGATION BAR ── */}
      <header style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 36px',
        background: 'rgba(7,11,22,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Dynamic Breadcrumb Trail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 800 }}>
          <span
            onClick={onBackToIndia}
            style={{ cursor: 'pointer', color: '#9CA3AF', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FF671F'}
            onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
          >
            🇮🇳 INDIA
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
          <span
            onClick={() => onSelectState && onSelectState({ id: currentData.stateId, name: currentData.stateName })}
            style={{ cursor: 'pointer', color: '#9CA3AF', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FF671F'}
            onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
          >
            {currentData.stateName.toUpperCase()}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
          <span
            onClick={() => onSelectDistrict && onSelectDistrict({ id: currentData.districtId, name: currentData.districtName })}
            style={{ cursor: 'pointer', color: '#9CA3AF', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FF671F'}
            onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
          >
            {currentData.districtName.toUpperCase()} DISTRICT
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
          <span style={{ color: '#FF671F' }}>
            {currentData.name.toUpperCase()}
          </span>
        </div>

        {/* Back Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #FF671F, #FF8C42)', border: 'none',
              borderRadius: 20, padding: '8px 22px', fontSize: 13, fontWeight: 900, color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(255,103,31,0.4)'
            }}
          >
            <ArrowLeft size={16} /> Return to Main Exploration
          </button>
        </div>
      </header>


      {/* ── 2. HERO CINEMATIC BANNER ── */}
      <section style={{
        position: 'relative', minHeight: '80vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '60px 48px',
        backgroundImage: `linear-gradient(180deg, rgba(7,11,22,0.3) 0%, rgba(7,11,22,0.92) 80%, #070b16 100%), url(${currentData.heroImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          {/* Heritage Badge */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <span style={{
              background: 'rgba(255,103,31,0.9)', color: '#fff', fontSize: 11, fontWeight: 900,
              padding: '5px 16px', borderRadius: 20, letterSpacing: 1, textTransform: 'uppercase'
            }}>
              🏛️ {currentData.category}
            </span>
            {currentData.heritageStatus && (
              <span style={{
                background: 'rgba(16,185,129,0.9)', color: '#fff', fontSize: 11, fontWeight: 900,
                padding: '5px 16px', borderRadius: 20, letterSpacing: 1
              }}>
                🏆 {currentData.heritageStatus}
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: '#fff',
            margin: '0 0 8px', letterSpacing: '-0.5px', textShadow: '0 4px 20px rgba(0,0,0,0.8)'
          }}>
            {currentData.name}
          </h1>

          <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#FF9933', fontWeight: 700, marginBottom: 16 }}>
            📍 {currentData.location} • <span style={{ color: '#D1D5DB' }}>{currentData.subtitle}</span>
          </div>

          <p style={{ fontSize: 16, color: '#E5E7EB', maxWidth: 850, lineHeight: 1.7, margin: '0 0 28px' }}>
            "{currentData.bestKnownFor}"
          </p>

          {/* Quick Stats Bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16,
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 20
          }}>
            {currentData.quickStats?.map((stat, idx) => (
              <div key={idx}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', marginTop: 4 }}>
                  {stat.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 3. GEOGRAPHICAL HIERARCHY MAP CHAIN ── */}
      <section style={{ padding: '36px 48px', background: '#0a0f1d', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#FF671F', letterSpacing: 2, marginBottom: 12, textAlign: 'center' }}>
            GEOGRAPHICAL & REGIONAL CONTEXT
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12,
            background: 'rgba(255,255,255,0.02)', padding: '14px 24px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>🇮🇳 INDIA</span>
            <ChevronRight size={16} color="#9CA3AF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FF9933' }}>{currentData.stateName}</span>
            <ChevronRight size={16} color="#9CA3AF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#34D399' }}>{currentData.districtName} District</span>
            <ChevronRight size={16} color="#9CA3AF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#60A5FA' }}>{currentData.talukName}</span>
            <ChevronRight size={16} color="#9CA3AF" />
            <span style={{ fontSize: 13, fontWeight: 900, color: '#A78BFA' }}>📍 {currentData.name}</span>
          </div>
        </div>
      </section>


      {/* ── 4. WHAT MAKES IT FAMOUS (VISUAL BADGES) ── */}
      <section style={{ padding: '40px 48px', background: '#070b16' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#046A38', letterSpacing: 2, marginBottom: 10 }}>
            HALLMARKS OF DISTINCTION
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '0 0 24px' }}>
            What Makes {currentData.name} Famous?
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {currentData.famousFor?.map((badge, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,103,31,0.3)',
                borderRadius: 20, padding: '10px 20px', fontSize: 13, fontWeight: 800, color: '#F3F4F6',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <Sparkles size={14} color="#FF671F" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 5. THE COMPLETE FACTUAL STORY ── */}
      <section style={{ padding: '70px 48px', background: '#0d1322', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#FF671F', letterSpacing: 2, textTransform: 'uppercase' }}>
              FACTUAL HISTORICAL NARRATIVE
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', margin: '8px 0' }}>
              The Complete Story
            </h2>
            <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 650, margin: '0 auto' }}>
              Tracing the origins, royal patronage, engineering triumphs, and living legacy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>👑</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#FF9933', margin: '0 0 10px' }}>Origin & Commission</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{currentData.story?.origin}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>⛏️</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#34D399', margin: '0 0 10px' }}>Construction & Guilds</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{currentData.story?.construction}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>📜</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#60A5FA', margin: '0 0 10px' }}>Imperial Role</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{currentData.story?.historicalRole}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>✨</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#A78BFA', margin: '0 0 10px' }}>Living Legacy Today</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{currentData.story?.modernRole}</p>
            </div>
          </div>
        </div>
      </section>


      {/* ── 6. INTERACTIVE HISTORICAL TIMELINE ── */}
      <section style={{ padding: '70px 48px', background: '#070b16' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#34D399', letterSpacing: 2 }}>
              CHRONOLOGICAL CHRONICLE
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', margin: '8px 0' }}>
              Historical Timeline
            </h2>
          </div>

          {/* Horizontal Clickable Nodes */}
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 20, marginBottom: 30 }}>
            {currentData.timeline?.map((node, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineIdx(idx)}
                style={{
                  background: activeTimelineIdx === idx ? 'linear-gradient(135deg, #FF671F, #FF8C42)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeTimelineIdx === idx ? '#FF671F' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 20, padding: '12px 24px', flexShrink: 0, cursor: 'pointer',
                  color: '#fff', transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 900, color: activeTimelineIdx === idx ? '#fff' : '#FF9933' }}>
                  {node.year}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>
                  {node.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Node Detail Card */}
          {currentData.timeline?.[activeTimelineIdx] && (
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,103,31,0.4)',
              borderRadius: 24, padding: 32, display: 'flex', alignItems: 'center', gap: 24
            }}>
              <div style={{
                fontSize: 32, fontWeight: 900, color: '#FF671F', background: 'rgba(255,103,31,0.15)',
                padding: '16px 28px', borderRadius: 20, flexShrink: 0
              }}>
                {currentData.timeline[activeTimelineIdx].year}
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 8px' }}>
                  {currentData.timeline[activeTimelineIdx].title}
                </h3>
                <p style={{ fontSize: 15, color: '#D1D5DB', lineHeight: 1.6, margin: 0 }}>
                  {currentData.timeline[activeTimelineIdx].desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ── 7. ARCHITECTURE & INTERACTIVE PARTS BREAKDOWN ── */}
      <section style={{ padding: '70px 48px', background: '#0d1322', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#60A5FA', letterSpacing: 2 }}>
              ENGINEERING & DESIGN MARVELS
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', margin: '8px 0' }}>
              Architecture & Interactive Breakdown
            </h2>
            <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 680, margin: '0 auto' }}>
              Click any specific part to explore its design, construction, and historical importance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: 32, alignItems: 'center' }}>
            {/* Left: Interactive Parts List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 }}>
                SELECT ARCHITECTURAL FEATURE:
              </div>
              {currentData.parts?.map(part => (
                <div
                  key={part.id}
                  onClick={() => setActivePart(part)}
                  style={{
                    background: activePart?.id === part.id ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${activePart?.id === part.id ? '#3B82F6' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 18, padding: '16px 20px', cursor: 'pointer',
                    transition: 'all 0.2s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 800, color: activePart?.id === part.id ? '#fff' : '#D1D5DB' }}>
                    {part.name}
                  </div>
                  <ChevronRight size={18} color={activePart?.id === part.id ? '#3B82F6' : '#9CA3AF'} />
                </div>
              ))}
            </div>

            {/* Right: Focused Part Card */}
            {activePart && (
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 35px rgba(0,0,0,0.6)'
              }}>
                <img
                  src={activePart.image}
                  alt={activePart.name}
                  style={{ width: '100%', height: 260, objectFit: 'cover' }}
                />
                <div style={{ padding: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#60A5FA', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                    FEATURE SPOTLIGHT
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 10px' }}>
                    {activePart.name}
                  </h3>
                  <p style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 1.6, margin: '0 0 16px' }}>
                    {activePart.description}
                  </p>
                  <div style={{
                    background: 'rgba(59,130,246,0.1)', borderLeft: '3px solid #3B82F6',
                    padding: '10px 14px', borderRadius: '0 12px 12px 0', fontSize: 13, color: '#93C5FD'
                  }}>
                    💡 <strong>Significance:</strong> {activePart.significance}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ── 8. INTERACTIVE IMAGE HOTSPOTS ── */}
      {currentData.hotspots?.length > 0 && (
        <section style={{ padding: '70px 48px', background: '#070b16' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#A78BFA', letterSpacing: 2 }}>
                VISUAL ANNOTATIONS
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '6px 0' }}>
                Interactive Hotspot Exploration
              </h2>
              <p style={{ fontSize: 14, color: '#9CA3AF' }}>
                Click the glowing pins on the photograph below to inspect structural secrets.
              </p>
            </div>

            <div style={{
              position: 'relative', width: '100%', height: 480, borderRadius: 28, overflow: 'hidden',
              backgroundImage: `url(${currentData.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center',
              border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 15px 40px rgba(0,0,0,0.8)'
            }}>
              {currentData.hotspots.map((spot, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveHotspot(spot)}
                  style={{
                    position: 'absolute', left: `${spot.x}%`, top: `${spot.y}%`,
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(255,103,31,0.9)', border: '3px solid #fff',
                    boxShadow: '0 0 20px #FF671F', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyCenter: 'center',
                    transform: 'translate(-50%, -50%)', transition: 'transform 0.2s',
                    animation: 'pulse 1.5s infinite'
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 900, color: '#fff', margin: '0 auto' }}>{idx + 1}</span>
                </div>
              ))}

              {/* Hotspot Card Overlay */}
              {activeHotspot && (
                <div style={{
                  position: 'absolute', bottom: 20, left: 20, right: 20,
                  background: 'rgba(7,11,22,0.92)', backdropFilter: 'blur(16px)',
                  border: '1px solid #FF671F', borderRadius: 20, padding: 20,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>
                      {activeHotspot.title}
                    </h4>
                    <p style={{ fontSize: 13, color: '#D1D5DB', margin: 0 }}>
                      {activeHotspot.text}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    style={{
                      background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 12,
                      padding: '6px 14px', color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer'
                    }}
                  >
                    Close ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {/* ── 9. DID YOU KNOW? (VERIFIED INTERESTING FACTS) ── */}
      <section style={{ padding: '70px 48px', background: '#0d1322' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#F59E0B', letterSpacing: 2 }}>
              FASCINATING VERIFIED FACTS
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: '6px 0' }}>
              Did You Know?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {currentData.interestingFacts?.map((fact, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 20, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: 24, background: 'rgba(245,158,11,0.15)', padding: '8px 14px', borderRadius: 14, color: '#F59E0B', fontWeight: 900 }}>
                  0{idx + 1}
                </span>
                <p style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 1.6, margin: 0 }}>
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 10. THEN vs NOW & PRESERVATION ── */}
      <section style={{ padding: '70px 48px', background: '#070b16', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 50 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#FF671F', letterSpacing: 1, marginBottom: 8 }}>THEN (HISTORICAL ERA)</div>
              <p style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 1.6, margin: 0 }}>{currentData.thenNow?.then}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 24, padding: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#10B981', letterSpacing: 1, marginBottom: 8 }}>NOW (MODERN DAY PRESERVATION)</div>
              <p style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 1.6, margin: 0 }}>{currentData.thenNow?.now}</p>
            </div>
          </div>

          {/* Preservation Details */}
          <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 24, padding: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: '#10B981', letterSpacing: 2, marginBottom: 6 }}>
              🛡️ PRESERVATION & HERITAGE PROTECTION
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>
              Managed by {currentData.preservation?.authority}
            </h3>
            <p style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 1.6, marginBottom: 16 }}>
              {currentData.preservation?.efforts}
            </p>
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>
              📌 <strong>Visitor Code:</strong> {currentData.preservation?.tourismRules}
            </div>
          </div>
        </div>
      </section>


      {/* ── 11. VISITOR INFORMATION ── */}
      {currentData.visitorInfo && (
        <section style={{ padding: '60px 48px', background: '#0d1322' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#3B82F6', letterSpacing: 2 }}>
                PRACTICAL GUIDE
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '6px 0' }}>
                Visitor Information
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#3B82F6' }}>⏰ OPENING HOURS</div>
                <div style={{ fontSize: 13, color: '#fff', marginTop: 4, fontWeight: 700 }}>{currentData.visitorInfo.hours}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#10B981' }}>🎟️ TICKET / ENTRY</div>
                <div style={{ fontSize: 13, color: '#fff', marginTop: 4, fontWeight: 700 }}>{currentData.visitorInfo.entry}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#F59E0B' }}>🗓️ BEST TIME TO VISIT</div>
                <div style={{ fontSize: 13, color: '#fff', marginTop: 4, fontWeight: 700 }}>{currentData.visitorInfo.bestTime}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#EC4899' }}>♿ ACCESSIBILITY</div>
                <div style={{ fontSize: 13, color: '#fff', marginTop: 4, fontWeight: 700 }}>{currentData.visitorInfo.accessibility}</div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ── 12. EXPLORE NEARBY ATTRACTIONS ── */}
      {currentData.nearbyPlaces?.length > 0 && (
        <section style={{ padding: '70px 48px 100px', background: '#070b16' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#FF671F', letterSpacing: 2 }}>
                REGIONAL EXPLORATION
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: '6px 0' }}>
                Explore Nearby Places
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {currentData.nearbyPlaces.map(near => (
                <div
                  key={near.id}
                  onClick={() => onSelectPlace && onSelectPlace(near.id)}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#FF671F';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <img
                    src={near.image}
                    alt={near.name}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }}
                  />
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#FF9933', marginBottom: 4 }}>📍 {near.location}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>{near.name}</h3>
                    <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 12px', lineHeight: 1.5 }}>{near.desc}</p>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#FF671F' }}>Explore Place Story →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
