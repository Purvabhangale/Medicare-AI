package com.medicare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;
    private String dosage;
    private boolean prescription;
    private String icon;
    private String color;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "medicine_uses", joinColumns = @JoinColumn(name = "medicine_id"))
    @Column(name = "use_item")
    private List<String> uses;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "medicine_side_effects", joinColumns = @JoinColumn(name = "medicine_id"))
    @Column(name = "side_effect")
    private List<String> sideEffects;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "medicine_precautions", joinColumns = @JoinColumn(name = "medicine_id"))
    @Column(name = "precaution")
    private List<String> precautions;
}
