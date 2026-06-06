import React from 'react';

const TABS = [
  { id: 'home',         label: '🏠 Home' },
  { id: 'medicines',    label: '💊 Medicines' },
  { id: 'form',         label: '📋 Assessment' },
  { id: 'prescription', label: '📄 Report' },
  { id: 'chat',         label: '🤖 AI Chat' },
];

export default function Header({ tab, setTab }) {
  return (
    <header style={{ background: 'rgba(10,22,40,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,212,255,0.15)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', flexWrap: 'wrap', gap: '8px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#00d4ff,#6366f1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🩺</div>
          <span style={{ fontSize: '20px', fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MediCare AI</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                background: tab === t.id ? 'rgba(0,212,255,0.12)' : 'transparent',
                color: tab === t.id ? '#00d4ff' : '#718096',
                borderBottom: tab === t.id ? '2px solid #00d4ff' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
