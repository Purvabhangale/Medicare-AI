package com.medicare.repository;

import com.medicare.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    @Query("SELECT DISTINCT m FROM Medicine m WHERE " +
           "LOWER(m.name) LIKE %:keyword% OR " +
           "LOWER(m.category) LIKE %:keyword%")
    List<Medicine> searchByKeyword(@Param("keyword") String keyword);

    List<Medicine> findByPrescription(boolean prescription);
}
