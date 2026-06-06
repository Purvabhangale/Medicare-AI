import React, { useState } from 'react';
import { MEDICINES } from '../data/medicines';
import { useNavigate } from 'react-router-dom';

const S = {
  search: { background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '10px', color: '#e2e8f0', padding: '12px 16px', fontSize: '14px', outline: 'none', width: '100%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px', marginTop: '24px' },
  card: { background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '16px', padding: '22px', cursor: 'pointer', transition: 'all 0.25s' },
  badge: (color) => ({ background: color ? `${color}22` : 'rgba(0,212,255,0.08)', color: color || '#00d4ff', border: `1px solid ${color ? `${color}44` : 'rgba(0,212,255,0.25)'}`, borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: 700 }),
  tag: { background: 'rgba(0,212,255,0.08)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '6px', padding: '3px 8px', fontSize: '11px' },
  section: { marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(0,212,255,0.08)' },
  label: { fontSize: '11px', fontWeight: 700, color: '#00d4ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' },
  aiBtn: { background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '8px', color: 'white', padding: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: '14px' }
};

export default function Medicines() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const filtered = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()) ||
    m.uses.some(u => u.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>💊 Medicine Database</h2>
        <p style={{ color: '#718096', fontSize: '14px' }}>Click any medicine card for detailed information</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <input style={S.search} placeholder="🔍 Search by name, category, condition..." value={search} onChange={e => setSearch(e.target.value)} />
        <span style={{ color: '#718096', fontSize: '13px', whiteSpace: 'nowrap' }}>{filtered.length} found</span>
      </div>
      <div style={S.grid}>
        {filtered.map(med => (
          <div key={med.id} style={S.card}
            onMouseEnter={e => { if (expanded !== med.id) e.currentTarget.style.border = '1px solid rgba(0,212,255,0.3)'; }}
            onMouseLeave={e => { if (expanded !== med.id) e.currentTarget.style.border = '1px solid rgba(0,212,255,0.1)'; }}
            onClick={() => setExpanded(expanded === med.id ? null : med.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '30px' }}>{med.icon}</span>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '3px', color: '#e2e8f0' }}>{med.name}</h3>
                  <p style={{ fontSize: '12px', color: '#718096' }}>{med.category}</p>
                </div>
              </div>
              <span style={S.badge(med.prescription ? '#ef4444' : '#22c55e')}>
                {med.prescription ? 'Rx Required' : 'OTC'}
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
              {med.uses.slice(0, 3).map((u, i) => <span key={i} style={S.tag}>{u}</span>)}
              {med.uses.length > 3 && <span style={S.tag}>+{med.uses.length - 3} more</span>}
            </div>
            <p style={{ fontSize: '12px', color: '#718096' }}>📏 {med.dosage}</p>

            {expanded === med.id && (
              <div style={S.section} onClick={e => e.stopPropagation()}>
                <div style={{ marginBottom: '12px' }}>
                  <p style={S.label}>⚠️ Side Effects</p>
                  <ul style={{ paddingLeft: '16px', margin: 0 }}>
                    {med.sideEffects.map((s, i) => <li key={i} style={{ fontSize: '13px', color: '#f6ad55', marginBottom: '3px' }}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={S.label}>🛡️ Precautions</p>
                  <ul style={{ paddingLeft: '16px', margin: 0 }}>
                    {med.precautions.map((p, i) => <li key={i} style={{ fontSize: '13px', color: '#81e6d9', marginBottom: '3px' }}>{p}</li>)}
                  </ul>
                </div>
                <button style={S.aiBtn} onClick={() => { navigate('/chat', { state: { query: `Tell me more about ${med.name} including its mechanism, interactions, and when to avoid it.` } }); }}>
                  🤖 Ask AI About This Medicine
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
