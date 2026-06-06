import { GEMINI_API_KEY, GEMINI_API_URL, SYSTEM_PROMPT } from '../config';

export const callGemini = async (userMessage, history = []) => {
  const contents = [
    ...history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    })),
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 900 }
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Gemini API error');
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  return text;
};

export const generatePrescription = async (formData) => {
  const prompt = `Patient Assessment Request:
Name: ${formData.name || 'Anonymous'}
Age: ${formData.age || 'Unknown'}
Gender: ${formData.gender || 'Not specified'}
Current Symptoms: ${formData.symptoms}
Known Allergies: ${formData.allergies || 'None'}
Existing Medical Conditions: ${formData.existing || 'None'}

Please provide a detailed assessment with these sections:
## 1. Preliminary Assessment
## 2. Possible Condition(s)
## 3. Recommended Medicines (name, dosage, duration)
## 4. Important Precautions
## 5. Lifestyle Recommendations
## 6. Red Flags — When to See a Doctor Immediately

End with a disclaimer to consult a real licensed physician.`;

  return callGemini(prompt, []);
};
