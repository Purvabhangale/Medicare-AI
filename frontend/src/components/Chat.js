import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';

const QUICK = ['Fever & headache remedies', 'Cold and cough medicines', 'Diabetes medications', 'Blood pressure drugs', 'Antibiotic guide', 'Safe OTC medicines'];

const formatAI = (text) =>
  text.split('\n').map((line, i) => {
    if (line.startsWith('## '))  return <h3 key={i} style={{ color: '#00d4ff', marginTop: '12px', fontSize: '13px', fontWeight: 700 }}>{line.replace('## ', '')}</h3>;
    if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} style={{ marginLeft: '16px', color: '#cbd5e0', marginBottom: '2px', listStyle: 'disc', fontSize: '13px' }}>{line.replace(/^[-•] /, '')}</li>;
    if (line.trim() === '') return <br key={i} />;
    const html = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00d4ff">$1</strong>');
    return <p key={i} style={{ marginBottom: '4px', color: '#e2e8f0', lineHeight: '1.65', fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: html }} />;
  });

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '👋 Hello! I\'m **MediCare AI**, your intelligent medical assistant.\n\nI can help you with:\n- 💊 Medicine information & suggestions\n- 🩺 Symptom analysis & guidance\n- ⚕️ Dosage, precautions & side effects\n- 🎤 Voice input supported\n\nHow can I assist you today?' }
  ]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [voice, setVoice]       = useState(false);
  const [history, setHistory]   = useState([]);
  const endRef = useRef(null);
  const recogRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (msg) => {
    const text = (msg || input).trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const data = await sendChatMessage(text, history);
      const reply = data.reply || data.error || 'No response received.';
      setHistory((h) => [...h, { role: 'user', text }, { role: 'model', text: reply }].slice(-20));
      setMessages((m) => [...m, { role: 'ai', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: '⚠️ Could not reach backend. Make sure Spring Boot is running on port 8080.\n\nYou can also configure your Gemini API key in the backend `application.properties`.' }]);
    }
    setLoading(false);
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice recognition not supported in this browser.'); return; }
    recogRef.current = new SR();
    recogRef.current.onresult  = (e) => { setInput(e.results[0][0].transcript); setVoice(false); };
    recogRef.current.onerror   = () => setVoice(false);
    recogRef.current.onend     = () => setVoice(false);
    recogRef.current.start();
    setVoice(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', maxWidth: '820px', margin: '0 auto' }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '14px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '18px', animation: 'fadeIn 0.3s ease' }}>
            {msg.role === 'ai' && (
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, marginRight: '10px', alignSelf: 'flex-start', marginTop: '4px' }}>🤖</div>
            )}
            <div style={{ maxWidth: '76%', background: msg.role === 'user' ? 'rgba(0,212,255,0.12)' : 'rgba(0,0,0,0.3)', border: `1px solid ${msg.role === 'user' ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'}`, borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', padding: '14px 18px' }}>
              {msg.role === 'ai' ? <div>{formatAI(msg.text)}</div> : <p style={{ margin: 0, color: '#e2e8f0', fontSize: '14px', lineHeight: 1.6 }}>{msg.text}</p>}
            </div>
            {msg.role === 'user' && (
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(0,212,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, marginLeft: '10px', alignSelf: 'flex-start' }}>👤</div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</div>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px 16px 16px 16px', padding: '14px 20px' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[0, 1, 2].map((j) => <div key={j} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff', animation: `pulse-dot 1s ease-in-out ${j * 0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick chips */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        {QUICK.map((q) => (
          <button key={q} onClick={() => send(q)} style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '20px', color: '#00d4ff', padding: '5px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{q}</button>
        ))}
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={startVoice}
          title="Voice input"
          style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${voice ? '#00d4ff' : 'rgba(0,212,255,0.2)'}`, background: voice ? 'rgba(0,212,255,0.2)' : 'transparent', fontSize: '18px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >{voice ? '🔴' : '🎤'}</button>

        <input
          style={{ flex: 1, background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '10px', color: '#e2e8f0', padding: '12px 16px', fontSize: '14px', outline: 'none' }}
          placeholder="Ask about symptoms, medicines, dosage, precautions…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
        />

        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{ flexShrink: 0, padding: '12px 20px', background: 'linear-gradient(135deg,#00d4ff,#6366f1)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', opacity: loading || !input.trim() ? 0.5 : 1, transition: 'all 0.2s' }}
        >➤</button>
      </div>
    </div>
  );
}
