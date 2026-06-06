package com.medicare.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PatientForm {
    private String name;
    private Integer age;
    private String gender;

    @NotBlank(message = "Symptoms are required")
    private String symptoms;

    private String allergies;
    private String existingConditions;
}
