package com.mhp.suggestion.service;
/**
 * @author marius
 */

import com.mhp.shared.dto.ListDto;
import com.mhp.shared.model.UserEntity;

import com.mhp.suggestion.dto.*;

import com.mhp.suggestion.entity.ReasonEntity;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;
import com.mhp.suggestion.mappers.ReasonMapper;
import com.mhp.suggestion.mappers.SuggestionMapper;
import com.mhp.suggestion.repository.ReasonRepository;
import com.mhp.suggestion.mappers.TagsMapper;
import com.mhp.suggestion.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mhp.suggestion.repository.SuggestionRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Observer;
import java.util.stream.Collectors;

@Service
public class SuggestionServiceImpl implements ISuggestionService {

    private SuggestionRepository suggestionRepository;
    private SuggestionMapper suggestionMapper;
    private TagsMapper tagsMapper;
    private TagsRepository tagRepo;
    private IVoteService voteService;
    private ReasonRepository reasonRepository;
    private ReasonMapper reasonMapper;

    @Autowired
    public SuggestionServiceImpl(SuggestionRepository suggestionRepository, SuggestionMapper suggestionMapper, TagsRepository tagRepo, IVoteService voteService, ReasonRepository reasonRepository, TagsMapper tagsMapper, ReasonMapper reasonMapper) {
        this.suggestionRepository = suggestionRepository;
        this.suggestionMapper = suggestionMapper;
        this.tagsMapper = tagsMapper;
        this.tagRepo = tagRepo;
        this.voteService = voteService;
        this.reasonRepository = reasonRepository;
        this.reasonMapper = reasonMapper;

    }

    @Override
    public SuggestionCreateDto createSugggestion(SuggestionCreateDto suggestionToCreate) {
        SuggestionEntity entity = suggestionMapper.toEntity(suggestionToCreate);
        entity.setStatus(ESugestionStatus.ACTIVE);
        entity.setPostDate(LocalDateTime.now());
        entity.getTags().forEach(tagsEntity -> { if (tagsEntity.getId() == null) { tagRepo.save(tagsEntity);}});
        entity = suggestionRepository.save(entity);
        VoteDto voteDto = new VoteDto(entity.getAuthor().getUserId(),entity.getId(),1);
        voteService.saveVote(voteDto);
        return suggestionMapper.toCreateDto(entity);
    }

    @Override
    public List<SuggestionDto> getAllSuggestionsByStatusAndDateDesc(ESugestionStatus status) {
        return suggestionMapper.toDtos(suggestionRepository.findAllByStatusOrderByPostDateDesc(status));
    }

    @Override
    public List<SuggestionDto> getAllSuggestionsByStatusAndScoreDesc(ESugestionStatus status) {
        List<SuggestionDto> suggestionDtos = suggestionMapper.toDtos(suggestionRepository.findAllByStatus(status));
        suggestionDtos.sort(Comparator.comparing(SuggestionDto::getScore).reversed());
        return suggestionDtos;
    }

    @Override
    public List<String> getAllTitles(ESugestionStatus status) {
        return suggestionRepository.findAll().stream().filter(suggestionEntity -> suggestionEntity.getStatus()==status).map(SuggestionEntity::getTitle).collect(Collectors.toList());
    }

    @Override
    public List<SuggestionDto> getAllByTitle(String title) {
        return suggestionMapper.toDtos(suggestionRepository.findAllByTitle(title));
    }

    @Override
    public void deleteSuggestion(Long id) {
        suggestionRepository.deleteById(id);
    }

    @Override
    public List<SuggestionDto> getSuggestionsOffsetScore(Integer offset,ESugestionStatus status) {
        return suggestionMapper.toDtos(suggestionRepository.getSuggestionsOffsetScore(offset,status.getStatus()));
    }

    @Override
    public void deleteSuggestionAdmin(ReasonDto reason) {
        ReasonEntity reasonEntity = reasonMapper.toEntity(reason);
        suggestionRepository.deleteById(reason.getSuggestionId());
        reasonEntity.setDeclined(false);
        reasonEntity.setTitle(reason.getTitle());
        reasonRepository.save(reasonEntity);

    }

