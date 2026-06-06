import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePrescription } from '../services/geminiService';

const S = {
  wrap: { maxWidth: '720px', margin: '0 auto' },
  card: { background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '16px', padding: '32px' },
  label: { fontSize: '12px', fontWeight: 700, color: '#00d4ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', display: 'block' },
  input: { background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '10px', color: '#e2e8f0', padding: '12px 14px', fontSize: '14px', outline: 'none', width: '100%', transition: 'border 0.2s' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  field: { marginBottom: '20px' },
  genderBtns: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  genderBtn: (active) => ({ padding: '9px 20px', borderRadius: '8px', border: `1px solid ${active ? '#00d4ff' : 'rgba(0,212,255,0.2)'}`, background: active ? 'rgba(0,212,255,0.15)' : 'transparent', color: active ? '#00d4ff' : '#718096', cursor: 'pointer', fontWeight: 600, fontSize: '13px', transition: 'all 0.2s' }),
  submitBtn: { background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: 'white', padding: '15px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.2s', marginTop: '8px' },
  error: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#fc8181', fontSize: '13px', marginBottom: '16px' },
  note: { background: 'rgba(246,173,85,0.08)', border: '1px solid rgba(246,173,85,0.2)', borderRadius: '10px', padding: '14px', marginTop: '20px' }
};

const QUICK_SYMPTOMS = ['Fever & headache','Cough & cold','Body pain','Acid reflux','Allergy & sneezing','Diabetes management','High blood pressure','Stomach issues'];

export default function AssessmentForm() {
  const [form, setForm] = useState({ name: '', age: '', gender: '', symptoms: '', allergies: '', existing: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addSymptom = (s) => set('symptoms', form.symptoms ? `${form.symptoms}, ${s}` : s);

  const submit = async () => {
    if (!form.symptoms.trim()) { setError('Please describe your symptoms.'); return; }
    setError('');
    setLoading(true);
    try {
      const result = await generatePrescription(form);
      navigate('/report', { state: { prescription: result, patient: form, date: new Date().toLocaleDateString('en-IN') } });
    } catch (e) {
      setError('AI Error: ' + e.message + '\n\nPlease check your Gemini API key in src/config.js');
    }
    setLoading(false);
  };

  return (
    <div style={S.wrap}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>📋 Patient Assessment Form</h2>
        <p style={{ color: '#718096', fontSize: '14px' }}>Fill in your details and get personalized AI health guidance</p>
      </div>
      <div style={S.card}>
        {error && <div style={S.error}>⚠️ {error}</div>}
        <div style={S.row2}>
          <div>
            <label style={S.label}>Full Name</label>
            <input style={S.input} placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Age</label>
            <input style={S.input} type="number" placeholder="e.g. 28" min="1" max="120" value={form.age} onChange={e => set('age', e.target.value)} />
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Gender</label>
          <div style={S.genderBtns}>
            {['Male','Female','Other','Prefer not to say'].map(g => (
              <button key={g} style={S.genderBtn(form.gender === g)} onClick={() => set('gender', g)}>{g}</button>
            ))}
          </div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Current Symptoms *</label>
          <textarea style={{ ...S.input, minHeight: '100px', resize: 'vertical' }}
            placeholder="Describe your symptoms in detail (e.g., fever since 2 days, severe headache, body ache, sore throat, runny nose...)"
            value={form.symptoms} onChange={e => set('symptoms', e.target.value)} />
          <div style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '11px', color: '#4a5568', marginBottom: '6px' }}>Quick add:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {QUICK_SYMPTOMS.map(s => (
                <button key={s} onClick={() => addSymptom(s)} style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)', borderRadius: '6px', color: '#00d4ff', padding: '4px 10px', fontSize: '11px', cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={S.row2}>
          <div>
            <label style={S.label}>Known Allergies</label>
            <input style={S.input} placeholder="e.g. Penicillin, Aspirin, Sulfa" value={form.allergies} onChange={e => set('allergies', e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Existing Conditions</label>
            <input style={S.input} placeholder="e.g. Diabetes, Hypertension, Asthma" value={form.existing} onChange={e => set('existing', e.target.value)} />
          </div>
        </div>
        <button style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1 }} onClick={submit} disabled={loading}>
          {loading ? '⏳ Generating AI Assessment...' : '🤖 Generate AI Health Assessment'}
        </button>
        <div style={S.note}>
          <p style={{ fontSize: '12px', color: '#f6ad55', margin: 0 }}>
            ⚠️ This AI assessment is for informational purposes only. Always consult a licensed physician before taking any medication.
          </p>
        </div>
      </div>
    </div>
  );
}
