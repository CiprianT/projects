package com.mhp.suggestion.repository;

import com.mhp.shared.model.UserEntity;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : marius
 */
@Repository
public interface SuggestionRepository extends JpaRepository<SuggestionEntity, Long> {
    List<SuggestionEntity> findAllByStatus(ESugestionStatus status);
    List<SuggestionEntity> findAllByStatusOrderByPostDateDesc(ESugestionStatus status);

    @Query(value="SELECT * from suggestion s where s.status= :status order by post_date DESC OFFSET :offset ROWS FETCH FIRST 5 ROWS ONLY",nativeQuery = true)
    List<SuggestionEntity> getSuggestionsOffsetDate(@Param("offset") Integer offset,@Param ("status") Integer status);

    List<SuggestionEntity> findAllByTitle(String title);
    @Query(value="SELECT s.suggestion_id,s.title,s.text,s.post_date,s.author,s.anonymous,s.status FROM suggestion s, vote v where s.suggestion_id=v.fk_suggestion_id AND s.status= :status GROUP BY s.suggestion_id ORDER BY sum(v.preference) DESC OFFSET :offset ROWS FETCH FIRST 5 ROWS ONLY",nativeQuery = true)
    List<SuggestionEntity> getSuggestionsOffsetScore(@Param("offset") Integer offset,@Param ("status") Integer status);

    @Query(value = "SELECT * from suggestion s WHERE s.title LIKE CONCAT('%',:param,'%')", nativeQuery = true)
    List<SuggestionEntity> getByTitleAlike(@Param("param") String title);

    @Query(value = "SELECT * from suggestion s where s.author= :user_id order by post_date DESC OFFSET :offset ROWS FETCH FIRST 5 ROWS ONLY",nativeQuery = true)
    List<SuggestionEntity> getSuggestionsByUser(@Param("offset") Integer offset,@Param("user_id") Long user_id);

    @Query(value="SELECT s.suggestion_id,s.title,s.text,s.post_date,s.author,s.anonymous,s.status FROM suggestion s, vote v WHERE s.suggestion_id=v.fk_suggestion_id AND s.author=:userId GROUP BY s.suggestion_id ORDER BY sum(v.preference) DESC OFFSET :offset ROWS FETCH FIRST 5 ROWS ONLY",nativeQuery = true)
    List<SuggestionEntity> getSuggestionsByUserScore(@Param("offset") Integer offset,@Param("userId") Long userId);

    List<SuggestionEntity> findAllByAuthor(UserEntity user);
}