    @Override
    public List<SuggestionDto> getSuggestionsByUserScore(Integer offset, Long userId) {
        return suggestionMapper.toDtos(suggestionRepository.getSuggestionsByUserScore(offset,userId));
    }

    @Override
    public List<SuggestionDto> getAllByTags(List<TagsDto> tags, ESugestionStatus status) {
        return suggestionMapper.toDtos(suggestionRepository.findAllByStatus(status).stream().filter(p-> p.getTags().containsAll(tagsMapper.toEntityList(tags))).collect(Collectors.toList()));
    }

    @Override
    public List<SuggestionDto> getAllByTitleOnEnter(ESugestionStatus status, String title) {
        return suggestionMapper.toDtos(suggestionRepository.getByTitleAlike(title).stream().filter(p->p.getStatus() == status).collect(Collectors.toList()));
    }

    @Override
    public List<SuggestionDto> getSuggetionsOffsetDate(Integer offset,ESugestionStatus status) {
        return suggestionMapper.toDtos(suggestionRepository.getSuggestionsOffsetDate(offset,status.getStatus()));
    }

    @Override
    public List<SuggestionDto> getSuggestionByUser(Integer offset,Long userId)
    {
        UserEntity author = new UserEntity();
        author.setUserId(userId);
        return suggestionMapper.toDtos(suggestionRepository.getSuggestionsByUser(offset,author.getUserId()));
    }

    @Override
    public List<SuggestionDto> getMySuggestionByUser(Long userId)
    {
        UserEntity author = new UserEntity();
        author.setUserId(userId);
        return suggestionMapper.toDtos(suggestionRepository.findAllByAuthor(author));
    }

    @Override
    public List<SuggestionDto> getAllByTitleAndIdOnEnter(Long userId, String title) {
        return suggestionMapper.toDtos(suggestionRepository.getByTitleAlike(title).stream().filter(p->p.getAuthor().getUserId().equals(userId)).collect(Collectors.toList()));
    }

    @Override
    public List<String> getTitlesByUser(Long userId) {
        List<SuggestionDto> suggestionDtoList = getMySuggestionByUser(userId);
        List<String> titles = new ArrayList<>();
        suggestionDtoList.forEach(suggestion -> titles.add(suggestion.getTitle()));
        return titles;
    }

    @Override
    public void updateSuggestion(SuggestionUpdateDto suggestionToUpdate) {
        SuggestionEntity toUpdate = suggestionRepository.getOne(suggestionToUpdate.getId());
        toUpdate.setTitle(suggestionToUpdate.getTitle());
        toUpdate.setText(suggestionToUpdate.getText());
        toUpdate.setAnonymous(suggestionToUpdate.getAnonymous());
        toUpdate.setTags(tagsMapper.toEntitySet(suggestionToUpdate.getTags()));
        suggestionRepository.save(toUpdate);
    }

    @Override
    public void acceptSuggestion(Long id) {
        SuggestionEntity toAccept = suggestionRepository.getOne(id);
        toAccept.setStatus(ESugestionStatus.ACCEPTED);
        suggestionRepository.save(toAccept);

    }

    @Override
    public void declineSuggestion(ReasonDto reasonDto) {
        ReasonEntity reasonEntity = reasonMapper.toEntity(reasonDto);
        SuggestionEntity toDecline = suggestionRepository.getOne(reasonEntity.getSuggestionId());
        toDecline.setStatus(ESugestionStatus.DECLINED);
        suggestionRepository.save(toDecline);
        reasonEntity.setDeclined(true);
        reasonRepository.save(reasonEntity);
    }

    @Override
    public SuggestionEntity getSuggestionById(Long id) {
       return suggestionRepository.getOne(id);
    }

    @Override
    public void implementSuggestion(Long id) {
        SuggestionEntity toImplement = suggestionRepository.getOne(id);
        toImplement.setStatus(ESugestionStatus.IMPLEMENTED);
        suggestionRepository.save(toImplement);
    }

}

