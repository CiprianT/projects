package com.mhp.suggestion.service;

import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.entity.VoteCompositeKey;
import com.mhp.suggestion.entity.VoteEntity;
import com.mhp.suggestion.mappers.VoteMapper;
import com.mhp.suggestion.repository.SuggestionRepository;
import com.mhp.suggestion.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class VoteServiceImpl implements IVoteService{
    private VoteRepository voteRepository;
    private VoteMapper voteMapper;
    private SuggestionRepository suggestionRepository;

    @Autowired
    public VoteServiceImpl(VoteRepository voteRepository, VoteMapper voteMapper, SuggestionRepository suggestionRepository) {
        this.voteRepository = voteRepository;
        this.voteMapper = voteMapper;
        this.suggestionRepository = suggestionRepository;
    }

    @Override
    public void saveVote(VoteDto voteDto){
        VoteEntity vote = voteMapper.toEntity(voteDto);
        voteRepository.save(vote);
    }

    @Override
    public void deleteVote(Long userId, Long suggestionId) {
        VoteEntity vote = voteRepository.getOne(new VoteCompositeKey(userId,suggestionId));
        voteRepository.delete(vote);
    }

    @Override
    public List<Long> getUsersIdForSuggestion(Long suggestionId) {
        return voteRepository.getUsersIDForVotedSuggestion(suggestionId);
    }

    @Override
    public List<VoteDto> getAllVotesForSuggestion(Long suggestionId) {
        return voteMapper.toDtos(voteRepository.getVotesForSuggestion(suggestionId));
    }
}
