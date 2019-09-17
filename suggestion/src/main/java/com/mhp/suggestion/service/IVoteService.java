package com.mhp.suggestion.service;

import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.dto.VoteDtoScore;

import java.util.List;

/**
 * @author cteisanu
 */
public interface IVoteService {
     void saveVote(VoteDto voteDto);

     void deleteVote(Long userId, Long suggestionId);
     List<Long> getUsersIdForSuggestion(Long suggestionId);
     List<VoteDto>getAllVotesForSuggestion(Long suggestionId);
}
