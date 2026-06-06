package com.medicare.controller;

import com.medicare.model.Medicine;
import com.medicare.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public ResponseEntity<List<Medicine>> getAll() {
        return ResponseEntity.ok(medicineService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getById(@PathVariable Long id) {
        return medicineService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Medicine>> search(@RequestParam String q) {
        return ResponseEntity.ok(medicineService.search(q));
    }

    @GetMapping("/otc")
    public ResponseEntity<List<Medicine>> getOtc() {
        return ResponseEntity.ok(medicineService.getByPrescription(false));
    }

    @GetMapping("/prescription")
    public ResponseEntity<List<Medicine>> getRx() {
        return ResponseEntity.ok(medicineService.getByPrescription(true));
    }
}
