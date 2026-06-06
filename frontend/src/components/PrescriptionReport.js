import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const formatText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i} style={{ color: '#00d4ff', marginTop: '16px', marginBottom: '6px', fontSize: '15px', fontWeight: 700 }}>{line.replace('## ', '')}</h3>;
    if (line.startsWith('# ')) return <h2 key={i} style={{ color: '#00d4ff', marginTop: '20px', marginBottom: '8px', fontSize: '18px', fontWeight: 800 }}>{line.replace('# ', '')}</h2>;
    if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} style={{ marginLeft: '18px', color: '#cbd5e0', marginBottom: '4px', listStyle: 'disc', fontSize: '14px', lineHeight: 1.7 }}>{line.replace(/^[-•] /, '')}</li>;
    if (line.trim() === '') return <br key={i} />;
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#a0e0ff">$1</strong>');
    return <p key={i} style={{ marginBottom: '6px', color: '#e2e8f0', lineHeight: 1.7, fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: bold }} />;
  });
};

export default function PrescriptionReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prescription, patient, date } = location.state || {};

  if (!prescription) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📋</div>
        <h2 style={{ color: '#718096', marginBottom: '16px', fontSize: '22px' }}>No Report Generated Yet</h2>
        <p style={{ color: '#4a5568', marginBottom: '24px' }}>Fill in the patient assessment form to get your AI health report.</p>
        <button style={{ background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: 'white', padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/assessment')}>
          Go to Assessment Form
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '16px', padding: '32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,212,255,0.12)' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span style={{ fontSize: '40px' }}>🏥</span>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>MediCare AI Health Report</h2>
              <p style={{ fontSize: '12px', color: '#718096' }}>AI-Generated Assessment — Not a Medical Prescription</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '13px', color: '#718096' }}>📅 {date}</p>
            <span style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: 700 }}>AI GENERATED</span>
          </div>
        </div>

        {/* Patient Info */}
        {patient && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '12px', marginBottom: '24px' }}>
            {[['👤','Name', patient.name], ['📅','Age', patient.age], ['⚧','Gender', patient.gender], ['🩺','Allergies', patient.allergies || 'None'], ['📋','Conditions', patient.existing || 'None']].filter(([,, v]) => v).map(([icon, k, v]) => (
              <div key={k} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(0,212,255,0.08)' }}>
                <p style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>{icon} {k}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{v}</p>
              </div>
            ))}
          </div>
        )}

        {/* Symptoms Banner */}
        {patient?.symptoms && (
          <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#00d4ff', fontWeight: 700, letterSpacing: '1px', marginBottom: '4px' }}>REPORTED SYMPTOMS</p>
            <p style={{ fontSize: '14px', color: '#e2e8f0' }}>{patient.symptoms}</p>
          </div>
        )}

        {/* AI Content */}
        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '24px', lineHeight: 1.8, marginBottom: '20px' }}>
          {formatText(prescription)}
        </div>

        {/* Disclaimer */}
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', color: '#fc8181', margin: 0 }}>⚠️ <strong>Disclaimer:</strong> This report is AI-generated for informational purposes only. It is NOT a medical prescription. Please consult a licensed physician before taking any medication.</p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={{ background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: 'white', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }} onClick={() => window.print()}>
            🖨️ Print Report
          </button>
          <button style={{ background: 'transparent', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '10px', color: '#00d4ff', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/assessment')}>
            📋 New Assessment
          </button>
          <button style={{ background: 'transparent', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', color: '#a78bfa', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/chat')}>
            🤖 Ask AI More
          </button>
        </div>
      </div>
    </div>
  );
}
