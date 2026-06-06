package com.medicare.controller;

import com.medicare.model.PatientForm;
import com.medicare.model.PrescriptionResult;
import com.medicare.service.GeminiAiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

    @Autowired
    private GeminiAiService geminiAiService;

    @PostMapping("/generate")
    public ResponseEntity<PrescriptionResult> generate(@Valid @RequestBody PatientForm form) {
        String prompt = String.format(
            "Patient Assessment Request:\n" +
            "Name: %s\nAge: %s\nGender: %s\n" +
            "Current Symptoms: %s\n" +
            "Known Allergies: %s\n" +
            "Existing Medical Conditions: %s\n\n" +
            "Please provide a structured response with:\n" +
            "## 1. Preliminary Assessment\n" +
            "## 2. Possible Condition(s)\n" +
            "## 3. Recommended Medicines (name, dosage, duration)\n" +
            "## 4. Important Precautions\n" +
            "## 5. Lifestyle Recommendations\n" +
            "## 6. Red Flags — When to See a Doctor Immediately\n\n" +
            "End with a disclaimer to consult a licensed physician.",
            nvl(form.getName(), "Anonymous"),
            nvl(form.getAge() != null ? form.getAge().toString() : null, "Unknown"),
            nvl(form.getGender(), "Not specified"),
            form.getSymptoms(),
            nvl(form.getAllergies(), "None"),
            nvl(form.getExistingConditions(), "None")
        );

        PrescriptionResult result = new PrescriptionResult();
        result.setPatientName(form.getName());
        result.setPatientAge(form.getAge());
        result.setGender(form.getGender());
        result.setSymptoms(form.getSymptoms());
        result.setAllergies(form.getAllergies());
        result.setExistingConditions(form.getExistingConditions());
        result.setGeneratedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));

        try {
            result.setAiAssessment(geminiAiService.generateResponse(prompt, null));
            result.setSuccess(true);
        } catch (Exception e) {
            result.setSuccess(false);
            result.setError(e.getMessage());
        }
        return ResponseEntity.ok(result);
    }

    private String nvl(String val, String def) {
        return (val != null && !val.isBlank()) ? val : def;
    }
}
