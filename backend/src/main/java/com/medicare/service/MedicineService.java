package com.medicare.service;

import com.medicare.model.Medicine;
import com.medicare.repository.MedicineRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @PostConstruct
    public void seedData() {
        if (medicineRepository.count() > 0) return;

        List<Medicine> list = new ArrayList<>();

        list.add(build("Paracetamol (Acetaminophen)", "Analgesic / Antipyretic",
            "500mg–1000mg every 4–6 hours (max 4g/day)", false, "💊", "#3b82f6",
            List.of("Fever", "Headache", "Body pain", "Mild to moderate pain"),
            List.of("Nausea (rare)", "Liver damage on overdose", "Allergic reactions (rare)"),
            List.of("Avoid alcohol", "Do not exceed recommended dose", "Caution in liver disease")));

        list.add(build("Ibuprofen", "NSAID Anti-inflammatory",
            "200mg–400mg every 4–6 hours with food", false, "💊", "#8b5cf6",
            List.of("Pain relief", "Fever", "Inflammation", "Arthritis", "Menstrual cramps"),
            List.of("Stomach upset", "GI bleeding", "Kidney issues", "Increased BP"),
            List.of("Take with food", "Avoid in kidney disease", "Caution in heart disease")));

        list.add(build("Amoxicillin", "Antibiotic (Penicillin)",
            "250mg–500mg every 8 hours for 7–14 days", true, "💉", "#ef4444",
            List.of("Bacterial infections", "Ear infections", "Throat infections", "UTI", "Pneumonia"),
            List.of("Diarrhea", "Nausea", "Skin rash", "Allergic reaction"),
            List.of("Complete full course", "Check penicillin allergy")));

        list.add(build("Cetirizine", "Antihistamine",
            "10mg once daily", false, "🌿", "#10b981",
            List.of("Allergies", "Hay fever", "Urticaria", "Allergic rhinitis", "Itching"),
            List.of("Drowsiness", "Dry mouth", "Headache", "Fatigue"),
            List.of("Avoid driving", "Avoid alcohol", "Caution in elderly")));

        list.add(build("Omeprazole", "Proton Pump Inhibitor",
            "20mg–40mg once daily before meals", false, "🔵", "#0ea5e9",
            List.of("Acid reflux", "GERD", "Peptic ulcers", "Heartburn"),
            List.of("Headache", "Diarrhea", "Nausea", "Vitamin B12 deficiency (long-term)"),
            List.of("Take 30 min before eating", "Long-term use monitored")));

        list.add(build("Metformin", "Antidiabetic (Biguanide)",
            "500mg–2000mg daily with meals", true, "🩺", "#f59e0b",
            List.of("Type 2 Diabetes", "Blood sugar control", "Insulin resistance", "PCOS"),
            List.of("Nausea", "Diarrhea", "Stomach upset", "Lactic acidosis (rare)"),
            List.of("Take with food", "Monitor kidney function", "Avoid alcohol")));

        list.add(build("Amlodipine", "Calcium Channel Blocker",
            "5mg–10mg once daily", true, "❤️", "#ec4899",
            List.of("Hypertension", "Angina", "High blood pressure", "Heart disease"),
            List.of("Ankle swelling", "Flushing", "Headache", "Dizziness"),
            List.of("Monitor blood pressure", "Rise slowly from sitting", "Avoid grapefruit juice")));

        list.add(build("Azithromycin", "Antibiotic (Macrolide)",
            "500mg Day 1, then 250mg Days 2–5", true, "💉", "#ef4444",
            List.of("Respiratory infections", "Sinusitis", "Pneumonia", "Skin infections"),
            List.of("Nausea", "Diarrhea", "Stomach pain", "Heart rhythm changes (rare)"),
            List.of("Complete full course", "Monitor heart rhythm", "Avoid antacids within 2 hrs")));

        list.add(build("Atorvastatin", "Statin (Lipid-lowering)",
            "10mg–80mg once daily (evening)", true, "💊", "#6366f1",
            List.of("High cholesterol", "Cardiovascular disease prevention", "Hyperlipidemia"),
            List.of("Muscle pain", "Liver enzyme elevation", "Headache", "Nausea"),
            List.of("Avoid grapefruit", "Monitor liver function", "Avoid in pregnancy")));

        list.add(build("Salbutamol (Albuterol)", "Bronchodilator",
            "100–200mcg (1–2 puffs) inhaler as needed", true, "🫁", "#06b6d4",
            List.of("Asthma", "COPD", "Bronchospasm", "Wheezing", "Shortness of breath"),
            List.of("Tremors", "Palpitations", "Headache", "Nervousness"),
            List.of("Use correct inhaler technique", "Do not exceed 8 puffs/day")));

        medicineRepository.saveAll(list);
    }

    private Medicine build(String name, String category, String dosage, boolean rx,
                           String icon, String color,
                           List<String> uses, List<String> se, List<String> prec) {
        Medicine m = new Medicine();
        m.setName(name); m.setCategory(category); m.setDosage(dosage);
        m.setPrescription(rx); m.setIcon(icon); m.setColor(color);
        m.setUses(uses); m.setSideEffects(se); m.setPrecautions(prec);
        return m;
    }

    public List<Medicine> getAll() { return medicineRepository.findAll(); }
    public Optional<Medicine> getById(Long id) { return medicineRepository.findById(id); }
    public List<Medicine> search(String q) { return medicineRepository.searchByKeyword(q.toLowerCase()); }
    public List<Medicine> getByPrescription(boolean rx) { return medicineRepository.findByPrescription(rx); }
}
