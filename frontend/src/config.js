// ============================================================
//  MediCare AI — Configuration
//  Replace GEMINI_API_KEY with your key from:
//  https://aistudio.google.com/app/apikey
// ============================================================
export const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
export const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const API_BASE_URL = 'http://localhost:8080/api';

export const SYSTEM_PROMPT = `You are MediCare AI, an expert medical assistant. You provide:
- Medicine information, dosage, side effects, and precautions
- Symptom-based medicine suggestions
- General health advice and guidance
- Prescription recommendations (always advise consulting a doctor)
IMPORTANT: Always remind users to consult a licensed physician. Never diagnose.
Format responses clearly with sections using ** for bold and - for bullet points.
Keep responses concise, empathetic, and professional.`;
