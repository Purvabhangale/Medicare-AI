// src/services/api.js
// Centralised API calls — points to Spring Boot backend on port 8080

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/* ─── Medicines ─────────────────────────────────────────── */

export const getAllMedicines = async () => {
  const res = await fetch(`${BASE_URL}/medicines`);
  if (!res.ok) throw new Error('Failed to fetch medicines');
  return res.json();
};

export const searchMedicines = async (query) => {
  const res = await fetch(`${BASE_URL}/medicines/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};

export const getMedicineById = async (id) => {
  const res = await fetch(`${BASE_URL}/medicines/${id}`);
  if (!res.ok) throw new Error('Medicine not found');
  return res.json();
};

/* ─── AI Chat ───────────────────────────────────────────── */

export const sendChatMessage = async (message, history = []) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json(); // { reply, success, error }
};

/* ─── Prescription ──────────────────────────────────────── */

export const generatePrescription = async (formData) => {
  const res = await fetch(`${BASE_URL}/prescription/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Prescription generation failed');
  return res.json(); // { aiAssessment, patientName, success, ... }
};
