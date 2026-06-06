import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { callGemini } from '../services/geminiService';

const QUICK_PROMPTS = ['Fever & headache remedies','Cold and flu medicine','Diabetes medication guide','Best antibiotic for throat infection','Side effects of Ibuprofen','Blood pressure medicines','Antacids for acid reflux','Vitamin deficiency symptoms'];

const formatText = (text) => text.split('\n').map((line, i) => {
  if (line.startsWith('## ')) return <h3 key={i} style={{ color: '#00d4ff', marginTop: '14px', fontSize: '14px', fontWeight: 700 }}>{line.replace('## ', '')}</h3>;
  if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} style={{ marginLeft: '16px', color: '#cbd5e0', marginBottom: '3px', listStyle: 'disc', fontSize: '13px' }}>{line.replace(/^[-•] /, '')}</li>;
  if (line.trim() === '') return <br key={i} />;
  const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#a0e0ff">$1</strong>');
  return <p key={i} style={{ marginBottom: '4px', color: '#e2e8f0', lineHeight: 1.65, fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: bold }} />;
});

export default function ChatBot() {
  const location = useLocation();
  const [messages, setMessages] = useState([
    { role: 'ai', text: `**👋 Hello! I'm MediCare AI.**\n\nI can help you with:\n- 💊 Medicine information & dosage\n- 🩺 Symptom analysis & suggestions\n- ⚕️ Precautions & side effects\n- 🎤 Voice input supported\n\nHow can I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [voiceActive, setVoiceActive] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (location.state?.query) {
      setInput(location.state.query);
      inputRef.current?.focus();
    }
  }, [location.state]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);
    try {
      const reply = await callGemini(msg, history);
      const newHist = [...history, { role: 'user', text: msg }, { role: 'model', text: reply }];
      setHistory(newHist.slice(-20));
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: `⚠️ **Error:** ${e.message}\n\nPlease verify your Gemini API key in \`src/config.js\`` }]);
    }
    setLoading(false);
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported in this browser. Try Chrome.'); return; }
    recognitionRef.current = new SR();
    recognitionRef.current.onresult = e => { setInput(e.results[0][0].transcript); setVoiceActive(false); };
    recognitionRef.current.onerror = () => setVoiceActive(false);
    recognitionRef.current.onend = () => setVoiceActive(false);
    recognitionRef.current.start();
    setVoiceActive(true);
  };

  const S = {
    wrap: { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', maxWidth: '820px', margin: '0 auto' },
    chatBox: { background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '16px', flex: 1, overflowY: 'auto', padding: '20px', marginBottom: '14px' },
    userBubble: { maxWidth: '78%', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '16px 4px 16px 16px', padding: '12px 16px', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 },
    aiBubble: { maxWidth: '82%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '4px 16px 16px 16px', padding: '14px 18px' },
    aiAvatar: { width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, alignSelf: 'flex-start', marginRight: '10px', marginTop: '4px' },
    userAvatar: { width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0, alignSelf: 'flex-start', marginLeft: '10px' },
    inputRow: { display: 'flex', gap: '10px', alignItems: 'center' },
    input: { flex: 1, background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '10px', color: '#e2e8f0', padding: '13px 16px', fontSize: '14px', outline: 'none' },
    sendBtn: { background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: 'white', padding: '13px 20px', fontSize: '18px', cursor: 'pointer', flexShrink: 0 },
    micBtn: (active) => ({ background: active ? 'rgba(239,68,68,0.2)' : 'rgba(0,212,255,0.08)', border: `1px solid ${active ? '#ef4444' : 'rgba(0,212,255,0.2)'}`, borderRadius: '10px', color: active ? '#ef4444' : '#00d4ff', padding: '13px 14px', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }),
    chip: { background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '20px', color: '#00d4ff', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }
  };

  return (
    <div style={S.wrap}>
      <div style={S.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '16px', animation: 'fadeIn 0.3s ease' }}>
            {msg.role === 'ai' && <div style={S.aiAvatar}>🤖</div>}
            <div style={msg.role === 'user' ? S.userBubble : S.aiBubble}>
              {msg.role === 'ai' ? formatText(msg.text) : <p style={{ margin: 0 }}>{msg.text}</p>}
            </div>
            {msg.role === 'user' && <div style={S.userAvatar}>👤</div>}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={S.aiAvatar}>🤖</div>
            <div style={{ ...S.aiBubble, padding: '16px 20px' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff', animation: `pulse 1s ease ${d}s infinite` }} />)}
                <span style={{ fontSize: '12px', color: '#718096', marginLeft: '6px' }}>MediCare AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={S.inputRow}>
        <button style={S.micBtn(voiceActive)} onClick={startVoice} title="Voice Input">{voiceActive ? '🔴' : '🎤'}</button>
        <input ref={inputRef} style={S.input} placeholder="Ask about symptoms, medicines, dosage, side effects..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} />
        <button style={S.sendBtn} onClick={() => send()} disabled={loading}>➤</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {QUICK_PROMPTS.map(p => (
          <button key={p} style={S.chip} onClick={() => send(p)}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.07)'; }}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
