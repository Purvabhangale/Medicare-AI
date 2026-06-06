package com.medicare.model;

import lombok.Data;

@Data
public class PrescriptionResult {
    private String patientName;
    private Integer patientAge;
    private String gender;
    private String symptoms;
    private String allergies;
    private String existingConditions;
    private String aiAssessment;
    private String generatedDate;
    private boolean success;
    private String error;
}
