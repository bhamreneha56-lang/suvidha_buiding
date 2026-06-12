import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, ScanLine, Camera } from 'lucide-react';
import BookCylinderCard from '../components/lpg/BookCylinderCard';
import DeliveryHistoryCard from '../components/lpg/DeliveryHistoryCard';
import LpgProfileCard from '../components/lpg/LpgProfileCard';
import SafetyGuidelinesCard from '../components/lpg/SafetyGuidelinesCard';

const LpgDashboard = () => {
  return (
    <div style={{ background: 'var(--color-bg)' }} className="flex flex-col gap-6 py-6 max-w-7xl mx-auto w-full px-4 min-h-screen">
      
      {/* Header */}
      <section className="flex flex-col gap-2 mb-2">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mb-3 font-medium">
            <ArrowLeft size={16} /> Back to Selection
          </Link>
          <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-text)' }}>
            LPG Cylinder Services
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Manage your cylinder deliveries and safety.
          </p>
        </div>
      </section>

      {/* ── Cylinder Safety Check Banner ── */}
      <Link
        to="/lpg/cylinder-safety"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          border: '1px solid rgba(245,158,11,0.35)',
          borderRadius: 20,
          padding: '1.5rem 1.75rem',
          textDecoration: 'none',
          boxShadow: '0 8px 32px rgba(245,158,11,0.15)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          flexWrap: 'wrap',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 14px 40px rgba(245,158,11,0.25)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.15)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
            background: 'linear-gradient(135deg,#f59e0b,#d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
          }}>
            <Shield size={28} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em',
                color: '#f59e0b', textTransform: 'uppercase',
                background: 'rgba(245,158,11,0.15)', padding: '2px 8px', borderRadius: 6,
              }}>NEW</span>
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em',
                color: '#10b981', textTransform: 'uppercase',
                background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: 6,
              }}>SAFETY</span>
            </div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', margin: 0, lineHeight: 1.3 }}>
              Cylinder Safety Check (Expiry / Test Date)
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', margin: '4px 0 0' }}>
              Scan the ABCD‑YY code on your cylinder to verify it's within test period
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg,#f59e0b,#d97706)',
            color: '#fff', fontWeight: 700, fontSize: '0.85rem',
            padding: '0.625rem 1.25rem', borderRadius: 10, whiteSpace: 'nowrap',
          }}>
            <Camera size={16} /> Scan Cylinder Code
          </div>
        </div>
      </Link>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <BookCylinderCard />
          <DeliveryHistoryCard />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <LpgProfileCard />
          <SafetyGuidelinesCard />
        </div>

      </div>
    </div>
  );
};

export default LpgDashboard;
