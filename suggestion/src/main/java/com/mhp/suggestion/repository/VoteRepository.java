package com.mhp.suggestion.repository;

import com.mhp.suggestion.entity.VoteCompositeKey;
import com.mhp.suggestion.entity.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<VoteEntity, VoteCompositeKey> {
    @Query(value="SELECT fk_user_id from vote v where v.fk_suggestion_id= :suggestionID ",nativeQuery = true)
    List<Long> getUsersIDForVotedSuggestion( @Param ("suggestionID") Long suggestionID);
    @Query(value="SELECT * from vote v where v.fk_suggestion_id= :suggestionID ",nativeQuery = true)
    List<VoteEntity>getVotesForSuggestion( @Param ("suggestionID") Long suggestionID);

}
