package com.mhp.suggestion.repository;

import com.mhp.suggestion.entity.TagsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : rionescu
 */
@Repository
public interface TagsRepository extends JpaRepository<TagsEntity, Long> {

    /**
     * @author : marius
     */
    @Query(value="select * from tag t,suggestion s,suggestion_tag st where s.suggestion_id=:id and s.suggestion_id=st.fk_suggestion_id and t.tag_id=st.fk_tag_id",nativeQuery = true)
    List<TagsEntity> getTagsBySuggestionId(@Param("id") Integer id);
}
