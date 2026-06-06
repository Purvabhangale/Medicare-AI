export const MEDICINES = [
  {
    id: 1, name: "Paracetamol (Acetaminophen)", category: "Analgesic / Antipyretic",
    uses: ["Fever", "Headache", "Body pain", "Mild to moderate pain"],
    dosage: "500mg–1000mg every 4–6 hours (max 4g/day)",
    sideEffects: ["Nausea (rare)", "Liver damage on overdose", "Allergic reactions (rare)"],
    precautions: ["Avoid alcohol", "Do not exceed recommended dose", "Caution in liver disease"],
    prescription: false, icon: "💊", color: "#3b82f6"
  },
  {
    id: 2, name: "Ibuprofen", category: "NSAID Anti-inflammatory",
    uses: ["Pain relief", "Fever", "Inflammation", "Arthritis", "Menstrual cramps"],
    dosage: "200mg–400mg every 4–6 hours with food",
    sideEffects: ["Stomach upset", "GI bleeding", "Kidney issues", "Increased BP"],
    precautions: ["Take with food", "Avoid in kidney disease", "Caution in heart disease"],
    prescription: false, icon: "💊", color: "#8b5cf6"
  },
  {
    id: 3, name: "Amoxicillin", category: "Antibiotic (Penicillin)",
    uses: ["Bacterial infections", "Ear infections", "Throat infections", "UTI", "Pneumonia"],
    dosage: "250mg–500mg every 8 hours for 7–14 days",
    sideEffects: ["Diarrhea", "Nausea", "Skin rash", "Allergic reaction"],
    precautions: ["Complete full course", "Check penicillin allergy"],
    prescription: true, icon: "💉", color: "#ef4444"
  },
  {
    id: 4, name: "Cetirizine", category: "Antihistamine",
    uses: ["Allergies", "Hay fever", "Urticaria", "Allergic rhinitis", "Itching"],
    dosage: "10mg once daily",
    sideEffects: ["Drowsiness", "Dry mouth", "Headache", "Fatigue"],
    precautions: ["Avoid driving", "Avoid alcohol", "Use with caution in elderly"],
    prescription: false, icon: "🌿", color: "#10b981"
  },
  {
    id: 5, name: "Omeprazole", category: "Proton Pump Inhibitor",
    uses: ["Acid reflux", "GERD", "Peptic ulcers", "H. pylori treatment", "Heartburn"],
    dosage: "20mg–40mg once daily before meals",
    sideEffects: ["Headache", "Diarrhea", "Nausea", "Vitamin B12 deficiency (long-term)"],
    precautions: ["Take 30 min before eating", "Long-term use monitored"],
    prescription: false, icon: "🔵", color: "#0ea5e9"
  },
  {
    id: 6, name: "Metformin", category: "Antidiabetic (Biguanide)",
    uses: ["Type 2 Diabetes", "Blood sugar control", "Insulin resistance", "PCOS"],
    dosage: "500mg–2000mg daily with meals",
    sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Lactic acidosis (rare)"],
    precautions: ["Take with food", "Monitor kidney function", "Avoid alcohol"],
    prescription: true, icon: "🩺", color: "#f59e0b"
  },
  {
    id: 7, name: "Amlodipine", category: "Calcium Channel Blocker",
    uses: ["Hypertension", "Angina", "High blood pressure", "Heart disease"],
    dosage: "5mg–10mg once daily",
    sideEffects: ["Ankle swelling", "Flushing", "Headache", "Dizziness"],
    precautions: ["Monitor blood pressure", "Rise slowly from sitting", "Avoid grapefruit juice"],
    prescription: true, icon: "❤️", color: "#ec4899"
  },
  {
    id: 8, name: "Azithromycin", category: "Antibiotic (Macrolide)",
    uses: ["Respiratory infections", "Sinusitis", "Pneumonia", "Skin infections"],
    dosage: "500mg Day 1, then 250mg Days 2–5",
    sideEffects: ["Nausea", "Diarrhea", "Stomach pain", "Heart rhythm changes (rare)"],
    precautions: ["Complete full course", "Monitor heart rhythm", "Avoid antacids within 2 hrs"],
    prescription: true, icon: "💉", color: "#ef4444"
  },
  {
    id: 9, name: "Loratadine", category: "Non-drowsy Antihistamine",
    uses: ["Allergic rhinitis", "Hives", "Seasonal allergies", "Itching"],
    dosage: "10mg once daily",
    sideEffects: ["Headache", "Dry mouth", "Fatigue (rare)"],
    precautions: ["Safe for daytime use", "Caution in liver disease"],
    prescription: false, icon: "🌿", color: "#10b981"
  },
  {
    id: 10, name: "Pantoprazole", category: "Proton Pump Inhibitor",
    uses: ["GERD", "Acid peptic disease", "Stomach ulcers"],
    dosage: "40mg once daily before breakfast",
    sideEffects: ["Headache", "Diarrhea", "Flatulence", "Elevated liver enzymes"],
    precautions: ["Monitor magnesium (long-term)", "Take before meals"],
    prescription: false, icon: "🔵", color: "#0ea5e9"
  },
  {
    id: 11, name: "Atorvastatin", category: "Statin (Lipid-lowering)",
    uses: ["High cholesterol", "Cardiovascular disease prevention", "Hyperlipidemia"],
    dosage: "10mg–80mg once daily (evening)",
    sideEffects: ["Muscle pain", "Liver enzyme elevation", "Headache", "Nausea"],
    precautions: ["Avoid grapefruit", "Monitor liver function", "Avoid in pregnancy"],
    prescription: true, icon: "💊", color: "#6366f1"
  },
  {
    id: 12, name: "Salbutamol (Albuterol)", category: "Bronchodilator",
    uses: ["Asthma", "COPD", "Bronchospasm", "Wheezing", "Shortness of breath"],
    dosage: "100–200mcg (1–2 puffs) inhaler as needed",
    sideEffects: ["Tremors", "Palpitations", "Headache", "Nervousness"],
    precautions: ["Use correct inhaler technique", "Do not exceed 8 puffs/day"],
    prescription: true, icon: "🫁", color: "#06b6d4"
  }
];
