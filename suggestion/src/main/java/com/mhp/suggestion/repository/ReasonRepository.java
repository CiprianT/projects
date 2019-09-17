package com.mhp.suggestion.repository;

import com.mhp.suggestion.entity.ReasonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : rionescu
 */
@Repository
public interface ReasonRepository extends JpaRepository<ReasonEntity, Long> {

}
