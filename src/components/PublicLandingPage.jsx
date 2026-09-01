import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Building2,
  MapPin,
  ChevronRight,
  ArrowRight,
  Globe,
  Award,
  Sparkles,
  Layers,
  Heart,
  Landmark,
  Compass,
  CheckCircle2,
  ExternalLink,
  X,
  FileText
} from 'lucide-react';

import { INDIA_STATS, STATES_AND_UTS_DATA } from '../data/indiaData';
import DeptLogo from './DeptLogo';

export default function PublicLandingPage({
  onOpenLoginSelection,
  onOpenDepartments,
  onOpenServices
}) {
  // State Exploration Context: null | stateObj
  const [selectedState, setSelectedState] = useState(null);

  // District Exploration Context: null | districtObj
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Filter for States/UTs search in landing section
  const [stateSearch, setStateSearch] = useState('');

  const filteredStates = STATES_AND_UTS_DATA.filter(s =>
    s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
    s.capital.toLowerCase().includes(stateSearch.toLowerCase()) ||
    s.description.toLowerCase().includes(stateSearch.toLowerCase())
  );

  return (
    <div className="public-landing-page" style={{ width: '100%', minHeight: '100vh', background: '#F8F9FD', color: '#111827' }}>
      
      {/* --------------------------------------------------
          1. TOP NAVIGATION BAR
         -------------------------------------------------- */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
      }}>
        {/* Subtle Indian Tricolour Top Strip */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #FF671F 0%, #FFFFFF 50%, #046A38 100%)'
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand & Emblem */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => { setSelectedState(null); setSelectedDistrict(null); window.scrollTo(0,0); }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              padding: '3px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(103, 58, 183, 0.2)'
            }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="State Emblem of India"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', color: '#111827', lineHeight: 1.1 }}>
                Government One-Stop Portal
              </h1>
              <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600', letterSpacing: '0.2px' }}>
                Single Gateway for Citizens • Bharat National Platform
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-only-nav">
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedState(null); setSelectedDistrict(null); window.scrollTo(0,0); }} style={{ color: '#111827', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
              Home
            </a>
            <a href="#explore-india" style={{ color: '#4B5563', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
              Explore India
            </a>
            <a href="#states-uts" style={{ color: '#4B5563', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
              States & UTs
            </a>
            <button
              onClick={onOpenDepartments}
              style={{ background: 'none', border: 'none', color: '#4B5563', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
            >
              Departments
            </button>
            <button
              onClick={onOpenServices}
              style={{ background: 'none', border: 'none', color: '#4B5563', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
            >
              Services
            </button>
            <a href="#about" style={{ color: '#4B5563', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
              About
            </a>
          </nav>

          {/* Primary Login Button */}
          <button
            onClick={onOpenLoginSelection}
            style={{
              padding: '12px 26px',
              borderRadius: '30px',
              border: 'none',
              background: 'linear-gradient(135deg, #4A148C 0%, #673AB7 50%, #7C4DFF 100%)',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(103, 58, 183, 0.3)',
              transition: 'all 0.25s ease'
            }}
          >
            <span>🇮🇳</span> LOGIN <ArrowRight size={16} />
          </button>
        </div>
      </header>


      {/* --------------------------------------------------
          2. CINEMATIC HERO SECTION
         -------------------------------------------------- */}
      <section style={{
        position: 'relative',
        minHeight: '82vh',
        background: 'linear-gradient(180deg, #0B0F19 0%, #1A1F36 100%)',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '60px 24px'
      }}>
        {/* Real High Quality Landmark Photographic Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.38,
          filter: 'contrast(1.1) brightness(0.9)'
        }} />

        {/* Ambient Dark Gradient Overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(11, 15, 25, 0.4) 0%, rgba(11, 15, 25, 0.92) 100%)'
        }} />

        {/* Hero Content Box */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1300px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div>
            {/* National Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              padding: '8px 18px',
              borderRadius: '30px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontSize: '13px',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#FFD700',
              marginBottom: '20px'
            }}>
              <ShieldCheck size={16} /> Official Republic of India Gateway
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 58px)',
              fontWeight: '800',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: '18px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #E2E8F0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              One India. One Platform.<br />
              <span style={{ color: '#FFD700', WebkitTextFillColor: '#FFD700' }}>One Digital Government.</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#D1D5DB',
              lineHeight: 1.6,
              maxWidth: '600px',
              marginBottom: '36px',
              fontWeight: '400'
            }}>
              Discover India. Access Government Services. Connect with Your Nation. Single window access across 28 States & 8 Union Territories.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={onOpenLoginSelection}
                style={{
                  padding: '18px 38px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #FF671F 0%, #E65100 100%)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '800',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(255, 103, 31, 0.4)',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>🇮🇳</span> LOGIN <ArrowRight size={20} />
              </button>

              <a
                href="#explore-india"
                style={{
                  padding: '18px 36px',
                  borderRadius: '30px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '800',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <Compass size={20} /> EXPLORE INDIA
              </a>
            </div>
          </div>

          {/* Hero Feature Showcase Cards Carousel */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              🏛️ National Heritage & Governance Hub
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🇮🇳</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>28 States & 8 UTs</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Unified Federal Gateway</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>📜</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>35+ Departments</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Fully Digitized Portals</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>📍</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>780+ Districts</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Localized District Services</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🔐</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>Biometric Auth</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Aadhaar & OTP Verified</div>
              </div>
            </div>

            <div style={{
              marginTop: '18px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#D1D5DB'
            }}>
              <span>✓ Digital India Approved</span>
              <span>✓ 256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </section>


      {/* --------------------------------------------------
          3. INDIA PRIDE & STATS SECTION
         -------------------------------------------------- */}
      <section style={{ padding: '60px 24px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            National Excellence
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
            India — A Nation of Diversity
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            Connecting over 1.4 Billion citizens with seamless digital governance, rich cultural heritage, and empowered regional administration.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ background: '#F8F9FD', padding: '24px', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#673AB7', fontFamily: 'var(--font-heading)' }}>
                {INDIA_STATS.statesCount}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>States</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>Sovereign Federated Regions</div>
            </div>

            <div style={{ background: '#F8F9FD', padding: '24px', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#10B981', fontFamily: 'var(--font-heading)' }}>
                {INDIA_STATS.utCount}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>Union Territories</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>Direct Federal Administration</div>
            </div>

            <div style={{ background: '#F8F9FD', padding: '24px', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#3B82F6', fontFamily: 'var(--font-heading)' }}>
                780+
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>Districts</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>District Collectorate Hubs</div>
            </div>

            <div style={{ background: '#F8F9FD', padding: '24px', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
                {INDIA_STATS.servicesCount}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>Digital Services</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>Instant E-Signed Certificates</div>
            </div>
          </div>
        </div>
      </section>


      {/* --------------------------------------------------
          4. INTERACTIVE INDIA MAP & STATE EXPLORATION SECTION
         -------------------------------------------------- */}
      <section id="explore-india" style={{ padding: '80px 24px', background: '#F8F9FD' }}>
        <div style={{ maxWidth: '1350px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Interactive Geographic Gateway
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: '800', color: '#111827' }}>
              Explore India
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '650px', margin: '8px auto 0 auto' }}>
              Discover the states, union territories and the unique identity of every region.
            </p>

            {/* Filter Search Bar for States */}
            <div style={{ maxWidth: '440px', margin: '24px auto 0 auto', position: 'relative' }}>
              <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search state (e.g. Tamil Nadu, Kerala, Jaipur...)"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  borderRadius: '30px',
                  border: '1.5px solid #E5E7EB',
                  outline: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                }}
              />
            </div>
          </div>


          {/* --------------------------------------------------
              STATE EXPLORATION PROFILE MODAL / VIEW
             -------------------------------------------------- */}
          {selectedState ? (
            <div style={{
              background: '#FFFFFF',
              borderRadius: '28px',
              padding: '36px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
              border: '1px solid #E5E7EB',
              animation: 'fadeIn 0.3s ease'
            }}>
              {/* Back Button */}
              <button
                onClick={() => { setSelectedState(null); setSelectedDistrict(null); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #E5E7EB',
                  background: '#F9FAFB',
                  color: '#673AB7',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginBottom: '24px'
                }}
              >
                ← Back to All States
              </button>

              {/* State Hero Banner */}
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '32px',
                color: '#FFFFFF',
                marginBottom: '32px'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${selectedState.bannerImage || selectedState.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)'
                }} />

                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#FFD700', marginBottom: '6px' }}>
                    <span>🇮🇳</span> {selectedState.type} Profile
                  </div>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: '800' }}>
                    Pride of {selectedState.name}
                  </h1>
                  <p style={{ fontSize: '16px', opacity: 0.9, marginTop: '6px', maxWidth: '800px' }}>
                    {selectedState.description}
                  </p>
                </div>
              </div>

              {/* State Overview Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                marginBottom: '36px'
              }}>
                <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>Capital City</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>🏛️ {selectedState.capital}</div>
                </div>
                <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>Districts</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>📍 {selectedState.districtsCount} Districts</div>
                </div>
                <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>Official Language(s)</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>🗣️ {selectedState.languages.join(', ')}</div>
                </div>
                <div style={{ background: '#F8F9FD', padding: '20px', borderRadius: '18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>Cultural Festivals</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>🎉 {selectedState.festivals.slice(0, 2).join(', ')}</div>
                </div>
              </div>

              {/* Cultural Highlights Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1.5px solid #E5E7EB', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏯</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>Heritage & Monuments</h4>
                  <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '6px', lineHeight: 1.5 }}>{selectedState.heritage}</p>
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1.5px solid #E5E7EB', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🍲</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>Local Cuisine & Delicacies</h4>
                  <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '6px', lineHeight: 1.5 }}>{selectedState.cuisine}</p>
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '1.5px solid #E5E7EB', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>State Achievements</h4>
                  <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '6px', lineHeight: 1.5 }}>{selectedState.achievements}</p>
                </div>
              </div>


              {/* --------------------------------------------------
                  DISTRICT EXPLORATION SECTION FOR STATE
                 -------------------------------------------------- */}
              <div style={{ borderTop: '2px dashed #E5E7EB', paddingTop: '36px' }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>
                    Regional Exploration
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: '800', color: '#111827' }}>
                    Explore the Districts of {selectedState.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
                    Click any district to discover its unique heritage, tourism, culture & local identity.
                  </p>
                </div>

                {/* District Cards Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '20px'
                }}>
                  {selectedState.districts.map((dist) => (
                    <div
                      key={dist.id}
                      onClick={() => setSelectedDistrict(dist)}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '20px',
                        border: selectedDistrict?.id === dist.id ? '2px solid #673AB7' : '1.5px solid #E5E7EB',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#673AB7'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                      onMouseLeave={(e) => { if (selectedDistrict?.id !== dist.id) e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                        <img src={dist.image} alt={dist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
                          📍 District
                        </div>
                      </div>
                      <div style={{ padding: '16px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>{dist.name}</h4>
                        <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: 1.4, height: '34px', overflow: 'hidden' }}>
                          {dist.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #F3F4F6', fontSize: '12px', fontWeight: '800', color: '#673AB7' }}>
                          <span>Explore District</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                {/* --------------------------------------------------
                    DISTRICT PROFILE MODAL / DETAILED VIEW
                   -------------------------------------------------- */}
                {selectedDistrict && (
                  <div style={{
                    marginTop: '36px',
                    background: '#F8F9FD',
                    borderRadius: '24px',
                    padding: '32px',
                    border: '2px solid #673AB7',
                    animation: 'slideUp 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '28px' }}>📍</div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase' }}>District Profile</div>
                          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '800', color: '#111827' }}>
                            Pride of {selectedDistrict.name}
                          </h2>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedDistrict(null)}
                        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '24px', lineHeight: 1.6 }}>
                      {selectedDistrict.description}
                    </p>

                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
                      Discover What Makes {selectedDistrict.name} Special:
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                      <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7' }}>🏯 Heritage & Temples</div>
                        <div style={{ fontSize: '13px', color: '#374151', marginTop: '4px' }}>{selectedDistrict.heritage}</div>
                      </div>
                      <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7' }}>🌄 Famous Attractions</div>
                        <div style={{ fontSize: '13px', color: '#374151', marginTop: '4px' }}>{selectedDistrict.famousPlaces.join(', ')}</div>
                      </div>
                      <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7' }}>🎭 Culture & Festivals</div>
                        <div style={{ fontSize: '13px', color: '#374151', marginTop: '4px' }}>{selectedDistrict.culture}</div>
                      </div>
                      <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7' }}>🍲 Local Specialties</div>
                        <div style={{ fontSize: '13px', color: '#374151', marginTop: '4px' }}>{selectedDistrict.food}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* --------------------------------------------------
               STATES & UNION TERRITORIES CARDS GRID
               -------------------------------------------------- */
            <div id="states-uts">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#111827' }}>
                  States & Union Territories of India
                </h3>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280' }}>
                  Showing {filteredStates.length} Regions
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {filteredStates.map((stateObj) => (
                  <div
                    key={stateObj.id}
                    onClick={() => { setSelectedState(stateObj); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '24px',
                      border: '1.5px solid #E5E7EB',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#673AB7'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(103, 58, 183, 0.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; }}
                  >
                    <div>
                      <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={stateObj.image}
                          alt={stateObj.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(17, 24, 39, 0.82)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '800'
                        }}>
                          {stateObj.type}
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>
                          {stateObj.name}
                        </h4>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#673AB7', marginBottom: '8px' }}>
                          🏛️ Capital: {stateObj.capital} • 📍 {stateObj.districtsCount} Districts
                        </div>
                        <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5, height: '40px', overflow: 'hidden' }}>
                          {stateObj.description}
                        </p>
                      </div>
                    </div>

                    <div style={{ padding: '16px 20px', background: '#F8F9FD', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: '800', color: '#673AB7' }}>
                      <span>Explore State</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


      {/* --------------------------------------------------
          5. ABOUT & DIGITAL BHARAT BANNER
         -------------------------------------------------- */}
      <section id="about" style={{ padding: '70px 24px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              About Government One-Stop Portal
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
              Unified Public Service Infrastructure for Every Citizen
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
              The Government One-Stop Portal brings together public welfare schemes, digital certificates, municipal permits, land revenue services, and inter-departmental verification into a single transparent digital gateway.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                <CheckCircle2 size={18} color="#10B981" /> Cryptographically E-Signed Official Certificates
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                <CheckCircle2 size={18} color="#10B981" /> Seamless Inter-Department Data Exchange Gateway
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '700', color: '#10B981' }}>
                <CheckCircle2 size={18} color="#10B981" /> Multilingual Support across all 22 Official Languages
              </div>
            </div>

            <button
              onClick={onOpenLoginSelection}
              style={{
                padding: '16px 32px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #4A148C 0%, #673AB7 100%)',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              Access Government Portal <ArrowRight size={18} />
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #F3E5F5 0%, #E8EAF6 100%)',
            borderRadius: '28px',
            padding: '36px',
            border: '1px solid rgba(103, 58, 183, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🇮🇳</div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
              Digital India Mission
            </h3>
            <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5, marginBottom: '20px' }}>
              Empowering citizens with paperless, cashless, and faceless government interactions.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: '#673AB7', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              🔒 ISO 27001 & Cyber Security Compliant
            </div>
          </div>
        </div>
      </section>


      {/* --------------------------------------------------
          6. FOOTER
         -------------------------------------------------- */}
      <footer style={{ background: '#0B0F19', color: '#9CA3AF', padding: '60px 24px 30px 24px', borderTop: '1px solid #1F2937' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: '800' }}>Government One-Stop Portal</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#9CA3AF' }}>
              One Platform. One Nation. Better Services. Official Citizen Service Infrastructure of India.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', marginBottom: '14px', textTransform: 'uppercase' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setSelectedState(null); window.scrollTo(0,0); }} style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</a>
              <a href="#explore-india" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Explore India</a>
              <a href="#states-uts" style={{ color: '#9CA3AF', textDecoration: 'none' }}>States & Union Territories</a>
              <button onClick={onOpenDepartments} style={{ background: 'none', border: 'none', color: '#9CA3AF', textAlign: 'left', cursor: 'pointer', fontSize: '13px', padding: 0 }}>Departments</button>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', marginBottom: '14px', textTransform: 'uppercase' }}>Security & Policies</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <span style={{ color: '#9CA3AF' }}>Privacy Policy</span>
              <span style={{ color: '#9CA3AF' }}>Terms of Service</span>
              <span style={{ color: '#9CA3AF' }}>Accessibility Statement</span>
              <span style={{ color: '#9CA3AF' }}>Cyber Security Guidelines</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', marginBottom: '14px', textTransform: 'uppercase' }}>Government Contact</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#9CA3AF' }}>
              National E-Governance Division (NeGD)<br />
              Cabinet Secretariat, New Delhi 110001<br />
              Toll-Free Helpline: 1800-11-0001
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1300px', margin: '0 auto', paddingTop: '24px', borderTop: '1px solid #1F2937', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280' }}>
          <div>© 2026 Government One-Stop Portal • Republic of India. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>🇮🇳 Digital India</span>
            <span>•</span>
            <span>NeGD Infrastructure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
