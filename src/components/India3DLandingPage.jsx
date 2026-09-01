import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  MapPin,
  Building2,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  Search,
  BookOpen,
  Award,
  Globe,
  Layers,
  Heart,
  Landmark
} from 'lucide-react';

import India3DCanvas from './India3DCanvas';
import StateVisualDistrictMap from './StateVisualDistrictMap';
import InteractiveRealDistrictTalukMap from './InteractiveRealDistrictTalukMap';
import FamousPlaceDetailExplorer from './FamousPlaceDetailExplorer';
import {
  INDIA_3D_STATES,
  FREEDOM_FIGHTERS,
  POPULAR_WONDERS_OF_INDIA,
  STATE_COLOR_PALETTE,
  INDIA_SPACE_MILESTONES,
  NATIONAL_LEGENDS
} from '../data/india3dData';
import { getStateMetadata } from '../data/indiaRealBoundaries';

const STATE_MAP = INDIA_3D_STATES.reduce((acc, s) => { acc[s.id] = s; return acc; }, {});

export default function India3DLandingPage({
  onOpenLoginSelection,
  onOpenDepartments,
  onOpenServices
}) {
  const [loadingStage, setLoadingStage]         = useState('PREPARING');
  const [viewLevel, setViewLevel]               = useState('INDIA'); // 'INDIA' | 'STATE' | 'DISTRICT' | 'TALUK'
  const [selectedState, setSelectedState]       = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk]       = useState(null);

  const [hoveredState, setHoveredState]         = useState(null);
  const [hoverPos, setHoverPos]                 = useState(null);
  const [transitionMsg, setTransitionMsg]       = useState('');
  const [activeWonderModal, setActiveWonderModal] = useState(null);
  const [activePlaceDetailId, setActivePlaceDetailId] = useState(null);

  const mapSectionRef = useRef(null);
  const wondersSectionRef = useRef(null);
  const spaceSectionRef = useRef(null);
  const freedomSectionRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingStage('DISCOVERING'), 500);
    const t2 = setTimeout(() => setLoadingStage('WELCOME'), 1000);
    const t3 = setTimeout(() => setLoadingStage('DONE'), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Synchronize navigation state with URL hash (URL Persistence & Browser Back/Forward)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.includes('/state/')) {
        const parts = hash.split('/state/')[1].split('/district/');
        const stateId = parts[0];
        const distId = parts[1];

        if (stateId) {
          const st = STATE_MAP[stateId] || getStateMetadata(stateId);
          if (st) {
            setSelectedState(st);
            if (distId && st.districts) {
              const dt = st.districts.find(d => d.id === distId || d.id.includes(distId) || distId.includes(d.id));
              if (dt) {
                setSelectedDistrict(dt);
                setViewLevel('DISTRICT');
                return;
              }
            }
            setSelectedDistrict(null);
            setViewLevel('STATE');
            return;
          }
        }
      } else if (hash === '#/india3d' || hash === '' || hash === '#/') {
        setViewLevel('INDIA');
        setSelectedState(null);
        setSelectedDistrict(null);
        setSelectedTaluk(null);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, []);

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWonders = () => {
    wondersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSpace = () => {
    spaceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFreedom = () => {
    freedomSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // State selection handler
  const handleSelectState = (stateObj) => {
    if (!stateObj) return;
    const enriched = STATE_MAP[stateObj.id] || STATE_MAP[stateObj.svgId] || getStateMetadata(stateObj.id) || stateObj;
    setTransitionMsg(`Entering ${enriched.name} Map & Districts…`);
    setTimeout(() => {
      setSelectedState(enriched);
      setSelectedDistrict(null);
      setSelectedTaluk(null);
      setViewLevel('STATE');
      setTransitionMsg('');
      window.location.hash = `#/state/${enriched.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  // District selection handler
  const handleSelectDistrict = (distObj) => {
    if (!distObj) return;
    setTransitionMsg(`Loading ${distObj.name} District & Taluk Map…`);
    setTimeout(() => {
      setSelectedDistrict(distObj);
      setSelectedTaluk(null);
      setViewLevel('DISTRICT');
      setTransitionMsg('');
      if (selectedState) {
        window.location.hash = `#/state/${selectedState.id}/district/${distObj.id}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  // Taluk selection handler -> Transitions to Taluk screen
  const handleSelectTaluk = (talukObj) => {
    setSelectedTaluk(talukObj);
    setViewLevel('TALUK');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIndia = () => {
    setTransitionMsg('Returning to National Map…');
    setTimeout(() => {
      setViewLevel('INDIA');
      setSelectedState(null);
      setSelectedDistrict(null);
      setSelectedTaluk(null);
      setTransitionMsg('');
      window.location.hash = `#/india3d`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  };

  const handleBackToState = () => {
    setViewLevel('STATE');
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    if (selectedState) {
      window.location.hash = `#/state/${selectedState.id}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDistrict = () => {
    setViewLevel('DISTRICT');
    setSelectedTaluk(null);
    if (selectedState && selectedDistrict) {
      window.location.hash = `#/state/${selectedState.id}/district/${selectedDistrict.id}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoading = loadingStage !== 'DONE';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#070b16',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>

      {/* ── 1. LOADING OVERLAY ── */}
      {isLoading && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#070b16', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20
        }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Emblem of India"
            style={{ width: 84, height: 84, filter: 'brightness(0) invert(0.95) drop-shadow(0 0 24px rgba(255,215,0,0.45))', animation: 'pulse 1.8s infinite' }}
          />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>
              {loadingStage === 'PREPARING' && '🇮🇳 WELCOME TO INDIA'}
              {loadingStage === 'DISCOVERING' && '🗺️ PREPARING 3D GEOGRAPHICAL DISCOVERY'}
              {loadingStage === 'WELCOME' && '✨ INDIA — ONE NATION, MANY STORIES'}
            </div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 8 }}>
              Official National Exploration & Citizen Service Entrance
            </div>
          </div>
          <div style={{ width: 280, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FF671F, #FFFFFF, #046A38)',
              width: loadingStage === 'PREPARING' ? '30%' : loadingStage === 'DISCOVERING' ? '70%' : '100%',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      )}

      {/* ── 2. TRANSITION TOAST ── */}
      {transitionMsg && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 90000,
          background: 'rgba(7,11,22,0.88)', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16
        }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>
            {transitionMsg}
          </div>
          <div style={{ width: 80, height: 4, background: 'linear-gradient(90deg, #FF671F, #046A38)', borderRadius: 10, animation: 'pulse 1s infinite' }} />
        </div>
      )}

      {/* ── 3. TOP NAVIGATION BAR ── */}
      <header style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 36px',
        background: 'rgba(7,11,22,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Emblem"
            style={{ width: 36, height: 36, filter: 'brightness(0) invert(0.95) drop-shadow(0 0 10px rgba(255,215,0,0.4))' }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              INDIA — ONE NATION, MANY STORIES
            </div>
            <div style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: 0.5 }}>
              Government of India • National Digital Gateway
            </div>
          </div>
        </div>

        {/* Dynamic Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 800 }}>
          <span
            onClick={handleBackToIndia}
            style={{ cursor: 'pointer', color: viewLevel === 'INDIA' ? '#FF671F' : '#9CA3AF', transition: 'color 0.2s' }}
          >
            🇮🇳 INDIA
          </span>
          {selectedState && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
              <span
                onClick={handleBackToState}
                style={{ cursor: 'pointer', color: viewLevel === 'STATE' ? '#FF671F' : '#9CA3AF' }}
              >
                {selectedState.name.toUpperCase()}
              </span>
            </>
          )}
          {selectedDistrict && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
              <span
                onClick={handleBackToDistrict}
                style={{ cursor: 'pointer', color: viewLevel === 'DISTRICT' ? '#FF671F' : '#9CA3AF' }}
              >
                {selectedDistrict.name.toUpperCase()} DISTRICT
              </span>
            </>
          )}
          {selectedTaluk && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
              <span style={{ color: '#FF671F' }}>
                {selectedTaluk.name.toUpperCase()} TALUK
              </span>
            </>
          )}
        </div>

        {/* Quick Jump Buttons */}
        {viewLevel === 'INDIA' && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={scrollToWonders}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '7px 16px', fontSize: 12, fontWeight: 700, color: '#D1D5DB', cursor: 'pointer'
              }}
            >
              🏛️ Popular Places
            </button>
            <button
              onClick={scrollToSpace}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '7px 16px', fontSize: 12, fontWeight: 700, color: '#D1D5DB', cursor: 'pointer'
              }}
            >
              🚀 Space Milestones
            </button>
            <button
              onClick={scrollToFreedom}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '7px 16px', fontSize: 12, fontWeight: 700, color: '#D1D5DB', cursor: 'pointer'
              }}
            >
              🕊️ Freedom Fighters
            </button>
            <button
              onClick={scrollToMap}
              style={{
                background: 'linear-gradient(135deg, #FF671F, #FF8C42)', border: 'none',
                borderRadius: 20, padding: '7px 18px', fontSize: 12, fontWeight: 800, color: '#fff', cursor: 'pointer'
              }}
            >
              🗺️ 3D India Map
            </button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════
           PAGE LEVEL 1: MAIN HOMEPAGE (INDIA VIEW)
         ══════════════════════════════════════════════════════ */}
      {viewLevel === 'INDIA' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* ── SECTION 1: HERO ENTRANCE ── */}
          <section style={{
            minHeight: '85vh',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '60px 24px',
            backgroundImage: `linear-gradient(to bottom, rgba(7,11,22,0.82), rgba(7,11,22,0.94)), url('/emblem-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            boxShadow: 'inset 0 0 120px rgba(7,11,22,0.95)'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,103,31,0.12)', border: '1px solid rgba(255,103,31,0.3)',
              padding: '6px 18px', borderRadius: 30, fontSize: 12, fontWeight: 800, color: '#FF671F',
              letterSpacing: 2, marginBottom: 20, textTransform: 'uppercase'
            }}>
              🇮🇳 THE REPUBLIC OF INDIA • भारत गणराज्य
            </div>

            <h1 style={{
              fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 900, letterSpacing: 2,
              lineHeight: 1.1, margin: '0 0 16px', color: '#ffffff',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}>
              WELCOME TO INDIA
            </h1>

            <div style={{
              fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, color: '#FF9933',
              letterSpacing: 3, marginBottom: 20, textTransform: 'uppercase'
            }}>
              INDIA — ONE NATION, MANY STORIES
            </div>

            <p style={{
              fontSize: 16, color: '#9CA3AF', maxWidth: 780, lineHeight: 1.7, margin: '0 0 36px'
            }}>
              Embark on an interactive journey through 5,000 years of civilization, iconic wonders, heroic freedom fighters, 28 diverse States, and thousands of Taluks.
            </p>

            {/* Quick Metrics Cards */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16, maxWidth: 900, width: '100%', marginBottom: 40
            }}>
              {[
                { label: 'Independence', value: '15 August 1947', icon: '🕊️' },
                { label: 'Republic Day', value: '26 January 1950', icon: '📜' },
                { label: 'Federal Union', value: '28 States | 8 UTs', icon: '🏛️' },
                { label: 'Local Governance', value: '700+ Districts', icon: '📍' }
              ].map((m, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '16px 20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToWonders}
              style={{
                background: 'linear-gradient(135deg, #FF671F, #FF8C42)', border: 'none',
                borderRadius: 40, padding: '16px 36px', fontSize: 15, fontWeight: 900, color: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 10px 30px rgba(255,103,31,0.4)', transition: 'transform 0.2s'
              }}
            >
              Scroll to Explore Wonders & 3D Map <ChevronDown size={18} />
            </button>
          </section>


          {/* ── SECTION 2: POPULAR PLACES & WONDERS OF INDIA (FULL-WIDTH SCROLLABLE) ── */}
          <section ref={wondersSectionRef} style={{
            padding: '80px 36px',
            background: 'linear-gradient(180deg, #070b16 0%, #0c1222 50%, #070b16 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ maxWidth: 1300, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#FF671F', letterSpacing: 2, textTransform: 'uppercase' }}>
                  ARCHITECTURAL MARVELS & TIMELESS HERITAGE
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: '8px 0 12px' }}>
                  Popular Wonders & Iconic Places of India
                </h2>
                <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 680, margin: '0 auto' }}>
                  From the marble elegance of Taj Mahal to ancient Dravidian stone temples and soaring modern engineering.
                </p>
              </div>

              {/* Grid of Wonders with Large Visual Presence */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 28 }}>
                {POPULAR_WONDERS_OF_INDIA.map(wonder => (
                  <div
                    key={wonder.id}
                    onClick={() => setActivePlaceDetailId(wonder.id)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                      transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                      display: 'flex', flexDirection: 'column'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'rgba(255,103,31,0.6)';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.6)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={wonder.image}
                        alt={wonder.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '16px 20px',
                        background: 'linear-gradient(to top, rgba(7,11,22,0.95) 0%, transparent 100%)'
                      }}>
                        <span style={{
                          background: 'rgba(255,103,31,0.9)', color: '#fff', fontSize: 10, fontWeight: 900,
                          padding: '3px 10px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: 0.5
                        }}>
                          {wonder.era}
                        </span>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '6px 0 2px' }}>
                          {wonder.name}
                        </h3>
                        <div style={{ fontSize: 12, color: '#D1D5DB' }}>
                          📍 {wonder.location}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 16px' }}>
                        {wonder.description}
                      </p>
                      <div style={{
                        fontSize: 12, fontWeight: 800, color: '#FF671F',
                        display: 'flex', alignItems: 'center', gap: 6
                      }}>
                        Learn Significance & History →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ── SECTION 2.5: INDIA'S SPACE FRONTIERS & SCIENTIFIC STATS ── */}
          <section ref={spaceSectionRef} style={{
            padding: '80px 36px',
            background: 'linear-gradient(180deg, #070b16 0%, #0d1527 50%, #070b16 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ maxWidth: 1300, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', padding: '6px 18px', borderRadius: 30, fontSize: 12, fontWeight: 800, color: '#3B82F6', letterSpacing: 2, marginBottom: 16 }}>
                  🚀 BEYOND EARTH • INDIAN SPACE RESEARCH ORGANISATION
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: '8px 0 12px' }}>
                  India's Space Frontiers & Scientific Stats
                </h2>
                <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 680, margin: '0 auto' }}>
                  Tracing India's stellar path from launching sounding rockets from bicycle carriers to soft-landing on the Moon's South Pole and reaching Mars orbit.
                </p>
              </div>

              {/* Space Milestones Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
                {INDIA_SPACE_MILESTONES.map(mission => (
                  <div
                    key={mission.id}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(59,130,246,0.15)',
                      borderRadius: 24, padding: 28,
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)';
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(59,130,246,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 28 }}>{mission.icon}</span>
                          <div>
                            <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0 }}>
                              {mission.name}
                            </h3>
                            <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>
                              {mission.type}
                            </span>
                          </div>
                        </div>
                        <span style={{
                          background: 'rgba(59,130,246,0.2)', color: '#60A5FA', fontSize: 12, fontWeight: 900,
                          padding: '4px 12px', borderRadius: 12
                        }}>
                          {mission.year}
                        </span>
                      </div>

                      <div style={{
                        display: 'inline-block', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: 8, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#34D399', marginBottom: 14
                      }}>
                        🛰️ {mission.status}
                      </div>

                      <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 16px' }}>
                        {mission.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#60A5FA', letterSpacing: 0.5, marginBottom: 8 }}>
                        MISSION HIGHLIGHTS
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mission.highlights.map((h, idx) => (
                          <span key={idx} style={{
                            background: 'rgba(255,255,255,0.05)', color: '#E5E7EB',
                            fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8
                          }}>
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ── SECTION 3: FREEDOM FIGHTERS & THEIR STORIES ── */}
          <section ref={freedomSectionRef} style={{
            padding: '80px 36px',
            background: '#070b16'
          }}>
            <div style={{ maxWidth: 1300, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#046A38', letterSpacing: 2, textTransform: 'uppercase' }}>
                  TRIBUTE TO THE ARCHITECTS OF OUR INDEPENDENCE
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', margin: '8px 0 12px' }}>
                  Freedom Fighters & National Heroes
                </h2>
                <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 680, margin: '0 auto' }}>
                  Saluting the extraordinary leaders whose courage, sacrifices, and vision shaped sovereign India.
                </p>
              </div>

              {/* Freedom Fighters Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginBottom: 80 }}>
                {FREEDOM_FIGHTERS.map(hero => (
                  <div
                    key={hero.id}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 24, padding: 28,
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                        <div style={{
                          width: 64, height: 64, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #FF671F, #046A38)', padding: 3, flexShrink: 0
                        }}>
                          <img
                            src={hero.image}
                            alt={hero.name}
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 2px' }}>
                            {hero.name}
                          </h3>
                          <div style={{ fontSize: 12, color: '#FF9933', fontWeight: 700 }}>
                            {hero.title}
                          </div>
                          <div style={{ fontSize: 11, color: '#9CA3AF' }}>
                            {hero.lifespan}
                          </div>
                        </div>
                      </div>

                      {/* Iconic Quote */}
                      <div style={{
                        background: 'rgba(255,103,31,0.08)', borderLeft: '3px solid #FF671F',
                        padding: '10px 14px', borderRadius: '0 12px 12px 0',
                        fontSize: 13, color: '#F3F4F6', fontStyle: 'italic', marginBottom: 16
                      }}>
                        "{hero.quote}"
                      </div>

                      <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 16px' }}>
                        {hero.role}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 6 }}>
                        KEY MILESTONES
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {hero.keyEvents.map((evt, idx) => (
                          <span key={idx} style={{
                            background: 'rgba(255,255,255,0.06)', color: '#E5E7EB',
                            fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 8
                          }}>
                            • {evt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              {/* ── SUB-SECTION: SCIENTIFIC VISIONARIES & DR. APJ ABDUL KALAM ── */}
              <div>
                <div style={{ textAlign: 'center', marginBottom: 50 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', padding: '6px 18px', borderRadius: 30, fontSize: 12, fontWeight: 800, color: '#10B981', letterSpacing: 2, marginBottom: 16 }}>
                    🔬 SCIENTIFIC ARCHITECTS • DR. APJ ABDUL KALAM & LEGENDS
                  </div>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#fff', margin: '8px 0 12px' }}>
                    National Legends & Visionary Scientists
                  </h2>
                  <p style={{ fontSize: 15, color: '#9CA3AF', maxWidth: 680, margin: '0 auto' }}>
                    Honoring the pioneering scientists who engineered India's atomic, space, and missile programs, elevating our nation to the global high-tech stage.
                  </p>
                </div>

                {/* Legends Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
                  {NATIONAL_LEGENDS.map(legend => (
                    <div
                      key={legend.id}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(16,185,129,0.15)',
                        borderRadius: 24, padding: 28,
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.borderColor = '#10B981';
                        e.currentTarget.style.boxShadow = '0 16px 40px rgba(16,185,129,0.25)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(16,185,129,0.15)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                          <div style={{
                            width: 68, height: 68, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #10B981, #3B82F6)', padding: 3, flexShrink: 0
                          }}>
                            <img
                              src={legend.image}
                              alt={legend.name}
                              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          </div>
                          <div>
                            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 2px' }}>
                              {legend.name}
                            </h3>
                            <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>
                              {legend.title}
                            </div>
                            <div style={{ fontSize: 11, color: '#9CA3AF' }}>
                              {legend.lifespan}
                            </div>
                          </div>
                        </div>

                        {/* Quote */}
                        <div style={{
                          background: 'rgba(16,185,129,0.08)', borderLeft: '3px solid #10B981',
                          padding: '10px 14px', borderRadius: '0 12px 12px 0',
                          fontSize: 13, color: '#F3F4F6', fontStyle: 'italic', marginBottom: 16
                        }}>
                          "{legend.quote}"
                        </div>

                        <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 16px' }}>
                          {legend.role}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#10B981', letterSpacing: 0.5, marginBottom: 8 }}>
                          PIONEERING CONTRIBUTIONS
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {legend.keyEvents.map((evt, idx) => (
                            <span key={idx} style={{
                              background: 'rgba(255,255,255,0.05)', color: '#E5E7EB',
                              fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8
                            }}>
                              • {evt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>


          {/* ── SECTION 4: INTERACTIVE 3D INDIA MAP (THE HERO CENTERPIECE) ── */}
          <section ref={mapSectionRef} style={{
            minHeight: '100vh',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 50%, #0e1629 0%, #070b16 75%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
            padding: '40px 24px'
          }}>
            {/* Title above map */}
            <div style={{ textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#FF671F', letterSpacing: 3, textTransform: 'uppercase' }}>
                INTERACTIVE 3D GEOGRAPHICAL EXPLORATION
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', margin: '4px 0' }}>
                Select Your State to Explore Districts & Taluks
              </h2>
              <div style={{ fontSize: 14, color: '#9CA3AF' }}>
                Hover to preview • Click on any State to enter its dedicated territory map
              </div>
            </div>

            {/* 3D WebGL Canvas in Center */}
            <div style={{
              width: '100%', height: '70vh', position: 'relative', overflow: 'hidden'
            }}>
              <India3DCanvas
                viewLevel="INDIA"
                selectedState={null}
                selectedDistrict={null}
                hoveredStateId={hoveredState?.id || hoveredState?.svgId}
                onHoverState={(s, pos) => { setHoveredState(s); setHoverPos(pos); }}
                onSelectState={handleSelectState}
              />

              {/* Hover Tooltip */}
              {hoveredState && hoverPos && (
                <div style={{
                  position: 'fixed',
                  left: Math.min(hoverPos.x + 15, window.innerWidth - 220),
                  top: hoverPos.y - 70,
                  zIndex: 5000, pointerEvents: 'none',
                  background: 'rgba(7,11,22,0.92)', backdropFilter: 'blur(16px)',
                  border: `1px solid ${hoveredState.color || '#8B5CF6'}`,
                  borderRadius: 14, padding: '12px 16px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.8)'
                }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{hoveredState.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>🏛️ Capital: {hoveredState.capital}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>📍 {hoveredState.districtsCount} Districts</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: hoveredState.color || '#8B5CF6', marginTop: 6 }}>
                    Click to enter state map →
                  </div>
                </div>
              )}
            </div>

            {/* All States Quick Select Ribbon */}
            <div style={{ width: '100%', maxWidth: 1200, zIndex: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF', letterSpacing: 1, marginBottom: 8, textAlign: 'center' }}>
                DIRECT STATE JUMP
              </div>
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
                {INDIA_3D_STATES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectState(s)}
                    style={{
                      background: 'rgba(255,255,255,0.06)', border: `1px solid ${s.color}66`,
                      borderRadius: 14, padding: '8px 16px', color: '#fff', fontSize: 12, fontWeight: 800,
                      cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: 8
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = `${s.color}22`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  >
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

        </div>
      )}


      {/* ══════════════════════════════════════════════════════
           PAGE LEVEL 2: DEDICATED STATE PAGE (SEPARATE VIEW)
           SHOWS VISUAL STATE DISTRICT MAP WITH ALL 38 DISTRICTS
         ══════════════════════════════════════════════════════ */}
      {viewLevel === 'STATE' && selectedState && (
        <div style={{ minHeight: '90vh', padding: '36px 36px 80px', maxWidth: 1400, margin: '0 auto' }}>

          {/* Top Return Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <button
              onClick={handleBackToIndia}
              style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 30, padding: '10px 22px', color: '#fff', fontSize: 13, fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              <ArrowLeft size={16} /> Return to All India Map
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>Capital: <strong style={{ color: '#fff' }}>{selectedState.capital}</strong></span>
              <span>•</span>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>Total Districts: <strong style={{ color: selectedState.color }}>{selectedState.districtsCount}</strong></span>
              <span>•</span>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>Population: <strong style={{ color: '#fff' }}>{selectedState.population}</strong></span>
            </div>
          </div>

          {/* State Hero Banner */}
          <div style={{
            background: `radial-gradient(circle at 80% 20%, ${selectedState.color}22 0%, rgba(7,11,22,0.95) 75%)`,
            border: `1px solid ${selectedState.color}44`,
            borderRadius: 28, padding: '36px 40px', marginBottom: 36,
            boxShadow: `0 12px 40px rgba(0,0,0,0.5)`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 900, color: selectedState.color, letterSpacing: 2 }}>
              <Landmark size={18} /> STATE EXPLORATION • {selectedState.type?.toUpperCase()}
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#fff', margin: '8px 0' }}>
              {selectedState.name}
            </h1>
            <div style={{ fontSize: 18, color: '#E0E7FF', fontStyle: 'italic', marginBottom: 16 }}>
              "{selectedState.tagline}"
            </div>
            <p style={{ fontSize: 14, color: '#9CA3AF', maxWidth: 880, lineHeight: 1.7, margin: 0 }}>
              {selectedState.description}
            </p>

            {/* Cultural tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              {selectedState.famousFor?.map(f => (
                <span key={f} style={{
                  background: `${selectedState.color}22`, border: `1px solid ${selectedState.color}55`,
                  color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20
                }}>
                  ✨ {f}
                </span>
              ))}
            </div>
          </div>

          {/* ── 🗺️ GEOGRAPHIC INTERACTIVE STATE DISTRICT MAP (NEW COMPONENT) ── */}
          <div style={{ marginBottom: 40 }}>
            <StateVisualDistrictMap
              stateObj={selectedState}
              onSelectDistrict={handleSelectDistrict}
            />
          </div>

          {/* State Famous Places Preview */}
          {selectedState.famousPlaces?.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: selectedState.color, letterSpacing: 2, marginBottom: 12 }}>
                FAMOUS PLACES IN {selectedState.name.toUpperCase()}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {selectedState.famousPlaces.map(fp => (
                  <div
                    key={fp.id}
                    onClick={() => setActivePlaceDetailId(fp.id === 'meenakshi' ? 'meenakshi-temple' : fp.id)}
                    style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FF671F'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  >
                    <img src={fp.image} alt={fp.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                    <div style={{ padding: 14 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{fp.name}</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{fp.desc}</div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#FF671F', marginTop: 6 }}>Explore Place Story →</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DISTRICT CARDS SELECTION GRID ── */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: selectedState.color, letterSpacing: 2 }}>
                  DISTRICT DIRECTORY • {selectedState.name.toUpperCase()}
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '4px 0 0' }}>
                  All Districts of {selectedState.name}
                </h2>
              </div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>
                Showing {selectedState.districts?.length || 0} Districts with Local Fame
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {selectedState.districts?.map(dist => (
                <div
                  key={dist.id}
                  onClick={() => handleSelectDistrict(dist)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${dist.color || selectedState.color}44`,
                    borderRadius: 20, padding: 24, cursor: 'pointer',
                    transition: 'all 0.25s ease', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = dist.color || selectedState.color;
                    e.currentTarget.style.background = `${dist.color || selectedState.color}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = `${dist.color || selectedState.color}44`;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{
                        background: `${dist.color || selectedState.color}22`,
                        color: dist.color || selectedState.color,
                        fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 12
                      }}>
                        HQ: {dist.headquarters}
                      </span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700 }}>
                        {dist.taluks?.length || 0} Taluks
                      </span>
                    </div>

                    <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>
                      {dist.name} District
                    </h3>

                    {dist.popularity && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#FF9933', marginBottom: 10 }}>
                        ⭐ {dist.popularity}
                      </div>
                    )}

                    <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 16px' }}>
                      {dist.description}
                    </p>
                  </div>

                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: dist.color || selectedState.color }}>
                      Explore Taluk Map →
                    </span>
                    <ArrowRight size={16} color={dist.color || selectedState.color} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}


      {/* ══════════════════════════════════════════════════════
           PAGE LEVEL 3: DEDICATED DISTRICT PAGE (SEPARATE VIEW)
           SHOWS VISUAL MULTI-COLORED TALUK MAP OF THE DISTRICT
         ══════════════════════════════════════════════════════ */}
      {viewLevel === 'DISTRICT' && selectedDistrict && selectedState && (
        <div style={{ minHeight: '90vh', padding: '36px 36px 80px', maxWidth: 1300, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <button
              onClick={handleBackToState}
              style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 30, padding: '10px 22px', color: '#fff', fontSize: 13, fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              <ArrowLeft size={16} /> Return to {selectedState.name} District Map
            </button>

            <div style={{ fontSize: 13, color: '#9CA3AF' }}>
              State: <strong style={{ color: '#fff' }}>{selectedState.name}</strong> • HQ: <strong style={{ color: selectedDistrict.color }}>{selectedDistrict.headquarters}</strong>
            </div>
          </div>

          {/* District Hero */}
          <div style={{
            background: `radial-gradient(circle at 80% 20%, ${selectedDistrict.color}22 0%, rgba(7,11,22,0.95) 75%)`,
            border: `1px solid ${selectedDistrict.color}55`,
            borderRadius: 28, padding: '36px 40px', marginBottom: 36
          }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: selectedDistrict.color, letterSpacing: 2 }}>
              DISTRICT TERRITORY & TALUK EXPLORATION
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', margin: '8px 0' }}>
              {selectedDistrict.name} District
            </h1>
            {selectedDistrict.popularity && (
              <div style={{ fontSize: 17, color: '#FF9933', fontWeight: 700, marginBottom: 14 }}>
                ⭐ {selectedDistrict.popularity}
              </div>
            )}
            <p style={{ fontSize: 14, color: '#9CA3AF', maxWidth: 840, lineHeight: 1.7, margin: 0 }}>
              {selectedDistrict.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 24 }}>
              {selectedDistrict.heritage && (
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#FF671F' }}>🏛️ HERITAGE</div>
                  <div style={{ fontSize: 13, color: '#fff', marginTop: 4 }}>{selectedDistrict.heritage}</div>
                </div>
              )}
              {selectedDistrict.culture && (
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#10B981' }}>🎭 CULTURE & TRADITION</div>
                  <div style={{ fontSize: 13, color: '#fff', marginTop: 4 }}>{selectedDistrict.culture}</div>
                </div>
              )}
              {selectedDistrict.food && (
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#F59E0B' }}>🍛 REGIONAL CUISINE</div>
                  <div style={{ fontSize: 13, color: '#fff', marginTop: 4 }}>{selectedDistrict.food}</div>
                </div>
              )}
            </div>
          </div>

          {/* ── 🗺️ GEOGRAPHIC INTERACTIVE REAL GIS TALUK MAP (LEAFLET REAL MAP) ── */}
          <div style={{ marginBottom: 40 }}>
            <InteractiveRealDistrictTalukMap
              districtObj={selectedDistrict}
              stateObj={selectedState}
              onSelectTaluk={handleSelectTaluk}
            />
          </div>

          {/* ── TALUK SELECTION CARDS GRID (WITH DIFFERENT COLORS PER TALUK) ── */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: selectedDistrict.color, letterSpacing: 2 }}>
                TALUKS OF {selectedDistrict.name.toUpperCase()} DISTRICT
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '4px 0' }}>
                All Taluks in {selectedDistrict.name}
              </h2>
              <p style={{ fontSize: 13, color: '#9CA3AF' }}>
                Every Taluk is individually mapped with distinct administrative boundaries and service jurisdiction.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {selectedDistrict.taluks?.map(taluk => (
                <div
                  key={taluk.id}
                  onClick={() => handleSelectTaluk(taluk)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `2px solid ${taluk.color || '#8B5CF6'}55`,
                    borderRadius: 20, padding: 24, cursor: 'pointer',
                    transition: 'all 0.25s ease', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    boxShadow: `0 8px 24px ${taluk.color || '#8B5CF6'}15`
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    e.currentTarget.style.borderColor = taluk.color || '#8B5CF6';
                    e.currentTarget.style.background = `${taluk.color || '#8B5CF6'}22`;
                    e.currentTarget.style.boxShadow = `0 16px 40px ${taluk.color || '#8B5CF6'}35`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = `${taluk.color || '#8B5CF6'}55`;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${taluk.color || '#8B5CF6'}15`;
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{
                        background: `${taluk.color || '#8B5CF6'}33`,
                        color: taluk.color || '#8B5CF6',
                        fontSize: 11, fontWeight: 900, padding: '4px 12px', borderRadius: 12, textTransform: 'uppercase'
                      }}>
                        TALUK MAP REGION
                      </span>
                      <span style={{ width: 14, height: 14, borderRadius: '50%', background: taluk.color || '#8B5CF6' }} />
                    </div>

                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>
                      {taluk.name}
                    </h3>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>
                      🏛️ Headquarters: <strong style={{ color: '#fff' }}>{taluk.headquarters}</strong>
                    </div>

                    <div style={{
                      background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 14px',
                      fontSize: 12, color: '#D1D5DB', lineHeight: 1.5, marginBottom: 16
                    }}>
                      💡 {taluk.highlights}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectTaluk(taluk)}
                    style={{
                      width: '100%', padding: '12px 0',
                      background: `linear-gradient(135deg, ${taluk.color || '#8B5CF6'}, #673AB7)`,
                      border: 'none', borderRadius: 12, color: '#fff',
                      fontSize: 13, fontWeight: 900, cursor: 'pointer',
                      boxShadow: `0 4px 14px ${taluk.color || '#8B5CF6'}44`
                    }}
                  >
                    Enter {taluk.name} →
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}


      {/* ══════════════════════════════════════════════════════
           PAGE LEVEL 4: TALUK SCREEN -> PORTAL LOGIN ACCESS
           (LOGIN ONLY OCCURS AFTER TALUK SELECTION)
         ══════════════════════════════════════════════════════ */}
      {viewLevel === 'TALUK' && selectedTaluk && (
        <div style={{
          minHeight: '85vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '40px 24px',
          background: 'radial-gradient(circle at 50% 40%, rgba(255,103,31,0.1) 0%, rgba(7,11,22,0.98) 75%)'
        }}>
          <button
            onClick={handleBackToDistrict}
            style={{
              position: 'absolute', top: 80, left: 36,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 30, padding: '8px 20px', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer'
            }}
          >
            ← Back to {selectedDistrict?.name} District Map
          </button>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Emblem"
            style={{ width: 76, height: 76, marginBottom: 20, filter: 'drop-shadow(0 0 20px rgba(255,103,31,0.6))' }}
          />

          <div style={{ fontSize: 13, fontWeight: 900, color: '#FF9933', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
            TALUK JURISDICTION DISCOVERED
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#fff', margin: '0 0 8px' }}>
            Welcome to {selectedTaluk.name}
          </h1>

          <div style={{ fontSize: 16, color: '#D1D5DB', marginBottom: 12 }}>
            {selectedDistrict?.name} District • {selectedState?.name}
          </div>

          <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 28, maxWidth: 500 }}>
            {selectedTaluk.highlights}
          </div>

          {/* Portal Login Button */}
          <button
            onClick={() => {
              const locationContext = {
                state: selectedState?.name,
                stateId: selectedState?.id,
                district: selectedDistrict?.name,
                districtId: selectedDistrict?.id,
                taluk: selectedTaluk?.name,
                talukId: selectedTaluk?.id
              };
              localStorage.setItem('gov_location_context', JSON.stringify(locationContext));
              onOpenLoginSelection();
            }}
            style={{
              padding: '18px 52px',
              background: 'linear-gradient(135deg, #FF671F 0%, #FF8C42 100%)',
              border: 'none', borderRadius: 50,
              fontSize: 16, fontWeight: 900, color: '#fff',
              cursor: 'pointer', letterSpacing: 1,
              boxShadow: '0 10px 40px rgba(255,103,31,0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            🇮🇳 Continue to Government Portal →
          </button>

          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 16 }}>
            Access Citizen Services • Scheme Applications • Grievance Redressal
          </div>
        </div>
      )}


      {/* ── WONDER DETAIL MODAL ── */}
      {activeWonderModal && (
        <div
          onClick={() => setActiveWonderModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(7,11,22,0.85)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0e1629', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 24, maxWidth: 640, width: '100%', overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
            }}
          >
            <img src={activeWonderModal.image} alt={activeWonderModal.name} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
            <div style={{ padding: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#FF671F', letterSpacing: 2 }}>{activeWonderModal.era}</div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '4px 0 6px' }}>{activeWonderModal.name}</h3>
              <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 14 }}>📍 {activeWonderModal.location} • Built: {activeWonderModal.built}</div>
              <p style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 1.7, marginBottom: 16 }}>{activeWonderModal.description}</p>
              <div style={{ background: 'rgba(255,103,31,0.08)', border: '1px solid rgba(255,103,31,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#FFD700', marginBottom: 20 }}>
                ⭐ <strong>Historical Importance:</strong> {activeWonderModal.importance}
              </div>
              <button
                onClick={() => setActiveWonderModal(null)}
                style={{
                  width: '100%', padding: '12px 0',
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  borderRadius: 12, color: '#fff', fontWeight: 800, cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 🌟 FULL-SCREEN FAMOUS PLACE EXPLORATION DIGITAL MUSEUM ── */}
      {activePlaceDetailId && (
        <FamousPlaceDetailExplorer
          placeId={activePlaceDetailId}
          onClose={() => setActivePlaceDetailId(null)}
          onSelectPlace={(id) => setActivePlaceDetailId(id)}
          onSelectDistrict={handleSelectDistrict}
          onSelectState={handleSelectState}
          onBackToIndia={handleBackToIndia}
        />
      )}

      {/* Global Animation Styles */}
      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #070b16; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 4px; }
      `}</style>
    </div>
  );
}
