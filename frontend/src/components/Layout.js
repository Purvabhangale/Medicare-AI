import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const S = {
  app: { minHeight: '100vh', background: 'linear-gradient(135deg,#020917 0%,#0a1628 50%,#020917 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", color: '#e2e8f0', position: 'relative' },
  grid: { position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0 },
  orb1: { position: 'fixed', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)', pointerEvents: 'none', borderRadius: '50%', zIndex: 0 },
  orb2: { position: 'fixed', bottom: '-200px', left: '-200px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)', pointerEvents: 'none', borderRadius: '50%', zIndex: 0 },
  header: { background: 'rgba(10,22,40,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,212,255,0.12)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 },
  headerInner: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' },
  logoIcon: { width: '38px', height: '38px', background: 'linear-gradient(135deg,#00d4ff,#6366f1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  logoText: { fontSize: '20px', fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  nav: { display: 'flex', gap: '2px', flexWrap: 'wrap' },
  main: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', position: 'relative', zIndex: 1 },
  mobileMenu: { position: 'fixed', inset: 0, background: 'rgba(2,9,23,0.98)', zIndex: 200, display: 'flex', flexDirection: 'column', padding: '80px 32px 32px', gap: '8px' }
};

const NAV_ITEMS = [
  { path: '/', label: '🏠 Home' },
  { path: '/medicines', label: '💊 Medicines' },
  { path: '/assessment', label: '📋 Assessment' },
  { path: '/report', label: '📄 Report' },
  { path: '/chat', label: '🤖 AI Chat' }
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navBtn = (active) => ({
    padding: '8px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600, transition: 'all 0.2s', textDecoration: 'none',
    background: active ? 'rgba(0,212,255,0.12)' : 'transparent',
    color: active ? '#00d4ff' : '#718096',
    borderBottom: active ? '2px solid #00d4ff' : '2px solid transparent',
    display: 'inline-block'
  });

  return (
    <div style={S.app}>
      <div style={S.grid} />
      <div style={S.orb1} />
      <div style={S.orb2} />
      <header style={S.header}>
        <div style={S.headerInner}>
          <Link to="/" style={S.logo}>
            <div style={S.logoIcon}>🩺</div>
            <span style={S.logoText}>MediCare AI</span>
          </Link>
          <nav style={S.nav}>
            {NAV_ITEMS.map(item => (
              <Link key={item.path} to={item.path} style={navBtn(location.pathname === item.path)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main style={S.main}>{children}</main>
      <footer style={{ textAlign: 'center', padding: '24px', color: '#4a5568', fontSize: '13px', borderTop: '1px solid rgba(0,212,255,0.08)', position: 'relative', zIndex: 1 }}>
        <p>⚕️ MediCare AI — For informational purposes only. Always consult a licensed physician.</p>
        <p style={{ marginTop: '4px', color: '#2d3748' }}>Powered by Google Gemini AI &amp; Spring Boot</p>
      </footer>
    </div>
  );
}
