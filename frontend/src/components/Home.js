import React from 'react';
import { useNavigate } from 'react-router-dom';

const S = {
  hero: { textAlign: 'center', padding: '60px 0 48px' },
  heroIcon: { fontSize: '72px', marginBottom: '20px', filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.4))' },
  heroTitle: { fontSize: '52px', fontWeight: 900, background: 'linear-gradient(135deg,#00d4ff,#6366f1,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px', lineHeight: 1.1 },
  heroSub: { fontSize: '18px', color: '#718096', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.7 },
  heroBtns: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  btn: { background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: 'white', padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
  btnOutline: { background: 'transparent', border: '1px solid rgba(0,212,255,0.4)', borderRadius: '10px', color: '#00d4ff', padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '20px', marginBottom: '48px' },
  card: { background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '16px', padding: '28px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s' },
  cardIcon: { fontSize: '40px', marginBottom: '14px' },
  cardTitle: { fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#e2e8f0' },
  cardDesc: { fontSize: '13px', color: '#718096', lineHeight: 1.6 },
  disclaimer: { background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(246,173,85,0.2)', borderRadius: '16px', padding: '24px' },
  disclaimerTitle: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '16px', fontWeight: 700, color: '#f6ad55' },
  disclaimerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '14px' },
  disclaimerItem: { display: 'flex', gap: '10px', alignItems: 'flex-start' }
};

const FEATURES = [
  { icon: '💊', title: 'Medicine Database', desc: '12+ medicines with dosage, side effects & complete info', path: '/medicines' },
  { icon: '🤖', title: 'AI Chat Assistant', desc: 'Ask any medical question to Gemini-powered AI', path: '/chat' },
  { icon: '📋', title: 'Smart Assessment', desc: 'Fill patient form and get AI-generated health guidance', path: '/assessment' },
  { icon: '🎤', title: 'Voice Input', desc: 'Speak your symptoms for hands-free AI analysis', path: '/chat' }
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={S.hero}>
        <div style={S.heroIcon}>🩺</div>
        <h1 style={S.heroTitle}>MediCare AI</h1>
        <p style={S.heroSub}>Your intelligent medical companion — powered by Google Gemini AI. Get medicine info, symptom analysis, and health guidance instantly.</p>
        <div style={S.heroBtns}>
          <button style={S.btn} onClick={() => navigate('/chat')}>💬 Chat with AI</button>
          <button style={S.btnOutline} onClick={() => navigate('/assessment')}>📋 Get Assessment</button>
        </div>
      </div>

      <div style={S.grid}>
        {FEATURES.map((f, i) => (
          <div key={i} style={S.card} onClick={() => navigate(f.path)}
            onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(0,212,255,0.4)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(0,212,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={S.cardIcon}>{f.icon}</div>
            <h3 style={S.cardTitle}>{f.title}</h3>
            <p style={S.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={S.disclaimer}>
        <div style={S.disclaimerTitle}><span>⚠️</span> Important Medical Disclaimer</div>
        <div style={S.disclaimerGrid}>
          {[
            'This app provides general health information only — NOT a substitute for professional medical advice.',
            'Always consult a licensed physician before starting or changing any medication.',
            'In emergencies, call 112 (India) or your local emergency services immediately.',
            'AI-generated suggestions must be verified by a qualified healthcare professional.'
          ].map((d, i) => (
            <div key={i} style={S.disclaimerItem}>
              <span style={{ color: '#f6ad55', flexShrink: 0, marginTop: '2px' }}>•</span>
              <p style={{ fontSize: '13px', color: '#a0aec0', lineHeight: 1.6, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
