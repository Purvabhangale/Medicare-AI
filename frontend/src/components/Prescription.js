import React from 'react';

const formatAI = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## '))  return <h3 key={i} style={{ color: '#00d4ff', marginTop: '14px', fontSize: '14px', fontWeight: 700 }}>{line.replace('## ', '')}</h3>;
    if (line.startsWith('# '))   return <h2 key={i} style={{ color: '#00d4ff', marginTop: '18px', fontSize: '16px', fontWeight: 800 }}>{line.replace('# ', '')}</h2>;
    if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} style={{ marginLeft: '18px', color: '#cbd5e0', marginBottom: '3px', listStyle: 'disc' }}>{line.replace(/^[-•] /, '')}</li>;
    if (line.trim() === '')      return <br key={i} />;
    const html = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00d4ff">$1</strong>');
    return <p key={i} style={{ marginBottom: '4px', color: '#e2e8f0', lineHeight: '1.65' }} dangerouslySetInnerHTML={{ __html: html }} />;
  });
};

export default function Prescription({ prescription, navigateTo }) {
  if (!prescription) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontSize: '56px', marginBottom: '18px' }}>📋</p>
        <h2 style={{ color: '#718096', marginBottom: '18px', fontWeight: 600 }}>No Report Generated Yet</h2>
        <button onClick={() => navigateTo('form')} style={{ background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: '#fff', padding: '12px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
          Fill Patient Form
        </button>
      </div>
    );
  }

  const p = prescription.patient || {};

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ background: 'rgba(10,22,40,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: '16px', padding: '32px' }}>

        {/* Report header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,212,255,0.12)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '36px' }}>🏥</span>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>MediCare AI Health Report</h2>
              <p style={{ fontSize: '12px', color: '#718096' }}>AI-Generated Assessment — Not a Medical Prescription</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '13px', color: '#718096' }}>Date: {prescription.date}</p>
            {p.name && <p style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>Patient: {p.name}</p>}
          </div>
        </div>

        {/* Patient summary chips */}
        {(p.name || p.age || p.gender) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '12px', marginBottom: '24px' }}>
            {[['👤', 'Name', p.name], ['📅', 'Age', p.age], ['⚧', 'Gender', p.gender], ['💊', 'Allergies', p.allergies || 'None']].map(([icon, k, v]) => v ? (
              <div key={k} style={{ background: 'rgba(0,212,255,0.05)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(0,212,255,0.1)' }}>
                <p style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>{icon} {k}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{v}</p>
              </div>
            ) : null)}
          </div>
        )}

        {/* AI content */}
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '24px', lineHeight: 1.7 }}>
          {formatAI(prescription.aiAssessment)}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '20px', padding: '14px 18px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px' }}>
          <p style={{ fontSize: '13px', color: '#fc8181', margin: 0 }}>
            ⚠️ <strong>Disclaimer:</strong> This is an AI-generated assessment for informational purposes only. Please consult a licensed medical professional before taking any medication.
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '22px', flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} style={{ background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: '#fff', padding: '11px 22px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>🖨️ Print Report</button>
          <button onClick={() => navigateTo('form')} style={{ background: 'transparent', border: '1px solid rgba(0,212,255,0.35)', borderRadius: '10px', color: '#00d4ff', padding: '11px 22px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>📋 New Assessment</button>
          <button onClick={() => navigateTo('chat')} style={{ background: 'transparent', border: '1px solid rgba(0,212,255,0.35)', borderRadius: '10px', color: '#00d4ff', padding: '11px 22px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>🤖 Ask AI</button>
        </div>
      </div>
    </div>
  );
}
