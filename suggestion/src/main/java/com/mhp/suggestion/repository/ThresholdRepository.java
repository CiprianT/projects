package com.mhp.suggestion.repository;

import com.mhp.suggestion.entity.ThresholdEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Laura Luca
 */
@Repository
public interface ThresholdRepository extends JpaRepository<ThresholdEntity, Long> {
}
